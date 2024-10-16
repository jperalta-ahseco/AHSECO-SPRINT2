USE [DB_AHSECO]
GO

CREATE PROCEDURE [dbo].[USP_SEL_OBSERVACIONES] 
(
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		03.10.24		Realiza el select de la tabla TBM_OBSERVACIONES con parametros de búsqueda.
	EXEC [USP_SEL_OBSERVACIONES] 18
  =======================================================================================================*/
	@isIdWorkFlow BIGINT
)
AS
BEGIN
	DECLARE @sql NVARCHAR(MAX)

	SET @sql = '
				SELECT
					ID_OBSERVACION
					,ID_WORKFLOW
					,ESTADO_INSTANCIA
					,OBSERVACION
					,NOMBRE_USUARIO
					,PERFIL_USUARIO
					,USR_REG
					,CONVERT(VARCHAR(10),FEC_REG,103) AS FEC_REG
				FROM [dbo].[TBM_OBSERVACIONES] AS OBS WITH(NOLOCK) 
				WHERE ID_WORKFLOW = '+CAST(@isIdWorkFlow AS VARCHAR(20))+'
				'
	--print @sql
	EXEC sp_executesql @sql
END