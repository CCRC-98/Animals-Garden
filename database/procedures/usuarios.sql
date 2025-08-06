/*    --    Usuarios    --    */



/*  Crear usuario   */ 
DELIMITER //
CREATE PROCEDURE crear_usuario
(
    IN _dni                  VARCHAR(10),
    IN _tp_dni               VARCHAR(30),
    IN _nombre               VARCHAR(25),
    IN _apellido             VARCHAR(25),
    IN _direccion            VARCHAR(30),
    IN _telefono             VARCHAR(10),
    IN _correo               VARCHAR(30),
    IN _clave                VARCHAR(60),
    IN _rol                  TINYINT
) 
BEGIN
	DECLARE mensaje	VARCHAR(50);
    IF NOT EXISTS (SELECT * FROM usuarios WHERE dni = _dni) THEN
        INSERT INTO usuarios (dni, tp_dni, nombre, apellido, direccion, telefono, correo, clave, rol) 
        VALUES (_dni, _tp_dni, _nombre, _apellido, _direccion, _telefono, _correo, _clave, _rol);
        SET mensaje = 'Usuario creado exitosamente';
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El usuario ya existe';
    END IF;
END //
DELIMITER ;


/*  Eliminar usuario   */
DELIMITER //
CREATE PROCEDURE eliminar_usuario
(
    IN _dni                  VARCHAR(10)
) 
BEGIN
    DECLARE mensaje	VARCHAR(50);
    IF EXISTS (SELECT * FROM usuarios WHERE dni = _dni) THEN
        DELETE FROM usuarios WHERE dni = _dni;
        SET mensaje = 'Usuario eliminado exitosamente';
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El usuario no existe';
    END IF;
END //
DELIMITER ;


/*  Actualizar usuario  */
DELIMITER //
CREATE PROCEDURE modificar_usuario
(
    IN _dni                  VARCHAR(10),
    IN _nombre               VARCHAR(25),
    IN _apellido             VARCHAR(25),
    IN _direccion            VARCHAR(30),
    IN _telefono             VARCHAR(10),
    IN _correo               VARCHAR(30)
) 
BEGIN
    DECLARE mensaje	VARCHAR(50);
    IF EXISTS (SELECT * FROM usuarios WHERE dni = _dni) THEN
        UPDATE usuarios SET nombre = _nombre, apellido = _apellido, direccion = _direccion, telefono = _telefono, correo = _correo
        WHERE _dni = dni;
        SET mensaje = 'Usuario actualizado exitosamente';
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El usuario no existe';
    END IF;
END //
DELIMITER ;