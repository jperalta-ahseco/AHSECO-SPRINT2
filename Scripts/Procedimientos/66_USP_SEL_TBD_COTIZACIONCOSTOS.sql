USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_SEL_TBD_COTIZACIONCOSTOS]
(
@pId BIGINT,
@pId_Cotizacion BIGINT,
@pId_CotDetalle BIGINT,
@pNumSec INT,
@pCodCosto NVARCHAR(10)
)
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Samuel Gómez		19.11.24		listado de la tabla TBD_COTIZACIONCOSTOS con parametros.
  =======================================================================================================*/
AS
BEGIN

	SELECT
	CC.[ID]
	,[ID_COTDETALLE]
	,[NUMSEC]
	,[CODCOSTO]
	,COSTO.DESCRIPCION AS DESCCOSTO
	,[CANTCOSTO]
	,[CANTPREVENTIVO]
	,[CODCICLOPREVENT]
	,[CODUBIGEODEST]
	,[DIRECCION]
	,[AMBIENTEDEST]
	,[NROPISO]
	,[MONTOUNICOSTO]
	,[MONTOTOTCOSTO]
	FROM [dbo].[TBD_COTIZACIONCOSTOS] CC
	LEFT JOIN [dbo].[TBD_DATOS_GENERALES] COSTO ON CC.CODCOSTO = COSTO.PARAMETRO
	WHERE
	(ISNULL(@pId,0) = 0 OR CC.ID = @pId)
	AND (ISNULL(@pId_Cotizacion,0) = 0 OR ID_COTDETALLE IN (SELECT T1.ID FROM TBD_COTIZACIONVENTA T1 WHERE T1.ID_COTIZACION = @pId_Cotizacion))
	AND (ISNULL(@pId_CotDetalle,0) = 0 OR ID_COTDETALLE = @pId_CotDetalle)
	AND (ISNULL(@pNumSec,0) = 0 OR NUMSEC = @pNumSec)
	AND (@pCodCosto IS NULL OR CODCOSTO = @pCodCosto)

END