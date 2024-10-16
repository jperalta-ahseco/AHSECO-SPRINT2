USE [DB_AHSECO]
GO

CREATE PROCEDURE [dbo].[USP_MANT_MAIN_SOLICITUDES] 
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		25.09.24		Realiza el mantenimiento de la tabla TBM_SOLICITUDVENTA con parametros.
  =======================================================================================================*/
(
	@IsTipoProceso		CHAR(1)
	,@isCodSolicitud	BIGINT
	,@IsID_WORKFLOW		BIGINT
	,@IsID_FLUJO		INT
	,@IsFECHA_SOL		VARCHAR(10)
	,@IsTIPO_SOL		VARCHAR(6)
	,@IsCOD_MEDIOCONT	VARCHAR(6)
	,@IsIDCLIENTE		INT
	,@IsRUC				VARCHAR(12)
	,@IsRAZONSOCIAL		VARCHAR(200)
	,@IsASESORVENTA		VARCHAR(200)
	,@IsSTOCK			BIT
	,@IsESTADO			VARCHAR(3)
	,@isUsrEjecuta		VARCHAR(50) = NULL
	,@isIP_Ejecuta		VARCHAR(35)
)
AS
BEGIN
	DECLARE @CODSOL BIGINT, @MSG VARCHAR(20)
	SET NOCOUNT ON;

	IF (@IsTipoProceso = 'I')
		BEGIN
			INSERT INTO TBM_SOLICITUDVENTA(ID_WORKFLOW ,ID_FLUJO	,FECHA_SOL	  ,TIPO_SOL	   ,COD_MEDIOCONT	 ,IDCLIENTE    ,RUC	   ,RAZONSOCIAL	   
											,ASESORVENTA,STOCK,ESTADO,USR_REG,FEC_REG, IP_REG, IP_MOD)
									VALUES (@IsID_WORKFLOW ,@IsID_FLUJO ,@IsFECHA_SOL ,@IsTIPO_SOL ,@IsCOD_MEDIOCONT ,@IsIDCLIENTE ,@IsRUC ,@IsRAZONSOCIAL,@IsASESORVENTA
											,@IsSTOCK,@IsESTADO,@isUsrEjecuta,GETDATE(), @isIP_Ejecuta, '')

			SET @CODSOL = @@IDENTITY;
			SET @MSG = 'REGISTRO REALIZADO CON EXITO'
		END
	ELSE
		IF(@IsTipoProceso = 'U')
			BEGIN
				UPDATE TBM_SOLICITUDVENTA
				SET ID_FLUJO		 = @IsID_FLUJO
					,FECHA_SOL		 = @IsFECHA_SOL
					,TIPO_SOL		 = @IsTIPO_SOL
					,COD_MEDIOCONT	 = @IsCOD_MEDIOCONT
					,IDCLIENTE		 = @IsIDCLIENTE
					,RUC			 = @IsRUC
					,RAZONSOCIAL	 = @IsRAZONSOCIAL
					,ASESORVENTA	 = @IsASESORVENTA
					,STOCK			 = @IsSTOCK
					,ESTADO			 = @IsESTADO --Cuestionarse si es necesario esta opción. 
					,USR_MOD		 = @isUsrEjecuta
					,FEC_MOD		 = GETDATE()
					,IP_MOD			 = @isIP_Ejecuta
				WHERE ID_SOLICITUD = @isCodSolicitud
			END
		/*
		ELSE
			IF(@IsTipoProceso = 'D')
			BEGIN
				
			END

			*/
	SELECT @CODSOL COD, @MSG MSG
	SET NOCOUNT ON;
END