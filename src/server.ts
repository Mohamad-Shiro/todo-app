import express from "express";
import morgan from "morgan";
import path from "path";
import {
  signIn,
  signInValidityChain,
  signUp,
  signUpValidityChain,
} from "./modules/auth";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "puplic", "dist")));

// app.get("/api", protection, router);

app.post("/signup", signUpValidityChain, signUp);
app.post("/signin", signInValidityChain, signIn);

export default app;
