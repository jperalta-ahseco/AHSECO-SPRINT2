USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_SEL_TBM_COTDET_DESPACHO]
(
@pId BIGINT,
@pId_CodDetalle BIGINT
)
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Samuel Gómez		03.11.24		Consulta de la tabla TBM_COTDET_DESPACHO con parametros.
  =======================================================================================================*/
AS
BEGIN

	SELECT 
	[ID]
    ,[ID_COTDETALLE]
    ,[INDINFOVIDEO]
    ,[INDINFOMANUAL]
    ,[INDINSTACAPA]
    ,[INDGARANADIC]
    ,[INDLLAVEMANO]
    ,[DIMENSIONES]
    ,[INDCOMPRALOCAL]
    ,[OBSCLIENTE]
    ,[INDREQUIEREPLACA]
    ,[OBSDESPACHO]
    ,[FECLIMINSTA]
    ,[MTOTOTALCOSTO]
    ,[INDFIANZA]
    ,[NUMFIANZA]
    ,[MONTOPPRINC]
    ,[MONTOPACCE]
	FROM [DB_AHSECO].[dbo].[TBM_COTDET_DESPACHO]
	WHERE (@pId IS NULL OR [ID] = @pId)
	AND (@pId_CodDetalle IS NULL OR [ID_COTDETALLE] = @pId_CodDetalle)

END