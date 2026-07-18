//  Importacion de modulos y dependencias
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { engine } from "express-handlebars";
import path from "path";

import adminRoutes from "./routes/admin.routes.js";
import vetRoutes from "./routes/vet.routes.js";
import userRoutes from "./routes/user.routes.js";

import authRoutes from "./routes/auth.routes.js";
import aboutUsRoutes from "./routes/aboutUs.routes.js";
import pqrsRoutes from "./routes/pqrs.routes.js";

import authControllers from "./controllers/auth.controller.js";
import authMiddlewares from "./middlewares/auth.middlewares.js";

//  Inicializacion de la aplicacion
export function CreateApp() {
  const app = express();

  //  Middleware
  app.use(cors());
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use((req, res, next) => {
    res.setHeader(
      "Content-Security-Policy",
      "script-src 'self' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://cdn.startbootstrap.com https://ajax.googleapis.com",
    );
    next();
  });

  //  Configuraciones motor de plantillas
  app.set("views", path.join(__dirname, "views"));
  app.engine(
    ".hbs",
    engine({
      defaultLayout: "",
      layoutsDir: path.join(app.get("views"), "layouts"),
      partialsDir: path.join(app.get("views"), "partials"),
      extname: ".hbs",
      helpers: require("./libs/handlebars.js"),
    }),
  );
  app.set("view engine", ".hbs");

  //  Public
  app.use(express.static(path.join(__dirname, "public")));

  //  Ruta principal
  app.get("/", (req, res) => {
    res.status(200).render("index/index");
  });

  //  Rutas externas
  app.use("/signIn", authRoutes);
  app.use("/aboutUs", aboutUsRoutes);
  app.use("/createPQRS", pqrsRoutes);

  app.use(
    "/admin",
    authControllers.isAuthenticated,
    authMiddlewares.verifyToken,
    adminRoutes,
  );
  app.use(
    "/vet",
    authControllers.isAuthenticated,
    authMiddlewares.verifyToken,
    vetRoutes,
  );
  app.use(
    "/user",
    authControllers.isAuthenticated,
    authMiddlewares.verifyToken,
    userRoutes,
  );

  //  Limpiador de cache
  app.use(function (req, res, next) {
    if (!req.user) {
      res.header(
        "Cache-Control",
        "private, no-cache, no-store, must-revalidate",
      );
      res.sendStatus(401);
    } else {
      next();
    }
  });

  return app;
}
