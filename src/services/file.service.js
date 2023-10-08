import fs from "fs/promises";
import path from "path";

const dataFolderName = "data";

// Path
export const USER_PERMISSIONS = path.resolve(dataFolderName, "user", "permissions.json");
export const USER_USERS = path.resolve(dataFolderName, "user", "users.json");

const readJson = async (fullPath) => {
    const result = await fs.stat(fullPath);
    const fileName = path.basename(fullPath);
    if(!result.isFile() || path.extname(fileName) !== ".json" || result.size === 0)
        throw new Error("Not valid JSON");

    const fileContent = await fs.readFile(fullPath);
    return JSON.parse(fileContent.toString());
}  


export default {
    readJson
}