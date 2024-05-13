import { Router } from "express";
import { createTable,addEntryToTable,updateEntryInTable,deleteEntryFromTable } from "../controllers/user.controller.js";

const router=Router();
router.post('/create-table',createTable);
router.post('/add-entry',addEntryToTable);
router.post('/update-entry',updateEntryInTable);
router.post('/delete-entry',deleteEntryFromTable);

export default router;