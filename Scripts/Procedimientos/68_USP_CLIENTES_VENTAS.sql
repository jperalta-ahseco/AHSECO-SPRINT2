﻿USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_CLIENTES_VENTAS] 
(
	@ROL_NOMBRE VARCHAR(35),
	@isRucEmpresa VARCHAR(12) = NULL,
	@isNomEmpresa VARCHAR(75)= NULL,
	@isAsesor INT = NULL
)
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		23.08.24		Realiza el select de la tabla Cliente con par�metros de b�squeda.
	EXEC [USP_CLIENTES_VENTAS] 'SGI_VENTA_GERENTE','','',0
  =======================================================================================================*/
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @sql NVARCHAR(MAX) 
	IF OBJECT_ID('tempdb..#TMP_ASIG') IS NOT NULL DROP TABLE #TMP_ASIG

	CREATE TABLE #TMP_ASIG
	(ID_ASIG INT, 
	ID_CLIENTE INT, 
	ELIMINADO BIT,
	ID_ASESOR INT)

	IF OBJECT_ID('tempdb..#TMP_CLIENTE') IS NOT NULL DROP TABLE #TMP_CLIENTE

	CREATE TABLE #TMP_CLIENTE
				(ID BIGINT, 
				RUCEMPRESA VARCHAR(12), 
				NOMEMPRESA VARCHAR(200),
				NUMCONTACTO INT,
				TELEFONO VARCHAR(35),
				CORREO VARCHAR(35),
				NOMDEPARTAMENTO VARCHAR(50),
				NOMPROVINCIA VARCHAR(50),
				NOMDISTRITO VARCHAR(50),
				CODUBIGEO VARCHAR(6),
				DIRECCION VARCHAR(150),
				CATEGORIA VARCHAR(50),
				CODCATEGORIA VARCHAR(10),
				ESTADO BIT,
				SECTORCLIENTE VARCHAR(10),
				AUDIT_REG_FEC DATETIME,
				ASESOR VARCHAR(250)
				)

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



			;WITH CTE AS
						(SELECT COUNT(IDCONTACTO) AS CONTAR, ID_CLIENTE from TBM_CONTACTOS group by ID_CLIENTE)
						INSERT INTO #TMP_CLIENTE
						SELECT
				cli.[ID],
				ISNULL(cli.[RUCEMPRESA],'No definido')		AS RUCEMPRESA,
				ISNULL(cli.[NOMEMPRESA],'No definido')		AS NOMEMPRESA,
				ISNULL([contacto].[CONTAR],0)								AS NUMCONTACTO,
				ISNULL(cli.[TELEFONO],'No definido')			AS TELEFONO,
				ISNULL(cli.[CORREO],'No definido')			AS CORREO,
				ISNULL(ubi.[NOMDEPARTAMENTO],'')				AS NOMDEPARTAMENTO,
				ISNULL(ubi.[NOMPROVINCIA],'')					AS NOMPROVINCIA,
				ISNULL(ubi.[NOMDISTRITO],'')					AS NOMDISTRITO,
				cli.[CODUBIGEO]									AS CODUBIGEO,
				ISNULL(cli.[DIRECCION],'No definido')			AS DIRECCION,
				ISNULL(datos.[DESCRIPCION],'No definido')		AS CATEGORIA,
				ISNULL(cli.[CATEGORIA],'No definido')			AS CODCATEGORIA,
				cli.[ESTADO]									AS ESTADO,
				cli.[SECTORCLIENTE]								AS SECTORCLIENTE,
				cli.[AUDIT_REG_FEC]								AS AUDIT_REG_FEC
				,CASE WHEN temp.ELIMINADO != 1 
					THEN CONCAT(ISNULL(NOMBRES,''),' ',ISNULL(APELLIDOPATERNO,''),' ',ISNULL(APELLIDOMATERNO,''))				
					ELSE '' END																									AS ASESOR
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
					WHERE 
					  cli.[RUCEMPRESA]  LIKE '%'+@isRucEmpresa+'%' AND
					   cli.[NOMEMPRESA] LIKE '%'+@isNomEmpresa+'%' 


	IF(@ROL_NOMBRE IN ('SGI_VENTA_ASESOR'))
	BEGIN
			SELECT * FROM #TMP_CLIENTE 
			WHERE ID IN (SELECT ID_CLIENTE FROM #TMP_ASIG 
									WHERE ID_ASESOR =(CASE WHEN @isAsesor > 0 THEN @isAsesor ELSE ID_ASESOR END))
	END
	IF(@ROL_NOMBRE IN ('SGI_VENTA_JEFE','SGI_VENTA_COORDINAVENTA'))
	BEGIN
			SELECT * FROM #TMP_CLIENTE
			WHERE ID IN (SELECT ID_CLIENTE FROM #TMP_ASIG
									WHERE ID_ASESOR =(CASE WHEN @isAsesor > 0 THEN @isAsesor ELSE ID_ASESOR END))
	END

	IF(@ROL_NOMBRE IN ('SGI_VENTA_GERENTE','SGI_VENTA_COSTOS','SGI_VENTA_SERVICIOTECNICO','SGI_VENTA_IMPORTACION','SGI_VENTA_LOGISTICA'))
	BEGIN
			SELECT * FROM #TMP_CLIENTE
			WHERE ID IN (SELECT DISTINCT IDCLIENTE FROM TBM_SOLICITUDVENTA WITH(NOLOCK))
	END

	IF(@ROL_NOMBRE IN ('SGI_VENTA_COORDINASERV','SGI_VENTA_COORDINAATC'))
	BEGIN
			SELECT * FROM #TMP_CLIENTE
	END

	SET NOCOUNT OFF;
					   
END