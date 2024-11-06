USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_MANT_MAIN_SOLICITUDES] 
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		25.09.24		Realiza el mantenimiento de la tabla TBM_SOLICITUDVENTA con parametros.
  =======================================================================================================*/
(
	@IsTipoProceso		CHAR(1)
	,@isCodSolicitud	BIGINT
	,@IsID_WORKFLOW		BIGINT
	,@IsID_FLUJO		INT
	,@IsTipoVenta		VARCHAR(6)
	,@IsFECHA_SOL		VARCHAR(10)
	,@IsTIPO_SOL		VARCHAR(6)
	,@IsCOD_MEDIOCONT	VARCHAR(6)
	,@IsIDCLIENTE		INT
	,@IsRUC				VARCHAR(12)
	,@IsRAZONSOCIAL		VARCHAR(200)
	,@IsASESORVENTA		VARCHAR(200)
	,@IsESTADO			VARCHAR(5)
	,@IsCOD_EMPRESA		VARCHAR(10)
	,@TipoProceso VARCHAR(200)
	,@NumProceso VARCHAR(50)
	,@isUsrEjecuta		VARCHAR(50) = NULL
	,@isIP_Ejecuta		VARCHAR(35)
)
AS
BEGIN
	DECLARE @CODSOL BIGINT, @MSG VARCHAR(20)
	SET NOCOUNT ON;

	IF (@IsTipoProceso = 'I')
		BEGIN
			INSERT INTO TBM_SOLICITUDVENTA(ID_WORKFLOW ,ID_FLUJO	,TIPOVENTA,FECHA_SOL	  ,TIPO_SOL	   ,COD_MEDIOCONT,
											TIPOPROCESO,NROPROCESO,IDCLIENTE    ,RUC	   ,RAZONSOCIAL	   
											,ASESORVENTA,ESTADO,COD_EMPRESA,USR_REG,FEC_REG, IP_REG, IP_MOD)
									VALUES (@IsID_WORKFLOW ,@IsID_FLUJO ,@IsTipoVenta,CONVERT(DATETIME,@IsFECHA_SOL,103),@IsTIPO_SOL ,@IsCOD_MEDIOCONT ,
											@TipoProceso,@NumProceso,@IsIDCLIENTE ,@IsRUC ,@IsRAZONSOCIAL,@IsASESORVENTA
											,@IsESTADO,@IsCOD_EMPRESA,@isUsrEjecuta,GETDATE(), @isIP_Ejecuta, '')

			SET @CODSOL = @@IDENTITY;
			SET @MSG = 'REGISTRO REALIZADO CON EXITO'
		END
	ELSE
		IF(@IsTipoProceso = 'U')
			BEGIN
				UPDATE TBM_SOLICITUDVENTA
				SET ID_FLUJO		 = @IsID_FLUJO
					,TIPOVENTA = @IsTipoVenta
					,FECHA_SOL		 = @IsFECHA_SOL
					,TIPO_SOL		 = @IsTIPO_SOL
					,COD_MEDIOCONT	 = @IsCOD_MEDIOCONT
					,IDCLIENTE		 = @IsIDCLIENTE
					,RUC			 = @IsRUC
					,RAZONSOCIAL	 = @IsRAZONSOCIAL
					,ASESORVENTA	 = @IsASESORVENTA
					,ESTADO			 = @IsESTADO --Cuestionarse si es necesario esta opción. 
					,COD_EMPRESA	 = @IsCOD_EMPRESA
					,NROPROCESO = @NumProceso
					,TIPOPROCESO= @TipoProceso
					,USR_MOD		 = @isUsrEjecuta
					,FEC_MOD		 = GETDATE()
					,IP_MOD			 = @isIP_Ejecuta
				WHERE ID_SOLICITUD = @isCodSolicitud
			END
	SELECT @CODSOL COD, @MSG MSG
	SET NOCOUNT ON;
END