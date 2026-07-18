INSERT INTO modulos (id_modulo, nombre) VALUES
(1, 'Veterinarios'),
(2, 'Usuarios'),
(3, 'Mascotas'),
(4, 'Historiales medicos'),
(5, 'Servicios'),
(6, 'PQRS_Usuarios');


INSERT INTO roles (id_rol, nombre) VALUES
(1, 'Administrador'),
(2, 'Veterinario'),
(3, 'Usuario');


INSERT INTO permisos (id_permiso, nombre, id_modulo) VALUES
(1, 'ver', 1),              --  act en Veterinarios
(2, 'crear', 1),
(3, 'eliminar', 1),
(4, 'modificar', 1),
(5, 'ver', 2),              --  act en Clientes
(6, 'crear', 2),
(7, 'eliminar', 2),
(8, 'modificar', 2),
(9, 'ver', 3),              --  act en Mascotas
(10, 'crear', 3),
(11, 'eliminar', 3),
(12, 'modificar', 3),
(13, 'ver', 4),              --  act en Historiales medicos
(14, 'crear', 4),
(15, 'eliminar', 4),
(16, 'ver', 5),             --  act en Servicios
(17, 'crear', 5),
(18, 'eliminar', 5),
(19, 'modificar', 5),
(20, 'ver', 6),             --  act en PQRS_Usuarios
(21, 'crear', 6),
(22, 'eliminar', 6);


INSERT INTO roles_permisos (id_rol_permiso, id_rol, id_permiso) VALUES
(1, 1, 1),      --  Permisos Administrador
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 1, 6),
(7, 1, 7),
(8, 1, 8),
(9, 1, 9),
(10, 1, 10),
(11, 1, 11),
(12, 1, 12),
(13, 1, 13),
(14, 1, 14),
(15, 1, 15),
(16, 1, 16),
(17, 1, 17),
(18, 1, 18),
(19, 1, 19),
(20, 1, 20),
(21, 1, 21),
(22, 1, 22),
(23, 2, 5),     --  Permisos Veterinario
(24, 2, 6),
(25, 2, 7),
(26, 2, 8),
(27, 2, 9),
(28, 2, 10),
(29, 2, 11),
(30, 2, 12),
(31, 2, 13),
(32, 2, 14),
(33, 2, 15),
(34, 2, 16),
(35, 2, 20),
(36, 3, 9),     --  Permisos Cliente
(37, 3, 13),
(38, 3, 16),
(39, 3, 22);


INSERT INTO servicios (id_servicio, nombre, descripcion) VALUES
(1, 'Hospitalizacion', 'Permanencia del paciente en la veterinaria'),
(2, 'Esterilizacion', 'Proceso quirurgico para evitar el embarazo de la mascota'),
(3, 'Vacunacion', 'Control y seguimiento de las vacunas de la mascota'),
(4, 'Spa', 'Cuidado estetico de la mascota'),
(5, 'Guarderia', 'Establecimiento para el cuidado y permanencia de la mascota'),
(6, 'Oftalmologia', 'Cuidado de la salud visual de la mascota');


INSERT INTO usuarios (dni, tp_dni, nombre, apellido, direccion, telefono, correo, clave, rol) VALUES
('1057605897', 'Cedula de ciudadania', 'Camilo', 'Capera', 'Calle 12 # 29 - 30', '3112076414', 'camilo@gmail.com', '$2a$08$5DxVE2GQk9Voy3OxnI2zBOgaQJWW6Eoudjw2p8ATSJiHGHl9Rdeh.', 1),
('1005236229', 'Cedula de ciudadania', 'Arley', 'Martinez', 'Calle 12 # 29 - 30', '3112076414', 'arley@gmail.com', '$2a$08$5DxVE2GQk9Voy3OxnI2zBOgaQJWW6Eoudjw2p8ATSJiHGHl9Rdeh.', 2),
('1057605899', 'Cedula de ciudadania', 'Alejandro', 'Garay', 'Calle 12 # 29 - 30', '3112076414', 'alejandro@gmail.com', '$2a$08$5DxVE2GQk9Voy3OxnI2zBOgaQJWW6Eoudjw2p8ATSJiHGHl9Rdeh.', 3);

INSERT INTO pqrs (id_pqrs, nombre) VALUES
(1, 'Peticion'),
(2, 'Queja'),
(3, 'Reclamo'),
(4, 'Solicitud');