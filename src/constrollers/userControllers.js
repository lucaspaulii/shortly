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
