import { DataTypes } from "sequelize";

export const TYPES = {
    string: () => DataTypes.STRING,
    enum: (values) => DataTypes.ENUM(...values),
    password: () => DataTypes.STRING,
    number: () => DataTypes.INTEGER,
    date: () => DataTypes.DATE,
}