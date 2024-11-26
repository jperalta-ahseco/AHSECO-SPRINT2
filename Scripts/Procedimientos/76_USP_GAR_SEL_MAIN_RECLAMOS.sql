USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_GAR_SEL_MAIN_RECLAMOS]	
(
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		21.11.24		Realiza el select MAIN para la bandeja de garantías. 
	EXEC USP_GAR_SEL_MAIN_RECLAMOS	123,1
	EXEC USP_GAR_SEL_MAIN_RECLAMOS @IsIdWorkFlow=127, @IsNumReclamo=3
  =======================================================================================================*/
  @IsIdWorkFlow BIGINT 
  ,@IsNumReclamo BIGINT
)
AS
BEGIN
SET NOCOUNT ON 
	--Cabecera de Reclamos
	EXEC [dbo].[USP_GAR_SEL_DETALLE_RECLAMO] @IsReclamo = @IsNumReclamo
	--Tecnicos
	EXEC [dbo].[USP_GAR_SEL_TECNICOS] @IsNumReclamo = @IsNumReclamo 
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

	--Detalle de Sewugi
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

SET NOCOUNT OFF 
END