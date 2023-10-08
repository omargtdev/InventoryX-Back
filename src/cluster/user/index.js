import mongoose from "mongoose";

import { generateUriConnection } from "../config.js";
import { permissionSchema, userSchema } from "./schemas.js";
import seeds from "./seeds.js";

const uriConnection = generateUriConnection("user");

const connection = mongoose.createConnection(uriConnection);
const models = {
	User: connection.model("User", userSchema),
	Permission: connection.model("Permission", permissionSchema)
}

seeds.seedPermissions()
	.then(console.log)
	.catch(console.log);

seeds.seedUsers()
	.then(console.log)
	.catch(console.log);

export default {
	connection,
	models
}
