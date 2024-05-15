import { Router } from "express";
import { createTable,addEntryToTable,updateEntriesInTable,deleteEntryFromTable,deleteTable,fetchAllTables } from "../controllers/user.controller.js";

const router=Router();
router.get('/all-tables',fetchAllTables);
router.post('/create-table',createTable);
router.post('/add-entry',addEntryToTable);
router.post('/update-entry',updateEntriesInTable);
router.post('/delete-entry',deleteEntryFromTable);
router.post('/delete-table',deleteTable);

export default router;