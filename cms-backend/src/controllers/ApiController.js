import { getModels } from "../utils/models.js";
import { hash } from "../utils/password.js";
import { StatusCodes } from "http-status-codes";
import db from "../config/sequelize.js";

export const getAllEntries = (name) => async (req, res) => {
    const { limit, filters, fields, sort } = req.query

    const order = sort ? [sort.split(':')[0], sort.split(":")[1]?.toUpperCase()] : null

    try {
        const allEntries = await db.models[name].findAll({
            attributes: fields?.length ? fields.split(',') : null,
            limit: limit ? parseInt(limit) : 10,
            where: {
                ...filters
            },
            order: order ? [order] : null
        })

        return res.status(StatusCodes.OK).json(allEntries)
    } catch (e) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: e.message || 'Error getting entries' })
    }
}

export const getEntryById = (name) => async (req, res) => {
    const { id } = req.params

    try {
        const entry = await db.models[name].findOne({
            where: {
                id
            }
        })

        return res.status(StatusCodes.OK).json(entry)
    } catch (e) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: e.message || 'Error getting an entry' })
    }
}

export const createEntry = (name) => async (req, res) => {
    const { body } = req
    const models = await getModels()

    const modelFields = models.find(model => model.name === name).fields

    for (const field in modelFields) {
        if (modelFields[field].type === 'password') {
            body[field] = await hash(body[field])
        }
    }

    try {
        const entry = await db.models[name].create(body)

        return res.status(StatusCodes.CREATED).json({ insertedId: entry.id, createdAt: entry.createdAt })
    } catch (e) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: e.message || 'Error creating an entry' })
    }
}

export const updateEntry = (name) => async (req, res) => {
    const { id } = req.params
    const { body } = req
    const { filters = {} } = req.query

    const models = await getModels()
    const modelFields = models.find(model => model.name === name).fields

    for (const field in modelFields) {
        if (modelFields[field].type === 'password') {
            body[field] = await hash(body[field])
        }
    }

    try {
        await db.models[name].update(body, {
            where: {
                ...(Object.keys(filters).length ? filters : {}),
                ...(id ? { id } : {})
            }
        })


        return res.status(StatusCodes.OK).json({ message: "Entry updated successfully" })
    } catch (e) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: e.message || 'Error updating an entry' })
    }
}

export const deleteEntry = (name) => async (req, res) => {
    const { id } = req.params
    const { filters = {} } = req.query

    try {
        await db.models[name].destroy({
            where: {
                ...(Object.keys(filters).length ? filters : {}),
                ...(id ? { id } : {})
            }
        })

        return res.status(StatusCodes.OK).json({ message: "Entry deleted successfully" })
    } catch (e) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: e.message || 'Error deleting an entry' })
    }
}

export const getAllModels = async (req, res) => {
    const models = await getModels()
    const modelsNames = models.map(model => model.name)

    return res.json(modelsNames)
}