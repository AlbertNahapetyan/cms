import { config } from "dotenv";
config();

const getEnvVar = (key, required = true) => {
    if (!Object.prototype.hasOwnProperty.call(process.env, key) && required) {
        throw new Error(`${key} does not exist on process.env`)
    }

    return process.env[key]
}


export const DB_HOST = getEnvVar("DB_HOST");
export const DB_PORT = getEnvVar("DB_PORT");
export const DB_NAME = getEnvVar("DB_NAME");
export const DB_USER = getEnvVar("DB_USER");
export const DB_PASSWORD = getEnvVar("DB_PASSWORD");
export const APP_PORT = getEnvVar("APP_PORT", false) ?? 3001;
export const WS_PORT = getEnvVar("WS_PORT", false) ?? 3002;
export const JWT_SECRET_KEY = getEnvVar("JWT_SECRET_KEY");
