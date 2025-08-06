/*    --    Historiales medicos    --    */

/*    Crear historial medico    */
DELIMITER //
CREATE PROCEDURE crear_historial_medico 
(
    IN _id_veterinario          VARCHAR(10),
    IN _id_mascota              INT,
    IN _id_servicio             TINYINT,
    IN _observacion             TEXT
)
BEGIN
    DECLARE _id_hist_medico INT;
    DECLARE max_id_hist INT;
    DECLARE mensaje VARCHAR(50);
    SELECT MAX(id_hist_medico) INTO max_id_hist FROM historiales_medicos;
    IF max_id_hist IS NULL THEN
        SET _id_hist_medico = 1;
    ELSE
        SET _id_hist_medico = max_id_hist + 1;
    END IF;
    IF NOT EXISTS (SELECT * FROM historiales_medicos WHERE id_hist_medico = _id_hist_medico) THEN
        INSERT INTO historiales_medicos (id_hist_medico, id_veterinario, id_mascota, id_servicio, observacion)
        VALUES (_id_hist_medico, _id_veterinario, _id_mascota, _id_servicio, _observacion);
        SET mensaje = 'Historial medico registrado exitosamente';
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'id de historial ya existe';
    END IF;
END //
DELIMITER ;