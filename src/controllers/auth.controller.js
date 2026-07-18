const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../database');
const {promisify} = require('util');
const { error } = require('console');

exports.signIn = async (req, res) => {
    try {
        const {dni, clave} = req.body;
        const userLogin = {dni, clave};
        
        if (!dni || !clave) {
            res.json('No se permiten campos vacios');
        }else{
            const query = 'SELECT * FROM usuarios WHERE dni = ?';
            pool.query(query, [userLogin.dni], async (error, results) => {
                if (results.length == 0 || !(await bcrypt.compare(clave, results[0].clave))) {
                    res.json('Usuario o contraseña no validos');
                }else{
                    const dni = results[0].dni;
                    const rol = results[0].rol;
                    const name = results[0].nombre;
                    const token = jwt.sign({dni:dni, rol:rol, name:name}, process.env.jwt_secreto, {
                        expiresIn: process.env.jwt_tiempo_expira
                    });

                    /*console.log(token); //No olvidar eliminar linea posteriormente
                    console.log(rol);   //No olvidar eliminar linea posteriormente
                    console.log(name);  //No olvidar eliminar linea posteriormente*/

                    const cookiesOptions = {
                        expires: new Date(Date.now()+process.env.jwt_cookie_express * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }

                    if (rol === 1) {
                        res.cookie('jwt', token, cookiesOptions)
                        res.redirect('/admin');
                    } else if (rol === 2) {
                        res.cookie('jwt', token, cookiesOptions)
                        res.redirect('/vet');
                    } else if (rol === 3) {
                        res.cookie('jwt', token, cookiesOptions)
                        res.redirect('/user');
                    } else {
                        res.status(403).send('Rol desconocido');
                    }
                }
            })
        }
    } catch (error) {
        console.log(error);
    }
};


exports.isAuthenticated = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.jwt_secreto)
            const query = 'SELECT * FROM usuarios WHERE dni = ?';
            pool.query(query, [decodificada.dni], (error, results) => {
                if (!results){return next()}
                req.user = results[0]
                return next()
            })
        } catch (error) {
            console.log(error)
            return next() 
        }
    }else{
        res.redirect('/signIn')
    }
};


exports.logout = (req, res) => {
    res.clearCookie('jwt');
    console.log('Sesion cerrada');
    return res.redirect('/');
};