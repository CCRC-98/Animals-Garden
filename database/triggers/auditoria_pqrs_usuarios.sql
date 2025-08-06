/*    --    Triggers auditoria pqrs_usuarios    --    */

DELIMITER //
CREATE TRIGGER auditoria_insert_pqrs_usuarios
AFTER INSERT ON pqrs_usuarios
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
  VALUES (_id_auditoria, 'pqrs_usuarios', NEW.id_pqrs_usr, CURRENT_USER(), 'crear', NOW());
END //
DELIMITER ;


DELIMITER //
CREATE TRIGGER auditoria_delete_pqrs_usuarios
BEFORE DELETE ON pqrs_usuarios
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
  VALUES (_id_auditoria, 'pqrs_usuarios', OLD.id_pqrs_usr, user(), 'eliminar', NOW());
END //
DELIMITER ;


DELIMITER //
CREATE TRIGGER auditoria_update_pqrs_usuarios
BEFORE UPDATE ON pqrs_usuarios
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
  VALUES (_id_auditoria, 'pqrs_usuarios', OLD.id_pqrs_usr, user(), 'modificar', NOW());
END //
DELIMITER ;