USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_MANT_TBD_COTIZACIONVENTA] 
(
	 @isTipoProceso			CHAR(1)
	,@isID_DETALLE			BIGINT
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
	,@isVVTOTALSIGV			DECIMAL(18,9)
	,@isPORCGANANCIA		DECIMAL(9,9)
	,@isVVTOTALSIGVCGAN		DECIMAL(18,9)
	,@isMONTODSCTO			DECIMAL(18,9)
	,@isVVTOTALSIGVDSCTO	DECIMAL(18,9)
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
			(ID_COTIZACION,NROITEM,TIPOITEM,CODITEM,DESCRIPCION,UNDMED,CANTIDAD,USR_REG,FEC_REG)
			VALUES
			(@isID_COTIZACION,@isNROITEM,@isTIPOITEM,@isCODITEM,@isDESCRIPCION,@isUNDMED,@isCANTIDAD,@isUsrEjecuta,@isFecEjecuta)
			SET  @CODDETALLE = @@IDENTITY
			SET @MSG ='Registro Insertado con éxito'
		END
	ELSE
	BEGIN
		IF(@isTipoProceso = 'U')
			BEGIN
				UPDATE TBD_COTIZACIONVENTA
				SET 
					ID_COTIZACION	= @isID_COTIZACION	
					,DESCRIPCION	= @isDESCRIPCION		
					,UNDMED			= @isUNDMED
					,CANTIDAD		= @isCANTIDAD			
					,USR_MOD		= @isUsrEjecuta		
					,FEC_MOD		= @isFecEjecuta
				WHERE ID = @isID_DETALLE

				SET  @CODDETALLE = 1
				SET @MSG ='Registro Actualizado con éxito'
			END
	END

	SELECT @CODDETALLE COD, @MSG MSG
	SET NOCOUNT OFF;
END