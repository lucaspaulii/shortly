import { Router } from "express";
import { deleteUrlById, getUrlById, postShortUrl, redirectToUrl } from "../constrollers/urlControllers.js";
import { validateShortenUrl } from "../middlewares/schemaValidateShortenUrl.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = Router();

router.post("/urls/shorten", validateToken, validateShortenUrl, postShortUrl);

router.get("/urls/:id", getUrlById);

router.get("/urls/open/:shortUrl", redirectToUrl);

router.delete("/urls/:id", validateToken, deleteUrlById);

export default router;