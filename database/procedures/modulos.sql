/*    --    Modulos    --    */

/*    Crear modulo    */
DELIMITER //
CREATE PROCEDURE crear_modulo
(
    IN _nombre               VARCHAR(20)
)
BEGIN
    DECLARE max_id_modulo TINYINT;
    DECLARE _id_modulo TINYINT;
    SELECT MAX(id_modulo) INTO max_id_modulo FROM modulos;
    IF max_id_modulo IS NULL THEN
        SET _id_modulo = 1;
    ELSE
        SET _id_modulo = max_id_modulo + 1;
    END IF;
    IF NOT EXISTS (SELECT * FROM modulos WHERE id_modulo = _id_modulo) THEN
        INSERT INTO modulos (id_modulo, nombre) 
        VALUES (_id_modulo, _nombre);
        SELECT 'Modulo creado exitosamente' AS mensaje;
    ELSE
        SELECT 'Modulo ya existe' AS mensaje;
    END IF;
END //
DELIMITER ;

/*    Eliminar modulo    */
DELIMITER //
CREATE PROCEDURE eliminar_modulo
(
    IN _id_modulo            TINYINT
)
BEGIN
    IF EXISTS (SELECT * FROM modulos WHERE id_modulo = _id_modulo) THEN
        DELETE FROM modulos WHERE id_modulo = _id_modulo;
        SELECT 'Modulo eliminado' AS mensaje;
    ELSE
        SELECT 'Modulo no existe' AS mensaje;
    END IF;
END //
DELIMITER ;

/*    Actualizar modulo    */
DELIMITER //
CREATE PROCEDURE modificar_modulo
 (
     IN _id_modulo            TINYINT,
     IN _nombre               VARCHAR(20)
 )
 BEGIN
     IF EXISTS (SELECT * FROM modulos WHERE id_modulo = _id_modulo) THEN
         UPDATE modulos 
         SET nombre = _nombre
         WHERE id_modulo = _id_modulo;
         SELECT 'Modificacion exitosa' AS mensaje;
     ELSE
         SELECT 'Modulo no existe' AS mensaje;
     END IF;
 END //
DELIMITER ;
