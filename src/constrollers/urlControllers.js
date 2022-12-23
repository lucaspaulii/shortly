import { connection } from "../database/db.js";

export async function postShortUrl(req, res) {
  const { userId, shortUrl, url, createdAt } = req.shortenUrlObj;

  try {
    await connection.query(
      `INSERT INTO urls (url, "shortUrl", "createdAt") VALUES ($1, $2, $3)`,
      [url, shortUrl, createdAt]
    );
    const insertedUrl = await connection.query(
      `SELECT * FROM urls WHERE url=$1 AND "shortUrl"=$2`,
      [url, shortUrl]
    );
    if (insertedUrl.rows.length === 0) return res.send(400);
    const urlId = insertedUrl.rows[0].id;
    await connection.query(
      `INSERT INTO "usersUrls" ("userId", "urlId") VALUES ($1, $2)`,
      [userId, urlId]
    );
    return res.status(201).send({ shortUrl });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export async function getUrlById(req, res) {
  const urlId = req.params.id;

  try {
    const urlSearch = await connection.query(
      `SELECT id, url, "shortUrl" FROM urls WHERE id=$1`,
      [urlId]
    );
    if (urlSearch.rows.length === 0) return res.sendStatus(404);
    const url = urlSearch.rows[0];
    return res.status(200).send(url);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}
