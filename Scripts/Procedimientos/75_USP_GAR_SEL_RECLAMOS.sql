USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_GAR_SEL_RECLAMOS]
(
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		18.11.24		Realiza el select de la tabla [TBM_INSTALACION] con parámetros de búsqueda para la bandeja de instalacion técnica.
	EXEC [USP_GAR_SEL_RECLAMOS] '','','','','','','','','0','','','','436485'
  =======================================================================================================*/
	@isFecIni			VARCHAR(10)
  ,@isFecFin			VARCHAR(10) 
  ,@IsReclamo			BIGINT
  ,@IsRuc				VARCHAR(12)
  ,@IsCodUbigeoDest		VARCHAR(6)
  ,@IsVendedor			VARCHAR(150)
  ,@IsEstado			VARCHAR(6)
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
						RECLAMO.ID_RECLAMO
						,RECLAMO.ID_WORKFLOW
						,RECLAMO.ID_SOLICITUD
						,RECLAMO.RUCEMPRESA						
						,RECLAMO.NOMEMPRESA						AS RAZONSOCIAL
						,RECLAMO.UBICACION	
						,RECLAMO.NOMBRECONTACTO
						,ISNULL(RECLAMO.TELEFONOCONTACTO,'''')	AS TELEFONOCONTACTO
						,ISNULL(RECLAMO.CARGOCONTACTO,'''')		AS CARGOCONTACTO 
						,ISNULL(RECLAMO.ESTABLECIMIENTO,'''')	AS ESTABLECIMIENTO
						,RECLAMO.ORDENCOMPRA
						,RECLAMO.NUMPROCESO
						,RECLAMO.TIPOPROCESO
						,RECLAMO.CONTRATO
						,RECLAMO.CODEMPRESA
						,datos.VALOR1							AS NOMEMPRESA
						,RECLAMO.VENDEDOR
						,RECLAMO.CODIGOPRODUCTO
						,RECLAMO.DESCRIPCION
						,RECLAMO.MARCA
						,RECLAMO.TIPOVENTA
						,tipos.VALOR1							AS NOMTIPOVENTA
						,RECLAMO.MODELO
						,RECLAMO.SERIE
						,RECLAMO.NUMFIANZA
						,RECLAMO.FECHAINSTALACION
						,RECLAMO.FECHARECLAMO
						,RECLAMO.FECHAPROGRAMACION
						,RECLAMO.UBIGEO
						,CONCAT(UBI.NOMDEPARTAMENTO,'' / '',UBI.NOMPROVINCIA, '' / '', UBI.NOMDISTRITO) AS DESCUBIGEODEST
						,RECLAMO.DIRECCION
						,urgencia.VALOR1						AS URGENCIA
						,RECLAMO.TIPOMOTIVO
						,RECLAMO.MOTIVO
						,estado.NOM_ESTADO						As ESTADO
						,RECLAMO.ESTADO							AS CODESTADO
						,RECLAMO.USR_REG
						,RECLAMO.FEC_REG
					FROM [TBM_RECLAMOS] AS RECLAMO WITH(NOLOCK)
					LEFT JOIN [dbo].[TBD_DATOS_GENERALES] datos WITH(NOLOCK) ON datos.COD_VALOR1 = RECLAMO.CODEMPRESA
					LEFT JOIN [dbo].[TBD_DATOS_GENERALES] tipos WITH(NOLOCK) ON tipos.COD_VALOR1 = RECLAMO.TIPOVENTA AND tipos.DOMINIO = ''TIPOVENTA''
					LEFT JOIN [dbo].[TBM_PROCESOESTADOS] estado WITH(NOLOCK) ON estado.COD_ESTADO = RECLAMO.ESTADO AND ID_PROCESO = 7
					LEFT JOIN [dbo].[TBD_DATOS_GENERALES] urgencia WITH(NOLOCK) ON urgencia.COD_VALOR1 = RECLAMO.URGENCIA
					LEFT JOIN [dbo].[TBM_UBIGEO] ubi WITH(NOLOCK) ON ubi.CODUBIGEO = RECLAMO.UBIGEO
					
					WHERE 1 = 1'
	IF (@isFecIni != '' AND @isFecFin != '')
	BEGIN
		SET @sql = @sql +' AND CONVERT(VARCHAR(10),[RECLAMO].[FEC_REG],103) BETWEEN '''+@isFecIni+''' AND '''+@isFecFin+''' '
	END
	IF (@IsReclamo != 0) 
	BEGIN
			SET @sql = @sql +' AND RECLAMO.ID_RECLAMO = '''+ CAST(@IsReclamo AS VARCHAR)+ ''' '
	END
	IF (@IsEstado != '') 
	BEGIN
			SET @sql = @sql +' AND RECLAMO.ESTADO = ''' + CAST(@IsEstado AS VARCHAR) + ''' '
	END

	IF @IsCodUbigeoDest != ''
		IF @IsCodUbigeoDest != '000000'
			IF SUBSTRING(@IsCodUbigeoDest,3,6) != '0000'
				IF SUBSTRING(@IsCodUbigeoDest,5,6) != '00'
					SET @sql = @sql + ' AND ubi.[CODUBIGEO] = '''+CAST(@IsCodUbigeoDest AS VARCHAR(10))+''' ' 
				ELSE
					SET @sql = @sql + ' AND SUBSTRING([ubi].[CODUBIGEO],1,4) = '''+CAST(SUBSTRING(@IsCodUbigeoDest,1,4) AS VARCHAR(10))+''' ' 
			ELSE
				SET @sql = @sql + ' AND SUBSTRING([ubi].[CODUBIGEO],1,2) = '''+CAST(SUBSTRING(@IsCodUbigeoDest,1,2) AS VARCHAR(10))+''' '

	IF (@IsVendedor != '') 
	BEGIN
			SET @sql = @sql +' AND RECLAMO.VENDEDOR LIKE '''+'%'+CAST(@IsVendedor AS VARCHAR(150))+'%'+''' '
	END
	IF (@IsRuc != '') 
	BEGIN
			SET @sql = @sql +' AND RECLAMO.RUCEMPRESA = ''' + CAST(@IsRuc AS VARCHAR) + ''' '
	END
	IF (@IsCodEmpresa != '') 
	BEGIN
			SET @sql = @sql +' AND RECLAMO.CODEMPRESA = ''' + CAST(@IsCodEmpresa AS VARCHAR) + ''' '
	END
	IF (@IsTipVenta != '0') 
	BEGIN
			SET @sql = @sql +' AND RECLAMO.TIPOVENTA = ''' + CAST(@IsTipVenta AS VARCHAR) + ''' '
	END
	IF (@IsNumProceso != '') 
	BEGIN
			SET @sql = @sql +' AND RECLAMO.NUMPROCESO = ''' + CAST(@IsNumProceso AS VARCHAR) + ''' '
	END
	IF (@IsNumContrato != '') 
	BEGIN
			SET @sql = @sql +' AND RECLAMO.CONTRATO = ''' + CAST(@IsNumContrato AS VARCHAR) + ''' '
	END
	IF (@IsNumOrdenCompra != '') 
	BEGIN
			SET @sql = @sql +' AND RECLAMO.ORDENCOMPRA = ''' + CAST(@IsNumOrdenCompra AS VARCHAR) + ''' '
	END
	IF (@IsNumFianza != '') 
	BEGIN
			SET @sql = @sql +' AND RECLAMO.NUMFIANZA = ''' + CAST(@IsNumFianza AS VARCHAR) + ''' '
	END

	--print @sql
	EXEC sp_executesql @sql
END