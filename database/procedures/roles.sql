/*    --    Roles    --    */

/*    Crear rol    */
DELIMITER //
CREATE PROCEDURE crear_rol
(
    IN _id_rol               TINYINT,
    IN _nombre               VARCHAR(15)
)
BEGIN
    DECLARE max_id_rol TINYINT;
    SELECT MAX(id_rol) INTO max_id_rol FROM roles;
    IF max_id_rol IS NULL THEN
        SET _id_rol = 1;
    ELSE
        SET _id_rol = max_id_rol + 1;
    IF NOT EXISTS (SELECT * FROM roles WHERE id_rol = _id_rol) THEN
        INSERT INTO roles (id_rol, nombre) 
        VALUES (_id_rol, _nombre);
        SELECT 'Rol creado exitosamente' AS mensaje;
    ELSE
        SELECT 'Rol ya existe' AS mensaje;
    END IF;
END //
DELIMITER ;

/*    Eliminar rol    */
DELIMITER //
CREATE PROCEDURE eliminar_rol
(
    IN _id_rol            TINYINT
)
BEGIN
    IF EXISTS (SELECT * FROM roles WHERE id_rol = _id_rol) THEN
        DELETE FROM roles WHERE id_rol = _id_rol;
        SELECT 'Rol eliminado' AS mensaje;
    ELSE
        SELECT 'Rol no existe' AS mensaje;
    END IF;
END //
DELIMITER ;

/*    Actualizar rol    */
DELIMITER //
CREATE PROCEDURE modificar_rol
 (
     IN _id_rol               TINYINT,
     IN _nombre               VARCHAR(15)
 )
 BEGIN
     IF EXISTS (SELECT * FROM roles WHERE id_rol = _id_rol) THEN
         UPDATE roles 
         SET nombre = _nombre
         WHERE id_rol = _id_rol;
         SELECT 'Modificacion exitosa' AS mensaje;
     ELSE
         SELECT 'Rol no existe' AS mensaje;
     END IF;
 END //
DELIMITER ;
