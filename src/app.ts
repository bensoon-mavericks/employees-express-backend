import express, { Request, Response, NextFunction } from "express";

import employeeRoutes from "./routes/employees";
import { json } from "body-parser";
import { CustomError } from "./models/ErrorResponse";

import { sequelize } from "./connection";

const app = express();

app.use(json());

app.use("/employees", employeeRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    const { statusCode, errors, logging } = err;
    return res.status(statusCode).send({ errors });
  }
  res.status(500).json({ message: err.message });
});

(async () => {
  await sequelize.sync();
  app.listen(8080, () => console.log("running on 8080"));
})();
