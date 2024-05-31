import { Router } from 'express';
import { initApiRoutes } from './api.js';
import authRouter from "./auth.js";
import modelsRouter from "./models.js"

const router = new Router();

export const initRoutes =  async () => {
    const apiRouter = await initApiRoutes()

    router.use("/api", apiRouter)
    router.use("/auth", authRouter)
    router.use("/models", modelsRouter)

    return router
}