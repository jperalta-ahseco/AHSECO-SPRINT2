USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_SEL_SERVICIO](
/*============================================================================================
	Nombre:					Fecha:			Descripción:
   Gabriel M.Sullca			11.10.24		Se realiza consulta de servicios.
   Diego A.Bazalar			17.10.24		Se añade el parametro @isIdServicio y la lógica de búsqueda concerniente a este parametro.
	EXEC USP_SEL_SERVICIO @isIdServicio = 1, @isEstado = 1
  ============================================================================================*/
	@isIdServicio INT,
	@isEquipo VARCHAR(200) = '',
	@isMarca NVARCHAR(150)='',
	@isModelo NVARCHAR(150)='',
	@isTipoServicio NVARCHAR(12)='',
	@isEstado CHAR(1) = ''
)AS
BEGIN
	DECLARE @SQL NVARCHAR(MAX)
	SET  @SQL = '
		SELECT 
			ID_SERVICIO,
			B.VALOR1 TIPO_SERVICIO,
			TIPO_SERVICIO CODTIPOSERVICIO,
			DESCRIPCIONEQUIPO,
			NOMBREMODELO,
			NOMBREMARCA,
			PRECIOPREVENTIVO,
			PRECIOCAPACITACION,
			PRECIOSOFTWARE,
			INSTRUMENTOS,
			TOOLCOMUN,
			TOOLESPECIAL,
			A.ESTADO,
			USR_REG ,
			FEC_REG ,
			USR_MOD ,
			FEC_MOD 
		FROM [dbo].[TBM_SERVICIOS] A WITH(NOLOCK)
		LEFT JOIN [dbo].[TBD_DATOS_GENERALES] B ON A.TIPO_SERVICIO = B.COD_VALOR1
		WHERE 1=1
	'
	IF(@isEquipo != '')
	BEGIN
		SET @SQL=@SQL+' AND DESCRIPCIONEQUIPO LIKE'+'''%'+CAST(@isEquipo AS VARCHAR)+'%''' +''
	END
	IF(LEN(@isMarca)>0)
	BEGIN
		SET @SQL=@SQL+' AND NOMBREMARCA LIKE'+'''%'+CAST(@isMarca AS VARCHAR)+'%''' +''
	END
	IF(@isModelo != '')
	BEGIN
		SET @SQL=@SQL+' AND NOMBREMODELO LIKE'+'''%'+ CAST(@isModelo AS VARCHAR) +'%''' +''
	END
	IF(@isTipoServicio != '')
	BEGIN
		SET @SQL=@SQL+' AND TIPO_SERVICIO = '''+ CAST(@isTipoServicio AS VARCHAR) +''' '+''
	END
	IF(LEN(@isEstado)>0)
	BEGIN
		SET @SQL=@SQL+' AND A.ESTADO ='+ CAST(@isEstado AS VARCHAR(1)) +''
	END
	IF(@isIdServicio != 0)
	BEGIN
		SET @SQL=@SQL+' AND ID_SERVICIO ='+ CAST(@isIdServicio AS VARCHAR(50)) +''
	END
	PRINT @SQL
	EXEC sp_executesql @SQL
END
