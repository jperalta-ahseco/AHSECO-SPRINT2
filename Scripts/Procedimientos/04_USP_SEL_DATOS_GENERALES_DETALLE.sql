USE [DB_AHSECO]
GO


ALTER PROCEDURE [dbo].[USP_SEL_DATOS_GENERALES_DETALLE]
/*=============================================================================================================
	Nombre:				Fecha:			Descripción:
	José A. Peralta		01.08.24		Realiza la consulta de la tabla datos generales detalle.
  =============================================================================================================*/
	@isDominio nvarchar(20),
	@inCabeceraId int = null,
	@inDetalleId int = null,
	@isParametro  nvarchar(10) = NULL,
	@inEstado int = NULL
AS
BEGIN
	 
	SELECT DG.ID,
	CAB.ID AS ID_CAB,
	DG.PARAMETRO,
	DG.DESCRIPCION,
	DG.COD_VALOR1,
	DG.COD_VALOR2,
	DG.COD_VALOR3,
	DG.VALOR1,
	DG.VALOR2,
	DG.VALOR3,
	DG.DOMINIO,
	DG.ESTADO,
	DG.EDITABLE,
	DG.HABILITADO
	FROM TBM_DATOS_GENERALES CAB
	INNER JOIN TBD_DATOS_GENERALES DG ON CAB.ID = DG.ID_CABECERA
	WHERE (ISNULL(@inCabeceraId,0) = 0 OR CAB.ID = @inCabeceraId)
	AND (ISNULL(@inDetalleId,0) = 0 OR DG.ID = @inDetalleId)
	AND ((ISNULL(@isDominio,'') = '' OR CAB.DOMINIO = @isDominio) AND DG.ESTADO = ISNULL(@inEstado,1))
	AND ((ISNULL(@isParametro,'')= '' OR DG.PARAMETRO = @isParametro) AND DG.ESTADO = ISNULL(@inEstado,1))

END

