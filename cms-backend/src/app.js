import { json } from "express"
import { initRoutes } from "./routes/index.js"


export const initExpress = async (app) => {
    app.use(json());

    const router = await initRoutes();

    app.use("/" ,router);
}
