USE [DB_AHSECO]
GO

CREATE  PROCEDURE [dbo].[USP_CONSULTA_HISTORIALCOTIZACION]
/*==========================================================================================
	Nombre					Fecha		Descripción
	José A. Peralta		21/10/24	Consulta el historial de cotizaciones.
  ==========================================================================================*/
@pId_Cotizacion INT,
@pId_Solicitud INT
AS
BEGIN

	SELECT
	ID_COTIZACION,
	ID_SOLICITUD,
	FEC_COTIZACION,
	ISNULL(IDCONTACTO,0) IDCONTACTO,
	NOMBRECONTACTO,
	AREACONTACTO,
	TELEFONOCONTACTO,
	EMAILCONTACTO,
	PLAZOENTREGA,
	FORMAPAGO,
	MONEDA,
	VIGENCIA,
	GARANTIA,
	ISNULL(OBSERVACION,'') OBSERVACION,
	ESTADO,
	USR_REG,
	ISNULL(CONVERT(varchar,FEC_REG,103) +' '+CONVERT(varchar,FEC_REG,8),'') FEC_REG,
	ISNULL(USR_MOD,'') USR_MOD,
	ISNULL(CONVERT(varchar,FEC_MOD,103) +' '+CONVERT(varchar,FEC_MOD,8),'') FEC_MOD
	FROM DBO.TBM_COTIZACIONVENTA WITH(NOLOCK)
	WHERE (ISNULL(@pId_Cotizacion,0) = 0 OR ID_COTIZACION = @pId_Cotizacion)
	AND (ISNULL(@pId_Solicitud,0) = 0 OR ID_SOLICITUD = @pId_Solicitud)
	AND  ESTADO = 'I';

END