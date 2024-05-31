import { StatusCodes } from 'http-status-codes'
import { verifyToken } from '../services/jwt.js'

export const jwtAuth = async (req, res, next) => {
    const token = req.header('authorization')?.split(" ")?.[1]
    if (!token) {
        return res.sendStatus(StatusCodes.UNAUTHORIZED)
    }

    try {
        await verifyToken(token)
    } catch (e) {
        console.error('jwtAuth error', e)

        return res.status(StatusCodes.FORBIDDEN).json({ error: e.message || 'Invalid Token' })
    }

    next()
}
