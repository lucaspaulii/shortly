import { connection } from "../database/db.js";

export async function postSignUp(req, res) {
  const user = req.user;

  try {
    await connection.query(
      `INSERT INTO users (name, email, password, "createdAt") VALUES ($1, $2, $3, $4)`,
      [user.name, user.email, user.password, user.createdAt]
    );
    return res.sendStatus(201);
  } catch (error) {
    res.sendStatus(400);
  }
}

export async function postSignIn(req, res) {
  const user = req.sessionUser;

  try {
    const tokenExists = await connection.query(
      `SELECT * FROM authentication WHERE "userId"=$1`,
      [user.userId]
    );
    if (tokenExists.rows.length > 0) {
      return res.send(tokenExists.rows[0].token);
    }
    await connection.query(
      `INSERT INTO authentication ("userId", token) VALUES ($1, $2)`,
      [user.userId, user.token]
    );
    return res.send(user.token);
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function getUserInfo(req, res) {
  const userId = req.userId;
  try {
    const userInfo = await connection.query(
      `
    SELECT users.id, users.name, 
    CAST(SUM(COALESCE(urls."visitCount", 0)) AS INTEGER) AS "visitCount", 
    JSON_AGG(JSON_BUILD_OBJECT(
      'id', urls.id,
      'shortUrl', urls."shortUrl",
      'url', urls.url,
      'visitCount', urls."visitCount"
      ) ORDER BY urls."visitCount" DESC) AS "shortenedUrls"
    FROM users 
    LEFT JOIN "usersUrls" 
    ON users.id = "usersUrls"."userId"
    LEFT JOIN urls
    ON "usersUrls"."urlId" = urls.id
    WHERE users.id=$1
    GROUP BY users.id`,
      [userId]
    );
    return res.status(200).send(userInfo.rows[0]);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export async function getRanking(req, res) {
  try {
    const ranking = await connection.query(`
    SELECT users.id, users.name, 
    CAST(COUNT(COALESCE("usersUrls")) AS INTEGER) AS "linksCount",
    CAST(SUM(COALESCE(urls."visitCount", 0)) AS INTEGER) AS "visitCount"
    FROM users 
    LEFT JOIN "usersUrls" 
    ON users.id = "usersUrls"."userId"
    LEFT JOIN urls
    ON "usersUrls"."urlId" = urls.id
    GROUP BY users.id
    ORDER BY "visitCount" DESC
    LIMIT 10
    `)
    res.send(ranking.rows)
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}