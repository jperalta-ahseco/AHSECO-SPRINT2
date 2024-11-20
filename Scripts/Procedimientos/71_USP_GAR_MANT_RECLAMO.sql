USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_GAR_MANT_RECLAMO]
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		20.11.24		Inserta Reclamo con parametros
  =======================================================================================================*/
(
	 @IsTipoProceso		 CHAR(1)
	,@IsID_RECLAMO BIGINT
	,@IsID_WORKFLOW BIGINT
	,@IsID_SOLICITUD BIGINT
	,@IsRUCEMPRESA VARCHAR(12)
	,@IsNOMEMPRESA VARCHAR(200)
	,@IsUBICACION VARCHAR(200)
	,@IsNOMBRECONTACTO VARCHAR(150)
	,@IsTELEFONOCONTACTO VARCHAR(150)
	,@IsCARGOCONTACTO VARCHAR(50)
	,@IsESTABLECIMIENTO VARCHAR(100)
	,@IsTIPOVENTA VARCHAR(25)
	,@IsORDENCOMPRA VARCHAR(35)
	,@IsNUMPROCESO VARCHAR(15)
	,@IsTIPOPROCESOSOL VARCHAR(200)
	,@IsCONTRATO VARCHAR(25)
	,@IsCODEMPRESA VARCHAR(6)
	,@IsVENDEDOR VARCHAR(150)
	,@IsCODIGOPRODUCTO VARCHAR(35)
	,@IsDESCRIPCION VARCHAR(100)
	,@IsMARCA VARCHAR(150)
	,@IsMODELO VARCHAR(200)
	,@IsSERIE VARCHAR(200)
	,@IsNUMFIANZA VARCHAR(15)
	,@IsFECHAINSTALACION DATETIME
	,@IsUBIGEO VARCHAR(6)
	,@IsDIRECCION VARCHAR(150)
	,@IsURGENCIA VARCHAR(6)
	,@IsMOTIVO VARCHAR(250)
	,@IsESTADO VARCHAR(6)
	,@UsrEjecuta VARCHAR(50)
)
AS
BEGIN
	DECLARE @CODREQ BIGINT, @MSG VARCHAR(100)
	SET NOCOUNT ON;

	IF (@IsTipoProceso = 'I')
		BEGIN
			INSERT INTO [TBM_RECLAMOS](ID_WORKFLOW,ID_SOLICITUD,RUCEMPRESA,NOMEMPRESA,UBICACION,NOMBRECONTACTO,TELEFONOCONTACTO,CARGOCONTACTO,ESTABLECIMIENTO,TIPOVENTA,ORDENCOMPRA,NUMPROCESO,TIPOPROCESO
										,CONTRATO,CODEMPRESA,VENDEDOR,CODIGOPRODUCTO,DESCRIPCION,MARCA,MODELO,SERIE,NUMFIANZA,FECHAINSTALACION,UBIGEO,DIRECCION,URGENCIA,MOTIVO,ESTADO,USR_REG,FEC_REG)
			VALUES (@IsID_WORKFLOW ,@IsID_SOLICITUD,@IsRUCEMPRESA,@IsNOMEMPRESA,@IsUBICACION,@IsNOMBRECONTACTO,@IsTELEFONOCONTACTO,@IsCARGOCONTACTO,@IsESTABLECIMIENTO,@IsTIPOVENTA,@IsORDENCOMPRA,@IsNUMPROCESO 
			,@IsTIPOPROCESOSOL,@IsCONTRATO ,@IsCODEMPRESA,@IsVENDEDOR ,@IsCODIGOPRODUCTO ,@IsDESCRIPCION ,@IsMARCA ,@IsMODELO ,@IsSERIE ,@IsNUMFIANZA ,@IsFECHAINSTALACION ,@IsUBIGEO ,@IsDIRECCION,@IsURGENCIA ,@IsMOTIVO,@IsESTADO,@UsrEjecuta, GETDATE())

			IF @@ROWCOUNT = 0
			BEGIN
				SET @CODREQ = 0;
				SET @MSG = 'ERROR EN EL REGISTRO DE LA TABLA TBM_INSTALACION'
			END
			ELSE
			BEGIN
				SET @CODREQ = @@IDENTITY;
				SET @MSG = 'REGISTRO REALIZADO CON EXITO'
			END
		END
	ELSE
		IF(@IsTipoProceso = 'U')
			BEGIN
				UPDATE [TBM_RECLAMOS]
				SET 
					FECHAMAX	= @FECHAMAX
					,DESTINO	= @DESTINO
					,ESTADO		= @ESTADO
					,USR_MOD	= @UsrEjecuta
					,FEC_MOD	= GETDATE()
				WHERE NUMREQ = @NUMREQ

				IF @@ROWCOUNT = 0
				BEGIN
					SET @CODREQ = 0;
					SET @MSG = 'ERROR EN LA ACTUALIZACIÓN DE LA TABLA TBM_INSTALACION'
				END
				ELSE
				BEGIN
					SET @CODREQ = @NUMREQ;
					SET @MSG = 'REGISTRO REALIZADO CON EXITO'
				END
			END
	SELECT @CODREQ COD, @MSG MSG
	SET NOCOUNT ON;
END