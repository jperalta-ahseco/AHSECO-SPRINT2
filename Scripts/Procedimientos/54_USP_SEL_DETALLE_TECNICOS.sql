USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_SEL_DETALLE_TECNICOS]
(
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		05.11.24		Realiza el select de los técnicos por detalle.
	[USP_SEL_DETALLE_TECNICOS] 10006
  =======================================================================================================*/
	@isCodDetalle BIGINT
)
AS
BEGIN
	SELECT
		ID
		,ID_DETALLE
		,COD_TECNICO
		,NOMBRETECNICO
		,DOCUMENTO
		,TIPO_DOCUMENTO
		,CORREO
		,TELEFONO
		,ZONA
		,TIPOTECNICO
		,ESTADO
	FROM
	TBD_TECNICOINSTALACION
	WHERE ID_DETALLE = @isCodDetalle
	AND ESTADO = 1--Estado Activo
END
