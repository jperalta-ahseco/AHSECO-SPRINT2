USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_INS_MANT_PREV]
(
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		26.11.24		Realiza el insert de los mantenimientos a realizarce después de acabar la instalación técnica.
	EXEC [USP_INS_MANT_PREV] 3, 'admin'
  =======================================================================================================*/
	@isIdSolicitud BIGINT
	,@UsrEjecuta NVARCHAR(50)
	,@isIdSolDespacho BIGINT
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
	IF OBJECT_ID('tempdb..#tmpMain') IS NOT NULL 
		DROP TABLE #tmpMain
	IF OBJECT_ID('tempdb..#tmpDespachoParcial') IS NOT NULL 
		DROP TABLE #tmpDespachoParcial	
	IF OBJECT_ID('tempdb..#cantidadCostos') IS NOT NULL 
		DROP TABLE #cantidadCostos
	IF OBJECT_ID('tempdb..#CostosFinal') IS NOT NULL 
		DROP TABLE #CostosFinal
	IF OBJECT_ID('tempdb..#tmpParcial') IS NOT NULL 
		DROP TABLE #tmpParcial
	
	
	SET @isTipoProceso = 6 --Proceso de Preventivos

	SET @ESTADO = 'PEND'

	DECLARE @PERFIL VARCHAR(100)
	SELECT @PERFIL=ISNULL(C.DESCRIPCION,'') FROM TBM_SEGURIDAD_USUARIO A WITH(NOLOCK) 
	INNER JOIN TBM_SEGURIDAD_USUARIO_PERFIL B WITH(NOLOCK) ON A.ID=B.USUARIO_ID AND B.HABILITADO=1
	INNER JOIN TBM_SEGURIDAD_PERFIL C WITH(NOLOCK) ON B.PERFIL_ID=C.ID
	WHERE UPPER(A.USUARIO) =UPPER(@UsrEjecuta) 


	CREATE TABLE #tmpIdWorkFlows(
		ID BIGINT IDENTITY (1,1)
		,ID_WORKFLOW BIGINT
	)

	CREATE TABLE #tmpWorkFlows(
		ID BIGINT IDENTITY (1,1)
		,ID_PROCESO INT
		,AUDIT_REG_USR NVARCHAR(50)
		,AUDIT_REG_FEC DATETIME
	)

	CREATE TABLE #tmpPreventivos(
		ID BIGINT IDENTITY (1,1)
		,ID_MANT BIGINT
		,MONTOUNICOSTO DECIMAL(18,9)
		,FECHAINSTALACION DATETIME NULL
		,FECHAMANTENIMIENTO DATETIME NULL
	)
			
/*Detalles Generales de la Solicitud*/---------------------------------------------------------------------------------------------------------------------
	BEGIN TRY
		SELECT 
			SOL.ID_SOLICITUD		  AS ID_SOLICITUD
			,SOLDESP.ID_COTIZACION	  AS ID_COTIZACION
			,DESPCOT.ID_COTDETALLE	  AS ID_DETALLE
			,SOL.RAZONSOCIAL		  AS RAZONSOCIAL
			,SOL.TIPOPROCESO		  AS TIPOPROCESO
			,SOL.NROPROCESO			  AS NROPROCESO
			,SOLDESP.NUMORDEN		  AS NUMORDEN
			,SOLDESP.NUMCONTRATO	  AS NUMCONTRATO
			,DESPACHO.ID			  AS ID_DESPACHO
		INTO #tmpMain
		FROM [dbo].[TBM_SOLICITUDVENTA] SOL WITH(NOLOCK) 
		LEFT JOIN [dbo].[TBM_SOLDESPACHO] AS SOLDESP WITH(NOLOCK) ON SOLDESP.ID = @isIdSolDespacho
		LEFT JOIN [dbo].[TBM_DESPACHO] AS DESPACHO WITH(NOLOCK) ON SOLDESP.ID = DESPACHO.ID_SOLDESPACHO
		LEFT JOIN [dbo].[TBD_DESPACHO_COTIZACION] AS DESPCOT WITH(NOLOCK) ON SOLDESP.ID = DESPCOT.ID_SOLDESPACHO
		LEFT JOIN [dbo].[TBM_COTDET_DESPACHO] DESCOT WITH(NOLOCK) ON DESCOT.ID_COTDETALLE = DESPCOT.ID_COTDETALLE 
		WHERE SOL.ID_SOLICITUD = @isIdSolicitud AND DESCOT.INDINSTALACION = 'S'
------------------------------------------------------------------------------------------------------------------------------------------------------------
		--SELECT * FROM #tmpMain

		
		SELECT
			ROW_NUMBER() OVER( ORDER BY main.ID_DETALLE) CONTADOR 
			--NUMSEC AS CONTADOR
			,DESP.NUMSERIE
			,main.RAZONSOCIAL
			,main.NUMORDEN
			,main.NUMCONTRATO
			,main.NROPROCESO
			,main.TIPOPROCESO
			,COTDETDES.NUMFIANZA
			,DESP.FECHAINSTALACION
			,@UsrEjecuta USR_REG
			,GETDATE() FEC_REG
		INTO #tmpDespachoParcial
		FROM [dbo].[#tmpMain] main
		LEFT JOIN [dbo].[TBD_DESPACHO_DIST] DESP ON DESP.ID_COTDETALLE = main.ID_DETALLE AND DESP.ID_DESPACHO = main.ID_DESPACHO
		LEFT JOIN [dbo].[TBM_COTDET_DESPACHO] COTDETDES ON COTDETDES.ID_COTDETALLE = main.ID_DETALLE 
		WHERE COTDETDES.INDINSTALACION = 'S'
		--select * FROM #tmpDespachoParcial

/*Insertamos de forma parcial*/-------------------------------------------------------------------------------------------------------
		;WITH CTE_1 AS (
			SELECT 
				ID,
				MONTOUNICOSTO,
				CANTCOSTO 
			FROM TBD_COTIZACIONCOSTOS 
			WHERE CODCOSTO = 'CXCD0006' 
			AND ID_COTDETALLE IN (SELECT ID_COTDETALLE FROM TBD_DESPACHO_COTIZACION WHERE ID_SOLDESPACHO = @isIdSolDespacho)
		),
		Numeros AS (
			SELECT ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS n
			FROM master.dbo.spt_values
		)
		SELECT 
		*
		INTO #cantidadCostos
		FROM CTE_1 t
		CROSS JOIN Numeros n
		WHERE n.n <=t.CANTCOSTO

		--select * FROM #cantidadCostos
		
		IF NOT EXISTS (select 1 from #cantidadCostos)
		BEGIN
			SET @COD = 1
			SET @MSG = 'No existen preventivos'
			SELECT @COD COD, @MSG MSG
		END
		ELSE
		BEGIN
			SELECT 
				ROW_NUMBER () OVER( ORDER BY CONT.ID) CUENTA
				,NUMSEC
				,ISNULL(CANTPREVENTIVO,0) CANTPREVENTIVO
				,ISNULL(CODCICLOPREVENT,'') CODCICLOPREVENT 
				,SUBSTRING(CODUBIGEODEST, 0,3) CODDEPARTAMENTO 
				,CONCAT(UBI.NOMDEPARTAMENTO, ' / ', UBI.NOMPROVINCIA, ' / ', UBI.NOMDISTRITO) AS DESCUBIGEODEST
				,CONT.MONTOUNICOSTO
				,CODUBIGEODEST CODUBIGEODEST
				,DIRECCION
				,ISNULL(NROPISO,1) NROPISO
			INTO #CostosFinal
			FROM #cantidadCostos CONT
			LEFT JOIN TBD_COTIZACIONCOSTOS COSTOS ON COSTOS.ID = CONT.ID
			LEFT JOIN [dbo].[TBM_UBIGEO] AS UBI WITH(NOLOCK) ON UBI.CODUBIGEO = COSTOS.CODUBIGEODEST

			--select * FROM #CostosFinal

			/*Se arma los datos que se insertarán en la tabla*/---------------------------------------------------------------------------------------------------------
			INSERT INTO [TBM_MANT_PREV](SERIE,NOMEMPRESA,ORDENCOMPRA,NUMCONTRATO,NUMPROCESO,TIPOPROCESO,NUMFIANZA,FECHAINSTALACION,UBIGEODEST,DIRECCION,MIGRADO,USR_REG, FEC_REG)
			SELECT
				NUMSERIE
				,RAZONSOCIAL
				,NUMORDEN
				,NUMCONTRATO
				,NROPROCESO
				,TIPOPROCESO
				,NUMFIANZA
				,FECHAINSTALACION
				,CODUBIGEODEST
				,DIRECCION
				,'N'
				,USR_REG
				,FEC_REG
			FROM #tmpDespachoParcial desp
			LEFT JOIN #CostosFinal costos ON costos.CUENTA = desp.CONTADOR
	
			SELECT
				ID_MANT
				,PARCIAL.NUMSERIE
				,DESP.FECHAINSTALACION
				,costos.CANTPREVENTIVO
				,costos.CODCICLOPREVENT
				,costos.MONTOUNICOSTO
				,DATOS.VALOR1			AS TIPCICLO
				,DATOS.VALOR2			AS CANTIDAD
			INTO #tmpParcial
			FROM [dbo].[TBD_DESPACHO_DIST] DESP WITH(NOLOCK)
			LEFT JOIN [dbo].#tmpDespachoParcial PARCIAL ON DESP.NUMSERIE = PARCIAL.NUMSERIE
			INNER JOIN #CostosFinal costos ON costos.CUENTA = PARCIAL.CONTADOR
			LEFT JOIN [dbo].[TBM_MANT_PREV] MANT ON  PARCIAL.NUMSERIE = MANT.SERIE
			LEFT JOIN [dbo].[TBD_DATOS_GENERALES] AS DATOS WITH(NOLOCK) ON DATOS.DOMINIO = 'CICLOPREV' AND DATOS.PARAMETRO = costos.CODCICLOPREVENT AND DATOS.ESTADO = '1'
	
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

			INSERT INTO [dbo].[TBM_WORKFLOWLOG] (ID_WORKFLOW,COD_ESTADO,CARGO,AREA,AUDIT_REG_USR,AUDIT_REG_FEC)
			SELECT ID_WORKFLOW, @ESTADO,@PERFIL,'', @UsrEjecuta, GETDATE() FROM #tmpIdWorkFlows


			/*Insertamos de forma parcial todos los mantenimientos*/-------------------------------------------------------------------------------------------------------
			;WITH Numeros AS (
				SELECT ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS n
				FROM master.dbo.spt_values
			)	

			INSERT INTO #tmpPreventivos(ID_MANT,FECHAINSTALACION,MONTOUNICOSTO,FECHAMANTENIMIENTO)
			SELECT 
			 ID_MANT
			 ,t.FECHAINSTALACION
			 ,t.MONTOUNICOSTO
			 ,CASE 
				WHEN TIPCICLO='D' THEN DATEADD(DAY,(CANTIDAD * n.n),FECHAINSTALACION)
				WHEN TIPCICLO='M' THEN DATEADD(MONTH,(CANTIDAD * n.n),FECHAINSTALACION)
			  END AS FECHAMANTENIMIENTO
			FROM #tmpParcial t 
			CROSS JOIN Numeros n
			 WHERE n.n <= t.CANTPREVENTIVO

			/*Insertamos a la tabla maestra [TBM_MANT_PREV] realizando una coordinación de todos los datos*/----------------------------------------------------------------
			INSERT INTO [dbo].[TBD_MANT_PREV](ID_MANT,ID_WORKFLOW,FECHAMANTENIMIENTO,MONTOPRESTACCE,ESTADO,USR_REG,FEC_REG)
			SELECT
				t.ID_MANT
				,j.ID_WORKFLOW
				,t.FECHAMANTENIMIENTO
				,t.MONTOUNICOSTO
				,@ESTADO
				,@UsrEjecuta
				,GETDATE()
			FROM #tmpPreventivos t
			INNER JOIN #tmpIdWorkFlows j ON t.ID = j.ID

			SET @COD = 1
			SET @MSG = 'USP ejecutado con éxito'
			SELECT @COD COD, @MSG MSG
		END
	END TRY
	BEGIN CATCH
		SET @COD = 0
		SET @MSG = 'Error en el USP: Linea:'+CAST(ERROR_LINE() AS VARCHAR)+', Mensaje de error:' + CAST(ERROR_MESSAGE() AS VARCHAR)
		SELECT @COD COD, @MSG MSG
	END CATCH
SET NOCOUNT OFF
END
