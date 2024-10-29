USE [DB_AHSECO]
GO

CREATE PROCEDURE [dbo].[USP_SEL_TBD_SERVICIO](
/*============================================================================================
	Nombre:					Fecha:			Descripción
	Diego A.Bazalar			17.10.24		Lista los registros de la tabla TBD_SERVICIOS según @isIdServicio
  ============================================================================================*/
  @isIdServicio INT
)AS
BEGIN
	DECLARE @SQL NVARCHAR(MAX)
	SET  @SQL = '
		SELECT 
			ID
			,ID_SERVICIO
			,DESMANTENIMIENTO
			,ELIMINAR
			,USR_REG
			,FEC_REG
			,USR_MOD
			,FEC_MOD
		FROM TBD_SERVICIOS
		WHERE ID_SERVICIO = '+ CAST(@isIdServicio AS VARCHAR(50))+'
		AND ELIMINAR = 0
		'
	--PRINT @SQL
	EXEC sp_executesql @SQL
END
