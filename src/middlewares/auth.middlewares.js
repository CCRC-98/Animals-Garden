const jwt = require('jsonwebtoken');

// Función middleware para verificar el token en cada solicitud
function verifyToken(req, res, next) {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ mensaje: 'No hay token proporcionado' });
    }
    jwt.verify(token, process.env.jwt_secreto, (err, decoded) => {
        if (err) {
            return res.status(403).json({ mensaje: 'Token inválido' });
        } else {
            
            req.usuario = decoded; // Almacenar la información del usuario en el objeto de solicitud para su uso posterior
            const nombre_usuario = decoded.name;
            /*console.log(req.usuario);
            console.log(nombre_usuario);*/
            next(); // Llamar a la siguiente función en la cadena de middleware
        }
    });
}

module.exports = {verifyToken};
