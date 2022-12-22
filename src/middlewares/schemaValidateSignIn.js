import { connection } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { signInSchema } from "../modules/signInSchema.js";

export async function validateSignIn(req, res, next) {
  const user = req.body;
  const { error } = signInSchema.validate(user, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  try {
    const emailExists = await connection.query(
      `SELECT * FROM users WHERE email=$1`,
      [user.email]
    );
    if (emailExists.rows.length === 0) {
      return res.status(401).send("invalid e-mail");
    }
    if (bcrypt.compareSync(user.password, emailExists.rows[0].password)) {
      const token = uuid();
      const sessionUser = {
        userId: emailExists.rows[0].id,
        token,
      };
      req.sessionUser = sessionUser;
      next();
      return;
    }
    return res.status(401).send("Invalid password");
  } catch (error) {
    return res.sendStatus(400);
  }
}
