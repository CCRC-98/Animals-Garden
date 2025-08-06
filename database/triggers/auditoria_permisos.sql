/*    --    Triggers auditoria permisos    --    */

DELIMITER //
CREATE TRIGGER auditoria_insert_permisos
AFTER INSERT ON permisos
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
  VALUES (_id_auditoria, 'permisos', NEW.id_permiso, CURRENT_USER(), 'crear', NOW());
END //
DELIMITER ;


DELIMITER //
CREATE TRIGGER auditoria_delete_permisos
BEFORE DELETE ON permisos
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
  VALUES (_id_auditoria, 'permisos', OLD.id_permiso, user(), 'eliminar', NOW());
END //
DELIMITER ;


DELIMITER //
CREATE TRIGGER auditoria_update_permisos
BEFORE UPDATE ON permisos
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
  VALUES (_id_auditoria, 'permisos', OLD.id_permiso, user(), 'modificar', NOW());
END //
DELIMITER ;