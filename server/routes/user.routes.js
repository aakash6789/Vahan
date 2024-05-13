import { Router } from "express";
import { createTable } from "../controllers/user.controller.js";

const router=Router();
router.post('/create-table',createTable);

export default router;