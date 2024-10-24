USE [DB_AHSECO]
GO

ALTER PROCEDURE [dbo].[USP_UPD_DATOS_GENERALES_CABECERA](
/*=============================================================================================================
	Nombre:				Fecha:			Descripción:
	José A. Peralta		01.08.24		Realiza la actualizacion de registros de la tabla datos generales cabecera.
  =============================================================================================================*/
    @inCabeceraId INT,
    @isDescripcion NVARCHAR(50) = NULL,
    @isUsuarioModifica varchar(50) = null,
	@isPuedeCrecer INT=NULL
)AS
BEGIN
    UPDATE TBM_DATOS_GENERALES
    SET DESCRIPCION = @isDescripcion
	 ,PUEDE_CRECER=@isPuedeCrecer
	  ,AUDIT_USR = @isUsuarioModifica
	  ,AUDIT_TIMESTAMP =GETDATE()
    WHERE ID = @inCabeceraId
END
