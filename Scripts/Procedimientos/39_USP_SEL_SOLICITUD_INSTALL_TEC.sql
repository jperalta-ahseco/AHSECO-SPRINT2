USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_SEL_SOLICITUD_INSTALL_TEC]
(
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		24.10.24		Realiza el select del detalle de la solicitud de venta y de la cotización para la bandeja de instalación técnica.
		[USP_SEL_SOLICITUD_INSTALL_TEC] 13
  =======================================================================================================*/
	@isIdSolicitud BIGINT
)
AS
BEGIN

SET NOCOUNT ON;

	SELECT
		SOL.ID_SOLICITUD					AS ID_SOLICITUD
		,ID_WORKFLOW						AS ID_WORKFLOW
		,datos.VALOR1						AS EMPRESA
		,SOL.COD_EMPRESA					AS CODEMPRESA
		,IDCLIENTE							AS IDCLIENTE
		,RUC								AS RUC
		,RAZONSOCIAL						AS RAZONSOCIAL
		,CONCAT(ISNULL(ubi.[NOMDEPARTAMENTO],''),' / ',ISNULL(ubi.[NOMPROVINCIA],''),' / ',ISNULL(ubi.[NOMDISTRITO],'')) AS UBIGEO
		,ASESORVENTA						AS ASESORVENTA
		,COTI.NOMBRECONTACTO				AS NOMBRECONTACTO
		,COTI.TELEFONOCONTACTO				AS TELEFONOCONTACTO
		,COTI.GARANTIA						AS GARANTIA
		,CONTACT.ESTABLECIMIENTO			AS ESTABLECIMIENTO
		,CONTACT.CARGOCONTACTO				AS CARGOCONTACTO
		,SOL.TIPOVENTA						AS TIPOVENTA
		,TIPO.VALOR1						AS TIPO
		,CONVERT(VARCHAR(10),FECHA_SOL,103)	AS FECHA_SOL
		,SOL.ESTADO							AS ESTADO
		,TIPOPROCESO						AS TIPOPROCESO
		,NROPROCESO							AS NROPROCESO
		,DESP.NUMORDEN						AS NUMORDEN
		,ISNULL(CONVERT(VARCHAR(10),DESP.FECHAMAX,103),'') AS FECHAMAX
	INTO #tmpSolicitudVenta										---Insertamos datos de la solicitud de venta
	FROM [dbo].[TBM_SOLICITUDVENTA] AS SOL WITH(NOLOCK)
	LEFT JOIN [dbo].[TBM_CLIENTES] AS cli WITH(NOLOCK) ON cli.ID = SOL.IDCLIENTE
	LEFT JOIN [dbo].[TBM_COTIZACIONVENTA] AS COTI WITH(NOLOCK) ON SOL.ID_SOLICITUD = COTI.ID_SOLICITUD AND COTI.ESTADO = '1'
	LEFT JOIN [dbo].[TBM_CONTACTOS] AS CONTACT WITH(NOLOCK) ON COTI.IDCONTACTO = CONTACT.IDCONTACTO
	LEFT JOIN [dbo].[TBM_UBIGEO] AS ubi WITH(NOLOCK) ON ubi.CODUBIGEO = cli.CODUBIGEO
	LEFT JOIN [dbo].[TBD_DATOS_GENERALES] datos WITH(NOLOCK) ON datos.COD_VALOR1 = SOL.COD_EMPRESA
	LEFT JOIN [dbo].[TBD_DATOS_GENERALES] AS TIPO ON TIPO.COD_VALOR1 = SOL.TIPO_SOL 
	LEFT JOIN (SELECT COD_VALOR1,VALOR1 FROM [dbo].[TBD_DATOS_GENERALES] WHERE DOMINIO = 'FLOWSOL') AS FLUJO ON FLUJO.COD_VALOR1 = CAST(SOL.ID_FLUJO AS NVARCHAR)
	LEFT JOIN (SELECT ID_SOLICITUD,FECHAMAX,NUMORDEN FROM TBM_DESPACHO WITH(NOLOCK) GROUP BY ID_SOLICITUD,FECHAMAX,NUMORDEN) DESP ON SOL.ID_SOLICITUD=DESP.ID_SOLICITUD
	WHERE SOL.ID_SOLICITUD = @isIdSolicitud



	SELECT
		DETALLE.ID
		,RGA.CODIGOPRODUCTO
		,DESCRIPCION
		,RGA.DESMARCA
		,CANTIDAD
		,COTIZ.GARANTIA
		,DESPACHO.INDFIANZA
		,DESPACHO.NUMFIANZA
		,DESPACHO.DIMENSIONES
		,DESPACHO.MONTOPPRINC
		,DESPACHO.MONTOPACCE
		,NUM.NUM_INST
		,NUM.NUM_PROG
	INTO #tmpDetalleCotiz
	FROM [dbo].[TBD_COTIZACIONVENTA] AS DETALLE WITH(NOLOCK)
	LEFT JOIN [dbo].[TBM_COTDET_DESPACHO] DESPACHO WITH(NOLOCK) ON DESPACHO.ID_COTDETALLE = DETALLE.ID
	LEFT JOIN [dbo].[TBM_COTIZACIONVENTA] AS COTIZ WITH(NOLOCK) ON DETALLE.ID_COTIZACION = COTIZ.ID_COTIZACION AND ID_SOLICITUD = @isIdSolicitud
	LEFT JOIN (SELECT A.ID_COTDETALLE,  
							COUNT(B.FECHAINSTALACION) NUM_INST,
							COUNT(C.FECHAPROGRAMACION) NUM_PROG
							from TBD_COTIZACIONCOSTOS A WITH(NOLOCK)
							LEFT JOIN TBD_DESPACHO_DIST B WITH(NOLOCK) ON A.ID=B.ID_COTCOSTOS AND B.FECHAINSTALACION IS NOT NULL
							LEFT JOIN TBD_DESPACHO_DIST C WITH(NOLOCK) ON A.ID=C.ID_COTCOSTOS AND C.FECHAPROGRAMACION IS NOT NULL
							GROUP BY A.ID_COTDETALLE
	) NUM ON DETALLE.ID = NUM.ID_COTDETALLE
	LEFT JOIN (SELECT [NOMPRODUCTO],[DESMARCA],[CODIGOPRODUCTO],[LOTESERIE] FROM OPENQUERY([AH-SRV4],'
	SELECT
		A.AR_CCODIGO CODIGOPRODUCTO,
		A.AR_CDESCRI NOMPRODUCTO,
		D.TG_CDESCRI DESMARCA,
		ISNULL(F.SR_CSERIE,'''') LOTESERIE
	FROM  [RSFACCAR].[dbo].[AL0007ARTI] A WITH(NOLOCK)
	LEFT JOIN  [RSFACCAR].[dbo].[AL0007STOC] B WITH(NOLOCK) ON A.AR_CCODIGO=B.SK_CCODIGO
	LEFT JOIN  [RSFACCAR].[dbo].[AL0007TABL] D WITH(NOLOCK) ON D.TG_CCOD=''V7'' AND A.AR_CMARCA=D.TG_CCLAVE 
	LEFT JOIN  [RSFACCAR].[dbo].[AL0007SERI] F WITH(NOLOCK) ON A.AR_CCODIGO=F.SR_CCODIGO AND B.SK_CALMA=F.SR_CALMA AND F.SR_NSKDIS<>0 
	WHERE B.SK_CALMA IN (''0001'',''0015'',''0017'') GROUP BY A.AR_CCODIGO,A.AR_CDESCRI,D.TG_CDESCRI,F.SR_CSERIE' )) RGA ON RGA.CODIGOPRODUCTO = DETALLE.CODITEM
	WHERE ID_SOLICITUD = @isIdSolicitud  AND DETALLE.TIPOITEM = 'PRO' 


	SELECT	
			COTDET.ID AS ID_DETALLE
			,DESPACHO.ID AS ID_DESPACHO
			,COTDET.CODIGOPRODUCTO		
			,COTDET.DESCRIPCION		
			,COTDET.DESMARCA
			,DESPACHO.NUMSERIE
			,COTCOST.NUMSEC
			,COTDET.GARANTIA
			,CANTPREVENTIVO
			,CODCICLOPREVENT
			,SUBSTRING(CODUBIGEODEST, 0,3) CODDEPARTAMENTO 
			,CONCAT(UBI.NOMDEPARTAMENTO, ' / ', UBI.NOMPROVINCIA, ' / ', UBI.NOMDISTRITO) AS DESCUBIGEODEST
			,DIRECCION
			,NROPISO
	INTO #tmpDespacho 
	FROM [dbo].#tmpDetalleCotiz AS COTDET
	LEFT JOIN [dbo].[TBD_COTIZACIONCOSTOS] AS COTCOST WITH(NOLOCK) ON COTCOST.ID_COTDETALLE  = COTDET.ID
	LEFT JOIN [TBD_DESPACHO_DIST] DESPACHO WITH(NOLOCK) ON COTCOST.ID =  DESPACHO.ID_COTCOSTOS
	LEFT JOIN [dbo].[TBM_UBIGEO] AS UBI WITH(NOLOCK) ON UBI.CODUBIGEO = COTCOST.CODUBIGEODEST

	SELECT * FROM #tmpSolicitudVenta --Detalle de Solicitud
	SELECT * FROM #tmpDetalleCotiz	 --Detalle de Cotización
	select * FROM #tmpDespacho--Detalle de Costos y despacho

	SET NOCOUNT OFF;
END
