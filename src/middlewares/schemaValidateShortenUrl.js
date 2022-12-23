import { connection } from "../database/db.js";
import { nanoid } from "nanoid";
import dayjs from "dayjs";
import { shortenUrlSchema } from "../modules/shortenUrlSchema.js";

export async function validateShortenUrl(req, res, next) {
  const userId = req.userId;
  const url = req.body;

  const { error } = shortenUrlSchema.validate(url, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  const shortUrl = nanoid(8);
  const createdAt = dayjs().format("YYYY-MM-DD");

  const shortenUrlObj = {
    userId,
    shortUrl,
    url: url.url,
    createdAt,
  };
  req.shortenUrlObj = shortenUrlObj;
  next();
  return;
}
