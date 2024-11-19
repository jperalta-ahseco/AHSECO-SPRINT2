USE [DB_AHSECO]
GO


CREATE OR ALTER PROCEDURE [dbo].[USP_UPD_SOLICITUDVENTA_ESTADO]
/*=============================================================================================================
	Nombre:				Fecha:			Descripción:
	Samuel Gómez		21/10/24		Realiza la actualización de estados.
  =============================================================================================================*/
    @isIdSolicitud BIGINT,
	@isESTADO VARCHAR(5) = NULL,
	@isUsuarioModifica NVARCHAR(20)= NULL,
	@isIpMaqModifica VARCHAR(35)= NULL
AS
BEGIN
    UPDATE [dbo].[TBM_SOLICITUDVENTA]
    SET [ESTADO] = @isESTADO
	   ,[USR_MOD] = @isUsuarioModifica
	   ,[FEC_MOD] = GETDATE()
	   ,[IP_MOD] = @isIpMaqModifica
    WHERE ID_SOLICITUD = @isIdSolicitud
END
