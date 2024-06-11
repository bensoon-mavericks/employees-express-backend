import { Router } from "express";
import {
  GetAllEmployee,
  CreateEmployee,
  GetEmployee,
  UpdateEmployee,
  DeleteEmployee,
} from "../controllers/employees";

const router = Router();

router.get("/", GetAllEmployee);

router.post("/", CreateEmployee);

router.get("/:emp_id", GetEmployee);

router.put("/:emp_id", UpdateEmployee);

router.delete("/:emp_id", DeleteEmployee);

export default router;
