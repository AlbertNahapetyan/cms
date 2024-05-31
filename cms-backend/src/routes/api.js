import { Router } from "express";
import { getModels } from "../utils/models.js";
import { validateRoute } from "../utils/validateRoute.js";
import { defineTypes } from "../utils/defineTypes.js";
import { insertPrimaryKey } from "../utils/insertPrimaryKey.js";
import { findKeysWithReference } from "../utils/findKeysWithReference.js";
import { createAssociations } from "../utils/createAssociations.js";
import { parseFilters } from "../middlewares/parseFilters.js";
import { jwtAuth } from "../middlewares/jwtAuth.js";
import * as ApiController from "../controllers/ApiController.js";
import db from "../config/sequelize.js"

const router = new Router();

export const initApiRoutes = async () => {
    const models = await getModels()

    router.get("/models", jwtAuth, ApiController.getAllModels)

    for(const model of models) {
        const { name, fields: modelFields } = model
        const route = validateRoute(name)

        const fields = {
            ...insertPrimaryKey() ,
            ...defineTypes(modelFields)
        }


        db.define(name, fields, { tableName: name.toLowerCase().trim(), timestamps: true })
        const references = findKeysWithReference(modelFields)
        createAssociations(references, name, model, models)


        router.get(route, parseFilters, jwtAuth, ApiController.getAllEntries(name))
        router.get(`${route}/:id`, parseFilters, jwtAuth, ApiController.getEntryById(name))
        router.post(route, jwtAuth, ApiController.createEntry(name))
        router.patch(route, jwtAuth, parseFilters, ApiController.updateEntry(name))
        router.patch(`${route}/:id`, jwtAuth, parseFilters, ApiController.updateEntry(name))
        router.delete(route, jwtAuth, parseFilters, ApiController.deleteEntry(name))
        router.delete(`${route}/:id`, jwtAuth, parseFilters, ApiController.deleteEntry(name))
    }

    await db.sync()

    return router
}