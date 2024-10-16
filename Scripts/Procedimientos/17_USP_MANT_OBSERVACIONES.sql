USE [DB_AHSECO]
GO


CREATE PROCEDURE [dbo].[USP_MANT_OBSERVACIONES] 
(
	@IsTipoProceso				CHAR(1)
	,@isID_WORKFLOW 			BIGINT
	,@isESTADO_INSTANCIA		VARCHAR(5)
	,@isOBSERVACION				VARCHAR(8000)
	,@isNOMBRE_USUARIO			VARCHAR(250)
	,@isPERFIL_USUARIO			VARCHAR(100)
	,@isUSR_REG					VARCHAR(50)
)
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		27.09.24		Realiza el mantenimiento de la tabla TBM_OBSERVACIONES con parametros.
  =======================================================================================================*/
AS
BEGIN
	DECLARE @CODDETALLE INT, @MSG VARCHAR(20)
	SELECT @CODDETALLE=0,@MSG='No se pudo realizar ninguna accion'
	SET NOCOUNT ON;

	IF (@IsTipoProceso = 'I')
		BEGIN
			INSERT INTO TBM_OBSERVACIONES(ID_WORKFLOW,ESTADO_INSTANCIA,OBSERVACION,NOMBRE_USUARIO,PERFIL_USUARIO,USR_REG,FEC_REG)
					VALUES(@isID_WORKFLOW,@isESTADO_INSTANCIA,@isOBSERVACION,@isNOMBRE_USUARIO,@isPERFIL_USUARIO,@isUSR_REG,GETDATE())
			SET  @CODDETALLE = @@IDENTITY
			SET @MSG ='Registro Insertado con éxito'
		END
	ELSE
		IF(@IsTipoProceso = 'D')
			BEGIN
				UPDATE TBM_OBSERVACIONES
				SET 
					ESTADO_INSTANCIA = @isESTADO_INSTANCIA
				WHERE ID_OBSERVACION = @isOBSERVACION

				SET  @CODDETALLE = 1
				SET @MSG ='Registro Eliminado con éxito'
			END
	SELECT @CODDETALLE COD, @MSG MSG
	SET NOCOUNT OFF;
END