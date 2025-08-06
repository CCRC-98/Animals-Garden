/*    --    Triggers auditoria servicios    --    */

DELIMITER //
CREATE TRIGGER auditoria_insert_servicios
AFTER INSERT ON servicios
FOR EACH ROW
BEGIN
  DECLARE max_id_auditoria INT;
  DECLARE _id_auditoria INT;
  SELECT MAX(id_auditoria) INTO max_id_auditoria FROM auditoria;
    IF max_id_auditoria IS NULL THEN
      SET _id_auditoria = 1;
    ELSE
      SET _id_auditoria = max_id_auditoria + 1;
	END IF;
  INSERT INTO auditoria (id_auditoria, tabla_afectada, reg_afectado, gestor, gestion, fecha_creacion) 
  VALUES (_id_auditoria, 'servicios', NEW.id_servicio, CURRENT_USER(), 'crear', NOW());
END //
DELIMITER ;


DELIMITER //
CREATE TRIGGER auditoria_delete_servicios
BEFORE DELETE ON servicios
FOR EACH ROW
BEGIN
  DECLARE max_id_auditoria INT;
  DECLARE _id_auditoria INT;
  SELECT MAX(id_auditoria) INTO max_id_auditoria FROM auditoria;
    IF max_id_auditoria IS NULL THEN
      SET _id_auditoria = 1;
    ELSE
      SET _id_auditoria = max_id_auditoria + 1;
	END IF;
  INSERT INTO auditoria (id_auditoria, tabla_afectada, reg_afectado, gestor, gestion, fecha_creacion) 
  VALUES (_id_auditoria, 'servicios', OLD.id_servicio, user(), 'eliminar', NOW());
END //
DELIMITER ;


DELIMITER //
CREATE TRIGGER auditoria_update_servicios
BEFORE UPDATE ON servicios
FOR EACH ROW
BEGIN
  DECLARE max_id_auditoria INT;
  DECLARE _id_auditoria INT;
  SELECT MAX(id_auditoria) INTO max_id_auditoria FROM auditoria;
    IF max_id_auditoria IS NULL THEN
      SET _id_auditoria = 1;
    ELSE
      SET _id_auditoria = max_id_auditoria + 1;
	END IF;
  INSERT INTO auditoria (id_auditoria, tabla_afectada, reg_afectado, gestor, gestion, fecha_creacion) 
  VALUES (_id_auditoria, 'servicios', OLD.id_servicio, user(), 'modificar', NOW());
END //
DELIMITER ;