
const generateRandomCharacters = (length = 10) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let word = "";
    for(let i = 0; i < length; i++)
        word += characters.charAt(Math.floor(Math.random() * characters.length));
    return word;
}

export default {
	generateRandomCharacters
}
