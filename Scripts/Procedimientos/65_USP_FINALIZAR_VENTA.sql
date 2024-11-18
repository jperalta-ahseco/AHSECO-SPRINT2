USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_FINALIZAR_VENTA] 
(
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Jose Peralta		14.11.24		Realiza consulta de la validacion del despacho.
	EXEC [USP_FINALIZAR_VENTA]  20,'VENDEDOR','JPERALTA'
=======================================================================================================*/
	@isIdSolicitud BIGINT,
	@NOMPERFIL VARCHAR(100),
	@USRREG VARCHAR(50)
)
AS
BEGIN

	SET NOCOUNT ON;
	DECLARE @ESTADO VARCHAR(6),@ID_WORKFLOW BIGINT
	DECLARE @CODIGO BIGINT,@MSG VARCHAR(250)

	
	SELECT @CODIGO=0,@MSG='No se pudo Finalizar la venta, el proceso de instalación no ha finalizado'

	SELECT @ESTADO=ESTADO FROM TBM_INSTALACION WITH(NOLOCK) WHERE ID_SOLICITUD=@isIdSolicitud

	SELECT @ID_WORKFLOW=ID_WORKFLOW FROM TBM_SOLICITUDVENTA WITH(NOLOCK) WHERE ID_SOLICITUD=@isIdSolicitud

	IF(@ESTADO = 'STINS')
	BEGIN

		--CAMBIO DE ESTADO DE LA SOLICITUD: Venta Finalizada: (SFIN) 
		UPDATE TBM_SOLICITUDVENTA 
			SET ESTADO='SFIN'
			WHERE ID_SOLICITUD=@isIdSolicitud;

		--SE REGISTRA LOG DE CAMBIO DE ESTADO:

		INSERT INTO TBM_WORKFLOWLOG(ID_WORKFLOW,COD_ESTADO,CARGO,AUDIT_REG_USR,AUDIT_REG_FEC)
		VALUES(@ID_WORKFLOW,'SFIN',@NOMPERFIL,@USRREG,GETDATE());
			


		SET  @CODIGO = 1
		SET @MSG ='Se realizó la finalización de la venta'
	END

	SELECT @CODIGO COD ,@MSG MSG

	SET NOCOUNT OFF;

END
