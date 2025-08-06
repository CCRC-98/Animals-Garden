/*    --    Mascotas    --    */

/*  Crear mascota   */ 
DELIMITER //
CREATE PROCEDURE crear_mascota
(
    IN _nombre                      VARCHAR(25),
    IN _especie                     VARCHAR(25),
    IN _raza                        VARCHAR(25),
    IN _edad                        TINYINT,
    IN _sexo                        VARCHAR(6),
    IN _propietario                 VARCHAR(10)
) 
BEGIN
    DECLARE mensaje	VARCHAR(50);
    DECLARE _id_mascota INT;
    DECLARE max_id_mascota INT;
    SELECT MAX(id_mascota) INTO max_id_mascota FROM mascotas;
    IF max_id_mascota IS NULL THEN
        SET _id_mascota = 1;
    ELSE
        SET _id_mascota = max_id_mascota + 1;
    END IF;
    IF EXISTS (SELECT * FROM usuarios WHERE dni = _propietario) THEN
        IF NOT EXISTS (SELECT * FROM mascotas WHERE id_mascota = _id_mascota) THEN
            IF NOT EXISTS (SELECT * FROM mascotas WHERE nombre = _nombre AND raza = _raza) THEN
                INSERT INTO mascotas (id_mascota, nombre, especie, raza, edad, sexo, propietario)
                VALUES (_id_mascota, _nombre, _especie, _raza, _edad, _sexo, _propietario);
                SET mensaje = 'Mascota registrada exitosamente';
            ELSE
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La mascota ya existe';
            END IF;
        ELSE
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Id de mascota ya existe';
        END IF;  
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El propietario no esta registrado';
    END IF;
END //
DELIMITER ;

/*  Eliminar mascota   */
DELIMITER //
CREATE PROCEDURE eliminar_mascota
(
    IN _id_mascota               INT
) 
BEGIN
    DECLARE mensaje	VARCHAR(50);
    IF EXISTS (SELECT * FROM mascotas WHERE id_mascota = _id_mascota) THEN
        DELETE FROM mascotas WHERE id_mascota = _id_mascota;
        SET mensaje = 'Mascota eliminada exitosamente';
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La mascota no esta registrada';
    END IF;
END //
DELIMITER ;

/*  Actualizar mascota   */
DELIMITER //
CREATE PROCEDURE modificar_mascota
(
    IN _id_mascota                  INT,
    IN _nombre                      VARCHAR(25),
    IN _especie                     VARCHAR(25),
    IN _raza                        VARCHAR(25),
    IN _edad                        TINYINT,
    IN _sexo                        VARCHAR(6),
    IN _propietario                 VARCHAR(10)
) 
BEGIN
    DECLARE mensaje	VARCHAR(50);
    IF EXISTS (SELECT * FROM mascotas WHERE id_mascota = _id_mascota) THEN
        UPDATE mascotas
        SET nombre = _nombre, especie = _especie, raza = _raza, edad = _edad, sexo = _sexo, propietario = _propietario 
        WHERE id_mascota = _id_mascota;
        SET mensaje = 'Mascota actualizada exitosamente';
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La mascota no esta registrada';
    END IF;
END //
DELIMITER ;