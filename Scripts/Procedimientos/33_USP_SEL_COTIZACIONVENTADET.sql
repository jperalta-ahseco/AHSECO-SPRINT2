USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_SEL_COTIZACIONVENTADETALLE]
/*==========================================================================================
	Nombre			Fecha		Descripción
	Samuel Gómez	16/10/24	Creación
  ==========================================================================================*/
@pId_Cotizacion INT
AS
BEGIN

	SELECT
	ID,
	ID_COTIZACION,
	NROITEM,
	TIPOITEM,
	CODITEM,
	DESCRIPCION,
	STOCK,
	UNIDAD,
	CANTIDAD,
	COSTOFOB,
	VVENTAUNI,
	VVTOTALSIGV,
	PORCGANANCIA,
	VVTOTALCGAN,
	USR_REG,
	FEC_REG,
	USR_MOD,
	FEC_MOD
	FROM DBO.TBD_COTIZACIONVENTA
	WHERE (@pId_Cotizacion IS NULL OR ID_COTIZACION = @pId_Cotizacion);

END