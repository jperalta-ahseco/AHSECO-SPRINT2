USE [DB_AHSECO]
GO

CREATE PROCEDURE [dbo].[USP_SEL_ZONA] 
/*=======================================================================================================
	Nombre:				Fecha:			Descripción:
	Diego A. Bazalar    22.08.24		Realiza el select de la tabla Zonas.
	EXEC [USP_SEL_ZONA] @isEstado = null
  =======================================================================================================*/
@isDescripcion VARCHAR(100) = NULL,
@isEstado BIT = NULL, 
@isID INT = 0

AS
BEGIN
	DECLARE @sql NVARCHAR(MAX)

	SET @sql = '	SELECT
						[ID],
						TRIM(ISNULL([DESZONA],''No definido'')) AS DESZONA,
						[ESTADO],
						TRIM(ISNULL([AUDIT_REG_USR],''No especificado'')) AS AUDIT_REG_USR,
						CONVERT(DATETIME,[AUDIT_REG_FEC],102) AS AUDIT_REG_FEC,
						CONVERT(DATETIME,[AUDIT_MOD_FEC] ,102) AS AUDIT_MOD_FEC
					FROM
					[dbo].[TBM_ZONAS]
					WHERE 1 = 1
					'
	IF @isDescripcion IS NOT NULL
		SET @sql = @sql+'AND [DESZONA] LIKE '''+'%'+CAST(@isDescripcion AS VARCHAR(100))+'%'''
	IF @isEstado IS NOT NULL
		SET @sql = @sql + 'AND [ESTADO] = '''+CAST(@isEstado AS VARCHAR(2))+''' '
	IF @isID != 0
		SET @sql = @sql+ 'AND [ID] = '''+CAST(@isID AS VARCHAR(10))+''' '

	EXEC sp_executesql @sql
END 