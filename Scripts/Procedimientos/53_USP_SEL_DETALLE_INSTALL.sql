USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_SEL_DETALLE_INSTALL]
(
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		03.11.24		Realiza el select del detalle de la instalación técnica.
	[USP_SEL_INSTALL_TEC]
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
		,FECHAPROGRAMACION
		,FECHAREAL
	FROM
	TBD_INSTALACION
	WHERE NUMREQ = @isNumReq
END
