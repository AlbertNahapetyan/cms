import { getModels, writeModel, destroyModel } from "../utils/models.js";
import { StatusCodes } from "http-status-codes";

export const getAllModels = async (req, res) => {
    const models = await getModels()
    const result = models.map(item => item.name)

    res.status(StatusCodes.OK).json({ models: result })
}

export const createModel = async (req, res) => {
    const models = await getModels()
    const { name, fields } = req.body

    if(models.find(model => model.name === name)) {
        return res.status(StatusCodes.CONFLICT).json({ error: "Model already exists" })
    }

    const model = { name, fields }
    const result = await writeModel(model, models)

    if(result instanceof Error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: "Wrong model" })
    }

    res.status(StatusCodes.OK).json({ message: "Model successfully created" })
}

export const deleteModel = async (req, res) => {
    const models = await getModels()
    const { modelName } = req.body

    if(!models.find(model => model.name === modelName)) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "Model doesn't exist" })
    }

    try {
        await destroyModel(modelName, models, (error) => {
            if (error) {
                res.status(500).json({ error: error.message });
                console.info(error)
            } else {
                res.json({ message: "Model deleted successfully" });
            }
        });
    } catch (error) {
        console.error("Error deleting model:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error deleting model");
    }
}

export const getModelStructure = async (req, res) => {
    const models = await getModels()
    const { modelName } = req.params

    const model = models.find(model => model.name.toLowerCase() === modelName.toLowerCase())

    res.status(StatusCodes.OK).json({ model })
}