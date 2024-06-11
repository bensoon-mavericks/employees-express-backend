import { Sequelize } from "sequelize-typescript";

import { Employee } from "./models/Employee";

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "employee_admin",
  password: "mypass",
  database: "employee_sequelize",
  logging: false,
  models: [Employee],
  modelMatch: (filename, member) => {
    return (
      filename.substring(0, filename.indexOf(".model")) === member.toLowerCase()
    );
  },
});
