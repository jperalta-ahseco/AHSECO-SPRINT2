USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_VAL_APROBACION_SINSTOCK] 
(
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Jose Peralta		14.11.24		Realiza consulta de la validacion del APROBACION.
	EXEC [USP_VAL_APROBACION_SINSTOCK]  20
=======================================================================================================*/
	@isIdSolicitud BIGINT
)
AS
BEGIN

	SELECT ISNULL(ESTAPROB,'') ESTADO ,
	ISNULL(CONVERT(VARCHAR,FECAPROB,103),'') FECAPROB,
	ISNULL(OBSERVACION,'') OBSERVACION,
	ISNULL(NUMPEDIDO,'') NUMPEDIDO,
	ISNULL(CONVERT(VARCHAR,FECHAINGRESO,103),'') FECHAINGRESO
	FROM TBM_DESPACHO WITH(NOLOCK) WHERE ID_SOLICITUD=@isIdSolicitud AND STOCK='N'

END