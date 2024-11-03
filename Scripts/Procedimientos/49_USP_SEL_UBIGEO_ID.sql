USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_SEL_UBIGEO_ID]
(
    @isUbigeoId VARCHAR(6)=NULL
)
AS
/*=======================================================================================================
	Nombre:				Fecha:			Descripción:
	Gabriel Marquez    26.08.24		Realiza el select del Ubigeo.
  =======================================================================================================*/
BEGIN 
    SET NOCOUNT ON;


    DECLARE @sql NVARCHAR(MAX);


    SET @sql = N'SELECT 
                    [CODUBIGEO],	
                    [NOMDEPARTAMENTO],
					SUBSTRING([CODUBIGEO],0,3) AS [CODDEPARTAMENTO],
                    [NOMPROVINCIA],
					SUBSTRING([CODUBIGEO],0,5) AS [CODPROVINCIA],
                    [NOMDISTRITO],
					[NOMCAPITALLEGAL],
					[CODREGION],
					[NOMREGION]
                 FROM 
                    [DBO].[TBM_UBIGEO]'
				
	IF ISNULL(@isUbigeoId,'') <> ''
	BEGIN
		IF LEN(TRIM(@isUbigeoId)) = 6 BEGIN
			SET @sql+= 'WHERE [CODUBIGEO] = ''' + TRIM(@isUbigeoId) + ''''
		END
		ELSE BEGIN
			SET @sql+= 'WHERE [CODUBIGEO] LIKE ''%' + TRIM(@isUbigeoId) + '%'''
		END
	END

    -- Execute the SQL query
    EXEC sp_executesql @sql, N'@isUbigeoId VARCHAR(6)', @isUbigeoId;
END