/*    --    Triggers auditoria roles    --    */

DELIMITER //
CREATE TRIGGER auditoria_insert_roles
AFTER INSERT ON roles
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
  VALUES (_id_auditoria, 'roles', NEW.id_rol, CURRENT_USER(), 'crear', NOW());
END //
DELIMITER ;


DELIMITER //
CREATE TRIGGER auditoria_delete_roles
BEFORE DELETE ON roles
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
  VALUES (_id_auditoria, 'roles', OLD.id_rol, user(), 'eliminar', NOW());
END //
DELIMITER ;


DELIMITER //
CREATE TRIGGER auditoria_update_roles
BEFORE UPDATE ON roles
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
  VALUES (_id_auditoria, 'roles', OLD.id_rol, user(), 'modificar', NOW());
END //
DELIMITER ;