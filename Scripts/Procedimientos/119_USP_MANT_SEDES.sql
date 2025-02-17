USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE USP_MANT_SEDES
/*====================================================================
	NOMBRE:					FECHA:		DESCRIPCIÓN:
	José A. Peralta		16.02.25		Se realiza mantenimiento de sedes:
  ====================================================================*/
@TIPO VARCHAR(1),
@IDSEDE BIGINT,
@IDCLIENTE BIGINT,
@NOMSEDE VARCHAR(150),
@ESTADO VARCHAR(1),
@USRREG VARCHAR(50)
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @CODIGO BIGINT,@MSG VARCHAR(250)
	SELECT @CODIGO=0,@MSG='No se pudo realizar ninguna accion'
	
	IF(@TIPO = 'I')
	BEGIN
			INSERT INTO TBM_SEDES (ID_CLIENTE,NOMSEDE,ESTADO,USR_REG,FEC_REG)
				VALUES(@IDCLIENTE,@NOMSEDE,@ESTADO,@USRREG,GETDATE())

		SET @CODIGO=1
		SET @MSG ='Se realizó el registro de la sede.'
	END
	IF(@TIPO = 'U')
	BEGIN
			UPDATE TBM_SEDES
			SET ID_CLIENTE = @IDCLIENTE,
					NOMSEDE = @NOMSEDE,
					ESTADO= @ESTADO,
					USR_MOD=@USRREG,
					FEC_MOD =GETDATE()
					WHERE ID_SEDE=@IDSEDE

		SET @CODIGO=1
		SET @MSG ='Se realizó la actualización de la sede.'
	END
	IF(@TIPO='D')
	BEGIN
		UPDATE TBM_SEDES
			SET ESTADO = 'I',
					USR_MOD=@USRREG,
					FEC_MOD =GETDATE()
					WHERE ID_SEDE=@IDSEDE

		SET @CODIGO=1
		SET @MSG ='Se realizó la eliminación de la sede.'
	END
	
		SELECT @CODIGO COD ,@MSG MSG
		SET NOCOUNT OFF;
END