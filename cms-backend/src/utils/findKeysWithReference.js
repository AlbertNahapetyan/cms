export const  findKeysWithReference = (obj) => {
    const keysWithReference = [];

    for (const key in obj) {
        if (obj[key].hasOwnProperty('reference')) {
            keysWithReference.push(key);
        }
    }

    return keysWithReference;
}