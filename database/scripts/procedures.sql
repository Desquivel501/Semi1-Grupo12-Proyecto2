DELIMITER $$

CREATE DATABASE IF NOT EXISTS PR2 $$

USE PR2 $$

/***************************************PROCEDIMIENTOS PARA MANEJO DE USUARIOS Y AMIGOS**********************************************/

-- Procedimiento para registro de usuarios
DROP PROCEDURE IF EXISTS Register $$
CREATE PROCEDURE Register (
	IN email_in VARCHAR(255),
	IN password_in VARCHAR(255),
	IN name_in VARCHAR(200),
	IN lastname_in VARCHAR(200),
	IN dpi_in BIGINT,
	IN photo_in VARCHAR(255)
)
register:BEGIN
	IF NOT email_format(email_in) THEN
		SELECT 'El correo que ha ingresado no tiene un formato válido' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE register;
	END IF;

	IF email_exists(email_in) THEN
		SELECT 'El correo que ha ingresado ya se encuentra registrado' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE register;
	END IF;

	IF name_in = '' OR lastname_in = '' OR name_in IS NULL OR lastname_in IS NULL THEN 
		SELECT 'Los nombres no pueden estar en blanco' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE register;
	END IF;

	IF photo_in = '' OR photo_in IS NULL THEN 
		SELECT 'Se debe agregar una fotografía de usuario' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE register;
	END IF;

	IF dpi_in = 0 OR dpi_in IS NULL THEN 
		SELECT 'Se debe indicar el DPI para crer una cuenta' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE register;
	END IF;

	IF password_in = '' OR password_in IS NULL THEN 
		SELECT 'Se debe agregar una contraseña para la cuenta' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE register;
	END IF;

	INSERT INTO Users
	VALUES (email_in, password_in, name_in, lastname_in, dpi_in, photo_in, 1);

	SELECT 'El usuario ha sido registrado exitosamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$

-- Procedimiento para eliminación de usuarios
DROP PROCEDURE IF EXISTS DeleteUser $$
CREATE PROCEDURE DeleteUser(
	IN email_in VARCHAR(255)
)
delete_user:BEGIN
	IF NOT email_exists(email_in) THEN
		SELECT 'El correo que ha ingresado no se encuentra registrado' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE delete_user;
	END IF;	

	DELETE 
	FROM Users u
	WHERE u.email = email_in;

	SELECT 'El usuario ha sido eliminado exitosamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$

-- Procedimiento para actualizar los datos de un usuario
DROP PROCEDURE IF EXISTS UpdateUser $$
CREATE PROCEDURE UpdateUser (
	IN email_in VARCHAR(255),
	IN password_in VARCHAR(255),
	IN name_in VARCHAR(200),
	IN lastname_in VARCHAR(200),
	IN dpi_in BIGINT,
	IN photo_in VARCHAR(255)
)
update_user:BEGIN
	IF NOT email_format(email_in) THEN
		SELECT 'El correo que ha ingresado no tiene un formato válido' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE update_user;
	END IF;

	IF name_in = '' OR lastname_in = '' OR name_in IS NULL OR lastname_in IS NULL THEN 
		SELECT 'Los nombres no pueden estar en blanco' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE update_user;
	END IF;

	IF photo_in = '' OR photo_in IS NULL THEN 
		SELECT 'Se debe agregar una fotografía de usuario' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE update_user;
	END IF;

	IF dpi_in = 0 OR dpi_in IS NULL THEN 
		SELECT 'Se debe indicar el DPI para crer una cuenta' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE update_user;
	END IF;

	IF password_in = '' OR password_in IS NULL THEN 
		SELECT 'Se debe agregar una contraseña para la cuenta' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE update_user;
	END IF;	

	UPDATE Users u 
	SET u.password = password_in,
	u.name = name_in,
	u.lastname = lastname_in,
	u.dpi = dpi_in,
	u.photo = photo_in
	WHERE u.email = email_in;

	SELECT 'Los datos han sido actualizados exitosamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$


-- Procedimiento para obtener los datos de un usuario
DROP PROCEDURE IF EXISTS GetUserData $$
CREATE PROCEDURE GetUserData (
	IN email_in VARCHAR(255)
)
get_user_data:BEGIN
	IF (NOT email_exists(email_in)) THEN
		SELECT 'El correo que ha ingresado no existe' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE get_user_data;
	END IF;	
	
	SELECT u.email, 
	u.name,
	u.lastname AS family_name,
	u.dpi AS dpi,
	u.photo AS image
	FROM Users u 
	WHERE u.email = email_in;
END $$

-- Procedimiento para realizar una solicitud de amistad
DROP PROCEDURE IF EXISTS CreateFriendRequest $$
CREATE PROCEDURE CreateFriendRequest (
	IN email_in VARCHAR(255),
	IN friend_email_in VARCHAR(255)
)
create_friend_request:BEGIN
	IF (NOT email_exists(email_in)) OR (NOT email_exists(friend_email_in)) THEN
		SELECT 'El correo que ha ingresado no existe' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE create_friend_request;
	END IF;	

	IF request_exists(email_in, friend_email_in) THEN
		SELECT 'El usuario que ha ingresado ya es su amigo o usted ya le ha enviado solicitud de amistad' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE create_friend_request;	
	END IF;

	IF request_received(email_in, friend_email_in) THEN
		SELECT 'Usted ya tiene una solicitud de amistad del usuario seleccionado o ya es su amigo' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE create_friend_request;	
	END IF;

	INSERT INTO Friends(email, friend_email, confirmed)
	VALUES (email_in, friend_email_in, FALSE);

	SELECT 'Solicitud de amistad realizada correctamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$


-- Procedimiento para aceptar una solicitud de amistad
DROP PROCEDURE IF EXISTS AcceptFriendRequest $$
CREATE PROCEDURE AcceptFriendRequest (
	IN email_in VARCHAR(255),
	IN friend_email_in VARCHAR(255)	
)
accept_friend_request:BEGIN
	IF (NOT email_exists(email_in)) OR (NOT email_exists(friend_email_in)) THEN
		SELECT 'El correo que ha ingresado no existe' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE accept_friend_request;
	END IF;	

	IF NOT request_received(email_in, friend_email_in) THEN
		SELECT 'Usted no tiene solicitudes de amistad del usuario seleccionado' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE accept_friend_request;	
	END IF;

	UPDATE Friends 
	SET Confirmed = TRUE 
	WHERE email = friend_email_in
	AND friend_email = email_in;

	SELECT 'Se ha aceptado la solicitud de amistad de forma exitosa' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$


-- Procedimiento para obtener las solicitudes de amistad de un usuario
DROP PROCEDURE IF EXISTS GetFriendRequests $$
CREATE PROCEDURE GetFriendRequests (
	IN email_in VARCHAR(255)
)
get_friend_requests:BEGIN
	IF NOT email_exists(email_in)THEN
		SELECT 'El correo que ha ingresado no existe' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE get_friend_requests;
	END IF;	

	SELECT u.email, 
	u.name,
	u.lastname AS family_name,
	u.dpi AS dpi,
	u.photo AS image
	FROM Friends f 
	JOIN Users u 
	ON f.email = u.email 
	WHERE f.friend_email = email_in
	AND f.confirmed = FALSE;
END $$


-- Procedimiento para rechazar una solicitud de amistad
DROP PROCEDURE IF EXISTS DeclineFriendRequest $$
CREATE PROCEDURE DeclineFriendRequest (
	IN email_in VARCHAR(255),
	IN friend_email_in VARCHAR(255)
)
decline_friend_request:BEGIN
	IF (NOT email_exists(email_in)) OR (NOT email_exists(friend_email_in)) THEN
		SELECT 'El correo que ha ingresado no existe' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE decline_friend_request;
	END IF;	

	IF NOT request_received(email_in, friend_email_in) THEN
		SELECT 'Usted ya tiene una solicitud de amistad del usuario seleccionado o ya es su amigo' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE decline_friend_request;	
	END IF;

	DELETE 
	FROM Friends  
	WHERE email = friend_email_in
	AND friend_email = email_in;

	SELECT 'Se ha rechazado la solicitud de amistad de forma exitosa' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$


-- Procedimiento para obtener todos los usuarios que son amigos de un usuario
DROP PROCEDURE IF EXISTS GetUserFriends $$
CREATE PROCEDURE GetUserFriends (
	IN email_in VARCHAR(255)
)
get_user_friends:BEGIN
	IF (NOT email_exists(email_in)) THEN
		SELECT 'El correo que ha ingresado no existe' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE get_user_friends;
	END IF;		

	SELECT u.email,
		u.name,
		u.lastname AS family_name,
		u.dpi,
		u.photo AS image,
		f.id_friendship 
	FROM Users u 
	JOIN Friends f 
	ON ((f.email = email_in AND f.friend_email = u.email )
	OR (f.email = u.email AND f.friend_email = email_in))
	WHERE friends(email_in, u.email);
END $$


-- Procedimiento para obtener todos los usuarios que no son amigos de alguien en concreto
DROP PROCEDURE IF EXISTS GetNonFriends $$
CREATE PROCEDURE GetNonFriends (
	IN email_in VARCHAR(255)	
)
get_non_friends:BEGIN
	IF (NOT email_exists(email_in)) THEN
		SELECT 'El correo que ha ingresado no existe' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE get_non_friends;
	END IF;	

	SELECT u.email,
		u.name,
		u.lastname AS family_name,
		u.dpi,
		u.photo AS image,
		f.id_friendship 
	FROM Users u 
	WHERE NOT friends(u.email, email_in)
	AND u.email != email_in;
END $$




