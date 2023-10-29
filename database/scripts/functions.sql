DELIMITER $$

CREATE DATABASE IF NOT EXISTS PR2 $$

USE PR2 $$

-- FUNCIÓN PARA VERIFICAR QUE UN CORREO TENGA EL FORMATO CORRECTO
DROP FUNCTION IF EXISTS email_format $$
CREATE FUNCTION email_format(
	email VARCHAR(255)
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE valido BOOLEAN;
	IF (SELECT REGEXP_LIKE(email, '^[[:alnum:]-\\.]+@([[:alnum:]-]+\\.)+[[:alnum:]-]{2,4}$') = 1) THEN
		SELECT TRUE INTO valido;
	ELSE
		SELECT FALSE INTO valido;
	END IF;
    RETURN (valido);
END $$

-- FUNCIÓN PARA VERIFICAR QUE UN CORREO SEA ÚNICO
DROP FUNCTION IF EXISTS email_exists $$
CREATE FUNCTION email_exists(
	email VARCHAR(255)
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE existe BOOLEAN;
    SELECT EXISTS( SELECT 1 FROM Users u WHERE u.email = email) INTO existe;  
    RETURN(existe);
END $$

-- FUNCIÓN PARA VERIFICAR SI YA EXISTE UNA SOLICITUD DE AMISTAD
DROP FUNCTION IF EXISTS request_exists $$
CREATE FUNCTION request_exists(
	email_in VARCHAR(255),
	friend_email_in VARCHAR(255)
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE existe BOOLEAN;
	SELECT EXISTS (
		SELECT 1
		FROM Friends f 
		WHERE f.email = email_in
		AND f.friend_email = friend_email_in
	) INTO existe;
    RETURN(existe);
END $$

-- FUNCIÓN PARA VERIFICAR SI YA EXISTE UNA SOLICITUD DE AMISTAD
DROP FUNCTION IF EXISTS request_received $$
CREATE FUNCTION request_received(
	email_in VARCHAR(255),
	friend_email_in VARCHAR(255)
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE existe BOOLEAN;
	SELECT EXISTS (
		SELECT 1
		FROM Friends f 
		WHERE f.friend_email  = email_in
		AND f.email  = friend_email_in
	) INTO existe;
    RETURN(existe);
END $$


-- Función para verificar que una amistad exista
DROP FUNCTION IF EXISTS friendship_exists $$
CREATE FUNCTION friendship_exists(
	friendship_id INTEGER
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE existe BOOLEAN;
    SELECT EXISTS( SELECT 1 FROM Friends f WHERE f.id_friendship = friendship_id) INTO existe;  
    RETURN(existe);
END $$


-- Función para verificar que dos personas sean amigas
DROP FUNCTION IF EXISTS friends $$
CREATE FUNCTION friends(
	email_in VARCHAR(255),
	friend_email_in VARCHAR(255)
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE friends BOOLEAN;
	SELECT EXISTS(
		SELECT 1
		FROM Friends f 
		WHERE ((f.email = email_in AND f.friend_email = friend_email_in)
		OR (f.email = friend_email_in AND f.friend_email = email_in))
		AND (f.confirmed = TRUE)
	) INTO friends;
	RETURN(friends);
END $$




-- Función para obtener la fecha actual
DROP FUNCTION IF EXISTS actual_date $$
CREATE FUNCTION actual_date(
)
RETURNS DATETIME
DETERMINISTIC
BEGIN
	DECLARE fecha DATETIME;
    SELECT CONVERT_TZ(NOW(), 'SYSTEM', 'America/Guatemala') INTO fecha;
    RETURN (fecha);
END $$



