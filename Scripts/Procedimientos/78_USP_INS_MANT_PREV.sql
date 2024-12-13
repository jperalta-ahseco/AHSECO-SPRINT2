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
		,FECHAINSTALACION DATETIME NULL
		,FECHAMANTENIMIENTO DATETIME NULL
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
		LEFT JOIN [dbo].[TBM_COTDET_DESPACHO] DESCOT WITH(NOLOCK) ON DESCOT.ID_COTDETALLE = COTDET.ID 
		LEFT JOIN [dbo].[TBM_DESPACHO] COTDESP WITH(NOLOCK) ON COTDESP.ID_SOLICITUD = SOL.ID_SOLICITUD AND COTDESP.ID_COTIZACION = COTIZ.ID_COTIZACION
		WHERE SOL.ID_SOLICITUD = @isIdSolicitud AND DESCOT.INDINSTALACION = 'S'
------------------------------------------------------------------------------------------------------------------------------------------------------------
/*Se arma los datos que se insertarán en la tabla*/---------------------------------------------------------------------------------------------------------
		INSERT INTO [TBM_MANT_PREV](SERIE,NOMEMPRESA,ORDENCOMPRA,NUMPROCESO,TIPOPROCESO,NUMFIANZA,FECHAINSTALACION,UBIGEODEST,DIRECCION,USR_REG, FEC_REG)
		SELECT
			DESPACHO.NUMSERIE
			,main.RAZONSOCIAL
			,main.NUMORDEN
			,main.NROPROCESO
			,main.TIPOPROCESO
			,COTDETDES.NUMFIANZA
			,DESPACHO.FECHAINSTALACION
			,COTCOST.CODUBIGEODEST
			,COTCOST.DIRECCION
			,@UsrEjecuta
			,GETDATE()
		FROM #tmpMain main
		LEFT JOIN [dbo].[TBD_COTIZACIONCOSTOS] COTCOST ON COTCOST.ID_COTDETALLE = main.ID_DETALLE
		LEFT JOIN [dbo].[TBD_DESPACHO_DIST] DESPACHO ON DESPACHO.ID_COTDETALLE = COTCOST.ID_COTDETALLE
		LEFT JOIN [dbo].[TBM_COTDET_DESPACHO] COTDETDES ON COTDETDES.ID_COTDETALLE = main.ID_DETALLE 
		WHERE COTDETDES.INDINSTALACION = 'S'


		SELECT
		 ID_MANT
		 ,DESP.FECHAINSTALACION
		 ,COTCOST.CANTPREVENTIVO
		 ,COTCOST.CODCICLOPREVENT
		 ,DATOS.VALOR1			AS TIPCICLO
		 ,DATOS.VALOR2			AS CANTIDAD
		INTO #tmpParcial
		FROM [dbo].[TBD_DESPACHO_DIST] DESP WITH(NOLOCK)
		INNER JOIN #tmpMain MAIN ON 1 = 1
		LEFT JOIN [dbo].[TBM_MANT_PREV] MANT ON DESP.NUMSERIE = MANT.SERIE
		INNER JOIN [dbo].[TBD_COTIZACIONCOSTOS] COTCOST WITH(NOLOCK) ON DESP.ID_COTDETALLE = COTCOST.ID_COTDETALLE AND COTCOST.ID_COTDETALLE = MAIN.ID_DETALLE
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

		INSERT INTO [dbo].[TBM_WORKFLOWLOG] (ID_WORKFLOW,COD_ESTADO,CARGO,AREA,AUDIT_REG_USR,AUDIT_REG_FEC)
		SELECT ID_WORKFLOW, @ESTADO,@PERFIL,'', @UsrEjecuta, GETDATE() FROM #tmpIdWorkFlows


	/*Insertamos de forma parcial todos los mantenimientos*/-------------------------------------------------------------------------------------------------------
		;WITH Numeros AS (
			SELECT ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS n
			FROM master.dbo.spt_values
		)	

		INSERT INTO #tmpPreventivos(ID_MANT,FECHAINSTALACION,FECHAMANTENIMIENTO)
		SELECT 
		 ID_MANT
		 ,t.FECHAINSTALACION
		 ,CASE 
			WHEN TIPCICLO='D' THEN DATEADD(DAY,(CANTIDAD * n.n),FECHAINSTALACION)
			WHEN TIPCICLO='M' THEN DATEADD(MONTH,(CANTIDAD * n.n),FECHAINSTALACION)
		  END AS FECHAMANTENIMIENTO
		FROM #tmpParcial t 
		CROSS JOIN Numeros n
		 WHERE n.n <= t.CANTPREVENTIVO

	/*Insertamos a la tabla maestra [TBM_MANT_PREV] realizando una coordinación de todos los datos*/----------------------------------------------------------------
		INSERT INTO [dbo].[TBD_MANT_PREV](ID_MANT,ID_WORKFLOW,FECHAMANTENIMIENTO,ESTADO,USR_REG,FEC_REG)
		SELECT
			t.ID_MANT
			,j.ID_WORKFLOW
			,t.FECHAMANTENIMIENTO
			,@ESTADO
			,@UsrEjecuta
			,GETDATE()
		FROM #tmpPreventivos t
		INNER JOIN #tmpIdWorkFlows j ON t.ID = j.ID

		SET @COD = 1
		SET @MSG = 'USP ejecutado con éxito'
		SELECT @COD COD, @MSG MSG
	END TRY
	BEGIN CATCH
		SET @COD = 0
		SET @MSG = 'Error en el USP: Linea:'+CAST(ERROR_LINE() AS VARCHAR)+', Mensaje de error:' + CAST(ERROR_MESSAGE() AS VARCHAR)
		SELECT @COD COD, @MSG MSG
	END CATCH
SET NOCOUNT OFF
END
