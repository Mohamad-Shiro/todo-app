import express from "express";
import morgan from "morgan";
import path from "path";
import {
  protection,
  signInValidityChain,
  signUpValidityChain,
} from "./modules/auth";
import { signIn, signUp } from "./handlers/userHandler";
import router from "./modules/router";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../puplic/dist")));

app.use("/api", protection, router);

app.post("/signup", signUpValidityChain, signUp);
app.post("/signin", signInValidityChain, signIn);

export default app;
