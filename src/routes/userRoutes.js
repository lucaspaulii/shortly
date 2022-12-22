import { Router } from "express";
import { postSignIn, postSignUp } from "../constrollers/userControllers.js";
import { validateSignIn } from "../middlewares/schemaValidateSignIn.js";
import { validateSignUp } from "../middlewares/schemaValidateSignUp.js";

const router = Router();

router.post("/signup", validateSignUp, postSignUp);

router.post("/signin", validateSignIn, postSignIn);

router.get("/users/me");

export default router;