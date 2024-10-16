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
     IF (@inCabeceraId iS NOT NULL AND @inCabeceraId > 0)
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
	   FROM TBM_DATOS_GENERALES CAB, TBD_DATOS_GENERALES DG
	   WHERE CAB.ID = DG.ID_CABECERA
	   AND CAB.ID = @inCabeceraId
	END
	ELSE IF (@inDetalleId iS NOT NULL AND @inDetalleId > 0)
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
	   FROM TBM_DATOS_GENERALES CAB, TBD_DATOS_GENERALES DG
	   WHERE CAB.ID = DG.ID_CABECERA
	   AND DG.ID = @inDetalleId
	END
	ELSE IF(@isParametro IS NULL OR LEN(LTRIM(RTRIM(@isParametro))) < 1)
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
	   FROM TBM_DATOS_GENERALES CAB, TBD_DATOS_GENERALES DG
	   WHERE CAB.ID = DG.ID_CABECERA
	   AND CAB.DOMINIO = @isDominio
	   AND DG.ESTADO = 1
	END
	ELSE
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
	   FROM TBM_DATOS_GENERALES CAB, TBD_DATOS_GENERALES DG
	   WHERE CAB.ID = DG.ID_CABECERA
	   AND CAB.DOMINIO = @isDominio
	   AND DG.PARAMETRO = @isParametro
	   AND DG.ESTADO = 1
	END
END

