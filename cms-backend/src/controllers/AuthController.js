import { hash, compare } from "../utils/password.js";
import { StatusCodes } from "http-status-codes";
import { generateToken } from "../services/jwt.js";
import db from "../config/sequelize.js";

export const SignIn = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await db.models.CmsUser.findOne({ where: { email } })
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' })
        }

        const isValidPassword = await compare(password, user.password)

        if (!isValidPassword) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid password' })
        }

        const token = generateToken({ email: email })

        res.json({ token })

    } catch (e) {
        console.error('SignIn error', e)
        res.status(StatusCodes.BAD_REQUEST).json({ error: e.message || 'Error signing in' })
    }
}

export const SignUp = async (req, res) => {
    const { email, password } = req.body

    const hashedPassword = await hash(password)

    try {
        const user = await db.models.CmsUser.findOne({ where: { email } })

        if(user) {
            return res.status(StatusCodes.CONFLICT).json({ error: "User already exists!" })
        }

        await db.models.CmsUser.create({ email, password: hashedPassword })
        res.status(StatusCodes.CREATED).json({ message: 'User created' })
    } catch (e) {
        console.error('SignUp error', e)
        res.status(StatusCodes.BAD_REQUEST).json({ error: e.message || 'Error creating user' })
    }
}

export const VerifyToken = async (req, res) => {
    res.status(StatusCodes.OK).json({ isLoggedIn: true })
}