//  --- Controlador de usuarios ---   //

const bcrypt = require('bcryptjs');
const pool = require('../database');



//  Home page vista
exports.homePageRender = async (req, res) => {
    try {
        if (req.usuario.rol === 3) {
            const name = req.usuario.name;
            const dni = req.usuario.dni;
            const resultados = await Promise.all([
                pool.query('SELECT COUNT(*) AS cantidad FROM mascotas WHERE propietario = ?', dni)
            ]);
            console.log(resultados);
            const datos = {
                mascotas: resultados[0][0].cantidad
            };
            res.render('user/home', {layout: 'internal_template', name, dni, datos});
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para acceder');
        }    
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error de acceso')
    }
};


//  Crear usuario vista
exports.createUserRender = async (req, res) => {
    try {
        if (req.usuario.rol === 1 || req.usuario.rol === 2) {
            if (req.usuario.rol === 1) {
                const name = req.usuario.name;
                res.render('admin/form_reg_usuario', {layout: 'internal_template', name});
            } else {
                const name = req.usuario.name;
                res.render('vet/form_reg_usuario', {layout: 'internal_template', name});
            }
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para registrar clientes');
        } 
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al agregar el cliente');
    }
};


//  Crear usuario formulario
exports.createUser = async (req, res) => {
    try {
        if (req.usuario.rol === 1 || req.usuario.rol === 2) {
            const {dni, tp_dni, nombre, apellido, direccion, telefono, correo, clave, rol} = req.body;
            if (!req.body.rol) {
                const newUser = {
                    dni,
                    tp_dni,
                    nombre,
                    apellido,
                    direccion,
                    telefono,
                    correo,
                    clave: await bcrypt.hash(clave, 8),
                    rol: 3
                }
                const query = 'CALL crear_usuario(?)';
                await pool.query(query, [Object.values(newUser)]);
                if (req.usuario.rol === 1) {
                    res.redirect('/admin/userList')
                } else {
                    res.redirect('/vet/userList')
                }
            } else {
                if (req.body.rol < 1 || req.body.rol > 3) {
                    res.status(400).send('Rol no valido');
                } else {
                    const newUser = {
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
                    await pool.query(query, [Object.values(newUser)]);
                    if (req.usuario.rol === 1) {
                        res.redirect('/admin/userList')
                    } else {
                        res.redirect('/vet/userList')
                    }
                }
            }  
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para registrar clientes');
        }
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al agregar el cliente');
    }
};


//  Modificar usuario vista
exports.updateUserByDniRender = async (req, res) => {
    try {
        if (req.usuario.rol === 1 || req.usuario.rol === 2) {
            const {dni} = req.params;
            const query = 'SELECT * FROM usuarios WHERE dni = ?';
            const user_data = await pool.query(query, dni);
            const name = req.usuario.name;
            if (req.usuario.rol === 1) {
                res.render('admin/form_edit_usuario', {layout: 'internal_template', user_data: user_data[0], name});
            } else {
                res.render('vet/form_edit_usuario', {layout: 'internal_template', user_data: user_data[0], name});
            }
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para actualizar clientes');
        }
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al actualizar cliente');  
    }
};


//  Modificar usuario formulario
exports.updateUserByDni = async (req, res) => {
    try {
        if (req.usuario.rol === 1 || req.usuario.rol === 2) {
            const {dni, nombre, apellido, direccion, telefono, correo} = req.body
            const editUser = {
                dni,
                nombre,
                apellido,
                direccion,
                telefono,
                correo
            }
            const query = 'CALL modificar_usuario(?)';
            await pool.query(query, [Object.values(editUser)]);
            if (req.usuario.rol === 1) {
                res.redirect('/admin/userList');
            } else {
                res.redirect('/vet/userList');
            }
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para actualizar clientes');
        }
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al actualizar cliente'); 
    }
};


//  Eliminar usuario
exports.deleteUserByDni = async (req, res) => {
    try {
        if (req.usuario.rol === 1 || req.usuario.rol === 2) {
            const {dni} = req.params;
            const query = 'CALL eliminar_usuario(?)';
            await pool.query(query, dni);
            if (req.usuario.rol === 1) {
                res.redirect('/admin/userList')
            } else {
                res.redirect('/vet/userList')
            }
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para eliminar usuarios');
        }    
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al eliminar el cliente');
    }
};


//  Listar usuarios
exports.getUsers = async (req, res) => {
    try {
        if (req.usuario.rol === 1 || req.usuario.rol === 2) {
            const query = 'SELECT * FROM usuarios WHERE rol = 3';
            const usuarios = await pool.query(query);
            const name = req.usuario.name;
            if (req.usuario.rol === 1) {
                res.render('admin/lista_usuarios', {layout: 'internal_template', usuarios, name});
            } else {
                res.render('vet/lista_usuarios', {layout: 'internal_template', usuarios, name});
            }
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para listar usuarios');
        }
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al listar los clientes');
    }  
};


//  Mostrar datos de usuario (Perfil usuario)
exports.getUserData = async (req, res) => {
    try {
        if (req.usuario.rol === 1 || req.usuario.rol === 2 || req.usuario.rol === 3) {
            const {dni} = req.usuario;
            const query = 'SELECT * FROM usuarios WHERE dni = ?';
            const datos_usuario = await pool.query(query, dni);
            const name = req.usuario.name;
            if (req.usuario.rol === 1) {
                res.render('admin/perfil_cliente', {layout: 'internal_template', datos_usuario: datos_usuario[0], name})
            } else if (req.usuario.rol === 2) {
                res.render('vet/perfil_cliente', {layout: 'internal_template', datos_usuario: datos_usuario[0], name})
            } else {
                res.render('user/perfil_cliente', {layout: 'internal_template', datos_usuario: datos_usuario[0], name});
            }
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para acceder');
        }
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al mostrar los datos de usuario');
    }
};


//  Mostrar datos de un usuario
exports.getUsersData = async (req, res) => {
    try {
        if (req.usuario.rol === 1 || req.usuario.rol === 2) {
            const {dni} = req.params;
            const query = 'SELECT * FROM usuarios WHERE dni = ?';
            const datos_usuario = await pool.query(query, dni);
            const name = req.usuario.name;
            if (req.usuario.rol === 1) {
                res.render('admin/perfil_cliente', {layout: 'internal_template', datos_usuario: datos_usuario[0], name})
            } else {
                res.render('vet/perfil_cliente', {layout: 'internal_template', datos_usuario: datos_usuario[0], name})
            }
        } else {
            res.status(400).send('Rol no valido, no tiene permisos para acceder');
        }
    } catch (error) {
        console.error('Se ha producido un error:', error.message);
        res.status(500).send('Se ha producido un error al mostrar los datos de usuario');
    }
};