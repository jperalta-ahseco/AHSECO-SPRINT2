USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_MANT_TBM_COTDET_DESPACHO]
(
@pTipoProceso CHAR(1),
@pId_CodDetalle BIGINT,
@pCantPreventivo INT,
@pCodCicloPreventivo NVARCHAR(10),
@pIndInfoVideo CHAR(1),
@pIndInfoManual CHAR(1),
@pIndInstaCapa CHAR(1),
@pGarantiaAdic VARCHAR(50),
@pIndLLaveMano CHAR(1),
@pCodUbigeo VARCHAR(6),
@pDireccion VARCHAR(150),
@pNroPiso INT,
@pDimensiones VARCHAR(50),
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
		([ID_COTDETALLE],[CANTPREVENTIVO],[CODCICLOPREVENTIVO],[INDINFOVIDEO],[INDINFOMANUAL],[INDINSTACAPA],[GARANTIAADIC],
		[INDLLAVEMANO],[CODUBIGEO],[DIRECCION],[NROPISO],[DIMENSIONES],[USR_REG],[FEC_REG])
		VALUES
		(@pId_CodDetalle,@pCantPreventivo,@pCodCicloPreventivo,@pIndInfoVideo,@pIndInfoManual,@pIndInstaCapa,@pGarantiaAdic,
		@pIndLLaveMano,@pCodUbigeo,@pDireccion,@pNroPiso,@pDimensiones,@pUsuarioRegistro,GETDATE())
		
		SET  @CODIGO = @@IDENTITY
		SET @MSG ='Registro Insertado con éxito'
		
	END
	IF (@pTipoProceso = 'U') BEGIN
		
		UPDATE [dbo].[TBM_COTDET_DESPACHO]
		SET CANTPREVENTIVO = @pCantPreventivo, CODCICLOPREVENTIVO = @pCodCicloPreventivo, INDINFOVIDEO = @pIndInfoVideo, INDINFOMANUAL = @pIndInfoManual,
		INDINSTACAPA = @pIndInstaCapa, GARANTIAADIC = @pGarantiaAdic, INDLLAVEMANO = @pIndLLaveMano, CODUBIGEO = @pCodUbigeo, DIRECCION = @pDireccion,
		NROPISO = @pNroPiso, DIMENSIONES = @pDimensiones, USR_MOD = @pUsuarioRegistro, FEC_MOD = GETDATE()
		WHERE ID_COTDETALLE = @pId_CodDetalle
		
		SET @MSG ='Registro Modificado con éxito'
		
	END
	
	SELECT @CODIGO COD, @MSG MSG
	SET NOCOUNT OFF;

END