USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_MANT_TBM_COTDET_DESPACHO]
(
@pTipoProceso CHAR(1),
@pId BIGINT,
@pId_CodDetalle BIGINT,
@pIndInfoVideo CHAR(1),
@pIndInfoManual CHAR(1),
@pIndInstaCapa CHAR(1),
@pIndGarantiaAdic CHAR(1),
@pNMesGaranAdic INT,
@pIndMantPrevent CHAR(1),
@pDimensiones VARCHAR(50),
@pIndCompraLocal CHAR(1),
@pObsCliente VARCHAR(2000),
@pIndReqPlaca CHAR(1),
@pObsDespacho VARCHAR(2000),
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
		[INDGARANADIC],[NMESGARANADIC],[DIMENSIONES],
		[INDCOMPRALOCAL],[OBSCLIENTE],[INDMANTPREVENT],
		[INDREQPLACA],[OBSDESPACHO],
		[MTOTOTALCOSTO],[INDFIANZA],[NUMFIANZA],
		[MONTOPPRINC],[MONTOPACCE],[USR_REG],[FEC_REG])
		VALUES
		(@pId_CodDetalle,
		@pIndInfoVideo,@pIndInfoManual,@pIndInstaCapa,
		@pIndGarantiaAdic,@pNMesGaranAdic,@pDimensiones,
		@pIndCompraLocal,@pObsCliente,@pIndMantPrevent,
		@pIndReqPlaca,@pObsDespacho,
		@pMontoTotalCosto,@pIndFianza,@pNumFianza,
		@pMontoPPrinc,@pMontoPAcce,
		@pUsuarioRegistro,GETDATE())
		
		SET  @CODIGO = @@IDENTITY
		SET @MSG ='Registro Insertado con éxito'
		
	END

	IF (@pTipoProceso = 'U') BEGIN
		
		UPDATE [dbo].[TBM_COTDET_DESPACHO]
		SET ID_COTDETALLE = @pId_CodDetalle,
		INDINFOVIDEO = @pIndInfoVideo, INDINFOMANUAL = @pIndInfoManual, INDINSTACAPA = @pIndInstaCapa, 
		INDGARANADIC = @pIndGarantiaAdic, NMESGARANADIC = @pNMesGaranAdic, DIMENSIONES = @pDimensiones, 
		INDCOMPRALOCAL = @pIndCompraLocal, OBSCLIENTE = @pObsCliente, INDMANTPREVENT = @pIndMantPrevent,
		INDREQPLACA = @pIndReqPlaca, OBSDESPACHO = @pObsDespacho, 
		MTOTOTALCOSTO = @pMontoTotalCosto, INDFIANZA = @pIndFianza, NUMFIANZA = @pNumFianza, 
		MONTOPPRINC = @pMontoPPrinc, MONTOPACCE = @pMontoPAcce,
		USR_MOD = @pUsuarioRegistro, FEC_MOD = GETDATE()
		WHERE ID = @pId
		
		SET @MSG ='Registro Modificado con éxito'
		
	END

	IF (@pTipoProceso = 'D') BEGIN
		
		DELETE FROM [dbo].[TBM_COTDET_DESPACHO] WHERE ID = @pId

	END
	
	SELECT @CODIGO COD, @MSG MSG
	SET NOCOUNT OFF;

END