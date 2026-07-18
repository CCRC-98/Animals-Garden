const app = require('./app.js');
//const pool = require('./database.js');


//  Configuracion del servidor
const PORT = process.env.node_port || 5000;
app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto', PORT);
});