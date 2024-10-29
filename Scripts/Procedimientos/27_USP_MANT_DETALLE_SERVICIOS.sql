USE [DB_AHSECO]
GO

CREATE PROCEDURE [dbo].[USP_MANT_DETALLE_SERVICIOS] 
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		17.10.24		Realiza el mantenimiento de la tabla TBD_SERVICIOS con parametros.
  =======================================================================================================*/
(
	 @IsTipoProceso		 CHAR(1)
	,@IsID				 BIGINT
	,@IsID_SERVICIO		 INT
	,@IsDESMANTENIMIENTO VARCHAR(500)
	,@IsELIMINAR		 INT
	,@IsUsrEjecuta		 VARCHAR(50)			 
)
AS
BEGIN
	DECLARE @CODSERVICIO BIGINT, @MSG VARCHAR(100)
	SET NOCOUNT ON;

	IF (@IsTipoProceso = 'I')
		BEGIN
			INSERT INTO TBD_SERVICIOS(ID_SERVICIO,DESMANTENIMIENTO,ELIMINAR,USR_REG,FEC_REG)
							VALUES (@IsID_SERVICIO,@IsDESMANTENIMIENTO,@IsELIMINAR,@IsUsrEjecuta,GETDATE())

			IF @@ROWCOUNT = 0
			BEGIN
				SET @CODSERVICIO = 0;
				SET @MSG = 'ERROR EN EL REGISTRO DE LA TABLA TBM_SERVICIOS'
			END
			ELSE
			BEGIN
				SET @CODSERVICIO = @@IDENTITY;
				SET @MSG = 'REGISTRO REALIZADO CON EXITO'
			END
		END
	ELSE
		IF(@IsTipoProceso = 'U')
			BEGIN
				UPDATE TBD_SERVICIOS
				SET ID_SERVICIO		   = @IsID_SERVICIO						
					,DESMANTENIMIENTO  = @IsDESMANTENIMIENTO
					,ELIMINAR		   = @IsELIMINAR
					,USR_MOD		   = @IsUsrEjecuta
					,FEC_MOD		   = GETDATE()
				WHERE ID = @IsID

				IF @@ROWCOUNT = 0
				BEGIN
					SET @CODSERVICIO = 0;
					SET @MSG = 'ERROR EN LA ACTUALIZACIÓN DE LA TABLA TBM_SERVICIOS'
				END
				ELSE
				BEGIN
					SET @CODSERVICIO = @IsID;
					SET @MSG = 'REGISTRO REALIZADO CON EXITO'
				END
			END
		IF(@IsTipoProceso = 'D')
			BEGIN
				UPDATE TBD_SERVICIOS
				SET ELIMINAR		   = 1
					,USR_MOD		   = @IsUsrEjecuta
					,FEC_MOD		   = GETDATE()
				WHERE ID = @IsID

				IF @@ROWCOUNT = 0
				BEGIN
					SET @CODSERVICIO = 0;
					SET @MSG = 'ERROR EN LA ELIMINACIÓN DE LA TABLA TBM_SERVICIOS'
				END
				ELSE
				BEGIN
					SET @CODSERVICIO = @IsID;
					SET @MSG = 'REGISTRO ELIMINADO CON EXITO'
				END
			END
	SELECT @CODSERVICIO COD, @MSG MSG
	SET NOCOUNT ON;
END