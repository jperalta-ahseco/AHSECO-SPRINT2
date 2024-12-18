USE [DB_AHSECO]
GO


ALTER PROCEDURE [dbo].[USP_UPD_DATOS_GENERALES_DETALLE]
/*=============================================================================================================
	Nombre:				Fecha:			Descripción:
	José A. Peralta		01.08.24		Realiza la actualizacion de registros de la tabla datos generales detalle.
  =============================================================================================================*/
	@inDetalleId INT = NULL,
	@inCabeceraId INT = NULL,
	@isDescripcion NVARCHAR(140) = NULL,
	@isValor1 NVARCHAR(20) = NULL,
	@isValor2 NVARCHAR(20)= NULL,
	@isValor3 NVARCHAR(20) = NULL,
	@inValor1 NVARCHAR(200) = null,
	@inValor2 NVARCHAR(200) = null,
	@inValor3 NVARCHAR(200) = null,
	@iSHabilitado BIT = null,
	@inEstado INT = NULL,
	@isEditable INT=NULL,
	@isUsuarioId NVARCHAR(20) = NULL
AS
BEGIN
	UPDATE TBD_DATOS_GENERALES
	SET ID_CABECERA = @inCabeceraId,
		DESCRIPCION = @isDescripcion,
		COD_VALOR1 = @isValor1,
		COD_VALOR2 = @isValor2,
		COD_VALOR3 = @isValor3,
		VALOR1 = @inValor1,
		VALOR2 = @inValor2,
		VALOR3 = @inValor3,
		HABILITADO = @iSHabilitado,
		ESTADO = @inEstado,
		EDITABLE=@isEditable,
		AUDIT_USR = @isUsuarioId,
		AUDIT_TIMESTAMP = SYSDATETIME()
	WHERE ID = @inDetalleId
END