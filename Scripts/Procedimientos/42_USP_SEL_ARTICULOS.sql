USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE DBO.USP_SEL_ARTICULOS
AS
BEGIN

	DECLARE @pLinkServer VARCHAR(100) = 'AH-SRV4';
	DECLARE @SQL VARCHAR(MAX);

	SET @SQL = '
	SELECT
	AR_CCODIGO,
	AR_CDESCRI,
	AR_CCODIG2,
	AR_CFSERIE,
	AR_CFLOTE,
	AR_CMARCA,
	AR_CFAMILI,
	AR_CLINEA
	FROM [RSFACCAR].[dbo].[AL0007ARTI];
	';

	IF EXISTS(SELECT 1 FROM SYS.SERVERS WHERE UPPER(NAME) LIKE '%'+@pLinkServer+'%')
	BEGIN
		SET @SQL = REPLACE(@SQL,'''','''''');
		SET @SQL = 'SELECT * FROM OPENQUERY(['+@pLinkServer+'],'''+@SQL+''')';
	END;

	EXEC(@SQL);

END;
