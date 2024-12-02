USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_SEL_INSTALL_TEC]
(
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		25.10.24		Realiza el select de la tabla [TBM_INSTALACION] con parámetros de búsqueda para la bandeja de instalacion técnica.
	[USP_SEL_INSTALL_TEC] '20240101','20241201','','','','','','','0','','','',''
  =======================================================================================================*/
	@isFecIni			VARCHAR(10)
  ,@isFecFin			VARCHAR(10) 
  ,@IsRequerimiento		BIGINT
  ,@IsEstado			VARCHAR(6)
  ,@IsDestino			VARCHAR(2)
  ,@IsVendedor			VARCHAR(150)
  ,@IsRuc				VARCHAR(12)
  ,@IsCodEmpresa		VARCHAR(6)
  ,@IsTipVenta			VARCHAR(25)
  ,@IsNumProceso		VARCHAR(15)
  ,@IsNumContrato		VARCHAR(25)
  ,@IsNumOrdenCompra	VARCHAR(35)
  ,@IsNumFianza			VARCHAR(15)
)
AS
BEGIN
	
	DECLARE @sql NVARCHAR(MAX)
	DECLARE @CONTADOR INT


	IF OBJECT_ID('tempdb..#tmpDepartamento') IS NOT NULL DROP TABLE #tmpDepartamento
	IF OBJECT_ID('tempdb..#tmpDestinos') IS NOT NULL DROP TABLE #tmpDestinos

	CREATE TABLE #tmpDepartamento(
		CODDEPARTAMENTO VARCHAR(6)
		,NOMDEPARTAMENTO VARCHAR(50)
	)

	CREATE TABLE #tmpDestinos(
		NUMREQ BIGINT
		,DEPARTAMENTOS NVARCHAR(MAX)
	)
	

	INSERT INTO #tmpDepartamento(CODDEPARTAMENTO, NOMDEPARTAMENTO)
	SELECT DISTINCT
		SUBSTRING(CODUBIGEO,0,3) AS CODDEPARTAMENTO
		,NOMDEPARTAMENTO
	FROM TBM_UBIGEO

	SELECT 
		@CONTADOR = MAX(NUMREQ)
	FROM [TBM_INSTALACION]

	DECLARE @I INT
	SET @I = 1
	WHILE(@CONTADOR >= @I) --Se obtienen los destinos y se formatean a texto.
	BEGIN
		;WITH CTE_1 AS (
			SELECT 
				value AS valor
			FROM STRING_SPLIT( (SELECT DESTINO FROM TBM_INSTALACION WHERE NUMREQ = @I ),',')
		)
		INSERT INTO #tmpDestinos(DEPARTAMENTOS, NUMREQ)
		SELECT 
			STRING_AGG(NOMDEPARTAMENTO, ',') DEPARTAMENTOS
			,@I AS NUMREQ
		FROM CTE_1 AS valores
		LEFT JOIN (SELECT CODDEPARTAMENTO, NOMDEPARTAMENTO FROM #tmpDepartamento GROUP BY CODDEPARTAMENTO, NOMDEPARTAMENTO) AS UBIGEO ON UBIGEO.CODDEPARTAMENTO = valores.valor

		SET @I += 1
	END


	SET @sql = '
					SELECT							
						INSTALL.NUMREQ				AS NUMREQ
						,INSTALL.ID_SOLICITUD		AS ID_SOLICITUD
						,INSTALL.ID_WORKFLOW		AS ID_WORKFLOW
						,INSTALL.RUCEMPRESA			AS RUCEMPRESA
						,INSTALL.NOMEMPRESA			AS NOMEMPRESA
						,INSTALL.UBICACION			AS UBICACION
						,INSTALL.NOMBRECONTACTO		AS NOMBRECONTACTO	
						,INSTALL.TELEFONOCONTACTO	AS TELEFONOCONTACTO
						,INSTALL.CARGOCONTACTO		AS CARGOCONTACTO
						,INSTALL.ESTABLECIMIENTO	AS ESTABLECIMIENTO
						,ISNULL(INSTALL.ORDENCOMPRA,'''')		AS ORDENCOMPRA
						,ISNULL(INSTALL.NUMPROCESO,'''')			AS NUMPROCESO
						,ISNULL(INSTALL.TIPOPROCESO,'''')		AS TIPOPROCESO
						,ISNULL(INSTALL.CONTRATO,'''')			AS CONTRATO
						,INSTALL.TIPOVENTA 			AS CODTIPOVENTA
						,tipos.VALOR1				AS TIPOVENTA
						,INSTALL.VENDEDOR			AS VENDEDOR
						,datos.VALOR1				AS CODEMPRESA
						,INSTALL.FECHAMAX			AS FECHAMAX
						,DESTINO					AS DESTINO
						,destinos.DEPARTAMENTOS		AS DESTINOS
						,estado.NOM_ESTADO			AS ESTADO
						,INSTALL.ESTADO				AS CODESTADO
						,INSTALL.GARANTIA AS CODGARANTIA
						,CONVERT(VARCHAR(10),INSTALL.FEC_REG,103) AS FECREGISTRO
					FROM [dbo].[TBM_INSTALACION] AS INSTALL WITH(NOLOCK)'
	IF (@IsNumFianza != '') 
	BEGIN
	SET @sql = @sql +'LEFT JOIN [dbo].[TBD_INSTALACION] AS DETALLE WITH(NOLOCK) ON DETALLE.NUMREQ = INSTALL.NUMREQ
	'
	END
	SET @sql = @sql +'LEFT JOIN [dbo].[TBD_DATOS_GENERALES] datos WITH(NOLOCK) ON datos.COD_VALOR1 = INSTALL.CODEMPRESA
					LEFT JOIN [dbo].[TBD_DATOS_GENERALES] tipos WITH(NOLOCK) ON tipos.COD_VALOR1 = INSTALL.TIPOVENTA AND tipos.DOMINIO = ''TIPOVENTA''
					LEFT JOIN [dbo].[TBM_PROCESOESTADOS] estado WITH(NOLOCK) ON estado.COD_ESTADO = INSTALL.ESTADO
					LEFT JOIN [dbo].[#tmpDestinos] destinos WITH(NOLOCK) ON INSTALL.NUMREQ = destinos.NUMREQ
					WHERE 1 = 1
				'
	IF (@isFecIni != '' AND @isFecFin != '')
	BEGIN
		SET @sql = @sql +' AND CONVERT(VARCHAR(10),[INSTALL].[FEC_REG],112) BETWEEN '''+@isFecIni+''' AND '''+@isFecFin+''' '
	END
	IF (@IsRequerimiento != 0) 
	BEGIN
			SET @sql = @sql +' AND INSTALL.NUMREQ = '''+ CAST(@IsRequerimiento AS VARCHAR)+ ''' '
	END
	IF (@IsEstado != '') 
	BEGIN
			SET @sql = @sql +' AND INSTALL.ESTADO = ''' + CAST(@IsEstado AS VARCHAR) + ''' '
	END
	IF (@IsDestino != '00') 
	BEGIN
		SET @sql = @sql +' AND INSTALL.DESTINO LIKE '''+'%'+CAST(TRIM(@IsDestino) AS VARCHAR)+'%'+''' '
	END
	IF (@IsVendedor != '') 
	BEGIN
			SET @sql = @sql +' AND INSTALL.VENDEDOR LIKE '''+'%'+CAST(@IsVendedor AS VARCHAR(150))+'%'+''' '
	END
	IF (@IsRuc != '') 
	BEGIN
			SET @sql = @sql +' AND INSTALL.RUCEMPRESA = ''' + CAST(@IsRuc AS VARCHAR) + ''' '
	END
	IF (@IsCodEmpresa != '') 
	BEGIN
			SET @sql = @sql +' AND INSTALL.CODEMPRESA = ''' + CAST(@IsCodEmpresa AS VARCHAR) + ''' '
	END
	IF (@IsTipVenta != '0') 
	BEGIN
			SET @sql = @sql +' AND INSTALL.TIPOVENTA = ''' + CAST(@IsTipVenta AS VARCHAR) + ''' '
	END
	IF (@IsNumProceso != '') 
	BEGIN
			SET @sql = @sql +' AND INSTALL.NUMPROCESO = ''' + CAST(@IsNumProceso AS VARCHAR) + ''' '
	END
	IF (@IsNumContrato != '') 
	BEGIN
			SET @sql = @sql +' AND INSTALL.CONTRATO = ''' + CAST(@IsNumContrato AS VARCHAR) + ''' '
	END
	IF (@IsNumOrdenCompra != '') 
	BEGIN
			SET @sql = @sql +' AND INSTALL.ORDENCOMPRA = ''' + CAST(@IsNumOrdenCompra AS VARCHAR) + ''' '
	END
	IF (@IsNumFianza != '') 
	BEGIN
			SET @sql = @sql +' AND DETALLE.NUMFIANZA = ''' + CAST(@IsNumFianza AS VARCHAR) + ''' '
	END

	--print @sql
	--INSERT INTO #tmpResult
	EXEC sp_executesql @sql
END


