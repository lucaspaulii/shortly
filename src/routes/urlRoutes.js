import { Router } from "express";

const router = Router();

router.post("/urls/shorten");

router.get("/urls/:id");

router.get("/urls/open/:shortUrl");

router.delete("/urls/:id");

export default router;