USE [DB_AHSECO]
GO


ALTER PROCEDURE [dbo].[USP_INS_DATOS_GENERALES_DETALLE]
/*=============================================================================================================
	Nombre:				Fecha:			Descripción:
	José A. Peralta		01.08.24		Realiza la insercción de registros de la tabla datos generales detalle.
  =============================================================================================================*/
	@inCabeceraId INT = NULL,
	@isDescripcion NVARCHAR(80) = NULL,
	@isValor1 NVARCHAR(20) = NULL,
	@isValor2 NVARCHAR(20) = NULL,
	@isValor3 NVARCHAR(20) = NULL,
	@inValor1 NVARCHAR(200) = NULL,
	@inValor2 NVARCHAR(200) = NULL,
	@inValor3 NVARCHAR(200) = NULL,
	@isHabilitado BIT = NULL,
	@inEstado INT = NULL,
	@isEditable INT=NULL,
	@isUsuarioId NVARCHAR(20) = NULL
AS
BEGIN

DECLARE @isPrefijo nvarchar(10);
DECLARE @isDominio nvarchar(20);
DECLARE @inSecuencia int;
DECLARE @isParametroAnterior nvarchar(10);
DECLARE @isParametroNuevo nvarchar(10);
DECLARE @inError int;

BEGIN TRAN

SELECT @isPrefijo = PREFIJO, @isDominio = DOMINIO FROM TBM_DATOS_GENERALES WHERE ID = @inCabeceraId;
SELECT TOP 1 @isParametroAnterior = PARAMETRO FROM TBD_DATOS_GENERALES WHERE ID_CABECERA = @inCabeceraId ORDER BY PARAMETRO DESC;
SELECT @inSecuencia = CONVERT(int, RIGHT(@isParametroAnterior, 8 - LEN(@isPrefijo)));
SELECT @isParametroNuevo = @isPrefijo + RIGHT('0000' + CONVERT(varchar, isnull(@inSecuencia,0) + 1) , 4);


INSERT INTO [dbo].[TBD_DATOS_GENERALES]
           ([ID_CABECERA]
           ,[PARAMETRO]
           ,[DESCRIPCION]
		   ,[COD_VALOR1]
		   ,[COD_VALOR2]
		   ,[COD_VALOR3]
		   ,[VALOR1]
		   ,[VALOR2]
		   ,[VALOR3]
		   ,[HABILITADO]
           ,[ESTADO]
		   ,[EDITABLE]
		   ,[DOMINIO]
           ,[AUDIT_USR]
           ,[AUDIT_TIMESTAMP])
     VALUES
           (@inCabeceraId,
		    @isParametroNuevo,
			@isDescripcion,
			@isValor1,
			@isValor2,
			@isValor3,
			@inValor1,
			@inValor2,
			@inValor1,
			@isHabilitado,
			@inEstado,
			@isEditable,
			@isDominio,
			@isUsuarioId,
			SYSDATETIME());

SET @inError = @@ERROR
IF (@inError <> 0) GOTO TratarError

SELECT [ID]
      ,[ID_CABECERA]
      ,[PARAMETRO]
      ,[DESCRIPCION]
      ,[ESTADO]
      ,[AUDIT_USR]
      ,[AUDIT_TIMESTAMP]
  FROM [dbo].[TBD_DATOS_GENERALES]
  WHERE [ID] = CAST(SCOPE_IDENTITY() AS int);
END

COMMIT TRAN

TratarError:
If (@@Error <> 0)
	BEGIN
		ROLLBACK TRAN
	END
