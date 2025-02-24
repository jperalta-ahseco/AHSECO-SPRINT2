USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_DESP_SEL_FILTROS]
/*=================================================================================================
	NOMBRE:					FECHA:		DESCRIPCIÓN:
	Diego A. Bazalar		21/02/2025	Extrae los filtros para la bandeja de despacho.
	EXEC [USP_DESP_SEL_FILTROS]
  =================================================================================================*/
AS
BEGIN
SET NOCOUNT ON
	--ComboBox Tipo Doc
	SELECT COD_VALOR1 COD, DESCRIPCION FROM TBD_DATOS_GENERALES WHERE DOMINIO = 'TIPDESP' AND HABILITADO = '1' AND ESTADO = '1'
	--ComboBox Estados
	--SELECT PARAMETRO COD, DESCRIPCION FROM TBD_DATOS_GENERALES WHERE DOMINIO = 'CICLOPREV' AND HABILITADO = '1' AND ESTADO = '1'


	SELECT COD_ESTADO COD,
	NOM_ESTADO DESCRIPCION 
	FROM TBM_PROCESOESTADOS WITH(NOLOCK) WHERE ID_PROCESO=8


SET NOCOUNT OFF
END
