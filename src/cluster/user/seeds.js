import { SEED_DB, SEED_DB_FORCE } from "../../config/env.js";
import fileService, { USER_PERMISSIONS, USER_USERS } from "../../services/file.service.js";
import user, { default as db } from "./index.js";

const NOTHING_TO_SEED_MSG = "Nothing to seed"; 

const seedUsers = async () => {
    try {
        const users = await fileService.readJson(USER_USERS);

        const { User } = db.models;
        const count = await User.estimatedDocumentCount();
        if(SEED_DB_FORCE || (SEED_DB && count === 0)){
            await User.deleteMany();
            await User.insertMany(users);
            return "Users seeded."
        }
            
        return NOTHING_TO_SEED_MSG;
    } catch (error) {
        throw "[Error when seeding users]: " + error;
    }
}


const seedPermissions = async () => {
    try {
        const { modules: permissionModules } = await fileService.readJson(USER_PERMISSIONS);
        const modules = Object.keys(permissionModules);
        const permissions = modules.map(module => permissionModules[module]).flat();

        const { Permission } = db.models;
        const count = await Permission.estimatedDocumentCount();
        if(SEED_DB_FORCE || (SEED_DB && count === 0)){
            await Permission.deleteMany();
            await Permission.insertMany(permissions);
            return "Permissions seeded.";
        }
            
        return NOTHING_TO_SEED_MSG;
    } catch (error) {
        throw "[Error when seeding user permissions]: " + error;
    }
}

export default {
    seedPermissions,
    seedUsers
}