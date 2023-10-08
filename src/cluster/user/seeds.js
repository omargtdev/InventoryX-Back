import fileService, { USER_PERMISSIONS, USER_USERS } from "../../services/file.service.js";
import { default as db } from "./index.js";

const NOTHING_TO_SEED_MSG = "Nothing to seed"; 

const seedUsers = async () => {
    try {
        const users = await fileService.readJson(USER_USERS);

        //  TODO: Make more efficient
        const { User } = db.models;
        const count = await User.count();
        if(count === 0){
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

        //  TODO: Make more efficient
        const { Permission } = db.models;
        const count = await Permission.estimatedDocumentCount();
        if(count === 0){
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