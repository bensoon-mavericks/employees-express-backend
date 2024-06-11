import { RequestHandler } from "express";
import { EmployeeDef } from "../models/EmployeeDef";
import { EmployeeRequest } from "../models/EmployeeRequest";
import { nextTick } from "process";
import BadRequestError from "../models/ErrorResponse";
import Joi from "joi";

const EMPLOYEES: EmployeeDef[] = [];

export const GetAllEmployee: RequestHandler = (req, res, next) => {
  res.json(EMPLOYEES);
};

// TODO: error handling for bad request
// wrong department (either HR or PS)
// invalid salary (negative or zero salary)
// missing fields
// invalid request structure
export const CreateEmployee: RequestHandler = (req, res, next) => {
  const employeeReq = req.body;

  const { error, value } = schema.validate(employeeReq);
  if (error !== undefined) {
    throw new BadRequestError({ code: 400, message: error.message });
  }
  const employeeId = Math.round(Math.random() * 100);
  const employeeDef = new EmployeeDef(
    employeeId,
    employeeReq.name,
    employeeReq.salary,
    employeeReq.department
  );
  EMPLOYEES.push(employeeDef);
  res
    .status(201)
    .json({ description: "successful operation", schema: employeeDef });
};

export const GetEmployee: RequestHandler<{ emp_id: number }> = (
  req,
  res,
  next
) => {
  const employeeId = +req.params.emp_id;
  const employeeDef = EMPLOYEES.filter((e) => e.id === employeeId);
  if (employeeDef.length === 0) {
    throw new Error("Not Found"); // TODO: return NOT FOUND
  }
  res.json({ description: "successful operation", schema: employeeDef });
};

export const UpdateEmployee: RequestHandler<{ emp_id: number }> = (
  req,
  res,
  next
) => {
  const employeeId = +req.params.emp_id;
  const employeeIndex = EMPLOYEES.findIndex((e) => e.id === employeeId);
  const updateEmployeeReq = req.body as EmployeeRequest;
  const { error, value } = schema.validate(updateEmployeeReq);
  if (error !== undefined) {
    throw new BadRequestError({ code: 400, message: error.message });
  }
  EMPLOYEES[employeeIndex] = new EmployeeDef(
    EMPLOYEES[employeeIndex].id,
    updateEmployeeReq.name,
    updateEmployeeReq.salary,
    updateEmployeeReq.department
  );
  res.json({
    description: "successful operation",
    schema: EMPLOYEES[employeeIndex],
  });
};

export const DeleteEmployee: RequestHandler<{ emp_id: number }> = (
  req,
  res,
  next
) => {
  const employeeId = +req.params.emp_id;
  const employeeIndex = EMPLOYEES.findIndex((e) => e.id === employeeId);
  EMPLOYEES.splice(employeeIndex, 1);
  res.status(204).json({ message: "successful Delete operation!" });
};

enum Department {
  HR = "HR",
  PS = "PS",
}

const schema = Joi.object({
  name: Joi.string().required(),

  salary: Joi.number().min(1000).max(100000).required(),

  department: Joi.string().valid(...Object.values(Department)),
});
