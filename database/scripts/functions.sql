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


-- FUNCIÓN PARA VERIFICAR QUE UNA PUBLICACIÓN EXISTA
DROP FUNCTION IF EXISTS publication_exists $$
CREATE FUNCTION publication_exists(
	pub_id INTEGER
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE existe BOOLEAN;
    SELECT EXISTS( SELECT 1 FROM Publications p WHERE p.pub_id = pub_id) INTO existe;  
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


-- Función para obtener el id de un tag
DROP FUNCTION IF EXISTS get_tag_id $$
CREATE FUNCTION get_tag_id (
	tag_in VARCHAR(255)
)
RETURNS INTEGER
DETERMINISTIC
BEGIN
	DECLARE id INTEGER;
	SELECT NULL INTO id;
	
	SELECT t.tag_id INTO id
	FROM Tags t 
	WHERE t.name = tag_in;

	RETURN(id);
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


-- Función para revisar si una publicación ya tiene un tag
DROP FUNCTION IF EXISTS publication_tag_used $$
CREATE FUNCTION publication_tag_used (
	tag_id_in INTEGER,
	pub_id_in INTEGER
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE used BOOLEAN;
	SELECT EXISTS (
		SELECT 1
		FROM Tags_detail td 
		WHERE td.tag_id = tag_id_in
		AND td.pub_id = pub_id_in
	) INTO used;
	RETURN(used);
END $$
