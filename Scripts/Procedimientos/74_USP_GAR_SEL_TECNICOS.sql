USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_GAR_SEL_TECNICOS]
(
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		18.11.24		Realiza el select de la tabla [TBD_TECNICOGARANTIA] con par�metros de b�squeda para la bandeja de Garant�as.
	EXEC [USP_GAR_SEL_TECNICOS] 1
  =======================================================================================================*/
	@IsNumReclamo BIGINT
)
AS
BEGIN
	SELECT 
		TECNICO.ID
		,TECNICO.ID_RECLAMO
		,TECNICO.COD_TECNICO
		,TECNICO.NOMBRES
		,TECNICO.APELLIDOPATERNO
		,TECNICO.APELLIDOMATERNO
		,TECNICO.DOCUMENTO
		,TECNICO.TIPO_DOCUMENTO
		,TECNICO.CORREO
		,TECNICO.TELEFONO
		,TECNICO.ZONA
		,CONCAT(ISNULL(ubi.[NOMDEPARTAMENTO],''),' / ',ISNULL(ubi.[NOMPROVINCIA],''),' / ',ISNULL(ubi.[NOMDISTRITO],'')) AS UBIGEO
		,TECNICO.EMPRESA
		,tipo.VALOR1 AS NOMTIPOTECNICO
		,datos.DESCRIPCION AS NOM_TIPO_DOCUMENTO
		,TECNICO.TIPOTECNICO
		,TECNICO.ESTADO
		,TECNICO.USR_REG
		,TECNICO.FEC_REG 
	FROM [dbo].[TBD_TECNICOGARANTIA] AS TECNICO WITH(NOLOCK)
	LEFT JOIN [dbo].[TBM_UBIGEO] AS UBI WITH(NOLOCK) ON UBI.CODUBIGEO = TECNICO.ZONA
	LEFT JOIN [dbo].[TBD_DATOS_GENERALES] datos WITH(NOLOCK) ON datos.PARAMETRO = TECNICO.TIPO_DOCUMENTO
	LEFT JOIN [dbo].[TBD_DATOS_GENERALES] tipo WITH(NOLOCK) ON tipo.COD_VALOR1 = TECNICO.TIPOTECNICO
	WHERE TECNICO.ESTADO = '1'

END