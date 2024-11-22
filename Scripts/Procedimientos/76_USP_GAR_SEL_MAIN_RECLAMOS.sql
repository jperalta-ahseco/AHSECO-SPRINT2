USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_GAR_SEL_MAIN_RECLAMOS]	
(
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		21.11.24		Realiza el select MAIN para la bandeja de garantías. 
	EXEC USP_GAR_SEL_MAIN_RECLAMOS	123,1
  =======================================================================================================*/
  @IsIdWorkFlow BIGINT 
  ,@IsNumReclamo BIGINT
)
AS
BEGIN
	--Cabecera de Reclamos
	EXEC [dbo].[USP_GAR_SEL_RECLAMOS] @isFecIni = '',@isFecFin = '',@IsReclamo = @IsNumReclamo,@IsRuc = '',@IsCodUbigeoDest = '',@IsVendedor = '',@IsEstado = '', @IsCodEmpresa ='',@IsTipVenta = '0', @IsNumProceso='', @IsNumContrato = '', @IsNumOrdenCompra = '', @IsNumFianza = ''
	--Tecnicos
	EXEC [dbo].[USP_GAR_SEL_TECNICOS] @IsNumReclamo = @IsNumReclamo 
	--Documentos adjuntos:
	EXEC [USP_CONSULTA_DOCUMENTOS] @isIdWorkFlow
	--Detalle de Observaciones :
	EXEC [USP_SEL_OBSERVACIONES] @isIdWorkFlow

	SELECT B.ABREV_ESTADO NOMESTADO, 
					A.CARGO,
					A.AREA,
					ISNULL(C.NOMBRES,'')+' '+ISNULL(C.APELLIDOS,'') NOMUSUARIO,
					ISNULL(CONVERT(varchar,A.AUDIT_REG_FEC,103),'') FECREG, 
					ISNULL(CONVERT(varchar,A.AUDIT_REG_FEC,8),'') HORAREG 
		FROM TBM_WORKFLOWLOG A WITH(NOLOCK) 
		LEFT JOIN TBM_PROCESOESTADOS  B WITH(NOLOCK)  ON A.COD_ESTADO=B.COD_ESTADO AND ID_PROCESO = 7
		LEFT JOIN TBM_SEGURIDAD_USUARIO C WITH(NOLOCK) ON A.AUDIT_REG_USR=C.USUARIO
		WHERE A.ID_WORKFLOW =@IsIdWorkFlow
END