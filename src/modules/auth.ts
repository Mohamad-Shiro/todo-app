import { checkSchema, validationResult } from "express-validator";

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
    },
    ["body"]
  )
    .run(req)
    .then(() => next());
};

export const signUp = (req, res, next) => {
  console.log("Signup function called");
  const result = validationResult(req);

  if (result.isEmpty()) {
    res.json({ message: "Ok" });
  } else {
    res.json({ message: result });
  }
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

export const signIn = (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    res.json({ message: "Ok" });
  } else {
    res.json({ message: result });
  }
};
