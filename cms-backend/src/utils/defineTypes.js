import { TYPES } from "../constants/types.js";

export const defineTypes = (fields) => {
    const clonedFields = JSON.parse(JSON.stringify(fields))

    for(const key in fields) {
        clonedFields[key].type = TYPES[fields[key].type](fields[key].values)

        if(fields[key].values) {
            delete clonedFields[key].values
        }
    }

    return clonedFields
}