USE [DB_AHSECO]
GO

CREATE PROCEDURE [dbo].[USP_MANT_ZONAS] 
/*=======================================================================================================
	Nombre:				Fecha:			Descripción:
	Diego A. Bazalar    21.08.24		Realiza el registro/update de las zonas.
	EXEC [USP_MANT_ZONAS]
  =======================================================================================================*/
	@isTipoProceso CHAR(1),
	@isId INT = NULL, --pasar solo en update.
	@isDesZona VARCHAR(100),
	@isEstado BIT,
	@isAudit_Reg_Usr NVARCHAR(100) = NULL,
	@isAudit_Mod_Usr NVARCHAR(100) = NULL
AS
BEGIN
DECLARE @COD INT, @MESSAGE VARCHAR(100)
	IF EXISTS(SELECT 1 FROM [dbo].[TBM_ZONAS] WHERE UPPER([DESZONA]) = UPPER(TRIM(@isDesZona)))
	BEGIN
		SET @COD = 1
		SET @MESSAGE = 'El nombre escrito ya ha sido ingresado, por favor ingrese otro.'
	END
	ELSE
	BEGIN
		IF @isTipoProceso = 1 --REGISTRONUEVO
		BEGIN
			INSERT INTO [dbo].[TBM_ZONAS]
				   ([DESZONA],
					[ESTADO],
					[AUDIT_REG_USR],
					[AUDIT_REG_FEC])
			 VALUES
				   (@isDesZona,
					@isEstado,
					@isAudit_Reg_Usr,
					GETDATE())
		END
		ELSE IF @isTipoProceso = 2 --ACTUALIZA 
		BEGIN
			UPDATE [dbo].[TBM_ZONAS]
			SET
				ESTADO = @isEstado,
				DESZONA = @isDesZona,
				AUDIT_MOD_USR = @isAudit_Mod_Usr,
				AUDIT_MOD_FEC = GETDATE()
			WHERE [ID] = @isId
		END

		SET @COD = 0
		SET @MESSAGE = 'Se realizó la ejecución correctamente.'
	END

	SELECT @COD COD, @MESSAGE MSJ
END