USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_PREV_SEL_FILTROS]
/*=================================================================================================
	NOMBRE:					FECHA:		DESCRIPCIÓN:
	Diego A. Bazalar		18/11/2024	Extrae los filtros para la bandeja de mant. preventivos.
	EXEC [USP_PREV_SEL_FILTROS]
  =================================================================================================*/
AS
BEGIN
SET NOCOUNT ON
	--ComboBox Empresas
	SELECT D.COD_VALOR1 CODEMPRESA, D.VALOR1 RAZONSOCIAL FROM TBD_DATOS_GENERALES D WHERE DOMINIO='RAZSOCIAL' AND ESTADO=1
	--ComboBox Estado
	SELECT COD_ESTADO Codigo, ABREV_ESTADO Abrev FROM TBM_PROCESOESTADOS WHERE ID_PROCESO = 6
SET NOCOUNT OFF
END
