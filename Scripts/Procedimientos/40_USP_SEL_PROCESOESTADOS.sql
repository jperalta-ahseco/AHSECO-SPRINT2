USE [DB_AHSECO]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_SEL_PROCESOESTADOS]
/*============================================================================================
	Nombre:				Fecha:			Descripción:
	Samuel Gómez		22.10.24		Se realiza consulta de estados de procesos
  ============================================================================================*/
  @pID INT,
  @pIDPROCESO INT,
  @pCODESTADO VARCHAR(5)
  AS
  BEGIN

	SELECT 
	pe.[ID]
	,pe.[ID_PROCESO]
	,p.[NOMPROCESO]
	,pe.[COD_ESTADO]
	,pe.[NOM_ESTADO]
	,pe.[ABREV_ESTADO]
	,pe.[HABILITADO]
	FROM [dbo].[TBM_PROCESOESTADOS] pe
	INNER JOIN [dbo].[TBM_PROCESO] p ON pe.ID_PROCESO = p.ID
	WHERE (ISNULL(@pID,0) = 0 OR pe.ID = @pID)
	AND (ISNULL(@pIDPROCESO,0) = 0 OR pe.ID_PROCESO = @pIDPROCESO)
	AND (ISNULL(@pCODESTADO,'') = '' OR TRIM(pe.COD_ESTADO) = TRIM(@pCODESTADO));

  END