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
	DECLARE @CANTREG INT
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
		
		EXEC USP_UPD_TOTALIZAR_COTDET @CODDETALLE

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
		
		SELECT @CANTREG = COUNT(1) FROM TBD_COTIZACIONVENTA WHERE ID_COTIZACION = @isID_COTIZACION;

		--Se valida si se termino la valorizacion por parte de los Jefes
		SELECT @NUM = SUM(CASE ISNULL(CD.INDSTOCK,'') 
							WHEN 'S' THEN (CASE WHEN ISNULL(VVENTAUNI,0) > 0 THEN 1 ELSE 0 END) 
							ELSE (CASE WHEN ISNULL(COSTOFOB,0) > 0 AND ISNULL(VVENTAUNI,0) > 0 THEN 1 ELSE 0 END) 
							END) 
		FROM TBD_COTIZACIONVENTA CD
		INNER JOIN TBM_COTIZACIONVENTA C ON CD.ID_COTIZACION = C.ID_COTIZACION
		WHERE CD.ID_COTIZACION = @isID_COTIZACION;

		IF @NUM = 0 BEGIN
			UPDATE TBM_COTIZACIONVENTA SET INDVALORIZADO = NULL WHERE ID_COTIZACION = @isID_COTIZACION
		END
		ELSE BEGIN
			
			IF @CANTREG > @NUM BEGIN
				UPDATE TBM_COTIZACIONVENTA SET INDVALORIZADO = 'N' WHERE ID_COTIZACION = @isID_COTIZACION
			END
			ELSE BEGIN
				UPDATE TBM_COTIZACIONVENTA SET INDVALORIZADO = 'S' WHERE ID_COTIZACION = @isID_COTIZACION
			END
			
		END

		EXEC USP_UPD_TOTALIZAR_COTDET @isID

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