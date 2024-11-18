USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_UPD_ENVIODESPACHO] 
(
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Jose Peralta		14.11.24		Realiza la actualizacion de los envios de documento de despacho.
	EXEC [USP_UPD_ENVIODESPACHO]  20,'',1,1,'jperalta'
=======================================================================================================*/
	@isIdSolicitud BIGINT,
	@STOCK CHAR(1),
	@ENVIOGP INT,
	@ENVIOBO INT,
	@USER VARCHAR(50)
)
AS
BEGIN

SET NOCOUNT ON;
DECLARE @CODIGO BIGINT,@MSG VARCHAR(250)

	BEGIN TRY
		UPDATE TBM_DESPACHO
		SET ENVIOGP=CASE WHEN @ENVIOGP> 1 THEN ENVIOGP ELSE @ENVIOGP END,
		   ENVIOBO = CASE WHEN @ENVIOBO> 1 THEN ENVIOBO ELSE @ENVIOGP END,
		   USR_MOD = @USER,
		   FEC_MOD = GETDATE()
		   WHERE ID_SOLICITUD  =@isIdSolicitud
		   AND STOCK = CASE WHEN LEN(@STOCK)>0 THEN @STOCK ELSE STOCK END;

	   		SET  @CODIGO = 1
			SET @MSG ='Se realizo la actualizacion del registro'
	END TRY
	BEGIN CATCH
			SET @CODIGO = 0
			SET @MSG=ERROR_MESSAGE();
	END CATCH

	SELECT @CODIGO COD ,@MSG MSG

	SET NOCOUNT OFF;

END