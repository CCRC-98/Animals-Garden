//  -- Controlador de historiales --   //

const bcrypt = require('bcryptjs');
const pool = require('../database');
const {promisify} = require('util');



//Crear historial vista
exports.createHistoryRender = async (req, res) => {
    try {
        if (req.usuario.rol === 1 || req.usuario.rol === 2) {
            const name = req.usuario.name;
            const id_veterinario = req.usuario.dni;
            const id_mascota = req.params.id_mascota;
            if (req.usuario.rol === 1) {
                res.render('admin/form_reg_historial', {layout: 'internal_template', name, id_veterinario, id_mascota});
            } else {
                res.render('vet/form_reg_historial', {layout: 'internal_template', name, id_veterinario, id_mascota});
            }
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para registrar historiales medicos');
        } 
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al registrar historial medico');
    }
};


//  Crear historial formulario
exports.createHistory = async (req, res) => {
    try {
        if (req.usuario.rol === 1 || req.usuario.rol === 2) {
            const {id_veterinario, id_mascota, id_servicio, observacion} = req.body;
            const newHistory = {
                id_veterinario,
                id_mascota,
                id_servicio,
                observacion
            };
            const query = 'CALL crear_historial_medico(?)';
            await pool.query(query, [Object.values(newHistory)]);
            if (req.usuario.rol === 1) {
                res.redirect('/admin/petList');
            } else {
                res.redirect('/vet/petList');
            }
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para registrar historiales medicos');
        }
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al registrar historial medico');
    }
};


//  Listar historiales
exports.getHistory = async (req, res) => {
    try {
        if (req.usuario.rol === 1 || req.usuario.rol === 2 || req.usuario.rol === 3) {
            const {id_mascota} = req.params;
            const query = 'SELECT * FROM historiales_medicos WHERE id_mascota = ?';
            const historiales = await pool.query(query, id_mascota);
            const name = req.usuario.name;
            const dni = req.usuario.dni;
            if (req.usuario.rol === 1) {
                res.render('admin/lista_historiales', {layout: 'internal_template', historiales, name});
            } else if (req.usuario.rol === 2) {
                res.render('vet/lista_historiales', {layout: 'internal_template', historiales, name});
            } else {
                res.render('user/lista_historiales', {layout: 'internal_template', historiales, name, dni});
            }
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para ver historiales medicos');
        }
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al ver los historiales medicos');
    }
};


//  Mostrar datos de historial medico
exports.getHistoryData = async (req, res) => {
    try {
        if (req.usuario.rol === 1 || req.usuario.rol === 2 || req.usuario.rol === 3) {
            const {id_hist_medico} = req.params;
            const query = 'SELECT * FROM historiales_medicos WHERE id_hist_medico = ?';
            const historial = await pool.query(query, id_hist_medico);
            const name = req.usuario.name;
            const dni = req.usuario.dni;
            if (req.usuario.rol === 1) {
                res.render('admin/vista_historial', {layout: 'internal_template', historial: historial[0], name});
            } else if (req.usuario.rol === 2) {
                res.render('vet/vista_historial', {layout: 'internal_template', historial: historial[0], name});
            } else {
                res.render('user/vista_historial', {layout: 'internal_template', historial: historial[0], name, dni});
            }
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para ver historiales medicos');
        }
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al ver los historiales medicos');
    }
};