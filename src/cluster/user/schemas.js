import { Schema } from "mongoose";

/**
 * Represent an permission of the system
 */
export const permissionSchema = new Schema({
	key: {
		type: String,
		unique: true,
		index: true,
		required: true
	},
	name: { type: String, required: true },
	description: String
});

/**
 * Represent an user of the system
 *
 * PSD: "permissions" contain keys for Permission
 */
export const userSchema = new Schema({
	name: { type: String, required: true },
	last_name: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	password: String,
	salt: String,
	email: { type: String, required: true, unique: true },
	address: { type: String, required: true },
	phone: String,
	is_admin: { type: Boolean, default: false },
	photo_url: String,
	permissions: [String],
	created_at: { type: Date, default: Date.now },
	updated_at: Date
});
