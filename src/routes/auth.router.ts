import { Router } from "express";

export const authRouter = Router();

const authController = require("../controllers/auth.controller");

//  Login
authRouter.get("/login", (req, res) => {
  res.render("auth/login", { layout: "internal_template" });
});

authRouter.post("/", authController.signIn);

//  Logout
authRouter.get("/logout", authController.logout);
