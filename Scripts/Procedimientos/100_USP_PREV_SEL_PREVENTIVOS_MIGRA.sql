USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_PREV_SEL_PREVENTIVOS_MIGRA]

/*=======================================================================================================
	Nombre:				Fecha:				Descripcion:
	Diego Bazalar		28.11.24		Realiza el select de los mantenimientod preventivos.
	EXEC [USP_PREV_SEL_PREVENTIVOS_MIGRA] @IsNumSerie='0', @IsNumProc='0',@IsNumOrdCompra='0',@IsNumFianza='0',@IsEmpresa='0',@IsPeriodoInicio=NULL,@IsPeriodoFinal=NULL,@IsRUC='',@IsNomEquipo = '', @IsMarca='',@IsUbigeoDestino='', @IsModelo=''
=======================================================================================================*/
	--@IsNumSerie		VARCHAR(100)
	--,@IsNumProc			VARCHAR(15)
	--,@IsNumOrdCompra	VARCHAR(200)
	--,@IsEmpresa			VARCHAR(6)
	--,@IsPeriodoInicio	VARCHAR(7)
	--,@IsPeriodoFinal	VARCHAR(7)
	--,@IsRUC				VARCHAR(12)
	--,@IsNomEquipo		VARCHAR(100)
	--,@IsMarca			VARCHAR(60)
	--,@IsUbigeoDestino	VARCHAR(6)
	--,@IsModelo			VARCHAR(60)

AS
BEGIN
SET NOCOUNT ON	
	SELECT 
		ID_MANT
		,'' NUMREQ
		,SERIE
		,'' DESCRIPCION
		,'' MARCA
		,'' MODELO
		,'' NOMEMPRESA
		,ISNULL(FECHAINSTALACION,GETDATE()) FECHAINSTALACION
		,'' PROXFECHAMANT
		,0 TOTALPREVE
		,0 COMPLETADOS
		,0 PENDIENTES
		,'LIMA' UBIGEODEST
	FROM TBM_MANT_PREV
SET NOCOUNT OFF
END