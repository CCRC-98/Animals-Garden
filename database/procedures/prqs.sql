/*    --    PQRS    --    */

/*    Crear PQRS    */
DELIMITER //
CREATE PROCEDURE crear_pqrs
(
    IN _id_pqrs             TINYINT,
    IN _nombre              VARCHAR(25), 
    IN _correo              VARCHAR(30),
    IN _telefono            VARCHAR(10),
    IN _mensaje             VARCHAR(300)
)
BEGIN
    DECLARE _id_pqrs_usr INT;    
    DECLARE max_id_pqrs_usr INT;
    DECLARE mensaje	VARCHAR(50);
    SELECT MAX(id_pqrs_usr) INTO max_id_pqrs_usr FROM pqrs_usuarios;
    IF max_id_pqrs_usr IS NULL THEN
        SET _id_pqrs_usr = 1;
    ELSE
        SET _id_pqrs_usr = max_id_pqrs_usr + 1;
    END IF;
    IF NOT EXISTS (SELECT * FROM pqrs_usuarios WHERE id_pqrs_usr = _id_pqrs_usr) THEN
        INSERT INTO pqrs_usuarios (id_pqrs_usr, id_pqrs, nombre, correo, telefono, mensaje)
        VALUES (_id_pqrs_usr, _id_pqrs, _nombre, _correo, _telefono, _mensaje);
        SET mensaje = 'PQRS creada exitosamente';
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La PQRS ya esta registrada';
    END IF;
END //
DELIMITER ;