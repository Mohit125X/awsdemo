
import express  from "express";
import {  viewBalance } from "../controller/admin.controller.js";
const router=express.Router();
router.get("/view_balance",viewBalance);
