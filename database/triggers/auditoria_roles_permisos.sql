/*    --    Triggers auditoria roles_permisos    --    */

DELIMITER //
CREATE TRIGGER auditoria_insert_roles_permisos
AFTER INSERT ON roles_permisos
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
  VALUES (_id_auditoria, 'roles_permisos', NEW.id_rol_permiso, CURRENT_USER(), 'crear', NOW());
END //
DELIMITER ;


DELIMITER //
CREATE TRIGGER auditoria_roles_permisos
BEFORE DELETE ON roles_permisos
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
  VALUES (_id_auditoria, 'roles_permisos', OLD.id_rol_permiso, user(), 'eliminar', NOW());
END //
DELIMITER ;


DELIMITER //
CREATE TRIGGER auditoria_roles_permisos
BEFORE UPDATE ON roles_permisos
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
  VALUES (_id_auditoria, 'roles_permisos', OLD.id_rol_permiso, user(), 'modificar', NOW());
END //
DELIMITER ;