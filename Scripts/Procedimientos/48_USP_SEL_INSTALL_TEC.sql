USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_SEL_INSTALL_TEC]
(
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		25.10.24		Realiza el select de la tabla [TBM_INSTALACION] con parámetros de búsqueda para la bandeja de instalacion técnica.
	[USP_SEL_INSTALL_TEC]
  =======================================================================================================*/
	@isFecIni			VARCHAR(10) = NULL
  ,@isFecFin			VARCHAR(10) = NULL
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
						,INSTALL.ORDENCOMPRA		AS ORDENCOMPRA
						,INSTALL.NUMPROCESO			AS NUMPROCESO
						,INSTALL.CONTRATO			AS CONTRATO
						,INSTALL.TIPOVENTA			AS TIPOVENTA
						,INSTALL.VENDEDOR			AS VENDEDOR
						,datos.VALOR1				AS CODEMPRESA
						,CONVERT(VARCHAR(10),INSTALL.FECHAMAX,103)	AS FECHAMAX
						,INSTALL.DESTINO			AS DESTINO
						,estado.NOM_ESTADO			AS ESTADO
						,INSTALL.ESTADO				AS CODESTADO
					FROM [dbo].[TBM_INSTALACION] AS INSTALL WITH(NOLOCK)'
	IF (@IsNumFianza != '') 
	BEGIN
	SET @sql = @sql +'LEFT JOIN [dbo].[TBD_INSTALACION] AS DETALLE WITH(NOLOCK) ON DETALLE.NUMREQ = INSTALL.NUMREQ
	'
	END
	SET @sql = @sql +'LEFT JOIN [dbo].[TBD_DATOS_GENERALES] datos WITH(NOLOCK) ON datos.COD_VALOR1 = INSTALL.CODEMPRESA
					LEFT JOIN [dbo].[TBM_PROCESOESTADOS] estado WITH(NOLOCK) ON estado.COD_ESTADO = INSTALL.ESTADO
					WHERE 1 = 1
				'
	IF (@isFecIni IS NOT NULL)
		IF (@isFecFin IS NOT NULL)
			SET @sql = @sql +' AND CONVERT(VARCHAR(10),[INSTALL].[FEC_REG],112) BETWEEN '''+@isFecIni+''' AND '''+@isFecFin+''' '
	IF (@IsRequerimiento != 0) 
	BEGIN
			SET @sql = @sql +' AND INSTALL.NUMREQ = '''+ CAST(@IsRequerimiento AS VARCHAR)+ ''' '
	END
	IF (@IsEstado != '') 
	BEGIN
			SET @sql = @sql +' AND INSTALL.ESTADO = ''' + CAST(@IsEstado AS VARCHAR) + ''' '
	END
	IF (@IsDestino != '') 
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


