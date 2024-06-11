import { RequestHandler } from "express";
import { EmployeeDef } from "../models/EmployeeDef";
import { Employee } from "../models/Employee";
import { EmployeeRequest } from "../models/EmployeeRequest";
import { nextTick } from "process";
import { BadRequestError, NotFoundError } from "../models/ErrorResponse";
import Joi from "joi";
import { error } from "console";

const EMPLOYEES: EmployeeDef[] = [];

export const GetAllEmployee: RequestHandler = async (req, res, next) => {
  const employees = await Employee.findAll();
  res.json(employees);
};

// TODO: error handling for bad request
// wrong department (either HR or PS)
// invalid salary (negative or zero salary)
// missing fields
// invalid request structure
export const CreateEmployee: RequestHandler = async (req, res, next) => {
  const employeeReq = req.body;

  const { error, value } = schema.validate(employeeReq);
  if (error !== undefined) {
    return next(new BadRequestError({ code: 400, message: error.message }));
  }
  const employeeId = Math.round(Math.random() * 100);

  let employee = await Employee.create({
    id: employeeId,
    name: employeeReq.name,
    salary: employeeReq.salary,
    department: employeeReq.department,
  });

  res
    .status(201)
    .json({ description: "successful operation", schema: employee });
};

export const GetEmployee: RequestHandler<{ emp_id: number }> = async (
  req,
  res,
  next
) => {
  const employeeId = +req.params.emp_id;
  const employee = await Employee.findByPk(employeeId);
  if (employee === null) {
    return next(new NotFoundError({ code: 404 })); // TODO: return NOT FOUND
  }
  res.json({ description: "successful operation", schema: employee });
};

export const UpdateEmployee: RequestHandler<{ emp_id: number }> = async (
  req,
  res,
  next
) => {
  const employeeId = +req.params.emp_id;
  const updateEmployeeReq = req.body as EmployeeRequest;
  const { error, value } = schema.validate(updateEmployeeReq);
  if (error !== undefined) {
    return next(new BadRequestError({ code: 400, message: error.message }));
  }
  let employee = await Employee.findByPk(employeeId);
  if (employee === null) {
    return next(new NotFoundError({ code: 404 }));
  }
  employee.name = updateEmployeeReq.name;
  employee.salary = updateEmployeeReq.salary;
  employee.department = updateEmployeeReq.department;
  await employee.save();
  res.json({
    description: "successful operation",
    schema: employee,
  });
};

export const DeleteEmployee: RequestHandler<{ emp_id: number }> = async (
  req,
  res,
  next
) => {
  const employeeId = +req.params.emp_id;
  let employee = await Employee.findByPk(employeeId);
  if (employee === null) {
    return next(new NotFoundError({ code: 404 }));
  }
  await employee.destroy();
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
