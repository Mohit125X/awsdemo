import express from "express";
import { signUp } from "../controller/tenant.conroller.js";

const router = express.Router();

router.post("/signup",signUp);

export default router;
