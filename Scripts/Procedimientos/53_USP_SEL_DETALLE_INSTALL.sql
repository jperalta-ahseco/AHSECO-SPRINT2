USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_SEL_DETALLE_INSTALL]
(
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		03.11.24		Realiza el select del detalle de la instalación técnica.
	[USP_SEL_DETALLE_INSTALL] 1
  =======================================================================================================*/
	@isNumReq			BIGINT
)
AS
BEGIN
	SELECT  --cabecera de detalle.
		ID_DETALLECOTIZ
		,NUMREQ
		,CODIGOPRODUCTO
		,DESCRIPCION
		,CANTIDAD
		,MARCA
		,NUMFIANZA
		,DIMENSIONES
		,MONTOPPRINC
		,MONTOPACCE
		,NUM.NUM_PROG
		,NUM2.NUM_INST
	FROM
	TBD_INSTALACION AS INSTAL WITH(NOLOCK)
		LEFT JOIN (SELECT A.ID_COTDETALLE,  
							COUNT(C.FECHAPROGRAMACION) NUM_PROG
							from TBD_COTIZACIONCOSTOS A WITH(NOLOCK)
							LEFT JOIN TBD_DESPACHO_DIST C WITH(NOLOCK) ON A.ID=C.ID_COTCOSTOS AND C.FECHAPROGRAMACION IS NOT NULL
							GROUP BY A.ID_COTDETALLE
	) NUM ON INSTAL.ID_DETALLECOTIZ = NUM.ID_COTDETALLE
	LEFT JOIN (SELECT A.ID_COTDETALLE,  
							COUNT(B.FECHAINSTALACION) NUM_INST
							from TBD_COTIZACIONCOSTOS A WITH(NOLOCK)
							LEFT JOIN TBD_DESPACHO_DIST B WITH(NOLOCK) ON A.ID=B.ID_COTCOSTOS AND B.FECHAINSTALACION IS NOT NULL
							GROUP BY A.ID_COTDETALLE
	) NUM2 ON INSTAL.ID_DETALLECOTIZ = NUM2.ID_COTDETALLE
	WHERE NUMREQ = @isNumReq
	GROUP BY ID_DETALLECOTIZ,CODIGOPRODUCTO,DESCRIPCION,CANTIDAD,MARCA,NUMFIANZA,DIMENSIONES,MONTOPPRINC,MONTOPACCE,NUMREQ,NUM.NUM_PROG,NUM2.NUM_INST


	SELECT --cuerpo de detalle.
		INSTAL.ID
		,INSTAL.ID_DETALLECOTIZ
		,INSTAL.ID_DESPACHO_DIST
		,INSTAL.CODIGOPRODUCTO
		,INSTAL.DESCRIPCION
		,INSTAL.MARCA
		,INSTAL.SERIE
		,INSTAL.CANTIDADMP
		,INSTAL.PERIODICIDAD
		,INSTAL.CODUBIGEODEST
		,CONCAT(UBI.NOMDEPARTAMENTO,' / ',UBI.NOMPROVINCIA, ' / ', UBI.NOMDISTRITO) AS DESCUBIGEODEST
		,INSTAL.DIRECCION
		,INSTAL.NROPISO
		,CONCAT(EMPLEADO.APELLIDOPATERNO,' ',EMPLEADO.APELLIDOMATERNO,' ',EMPLEADO.NOMBRES) AS NOMBRECOMPLETO
		,DESPACHO.EMPRESA
		,CONVERT(VARCHAR(10),DESPACHO.FECHAPROGRAMACION,23) AS FECHAPROGRAMACION
		,CONVERT(VARCHAR(10),DESPACHO.FECHAINSTALACION,23) AS FECHAINSTALACION
	FROM
	TBD_INSTALACION AS INSTAL WITH(NOLOCK)
	LEFT JOIN [dbo].[TBD_DESPACHO_DIST] AS DESPACHO ON INSTAL.ID_DESPACHO_DIST = DESPACHO.ID
	LEFT JOIN [dbo].[TBM_EMPLEADOS] AS EMPLEADO ON DESPACHO.COD_TECNICO = EMPLEADO.ID_EMPLEADO
	LEFT JOIN [dbo].[TBM_UBIGEO] AS UBI ON UBI.CODUBIGEO = INSTAL.CODUBIGEODEST
	WHERE NUMREQ = @isNumReq
END

