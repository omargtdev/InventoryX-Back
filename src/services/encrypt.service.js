import { createHash } from "crypto";

import generationService from "./generation.service.js";

/**
 * Represents the values (salt and password) of a hashed password.
 * @typedef {{ salt: string, passwordHashed: string }} PasswordValues
 */

/**
 *
 * @param {string} password - The password to hash.
 * @returns {PasswordValues} - The values generated.
 */
const hashPassword = (password) => {
    const salt = generationService.generateRandomCharacters();
    const passwordHashed = createHash("sha256")
        .update(salt)
        .update(password)
        .digest("hex");

    return {
        salt,
        passwordHashed
    };
}

/**
 *
 * @param {string} password - The password to hash and compare.
 * @param {PasswordValues} passwordValues - The necessary values to make the comparison.
 * @returns {boolean} If they both match.
 */
const compareHashedPassword = (password, passwordValues) => {
    const { salt, passwordHashed: passwordToCompare } = passwordValues;
    const passwordHashed = createHash("sha256")
        .update(salt)
        .update(password)
        .digest("hex");

    return passwordHashed === passwordToCompare;
}

export default {
    encryptPassword: hashPassword,
    comparePassword: compareHashedPassword
}
