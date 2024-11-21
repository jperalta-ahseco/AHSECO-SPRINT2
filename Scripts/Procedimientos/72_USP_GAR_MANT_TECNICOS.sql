USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_GAR_MANT_TECNICOS]
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		21.11.24		Inserta tecnicos para el m�dulo de garantias, con parametros
  =======================================================================================================*/
(
	 @IsTipoProceso			CHAR(1)
	,@IsID_ASIG				BIGINT
	,@IsID_RECLAMO			BIGINT
	,@IsCOD_TECNICO			INT
	,@IsNOMBRES				VARCHAR(50)
	,@IsAPELLIDOPATERNO		VARCHAR(50)
	,@IsAPELLIDOMATERNO		VARCHAR(50)
	,@IsDOCUMENTO			VARCHAR(12)
	,@IsTIPO_DOCUMENTO		VARCHAR(9)
	,@IsCORREO				VARCHAR(100)
	,@IsTELEFONO			VARCHAR(100)
	,@IsZONA				VARCHAR(6)
	,@IsEMPRESA				VARCHAR(200)
	,@IsTIPOTECNICO			CHAR(1)
	,@IsESTADO				BIT
	,@IsUsrEjecuta			VARCHAR(50)
)
AS
BEGIN
	DECLARE @CODTEC BIGINT, @MSG VARCHAR(100)
	SET NOCOUNT ON;

	IF (@IsTipoProceso = 'I')
		BEGIN
			INSERT INTO [TBD_TECNICOGARANTIA](ID_RECLAMO,COD_TECNICO,NOMBRES,APELLIDOPATERNO,APELLIDOMATERNO,DOCUMENTO,TIPO_DOCUMENTO,CORREO,TELEFONO,ZONA,EMPRESA,TIPOTECNICO,ESTADO,USR_REG,FEC_REG)
			VALUES (@IsID_RECLAMO,@IsCOD_TECNICO,@IsNOMBRES,@IsAPELLIDOPATERNO,@IsAPELLIDOMATERNO,@IsDOCUMENTO,@IsTIPO_DOCUMENTO	,@IsCORREO,@IsTELEFONO,@IsZONA,@IsEMPRESA,@IsTIPOTECNICO,@IsESTADO,@IsUsrEjecuta,GETDATE())

			IF @@ROWCOUNT = 0
			BEGIN
				SET @CODTEC = 0;
				SET @MSG = 'ERROR EN EL REGISTRO DE LA TABLA [[TBD_TECNICOGARANTIA]]'
			END
			ELSE
			BEGIN
				SET @CODTEC = @@IDENTITY;
				SET @MSG = 'REGISTRO REALIZADO CON EXITO'
			END
		END
	ELSE
	BEGIN
		IF(@IsTipoProceso = 'U')
			BEGIN
				UPDATE [TBD_TECNICOGARANTIA]
				SET 
					ESTADO		= @IsESTADO
					,USR_MOD	= @IsUsrEjecuta
					,FEC_MOD	= GETDATE()
				WHERE ID = @IsID_ASIG

				IF @@ROWCOUNT = 0
				BEGIN
					SET @CODTEC = 0;
					SET @MSG = 'ERROR EN LA ACTUALIZACI�N DE LA TABLA [[TBD_TECNICOGARANTIA]]'
				END
				ELSE
				BEGIN
					SET @CODTEC = @IsID_RECLAMO;
					SET @MSG = 'REGISTRO REALIZADO CON EXITO'
				END
		END
	END
	SELECT @CODTEC COD, @MSG MSG
	SET NOCOUNT ON;
END