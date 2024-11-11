USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_MANT_TBM_COTDET_DESPACHO]
(
@pTipoProceso CHAR(1),
@pId_CodDetalle BIGINT,
@pIndInfoVideo CHAR(1),
@pIndInfoManual CHAR(1),
@pIndInstaCapa CHAR(1),
@pGarantiaAdic VARCHAR(50),
@pIndLLaveMano CHAR(1),
@pDimensiones VARCHAR(50),
@pIndCompraLocal CHAR(1),
@pIndCalibracion CHAR(1),
@pObsCliente VARCHAR(2000),
@pIndReqPlaca CHAR(1),
@pObsDespacho VARCHAR(2000),
@pFecLimInsta DATETIME,
@pMontoTotalCosto DECIMAL(18,9),
@pIndFianza CHAR(1),
@pNumFianza VARCHAR(50),
@pMontoPPrinc DECIMAL(18,9),
@pMontoPAcce DECIMAL(18,9),
@pUsuarioRegistro VARCHAR(50)
)
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Samuel Gómez		03.11.24		mantenimiento de la tabla TBM_COTDET_DESPACHO con parametros.
  =======================================================================================================*/
AS
BEGIN

	DECLARE @CODIGO BIGINT, @MSG VARCHAR(20)
	SET NOCOUNT ON;
	
	IF (@pTipoProceso = 'I') BEGIN
		
		INSERT INTO [dbo].[TBM_COTDET_DESPACHO]
		([ID_COTDETALLE],
		[INDINFOVIDEO],[INDINFOMANUAL],[INDINSTACAPA],
		[GARANTIAADIC],[INDLLAVEMANO],[DIMENSIONES],
		[INDCOMPRALOCAL],[INDCALIBRACION],[OBSCLIENTE],
		[INDREQUIEREPLACA],[OBSDESPACHO],[FECLIMINSTA],
		[MTOTOTALCOSTO],[INDFIANZA],[NUMFIANZA],
		[MONTOPPRINC],[MONTOPACCE],[USR_REG],[FEC_REG])
		VALUES
		(@pId_CodDetalle,
		@pIndInfoVideo,@pIndInfoManual,@pIndInstaCapa,
		@pGarantiaAdic,@pIndLLaveMano,@pDimensiones,
		@pIndCompraLocal,@pIndCalibracion,@pObsCliente,
		@pIndReqPlaca,@pObsDespacho,@pFecLimInsta,
		@pMontoTotalCosto,@pIndFianza,@pNumFianza,
		@pMontoPPrinc,@pMontoPAcce,
		@pUsuarioRegistro,GETDATE())
		
		SET  @CODIGO = @@IDENTITY
		SET @MSG ='Registro Insertado con éxito'
		
	END
	IF (@pTipoProceso = 'U') BEGIN
		
		UPDATE [dbo].[TBM_COTDET_DESPACHO]
		SET INDINFOVIDEO = @pIndInfoVideo, INDINFOMANUAL = @pIndInfoManual, INDINSTACAPA = @pIndInstaCapa, 
		GARANTIAADIC = @pGarantiaAdic, INDLLAVEMANO = @pIndLLaveMano, DIMENSIONES = @pDimensiones, 
		INDCOMPRALOCAL = @pIndCompraLocal, INDCALIBRACION = @pIndCalibracion, OBSCLIENTE = @pObsCliente, 
		INDREQUIEREPLACA = @pIndReqPlaca, OBSDESPACHO = @pObsDespacho, FECLIMINSTA = @pFecLimInsta, 
		MTOTOTALCOSTO = @pMontoTotalCosto, INDFIANZA = @pIndFianza, NUMFIANZA = @pNumFianza, 
		MONTOPPRINC = @pMontoPPrinc, MONTOPACCE = @pMontoPAcce,
		USR_MOD = @pUsuarioRegistro, FEC_MOD = GETDATE()
		WHERE ID_COTDETALLE = @pId_CodDetalle
		
		SET @MSG ='Registro Modificado con éxito'
		
	END
	
	SELECT @CODIGO COD, @MSG MSG
	SET NOCOUNT OFF;

END