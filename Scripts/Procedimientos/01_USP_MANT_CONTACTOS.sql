USE [DB_AHSECO]
GO

ALTER PROCEDURE [dbo].[USP_MANT_CONTACTOS]
/*=======================================================================================================
	Nombre:				Fecha:			Descripción:
	Diego A. Bazalar    09.09.24		Realiza el registro de los contactos por cliente.
  =======================================================================================================*/
	@isIdContacto INT = NULL,
	@isIdCliente BIGINT = NULL,
	@isRucCliente VARCHAR(12) = NULL,
	@isTipoProceso CHAR(1),
	@isTipDoc VARCHAR(10),
	@isNumDoc VARCHAR(12),
	@isNomCont VARCHAR(150),
	@isEstablecimiento VARCHAR(100),
	@isAreaContacto VARCHAR(100),
	@isTelefono VARCHAR(150),
	@isTelefono2 VARCHAR(150),
	@isCargo VARCHAR(50),
	@isCorreo VARCHAR(35),
	@isEstado BIT,
	@isAudit_Reg_Usr NVARCHAR(100) = NULL,
	@isAudit_Mod_Usr NVARCHAR(100) = NULL

AS
BEGIN
	IF @isTipoProceso = 1 --REGISTRONUEVO
	BEGIN
		INSERT INTO [dbo].[TBM_CONTACTOS]
			   (
				[ID_CLIENTE]
				,[TIPDOCCONTACTO]
				,[NUMDOCCONTACTO]
				,[NOMBRE CONTACTO]
				,[TELEFONOCONTACTO]
				,[TELEFONO2CONTACTO]
				,[CARGOCONTACTO]
				,[CORREOCONTACTO]
				,[ESTABLECIMIENTO]
				,[ESTADO]
				,[AUDIT_REG_USR]
				,[AUDIT_REG_FEC]
				,[AREACONTACTO]
			   )
		 VALUES
			   (
				@isIdCliente,
				@isTipDoc,
				@isNumDoc,
				@isNomCont,
				@isTelefono,
				@isTelefono2,
				@isCargo,
				@isCorreo,
				@isEstablecimiento,
				@isEstado,
				@isAudit_Reg_Usr,
				GETDATE(),
				@isAreaContacto
				)
	END
	ELSE IF @isTipoProceso = 2 --ACTUALIZA 
	BEGIN
		UPDATE [dbo].[TBM_CONTACTOS]
		SET		[TIPDOCCONTACTO]	=@isTipDoc,
				[NUMDOCCONTACTO]	=@isNumDoc,
				[NOMBRE CONTACTO]	=@isNomCont,
				[ESTABLECIMIENTO]	=@isEstablecimiento,
				[TELEFONOCONTACTO]	=@isTelefono,
				[TELEFONO2CONTACTO] =@isTelefono2,
				[CARGOCONTACTO]		=@isCargo,
				[CORREOCONTACTO]	=@isCorreo,
				[ESTADO]			=@isEstado,
				[AUDIT_MOD_USR]		=@isAudit_Mod_Usr,
				[AUDIT_MOD_FEC]		=GETDATE(),
				[AREACONTACTO]		=@isAreaContacto
		WHERE [IDCONTACTO] = @isIdContacto
	END
END