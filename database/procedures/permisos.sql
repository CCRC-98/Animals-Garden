/*    --    Permisos    --    */

/*    Crear permiso    */
DELIMITER //
CREATE PROCEDURE crear_permiso
(
    IN _id_permiso           TINYINT,
    IN _nombre               VARCHAR(25),
    IN _id_modulo            TINYINT
)
BEGIN
    DECLARE max_id_permiso TINYINT;
    SELECT MAX(id_permiso) INTO max_id_permiso FROM permisos;
    IF max_id_permiso IS NULL THEN
        SET _id_permiso = 1;
    ELSE
        SET _id_permiso = max_id_permiso + 1;
    IF NOT EXISTS (SELECT * FROM permisos WHERE id_permiso = _id_permiso) THEN
        INSERT INTO permisos (id_permiso, nombre, id_modulo) 
        VALUES (_id_rol, _nombre, _id_modulo);
        SELECT 'Permiso creado exitosamente' AS mensaje;
    ELSE
        SELECT 'Permiso ya existe' AS mensaje;
    END IF;
END //
DELIMITER ;

/*    Eliminar permiso    */
DELIMITER //
CREATE PROCEDURE eliminar_permiso
(
    IN _id_permiso            TINYINT
)
BEGIN
    IF EXISTS (SELECT * FROM permisos WHERE id_permiso = _id_permiso) THEN
        DELETE FROM permisos WHERE id_permiso = _id_permiso;
        SELECT 'Permiso eliminado' AS mensaje;
    ELSE
        SELECT 'Permiso no existe' AS mensaje;
    END IF;
END //
DELIMITER ;

/*    Actualizar permiso    */
DELIMITER //
CREATE PROCEDURE modificar_permiso
 (
     IN _id_permiso           TINYINT,
     IN _nombre               VARCHAR(25),
     IN _id_modulo            TINYINT
 )
 BEGIN
     IF EXISTS (SELECT * FROM permisos WHERE id_permiso = _id_permiso) THEN
         UPDATE permisos 
         SET nombre = _nombre, id_modulo = _id_modulo
         WHERE id_permiso = _id_permiso;
         SELECT 'Modificacion exitosa' AS mensaje;
     ELSE
         SELECT 'Permiso no existe' AS mensaje;
     END IF;
 END //
DELIMITER ;
