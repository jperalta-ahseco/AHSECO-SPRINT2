USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE USP_VALIDASTOCKDISPONIBLE(
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		30.07.25		Valida si cuenta con stock disponible para despachar.
	EXEC USP_VALIDASTOCKDISPONIBLE 35
  =======================================================================================================*/
	@IdCotizacion INT
)
AS
BEGIN

SET NOCOUNT ON;

/*======Declaramos Variables útiles=======================================================================*/
	DECLARE @Rpta VARCHAR(100), @CodRpta INT

/*========================================================================================================*/


/*======Iniciamos Lógica==================================================================================*/

	Select  --Obtenemos los equipos cotizados y las cantidades correspondientes
		ID_COTIZACION,
		ID AS ID_DETALLE,
		CANTIDAD AS CANTIDADTOTAL
	INTO #tmpProdTotales
	From TBD_COTIZACIONVENTA Where ID_COTIZACION = @IdCotizacion AND ELIMINADO != 'S'
	
	
	Select 	--Obtenemos los productos despachados o en proceso de despacho
		DETDESP.ID_COTDETALLE
		,SUM(DETDESP.CANTIDAD) CANTIDADACTIVO
	INTO #tmpProdActivos
	From TBM_SOLDESPACHO DESP
	LEFT JOIN TBD_DESPACHO_COTIZACION DETDESP ON DETDESP.ID_SOLDESPACHO = DESP.ID
	WHERE DESP.ID_COTIZACION = @IdCotizacion
	GROUP BY DETDESP.ID_COTDETALLE

	Select 
		ID_DETALLE,
		ISNULL(CANTIDADACTIVO,0) CANTIDADACTIVO,
		CANTIDADTOTAL,
		 CANTIDADTOTAL - ISNULL(CANTIDADACTIVO,0) AS DIF
	INTO #tmpDiferencia
	From #tmpProdActivos act
	RIGHT JOIN #tmpProdTotales tot ON act.ID_COTDETALLE = tot.ID_DETALLE


	IF EXISTS (SELECT DIF FROM #tmpDiferencia where DIF > 0)
	BEGIN
		SET @Rpta = 'Aún quedan productos cotizados disponibles para despachar.'
		SET @CodRpta = 1
	END
	ELSE
	BEGIN
		SET @Rpta = 'Ya no quedan productos cotizados disponibles para despachar.'
		SET @CodRpta = 0
	END


/*======Finaliza Lógica===================================================================================*/

	SELECT @Rpta as MENSAJE, @CodRpta as CODIGORPTA

SET NOCOUNT OFF;
END