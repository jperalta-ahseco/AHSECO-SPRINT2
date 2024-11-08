USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_SEL_DETALLE_INSTALL]
(
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		03.11.24		Realiza el select del detalle de la instalación técnica.
	[USP_SEL_DETALLE_INSTALL] 10006
  =======================================================================================================*/
	@isNumReq			BIGINT
)
AS
BEGIN
	SELECT
		ID
		,NUMREQ
		,CODIGOPRODUCTO
		,DESCRIPCION
		,CANTIDAD
		,MARCA
		,MODELO
		,SERIE
		,NUMFIANZA
		,CANTIDADMP
		,PERIODICIDAD
		,GARANTIA
		,CONVERT(VARCHAR(10),FECHAPROGRAMACION,23) AS FECHAPROGRAMACION
		,CONVERT(VARCHAR(10),FECHAREAL,23) AS FECHAINSTALACION
	FROM
	TBD_INSTALACION
	WHERE NUMREQ = @isNumReq
END
