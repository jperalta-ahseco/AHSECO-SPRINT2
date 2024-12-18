USE [DB_AHSECO]
GO
/****** Object:  StoredProcedure [dbo].[USP_UPD_SEGURIDAD_PERFIL]    Script Date: 21/10/2024 14:01:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
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
