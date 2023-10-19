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

