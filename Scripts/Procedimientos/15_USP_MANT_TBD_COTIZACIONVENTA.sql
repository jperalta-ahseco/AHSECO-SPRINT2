USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_MANT_TBD_COTIZACIONVENTA] 
(
	 @isTipoProceso			CHAR(1)
	,@isID					BIGINT
	,@isID_COTIZACION		BIGINT
	,@isNROITEM				INT
	,@isTIPOITEM			VARCHAR(5)
	,@isCODITEM				VARCHAR(35)
	,@isDESCRIPCION			VARCHAR(100)
	,@isDESCRIPADIC			VARCHAR(1000)
	,@isSTOCK				INT
	,@isUNDMED				VARCHAR(3)
	,@isCANTIDAD			INT
	,@isCOSTOFOB			DECIMAL(18,9)
	,@isVVENTAUNI			DECIMAL(18,9)
	,@isUsrEjecuta			VARCHAR(50)
	,@isFecEjecuta			DATETIME
)
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		27.09.24		Realiza el mantenimiento de la tabla TBD_COTIZACIONVENTA con parametros.
  =======================================================================================================*/
AS
BEGIN
	DECLARE @CODDETALLE INT, @MSG VARCHAR(20)
	SET NOCOUNT ON;

	IF (@isTipoProceso = 'I')
	BEGIN
		INSERT INTO TBD_COTIZACIONVENTA
		(ID_COTIZACION,NROITEM,TIPOITEM,CODITEM,DESCRIPCION,DESCRIPADIC,STOCK,UNDMED,CANTIDAD,COSTOFOB,VVENTAUNI,USR_REG,FEC_REG)
		VALUES
		(@isID_COTIZACION,@isNROITEM,@isTIPOITEM,@isCODITEM,@isDESCRIPCION,@isDESCRIPADIC,@isSTOCK,@isUNDMED,@isCANTIDAD,@isCOSTOFOB,@isVVENTAUNI,@isUsrEjecuta,@isFecEjecuta)
		SET  @CODDETALLE = @@IDENTITY
		SET @MSG ='Registro Insertado con éxito'
	END

	IF(@isTipoProceso = 'U')
	BEGIN
		UPDATE TBD_COTIZACIONVENTA
		SET 
		NROITEM = @isNROITEM
		,TIPOITEM = @isTIPOITEM
		,CODITEM = @isCODITEM
		,DESCRIPCION = @isDESCRIPCION
		,DESCRIPADIC	= @isDESCRIPADIC		
		,STOCK		= @isSTOCK
		,UNDMED			= @isUNDMED
		,CANTIDAD		= @isCANTIDAD			
		,COSTOFOB	= @isCOSTOFOB
		,VVENTAUNI	= @isVVENTAUNI
		,USR_MOD		= @isUsrEjecuta		
		,FEC_MOD		= @isFecEjecuta
		WHERE ID = @isID
		SET  @CODDETALLE = 1
		SET @MSG ='Registro Actualizado con éxito'
	END

	SELECT @CODDETALLE COD, @MSG MSG
	SET NOCOUNT OFF;
END