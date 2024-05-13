import { Router } from "express";
import { createTable,addEntryToTable } from "../controllers/user.controller.js";

const router=Router();
router.post('/create-table',createTable);
router.post('/add-entry',addEntryToTable);

export default router;