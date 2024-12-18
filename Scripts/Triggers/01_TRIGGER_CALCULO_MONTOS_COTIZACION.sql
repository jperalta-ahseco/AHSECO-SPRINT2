USE [DB_AHSECO]
GO


CREATE TRIGGER dbo.TRIGGER_CALCULO_MONTOS_COT ON dbo.TBD_COTIZACIONVENTA
AFTER INSERT,UPDATE
AS
BEGIN
		SET NOCOUNT ON;
		DECLARE @IGV DECIMAL(9,2),@SUBTOTAL DECIMAL(17,2),@MONTOIGV DECIMAL(17,2),@TOTAL DECIMAL(17,2)

		SELECT @IGV=CAST(COD_VALOR1 AS DECIMAL(9,2)) FROM TBD_DATOS_GENERALES WHERE DOMINIO='PORCENIGV' AND PARAMETRO='PIGV0001'



		IF EXISTS(SELECT	1 FROM INSERTED)
		BEGIN
		SELECT @SUBTOTAL=SUM(PRECIOFABRICA) FROM TBD_COTIZACIONVENTA WHERE ID_COTIZACION = (SELECT ID_COTIZACION FROM INSERTED) AND ELIMINADO = 0

		SELECT @SUBTOTAL=ISNULL(@SUBTOTAL,0.00)

		
				UPDATE TBM_COTIZACIONVENTA 
				SET SUBTOTAL = @SUBTOTAL,
					   IGV = @SUBTOTAL*@IGV,
					   TOTAL=(@SUBTOTAL+( @SUBTOTAL*@IGV))
				WHERE ID_COTIZACION =  (SELECT ID_COTIZACION FROM INSERTED) 
		END




END
