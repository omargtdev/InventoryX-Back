import { 
    NIL as NIL_UUID, 
    v1 as uuidv1, 
    v3 as uuidv3, 
    v4 as uuidv4, 
    v5 as uuidv5 
} from 'uuid';

const generateRandomCharacters = (length = 10) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let word = "";
    for(let i = 0; i < length; i++)
        word += characters.charAt(Math.floor(Math.random() * characters.length));
    return word;
}

const generateRandomUuid = (version = "v4") => {
    const versions = {
        v1: uuidv1,
        v3: uuidv3,
        v4: uuidv4,
        v5: uuidv5
    }

    return versions[version] ? versions[version]() : NIL_UUID
}

export default {
	generateRandomCharacters,
    generateRandomUuid
}
