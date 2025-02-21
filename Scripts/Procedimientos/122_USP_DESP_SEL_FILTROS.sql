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
	SELECT PARAMETRO COD, DESCRIPCION FROM TBD_DATOS_GENERALES WHERE DOMINIO = 'TIPDESP' AND HABILITADO = '1' AND ESTADO = '1'
	--ComboBox Periodos
	--SELECT PARAMETRO COD, DESCRIPCION FROM TBD_DATOS_GENERALES WHERE DOMINIO = 'CICLOPREV' AND HABILITADO = '1' AND ESTADO = '1'

SET NOCOUNT OFF
END
