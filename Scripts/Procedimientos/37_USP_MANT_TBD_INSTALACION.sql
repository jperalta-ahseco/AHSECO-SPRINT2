USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_MANT_TBD_INSTALACION] 
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		24.10.24		Realiza el mantenimiento de la tabla TBD_INSTALACION con parametros.
  =======================================================================================================*/
(
	@IsTipoProceso			CHAR(1)
	,@IsID					BIGINT
	,@IsNUMREQ				BIGINT
	,@IsCANTIDAD			INT
	,@IsMARCA				VARCHAR(150)
	,@IsMODELO				VARCHAR(200)
	,@IsSERIE				VARCHAR(200)
	,@IsCANTIDADMP			INT
	,@IsPERIODICIDAD		VARCHAR(6)
	,@IsGARANTIA			VARCHAR(6)
	,@IsFECHAPROGRAMACION	DATETIME
	,@IsFECHAREAL			DATETIME
	,@UsrEjecuta			INT
)
AS
BEGIN
	DECLARE @COD BIGINT, @MSG VARCHAR(20)
	SET NOCOUNT ON;

	IF (@IsTipoProceso = 'I')
		BEGIN
			INSERT INTO TBD_INSTALACION(NUMREQ,CANTIDAD,MARCA,MODELO,SERIE,CANTIDADMP,PERIODICIDAD,GARANTIA,FECHAPROGRAMACION,FECHAREAL,USR_REG,FEC_REG)
			VALUES (@IsNUMREQ,@IsCANTIDAD,@IsMARCA,@IsMODELO,@IsSERIE,@IsCANTIDADMP,@IsPERIODICIDAD,@IsGARANTIA,@IsFECHAPROGRAMACION,@IsFECHAREAL,@UsrEjecuta, GETDATE())

			IF @@ROWCOUNT = 0
			BEGIN
				SET @COD = 0;
				SET @MSG = 'ERROR EN EL REGISTRO DE LA TABLA TBM_SERVICIOS'
			END
			ELSE
			BEGIN
				SET @COD = @@IDENTITY;
				SET @MSG = 'REGISTRO REALIZADO CON EXITO'
			END
		END
	ELSE
		IF(@IsTipoProceso = 'U')
			BEGIN
				UPDATE TBD_INSTALACION
				SET FECHAPROGRAMACION	= @IsFECHAPROGRAMACION
					,FECHAREAL			= @IsFECHAREAL
					,USR_MOD			= @UsrEjecuta
					,FEC_MOD			= GETDATE()
				WHERE ID = @IsID

				IF @@ROWCOUNT = 0
				BEGIN
					SET @COD = 0;
					SET @MSG = 'ERROR EN LA ACTUALIZACIÓN DE LA TABLA TBM_SERVICIOS'
				END
				ELSE
				BEGIN
					SET @COD = @IsID;
					SET @MSG = 'REGISTRO REALIZADO CON EXITO'
				END
			END
	SELECT @COD COD, @MSG MSG
	SET NOCOUNT ON;
END