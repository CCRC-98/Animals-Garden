//  -- Controlador de servicios --   //

const bcrypt = require('bcryptjs');
const pool = require('../database');


//  Listar servicios
exports.getServices = async (req, res) => {
    try {
        if (req.usuario.rol === 1 || req.usuario.rol === 2) {
            const query = 'SELECT * FROM servicios';
            const services = await pool.query(query);
            const name = req.usuario.name;
            if (req.usuario.rol === 1) {
                res.render('admin/lista_servicios', {layout: 'internal_template', services, name});
            } else {
                res.render('vet/lista_servicios', {layout: 'internal_template', services, name});
            }
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para listar servicios');
        }
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al ver los servicios');
    }
};


//Crear servicio vista
exports.createServiceRender = async (req, res) => {
    try {
        if (req.usuario.rol === 1) {
            const name = req.usuario.name;
            res.render('admin/form_reg_servicio', {layout: 'internal_template', name});
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para registrar servicios');
        } 
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al crear el servicio');
    }
};


//  Crear servicio formulario
exports.createService = async (req, res) => {
    try {
        if (req.usuario.rol === 1) {
            const {nombre, descripcion} = req.body;
            const newService = {
                nombre,
                descripcion
            };
            const query = 'CALL crear_servicio(?)';
            await pool.query(query, [Object.values(newService)]);
            res.redirect('/admin/servicesList');
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para registrar servicios');
        }
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al crear el servicio');
    }
};


//  Eliminar servicio
exports.deleteServiceById = async (req, res) => {
    try {
        if (req.usuario.rol === 1) {
            const {id_servicio} = req.params;
            const query = 'CALL eliminar_servicio(?)';
            await pool.query(query, [id_servicio]);
            res.redirect('/admin/servicesList');
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para eliminar servicios');
        }    
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al eliminar el servicio');
    }
};


//  Modificar servicio vista
exports.updateServiceRender = async (req, res) => {
    try {
        if (req.usuario.rol === 1) {
            const {id_servicio} = req.params;
            const query = 'SELECT * FROM servicios WHERE id_servicio = ?';
            const service_data = await pool.query(query, id_servicio);
            const name = req.usuario.name;
            res.render('admin/form_edit_servicio', {layout: 'internal_template', service_data: service_data[0], name});
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para actualizar servicios');
        }
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al actualizar servicio');  
    }
};


//  Modificar servicio formulario
exports.updateService = async (req, res) => {
    try {
        if (req.usuario.rol === 1) {
            const {id_servicio, nombre, descripcion} = req.body
            const editService = {
                id_servicio,
                nombre,
                descripcion
            }
            const query = 'CALL modificar_servicio(?)';
            await pool.query(query, [Object.values(editService)]);
            res.redirect('/admin/servicesList');
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para actualizar servicios');
        }
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al actualizar servicio'); 
    }
};