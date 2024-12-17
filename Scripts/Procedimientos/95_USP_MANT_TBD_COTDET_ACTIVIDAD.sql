USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_MANT_TBD_COTDET_ACTIVIDAD] 
(
	 @pTipoProceso			CHAR(1)
	,@pID					BIGINT
	,@pID_COTDETALLE		BIGINT
	,@pCODACTIVIDAD			VARCHAR(50)
	,@pDESCACTIVIDAD		VARCHAR(200)
	,@pUsrEjecuta			VARCHAR(50)
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

		INSERT INTO TBD_COTDET_ACTIVIDAD
		(ID_COTDETALLE,CODACTIVIDAD,DESCACTIVIDAD,USR_REG,FEC_REG)
		VALUES
		(@pID_COTDETALLE,@pCODACTIVIDAD,@pDESCACTIVIDAD,@pUsrEjecuta,GETDATE())
		
		SET @ID = @@IDENTITY
		SET @MSG ='Registro Insertado con éxito'
		
	END
	
	IF (@pTipoProceso = 'U')
	BEGIN
		
		UPDATE TBD_COTDET_ACTIVIDAD SET 
		CODACTIVIDAD = @pCODACTIVIDAD, 
		DESCACTIVIDAD = @pDESCACTIVIDAD,
		USR_MOD = @pUsrEjecuta,
		FEC_MOD = GETDATE()
		WHERE ID = @pID;
		
		SET @ID = @pID
		SET @MSG ='Registro Actualizado con éxito'

	END
	
	IF (@pTipoProceso = 'D')
	BEGIN
		
		DELETE FROM TBD_COTDET_ACTIVIDAD WHERE 
		(ISNULL(@pID,0) = 0 OR ID = @pID)
		OR ((ISNULL(@pID_COTDETALLE,0) = 0 OR ID_COTDETALLE = @pID_COTDETALLE));
		
		SET @ID = @pID
		SET @MSG ='Registro eliminado con éxito'
		
	END
	
	SELECT @ID COD, @MSG MSG
	SET NOCOUNT OFF;
	
END