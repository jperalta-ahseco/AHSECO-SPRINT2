USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_PREV_SEL_DETALLE_MANT]
(
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		28.11.24		Realiza la búsqueda del detalle del mantenimiento preventivo.
	EXEC [USP_PREV_SEL_DETALLE_MANT] 3 
  =======================================================================================================*/
  @IsNumPreventivo			BIGINT
)
AS
BEGIN
SET NOCOUNT ON

/*Detalle de Mantenimientos Preventivos*/------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
		SELECT 
			MANT.ID							AS ID
			,MANT.FECHAMANTENIMIENTO		AS FECHAMANTENIMIENTO
			,MANT.MONTOPRESTACCE			AS MONTOPRESTACCE
			,MANT.INDPRESTACION				AS INDPRESTACION
			,MANT.INDREPUESTO				AS INDREPUESTO
			,MANT.NUMFACTURA				AS NUMFACTURA
			,CONVERT(VARCHAR(10),MANT.FECHAFACTURA,103)		AS FECHAFACTURA
			,ESTADO							AS CODESTADO
			,NOM_ESTADO						AS ESTADO
		FROM [dbo].[TBD_MANT_PREV] MANT WITH(NOLOCK)
		LEFT JOIN [dbo].[TBM_PROCESOESTADOS] ESTADO ON ESTADO.COD_ESTADO = MANT.ESTADO
		WHERE MANT.ID = @IsNumPreventivo

SET NOCOUNT OFF
END