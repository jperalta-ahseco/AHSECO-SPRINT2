USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_SEL_DESPACHO] 
(
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Jose Peralta		14.11.24		Realiza consulta de datos del despacho.
	EXEC [USP_SEL_DESPACHO]  20
=======================================================================================================*/
	@isIdSolicitud BIGINT
)
AS
BEGIN

SET NOCOUNT ON;

	DECLARE @CONT_TOTAL INT, @CONT_CS INT, @CONT_SS INT

	IF OBJECT_ID('tempdb..#TMP_DESPACHO') IS NOT NULL
		DROP TABLE #TMP_DESPACHO

	CREATE TABLE #TMP_DESPACHO(
		IDNUM INT IDENTITY(1,1),
		ID_SOLICITUD BIGINT,
		ID INT ,
		STOCK CHAR(1),
		NUMORDEN VARCHAR(50),
		FECHAORDEN VARCHAR(10),
		FECHAMAX VARCHAR(10),
		ENVIOGP BIT,
		ENVIOBO BIT,
		GESLOG BIT
	);

	INSERT INTO #TMP_DESPACHO
    		SELECT ID_SOLICITUD,ID,STOCK,NUMORDEN,
			ISNULL(CONVERT(VARCHAR,FECHAORDEN,103),'') FECHAORDEN,
			ISNULL(CONVERT(VARCHAR,FECHAMAX,103),'') FECHAMAX,
			ISNULL(ENVIOGP,0) ENVIOGP,
			ISNULL(ENVIOBO,0) ENVIOBO,
			ISNULL(GESLOG,0) GESLOG
						  FROM TBM_DESPACHO WHERE ID_SOLICITUD = @isIdSolicitud

	
	 SELECT @CONT_TOTAL = COUNT(1) FROM TBM_DESPACHO WITH(NOLOCK) WHERE ID_SOLICITUD = @isIdSolicitud;
	 SELECT @CONT_CS = COUNT(1) FROM TBM_DESPACHO WITH(NOLOCK) WHERE ID_SOLICITUD = @isIdSolicitud AND STOCK='S';
	 SELECT @CONT_SS = COUNT(1) FROM TBM_DESPACHO WITH(NOLOCK) WHERE ID_SOLICITUD = @isIdSolicitud AND STOCK = 'N';

	 IF(@CONT_TOTAL >1) 
	 BEGIN

		WITH CON_STOCK AS (
		SELECT ID_SOLICITUD,  ID,NUMORDEN,FECHAORDEN,FECHAMAX,ENVIOGP,ENVIOBO,GESLOG,
		COUNT(1) CONTADOR 
		FROM #TMP_DESPACHO WHERE STOCK='S'
		GROUP BY ID_SOLICITUD,ID,NUMORDEN,FECHAORDEN,FECHAMAX,ENVIOGP,ENVIOBO,GESLOG
		),
		SIN_STOCK AS (
				SELECT  ID_SOLICITUD,ID,NUMORDEN,FECHAORDEN,FECHAMAX,ENVIOGP,ENVIOBO,GESLOG,
				COUNT(1) CONTADOR 
				FROM #TMP_DESPACHO WHERE STOCK='N'
				GROUP BY ID_SOLICITUD,ID,NUMORDEN,FECHAORDEN,FECHAMAX,ENVIOGP,ENVIOBO,GESLOG
		),
		CONTAR_CS AS (
		SELECT B.ID,COUNT(1) CONTADOR FROM TBD_DESPACHO_DIST  A
		INNER JOIN CON_STOCK  B ON A.ID_DESPACHO=B.ID
		GROUP BY B.ID
		),
		CONTAR_SS AS (
		SELECT B.ID,COUNT(1) CONTADOR FROM TBD_DESPACHO_DIST  A
		INNER JOIN SIN_STOCK  B ON A.ID_DESPACHO=B.ID
		GROUP BY B.ID
		),
		SERIES_CS AS(
			SELECT B.ID,COUNT(1) CONTADOR FROM TBD_DESPACHO_DIST A 
			INNER JOIN CON_STOCK B ON A.ID_DESPACHO=B.ID
			WHERE ISNULL(A.NUMSERIE,'') <> '' 
			GROUP BY B.ID
		),
		SERIES_SS AS(
			SELECT B.ID,COUNT(1) CONTADOR FROM TBD_DESPACHO_DIST A 
			INNER JOIN SIN_STOCK B ON A.ID_DESPACHO=B.ID
			WHERE ISNULL(A.NUMSERIE,'') <> '' 
			GROUP BY B.ID
		)
		SELECT ISNULL(A.ID_SOLICITUD,B.ID_SOLICITUD) ID_SOLICITUD, 
		ISNULL(A.NUMORDEN,B.NUMORDEN) NUMORDEN,
		ISNULL(A.FECHAORDEN,B.FECHAORDEN) FECHAORDEN,
		ISNULL(A.FECHAMAX,B.FECHAMAX) FECHAMAX,
		ISNULL(A.CONTADOR,0) CONT_CS,
		ISNULL(B.CONTADOR,0) CONT_SS,
		ISNULL(C.CONTADOR,0) NUM_CS,
		ISNULL(D.CONTADOR,0) NUM_SS,
		CAST(ISNULL(A.ENVIOGP,0) AS INT) ENVIOGP_CS,
		CAST(ISNULL(B.ENVIOGP,0)AS INT) ENVIOGP_SS,
		CAST(ISNULL(B.ENVIOBO,0) AS INT) ENVIOBO_SS,
		CAST(ISNULL(A.GESLOG,0)AS INT) GESLOG_CS,
		CAST(ISNULL(B.GESLOG,0) AS INT) GESLOG_SS,
		ISNULL(E.CONTADOR,0) SERIE_CS,
		ISNULL(F.CONTADOR,0) SERIE_SS
		FROM  CON_STOCK A 
		LEFT JOIN SIN_STOCK B ON A.ID_SOLICITUD=B.ID_SOLICITUD
		LEFT JOIN CONTAR_CS C ON A.ID=C.ID
		LEFT JOIN CONTAR_SS D ON A.ID=D.ID
		LEFT JOIN SERIES_CS E ON A.ID=E.ID
		LEFT JOIN SERIES_SS F ON A.ID=F.ID;

	 END
	 ELSE
	 BEGIN
			IF(@CONT_CS > 0)
			BEGIN
							WITH CON_STOCK AS (
				SELECT ID_SOLICITUD,  ID,NUMORDEN,FECHAORDEN,FECHAMAX,ENVIOGP,ENVIOBO,GESLOG,
				COUNT(1) CONTADOR 
				FROM #TMP_DESPACHO WHERE STOCK='S'
				GROUP BY ID_SOLICITUD,ID,NUMORDEN,FECHAORDEN,FECHAMAX,ENVIOGP,ENVIOBO,GESLOG
				),
				SIN_STOCK AS (
						SELECT  ID_SOLICITUD,ID,NUMORDEN,FECHAORDEN,FECHAMAX,ENVIOGP,ENVIOBO,GESLOG,
						COUNT(1) CONTADOR 
						FROM #TMP_DESPACHO WHERE STOCK='N'
						GROUP BY ID_SOLICITUD,ID,NUMORDEN,FECHAORDEN,FECHAMAX,ENVIOGP,ENVIOBO,GESLOG
				),
				CONTAR_CS AS (
				SELECT B.ID,COUNT(1) CONTADOR FROM TBD_DESPACHO_DIST  A
				INNER JOIN CON_STOCK  B ON A.ID_DESPACHO=B.ID
				GROUP BY B.ID
				),
				CONTAR_SS AS (
				SELECT B.ID,COUNT(1) CONTADOR FROM TBD_DESPACHO_DIST  A
				INNER JOIN SIN_STOCK  B ON A.ID_DESPACHO=B.ID
				GROUP BY B.ID
				),
				SERIES_CS AS(
					SELECT B.ID,COUNT(1) CONTADOR FROM TBD_DESPACHO_DIST A 
					INNER JOIN CON_STOCK B ON A.ID_DESPACHO=B.ID
					WHERE ISNULL(A.NUMSERIE,'') <> '' 
					GROUP BY B.ID
				),
				SERIES_SS AS(
					SELECT B.ID,COUNT(1) CONTADOR FROM TBD_DESPACHO_DIST A 
					INNER JOIN SIN_STOCK B ON A.ID_DESPACHO=B.ID
					WHERE ISNULL(A.NUMSERIE,'') <> '' 
					GROUP BY B.ID
				)
				SELECT ISNULL(A.ID_SOLICITUD,B.ID_SOLICITUD) ID_SOLICITUD, 
				ISNULL(A.NUMORDEN,B.NUMORDEN) NUMORDEN,
				ISNULL(A.FECHAORDEN,B.FECHAORDEN) FECHAORDEN,
				ISNULL(A.FECHAMAX,B.FECHAMAX) FECHAMAX,
				ISNULL(A.CONTADOR,0) CONT_CS,
				ISNULL(B.CONTADOR,0) CONT_SS,
				ISNULL(C.CONTADOR,0) NUM_CS,
				ISNULL(D.CONTADOR,0) NUM_SS,
				CAST(ISNULL(A.ENVIOGP,0) AS INT) ENVIOGP_CS,
				CAST(ISNULL(B.ENVIOGP,0)AS INT) ENVIOGP_SS,
				CAST(ISNULL(B.ENVIOBO,0) AS INT) ENVIOBO_SS,
				CAST(ISNULL(A.GESLOG,0)AS INT) GESLOG_CS,
				CAST(ISNULL(B.GESLOG,0) AS INT) GESLOG_SS,
				ISNULL(E.CONTADOR,0) SERIE_CS,
				ISNULL(F.CONTADOR,0) SERIE_SS
				FROM  CON_STOCK A 
				LEFT JOIN SIN_STOCK B ON A.ID_SOLICITUD=B.ID_SOLICITUD
				LEFT JOIN CONTAR_CS C ON A.ID=C.ID
				LEFT JOIN CONTAR_SS D ON A.ID=D.ID
				LEFT JOIN SERIES_CS E ON A.ID=E.ID
				LEFT JOIN SERIES_SS F ON A.ID=F.ID;
			END

			IF(@CONT_SS > 0)
			BEGIN
				
					WITH CON_STOCK AS (
				SELECT ID_SOLICITUD,  ID,NUMORDEN,FECHAORDEN,FECHAMAX,ENVIOGP,ENVIOBO,GESLOG,
				COUNT(1) CONTADOR 
				FROM #TMP_DESPACHO WHERE STOCK='S'
				GROUP BY ID_SOLICITUD,ID,NUMORDEN,FECHAORDEN,FECHAMAX,ENVIOGP,ENVIOBO,GESLOG
				),
				SIN_STOCK AS (
						SELECT  ID_SOLICITUD,ID,NUMORDEN,FECHAORDEN,FECHAMAX,ENVIOGP,ENVIOBO,GESLOG,
						COUNT(1) CONTADOR 
						FROM #TMP_DESPACHO WHERE STOCK='N'
						GROUP BY ID_SOLICITUD,ID,NUMORDEN,FECHAORDEN,FECHAMAX,ENVIOGP,ENVIOBO,GESLOG
				),
				CONTAR_CS AS (
				SELECT B.ID,COUNT(1) CONTADOR FROM TBD_DESPACHO_DIST  A
				INNER JOIN CON_STOCK  B ON A.ID_DESPACHO=B.ID
				GROUP BY B.ID
				),
				CONTAR_SS AS (
				SELECT B.ID,COUNT(1) CONTADOR FROM TBD_DESPACHO_DIST  A
				INNER JOIN SIN_STOCK  B ON A.ID_DESPACHO=B.ID
				GROUP BY B.ID
				),
				SERIES_CS AS(
					SELECT B.ID,COUNT(1) CONTADOR FROM TBD_DESPACHO_DIST A 
					INNER JOIN CON_STOCK B ON A.ID_DESPACHO=B.ID
					WHERE ISNULL(A.NUMSERIE,'') <> '' 
					GROUP BY B.ID
				),
				SERIES_SS AS(
					SELECT B.ID,COUNT(1) CONTADOR FROM TBD_DESPACHO_DIST A 
					INNER JOIN SIN_STOCK B ON A.ID_DESPACHO=B.ID
					WHERE ISNULL(A.NUMSERIE,'') <> '' 
					GROUP BY B.ID
				)
				SELECT ISNULL(A.ID_SOLICITUD,B.ID_SOLICITUD) ID_SOLICITUD, 
				ISNULL(A.NUMORDEN,B.NUMORDEN) NUMORDEN,
				ISNULL(A.FECHAORDEN,B.FECHAORDEN) FECHAORDEN,
				ISNULL(A.FECHAMAX,B.FECHAMAX) FECHAMAX,
				ISNULL(B.CONTADOR,0) CONT_CS,
				ISNULL(A.CONTADOR,0) CONT_SS,
				ISNULL(C.CONTADOR,0) NUM_CS,
				ISNULL(D.CONTADOR,0) NUM_SS,
				CAST(ISNULL(B.ENVIOGP,0) AS INT) ENVIOGP_CS,
				CAST(ISNULL(A.ENVIOGP,0)AS INT) ENVIOGP_SS,
				CAST(ISNULL(A.ENVIOBO,0) AS INT) ENVIOBO_SS,
				CAST(ISNULL(B.GESLOG,0)AS INT) GESLOG_CS,
				CAST(ISNULL(A.GESLOG,0) AS INT) GESLOG_SS,
				ISNULL(E.CONTADOR,0) SERIE_CS,
				ISNULL(F.CONTADOR,0) SERIE_SS
				FROM  SIN_STOCK A 
				LEFT JOIN CON_STOCK B ON A.ID_SOLICITUD=B.ID_SOLICITUD
				LEFT JOIN CONTAR_CS C ON A.ID=C.ID
				LEFT JOIN CONTAR_SS D ON A.ID=D.ID
				LEFT JOIN SERIES_CS E ON A.ID=E.ID
				LEFT JOIN SERIES_SS F ON A.ID=F.ID;

			END

	 END


	


	SELECT  ID,ID_SOLICITUD,STOCK,NUMORDEN,
	CONVERT(VARCHAR,FECHAORDEN,103) FECHAORDEN,
	CONVERT(VARCHAR,FECHAMAX,103) FECHAMAX,
	ISNULL(CONVERT(VARCHAR,FECHAENTREGA,103),'') FECHAENTREGA,
	ISNULL(NUMFACTURA,'') NUMFACTURA,
	ISNULL(NUMGUIAREM,'') NUMGUIAREM,
	ISNULL(NUMPEDIDO,'') NUMPEDIDO,
	ISNULL(CONVERT(VARCHAR,FECHAINGRESO,103),'') FECHAINGRESO,
	ISNULL(ESTAPROB,'') ESTAPROB,
	ISNULL(CONVERT(VARCHAR,FECAPROB,103),'') FECAPROB,
	ISNULL(OBSERVACION,'') OBSERVACION,
	USR_REG,
	FEC_REG,
	USR_MOD,
	FEC_MOD
	FROM TBM_DESPACHO A WITH(NOLOCK) WHERE ID_SOLICITUD= @isIdSolicitud AND STOCK='S'

	SELECT ROW_NUMBER() OVER (ORDER BY A.ID) AS ROWNUM,
	C.CODITEM CODEQUIPO,
	C.DESCRIPCION,
	E.TG_CDESCRI MARCA,
	ISNULL(A.NUMSERIE,'') NUMSERIE ,
	A.ID
	FROM TBD_DESPACHO_DIST A WITH(NOLOCK) 
	INNER JOIN TBD_COTIZACIONCOSTOS B ON A.ID_COTCOSTOS=B.ID
	INNER JOIN TBD_COTIZACIONVENTA C ON B.ID_COTDETALLE=C.ID
	INNER JOIN [AH-SRV4].[RSFACCAR].[dbo].[AL0007ARTI] D WITH(NOLOCK) ON C.CODITEM=D.AR_CCODIGO
	LEFT JOIN  [AH-SRV4].[RSFACCAR].[dbo].[AL0007TABL] E WITH(NOLOCK) ON E.TG_CCOD='V7' AND D.AR_CMARCA=E.TG_CCLAVE 
	WHERE 
	A.ID_DESPACHO IN (SELECT ID FROM TBM_DESPACHO WHERE ID_SOLICITUD=@isIdSolicitud AND STOCK='S' )


	SELECT  ID,ID_SOLICITUD,STOCK,NUMORDEN,
	CONVERT(VARCHAR,FECHAORDEN,03) FECHAORDEN,
	CONVERT(VARCHAR,FECHAMAX,103) FECHAMAX,
	ISNULL(CONVERT(VARCHAR,FECHAENTREGA,103),'') FECHAENTREGA,
	ISNULL(NUMFACTURA,'') NUMFACTURA,
	ISNULL(NUMGUIAREM,'') NUMGUIAREM,
	ISNULL(NUMPEDIDO,'') NUMPEDIDO,
	ISNULL(CONVERT(VARCHAR,FECHAINGRESO,103),'') FECHAINGRESO,
	ISNULL(ESTAPROB,'') ESTAPROB,
	ISNULL(CONVERT(VARCHAR,FECAPROB,103),'') FECAPROB,
	ISNULL(OBSERVACION,'') OBSERVACION,
	USR_REG,
	FEC_REG,
	USR_MOD,
	FEC_MOD
	FROM TBM_DESPACHO A WITH(NOLOCK) WHERE ID_SOLICITUD= @isIdSolicitud AND STOCK='N'

	SELECT ROW_NUMBER() OVER (ORDER BY A.ID) AS ROWNUM,
	C.CODITEM CODEQUIPO,
	C.DESCRIPCION,
	E.TG_CDESCRI MARCA,
	ISNULL(A.NUMSERIE,'') NUMSERIE,
	A.ID
	FROM TBD_DESPACHO_DIST A WITH(NOLOCK) 
	INNER JOIN TBD_COTIZACIONCOSTOS B ON A.ID_COTCOSTOS=B.ID
	INNER JOIN TBD_COTIZACIONVENTA C ON B.ID_COTDETALLE=C.ID
	INNER JOIN [AH-SRV4].[RSFACCAR].[dbo].[AL0007ARTI] D WITH(NOLOCK) ON C.CODITEM=D.AR_CCODIGO
	LEFT JOIN  [AH-SRV4].[RSFACCAR].[dbo].[AL0007TABL] E WITH(NOLOCK) ON E.TG_CCOD='V7' AND D.AR_CMARCA=E.TG_CCLAVE 
	WHERE 
	A.ID_DESPACHO IN (SELECT ID FROM TBM_DESPACHO WHERE ID_SOLICITUD=@isIdSolicitud AND STOCK='N' )

	SET NOCOUNT OFF;

END