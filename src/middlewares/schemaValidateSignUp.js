import { connection } from "../database/db.js";
import bcrypt from "bcrypt";
import { signUpSchema } from "../modules/signUpSchema.js";
import dayjs from "dayjs";

export async function validateSignUp(req, res, next) {
  const user = req.body;
  const { error } = signUpSchema.validate(user, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }
  if (user.password !== user.confirmPassword) {
    return res.status(422).send("password and confirmPassword do not match");
  }

  try {
    const emailExists = await connection.query(
      `SELECT * FROM users WHERE email=$1`,
      [user.email]
    );
    if (emailExists.rows.length > 0) {
      return res.status(409).send("e-mail already in use");
    }
  } catch (error) {
    return res.status(400).send(error);
  }

  const encryptedPassword = bcrypt.hashSync(user.password, 10);

  const userToPost = {
    name: user.name,
    email: user.email,
    password: encryptedPassword,
    createdAt: dayjs().format("YYYY-MM-DD"),
  };

  req.user = userToPost;
  next();
  return;
}
