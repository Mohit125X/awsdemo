import express from "express";
import {saveList,list, byStateId} from "../controller/city.controller.js";
const router = express.Router();
router.post("/save",saveList);
router.get("/list",list);
router.post("/byStateId",byStateId);
export default router;