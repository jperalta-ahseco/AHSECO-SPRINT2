USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_FILTROS_INSTALACION]
/*=================================================================================================
	NOMBRE:					FECHA:		DESCRIPCIÓN:
	Diego A. Bazalar		21/10/2024	Extrae los filtros para la bandeja instalación técnica.
	EXEC [USP_FILTROS_INSTALACION]	
  =================================================================================================*/

AS
BEGIN
	--ComboBox Empresas
	SELECT D.PARAMETRO CODEMPRESA, D.VALOR1 RAZONSOCIAL FROM TBD_DATOS_GENERALES D WHERE DOMINIO='RAZSOCIAL' AND ESTADO=1
	--ComboBox Estado
	SELECT COD_ESTADO Codigo, ABREV_ESTADO Abrev FROM TBM_PROCESOESTADOS WHERE ID_PROCESO = 3
	--ComboBox Clientes
	SELECT CAST(ID AS nvarchar) ID, NOMEMPRESA FROM TBM_CLIENTES
	--ComboBox Tip.Ventas
	SELECT COD_VALOR1 CODVENTA, DESCRIPCION DESCVENTA FROM TBD_DATOS_GENERALES D WHERE DOMINIO='FLOWSOL' AND ESTADO=1
END
