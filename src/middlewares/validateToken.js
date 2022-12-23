import { connection } from "../database/db.js";

export async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const session = await connection.query(
      `SELECT * FROM authentication WHERE token=$1`,
      [token]
    );
    if (session.rows.length === 0) {
      return res.sendStatus(401);
    }
    const userToken = session.rows[0];
    req.userId = userToken.userId;
    next();
    return;
  } catch (error) {
    return res.sendStatus(400);
  }
}
