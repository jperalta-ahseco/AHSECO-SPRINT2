USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_FILTROS_SERVICIOS]
/*=================================================================================================
	NOMBRE:					FECHA:		DESCRIPCIÓN:
	Diego A. Bazalar		29/10/2024	Extrae los filstros de módulo de servicios para los combos.
	EXEC [USP_FILTROS_SERVICIOS] 
  =================================================================================================*/

AS
BEGIN
	--ComboBox Tipo de Servicio.
	SELECT COD_VALOR1 COD_TIPSERVICIO,VALOR1 NOM_SERVICIO FROM TBD_DATOS_GENERALES WHERE DOMINIO='TIPOSERV' AND ESTADO=1 AND HABILITADO=1;

	--ComboBox Estados
	SELECT D.COD_VALOR1 COD_ESTADO, D.VALOR1 ESTADO FROM TBD_DATOS_GENERALES D WHERE DOMINIO='ESTADOS' AND ESTADO=1 AND HABILITADO=1

END
