USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_SEL_DETALLE_TECNICOS]
(
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		05.11.24		Realiza el select de los técnicos por detalle.
	[USP_SEL_DETALLE_TECNICOS] 10006
  =======================================================================================================*/
	@isCodDetalle BIGINT
)
AS
BEGIN
	SELECT
		tecnico.ID
		,tecnico.ID_DETALLE
		,tecnico.COD_TECNICO
		,tecnico.NOMBRES AS NOMBRETECNICO
		,tecnico.APELLIDOPATERNO
		,tecnico.APELLIDOMATERNO
		,tecnico.DOCUMENTO
		,tecnico.TIPO_DOCUMENTO
		,tecnico.CORREO
		,tecnico.TELEFONO
		,CONCAT(ubi.NOMDEPARTAMENTO,' / ',ubi.NOMPROVINCIA,' / ',ubi.NOMDISTRITO) ZONA
		,tipo.VALOR1 AS TIPOTECNICO
		,datos.DESCRIPCION AS NOM_TIPO_DOCUMENTO
		,tecnico.ESTADO
		,tecnico.EMPRESA
	FROM
	[dbo].[TBD_TECNICOINSTALACION] tecnico WITH(NOLOCK)
	LEFT JOIN [dbo].[TBM_UBIGEO] ubi WITH(NOLOCK) ON ubi.CODUBIGEO = tecnico.ZONA
	LEFT JOIN [dbo].[TBD_DATOS_GENERALES] datos WITH(NOLOCK) ON datos.PARAMETRO = tecnico.TIPO_DOCUMENTO
	LEFT JOIN [dbo].[TBD_DATOS_GENERALES] tipo WITH(NOLOCK) ON tipo.COD_VALOR1 = tecnico.TIPOTECNICO
	WHERE ID_DETALLE = @isCodDetalle
	AND tecnico.ESTADO = 1--Estado Activo
END