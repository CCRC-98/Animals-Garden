//  --- Controladores de Administrador ---  //

const bcrypt = require('bcryptjs');
const pool = require('../database');
const {promisify} = require('util');
const { ClientRequest } = require('http');


/*exports.getDataHome = async (req, res, next) => {
    const home {
        const n_veterinarios = await pool.query('SELECT COUNT(*) AS n_veterinarios FROM usuarios WHERE rol = 2');
        const n_clientes = await pool.query('SELECT COUNT(*) AS n_clientes FROM usuarios WHERE rol = 3');
        const n_mascotas = await pool.query('SELECT COUNT(*) AS n_mascotas FROM mascotas');
        const n_servicios = await pool.query('SELECT COUNT(*) AS n_servicios FROM servicios');
        const n_pqrs = await pool.query('SELECT COUNT(*) AS n_pqrs FROM pqrs_usuarios');
        const n_auditorias = await pool.query('SELECT COUNT(*) AS n_auditorias FROM auditoria');
        const datos_admin = await pool.query('SELECT * FROM usuarios WHERE rol = 1');
    };
    next();
};*/


//  Home page vista
exports.homePageRender = async (req, res) => {
    try {
        if (req.usuario.rol === 1) {
            const name = req.usuario.name;
            const resultados = await Promise.all([
                pool.query('SELECT COUNT(*) AS cantidad FROM usuarios WHERE rol = 2'),
                pool.query('SELECT COUNT(*) AS cantidad FROM usuarios WHERE rol = 3'),
                pool.query('SELECT COUNT(*) AS cantidad FROM mascotas'),
                pool.query('SELECT COUNT(*) AS cantidad FROM servicios'),
                pool.query('SELECT COUNT(*) AS cantidad FROM pqrs_usuarios'),
                pool.query('SELECT COUNT(*) AS cantidad FROM auditoria')
            ]);
            const datos = {
                veterinarios: resultados[0][0].cantidad,
                clientes: resultados[1][0].cantidad,
                mascotas: resultados[2][0].cantidad,
                servicios: resultados[3][0].cantidad,
                pqrs: resultados[4][0].cantidad,
                auditorias: resultados[5][0].cantidad
            };
            res.render('admin/home', {layout: 'internal_template', name, datos});
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para acceder');
        }    
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error de acceso')
    }
};
