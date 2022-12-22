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
