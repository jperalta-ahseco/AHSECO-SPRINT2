USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_PREV_SEL_PREVENTIVOS]
(
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		18.11.24		Realiza el select de datos de la solicitud de venta por n�mero de serie.
	EXEC [USP_PREV_SEL_PREVENTIVOS] @IsNumSerie=xc123
=======================================================================================================*/
	 @IsNumSerie		VARCHAR(100) 
	,@IsNumProc			VARCHAR(15)
	,@IsNumOrdCompra	VARCHAR(200)
	,@IsNumFianza		VARCHAR(15)
	,@IsEmpresa			VARCHAR(6)
	,@IsPeriodoInicio	DATETIME
	,@IsPeriodoFinal	DATETIME
	,@IsEstado			VARCHAR(5)
)
AS
BEGIN
SET NOCOUNT ON

	DECLARE @sql NVARCHAR(MAX),
	@ID_SOLICITUD BIGINT
	--@IsNumSerie VARCHAR(100) = 'xc123' ,

	IF OBJECT_ID('tempdb..#tmpSolicitudVenta') IS NOT NULL DROP TABLE #tmpSolicitudVenta
	IF OBJECT_ID('tempdb..#tmpInfoContacto') IS NOT NULL DROP TABLE #tmpInfoContacto
	IF OBJECT_ID('tempdb..#tmpDetalleParcial') IS NOT NULL DROP TABLE #tmpDetalleParcial


	/*Hallar n�mero de solicitud*/
	SELECT
		TOP 1 @ID_SOLICITUD = COTIZ.ID_SOLICITUD
	FROM [dbo].[TBD_DESPACHO_DIST] AS DESPACHO WITH(NOLOCK)
	INNER JOIN [dbo].[TBD_COTIZACIONCOSTOS] AS COTCOST WITH(NOLOCK) ON DESPACHO.ID_COTCOSTOS = DESPACHO.ID
	INNER JOIN [dbo].[TBD_COTIZACIONVENTA]	AS COTDET WITH(NOLOCK) ON COTDET.ID = COTCOST.ID_COTDETALLE
	LEFT JOIN [dbo].[TBM_COTIZACIONVENTA]	AS COTIZ WITH(NOLOCK) ON COTIZ.ID_COTIZACION = COTDET.ID_COTIZACION
	WHERE DESPACHO.NUMSERIE = CAST(@IsNumSerie AS VARCHAR(100))


	/*Detalle de la cabecera de solicitud*/
	SELECT
		SOL.ID_SOLICITUD					AS ID_SOLICITUD
		,ID_WORKFLOW						AS ID_WORKFLOW
		,datos.VALOR1						AS EMPRESA
		,SOL.COD_EMPRESA					AS CODEMPRESA
		,IDCLIENTE							AS IDCLIENTE
		,RUC								AS RUC
		,RAZONSOCIAL						AS RAZONSOCIAL
		,CONCAT(ISNULL(ubi.[NOMDEPARTAMENTO],''),' / ',ISNULL(ubi.[NOMPROVINCIA],''),' / ',ISNULL(ubi.[NOMDISTRITO],'')) AS UBIGEO
		,cli.CODUBIGEO						AS CODUBIGEO
		,ASESORVENTA						AS ASESORVENTA
		,COTI.IDCONTACTO					AS IDCONTACTO
		,COTI.GARANTIA						AS GARANTIA
		,SOL.TIPOVENTA						AS TIPOVENTA
		,TIPO.VALOR1						AS TIPO
		,CONVERT(VARCHAR(10),FECHA_SOL,103)	AS FECHA_SOL
		,SOL.ESTADO							AS ESTADO
		,ESTADOS.NOM_ESTADO					AS NOM_ESTADO
		,TIPOPROCESO						AS TIPOPROCESO
		,NROPROCESO							AS NROPROCESO
		--Orden de compra
	INTO #tmpSolicitudVenta									---Insertamos datos de la solicitud de venta
	FROM [dbo].[TBM_SOLICITUDVENTA] AS SOL WITH(NOLOCK)
	LEFT JOIN [dbo].[TBM_CLIENTES] AS cli WITH(NOLOCK) ON cli.ID = SOL.IDCLIENTE
	LEFT JOIN [dbo].[TBM_COTIZACIONVENTA] AS COTI WITH(NOLOCK) ON SOL.ID_SOLICITUD = COTI.ID_SOLICITUD AND COTI.ESTADO = '1'
	LEFT JOIN [dbo].[TBM_PROCESOESTADOS] AS ESTADOS WITH(NOLOCK) ON SOL.ESTADO = ESTADOS.COD_ESTADO
	LEFT JOIN [dbo].[TBM_UBIGEO] AS ubi WITH(NOLOCK) ON ubi.CODUBIGEO = cli.CODUBIGEO
	LEFT JOIN [dbo].[TBD_DATOS_GENERALES] datos WITH(NOLOCK) ON datos.COD_VALOR1 = SOL.COD_EMPRESA
	LEFT JOIN [dbo].[TBD_DATOS_GENERALES] AS TIPO ON TIPO.COD_VALOR1 = SOL.TIPO_SOL 
	LEFT JOIN (SELECT COD_VALOR1,VALOR1 FROM [dbo].[TBD_DATOS_GENERALES] WHERE DOMINIO = 'FLOWSOL' AND ESTADO = '1') AS FLUJO ON FLUJO.COD_VALOR1 = CAST(SOL.ID_FLUJO AS NVARCHAR)
	WHERE SOL.ID_SOLICITUD = @ID_SOLICITUD

	/*Informaci�n de Contacto*/
	SELECT 
		NUMDOCCONTACTO
		,[NOMBRE CONTACTO]							AS NOMBRECONTACTO
		,ISNULL(TELEFONOCONTACTO,TELEFONO2CONTACTO) AS TELEFONOCONTACTO
		,CONTACT.ESTABLECIMIENTO					AS ESTABLECIMIENTO
		,CONTACT.CARGOCONTACTO						AS CARGOCONTACTO
		,CONTACT.IDCONTACTO
	INTO #tmpInfoContacto
	FROM #tmpSolicitudVenta sol
	LEFT JOIN [dbo].[TBM_CONTACTOS] AS CONTACT WITH(NOLOCK) ON sol.IDCONTACTO = CONTACT.IDCONTACTO


	/*Detalle del equipo*/
	SELECT
		DESPACHO.ID							AS ID_DESPACHO_DIST
		,NUMSERIE							AS NUMSERIE
		,COTIZ.ID_COTIZACION				AS ID_COTIZACION
		,COTDET.DESCRIPCION					AS DESCRIPCION
		,RGA.DESMARCA						AS DESCMARCA
		,'MODELO'							AS MODELO--Modelo Queda pendiente
		,COTDET.CODITEM						AS CODIGOPRODUCTO
		,COTCOST.CANTPREVENTIVO				AS MANTPREVENTIVO
		,0 AS PREVREAL--Pendiente preventivos realizados
		,0 AS PREVPEND--Pendientes preventivos pendientes
		,DESPACHO.FECHAINSTALACION			AS FECHAINSTALL
		,COTDETDES.NUMFIANZA				AS NUMFIANZA
		,COTIZ.GARANTIA						AS GARANTIA
		,DATOS.VALOR1						AS VALORGARANTIA
		,COTCOST.DIRECCION					AS DIRECCION
		,COTCOST.CODUBIGEODEST				AS CODUBIGEODEST
		,DATEADD(month,CAST((SUBSTRING(TRIM(DATOS.VALOR1),0,CHARINDEX(' ',DATOS.VALOR1,0))) AS INT) ,DESPACHO.FECHAINSTALACION) AS FECHAVENCIMIENTO
	INTO #tmpDetalleParcial
	FROM [dbo].[TBD_DESPACHO_DIST] AS DESPACHO WITH(NOLOCK)
	LEFT JOIN [dbo].[TBD_COTIZACIONCOSTOS] AS COTCOST WITH(NOLOCK) ON COTCOST.ID = DESPACHO.ID_COTCOSTOS
	LEFT JOIN [dbo].[TBD_COTIZACIONVENTA] AS COTDET WITH(NOLOCK) ON COTDET.ID = COTCOST.ID_COTDETALLE
	LEFT JOIN [dbo].[TBM_COTDET_DESPACHO] AS COTDETDES WITH(NOLOCK) ON COTDET.ID = COTDETDES.ID_COTDETALLE
	LEFT JOIN [dbo].[TBM_COTIZACIONVENTA] AS COTIZ WITH(NOLOCK) ON COTDET.ID_COTIZACION = COTIZ.ID_COTIZACION
	LEFT JOIN [dbo].[TBD_DATOS_GENERALES] AS DATOS WITH(NOLOCK) ON DATOS.DOMINIO = 'GARANTIAS' AND DATOS.COD_VALOR1 = COTIZ.GARANTIA AND DATOS.ESTADO = '1'
	LEFT JOIN (SELECT [NOMPRODUCTO],[DESMARCA],[CODIGOPRODUCTO] FROM OPENQUERY([AH-SRV4],'
		SELECT
			A.AR_CCODIGO CODIGOPRODUCTO,
			A.AR_CDESCRI NOMPRODUCTO,
			D.TG_CDESCRI DESMARCA
		FROM  [RSFACCAR].[dbo].[AL0007ARTI] A WITH(NOLOCK)
		LEFT JOIN  [RSFACCAR].[dbo].[AL0007STOC] B WITH(NOLOCK) ON A.AR_CCODIGO=B.SK_CCODIGO
		LEFT JOIN  [RSFACCAR].[dbo].[AL0007TABL] D WITH(NOLOCK) ON D.TG_CCOD=''V7'' AND A.AR_CMARCA=D.TG_CCLAVE 
		LEFT JOIN  [RSFACCAR].[dbo].[AL0007SERI] F WITH(NOLOCK) ON A.AR_CCODIGO=F.SR_CCODIGO AND B.SK_CALMA=F.SR_CALMA AND F.SR_NSKDIS<>0 
		WHERE B.SK_CALMA IN (''0001'',''0015'',''0017'') GROUP BY A.AR_CCODIGO,A.AR_CDESCRI,D.TG_CDESCRI,F.SR_CSERIE' )) RGA ON RGA.CODIGOPRODUCTO = COTDET.CODITEM
	WHERE ID_SOLICITUD = @ID_SOLICITUD AND NUMSERIE = CAST(@IsNumSerie AS VARCHAR(100))


	/*determina la fecha final de garant�a*/
	SELECT 
		VENTA.*
		,ORDEN.NUMORDEN AS ORDENCOMPRA
	FROM #tmpSolicitudVenta AS VENTA --Cabecera
	LEFT JOIN (select TOP 1 ID_SOLICITUD, NUMORDEN FROM [TBM_DESPACHO] GROUP BY ID_SOLICITUD, NUMORDEN) AS ORDEN ON VENTA.ID_SOLICITUD = ORDEN.ID_SOLICITUD

	SELECT 
		* 
	FROM #tmpInfoContacto --InfoContacto

	SELECT
		ID_DESPACHO_DIST
		,NUMSERIE
		,ID_COTIZACION
		,DESCRIPCION
		,DESCMARCA
		,MODELO
		,CODIGOPRODUCTO
		,MANTPREVENTIVO
		,PREVREAL
		,PREVPEND
		,NUMFIANZA
		,FECHAINSTALL
		,GARANTIA
		,VALORGARANTIA
		,DIRECCION
		,CODUBIGEODEST
		,CONCAT(ISNULL(ubi.[NOMDEPARTAMENTO],''),' / ',ISNULL(ubi.[NOMPROVINCIA],''),' / ',ISNULL(ubi.[NOMDISTRITO],'')) AS UBIDESTINO
		,CONVERT(VARCHAR(10),FECHAVENCIMIENTO,103) AS FECHAVENCIMIENTO
		,CASE WHEN FECHAVENCIMIENTO >= GETDATE() THEN 'VIGENTE' 
			ELSE 'VENCIDO' END ESTADOGARANT
	FROM #tmpDetalleParcial detalle
	LEFT JOIN [dbo].[TBM_UBIGEO] ubi ON ubi.CODUBIGEO = detalle.CODUBIGEODEST

SET NOCOUNT OFF
END