import express from "express";
import { body } from "express-validator";
import { verifyToken } from "../authentication/verifyToken.js";
import { signUp,signIn ,view_profile ,forgotPassword , addToWishList, removeFromWishList, houseRequest, viewProperty} from "../controller/tenant.controller.js";

const router = express();
console.log("tenant router....");
router.post("/signup",
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
signUp);

router.post("/signin",signIn);

router.post("/viewProfile",verifyToken,view_profile);

router.get("/viewProperty:/propertyId",verifyToken,viewProperty);

router.post("/forgotPassword",forgotPassword);

router.post("/add-to-wishlist",verifyToken,addToWishList);

router.post("/remove-from-wishlist",verifyToken,removeFromWishList);

router.post("/house-request",verifyToken,houseRequest);

export default router;