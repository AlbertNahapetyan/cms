import bcrypt from "bcrypt"

export const hash = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

export const compare = async (password, hash) => await bcrypt.compare(password, hash)