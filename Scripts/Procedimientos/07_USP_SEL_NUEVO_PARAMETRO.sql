USE [DB_AHSECO]
GO

CREATE PROCEDURE [dbo].[USP_SEL_NUEVO_PARAMETRO]
/*=================================================================================================
	NOMBRE:					FECHA:		DESCRIPCIÓN:
	Gabriel Marquez		02.10.24		Crea un nuevo parámetro.
	EXEC USP_SEL_NUEVO_PARAMETRO 1
  =================================================================================================*/
(
	@inCabeceraId INT =NULL
)
AS
BEGIN
 DECLARE @isPrefijo nvarchar(10);
    DECLARE @inSecuencia int;
    DECLARE @isParametroAnterior nvarchar(10);
    DECLARE @isParametroNuevo nvarchar(10);
	IF (@inCabeceraId IS NOT NULL AND @inCabeceraId > 0)
    BEGIN
        SELECT @isPrefijo = PREFIJO
        FROM TBM_DATOS_GENERALES 
        WHERE ID = @inCabeceraId;

        SELECT TOP 1 @isParametroAnterior = PARAMETRO 
        FROM TBD_DATOS_GENERALES 
        WHERE ID_CABECERA = @inCabeceraId 
        ORDER BY PARAMETRO DESC;

        SELECT @inSecuencia = CONVERT(int, RIGHT(@isParametroAnterior, 8 - LEN(@isPrefijo)));

        SELECT @isParametroNuevo = @isPrefijo + RIGHT('0000' + CONVERT(varchar, ISNULL(@inSecuencia, 0) + 1), 4);
        
        -- Devolver el nuevo parámetro
        SELECT @isParametroNuevo AS NUEVOPARAMETRO;
    END
END


