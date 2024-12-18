USE [DB_AHSECO]
GO

ALTER PROCEDURE [dbo].[USP_SEL_CLIENTE] 
(
	@isId BIGINT = 0,
	@isRucEmpresa VARCHAR(12) = NULL,
	@isNomEmpresa VARCHAR(75)= NULL,
	@isFecIni VARCHAR(10) = NULL,
	@isAsesor INT = NULL,
	@isFecFin VARCHAR(10) = NULL,
	@isCategoria VARCHAR(10) = '',
	@isCodUbigeo VARCHAR(6) = '',
	@isEstado BIT = NULL,
	@isSector VARCHAR(10) = NULL
)
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		23.08.24		Realiza el select de la tabla Cliente con par�metros de b�squeda.
	EXEC [USP_SEL_CLIENTE] @isAsesor = null 
  =======================================================================================================*/
AS
BEGIN
	DECLARE @sql NVARCHAR(MAX) 
	IF OBJECT_ID('tempdb..#TMP_ASIG') IS NOT NULL DROP TABLE #TMP_ASIG

	CREATE TABLE #TMP_ASIG
	(ID_ASIG INT, 
	ID_CLIENTE INT, 
	ELIMINADO BIT,
	ID_ASESOR INT)

	;WITH CTE_1 as ( SELECT 
					ID_ASIG,
					ID_CLIENTE,
					MAX(FEC_REG) FEC_REG,
					ID_ASESOR
					FROM [TBM_ASIG_CLIE_MANUAL]
					GROUP BY ID_CLIENTE,ID_ASESOR,ID_ASIG),
		CTE_2 AS(SELECT
					ID_ASIG
					,ID_CLIENTE
					,ID_ASESOR
					FROM CTE_1),
				CTE_3 AS (SELECT 
							MAX(ID_ASIG) ID_ASIG
							,ID_CLIENTE
							FROM CTE_2 
							GROUP BY ID_CLIENTE)
					INSERT INTO #TMP_ASIG(ID_ASIG,ID_CLIENTE, ELIMINADO, ID_ASESOR)
					SELECT
						A.ID_ASIG
						,T.ID_CLIENTE
						,T.ELIMINADO
						,ID_ASESOR
					FROM CTE_3 A
					LEFT JOIN [TBM_ASIG_CLIE_MANUAL] T ON T.ID_ASIG = A.ID_ASIG

	SET @sql = ';WITH CTE AS
						(SELECT COUNT(IDCONTACTO) AS CONTAR, ID_CLIENTE from TBM_CONTACTOS group by ID_CLIENTE)
				SELECT
				cli.[ID],
				ISNULL(cli.[RUCEMPRESA],''No definido'')		AS RUCEMPRESA,
				ISNULL(cli.[NOMEMPRESA],''No definido'')		AS NOMEMPRESA,
				ISNULL([contacto].[CONTAR],0)								AS NUMCONTACTO,
				ISNULL(cli.[TELEFONO],''No definido'')			AS TELEFONO,
				ISNULL(cli.[CORREO],''No definido'')			AS CORREO,
				ISNULL(ubi.[NOMDEPARTAMENTO],'''')				AS NOMDEPARTAMENTO,
				ISNULL(ubi.[NOMPROVINCIA],'''')					AS NOMPROVINCIA,
				ISNULL(ubi.[NOMDISTRITO],'''')					AS NOMDISTRITO,
				cli.[CODUBIGEO]									AS CODUBIGEO,
				ISNULL(cli.[DIRECCION],''No definido'')			AS DIRECCION,
				ISNULL(datos.[DESCRIPCION],''No definido'')		AS CATEGORIA,
				ISNULL(cli.[CATEGORIA],''No definido'')			AS CODCATEGORIA,
				cli.[ESTADO]									AS ESTADO,
				cli.[SECTORCLIENTE]								AS SECTORCLIENTE,
				cli.[AUDIT_REG_FEC]								AS AUDIT_REG_FEC
				,CASE WHEN temp.ELIMINADO != 1 
					THEN CONCAT(ISNULL(NOMBRES,''''),'' '',ISNULL(APELLIDOPATERNO,''''),'' '',ISNULL(APELLIDOMATERNO,''''))				
					ELSE '''' END																									AS ASESOR
				FROM
					[dbo].[TBM_CLIENTES] cli WITH(NOLOCK)
				LEFT JOIN 
					[dbo].[TBM_UBIGEO] ubi ON cli.CODUBIGEO = ubi.CODUBIGEO
				LEFT JOIN
					[#TMP_ASIG] temp on cli.ID=temp.ID_CLIENTE
				LEFT JOIN 
					[dbo].[TBM_EMPLEADOS] EMPLE ON EMPLE.ID_EMPLEADO = temp.ID_ASESOR
				LEFT JOIN
					[dbo].[TBD_DATOS_GENERALES] datos ON datos.[PARAMETRO] = cli.[CATEGORIA]
				LEFT JOIN
					[CTE] contacto ON cli.[ID] = contacto.[ID_CLIENTE]
				WHERE 1 = 1 '
	IF (@isFecIni IS NOT NULL)
		IF (@isFecFin IS NOT NULL)
			SET @sql = @sql +' AND CONVERT(VARCHAR(10),[cli].[AUDIT_REG_FEC],112) BETWEEN '''+@isFecIni+''' AND '''+@isFecFin+''' '
	IF @isId != 0
		SET  @sql = @sql +' AND [cli].[ID] = '''+CAST(@isId AS VARCHAR(50))+''' '
	IF @isRucEmpresa IS NOT NULL
		SET  @sql = @sql +' AND cli.[RUCEMPRESA] = '''+CAST(@isRucEmpresa AS VARCHAR(12))+''' '
	IF @isNomEmpresa IS NOT NULL
		SET  @sql = @sql +' AND cli.[NOMEMPRESA] LIKE '''+'%'+CAST(@isNomEmpresa AS VARCHAR(75))+'%'+''' '
	IF @isCategoria != ''
		SET  @sql = @sql +' AND cli.[CATEGORIA] = '''+CAST(@isCategoria AS VARCHAR(10))+''' '
	IF @isEstado IS NOT NULL
		SET @sql = @sql + ' AND cli.[ESTADO] = '''+CAST(@isEstado AS VARCHAR(5))+''' '
	IF @isSector IS NOT NULL
		SET @sql = @sql + ' AND cli.[SECTORCLIENTE] LIKE '''+'%'+CAST(@isSector AS VARCHAR(10))+'%'+''' '
	IF @isCodUbigeo != ''
		IF @isCodUbigeo != '000000'
			IF SUBSTRING(@isCodUbigeo,3,6) != '0000'
				IF SUBSTRING(@isCodUbigeo,5,6) != '00'
					SET @sql = @sql + ' AND ubi.[CODUBIGEO] = '''+CAST(@isCodUbigeo AS VARCHAR(10))+''' ' 
				ELSE
					SET @sql = @sql + ' AND SUBSTRING([ubi].[CODUBIGEO],1,4) = '''+CAST(SUBSTRING(@isCodUbigeo,1,4) AS VARCHAR(10))+''' ' 
			ELSE
				SET @sql = @sql + ' AND SUBSTRING([ubi].[CODUBIGEO],1,2) = '''+CAST(SUBSTRING(@isCodUbigeo,1,2) AS VARCHAR(10))+''' '
	IF @isAsesor = 0
		SET @Sql = @Sql + ' AND EMPLE.ID_EMPLEADO IS NULL OR temp.ELIMINADO = 1 '
	IF @isAsesor > 0
		SET @Sql = @Sql + ' AND temp.ELIMINADO != 1 AND EMPLE.ID_EMPLEADO = '+CAST(@isAsesor AS VARCHAR(20))
	IF @isAsesor = -1
		SET @Sql = @Sql + ' AND EMPLE.ID_EMPLEADO IS NOT NULL'

	--print @sql
	EXEC sp_executesql @sql
END