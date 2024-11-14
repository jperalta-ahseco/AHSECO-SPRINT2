USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_SEL_ITEC_PRODUCTOS]
(
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		12.11.24		Obtiene los elementos referentes a un producto
	[USP_SEL_ITEC_PRODUCTOS] 
  =======================================================================================================*/
	@IsCodigoProductoPadre	BIGINT
)
AS
BEGIN
	SELECT
		INSTALL.ID
		,INSTALL.CODIGOPRODUCTO
		,INSTALL.DESCRIPCION
		,INSTALL.MARCA
		,NUMSEC
		,NUMSERIE
		,FECHAPROGRAMACION
		,FECHAINTALACION
	FROM [dbo].[TBD_DESPACHO_DIST] AS DIST WITH(NOLOCK)
	LEFT JOIN [dbo].[TBD_INSTALACION] AS INSTALL WITH(NOLOCK) ON INSTALL.ID_DESPACHO_DIST = DIST.ID
END




