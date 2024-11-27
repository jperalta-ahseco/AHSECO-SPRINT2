USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_SEL_SOLICITUDES] 
(
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		25.09.24		Realiza el select de la tabla TBM_SOLICITUDVENTA con parametros de búsqueda.
	Diego Bazalar		23.10.24		Se añade la búsqueda por tipo de solicitud CODTIPOSOL, y por ESTADO. 
	exec USP_SEL_SOLICITUDES @isIdCliente=0,@isIdSolicitud=0,@isEstado=N'PRVT',@isTipoSol=N'TSOL05',@IsTipoIngreso=N'3',@IsPerfil='5'
=======================================================================================================*/
	@isIdCliente BIGINT,
	@isIdSolicitud BIGINT,
	@isEstado VARCHAR(5) = '',
	@isTipoSol VARCHAR(6) = '',
	@IsTipoIngreso CHAR(1) ='1',
	@IsPerfil VARCHAR(3) = ''
)
AS
BEGIN
	DECLARE @sql NVARCHAR(MAX),@NUM_COT_ELI INT,@COD_FLUJO CHAR(1)

	SELECT @NUM_COT_ELI=COUNT(1) FROM TBM_COTIZACIONVENTA WITH(NOLOCK) WHERE ESTADO='I' AND ID_SOLICITUD = @isIdSolicitud


	IF(LEN(@IsPerfil)>0)
	BEGIN
		SELECT @COD_FLUJO = COD_VALOR1  FROM TBD_DATOS_GENERALES 
						WHERE  DOMINIO='FLOWSOL' AND VALOR2 LIKE '%;'+RTRIM(@IsPerfil)+';%';

		SET @COD_FLUJO = ISNULL(@COD_FLUJO,'');

	END


	SET @sql = '
				SELECT
					SOL.ID_SOLICITUD					AS ID_SOLICITUD
					,SOL.ID_WORKFLOW						AS ID_WORKFLOW
					,FLUJO.VALOR1						AS FLUJO
					,SOL.ID_FLUJO						AS CODFLUJO
					,TIPO.VALOR1						AS TIPO
					,SOL.TIPO_SOL						AS CODTIPOSOL
					,CONVERT(VARCHAR(10),FECHA_SOL,103)	AS FECHA_SOL
					,SOL.ESTADO							AS ESTADO
					,EST.NOM_ESTADO						AS NOM_ESTADO
					,EST.ABREV_ESTADO					AS ABREV_ESTADO
					,COD_MEDIOCONT						AS COD_MEDIOCONT
					,IDCLIENTE							AS IDCLIENTE
					,RUC								AS RUC
					,RAZONSOCIAL						AS RAZONSOCIAL
					,ASESORVENTA						AS ASESORVENTA
					,SOL.COD_EMPRESA					AS COD_EMPRESA
					,ISNULL(SOL.TIPOPROCESO,'''') AS TIPOPROCESO
					,ISNULL(SOL.NROPROCESO,'''') AS NROPROCESO
					,SOL.TIPOVENTA AS TIPOVENTA
					,TV.VALOR1 AS NOMTIPOVENTA , ' +
					CAST(@NUM_COT_ELI AS VARCHAR) +' AS COTELIM, '+
					'RIGHT(''000000''+CAST(SOL.ID_SOLICITUD AS VARCHAR),6) AS SOL_FORMAT ' +
				'FROM [dbo].[TBM_SOLICITUDVENTA] AS SOL WITH(NOLOCK) 
				LEFT JOIN (SELECT ID,NOM_ESTADO,ABREV_ESTADO,COD_ESTADO FROM TBM_PROCESOESTADOS WHERE ID_PROCESO = 1) EST ON SOL.ESTADO = EST.COD_ESTADO
				LEFT JOIN [dbo].[TBD_DATOS_GENERALES] AS TIPO ON TIPO.COD_VALOR1 = SOL.TIPO_SOL '
	IF (@IsTipoIngreso = '3')
	BEGIN 
		SET @sql = @sql + '
				LEFT OUTER JOIN [dbo].[TBM_INSTALACION] INSTALL ON INSTALL.ID_SOLICITUD != SOL.ID_SOLICITUD'
	END
	SET @sql = @sql + '
				LEFT JOIN (SELECT COD_VALOR1,VALOR1 FROM [dbo].[TBD_DATOS_GENERALES] WHERE DOMINIO = ''FLOWSOL'') AS FLUJO ON FLUJO.COD_VALOR1 = CAST(SOL.ID_FLUJO AS NVARCHAR)
				LEFT JOIN [dbo].[TBD_DATOS_GENERALES] TV ON TV.DOMINIO=''TIPOVENTA'' AND SOL.TIPOVENTA=TV.COD_VALOR1
				WHERE 1 = 1
				'

	IF (ISNULL(@isIdCliente,0) != 0)
	BEGIN
		SET @sql = @sql + ' AND SOL.IDCLIENTE = '+CAST(@isIdCliente AS VARCHAR(20))
	END
	IF (ISNULL(@isIdSolicitud,0) != 0)
	BEGIN
		SET @sql = @sql + ' AND SOL.ID_SOLICITUD = '+CAST(@isIdSolicitud AS VARCHAR(20))
	END
	IF (ISNULL(@isTipoSol,'') != '')
	BEGIN
		SET @sql = @sql + ' AND TRIM(SOL.TIPO_SOL) = '''+TRIM(@isTipoSol)+''' '
	END
	IF (ISNULL(@isEstado,'') != '')
	BEGIN
		SET @sql = @sql + ' AND TRIM(SOL.ESTADO) = '''+TRIM(@isEstado)+''' '
	END
	IF(LEN(@COD_FLUJO)> 0)
	BEGIN
		SET @sql = @sql + ' AND SOL.ID_FLUJO = '''+TRIM(@COD_FLUJO)+''' '
	END
	--print @sql
	EXEC sp_executesql @sql
END