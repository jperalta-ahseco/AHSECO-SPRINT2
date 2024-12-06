USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_SEL_GARANT_PROX_VENCER]
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		25.11.24		Selecciona los productos cuya garantia está próxima a vencer
	EXEC [USP_SEL_GARANT_PROX_VENCER]
=======================================================================================================*/

AS
BEGIN
SET NOCOUNT ON
	DECLARE @IsNumDias INT
	DECLARE @FecHoy DATETIME 
	DECLARE @FecFinal DATETIME

	SET @IsNumDias = (SELECT TOP 1 CAST(VALOR1 AS INT) FROM TBD_DATOS_GENERALES WHERE DOMINIO = 'DIASGAR') --Obtenemos el número de días. 

/************************************************************/
	IF OBJECT_ID('tempdb..#tmpDetalleParcial') IS NOT NULL
		DROP TABLE #tmpDetalleParcial
	IF OBJECT_ID('tempdb..#tmpDetalle') IS NOT NULL
		DROP TABLE #tmpDetalle
/************************************************************/

----Se Establece los rangos de Fecha------------------------------------------------------------------------------------------------------------------------------------------------
	SET @FecHoy = GETDATE()
	SET @FecFinal = DATEADD(DAY,@IsNumDias,@FecHoy)
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	/*Detalle de los equipos con la fecha de vencimiento de su garantia*/
	SELECT
		COTIZ.ID_SOLICITUD					AS SOLICITUD
		,COTCOST.ID_COTDETALLE				AS ID_COTDETALLE
		,NUMSERIE							AS NUMSERIE
		,ID_COTCOSTOS						AS ID_COTCOSTOS
		,DESPACHO.FECHAINSTALACION			AS FECHAINSTALACION
		,DATOS.VALOR1						AS VALORGARANTIA
		,COTDET_DESP.NMESGARANADIC			AS NMESGARANADIC
		,DATEADD(month,CAST((SUBSTRING(TRIM(DATOS.VALOR1),0,CHARINDEX(' ',DATOS.VALOR1,0))) AS INT) ,DESPACHO.FECHAINSTALACION) AS FECHAVENCIMIENTO
	INTO #tmpDetalleParcial
	FROM [dbo].[TBD_DESPACHO_DIST] AS DESPACHO WITH(NOLOCK)
	LEFT JOIN (SELECT ID, ID_COTDETALLE FROM [dbo].[TBD_COTIZACIONCOSTOS] WITH(NOLOCK)) AS COTCOST  ON COTCOST.ID = DESPACHO.ID_COTCOSTOS
 	LEFT JOIN (SELECT ID, ID_COTIZACION FROM [dbo].[TBD_COTIZACIONVENTA] WITH(NOLOCK)) AS COTDET ON COTDET.ID = COTCOST.ID_COTDETALLE
	LEFT JOIN [dbo].[TBM_COTDET_DESPACHO] AS COTDET_DESP WITH(NOLOCK) ON COTDET.ID = COTDET_DESP.ID_COTDETALLE
	LEFT JOIN [dbo].[TBM_COTIZACIONVENTA] AS COTIZ WITH(NOLOCK) ON COTDET.ID_COTIZACION = COTIZ.ID_COTIZACION AND COTIZ.ESTADO = 'A'
	LEFT JOIN [dbo].[TBD_DATOS_GENERALES] AS DATOS WITH(NOLOCK) ON DATOS.DOMINIO = 'GARANTIAS' AND DATOS.PARAMETRO = COTIZ.GARANTIA

---Añadimos la garantía adicional de ser el caso------------------------------------------------------------------------------------------------------------------------------------
	SELECT 
		SOLICITUD
		,ID_COTDETALLE
		,NUMSERIE
		,FECHAINSTALACION
		,VALORGARANTIA
		,ID_COTCOSTOS
		,NMESGARANADIC
		,DATEADD(MONTH,ISNULL(NMESGARANADIC,0),FECHAVENCIMIENTO) AS FECHAVENCIMIENTO
	INTO #tmpDetalle
	FROM #tmpDetalleParcial
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	SELECT
		SOLICITUD
		,COTDET.DESCRIPCION					AS DESCRIPCION
		,RGA.DESMARCA						AS DESCMARCA
		,'MODELO'							AS MODELO--Modelo Queda pendiente
		,COTDET.CODITEM						AS CODIGOPRODUCTO
		,NUMSERIE
		,FECHAINSTALACION
		,VALORGARANTIA
		,NMESGARANADIC						AS MESESADICIONAL
		,FECHAVENCIMIENTO
	FROM #tmpDetalle AS DETALLE
	LEFT JOIN [dbo].[TBD_COTIZACIONCOSTOS] AS COTCOST WITH(NOLOCK) ON COTCOST.ID = DETALLE.ID_COTCOSTOS
	LEFT JOIN [dbo].[TBD_COTIZACIONVENTA] AS COTDET WITH(NOLOCK) ON COTDET.ID = COTCOST.ID_COTDETALLE
	LEFT JOIN [dbo].[TBM_COTIZACIONVENTA] AS COTIZ WITH(NOLOCK) ON COTIZ.ID_COTIZACION = COTDET.ID_COTIZACION
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
	WHERE FECHAVENCIMIENTO BETWEEN @FecHoy AND @FecFinal

SET NOCOUNT OFF
END