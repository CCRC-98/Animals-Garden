CREATE DATABASE db_animals_garden;

USE db_animals_garden;

CREATE TABLE IF NOT EXISTS modulos (
    id_modulo           TINYINT           UNSIGNED          NOT NULL          UNIQUE,
    nombre              VARCHAR(20)       NOT NULL,
    PRIMARY KEY(id_modulo)
);

CREATE TABLE IF NOT EXISTS roles (
    id_rol                TINYINT          NOT NULL         UNIQUE           CHECK(id_rol=1 OR id_rol=2 OR id_rol=3),   -- Roles (1-Administrador, 2-Veterinario, 3-Cliente)
    nombre                VARCHAR(15)      NOT NULL,
    PRIMARY KEY(id_rol)
);

CREATE TABLE IF NOT EXISTS permisos (
    id_permiso          TINYINT            UNSIGNED         NOT NULL        UNIQUE,
    nombre              VARCHAR(25)        NOT NULL,
    id_modulo           TINYINT            UNSIGNED         NOT NULL,
    PRIMARY KEY(id_permiso),
    FOREIGN KEY(id_modulo) REFERENCES modulos(id_modulo)
);

CREATE TABLE IF NOT EXISTS roles_permisos (
    id_rol_permiso          TINYINT         UNSIGNED           NOT NULL            UNIQUE,
    id_rol                  TINYINT         NOT NULL,
    id_permiso              TINYINT         UNSIGNED           NOT NULL,
    PRIMARY KEY(id_rol_permiso),
    FOREIGN KEY(id_rol) REFERENCES roles(id_rol),
    FOREIGN KEY(id_permiso) REFERENCES permisos(id_permiso)
);

CREATE TABLE IF NOT EXISTS servicios (
    id_servicio         TINYINT         UNSIGNED            NOT NULL            UNIQUE,
    nombre              VARCHAR(20)     NOT NULL,
    descripcion         VARCHAR(250)    NOT NULL,
    PRIMARY KEY(id_servicio)
);

CREATE TABLE IF NOT EXISTS usuarios (
    dni                     VARCHAR(10)        NOT NULL        UNIQUE,
    tp_dni                  VARCHAR(30)        NOT NULL,
    nombre                  VARCHAR(25)        NOT NULL,
    apellido                VARCHAR(25)        NOT NULL,
    direccion               VARCHAR(30)        NOT NULL,
    telefono                VARCHAR(10)        NOT NULL,
    correo                  VARCHAR(30)        NOT NULL,
    clave                   VARCHAR(60)        NOT NULL,
    rol                     TINYINT            NOT NULL        DEFAULT 3,
    PRIMARY KEY(dni),
    FOREIGN KEY(rol) REFERENCES roles(id_rol)
);

CREATE TABLE IF NOT EXISTS mascotas (
    id_mascota          INT                 UNSIGNED            NOT NULL            UNIQUE,
    nombre              VARCHAR(25)         NOT NULL,
    especie             VARCHAR(25)         NOT NULL,
    raza                VARCHAR(25)         NOT NULL,
    edad                TINYINT             NOT NULL            CHECK(edad>0 AND edad<100),
    sexo                VARCHAR(6)          NOT NULL            CHECK(sexo='hembra' OR sexo='macho'),
    propietario         VARCHAR(10)         NOT NULL,
    PRIMARY KEY(id_mascota),
    FOREIGN KEY(propietario) REFERENCES usuarios(dni)
);

CREATE TABLE IF NOT EXISTS historiales_medicos (
    id_hist_medico      INT               UNSIGNED          NOT NULL            UNIQUE,
    fecha_creacion      TIMESTAMP         DEFAULT CURRENT_TIMESTAMP,
    id_veterinario      VARCHAR(10)       NOT NULL,
    id_mascota          INT               UNSIGNED          NOT NULL,
    id_servicio         TINYINT           UNSIGNED          NOT NULL,
    observacion         TEXT              NOT NULL,
    PRIMARY KEY(id_hist_medico),
    FOREIGN KEY(id_veterinario) REFERENCES usuarios(dni),
    FOREIGN KEY(id_mascota) REFERENCES mascotas(id_mascota),
    FOREIGN KEY(id_servicio) REFERENCES servicios(id_servicio)
);



CREATE TABLE IF NOT EXISTS pqrs (
    id_pqrs            TINYINT            NOT NULL            UNIQUE            CHECK(id_pqrs=1 OR id_pqrs=2 OR id_pqrs=3 OR id_pqrs=4),    -- (1-p, 2-q, 3-r, 4-s)         
    nombre             VARCHAR(15)        NOT NULL,
    PRIMARY KEY(id_pqrs)
);

CREATE TABLE IF NOT EXISTS pqrs_usuarios (
    id_pqrs_usr            INT                UNSIGNED          NOT NULL            UNIQUE,
    id_pqrs                TINYINT            NOT NULL,
    nombre                 VARCHAR(25)        NOT NULL,
    correo                 VARCHAR(30)        NOT NULL,
    telefono               VARCHAR(10)        NOT NULL,
    mensaje                VARCHAR(300)       NOT NULL,
    PRIMARY KEY(id_pqrs_usr),
    FOREIGN KEY(id_pqrs) REFERENCES pqrs(id_pqrs)
);

CREATE TABLE IF NOT EXISTS auditoria (
    id_auditoria            INT                UNSIGNED         NOT NULL            UNIQUE,
    tabla_afectada          VARCHAR(30)        NOT NULL,                   
    reg_afectado            VARCHAR(10)        NOT NULL,
    gestor                  VARCHAR(20)        NOT NULL,
    gestion                 ENUM('crear', 'eliminar', 'modificar'),
    fecha_creacion          TIMESTAMP          DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id_auditoria)
);