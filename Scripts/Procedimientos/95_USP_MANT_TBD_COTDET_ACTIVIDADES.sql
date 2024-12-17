USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_MANT_TBD_COTDET_ACTIVIDADES] 
(
	 @pTipoProceso			CHAR(1)
	,@pID					BIGINT
	,@pID_COTDETALLE		BIGINT
	,@pCODACTIVIDAD			VARCHAR(50)
	,@pDESCACTIVIDAD		VARCHAR(200)
	,@pUsrEjecuta			VARCHAR(50)
	,@pFecEjecuta			DATETIME
)
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Samuel Gómez		17.12.24		Realiza el mantenimiento de la tabla TBD_COTDET_ACTIVIDADES con parametros.
  =======================================================================================================*/
AS
BEGIN

	DECLARE @ID INT, @MSG VARCHAR(20)
	
	SET NOCOUNT ON;
	
	IF (@pTipoProceso = 'I')
	BEGIN

		INSERT INTO TBD_COTDET_ACTIVIDADES
		(ID_COTDETALLE,CODACTIVIDAD,DESCACTIVIDAD,USR_REG,FEC_REG)
		VALUES
		(@pID_COTDETALLE,@pCODACTIVIDAD,@pDESCACTIVIDAD,@pUsrEjecuta,@pFecEjecuta)
		
		SET @ID = @@IDENTITY
		SET @MSG ='Registro Insertado con éxito'
		
	END
	
	IF (@pTipoProceso = 'U')
	BEGIN
		
		UPDATE TBD_COTDET_ACTIVIDADES SET 
		CODACTIVIDAD = @pCODACTIVIDAD, 
		DESCACTIVIDAD = @pDESCACTIVIDAD,
		USR_MOD = @pUsrEjecuta,
		FEC_MOD = @pFecEjecuta
		WHERE ID = @pID;
		
		SET @ID = @pID
		SET @MSG ='Registro Actualizado con éxito'

	END
	
	IF (@pTipoProceso = 'D')
	BEGIN
		
		DELETE FROM TBD_COTDET_ACTIVIDADES WHERE ID = @pID;
		
		SET @ID = @pID
		SET @MSG ='Registro eliminado con éxito'
		
	END
	
	SELECT @ID COD, @MSG MSG
	SET NOCOUNT OFF;
	
END