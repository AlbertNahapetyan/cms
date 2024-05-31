import { DataTypes } from "sequelize";

export const insertPrimaryKey = () => {
    return {
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        }
    }
}