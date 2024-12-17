USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_SEL_TBD_COTDET_ACTIVIDAD]
(
@pId BIGINT,
@pId_CotDetalle BIGINT,
@pId_Cotizacion BIGINT
)
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Samuel Gómez		03.11.24		Consulta de la tabla TBD_COTDET_ACTIVIDAD con parametros.
  =======================================================================================================*/
AS
BEGIN

	SELECT 
	[ID]
	,[ID_COTDETALLE]
	,[CODACTIVIDAD]
	,[DESCACTIVIDAD]
	FROM [TBD_COTDET_ACTIVIDAD]
	WHERE (ISNULL(@pId,0) = 0 OR [ID] = @pId)
	AND (ISNULL(@pId_CotDetalle,0) = 0 OR [ID_COTDETALLE] = @pId_CotDetalle)
	AND (ISNULL(@pId_Cotizacion,0) = 0 OR [ID_COTDETALLE] IN (SELECT ID FROM TBD_COTIZACIONVENTA WHERE ID_COTIZACION = @pId_Cotizacion))

END