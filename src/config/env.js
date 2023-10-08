import { config } from "dotenv";

config();

export const MONGODB_USER = process.env.MONGODB_USER || "";
export const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || "";
export const MONGODB_CLUSTER = process.env.MONGODB_CLUSTER || "";
export const SERVER_HOST = process.env.SERVER_HOST || "localhost";
export const SERVER_PORT = process.env.SERVER_PORT || 4500;
export const TOKEN_SECRET = process.env.TOKEN_SECRET || "";
export const TOKEN_EXPIRY_TIME = process.env.TOKEN_EXPIRY_TIME || "";
export const TOKEN_ALGORITHM = process.env.TOKEN_ALGORITHM || "";
