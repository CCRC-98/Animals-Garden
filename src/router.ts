import { Router } from "express";

import adminRoutes from "./routes/admin.routes.js";
import vetRoutes from "./routes/vet.routes.js";
import userRoutes from "./routes/user.routes.js";

import { authRouter } from "./routes/auth.router.js";
import pqrsRoutes from "./routes/pqrs.routes.js";

import authControllers from "./controllers/auth.controller.js";
import authMiddlewares from "./middlewares/auth.middlewares.js";

export const router = Router();

// Rutas publicas
router.get("/", (req, res) => {
  res.status(200).render("index/index");
});

router.get("/aboutUs", (req, res) => {
  res.render("index/aboutUs");
});

// Modulo de autenticacion
router.use("/auth", authRouter);

// Admins
router.use(
  "/admin",
  authControllers.isAuthenticated,
  authMiddlewares.verifyToken,
  adminRoutes,
);

// Veterinarios
router.use(
  "/vet",
  authControllers.isAuthenticated,
  authMiddlewares.verifyToken,
  vetRoutes,
);

// Usuarios
router.use(
  "/user",
  authControllers.isAuthenticated,
  authMiddlewares.verifyToken,
  userRoutes,
);

// PQRS
router.use("/createPQRS", pqrsRoutes);
