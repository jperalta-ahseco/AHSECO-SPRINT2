USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE USP_TOTAL_DESPACHO
/*==================================================================================================
	NOMBRE:					FECHA:		DESCRIPCIÓN:
	Diego A. Bazalar		26.02.25	Se realiza el cálculo total del despacho.
	EXEC USP_TOTAL_DESPACHO
  ==================================================================================================*/
	@IsCodSolDespacho BIGINT
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @MontoDscto DECIMAL(18,9), @MargenAdicional DECIMAL(18,9),  @SUBTOTALVENTA DECIMAL(18,9), @COD INT, @MSG VARCHAR(200)

	-- Se calcula el SUBTOTAL
	SELECT @SUBTOTALVENTA = SUM(CASE WHEN ISNULL(MONTODSCTO,0) > 0 THEN ISNULL(VVTOTALSIGVDSCTO,0) 
								WHEN ISNULL(MARGENADICIONAL,0) > 0 THEN ISNULL(VVTOTALSIGVCGAN,0) 
								ELSE ISNULL(VALORTOTAL,0) END) 
	FROM [TBD_DESPACHO_COTIZACION] WHERE ID_SOLDESPACHO = @IsCodSolDespacho;

	IF ISNULL(@SUBTOTALVENTA,0) > 0 BEGIN

		UPDATE [dbo].[TBM_SOLDESPACHO]
		SET SUBTOTALVENTA = @SUBTOTALVENTA, MONTOIGV = @SUBTOTALVENTA * 0.18, TOTALVENTA = @SUBTOTALVENTA + (@SUBTOTALVENTA * 0.18) 
		WHERE ID = @IsCodSolDespacho;

		IF(@@ROWCOUNT > 0)
		BEGIN
			SET @COD = @IsCodSolDespacho
			SET @MSG = 'Se realizó con éxito el totalizado'
		END
		ELSE
		BEGIN
			SET @COD = 0
			SET @MSG = 'error en el totalizado'
		END
	END;

	SELECT @COD COD, @MSG MSG

	SET NOCOUNT OFF;

END