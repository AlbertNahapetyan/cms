import { Router } from 'express'
import { jwtAuth } from "../middlewares/jwtAuth.js";
import * as ModelsController from "../controllers/ModelsController.js"

const router = new Router()

router.get("/", jwtAuth, ModelsController.getAllModels)
router.get("/:modelName", jwtAuth, ModelsController.getModelStructure)
router.post("/", jwtAuth, ModelsController.createModel)
router.delete("/", jwtAuth, ModelsController.deleteModel)

export default router