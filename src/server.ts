import { ENV } from "./config/env.js";
import app from "./app.js";

//const pool = require('./database.js');

app.listen(ENV.PORT, () => {
  console.info(`Servidor corriendo en http://localhost:${ENV.PORT}`);
});
