USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_FILTROS_SOLICITUD_VENTAS]
/*=================================================================================================
	NOMBRE:					FECHA:		DESCRIPCIÓN:
	Diego A. Bazalar		04/10/2024	Extrae los filtros para realizar la inserción, actualización de la solicitud de ventas. 
	EXEC [USP_FILTROS_SOLICITUD_VENTAS]  0,13
  =================================================================================================*/
@CodFlujo INT,
@CodSolicitud BIGINT
AS
BEGIN
	--ComboBox FlujodeSolicitud
	SELECT D.COD_VALOR1 CODSOL, D.VALOR1 FLUJOSOL FROM TBD_DATOS_GENERALES D WHERE DOMINIO='FLOWSOL' AND ESTADO=1 AND HABILITADO=1
	--ComboBox TipoSolicitud
	SELECT D.COD_VALOR1 CODTIPOSOL ,D.VALOR1 TIPOSOL FROM TBD_DATOS_GENERALES D WHERE DOMINIO='TIPOSOLVT' AND ESTADO=1 AND HABILITADO=1 AND COD_VALOR2=CASE WHEN @CodFlujo>0 THEN @CodFlujo ELSE COD_VALOR2 END
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
	--ComboBox Tipo de ventas
	SELECT D.COD_VALOR1 CODTIPOVENTA, D.VALOR1 TIPOVENTA FROM TBD_DATOS_GENERALES D WHERE DOMINIO='TIPOVENTA' AND ESTADO=1 AND HABILITADO=1
	--Tipo de Documentos:
	SELECT COD_VALOR2 CODIGO,VALOR2 VALOR FROM TBD_DATOS_GENERALES 
	WHERE DOMINIO='TIPODOC' AND ESTADO=1 AND HABILITADO=1 AND COD_VALOR1=1
	ORDER BY 1
	--Tipo de documentacion: (DNI, RUC)
	SELECT PARAMETRO AS CODIGO, DESCRIPCION 
	FROM TBD_DATOS_GENERALES WITH(NOLOCK) WHERE DOMINIO='GENTDOC' AND ESTADO=1 AND HABILITADO=1
	--Tipo de empleados:
	SELECT COD_VALOR1,VALOR1 
	FROM TBD_DATOS_GENERALES WITH(NOLOCK) 
	WHERE DOMINIO='TIPEMPL' AND ESTADO=1 AND HABILITADO=1


	DECLARE @isIdWorkFlow BIGINT
	SELECT @isIdWorkFlow=ID_WORKFLOW FROM TBM_SOLICITUDVENTA WHERE ID_SOLICITUD=@CodSolicitud

	SET @isIdWorkFlow = ISNULL(@isIdWorkFlow,0)
	
	--Detalle de la solicitud:
	EXEC [USP_SEL_SOLICITUDES] 0,@CodSolicitud

	--Documentos adjuntos:
	SELECT A.COD_DOCUMENTO,
				 A.ID_WORKFLOW,
				 A.COD_TIPODOC,
				 ISNULL(B.VALOR2,'') NOMTIPODOC,
				 A.NOM_DOCUMENTO,
				 A.VER_DOCUMENTO,
				 A.RUTA_DOCUMENTO,
				 A.NOMBRE_USUARIO,
				 A.PERFIL,
				 A.ELIMINADO,
				 ISNULL(A.USR_REG,'') USR_REG,
				 ISNULL(CONVERT(varchar,A.FEC_REG,103) +' '+CONVERT(varchar,A.FEC_REG,8),'')  AS FEC_REG
				 FROM TBM_DOCUMENTO A
				 INNER JOIN TBD_DATOS_GENERALES B ON A.COD_TIPODOC=B.COD_VALOR2 AND B.DOMINIO='TIPODOC'
				 WHERE ID_WORKFLOW=@isIdWorkFlow
				 AND ELIMINADO = 0

	--Documentos adjuntos:
	EXEC [USP_SEL_OBSERVACIONES] @isIdWorkFlow

	--Seguimiento de flujo de ventas:
	EXEC [USP_CONSULTA_WORKFLOWLOG] @isIdWorkFlow

	--DESPACHO:
	EXEC [USP_SEL_DESPACHO]  @CodSolicitud

	--TECNICOS DESPACHO:
	SELECT A.ID,A.ID_DESPACHO,A.COD_TECNICO,A.NOMBRES,A.APELLIDOPATERNO,A.APELLIDOMATERNO,
	ISNULL(A.DOCUMENTO,'') DOCUMENTO,
	ISNULL(B.DESCRIPCION,'') NOMTIPODOC,
	ISNULL(A.CORREO,'') CORREO,
	ISNULL(A.TELEFONO,'') TELEFONO,
	ISNULL(A.ZONA,'') ZONA,
	ISNULL(A.EMPRESA,'') EMPRESA,
	A.TIPOTECNICO,
	A.ESTADO
	FROM TBD_TECNICODESPACHO A
	LEFT JOIN TBD_DATOS_GENERALES B WITH(NOLOCK) ON A.TIPO_DOCUMENTO=B.PARAMETRO AND B.DOMINIO='GENTDOC'
	WHERE A.ID_DESPACHO IN (SELECT ID FROM TBM_DESPACHO WHERE ID_SOLICITUD = @CodSolicitud)
	AND A.ESTADO = 1
END
