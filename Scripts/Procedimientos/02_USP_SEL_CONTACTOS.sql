USE [DB_AHSECO]
GO

ALTER PROCEDURE [dbo].[USP_SEL_CONTACTOS]
(
@isIdCliente BIGINT
)
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		02.09.24		Realiza el select de la tabla contactos con relación al idcliente.
	EXEC [USP_SEL_CONTACTOS] 10
  =======================================================================================================*/
AS
BEGIN
DECLARE @sql NVARCHAR(MAX)
SET @sql = '
			SELECT 
			 [IDCONTACTO],
			 ISNULL([TIPDOCCONTACTO],'''')				AS [CODTIPDOCCONTACTO],
			 ISNULL([datos].[DESCRIPCION],'''')			AS [TIPDOCCONTACTO],
			 ISNULL([NUMDOCCONTACTO],'''')				AS [NUMDOCCONTACTO],
			 ISNULL([NOMBRE CONTACTO],'''')				AS [NOMBRE CONTACTO],
			 ISNULL([ESTABLECIMIENTO],'''')				AS [ESTABLECIMIENTO],
			 ISNULL([AREACONTACTO],'''')				AS [AREACONTACTO],
			 ISNULL([TELEFONOCONTACTO],'''')			AS [TELEFONOCONTACTO],
			 ISNULL([TELEFONO2CONTACTO],'''')			AS [TELEFONO2CONTACTO],
			 ISNULL([CARGOCONTACTO],'''')				AS [CARGOCONTACTO],
			 ISNULL([CORREOCONTACTO],'''')				AS [CORREOCONTACTO],
			 [contacto].[ESTADO]						AS [CODESTADO],
			 CASE [contacto].[ESTADO]
				WHEN 1 THEN ''ACTIVO''
				ELSE ''INACTIVO'' END					AS [ESTADO]
			FROM [dbo].[TBM_CONTACTOS] contacto
			LEFT JOIN [dbo].[TBD_DATOS_GENERALES] datos ON contacto.[TIPDOCCONTACTO] = datos.[PARAMETRO]
			WHERE [ID_CLIENTE] = '+CAST(@isIdCliente AS VARCHAR(25))+'
			'

EXEC sp_executesql @sql
END