import { CreateApp } from "./app.js";
import { ENV } from "./config/env.js";

//const pool = require('./database.js');

const app = CreateApp();

app.listen(ENV.PORT, () => {
  console.info(`Servidor corriendo en http://localhost:${ENV.PORT}`);
});
