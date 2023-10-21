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
	id: { type: String, required: true, unique: true, index: true },
	name: { type: String, required: true },
	last_name: { type: String, required: true },
	username: { type: String, required: true },
	password: String,
	salt: String,
	email: { type: String, required: true },
	address: { type: String, required: true },
	document_type: { type: String, required: true, enum: ["DNI", "RUC"] },
	document_number: { type: String, required: true },
	phone: String,
	photo_url: String,
	is_active: { type: Boolean, default: true },
	permissions: [String],
	is_admin: { type: Boolean, default: false },
	is_deleted: { type: Boolean, default: false },
	created_at: { type: Date, default: Date.now },
	updated_at: Date,
	deleted_at: Date
});
