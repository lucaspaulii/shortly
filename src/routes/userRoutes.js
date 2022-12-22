import { Router } from "express";
import { postSignUp } from "../constrollers/userControllers.js";
import { validateSignUp } from "../middlewares/schemaValidateSignUp.js";

const router = Router();

router.post("/signup", validateSignUp, postSignUp);

router.post("/signin");

router.get("/users/me");

export default router;