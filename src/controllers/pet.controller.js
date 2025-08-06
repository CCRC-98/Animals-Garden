//  -- Controlador de mascotas --   //

const bcrypt = require('bcryptjs');
const pool = require('../database');



//Crear mascota vista
exports.createPetRender = async (req, res) => {
    try {
        if (req.usuario.rol === 1 || req.usuario.rol === 2) {
            if (req.usuario.rol === 1) {
                const name = req.usuario.name;
                res.render('admin/form_reg_mascota', {layout: 'internal_template', name});
            } else {
                const name = req.usuario.name;
                res.render('vet/form_reg_mascota', {layout: 'internal_template', name});
            }
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para registrar mascotas');
        } 
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al crear la mascota');
    }
};


//  Crear mascota formulario
exports.createPet = async (req, res) => {
    try {
        if (req.usuario.rol === 1 || req.usuario.rol === 2) {
            const {nombre, especie, raza, edad, sexo, propietario} = req.body;
            const newPet = {
                nombre,
                especie,
                raza,
                edad,
                sexo,
                propietario
            };
            const query = 'CALL crear_mascota(?)';
            await pool.query(query, [Object.values(newPet)]);
            if (req.usuario.rol === 1) {
                res.redirect('/admin/petList');
            } else {
                res.redirect('/vet/petList');
            }
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para registrar mascotas');
        }
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al crear la mascota');
    }
};


//  Modificar mascota vista
exports.updatePetRender = async (req, res) => {
    try {
        if (req.usuario.rol === 1 || req.usuario.rol === 2) {
            const {id_mascota} = req.params;
            const query = 'SELECT * FROM mascotas WHERE id_mascota = ?';
            const pet_data = await pool.query(query, id_mascota);
            const name = req.usuario.name;
            if (req.usuario.rol === 1) {
                res.render('admin/form_edit_mascota', {layout: 'internal_template', pet_data: pet_data[0], name});
            } else {
                res.render('vet/form_edit_mascota', {layout: 'internal_template', pet_data: pet_data[0], name});
            }
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para actualizar mascotas');
        }
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al actualizar mascota');  
    }
};


//  Modificar mascota formulario
exports.updatePet = async (req, res) => {
    try {
        if (req.usuario.rol === 1 || req.usuario.rol === 2) {
            const {id_mascota, nombre, especie, raza, edad, sexo, propietario} = req.body
            const editPet = {
                id_mascota,
                nombre,
                especie,
                raza,
                edad,
                sexo,
                propietario
            }
            console.log(editPet);
            const query = 'CALL modificar_mascota(?)';
            await pool.query(query, [Object.values(editPet)]);
            if (req.usuario.rol === 1) {
                res.redirect('/admin/petList');
            } else {
                res.redirect('/vet/petList');
            }
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para actualizar mascotas');
        }
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al actualizar mascota'); 
    }
};


//  Eliminar mascota
exports.deletePetById = async (req, res) => {
    try {
        if (req.usuario.rol === 1 || req.usuario.rol === 2) {
            const {id_mascota} = req.params;
            const query = 'CALL eliminar_mascota(?)';
            await pool.query(query, [id_mascota]);
            if (req.usuario.rol === 1) {
                res.redirect('/admin/petList')
            } else {
                res.redirect('/vet/petList')
            }
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para eliminar usuarios');
        }    
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al eliminar la mascota');
    }
};


//  Listar mascotas
exports.getPets = async (req, res) => {
    try {
        if (req.usuario.rol === 1 || req.usuario.rol === 2) {
            const query = 'SELECT * FROM mascotas';
            const pets = await pool.query(query);
            const name = req.usuario.name;
            if (req.usuario.rol === 1) {
                res.render('admin/lista_mascotas', {layout: 'internal_template', pets, name});
            } else {
                res.render('vet/lista_mascotas', {layout: 'internal_template', pets, name});
            }
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para listar mascotas');
        }
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al ver las mascotas');
    }
};


//  Listar mascotas de cliente
exports.getPetsByDni = async (req, res) => {
    try {
        if (req.usuario.rol === 1 || req.usuario.rol === 2 || req.usuario.rol === 3) {
            const {dni} = req.params;
            const query = 'SELECT * FROM mascotas WHERE propietario = ?';
            const pets_user = await pool.query(query, dni);
            const name = req.usuario.name;
            if (req.usuario.rol === 1) {
                res.render('admin/lista_mascotas_usuario', {layout: 'internal_template', pets_user, name});
            } else if (req.usuario.rol === 2) {
                res.render('vet/lista_mascotas_usuario', {layout: 'internal_template', pets_user, name});
            } else {
                res.render('user/lista_mascotas_usuario', {layout: 'internal_template', pets_user, name, dni});
            }
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para listar mascotas');
        }
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al listar mascotas');
    }
};


// Mostrar datos de una mascota
exports.getPetData = async (req, res) => {
    try {
        if (req.usuario.rol === 1 || req.usuario.rol === 2 || req.usuario.rol === 3) {
            const {id_mascota} = req.params;
            const query = 'SELECT * FROM mascotas WHERE id_mascota = ?';
            const datos_mascota = await pool.query(query, id_mascota);
            const name = req.usuario.name;
            if (req.usuario.rol === 1) {
                res.render('admin/perfil_mascota', {layout: 'internal_template', datos_mascota: datos_mascota[0], name})
            } else if (req.usuario.rol === 2) {
                res.render('vet/perfil_mascota', {layout: 'internal_template', datos_mascota: datos_mascota[0], name})
            } else {
                res.render('user/perfil_mascota', {layout: 'internal_template', datos_mascota: datos_mascota[0], name})
            }
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para ver datos de mascotas');
        }
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al ver datos de mascota');
    }
};