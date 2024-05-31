import { Sequelize, DataTypes } from "sequelize";
import mysql from "mysql2"
import { DB_NAME, DB_USER, DB_PASSWORD, DB_PORT, DB_HOST } from "./env.js";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: "mysql",
    dialectModule: mysql,
    logging: false,
});

const assertDatabaseConnectionOk = async () => {
    console.info(`Checking database connection...`)

    try {
        await sequelize.authenticate()
        console.info('Database connection OK.')
    } catch (e) {
        console.error('Unable to connect to the database:', e)
        throw e
    }
}

const createCmsUsersTable = async () => {
    try {
        sequelize.define("CmsUser", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        }, { tableName: "cms-users" })
    } catch (e) {
        console.error("Error creating cms-users table:", e)
        throw e
    }
}

export const initSequelize = async () => {
    await assertDatabaseConnectionOk()
    await createCmsUsersTable()
}

export default sequelize;