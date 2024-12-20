USE [DB_AHSECO]
GO

CREATE PROCEDURE [dbo].[USP_FILTROS_SOLICITUD_VENTAS]
/*=================================================================================================
	NOMBRE:					FECHA:		DESCRIPCIÓN:
	Diego A. Bazalar		04/10/2024	Extrae los filtros para realizar la inserción, actualización de la solicitud de ventas. 
	EXEC [USP_FILTROS_SOLICITUD_VENTAS] 
  =================================================================================================*/

AS
BEGIN
	--ComboBox FlujodeSolicitud
	SELECT D.COD_VALOR1 CODSOL, D.VALOR1 FLUJOSOL FROM TBD_DATOS_GENERALES D WHERE DOMINIO='FLOWSOL' AND ESTADO=1 AND HABILITADO=1
	--ComboBox TipoSolicitud
	SELECT D.COD_VALOR1 CODTIPOSOL ,D.VALOR1 TIPOSOL FROM TBD_DATOS_GENERALES D WHERE DOMINIO='TIPOSOLVT' AND ESTADO=1 AND HABILITADO=1
	--ComboBox Medio de Contacto
	SELECT D.COD_VALOR1 CODMED, D.VALOR1  MEDIOCONTACT FROM TBD_DATOS_GENERALES D WHERE DOMINIO='MEDIOCONT' AND ESTADO=1 AND HABILITADO=1
	--ComboBox Tipo de Moneda
	SELECT D.COD_VALOR1 CODMONEDA,D.VALOR1 MONEDA FROM TBD_DATOS_GENERALES D WHERE DOMINIO='TIPMONEDA' AND ESTADO=1 AND HABILITADO=1
	--ComboBox Garantias
	SELECT D.PARAMETRO CODGARANTIA, D.VALOR1 NOMGARANTIA FROM TBD_DATOS_GENERALES D WHERE DOMINIO='GARANTIAS' AND ESTADO=1 AND HABILITADO=1
	--ComboBox Formas de pago
	SELECT D.PARAMETRO CODPAGO, D.VALOR1 NOMPAGO FROM TBD_DATOS_GENERALES D WHERE DOMINIO='FORMAPAGO' AND ESTADO=1 AND HABILITADO=1
	--ComboBox Empresas
	SELECT D.PARAMETRO CODEMPRESA, D.VALOR1 RAZONSOCIAL FROM TBD_DATOS_GENERALES D WHERE DOMINIO='RAZSOCIAL' AND ESTADO=1

END
