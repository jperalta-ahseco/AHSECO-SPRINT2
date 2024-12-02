USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_PREV_SEL_DETALLE_MANT]
(
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		28.11.24		Realiza la búsqueda del detalle del mantenimiento preventivo.
	EXEC [USP_PREV_SEL_DETALLE_MANT] 3 
  =======================================================================================================*/
  @IsNumMant			BIGINT
)
AS
BEGIN
SET NOCOUNT ON

/*Detalle de Mantenimientos Preventivos*/------------------------------------------------------------------

;WITH CTE_1 As (
		SELECT
			SERIE
			,ID_MANT
		FROM [dbo].[TBM_MANT_PREV]
		WHERE ID_MANT = @IsNumMant
		),
	CTE_2 AS (
			SELECT
				COTCOST.CANTPREVENTIVO AS CANTPREVENT
				,cte.SERIE
			FROM CTE_1 cte
			INNER JOIN [dbo].[TBD_DESPACHO_DIST] DESP WITH(NOLOCK) ON cte.SERIE = DESP.NUMSERIE
			LEFT JOIN [dbo].[TBD_COTIZACIONCOSTOS] COTCOST WITH(NOLOCK) ON DESP.ID_COTCOSTOS = COTCOST.ID
	),
	CTE_3 AS (																						----------------------------------
		SELECT																						----------------------------------
			COUNT(1) AS pendientes																	--Se obtienen 				   ---
			,MANT.SERIE																				--Los mantenimientos pendientes---
		FROM [dbo].[TBM_MANT_PREV] MANT																----------------------------------
		INNER JOIN CTE_1 cte on cte.SERIE = MANT.SERIE												----------------------------------
		WHERE MANT.ESTADO = 'PEND'																	
		GROUP BY MANT.SERIE																			
	),																								
	CTE_4 AS (
		SELECT																						----------------------------------
			COUNT(1) AS completados																	----------------------------------
			,MANT.SERIE																				--Se obtienen 				   ---
		FROM [dbo].[TBM_MANT_PREV] MANT																--Los mantenimientos realizados---
		INNER JOIN CTE_1 cte on cte.SERIE = MANT.SERIE												----------------------------------
		WHERE MANT.ESTADO = 'COM'																	----------------------------------
		GROUP BY MANT.SERIE
		),
	CTE_5 AS (
		SELECT 																						----------------------------------
			cte2.SERIE																				----------------------------------
			,ISNULL(pendientes,0)  pendientes														--Se obtienen                  ---
			,ISNULL(completados,0) completados														--Los Mantenimientos totales   ---
			,ISNULL(CANTPREVENT,0) total															--Los mantenimientos realizados---
		FROM CTE_2 cte2 																			--Los mantenimientos pendientes---
		LEFT JOIN CTE_3 cte3 ON cte3.SERIE = cte2.SERIE												----------------------------------
		LEFT JOIN CTE_4 cte4 ON cte4.SERIE = cte2.SERIE												----------------------------------
	)
	SELECT 
		*
	INTO #totales
	FROM CTE_5

-----------------------------------------------------------------------------------------------------------


		SELECT 
			ID_MANT						AS ID_MANT
			,MANT.ID_WORKFLOW			AS ID_WORKFLOW
			,MANT.SERIE					AS SERIE
			,MANT.FECHAINSTALACION		AS FECHAINSTALACION
			,MANT.FECHAMANTENIMIENTO	AS FECHAMANTENIMIENTO
			,SOL.RAZONSOCIAL			AS RAZONSOCIAL	
			,SOL.COD_EMPRESA			AS COD_EMPRESA
			,MANT.DIRECCION				AS DIRECCION
			,MANT.UBIGEODEST			AS UBIGEODEST
			,COTDET.CODITEM				AS CODITEM
			,COTDET.DESCRIPCION			AS DESCRIPCION
			,COTIZ.GARANTIA				AS CODGARANTIA
			,total.total				AS TOTALPREVENT
			,total.pendientes			AS PREVENTPEND
			,total.completados			AS PREVENTREAL
			,COTCOST.CODCICLOPREVENT	AS CODCICLOPREVENT
			,MANT.NUMPROCESO			AS NUMPROCESO
			,MANT.TIPOPROCESO			AS TIPOPROCESO
			,MANT.ORDENCOMPRA			AS ORDENCOMPRA
			,MANT.NUMFIANZA				AS NUMFIANZA
			,MANT.ESTADO				AS ESTADO
		INTO #tmpParcial
		FROM [dbo].[TBM_MANT_PREV] MANT WITH(NOLOCK)
		LEFT JOIN #totales total WITH(NOLOCK) ON total.SERIE = MANT.SERIE
		LEFT JOIN [dbo].[TBD_DESPACHO_DIST] DESP WITH(NOLOCK) ON MANT.SERIE = DESP.NUMSERIE
		LEFT JOIN [dbo].[TBD_COTIZACIONCOSTOS] COTCOST WITH(NOLOCK) ON DESP.ID_COTCOSTOS = COTCOST.ID
		LEFT JOIN [dbo].[TBD_COTIZACIONVENTA] COTDET WITH(NOLOCK) ON COTDET.ID = COTCOST.ID_COTDETALLE
		LEFT JOIN [dbo].[TBM_COTIZACIONVENTA] COTIZ WITH(NOLOCK) ON COTIZ.ID_COTIZACION = COTDET.ID_COTIZACION
		LEFT JOIN [dbo].[TBM_SOLICITUDVENTA] SOL WITH(NOLOCK) ON SOL.ID_SOLICITUD = COTIZ.ID_SOLICITUD
		WHERE MANT.ID_MANT = @IsNumMant

	SELECT
		parcial.ID_MANT
		,parcial.ID_WORKFLOW
		,parcial.SERIE
		,parcial.RAZONSOCIAL
		,parcial.FECHAINSTALACION
		,parcial.FECHAMANTENIMIENTO
		,EMPRESA.VALOR1 AS EMPRESA
		,parcial.DIRECCION
		,CONCAT(UBI.NOMDEPARTAMENTO,' / ',UBI.NOMPROVINCIA,' / ',UBI.NOMDISTRITO) AS UBIGEODEST
		,parcial.CODITEM
		,parcial.DESCRIPCION
		,RGA.[DESMARCA]
		,GARANT.VALOR1 AS GARANTIA
		,CICLO.DESCRIPCION AS CICLO
		,parcial.NUMPROCESO
		,parcial.TIPOPROCESO
		,parcial.ORDENCOMPRA
		,parcial.NUMFIANZA
		,parcial.ESTADO
		,TOTALPREVENT
		,PREVENTPEND
		,PREVENTREAL
	FROM #tmpParcial parcial
	LEFT JOIN [dbo].[TBD_DATOS_GENERALES] GARANT WITH(NOLOCK) ON parcial.CODGARANTIA = GARANT.COD_VALOR1 AND DOMINIO = 'GARANTIAS' AND GARANT.ESTADO = '1'
	LEFT JOIN [dbo].[TBD_DATOS_GENERALES] EMPRESA WITH(NOLOCK) ON parcial.COD_EMPRESA = EMPRESA.COD_VALOR1 AND EMPRESA.DOMINIO = 'RAZSOCIAL' AND EMPRESA.ESTADO = '1'
	LEFT JOIN [dbo].[TBD_DATOS_GENERALES] CICLO WITH(NOLOCK) ON CICLO.DOMINIO = 'CICLOPREV' AND CICLO.PARAMETRO = parcial.CODCICLOPREVENT AND CICLO.ESTADO = '1'
 	LEFT JOIN [dbo].[TBM_UBIGEO] UBI WITH(NOLOCK) ON UBI.CODUBIGEO = parcial.UBIGEODEST
	LEFT JOIN [dbo].[TBM_PROCESOESTADOS] EST WITH(NOLOCK) ON EST.COD_ESTADO = parcial.ESTADO
	LEFT JOIN (SELECT [NOMPRODUCTO],[DESMARCA],[CODIGOPRODUCTO] FROM OPENQUERY([AH-SRV4],'
		SELECT
			A.AR_CCODIGO CODIGOPRODUCTO,
			A.AR_CDESCRI NOMPRODUCTO,
			D.TG_CDESCRI DESMARCA
		FROM  [RSFACCAR].[dbo].[AL0007ARTI] A WITH(NOLOCK)
		LEFT JOIN  [RSFACCAR].[dbo].[AL0007STOC] B WITH(NOLOCK) ON A.AR_CCODIGO=B.SK_CCODIGO
		LEFT JOIN  [RSFACCAR].[dbo].[AL0007TABL] D WITH(NOLOCK) ON D.TG_CCOD=''V7'' AND A.AR_CMARCA=D.TG_CCLAVE 
		LEFT JOIN  [RSFACCAR].[dbo].[AL0007SERI] F WITH(NOLOCK) ON A.AR_CCODIGO=F.SR_CCODIGO AND B.SK_CALMA=F.SR_CALMA AND F.SR_NSKDIS<>0 
		WHERE B.SK_CALMA IN (''0001'',''0015'',''0017'') GROUP BY A.AR_CCODIGO,A.AR_CDESCRI,D.TG_CDESCRI,F.SR_CSERIE' )) RGA ON RGA.CODIGOPRODUCTO = parcial.CODITEM
	ORDER BY ID_MANT ASC
SET NOCOUNT OFF
END