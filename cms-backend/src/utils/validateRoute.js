export const validateRoute = (modelName) => {
    const regex = /^[A-Z][a-z_]+[a-z]$/g

    const isValid = regex.test(modelName)

    if(!isValid) {
        throw new Error("Invalid model name")
    }

    return `/${modelName.toLowerCase().trim()}`
}