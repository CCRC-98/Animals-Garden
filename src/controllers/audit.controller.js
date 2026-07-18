//  -- Controlador de auditorias --   //

const bcrypt = require('bcryptjs');
const pool = require('../database');


//  Listar auditorias
exports.getAudits = async (req, res) => {
    try {
        if (req.usuario.rol === 1) {
            const query = 'SELECT * FROM auditoria';
            const audits = await pool.query(query);
            const name = req.usuario.name;
            res.render('admin/lista_auditorias', {layout: 'internal_template', audits, name});
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para listar auditorias');
        }
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al listar las auditorias');
    }  
};