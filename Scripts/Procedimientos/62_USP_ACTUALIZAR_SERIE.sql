USE [DB_AHSECO]
GO


CREATE OR ALTER PROCEDURE [dbo].[USP_ACTUALIZAR_SERIE] 
(
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Jose Peralta		14.11.24		Realiza la actualizacion de series por codigo detalle de despacho
	EXEC [USP_ACTUALIZAR_SERIE]  1,'XXXXX'
=======================================================================================================*/
	@IDDETALLEDESPACHO BIGINT,
	@NUMSERIE VARCHAR(50)
)
AS
BEGIN
		SET NOCOUNT ON;

		DECLARE @CODIGO BIGINT,@MSG VARCHAR(250)

		BEGIN TRY
			UPDATE TBD_DESPACHO_DIST
				SET NUMSERIE = @NUMSERIE
				WHERE ID= @IDDETALLEDESPACHO

				SET @CODIGO=1
				SET @MSG ='Se actualizo el numero de serie de manera correcta'

		END TRY
		BEGIN CATCH
			SET @CODIGO = 0
			SET @MSG=ERROR_MESSAGE();
		END CATCH


		SELECT @CODIGO COD ,@MSG MSG

		SET NOCOUNT OFF;


END