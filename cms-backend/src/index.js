import path from "path";
import chokidar from "chokidar";
import http from "http";
import { initExpress } from "./app.js";
import express from "express";
import { APP_PORT, WS_PORT } from "./config/env.js";
import { initSequelize } from "./config/sequelize.js";
import WebSocket, { WebSocketServer } from "ws";
import { MESSAGES } from "./constants/wsMessages.js";

const watcher = chokidar.watch(path.join(process.cwd(), "models.json"));
let server;
let app;
const wsServer = new WebSocketServer({ allowSynchronousEvents: true, port: WS_PORT })

const init = async () => {
    if (server) {
        await new Promise((resolve) => {
            server.close(() => {
                resolve();
            });
        });
    }

    app = express();
    await initSequelize()
    await initExpress(app)
    server = http.createServer(app);
    server.listen(APP_PORT, () => {
        console.info(`Server is running on port ${APP_PORT}`);

        wsServer?.clients?.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(MESSAGES.ready);
            }
        });
    });
};

watcher.on("change", () => {
    console.info("Restarting the server...");
    wsServer?.clients?.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(MESSAGES.restarting);
        }
    });
    init();
});

init();
