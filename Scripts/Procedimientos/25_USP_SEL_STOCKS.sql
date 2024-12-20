USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_SEL_STOCKS](

/*=======================================================================================================
	Nombre:				Fecha:			Descripción:
	Gabriel M.Sullca   27.09.24		Realiza la consulta del catálogo de stocks 
	EXEC USP_SEL_STOCKS '','','','','','','',50,1
	EXEC USP_SEL_STOCKS '','','','','','','',0,0
  =======================================================================================================*/
	@CODPRODUCTO VARCHAR(25)= '' ,
	@DESPRODUCTO VARCHAR(60) ='',
	@CODIGOFABRICA VARCHAR (25)='',
	@TIPOMEDIDA VARCHAR(3) = '',
	@CODALMACEN VARCHAR(40)='',
	@CODMARCA VARCHAR(100)='',
	@CODFAMILIA VARCHAR(3)='',
	@NUMPAGINAS INT,
	@PAGINA INT
)AS
BEGIN


	SET NOCOUNT ON;

	DECLARE @INI INT,@FIN INT
	DECLARE @SQL VARCHAR(MAX);

	SELECT @INI= (@NUMPAGINAS*(@PAGINA-1)+1),@FIN=@NUMPAGINAS*@PAGINA

	IF OBJECT_ID('tempdb..#TMP_LISTASTOCKS') IS NOT NULL
		DROP TABLE #TMP_LISTASTOCKS

	CREATE TABLE #TMP_LISTASTOCKS(
		CODIGOPRODUCTO VARCHAR(100),
		NOMPRODUCTO VARCHAR(250),
		UM VARCHAR(5),
		CODFABRICA VARCHAR(35),
		CODALMACEN VARCHAR(4),
		NOMALMACEN VARCHAR(100),
		STOCKDISPONIBLE DECIMAL(9,3),
		[CONTROL] VARCHAR(100),
		LOTESERIE VARCHAR(50),
		STOCKLT DECIMAL(9,3),
		FECVENC VARCHAR(10),
		CODMARCA VARCHAR(50),
		DESMARCA VARCHAR(100),
		CODFAMILIA VARCHAR(2),
		DESFAMILIA VARCHAR(75),
		PRECIOREFERENCIA DECIMAL(18,9),
		MONEDA VARCHAR(20)
	)

SET @SQL='SELECT A.AR_CCODIGO ''CODIGOPRODUCTO'',
						  A.AR_CDESCRI ''NOMPRODUCTO'',
						  A.AR_CUNIDAD ''UM'',
						  ISNULL(A.AR_CCODIG2,'''') ''CODFABRICA'',	
						  B.SK_CALMA ''CODALMACEN'',
						  C.A1_CDESCRI ''NOMALMACEN'',
						  B.SK_NSKDIS ''STOCKDISPONIBLE'',
						  CASE WHEN A.AR_CFSERIE=''S'' THEN ''SERIE'' WHEN A.AR_CFLOTE=''S'' THEN ''LOTE'' ELSE ''---'' END ''CONTROL'',  
						  ISNULL(F.SR_CSERIE,'''') ''LOTESERIE'',
						  ISNULL(F.SR_NSKDIS,0.00) ''STOCKLT'',
						  ISNULL(CONVERT(varchar,F.SR_DFECVEN,103),'''') ''FECVENC'',  
						  A.AR_CMARCA ''CODMARCA'',
						  D.TG_CDESCRI ''DESMARCA'',
						  A.AR_CFAMILI ''CODFAMILIA'',
						  E.TG_CDESCRI ''DESFAMILIA'',
						  AR_NPRECI4 ''PRECIOREFERENCIA'',
						  CASE A.AR_CMONCOM
						  WHEN ''MN'' THEN ''SOLES''
						  WHEN ''US'' THEN ''DOLARES''
						  END MONEDA
						 FROM  [RSFACCAR].[dbo].[AL0007ARTI] A WITH(NOLOCK)
							LEFT JOIN  [RSFACCAR].[dbo].[AL0007STOC] B WITH(NOLOCK) ON A.AR_CCODIGO=B.SK_CCODIGO
							LEFT JOIN  [RSFACCAR].[dbo].[AL0007ALMA] C WITH(NOLOCK) ON B.SK_CALMA=C.A1_CALMA 
							LEFT JOIN  [RSFACCAR].[dbo].[AL0007TABL] D WITH(NOLOCK) ON D.TG_CCOD=''V7'' AND A.AR_CMARCA=D.TG_CCLAVE 
							LEFT JOIN  [RSFACCAR].[dbo].[AL0007TABL] E WITH(NOLOCK) ON E.TG_CCOD=''38'' AND A.AR_CFAMILI=E.TG_CCLAVE 
							LEFT JOIN  [RSFACCAR].[dbo].[AL0007SERI] F WITH(NOLOCK) ON A.AR_CCODIGO=F.SR_CCODIGO AND B.SK_CALMA=F.SR_CALMA AND F.SR_NSKDIS<>0 
							WHERE B.SK_CALMA IN (''0001'',''0015'',''0017'') '

							IF(LEN(@CODPRODUCTO) > 0)
							BEGIN
								SET @SQL=@SQL+'AND A.AR_CCODIGO LIKE ''%'+@CODPRODUCTO +'%'' '
							END
							IF(LEN(@DESPRODUCTO) > 0)
							BEGIN
								SET @SQL=@SQL+'AND REPLACE(A.AR_CDESCRI,'' '','''') LIKE ''%'+RTRIM(REPLACE(@DESPRODUCTO,' ',''))+'%'' '
							END
							IF(LEN(@CODIGOFABRICA)>0)
							BEGIN
									SET @SQL=@SQL+'AND ISNULL(A.AR_CCODIG2,'''') LIKE ''%'+RTRIM(@CODIGOFABRICA)+'%'' '
							END
							IF(@TIPOMEDIDA<> '0' AND LEN(@TIPOMEDIDA)>0)
							BEGIN
									SET @SQL=@SQL+'AND A.AR_CUNIDAD ='''+RTRIM(@TIPOMEDIDA)+''' '
							END
							IF(@CODALMACEN<>'0' AND LEN(@CODALMACEN)>0)
							BEGIN
								SET @SQL=@SQL+'AND B.SK_CALMA ='''+RTRIM(@CODALMACEN)+''' '
							END
							IF(@CODFAMILIA<> '0' AND LEN(@CODFAMILIA)>0)
							BEGIN
								SET @SQL=@SQL+'AND A.AR_CFAMILI ='''+RTRIM(@CODFAMILIA)+''' '
							END
							IF(@CODMARCA<> '0' AND LEN(@CODMARCA)>0)
							BEGIN
								SET @SQL=@SQL+'AND A.AR_CMARCA ='''+RTRIM(@CODMARCA)+''' '
							END
							SET @SQL = REPLACE(@SQL,'''','''''')		
							SET @SQL = 'SELECT * FROM OPENQUERY([AH-SRV4],'''+@SQL+''')'

							--PRINT @SQL
							INSERT INTO #TMP_LISTASTOCKS
							EXEC(@SQL)

							DECLARE @TOTAL INT

							SELECT @TOTAL=COUNT(1) FROM #TMP_LISTASTOCKS

							IF(@TOTAL > 500)
							BEGIN
							IF(@NUMPAGINAS > 0)
								BEGIN
								
								SELECT CODIGOPRODUCTO,
												NOMPRODUCTO,
												UM,
												CODFABRICA,
												CODALMACEN,
												NOMALMACEN,
												STOCKDISPONIBLE,
												[CONTROL],
												LOTESERIE,
												STOCKLT,
												FECVENC,
												CODMARCA,
												DESMARCA,
												CODFAMILIA,
												DESFAMILIA,
												PRECIOREFERENCIA,
												MONEDA
												FROM #TMP_LISTASTOCKS
												ORDER BY  CODIGOPRODUCTO,CODALMACEN,LOTESERIE,FECVENC 
												OFFSET @INI ROWS FETCH NEXT @NUMPAGINAS ROWS ONLY;
								END
								ELSE
								BEGIN
									SELECT CODIGOPRODUCTO,
												NOMPRODUCTO,
												UM,
												CODFABRICA,
												CODALMACEN,
												NOMALMACEN,
												STOCKDISPONIBLE,
												[CONTROL],
												LOTESERIE,
												STOCKLT,
												FECVENC,
												CODMARCA,
												DESMARCA,
												CODFAMILIA,
												DESFAMILIA ,
												PRECIOREFERENCIA,
												MONEDA
												FROM #TMP_LISTASTOCKS
												ORDER BY  CODIGOPRODUCTO,CODALMACEN,LOTESERIE,FECVENC;
								END
							END
							ELSE
							BEGIN
								SELECT CODIGOPRODUCTO,
												NOMPRODUCTO,
												UM,
												CODFABRICA,
												CODALMACEN,
												NOMALMACEN,
												STOCKDISPONIBLE,
												[CONTROL],
												LOTESERIE,
												STOCKLT,
												FECVENC,
												CODMARCA,
												DESMARCA,
												CODFAMILIA,
												DESFAMILIA,
												PRECIOREFERENCIA,
												MONEDA
												FROM #TMP_LISTASTOCKS
												ORDER BY  CODIGOPRODUCTO,CODALMACEN,LOTESERIE,FECVENC;
							END
		SET NOCOUNT OFF;
END


