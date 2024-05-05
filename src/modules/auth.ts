import { checkSchema } from "express-validator";
import { UserMainData } from "../types/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signUpValidityChain = (req, res, next) => {
  checkSchema(
    {
      username: {
        exists: true,
        isString: true,
        //   isLength: { options: { min: 8 } },
      },
      password: {
        exists: true,
        isString: true,
        //   isLength: { options: { min: 8 } },
      },
      email: { exists: true, isEmail: true },
      firstName: { exists: true, isString: true },
      lastName: { optional: true, isString: true },
    },
    ["body"]
  )
    .run(req)
    .then(() => next());
};

export const signInValidityChain = (req, res, next) => {
  checkSchema(
    {
      username: {
        exists: true,
        isString: true,
        //   isLength: { options: { min: 8 } },
      },
      password: {
        exists: true,
        isString: true,
        //   isLength: { options: { min: 8 } },
      },
    },
    ["body"]
  )
    .run(req)
    .then(() => next()); // may include limited number of charachters
};

export const createJWT = (data: UserMainData): string => {
  const token = jwt.sign(data, process.env.JWT_SECRET);
  return token;
};

export const comparePasswords = (password: string, hash: string): boolean => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string): string => {
  return bcrypt.hash(password, 5);
};

export const protection = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    req.status(401);
    req.json({ message: "Unauthorized" });
    return;
  }

  const token = bearer.split(" ")[1];
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }
};
