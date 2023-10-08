import { MONGODB_CLUSTER, MONGODB_PASSWORD, MONGODB_USER } from "../config/env.js";

export const generateUriConnection = (databaseName) =>
	`mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}/${databaseName}?retryWrites=true&w=majority`;
