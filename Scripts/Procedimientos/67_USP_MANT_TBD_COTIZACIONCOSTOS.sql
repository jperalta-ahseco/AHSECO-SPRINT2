USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_MANT_TBD_COTIZACIONCOSTOS]
(
@pTipoProceso CHAR(1),
@pId BIGINT,
@pId_CodDetalle BIGINT,
@pNumSec INT,
@pCodCosto NVARCHAR(10),
@pCantCosto INT,
@pCantPreventivo INT,
@pCodCicloPrevent NVARCHAR(10),
@pCodUbigeoDest NVARCHAR(6),
@pDireccion VARCHAR(150),
@pAmbienteDest VARCHAR(200),
@pNroPiso INT,
@pMontoUniCosto DECIMAL(18,9),
@pMontoTotCosto DECIMAL(18,9),
@pUsuarioRegistro VARCHAR(50)
)
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Samuel Gómez		19.11.24		mantenimiento de la tabla TBD_COTIZACIONCOSTOS con parametros.
  =======================================================================================================*/
AS
BEGIN

	DECLARE @CODIGO BIGINT, @MSG VARCHAR(20)
	SET NOCOUNT ON;
	
	IF (@pTipoProceso = 'I') BEGIN
		
		INSERT INTO [dbo].[TBD_COTIZACIONCOSTOS]
		([ID_COTDETALLE],
		[NUMSEC],[CODCOSTO],[CANTCOSTO],
		[CANTPREVENTIVO],[CODCICLOPREVENT],[CODUBIGEODEST],
		[DIRECCION],[AMBIENTEDEST],[NROPISO],
		[MONTOUNICOSTO],[MONTOTOTCOSTO],[USR_REG],[FEC_REG])
		VALUES
		(@pId_CodDetalle,
		@pNumSec,@pCodCosto,@pCantCosto,
		@pCantPreventivo,@pCodCicloPrevent,@pCodUbigeoDest,
		@pDireccion,@pAmbienteDest,@pNroPiso,
		@pMontoUniCosto,@pMontoTotCosto,@pUsuarioRegistro,GETDATE())
		
		SET  @CODIGO = @@IDENTITY
		SET @MSG ='Registro Insertado con éxito'
		
	END

	IF (@pTipoProceso = 'U') BEGIN
		
		UPDATE [dbo].[TBD_COTIZACIONCOSTOS]
		SET ID_COTDETALLE = @pId_CodDetalle,
		NUMSEC = @pNumSec, CODCOSTO = @pCodCosto, CANTCOSTO = @pCantCosto,
		CANTPREVENTIVO = @pCantPreventivo, CODCICLOPREVENT = @pCodCicloPrevent, CODUBIGEODEST = @pCodUbigeoDest,
		DIRECCION = @pDireccion, AMBIENTEDEST = @pAmbienteDest, NROPISO = @pNroPiso,
		MONTOUNICOSTO = @pMontoUniCosto, MONTOTOTCOSTO = @pMontoTotCosto,
		USR_MOD = @pUsuarioRegistro, FEC_MOD = GETDATE()
		WHERE ID = @pId
		
		SET @MSG ='Registro Modificado con éxito'
		
	END

	IF (@pTipoProceso = 'D') BEGIN
		
		DELETE FROM [dbo].[TBD_COTIZACIONCOSTOS] WHERE ID = @pId

	END
	
	SELECT @CODIGO COD, @MSG MSG
	SET NOCOUNT OFF;

END