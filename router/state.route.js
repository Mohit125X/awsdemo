import express from "express";
import {save,stateList} from "../controller/state.controller.js";

const router = express.Router();

router.post("/save",save);
router.get("/stateList",stateList);
export default router;