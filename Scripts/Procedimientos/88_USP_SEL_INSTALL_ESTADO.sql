USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_SEL_INSTALL_ESTADO] 
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		01.12.24		Valida los detalles de la solicitud y coloca un estado según corresponda.
  =======================================================================================================*/
(
	 @IsIdDespacho	INT
)
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @rpta INT
	DECLARE @IsNumReq INT
	/********************************************************/
	IF OBJECT_ID('tempdb..#tmpCabecera') IS NOT NULL
		DROP TABLE #tmpCabecera
	/********************************************************/

	--Buscamos los números de serie
	SELECT
		@IsNumReq = NUMREQ
	FROM TBD_INSTALACION WHERE ID_DESPACHO_DIST = @IsIdDespacho


	SELECT 
		 SERIE
		 ,ID_DESPACHO_DIST
		 ,ID_DETALLECOTIZ
	INTO #tmpCabecera
	FROM TBD_INSTALACION WHERE NUMREQ = @IsNumReq


	IF (SELECT COUNT(ID) FROM TBD_INSTALACION WHERE  NUMREQ = @IsNumReq) = (select COUNT(ID) FROM [dbo].[TBD_DESPACHO_DIST] where NUMSERIE in (SELECT SERIE FROM #tmpCabecera) AND FECHAPROGRAMACION IS NOT NULL AND FECHAINSTALACION IS NOT NULL AND COD_TECNICO IS NOT NULL)
	BEGIN
		SET @rpta = 1 --Se debe de asignar estado Instalado
	END
	ELSE
	BEGIN
		IF EXISTS (select 1 FROM [dbo].[TBD_DESPACHO_DIST] WHERE ID = @IsIdDespacho AND FECHAPROGRAMACION IS NOT NULL AND COD_TECNICO IS NOT NULL)
		BEGIN
			SET @rpta = 2
		END
		ELSE
		BEGIN
			SET @rpta = 3
		END
	END

	SELECT @rpta COD

	SET NOCOUNT ON;
END