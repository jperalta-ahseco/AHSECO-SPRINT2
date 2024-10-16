USE [DB_AHSECO]
GO

CREATE PROCEDURE [dbo].[USP_SEL_SOLICITUDES] 
(
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		25.09.24		Realiza el select de la tabla TBM_SOLICITUDVENTA con parametros de búsqueda.
	EXEC [USP_SEL_SOLICITUDES] 6,0
  =======================================================================================================*/
	@isIdCliente BIGINT,
	@isIdSolicitud BIGINT 
)
AS
BEGIN
	DECLARE @sql NVARCHAR(MAX)

	SET @sql = '
				SELECT
					SOL.ID_SOLICITUD					AS ID_SOLICITUD
					,ID_WORKFLOW						AS ID_WORKFLOW
					,FLUJO.VALOR1						AS FLUJO
					,SOL.ID_FLUJO						AS CODFLUJO
					,TIPO.VALOR1						AS TIPO
					,SOL.TIPO_SOL						AS CODTIPOSOL
					,CONVERT(VARCHAR(10),FECHA_SOL,103)	AS FECHA_SOL
					,SOL.ESTADO							AS ESTADO
					,COD_MEDIOCONT						AS COD_MEDIOCONT
					,IDCLIENTE							AS IDCLIENTE
					,RUC								AS RUC
					,RAZONSOCIAL						AS RAZONSOCIAL
					,ASESORVENTA						AS ASESORVENTA
					,STOCK								AS STOCK
				FROM [dbo].[TBM_SOLICITUDVENTA] AS SOL WITH(NOLOCK) 
				LEFT JOIN [dbo].[TBD_DATOS_GENERALES] AS TIPO ON TIPO.COD_VALOR1 = SOL.TIPO_SOL 
				LEFT JOIN (SELECT COD_VALOR1,VALOR1 FROM [dbo].[TBD_DATOS_GENERALES] WHERE DOMINIO = ''FLOWSOL'') AS FLUJO ON FLUJO.COD_VALOR1 = CAST(SOL.ID_FLUJO AS NVARCHAR)
				WHERE IDCLIENTE = '+CAST(@isIdCliente AS VARCHAR(20))+'
				'
	IF (@isIdSolicitud != 0)
	BEGIN
		SET @sql = @sql + ' AND ID_SOLICITUD = '+CAST(@isIdSolicitud AS VARCHAR(20))
	END

	--print @sql
	EXEC sp_executesql @sql
END