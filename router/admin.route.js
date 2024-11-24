import express from "express";
import { body } from "express-validator";
import { verifyToken } from "../authentication/verifyToken.js";
import { signUp,signIn, viewBalance } from "../controller/admin.controller.js";

const router = express();

router.post("/signup",body("email","invalid email").isEmail(),
body("password","must be 5 character and numeric").isNumeric().isLength({min:5}),
body("balance","only numeric").isNumeric(),signUp);

router.post("/signin",signIn);

router.get("/view_balance",verifyToken,viewBalance);

// router.get("/view_owners/:role",view_owners);
// router.get("/view_tenants/:role",view_tenants);
// router.post("/change_password",change_password);

export default router;