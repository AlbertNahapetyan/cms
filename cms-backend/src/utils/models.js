import path from "path";
import fs from "fs/promises";
import db from "../config/sequelize.js"

export const getModels = async () => {
    try {
        const modelsPath = path.join(process.cwd(), "models.json");
        const jsonData = await fs.readFile(modelsPath, "utf-8");
        return JSON.parse(jsonData);
    } catch (e) {
        throw new Error("Define models in models.json file in root directory");
    }
}

export const writeModel = async (model, models) => {
    try {
        const updatedModels = [...models, model]
        const modelsPath = path.join(process.cwd(), "models.json")
        await fs.writeFile(modelsPath, JSON.stringify(updatedModels, null, 2))
    } catch (e) {
        return new Error()
    }
}

export const destroyModel = async (modelName, models, callback) => {
    try {
        const updatedModels = models.filter(model => model.name !== modelName)
        const modelsPath = path.join(process.cwd(), "models.json")
        const Model = db.models[modelName]
        await Model.drop()
        await fs.writeFile(modelsPath, JSON.stringify(updatedModels, null, 2))
        callback(null);
    } catch (error) {
        console.error("Error occurred during model destruction:", error);
        callback(error);
    }
}