import { Router } from "express";
import { createTable,addEntryToTable,updateEntryInTable } from "../controllers/user.controller.js";

const router=Router();
router.post('/create-table',createTable);
router.post('/add-entry',addEntryToTable);
router.post('/update-entry',updateEntryInTable);

export default router;