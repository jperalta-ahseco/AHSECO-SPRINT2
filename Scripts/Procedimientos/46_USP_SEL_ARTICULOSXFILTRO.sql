USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_SEL_ARTICULOSXFILTRO](
    @pAR_CCODIGO VARCHAR(100),
    @pAR_CDESCRI VARCHAR(100),
    @pAR_CUNIDAD VARCHAR(100),
    @pAR_CFAMILI VARCHAR(100),
    @pAR_CLINEA VARCHAR(100),
	@pAR_CMARCA VARCHAR(100),
	@pSK_CALMA VARCHAR(100),
	@pCANTREG INT
)
/*==========================================================================================
	Nombre:						Fecha:			Descripci�n:
	Samuel G�mez				24.10.2024		Consulta de Articulos.
  ==========================================================================================*/
AS
BEGIN
	
	DECLARE @pLinkServer VARCHAR(100) = 'AH-SRV4';
	DECLARE @SQL VARCHAR(MAX);
	DECLARE @TOP VARCHAR(100);

	IF @pCANTREG IS NOT NULL BEGIN
		SET @TOP = 'TOP '+CONVERT(VARCHAR(30),@pCANTREG);
	END;

	SET @SQL = '
	SELECT '+ISNULL(@TOP,'')+'
	A.AR_CCODIGO AS COD_ARTICULO,
	A.AR_CDESCRI AS DESC_ARTICULO,
	UM.TG_CCLAVE AS COD_UNIDAD,
	UM.TG_CDESCRI AS DESC_UNIDAD,
	FA.TG_CCLAVE AS COD_FAMILIA,
	FA.TG_CDESCRI AS DESC_FAMILIA,
	LI.LI_CCODLIN AS COD_LINEA,
	LI.LI_CDESLIN AS DESC_LINEA,
	MA.TG_CCLAVE AS COD_MARCA,
	MA.TG_CDESCRI AS DESC_MARCA,
	ST.SK_NSKDIS AS STOCK_DISPO,
	A.AR_NPRECI4 AS PRECIO_REF,
	AL.A1_CALMA AS COD_ALMACEN,
	AL.A1_CDESCRI AS DESC_ALMACEN
	FROM RSFACCAR.dbo.AL0007ARTI A
	INNER JOIN RSFACCAR.dbo.AL0007TABL UM ON UM.TG_CCOD = ''05'' AND A.AR_CUNIDAD = UM.TG_CCLAVE
	INNER JOIN RSFACCAR.dbo.AL0007TABL FA ON FA.TG_CCOD = ''38'' AND A.AR_CFAMILI = FA.TG_CCLAVE
	INNER JOIN RSFACCAR.dbo.FT0007LINE LI ON A.AR_CLINEA = LI.LI_CCODLIN
	INNER JOIN RSFACCAR.dbo.AL0007TABL MA ON MA.TG_CCOD = ''V7'' AND A.AR_CMARCA = MA.TG_CCLAVE
	INNER JOIN RSFACCAR.dbo.AL0007STOC ST ON ST.SK_CALMA IN (''0001'',''0015'',''0017'') AND A.AR_CCODIGO = ST.SK_CCODIGO
	INNER JOIN RSFACCAR.dbo.AL0007ALMA AL ON ST.SK_CALMA = AL.A1_CALMA
	WHERE 1 = 1
	';

	IF ISNULL(@pAR_CCODIGO,'') <> '' BEGIN
		IF CHARINDEX(';',@pAR_CCODIGO) > 0 BEGIN
			SET @SQL = @SQL + ' AND (''' + @pAR_CCODIGO + ''' LIKE ''%;''+RTRIM(A.AR_CCODIGO)+'';%'' ';
			SET @SQL = @SQL + ' OR ''' + @pAR_CCODIGO + ''' LIKE RTRIM(A.AR_CCODIGO)+'';%'' ';
			SET @SQL = @SQL + ' OR ''' + @pAR_CCODIGO + ''' LIKE ''%;''+RTRIM(A.AR_CCODIGO)) ';
		END
		ELSE BEGIN
			SET @SQL = @SQL + ' AND RTRIM(A.AR_CCODIGO) = '''+RTRIM(@pAR_CCODIGO)+''' ';
		END;
	END;
	
	IF ISNULL(@pAR_CDESCRI,'') <> '' BEGIN
		SET @SQL = @SQL + ' AND A.AR_CDESCRI LIKE ''%'+@pAR_CDESCRI+'%'' ';
	END;
	
	IF ISNULL(@pAR_CUNIDAD,'') <> '' BEGIN
		IF CHARINDEX(';',@pAR_CUNIDAD) > 0 BEGIN
			SET @SQL = @SQL + ' AND (''' + @pAR_CUNIDAD + ''' LIKE ''%;''+RTRIM(A.AR_CUNIDAD)+'';%'' ';
			SET @SQL = @SQL + ' OR ''' + @pAR_CUNIDAD + ''' LIKE RTRIM(A.AR_CUNIDAD)+'';%'' ';
			SET @SQL = @SQL + ' OR ''' + @pAR_CUNIDAD + ''' LIKE ''%;''+RTRIM(A.AR_CUNIDAD)) ';
		END
		ELSE BEGIN
			SET @SQL = @SQL + ' AND RTRIM(A.AR_CUNIDAD) = '''+RTRIM(@pAR_CUNIDAD)+''' ';
		END;
	END;
	
	IF ISNULL(@pAR_CFAMILI,'') <> '' BEGIN
		IF CHARINDEX(';',@pAR_CFAMILI) > 0 BEGIN
			SET @SQL = @SQL + ' AND (''' + @pAR_CFAMILI + ''' LIKE ''%;''+RTRIM(A.AR_CFAMILI)+'';%'' ';
			SET @SQL = @SQL + ' OR ''' + @pAR_CFAMILI + ''' LIKE RTRIM(A.AR_CFAMILI)+'';%'' ';
			SET @SQL = @SQL + ' OR ''' + @pAR_CFAMILI + ''' LIKE ''%;''+RTRIM(A.AR_CFAMILI)) ';
		END
		ELSE BEGIN
			SET @SQL = @SQL + ' AND RTRIM(A.AR_CFAMILI) = '''+RTRIM(@pAR_CFAMILI)+''' ';
		END;
	END;
	
	IF ISNULL(@pAR_CLINEA,'') <> '' BEGIN
		IF CHARINDEX(';',@pAR_CLINEA) > 0 BEGIN
			SET @SQL = @SQL + ' AND (''' + @pAR_CLINEA + ''' LIKE ''%;''+RTRIM(A.AR_CLINEA)+'';%'' ';
			SET @SQL = @SQL + ' OR ''' + @pAR_CLINEA + ''' LIKE RTRIM(A.AR_CLINEA)+'';%'' ';
			SET @SQL = @SQL + ' OR ''' + @pAR_CLINEA + ''' LIKE ''%;''+RTRIM(A.AR_CLINEA)) ';
		END
		ELSE BEGIN
			SET @SQL = @SQL + ' AND RTRIM(A.AR_CLINEA) = '''+RTRIM(@pAR_CLINEA)+''' ';
		END;
	END;
	
	IF ISNULL(@pAR_CMARCA,'') <> '' BEGIN
		IF CHARINDEX(';',@pAR_CMARCA) > 0 BEGIN
			SET @SQL = @SQL + ' AND (''' + @pAR_CMARCA + ''' LIKE ''%;''+RTRIM(A.AR_CMARCA)+'';%'' ';
			SET @SQL = @SQL + ' OR ''' + @pAR_CMARCA + ''' LIKE RTRIM(A.AR_CMARCA)+'';%'' ';
			SET @SQL = @SQL + ' OR ''' + @pAR_CMARCA + ''' LIKE ''%;''+RTRIM(A.AR_CMARCA)) ';
		END
		ELSE BEGIN
			SET @SQL = @SQL + ' AND RTRIM(A.AR_CMARCA) = '''+RTRIM(@pAR_CMARCA)+''' ';
		END;
	END;
	
	IF ISNULL(@pSK_CALMA,'') <> '' BEGIN
		IF CHARINDEX(';',@pSK_CALMA) > 0 BEGIN
			SET @SQL = @SQL + ' AND (''' + @pSK_CALMA + ''' LIKE ''%;''+RTRIM(ST.SK_CALMA)+'';%'' ';
			SET @SQL = @SQL + ' OR ''' + @pSK_CALMA + ''' LIKE RTRIM(ST.SK_CALMA)+'';%'' ';
			SET @SQL = @SQL + ' OR ''' + @pSK_CALMA + ''' LIKE ''%;''+RTRIM(ST.SK_CALMA)) ';
		END
		ELSE BEGIN
			SET @SQL = @SQL + ' AND RTRIM(ST.SK_CALMA) = '''+RTRIM(@pSK_CALMA)+''' ';
		END;
	END;
	
	IF EXISTS(SELECT 1 FROM SYS.SERVERS WHERE UPPER(NAME) LIKE '%'+@pLinkServer+'%')
	BEGIN
		SET @SQL = REPLACE(@SQL,'''','''''');
		SET @SQL = 'SELECT * FROM OPENQUERY(['+@pLinkServer+'],'''+@SQL+''')';
	END;

	EXEC(@SQL);

END