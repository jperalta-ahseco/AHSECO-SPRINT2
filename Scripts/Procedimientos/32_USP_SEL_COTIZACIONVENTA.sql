USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_SEL_COTIZACIONVENTA]
/*==========================================================================================
	Nombre			Fecha		Descripción
	Samuel Gómez	16/10/24	Creación
  ==========================================================================================*/
@pId_Cotizacion INT,
@pId_Solicitud INT,
@pFec_Cotizacion DATETIME,
@pEstado VARCHAR(1)
AS
BEGIN

	SELECT
	ID_COTIZACION,
	ID_SOLICITUD,
	FEC_COTIZACION,
	IDCONTACTO,
	NOMBRECONTACTO,
	AREACONTACTO,
	TELEFONOCONTACTO,
	EMAILCONTACTO,
	PLAZOENTREGA,
	FORMAPAGO,
	MONEDA,
	VIGENCIA,
	GARANTIA,
	OBSERVACION,
	ESTADO,
	USR_REG,
	FEC_REG,
	USR_MOD,
	FEC_MOD
	FROM DBO.TBM_COTIZACIONVENTA
	WHERE (ISNULL(@pId_Cotizacion,0) = 0 OR ID_COTIZACION = @pId_Cotizacion)
	AND (ISNULL(@pId_Solicitud,0) = 0 OR ID_SOLICITUD = @pId_Solicitud)
	AND (@pFec_Cotizacion IS NULL OR FEC_COTIZACION = @pFec_Cotizacion)
	AND (@pEstado IS NULL OR ESTADO = @pEstado);

END