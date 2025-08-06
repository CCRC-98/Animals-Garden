//  -- Controlador de PQRS --   //

const bcrypt = require('bcryptjs');
const pool = require('../database');



//  Crear pqrs formulario
exports.createPQRS = async (req, res) => {
    try {
        if (!req.body.nombre || !req.body.correo || !req.body.telefono || !req.body.id_pqrs || !req.body.mensaje) {
            res.status(400).send('No se permiten campos vacios');
        } else {
            const {nombre, correo, telefono, id_pqrs, mensaje} = req.body;
            const newPQRS = {
                id_pqrs,
                nombre,
                correo,
                telefono,
                mensaje
            };
            console.log(newPQRS);
            const query = 'CALL crear_pqrs(?)';
            await pool.query(query, [Object.values(newPQRS)]);
            res.redirect('/#contact');
        }
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al registrar la PQRS');
    }
};


//  Listar PQRS
exports.getPQRS = async (req, res) => {
    try {
        if (req.usuario.rol === 1 || req.usuario.rol === 2) {
            const query = 'SELECT * FROM pqrs_usuarios';
            const pqrs = await pool.query(query);
            const name = req.usuario.name;
            if (req.usuario.rol === 1) {
                res.render('admin/lista_pqrs', {layout: 'internal_template', pqrs, name});
            } else {
                res.render('vet/lista_pqrs', {layout: 'internal_template', pqrs, name});
            }
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para listar PQRS');
        }
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al ver las PQRS');
    }
};


// Mostrar datos de una PQRS
exports.getPQRSData = async (req, res) => {
    try {
        if (req.usuario.rol === 1 || req.usuario.rol === 2) {
            const {id_pqrs_usr} = req.params;
            const query = 'SELECT * FROM pqrs_usuarios WHERE id_pqrs_usr = ?';
            const datos_pqrs = await pool.query(query, id_pqrs_usr);
            const name = req.usuario.name;
            if (req.usuario.rol === 1) {
                res.render('admin/vista_pqrs', {layout: 'internal_template', datos_pqrs: datos_pqrs[0], name})
            } else {
                res.render('vet/vista_pqrs', {layout: 'internal_template', datos_pqrs: datos_pqrs[0], name})
            }
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para ver datos de PQRS');
        }
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al ver datos de PQRS');
    }
};