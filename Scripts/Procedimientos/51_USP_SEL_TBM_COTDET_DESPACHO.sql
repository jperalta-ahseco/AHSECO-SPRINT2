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
    ,[INDINSTALACION]
    ,[INDCAPACITACION]
    ,[INDGARANADIC]
    ,[CODGARANADIC]
	,[INDMANTPREVENT]
	,[INDCALIB]
    ,[DIMENSIONES]
    ,[INDCOMPRALOCAL]
	,[INDFLETE]
    ,[OBSCLIENTE]
    ,[OBSDESPACHO]
    ,[MTOTOTALCOSTO]
    ,[INDFIANZA]
    ,[NUMFIANZA]
    ,[MONTOPPRINC]
    ,[MONTOPACCE]
	FROM [DB_AHSECO].[dbo].[TBM_COTDET_DESPACHO]
	WHERE (ISNULL(@pId,0) = 0 OR [ID] = @pId)
	AND (ISNULL(@pId_CodDetalle,0) = 0 OR [ID_COTDETALLE] = @pId_CodDetalle)

END