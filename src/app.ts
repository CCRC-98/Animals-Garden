import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { engine } from "express-handlebars";
import { router } from "./router";

export function CreateApp() {
  const app = express();

  //  Middlewares
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

  //  Configuracion motor de plantillas
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

  //  Archivos estaticos
  app.use(express.static(path.join(__dirname, "public")));

  //  Enrutador de app
  app.use("/", router);

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
