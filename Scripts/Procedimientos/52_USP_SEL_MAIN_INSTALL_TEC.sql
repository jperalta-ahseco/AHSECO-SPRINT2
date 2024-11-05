USE[DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE[dbo].[USP_SEL_MAIN_INSTALL_TEC]
(
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	DiegoBazalar		03.11.24		RealizaelselectmaindelatablaTBD_INSTALACIONyTBM_INSTALACION
	[USP_SEL_MAIN_INSTALL_TEC] 1
=======================================================================================================*/
	@isNumReq BIGINT,
	@isIdWorkFlow BIGINT
)
AS
BEGIN
	--Instalacion
	EXEC [dbo].[USP_SEL_INSTALL_TEC] @IsRequerimiento = @isNumReq, @IsEstado='' ,@IsDestino='' ,@IsVendedor='' ,@IsRuc='' ,@IsCodEmpresa='' ,@IsTipVenta='0' ,@IsNumProceso='' ,@IsNumContrato='' ,@IsNumOrdenCompra='' ,@IsNumFianza=''
	--Detalle de instalacion
	EXEC [dbo].[USP_SEL_DETALLE_INSTALL] @isNumReq = @isNumReq 
	--Documentos adjuntos:
	EXEC [USP_CONSULTA_DOCUMENTOS] @isIdWorkFlow
	--Detalle de Observaciones :
	EXEC [USP_SEL_OBSERVACIONES] @isIdWorkFlow
END