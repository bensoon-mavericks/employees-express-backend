import { Sequelize } from "sequelize-typescript";

import { Employee } from "./models/Employee";

import "dotenv/config";

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.SEQUELIZE_DB_HOST,
  username: process.env.SEQUELIZE_DB_USERNAME,
  password: process.env.SEQUELIZE_DB_PASSWORD,
  database: process.env.SEQUELIZE_DB_DATABASE,
  logging: false,
  models: [Employee],
  modelMatch: (filename, member) => {
    return (
      filename.substring(0, filename.indexOf(".model")) === member.toLowerCase()
    );
  },
});
