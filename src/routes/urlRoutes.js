import { Router } from "express";
import { getUrlById, postShortUrl } from "../constrollers/urlControllers.js";
import { validateShortenUrl } from "../middlewares/schemaValidateShortenUrl.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = Router();

router.post("/urls/shorten", validateToken, validateShortenUrl, postShortUrl);

router.get("/urls/:id", getUrlById);

router.get("/urls/open/:shortUrl");

router.delete("/urls/:id");

export default router;