USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_INS_MANT_PREV]
(
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		26.11.24		Realiza el insert de los mantenimientos a realizarce después de acabar la instalación técnica.
	EXEC [USP_INS_MANT_PREV] 1, 'admin'
  =======================================================================================================*/
	@isIdSolicitud BIGINT
	,@UsrEjecuta NVARCHAR(50)
)
AS
BEGIN

SET NOCOUNT ON

	DECLARE @isTipoProceso INT
	,@SUMA INT
	,@I INT
	,@ESTADO VARCHAR(5)
	,@MSG VARCHAR(100)
	,@COD INT

	IF OBJECT_ID('tempdb..#tmpIdWorkFlows') IS NOT NULL 
		DROP TABLE #tmpIdWorkFlows
	IF OBJECT_ID('tempdb..#tmpWorkFlows') IS NOT NULL 
		DROP TABLE #tmpWorkFlows
	IF OBJECT_ID('tempdb..#tmpPreventivos') IS NOT NULL 
		DROP TABLE #tmpPreventivos
		
	SET @isTipoProceso = 6 --Proceso de Preventivos

	SELECT @ESTADO = COD_ESTADO FROM TBM_PROCESOESTADOS WHERE ID_PROCESO = @isTipoProceso

	CREATE TABLE #tmpIdWorkFlows(
		ID INT IDENTITY (1,1)
		,ID_WORKFLOW BIGINT
	)

	CREATE TABLE #tmpWorkFlows(
		ID BIGINT IDENTITY (1,1)
		,ID_PROCESO INT
		,AUDIT_REG_USR NVARCHAR(50)
		,AUDIT_REG_FEC DATETIME
	)

	CREATE TABLE #tmpPreventivos(
		ID_MANT BIGINT IDENTITY(1,1),
		SERIE VARCHAR(200) NULL,
		NOMEMPRESA VARCHAR(200) NULL,
		ORDENCOMPRA VARCHAR(35) NULL,
		NUMPROCESO VARCHAR(15) NULL,
		TIPOPROCESO VARCHAR(200) NULL,
		CONTRATO VARCHAR(25) NULL,
		NUMFIANZA VARCHAR(15) NULL,
		FECHAINSTALACION DATETIME NULL,
		FECHAMANTENIMIENTO DATETIME NULL,
		UBIGEODEST VARCHAR(6) NULL, 
		DIRECCION VARCHAR(150) NULL
		)

/*Detalles Generales de la Solicitud*/---------------------------------------------------------------------------------------------------------------------
	BEGIN TRY
		SELECT 
			SOL.ID_SOLICITUD		  AS ID_SOLICITUD
			,COTIZ.ID_COTIZACION	  AS ID_COTIZACION
			,COTDET.ID				  AS ID_DETALLE
			,SOL.RAZONSOCIAL		  AS RAZONSOCIAL
			,SOL.TIPOPROCESO		  AS TIPOPROCESO
			,SOL.NROPROCESO			  AS NROPROCESO
			,COTDESP.NUMORDEN		  AS NUMORDEN
		INTO #tmpMain
		FROM [dbo].[TBM_SOLICITUDVENTA] SOL WITH(NOLOCK) 
		LEFT JOIN [dbo].[TBM_COTIZACIONVENTA] COTIZ WITH(NOLOCK) ON SOL.ID_SOLICITUD = COTIZ.ID_SOLICITUD AND COTIZ.ESTADO = '1'
		LEFT JOIN [dbo].[TBD_COTIZACIONVENTA] COTDET WITH(NOLOCK) ON COTDET.ID_COTIZACION = COTIZ.ID_COTIZACION AND COTDET.TIPOITEM = 'PRO'
		LEFT JOIN [dbo].[TBM_DESPACHO] COTDESP WITH(NOLOCK) ON COTDESP.ID_SOLICITUD = SOL.ID_SOLICITUD AND COTDESP.ID_COTIZACION = COTIZ.ID_COTIZACION
		WHERE SOL.ID_SOLICITUD = @isIdSolicitud
	------------------------------------------------------------------------------------------------------------------------------------------------------------
	/*Se arma los datos que se insertarán en la tabla*/---------------------------------------------------------------------------------------------------------
		SELECT
			DESP.NUMSERIE
		 ,MAIN.RAZONSOCIAL
		 ,MAIN.NUMORDEN 
		 ,MAIN.TIPOPROCESO
		 ,MAIN.NROPROCESO
		 ,COTDET.NUMFIANZA
		 ,DESP.FECHAINSTALACION
		 ,COTCOST.CANTPREVENTIVO
		 ,COTCOST.CODCICLOPREVENT
		 ,COTCOST.CODUBIGEODEST
		 ,COTCOST.DIRECCION
		 ,DATOS.VALOR1			AS TIPCICLO
		 ,DATOS.VALOR2			AS CANTIDAD
		INTO #tmpParcial
		FROM [dbo].[TBD_DESPACHO_DIST] DESP WITH(NOLOCK)
		INNER JOIN #tmpMain MAIN ON 1 = 1
		INNER JOIN [dbo].[TBD_COTIZACIONCOSTOS] COTCOST WITH(NOLOCK) ON DESP.ID_COTCOSTOS = COTCOST.ID AND COTCOST.ID_COTDETALLE = MAIN.ID_DETALLE
		INNER JOIN [dbo].[TBM_COTDET_DESPACHO] COTDET WITH(NOLOCK) ON COTDET.ID_COTDETALLE = MAIN.ID_DETALLE
		LEFT JOIN [dbo].[TBD_DATOS_GENERALES] AS DATOS WITH(NOLOCK) ON DATOS.DOMINIO = 'CICLOPREV' AND DATOS.PARAMETRO = COTCOST.CODCICLOPREVENT AND DATOS.ESTADO = '1'

		SELECT @SUMA = SUM(CANTPREVENTIVO) FROM #tmpParcial --Determinamos el número de preventivos.

	/*Registramos en el WorkFlow y creamos tabla auxiliar donde registramos los Ids*/------------------------------------------------------------------------------
	SET @I = 0
		WHILE @I < @SUMA
		BEGIN
			INSERT INTO [dbo].[TBM_WORKFLOW](ID_PROCESO,AUDIT_REG_USR,AUDIT_REG_FEC)
			SELECT @isTipoProceso,@UsrEjecuta,GETDATE()

			INSERT INTO #tmpIdWorkFlows(ID_WORKFLOW)
			SELECT  IDENT_CURRENT('TBM_WORKFLOW')

			SET @I = @I + 1
		END

	/*Insertamos de forma parcial todos los mantenimientos*/-------------------------------------------------------------------------------------------------------
		;WITH Numeros AS (
			SELECT ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS n
			FROM master.dbo.spt_values
		)	

		INSERT INTO #tmpPreventivos(SERIE,NOMEMPRESA,ORDENCOMPRA,NUMPROCESO,TIPOPROCESO,NUMFIANZA,FECHAINSTALACION,FECHAMANTENIMIENTO,UBIGEODEST,DIRECCION)
		SELECT 
			t.NUMSERIE
		 ,t.RAZONSOCIAL
		 ,t.NUMORDEN 
		 ,t.NROPROCESO
		 ,t.TIPOPROCESO
		 ,t.NUMFIANZA
		 ,t.FECHAINSTALACION
		 ,CASE 
			WHEN TIPCICLO='D' THEN DATEADD(DAY,(CANTIDAD * n.n),FECHAINSTALACION)
			WHEN TIPCICLO='M' THEN DATEADD(MONTH,(CANTIDAD * n.n),FECHAINSTALACION)
		  END AS FECHAMANTENIMIENTO
		 ,t.CODUBIGEODEST
		 ,t.DIRECCION
		FROM #tmpParcial t 
		CROSS JOIN Numeros n
		 WHERE n.n <= t.CANTPREVENTIVO

	/*Insertamos a la tabla maestra [TBM_MANT_PREV] realizando una coordinación de todos los datos*/----------------------------------------------------------------
		INSERT INTO [dbo].[TBM_MANT_PREV](ID_WORKFLOW,SERIE,NOMEMPRESA,ORDENCOMPRA,NUMPROCESO,TIPOPROCESO,CONTRATO,NUMFIANZA,FECHAINSTALACION,FECHAMANTENIMIENTO,UBIGEODEST,DIRECCION,ESTADO,USR_REG,FEC_REG)
		SELECT
			j.ID_WORKFLOW
			,t.SERIE
			,t.NOMEMPRESA
			,t.ORDENCOMPRA
			,t.NUMPROCESO
			,t.TIPOPROCESO
			,t.CONTRATO
			,t.NUMFIANZA
			,t.FECHAINSTALACION
			,t.FECHAMANTENIMIENTO
			,t.UBIGEODEST
			,t.DIRECCION
			,@ESTADO
			,@UsrEjecuta
			,GETDATE()
		FROM #tmpPreventivos t
		INNER JOIN #tmpIdWorkFlows j ON t.ID_MANT = j.ID

		SET @COD = 1
		SET @MSG = 'USP ejecutado con éxito'
		SELECT @COD COD, @MSG MSG
	END TRY
	BEGIN CATCH
		SET @COD = 0
		SET @MSG = 'Error en el USP: Linea:'+ERROR_LINE()+', Mensaje de error:' + ERROR_MESSAGE()
		SELECT @COD COD, @MSG MSG
	END CATCH
SET NOCOUNT OFF
END
