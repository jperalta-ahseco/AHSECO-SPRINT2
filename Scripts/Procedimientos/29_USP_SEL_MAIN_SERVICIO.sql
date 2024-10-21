USE [DB_AHSECO]
GO

CREATE PROCEDURE [dbo].[USP_SEL_MAIN_SERVICIO] 
(
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		17.10.24		Realiza el multi-select relacionados con el servicio.
=======================================================================================================*/
	@isId BIGINT
)
AS
BEGIN
	EXEC [USP_SEL_SERVICIO] @isIdServicio = @isId
	
	EXEC [USP_SEL_TBD_SERVICIO] @isIdServicio = @isId
END