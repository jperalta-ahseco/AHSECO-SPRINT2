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
	,@isINDSTOCK			CHAR(1)
	,@isUNDMED				VARCHAR(3)
	,@isCANTIDAD			INT
	,@isCOSTOFOB			DECIMAL(18,9)
	,@isVVENTAUNI			DECIMAL(18,9)
	,@isPORCGANANCIA		DECIMAL(18,9)
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
	DECLARE @NUM INT
	SET NOCOUNT ON;

	IF (@isTipoProceso = 'I')
	BEGIN
		INSERT INTO TBD_COTIZACIONVENTA
		(ID_COTIZACION,NROITEM,TIPOITEM,CODITEM,DESCRIPCION,DESCRIPADIC,STOCK,INDSTOCK,UNDMED,CANTIDAD,COSTOFOB,VVENTAUNI,PORCGANANCIA,USR_REG,FEC_REG)
		VALUES
		(@isID_COTIZACION,@isNROITEM,@isTIPOITEM,@isCODITEM,@isDESCRIPCION,@isDESCRIPADIC,@isSTOCK,@isINDSTOCK,@isUNDMED,@isCANTIDAD,@isCOSTOFOB,@isVVENTAUNI,@isPORCGANANCIA,@isUsrEjecuta,@isFecEjecuta)
		SET  @CODDETALLE = @@IDENTITY
		SET @MSG ='Registro Insertado con �xito'
	END

	IF(@isTipoProceso = 'U')
	BEGIN

		UPDATE TBD_COTIZACIONVENTA
		SET 
		NROITEM = @isNROITEM
		,TIPOITEM = @isTIPOITEM
		,CODITEM = @isCODITEM
		,DESCRIPCION = @isDESCRIPCION
		,DESCRIPADIC = @isDESCRIPADIC		
		,STOCK = @isSTOCK
		,INDSTOCK = @isINDSTOCK
		,UNDMED = @isUNDMED
		,CANTIDAD = @isCANTIDAD			
		,COSTOFOB = @isCOSTOFOB
		,VVENTAUNI = @isVVENTAUNI
		,PORCGANANCIA = @isPORCGANANCIA
		,USR_MOD = @isUsrEjecuta		
		,FEC_MOD = @isFecEjecuta
		WHERE ID = @isID

		--Se actualiza el Total Sin IGV
		IF @isVVENTAUNI IS NOT NULL BEGIN
			UPDATE TBD_COTIZACIONVENTA
			SET 
			VVTOTALSIGV = ISNULL(CANTIDAD,0) * ISNULL(VVENTAUNI,0)
			WHERE ID = @isID
		END
		
		--Se actualiza el Total Sin IGV pero con Ganancia
		IF @isPORCGANANCIA IS NOT NULL BEGIN
			UPDATE TBD_COTIZACIONVENTA
			SET 
			VVTOTALSIGVCGAN = CASE WHEN PORCGANANCIA > 0 THEN VVTOTALSIGV + (VVTOTALSIGV * (PORCGANANCIA / 100)) ELSE 0 END
			WHERE ID = @isID AND VVTOTALSIGV IS NOT NULL
		END

		--Se valida si se termino la valorizacion por parte de los Jefes
		SELECT @NUM = COUNT(1) FROM TBD_COTIZACIONVENTA 
		WHERE ID_COTIZACION = @isID_COTIZACION AND COSTOFOB IS NULL AND VVENTAUNI IS NULL

		IF @NUM > 0 BEGIN
			UPDATE TBM_COTIZACIONVENTA SET INDVALORIZADO = NULL WHERE ID_COTIZACION = @isID_COTIZACION
		END
		ELSE BEGIN
			
			SELECT @NUM = COUNT(1) FROM TBD_COTIZACIONVENTA 
			WHERE ID_COTIZACION = @isID_COTIZACION AND (ISNULL(COSTOFOB,0) = 0 OR ISNULL(VVENTAUNI,0) = 0)
			IF @NUM > 0 BEGIN
				UPDATE TBM_COTIZACIONVENTA SET INDVALORIZADO = 'N' WHERE ID_COTIZACION = @isID_COTIZACION
			END
			ELSE BEGIN
				UPDATE TBM_COTIZACIONVENTA SET INDVALORIZADO = 'S' WHERE ID_COTIZACION = @isID_COTIZACION
			END
			
		END

		SET  @CODDETALLE = @isID
		SET @MSG ='Registro Actualizado con �xito'
	END

	IF(@isTipoProceso = 'D')
	BEGIN
		DELETE FROM TBD_COTIZACIONVENTA WHERE ID = @isID
		SET  @CODDETALLE = @isID
		SET @MSG ='Registro eliminado con �xito'
	END

	SELECT @CODDETALLE COD, @MSG MSG
	SET NOCOUNT OFF;
END