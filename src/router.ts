import { Router } from "express";

import adminRoutes from "./routes/admin.routes.js";
import vetRoutes from "./routes/vet.routes.js";
import userRoutes from "./routes/user.routes.js";

import authRoutes from "./routes/auth.routes.js";
import aboutUsRoutes from "./routes/aboutUs.routes.js";
import pqrsRoutes from "./routes/pqrs.routes.js";

import authControllers from "./controllers/auth.controller.js";
import authMiddlewares from "./middlewares/auth.middlewares.js";

export const router = Router();

router.get("/", (req, res) => {
  res.status(200).render("index/index");
});

//  Rutas externas
router.use("/signIn", authRoutes);
router.use("/aboutUs", aboutUsRoutes);
router.use("/createPQRS", pqrsRoutes);

router.use(
  "/admin",
  authControllers.isAuthenticated,
  authMiddlewares.verifyToken,
  adminRoutes,
);
router.use(
  "/vet",
  authControllers.isAuthenticated,
  authMiddlewares.verifyToken,
  vetRoutes,
);
router.use(
  "/user",
  authControllers.isAuthenticated,
  authMiddlewares.verifyToken,
  userRoutes,
);
