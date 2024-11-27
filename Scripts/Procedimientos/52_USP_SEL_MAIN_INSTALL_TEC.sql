USE[DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE[dbo].[USP_SEL_MAIN_INSTALL_TEC]
(
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	DiegoBazalar		03.11.24		RealizaelselectmaindelatablaTBD_INSTALACIONyTBM_INSTALACION
	[USP_SEL_MAIN_INSTALL_TEC] 1, 130
=======================================================================================================*/
	@isNumReq BIGINT,
	@isIdWorkFlow BIGINT
)
AS
BEGIN
	--Instalacion
	EXEC [dbo].[USP_SEL_INSTALL_TEC] @IsRequerimiento = @isNumReq, @isFecIni = '', @isFecFin = '' , @IsEstado='' ,@IsDestino='' ,@IsVendedor='' ,@IsRuc='' ,@IsCodEmpresa='' ,@IsTipVenta='0' ,@IsNumProceso='' ,@IsNumContrato='' ,@IsNumOrdenCompra='' ,@IsNumFianza=''
	--Detalle de instalacion
	EXEC [dbo].[USP_SEL_DETALLE_INSTALL] @isNumReq = @isNumReq 
	--Documentos adjuntos:
	SELECT A.COD_DOCUMENTO,
			A.ID_WORKFLOW,
			A.COD_TIPODOC,
			ISNULL(B.VALOR2,'') NOMTIPODOC,
			A.NOM_DOCUMENTO,
			A.VER_DOCUMENTO,
			A.RUTA_DOCUMENTO,
			A.NOMBRE_USUARIO,
			A.PERFIL,
			A.ELIMINADO,
			ISNULL(A.USR_REG,'') USR_REG,
			ISNULL(CONVERT(varchar,A.FEC_REG,103) +' '+CONVERT(varchar,A.FEC_REG,8),'')  AS FEC_REG
	FROM TBM_DOCUMENTO A
	INNER JOIN TBD_DATOS_GENERALES B ON A.COD_TIPODOC=B.COD_VALOR2 AND B.DOMINIO='TIPODOC'
	WHERE ID_WORKFLOW=@isIdWorkFlow AND ELIMINADO = 0
	
	--Detalle de Observaciones :
	EXEC [USP_SEL_OBSERVACIONES] @isIdWorkFlow
END