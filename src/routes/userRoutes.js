import { Router } from "express";
import {
    getRanking,
  getUserInfo,
  postSignIn,
  postSignUp,
} from "../constrollers/userControllers.js";
import { validateSignIn } from "../middlewares/schemaValidateSignIn.js";
import { validateSignUp } from "../middlewares/schemaValidateSignUp.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = Router();

router.post("/signup", validateSignUp, postSignUp);

router.post("/signin", validateSignIn, postSignIn);

router.get("/users/me", validateToken, getUserInfo);

router.get("/ranking", getRanking);

export default router;
