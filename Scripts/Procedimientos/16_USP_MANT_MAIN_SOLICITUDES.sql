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
	,@isIDSEDE			INT
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
	DECLARE @CODSOL BIGINT, @MSG VARCHAR(200)
	SET NOCOUNT ON;

	IF (@IsTipoProceso = 'I')
		BEGIN
			INSERT INTO TBM_SOLICITUDVENTA(ID_WORKFLOW ,ID_FLUJO	,TIPOVENTA,FECHA_SOL	  ,TIPO_SOL	   ,COD_MEDIOCONT,
											TIPOPROCESO,NROPROCESO,IDCLIENTE    ,RUC	   ,RAZONSOCIAL	   
											,ASESORVENTA,ESTADO,COD_EMPRESA,USR_REG,FEC_REG, IP_REG, IP_MOD,IDSEDE)
									VALUES (@IsID_WORKFLOW ,@IsID_FLUJO ,@IsTipoVenta,CONVERT(DATETIME,@IsFECHA_SOL,103),@IsTIPO_SOL ,@IsCOD_MEDIOCONT ,
											@TipoProceso,@NumProceso,@IsIDCLIENTE ,@IsRUC ,@IsRAZONSOCIAL,@IsASESORVENTA
											,@IsESTADO,@IsCOD_EMPRESA,@isUsrEjecuta,GETDATE(), @isIP_Ejecuta, '',@isIDSEDE)

			SET @CODSOL = @@IDENTITY;
			SET @MSG = 'REGISTRO REALIZADO CON EXITO'
		END
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
				,NROPROCESO		= @NumProceso
				,TIPOPROCESO	= @TipoProceso
				,USR_MOD		 = @isUsrEjecuta
				,FEC_MOD		 = GETDATE()
				,IP_MOD			 = @isIP_Ejecuta
			WHERE ID_SOLICITUD = @isCodSolicitud
		END

	IF(@IsTipoProceso = 'C') --Cambia de estado
	BEGIN
		
		DECLARE @TipSol VARCHAR(6), @IndInstalacion CHAR(1)

		SELECT @TipSol = TIPO_SOL from TBM_SOLICITUDVENTA WHERE ID_SOLICITUD = @isCodSolicitud
		
		IF (@TipSol = 'TSOL05') 
		BEGIN
			SELECT DETDESP.ID, ID_COTDETALLE, ID_SOLDESPACHO --Determinamos los equipos que se están despachando 
			INTO #tmpDespachosxInstalar
			FROM TBD_DESPACHO_COTIZACION DETDESP
			LEFT JOIN TBM_SOLDESPACHO SOLDESP ON SOLDESP.ID = DETDESP.ID_SOLDESPACHO
			WHERE SOLDESP.ID_SOLICITUD = @isCodSolicitud--31
			
			IF EXISTS (select * from TBM_COTDET_DESPACHO where ID_COTDETALLE IN (select ID_COTDETALLE from #tmpDespachosxInstalar) And INDINSTALACION = 'S')	--si existen equipos que se despachan pero tambien se deben de instalar seguimos por aquí
			BEGIN
				
				DECLARE @TOTAL INT, @CONTADOR INT

				select 
					@CONTADOR = COUNT(INSTAL.NUMREQ) --Contamos cuantos están finalizados
				from TBM_INSTALACION INSTAL
				inner join TBD_INSTALACION INSTALDET ON INSTAL.NUMREQ = INSTALDET.NUMREQ
				inner join #tmpDespachosxInstalar DESPXINSTAL ON INSTALDET.ID_DETALLECOTIZ = DESPXINSTAL.ID_COTDETALLE
				WHERE INSTAl.ESTADO = 'STFIN'


				select 
					@TOTAL = COUNT(INSTAL.NUMREQ) --Contamos cuantos hay.
				from TBM_INSTALACION INSTAL
				inner join TBD_INSTALACION INSTALDET ON INSTAL.NUMREQ = INSTALDET.NUMREQ
				inner join #tmpDespachosxInstalar DESPXINSTAL ON INSTALDET.ID_DETALLECOTIZ = DESPXINSTAL.ID_COTDETALLE


				IF @CONTADOR = @TOTAL
				BEGIN
					UPDATE TBM_SOLICITUDVENTA
					SET	ESTADO = 'VTPG'
						,USR_MOD		 = @isUsrEjecuta
						,FEC_MOD		 = GETDATE()
						,IP_MOD			 = @isIP_Ejecuta
					WHERE ID_SOLICITUD = @isCodSolicitud	

					SET @CODSOL = @isCodSolicitud;
					SET @MSG = 'SOLICITUD PROGRAMADA'
				END
				ELSE
				BEGIN
					SET @CODSOL = 0;
					SET @MSG = 'Existen equipos despachados que aún no se han instalado, coordinar con servicio técnico.'	
				END
			END
			ELSE
			BEGIN
				UPDATE TBM_SOLICITUDVENTA
				SET	ESTADO = 'VTPG'
					,USR_MOD		 = @isUsrEjecuta
					,FEC_MOD		 = GETDATE()
					,IP_MOD			 = @isIP_Ejecuta
				WHERE ID_SOLICITUD = @isCodSolicitud	

				SET @CODSOL = @isCodSolicitud;
				SET @MSG = 'SOLICITUD PROGRAMADA'
			END 
		END
		ELSE
		BEGIN
			UPDATE TBM_SOLICITUDVENTA
			SET	ESTADO = 'VTPG'
				,USR_MOD		 = @isUsrEjecuta
				,FEC_MOD		 = GETDATE()
				,IP_MOD			 = @isIP_Ejecuta
			WHERE ID_SOLICITUD = @isCodSolicitud	

			SET @CODSOL = @isCodSolicitud;
			SET @MSG = 'SOLICITUD PROGRAMADA'
		END

	END

	SELECT @CODSOL COD, @MSG MSG
	SET NOCOUNT ON;
END