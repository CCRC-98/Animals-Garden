/*    --    Servicios    --    */


/*    Crear servicio    */
DELIMITER //
CREATE PROCEDURE crear_servicio
(
    IN _nombre               VARCHAR(20),
    IN _descripcion          VARCHAR(250)
)
BEGIN
    DECLARE mensaje	VARCHAR(50);
    DECLARE max_id_serv INT;
    DECLARE _id_servicio TINYINT;
    SELECT MAX(id_servicio) INTO max_id_serv FROM servicios;
    IF max_id_serv IS NULL THEN
        SET _id_servicio = 1;
    ELSE
        SET _id_servicio = max_id_serv + 1;
    END IF;
    IF NOT EXISTS (SELECT * FROM servicios WHERE id_servicio = _id_servicio) THEN
        IF NOT EXISTS (SELECT * FROM servicios WHERE nombre = _nombre) THEN
            INSERT INTO servicios (id_servicio, nombre, descripcion) 
            VALUES (_id_servicio, _nombre, _descripcion);
            SET mensaje = 'Servicio creado exitosamente';
        ELSE
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El nombre de servicio ya existe';
        END IF;
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El id de servicio ya existe';
    END IF;
END //
DELIMITER ;


/*    Eliminar servicio    */
DELIMITER //
CREATE PROCEDURE eliminar_servicio
(
    IN _id_servicio            TINYINT
)
BEGIN
    DECLARE mensaje	VARCHAR(50);
    IF EXISTS (SELECT * FROM servicios WHERE id_servicio = _id_servicio) THEN
        DELETE FROM servicios WHERE id_servicio = _id_servicio;
        SET mensaje = 'Servicio creado exitosamente';
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El servicio no existe';
    END IF;
END //
DELIMITER ;


/*    Actualizar servicio    */
DELIMITER //
CREATE PROCEDURE modificar_servicio
 (
     IN _id_servicio          TINYINT,
     IN _nombre               VARCHAR(20),
     IN _descripcion          VARCHAR(250)
 )
 BEGIN
    DECLARE mensaje	VARCHAR(50);
    IF EXISTS (SELECT * FROM servicios WHERE id_servicio = _id_servicio) THEN
        UPDATE servicios 
        SET nombre = _nombre, descripcion = _descripcion
        WHERE id_servicio = _id_servicio;
        SET mensaje = 'Servicio actualizado exitosamente';
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El servicio no existe';
    END IF;
 END //
DELIMITER ;