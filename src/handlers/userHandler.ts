import { validationResult } from "express-validator";
import prisma from "../modules/db";
import { comparePasswords, hashPassword, createJWT } from "../modules/auth";

export const signUp = async (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      // Create new user
      const newUser = await prisma.user.create({
        data: {
          username: req.body.username,
          password: hashPassword(req.body.password),
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName || "",
        },
      });

      // Redirect to main page with user token

      res.status(200);
      res.json({ message: "Ok", newUser });
      return;
    } else {
      res.status(200);
      res.json({ message: "User already exists.", user });
      return;
    }
  } else {
    res.status(401);
    res.json({ message: result });
    return;
  }
};

export const signIn = async (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });

    if (user) {
      if (comparePasswords(req.body.password, user.password)) {
        const token = createJWT({
          id: user.id,
          username: user.username,
        });
        res.json({ message: "Ok", token });
      } else {
        res.status(401);
        res.json({ message: "Unauthorized" });
      }
    }
  } else {
    res.status(401);
    res.json({ message: result });
  }
};
