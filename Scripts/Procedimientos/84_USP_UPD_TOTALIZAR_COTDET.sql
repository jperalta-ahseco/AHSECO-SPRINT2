USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_UPD_TOTALIZAR_COTDET]
(
@pIDCOTDETALLE BIGINT
)
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Samuel Gómez		28.11.24		Realiza la totalizacion de la cotización.
  =======================================================================================================*/
AS
BEGIN

	DECLARE @IDCOTDETALLE_PRO BIGINT
	DECLARE @IDCOTIZACION BIGINT
	DECLARE @NROITEM INT
	DECLARE @TIPOITEM VARCHAR(5)
	DECLARE @CANTREG INT
	DECLARE @VVENTAUNI DECIMAL(18,9)
	DECLARE @VALORVENTACOTDET DECIMAL(18,9)
	DECLARE @PORCGANANCIA DECIMAL(18,9)
	DECLARE @TOTALCOSTO DECIMAL(18,9)
	DECLARE @SUBTOTALVENTA DECIMAL(18,9)
	DECLARE @PORCDSCTO DECIMAL(18,9)
	DECLARE @INDDSCTOREQAPROB CHAR(1)
	DECLARE @INDDSCTOAPROB CHAR(1)
	DECLARE @TOTALDSCTO DECIMAL(18,9)
	DECLARE @NUM INT
	
	SELECT TOP 1 @IDCOTIZACION = ID_COTIZACION, @NROITEM = NROITEM, @TIPOITEM = TIPOITEM, @VVENTAUNI = VVENTAUNI, @PORCGANANCIA = PORCGANANCIA
	FROM TBD_COTIZACIONVENTA WHERE ID = @pIDCOTDETALLE;
	
	SELECT TOP 1 @PORCDSCTO = PORCDSCTO, @INDDSCTOREQAPROB = INDDSCTOREQAPROB, @INDDSCTOAPROB = INDDSCTOAPROB 
	FROM TBM_COTIZACIONVENTA WHERE ID_COTIZACION = @IDCOTIZACION;

	SELECT @CANTREG = COUNT(1) FROM TBD_COTIZACIONVENTA WHERE ID_COTIZACION = @IDCOTIZACION;

	IF ISNULL(@TIPOITEM,'') = 'ACC' BEGIN
		
		IF EXISTS(SELECT 1 FROM TBD_COTIZACIONVENTA WHERE ID_COTIZACION = @IDCOTIZACION AND NROITEM = @NROITEM AND TIPOITEM = 'PRO') BEGIN

			SELECT TOP 1 @IDCOTDETALLE_PRO = ID
			FROM TBD_COTIZACIONVENTA WHERE ID_COTIZACION = @IDCOTIZACION AND NROITEM = @NROITEM AND TIPOITEM = 'PRO';

			EXEC USP_UPD_TOTALIZAR_COTDET @IDCOTDETALLE_PRO;

		END

	END

	IF ISNULL(@TIPOITEM,'') = 'PRO' BEGIN
		
		SELECT @VALORVENTACOTDET = SUM(ISNULL(CANTIDAD,0) * ISNULL(VVENTAUNI,0))
		FROM TBD_COTIZACIONVENTA WHERE ID_COTIZACION = @IDCOTIZACION AND NROITEM = @NROITEM;

		-- Se actualiza el Total Sin IGV

		IF ISNULL(@VVENTAUNI,0) > 0 BEGIN
			UPDATE TBD_COTIZACIONVENTA SET VVTOTALSIGV = @VALORVENTACOTDET WHERE ID = @pIDCOTDETALLE
		END
		ELSE BEGIN
			UPDATE TBD_COTIZACIONVENTA SET VVTOTALSIGV = NULL WHERE ID = @pIDCOTDETALLE
		END
		
		-- Se actualiza el Total Sin IGV CON GANANCIA o SIN GANANCIA

		IF ISNULL(@PORCGANANCIA,0) > 0 AND ISNULL(@VVENTAUNI,0) > 0 BEGIN
			UPDATE TBD_COTIZACIONVENTA SET 
			VVTOTALSIGVCGAN = VVTOTALSIGV + (VVTOTALSIGV * (PORCGANANCIA / 100)) 
			WHERE ID = @pIDCOTDETALLE AND ISNULL(VVTOTALSIGV,0) > 0
		END
		ELSE BEGIN
			UPDATE TBD_COTIZACIONVENTA SET VVTOTALSIGVCGAN = NULL WHERE ID = @pIDCOTDETALLE
		END

		-- Se actualiza el Total de Venta con los Costos
		SELECT @TOTALCOSTO = SUM(CASE WHEN ISNULL(MONTOTOTCOSTO,0) > 0 THEN MONTOTOTCOSTO ELSE ISNULL(MONTOUNICOSTO,0) * ISNULL(CANTCOSTO,0) END) 
		FROM TBD_COTIZACIONCOSTOS WHERE ID_COTDETALLE = @pIDCOTDETALLE;

		IF ISNULL(@TOTALCOSTO,0) > 0 BEGIN
			UPDATE TBD_COTIZACIONVENTA SET 
			VVTOTALSIGV = CASE WHEN ISNULL(VVTOTALSIGVCGAN,0) <= 0 THEN ISNULL(VVTOTALSIGV,0) + @TOTALCOSTO ELSE VVTOTALSIGV END,
			VVTOTALSIGVCGAN = CASE WHEN ISNULL(VVTOTALSIGVCGAN,0) > 0 THEN ISNULL(VVTOTALSIGVCGAN,0) + @TOTALCOSTO ELSE VVTOTALSIGVCGAN END
			WHERE ID = @pIDCOTDETALLE;
		END
	
		-- Se calcula el MONTO DE DESCUENTO por cada producto

		IF ISNULL(@PORCDSCTO,0) > 0 AND ISNULL(@VVENTAUNI,0) > 0 BEGIN
		
			SELECT @SUBTOTALVENTA = SUM(CASE WHEN ISNULL(PORCGANANCIA,0) > 0 THEN ISNULL(VVTOTALSIGVCGAN,0) ELSE ISNULL(VVTOTALSIGV,0) END)
			FROM TBD_COTIZACIONVENTA WHERE ID_COTIZACION = @IDCOTIZACION;

			SET @TOTALDSCTO = @SUBTOTALVENTA * (@PORCDSCTO / 100);
		
			UPDATE TBD_COTIZACIONVENTA SET MONTODSCTO = @TOTALDSCTO / @CANTREG WHERE ID_COTIZACION = @IDCOTIZACION;
		
			UPDATE TBD_COTIZACIONVENTA SET
			VVTOTALSIGVDSCTO = CASE 
								WHEN ISNULL(PORCGANANCIA,0) > 0 THEN VVTOTALSIGVCGAN - MONTODSCTO 
								ELSE VVTOTALSIGV - MONTODSCTO
								END
			WHERE ID_COTIZACION = @IDCOTIZACION;
		
			UPDATE TBM_COTIZACIONVENTA SET INDDSCTOREQAPROB = 'S' 
			WHERE ID_COTIZACION IN (SELECT T1.ID_COTIZACION FROM TBD_COTIZACIONVENTA T1 WHERE T1.ID_COTIZACION = @IDCOTIZACION
									AND ISNULL(T1.VVTOTALSIGVDSCTO,0) > 0 AND ISNULL(T1.VVTOTALSIGVDSCTO,0) < (T1.CANTIDAD * T1.VVENTAUNI));
		
			UPDATE TBM_COTIZACIONVENTA SET INDDSCTOREQAPROB = CASE ISNULL(INDDSCTOREQAPROB,'') WHEN 'S' THEN 'S' ELSE 'N' END
			WHERE ID_COTIZACION = @IDCOTIZACION;

		END
		ELSE BEGIN
		
			UPDATE TBD_COTIZACIONVENTA SET MONTODSCTO = NULL,VVTOTALSIGVDSCTO = NULL WHERE ID_COTIZACION = @IDCOTIZACION;

		END

		-- Se actualiza si el descuento requiere aprobación
		UPDATE TBM_COTIZACIONVENTA SET INDDSCTOREQAPROB = 'S'
	
		-- Se calcula el SUBTOTAL
		SELECT @SUBTOTALVENTA = SUM(CASE WHEN ISNULL(MONTODSCTO,0) > 0 THEN ISNULL(VVTOTALSIGVDSCTO,0) 
									WHEN ISNULL(PORCGANANCIA,0) > 0 THEN ISNULL(VVTOTALSIGVCGAN,0) 
									ELSE ISNULL(VVTOTALSIGV,0) END) 
		FROM TBD_COTIZACIONVENTA WHERE ID_COTIZACION = @IDCOTIZACION;

		-- Se actualiza el SUBTOTAL y TOTAL DE VENTA
		UPDATE TBM_COTIZACIONVENTA SET SUBTOTALVENTA = @SUBTOTALVENTA, MONTOIGV = @SUBTOTALVENTA * 0.18, TOTALVENTA = @SUBTOTALVENTA + (@SUBTOTALVENTA * 0.18) 
		WHERE ID_COTIZACION = @IDCOTIZACION;
	
	END

END