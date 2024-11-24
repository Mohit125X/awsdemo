import express from "express";
import { body } from "express-validator";
import { verifyToken } from "../authentication/verifyToken.js";
import {ownersignUp,ownersignin,updateproperty, viewproperty,owner_change_password, owner_view_profile,viewenquiry } from "../controller/owner.controller.js";


const router = express.Router();

router.post("/ownersignup",
body('name').not().isEmpty().trim().withMessage('Name field is required'),
body("email","invalid email").isEmail(),
body("password","must be 5 character ").isLength({min:5}),
body('contact')
.not().isEmpty().trim().withMessage('Phone Number field is required')
.isNumeric().withMessage('Phone Number field can only contain Numbers')
.isLength({min: 10, max: 13}).withMessage('Phone Number field can only contain minimum of 11 and max of 13 digits respectively'),
body("role","Role must be exist").isAlpha(),
body("longitude","Longitude must be exist").isNumeric(),
body("latitude","Longitude must be exist").isNumeric(),
ownersignUp);

router.post("/ownersignin",ownersignin);

router.get("vieww_property",viewproperty);
router.post("/updateproperty",updateproperty)
router.post("/owner_update_pass",owner_change_password);
router.post("/ownerprofile",owner_view_profile);
router.get("/viewenquiry",viewenquiry);

export default router;