USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE[dbo].[USP_SEL_ASIG_CLIENTES]
(
/*=======================================================================================================
	Nombre:				Fecha:				Descripcion:
	Diego Bazalar		10.03.25			Obtiene la lista de clientes vs sedes
	EXEC [USP_SEL_ASIG_CLIENTES] @IsRUC = '', @IsNomEmpresa = '', @IsNomSede= '', @IsNumPagina = 0, @IsPagina = 0
=======================================================================================================*/
	@IsRUC			VARCHAR(12)	
	,@IsNomEmpresa	VARCHAR(200)
	,@IsNomSede		VARCHAR(150)
	,@IsNumPagina	INT
	,@IsPagina		INT
)
AS
BEGIN

	DECLARE @INI INT,@FIN INT
  
  
	SELECT @INI = (@IsNumPagina*(@IsPagina-1)+1),@FIN=@IsNumPagina*@IsPagina

	SELECT 
		CLI.ID,
		RUCEMPRESA,
		NOMEMPRESA,
		NOMSEDE,
		UBI.NOMDEPARTAMENTO,
		UBI.NOMPROVINCIA,
		UBI.NOMDISTRITO,
		CLI.SECTORCLIENTE
	INTO #tmpClientesxAsignar
	FROM [dbo].[TBM_CLIENTES] CLI WITH(NOLOCK)
	LEFT JOIN [dbo].[TBM_SEDES] SEDES WITH(NOLOCK) ON SEDES.ID_CLIENTE = CLI.ID AND SEDES.ESTADO = 'A'
	LEFT JOIN [dbo].[TBM_UBIGEO] UBI WITH(NOLOCK) ON UBI.CODUBIGEO = CLI.CODUBIGEO
	WHERE ISNULL(CLI.RUCEMPRESA,'') = IIF(LEN(RTRIM(@IsRUC)) > 0, @IsRUC,  ISNULL(CLI.RUCEMPRESA,''))
	AND ISNULL(CLI.NOMEMPRESA,'') LIKE IIF(LEN(RTRIM(@IsNomEmpresa)) > 0,  '%'+@IsNomEmpresa+'%', ISNULL(CLI.NOMEMPRESA,''))
	AND ISNULL(SEDES.NOMSEDE,'') LIKE IIF(LEN(RTRIM(@IsNomSede)) > 0, '%'+@IsNomSede +'%', ISNULL(SEDES.NOMSEDE,''))

	DECLARE @TOTAL INT

	SELECT @TOTAL = COUNT(ID) FROM #tmpClientesxAsignar

	IF(@TOTAL > 500)
	BEGIN
		IF(@IsNumPagina > 0)
		BEGIN
			SELECT 
				ID,
				RUCEMPRESA,
				NOMEMPRESA,
				NOMSEDE,
				NOMDEPARTAMENTO,
				NOMPROVINCIA,
				NOMDISTRITO,
				SECTORCLIENTE
			FROM #tmpClientesxAsignar
			ORDER BY ID,NOMEMPRESA
			OFFSET @INI ROWS FETCH NEXT @IsNumPagina ROWS ONLY;
		END
		ELSE 
		BEGIN
			SELECT 
				ID,
				RUCEMPRESA,
				NOMEMPRESA,
				NOMSEDE,
				NOMDEPARTAMENTO,
				NOMPROVINCIA,
				NOMDISTRITO,
				SECTORCLIENTE
			FROM #tmpClientesxAsignar
			ORDER BY ID,NOMEMPRESA
		END
	END
	ELSE
	BEGIN
		SELECT 
				ID,
				RUCEMPRESA,
				NOMEMPRESA,
				NOMSEDE,
				NOMDEPARTAMENTO,
				NOMPROVINCIA,
				NOMDISTRITO,
				SECTORCLIENTE
		FROM #tmpClientesxAsignar
		ORDER BY ID,NOMEMPRESA
	END
END 