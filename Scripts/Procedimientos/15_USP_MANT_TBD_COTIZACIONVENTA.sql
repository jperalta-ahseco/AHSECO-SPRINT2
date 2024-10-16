USE [DB_AHSECO]
GO


CREATE PROCEDURE [dbo].[USP_MANT_TBD_COTIZACIONVENTA] 
(
	 @isTipoProceso		CHAR(1)
	,@isID_DETALLE		BIGINT
	,@isID_COTIZACION	BIGINT
	,@isTIPO			VARCHAR(5)
	,@isTIPOPRODUCTO	VARCHAR(5)
	,@isCODPRODUCTO		VARCHAR(35)
	,@isDESCRIPCION		VARCHAR(500)
	,@isUNIDAD			VARCHAR(10)
	,@isCANTIDAD		INT
	,@isCOSTOFOB		DECIMAL(18,9)
	,@isVVENTAUNI		DECIMAL(18,9)
	,@isVVTOTALSIGV		DECIMAL(18,2)
	,@isELIMINADO		BIT
	,@isUsrEjecuta		VARCHAR(50)
	,@isFecEjecuta		DATETIME
)
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		27.09.24		Realiza el mantenimiento de la tabla TBD_COTIZACIONVENTA con parametros.
  =======================================================================================================*/
AS
BEGIN
	DECLARE @CODDETALLE INT, @MSG VARCHAR(20)
	SELECT @CODDETALLE=0,@MSG='No se pudo realizar ninguna accion'
	SET NOCOUNT ON;

	IF (@isTipoProceso = 'I')
		BEGIN
			INSERT INTO TBD_COTIZACIONVENTA(ID_COTIZACION,DESCRIPCION,UNIDAD,CANTIDAD,ELIMINADO,USR_REG,FEC_REG)
					VALUES(@isID_COTIZACION,@isDESCRIPCION,@isUNIDAD,@isCANTIDAD,@isELIMINADO,@isUsrEjecuta,@isFecEjecuta)
			SET  @CODDETALLE = @@IDENTITY
			SET @MSG ='Registro Insertado con éxito'
		END
	ELSE
		IF(@isTipoProceso = 'U')
			BEGIN
				UPDATE TBD_COTIZACIONVENTA
				SET 
					ID_COTIZACION	= @isID_COTIZACION	
					,DESCRIPCION	= @isDESCRIPCION		
					,UNIDAD			= @isUNIDAD
					,CANTIDAD		= @isCANTIDAD		
					,ELIMINADO		= @isELIMINADO		
					,USR_MOD		= @isUsrEjecuta		
					,FEC_MOD		= @isFecEjecuta
				WHERE ID = @isID_DETALLE

				SET  @CODDETALLE = 1
				SET @MSG ='Registro Actualizado con éxito'
			END
		ELSE
			IF(@isTipoProceso = 'D')
			BEGIN
				UPDATE TBD_COTIZACIONVENTA
				SET 
					ELIMINADO		= @isELIMINADO		
					,USR_MOD		= @isUsrEjecuta		
					,FEC_MOD		= @isFecEjecuta
				WHERE ID = @isID_DETALLE

				SET  @CODDETALLE = 1
				SET @MSG ='Registro Eliminado con éxito'
			END
	SELECT @CODDETALLE COD, @MSG MSG
	SET NOCOUNT OFF;
END