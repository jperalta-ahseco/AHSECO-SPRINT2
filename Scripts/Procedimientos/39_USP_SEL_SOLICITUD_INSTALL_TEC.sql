USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_SEL_SOLICITUD_INSTALL_TEC]
(
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		24.10.24		Realiza el select del detalle de la solicitud de venta y de la cotización para la bandeja de instalación técnica.
	[USP_SEL_SOLICITUD_INSTALL_TEC] 13
  =======================================================================================================*/
	@isIdSolicitud BIGINT
)
AS
BEGIN
	DECLARE @sql NVARCHAR(MAX)
	DECLARE @sql_productos NVARCHAR(MAX)

	SET @sql = '
				SELECT
					SOL.ID_SOLICITUD					AS ID_SOLICITUD
					,ID_WORKFLOW						AS ID_WORKFLOW
					,datos.VALOR1						AS EMPRESA
					,IDCLIENTE							AS IDCLIENTE
					,RUC								AS RUC
					,RAZONSOCIAL						AS RAZONSOCIAL
					,CONCAT(ISNULL(ubi.[NOMDEPARTAMENTO],''''),'' / '',ISNULL(ubi.[NOMPROVINCIA],''''),'' / '',ISNULL(ubi.[NOMDISTRITO],'''')) AS UBIGEO
					,ASESORVENTA						AS ASESORVENTA
					,FLUJO.VALOR1						AS FLUJO
					,TIPO.VALOR1						AS TIPO
					,CONVERT(VARCHAR(10),FECHA_SOL,103)	AS FECHA_SOL
					,SOL.ESTADO							AS ESTADO
				FROM [dbo].[TBM_SOLICITUDVENTA] AS SOL WITH(NOLOCK)
				LEFT JOIN [dbo].[TBM_CLIENTES] AS cli WITH(NOLOCK) ON cli.ID = SOL.IDCLIENTE
				LEFT JOIN [dbo].[TBM_UBIGEO] AS ubi WITH(NOLOCK) ON ubi.CODUBIGEO = cli.CODUBIGEO
				LEFT JOIN [dbo].[TBD_DATOS_GENERALES] datos WITH(NOLOCK) ON datos.PARAMETRO = SOL.COD_EMPRESA
				LEFT JOIN [dbo].[TBD_DATOS_GENERALES] AS TIPO ON TIPO.COD_VALOR1 = SOL.TIPO_SOL 
				LEFT JOIN (SELECT COD_VALOR1,VALOR1 FROM [dbo].[TBD_DATOS_GENERALES] WHERE DOMINIO = ''FLOWSOL'') AS FLUJO ON FLUJO.COD_VALOR1 = CAST(SOL.ID_FLUJO AS NVARCHAR)

				WHERE SOL.ID_SOLICITUD = '+CAST(@isIdSolicitud AS VARCHAR(20))
	SET @sql_productos = '
				SELECT
				 ID
				 ,NROITEM
				 ,TIPOITEM
				 ,CANTIDAD
				 ,DESCRIPCION
				 --PENDIENTE EL MODELO, SERIE, MARCA
				FROM [dbo].[TBD_COTIZACIONVENTA] AS DETALLE WITH(NOLOCK)
				LEFT JOIN [dbo].[TBM_COTIZACIONVENTA] AS COTIZ WITH(NOLOCK) ON DETALLE.ID_COTIZACION = COTIZ.ID_COTIZACION AND ID_SOLICITUD = '+CAST(@isIdSolicitud AS VARCHAR(20))+'
				WHERE ID_SOLICITUD = '+CAST(@isIdSolicitud AS VARCHAR(20))

	--print @sql
	EXEC sp_executesql @sql
	EXEC sp_executesql @sql_productos
END