//  --- Controlador de veterinarios ---   //

const bcrypt = require('bcryptjs');
const pool = require('../database');



//  Home page vista
exports.homePageRender = async (req, res) => {
    try {
        if (req.usuario.rol === 2) {
            const name = req.usuario.name;
            const resultados = await Promise.all([
                pool.query('SELECT COUNT(*) AS cantidad FROM usuarios WHERE rol = 3'),
                pool.query('SELECT COUNT(*) AS cantidad FROM mascotas'),
                pool.query('SELECT COUNT(*) AS cantidad FROM servicios'),
                pool.query('SELECT COUNT(*) AS cantidad FROM pqrs_usuarios')
            ]);
            const datos = {
                clientes: resultados[0][0].cantidad,
                mascotas: resultados[1][0].cantidad,
                servicios: resultados[2][0].cantidad,
                pqrs: resultados[3][0].cantidad
            };
            res.render('vet/home', {layout: 'internal_template', name, datos});
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para acceder');
        }    
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error de acceso')
    }
};


//  Crear veterinario vista
exports.createVetRender = async (req, res) => {
    try {
        if (req.usuario.rol === 1) {
            const name = req.usuario.name;
            res.render('admin/form_reg_veterinario', {layout: 'internal_template', name})
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para registrar veterinarios');
        }    
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al agregar el veterinario')
    }
};


//  Crear veterinario formulario
exports.createVet = async (req, res) => {
    try {
        if (req.usuario.rol === 1) {
            const {dni, tp_dni, nombre, apellido, direccion, telefono, correo, clave, rol} = req.body;
            if (!req.body.rol) {
                const newVet = {
                    dni,
                    tp_dni,
                    nombre,
                    apellido,
                    direccion,
                    telefono,
                    correo,
                    clave: await bcrypt.hash(clave, 8),
                    rol: 2
                }
                const query = 'CALL crear_usuario(?)';
                await pool.query(query, [Object.values(newVet)]);
                res.redirect('/admin/vetList')
            } else {
                if (req.body.rol !== 2) {
                    res.status(400).send('Rol no valido');
                } else {
                    const newVet = {
                        dni,
                        tp_dni,
                        nombre,
                        apellido,
                        direccion,
                        telefono,
                        correo,
                        clave: await bcrypt.hash(clave, 8),
                        rol
                    }
                    const query = 'CALL crear_usuario(?)';
                    await pool.query(query, [Object.values(newVet)]);
                    res.redirect('/admin/vetList')
                }
            }  
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para registrar veterinarios');
        }
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al agregar el veterinario');
    }
};


//  Modificar veterinario vista
exports.updateVetByDniRender = async (req, res) => {
    try {
        if (req.usuario.rol === 1) {
            const {dni} = req.params;
            const query = 'SELECT * FROM usuarios WHERE dni = ?';
            const user_data = await pool.query(query, dni);
            const name = req.usuario.name;
            res.render('admin/form_edit_veterinario', {layout: 'internal_template', user_data: user_data[0], name});
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para actualizar veterinarios');
        }
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al actualizar el veterinario');  
    }
};


//  Modificar veterinario formulario
exports.updateVetByDni = async (req, res) => {
    try {
        if (req.usuario.rol === 1) {
            const {dni, nombre, apellido, direccion, telefono, correo} = req.body
            const editVet = {
                dni,
                nombre,
                apellido,
                direccion,
                telefono,
                correo
            }
            console.log(editVet);
            const query = 'CALL modificar_usuario(?)';
            await pool.query(query, [Object.values(editVet)]);
            res.redirect('/admin/vetList');
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para actualizar veterinarios');
        }
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al actualizar veterinario'); 
    }
};


//  Eliminar veterinario
exports.deleteVetByDni = async (req, res) => {
    try {
        if (req.usuario.rol === 1) {
            const {dni} = req.params;
            const query = 'CALL eliminar_usuario(?)';
            await pool.query(query, [dni]);
            res.redirect('/admin/vetList');
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para eliminar veterinarios');
        }    
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al eliminar el veterinario');
    }
};


//  Listar veterinarios
exports.getVets = async (req, res) => {
    try {
        if (req.usuario.rol === 1) {
            const query = 'SELECT * FROM usuarios WHERE rol = 2';
            const veterinarios = await pool.query(query);
            const name = req.usuario.name;
            res.render('admin/lista_veterinarios', {layout: 'internal_template', veterinarios, name});
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para listar veterinarios');
        }
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al listar los veterinarios');
    }  
};


//  Mostrar datos de veterinario (Perfil veterinario)
exports.getVetData = async (req, res) => {
    try {
        if (req.usuario.rol === 2) {
            const {dni} = req.usuario;
            const query = 'SELECT * FROM usuarios WHERE dni = ?';
            const datos_veterinario = await pool.query(query, dni);
            const name = req.usuario.name;
            res.render('vet/perfil', {layout: 'internal_template', datos_veterinario: datos_veterinario[0], name})
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para acceder');
        }
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al mostrar los datos de usuario');
    }
};


//  Mostrar datos de un veterinario
exports.getVetsData = async (req, res) => {
    try {
        if (req.usuario.rol === 1) {
            const {dni} = req.params;
            const query = 'SELECT * FROM usuarios WHERE dni = ?';
            const datos_veterinario = await pool.query(query, dni);
            const name = req.usuario.name;
            res.render('admin/perfil_veterinario', {layout: 'internal_template', datos_veterinario: datos_veterinario[0], name});
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para acceder');
        }
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al mostrar los datos de veterinario');
    }
};