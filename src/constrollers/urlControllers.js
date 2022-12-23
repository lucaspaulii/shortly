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

export async function redirectToUrl(req, res) {
  const shortUrl = req.params.shortUrl;

  try {
    const urlSearch = await connection.query(
      `SELECT * FROM urls WHERE "shortUrl"=$1`,
      [shortUrl]
    );
    if (urlSearch.rows.length === 0) return res.sendStatus(404);
    let { visitCount } = urlSearch.rows[0];
    const { id, url } = urlSearch.rows[0];
    visitCount++
    await connection.query(`UPDATE urls SET "visitCount"=$1 WHERE id=$2`, [visitCount, id]);
    return res.redirect(url);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export async function deleteUrlById(req, res) {
  const userId = req.userId;
  const urlId = req.params.id;

  try {
    const urlSearch = await connection.query(
      `SELECT "userId" FROM "usersUrls" WHERE "urlId"=$1`,
      [urlId]
    );
    if (urlSearch.rows.length === 0) return res.sendStatus(404);
    const url = urlSearch.rows[0];
    if (url.userId !== userId) return res.sendStatus(401);

    await connection.query(
      `DELETE FROM "usersUrls" WHERE "userId"=$1 AND "urlId"=$2`,
      [userId, urlId]
    );
    await connection.query(`DELETE FROM urls WHERE id=$1`, [urlId]);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}
