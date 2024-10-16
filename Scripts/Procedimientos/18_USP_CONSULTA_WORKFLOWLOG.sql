USE [DB_AHSECO]
GO

ALTER PROCEDURE [dbo].[USP_CONSULTA_WORKFLOWLOG]
/*==========================================================================================
	Nombre:						Fecha:				Descripción:
	José A. Peralta			27.08.24			Realiza la consulta del seguimiento del workflow.
	Diego A.Bazalar			03.10.24			Se modifica el select, se añade HORAREG,FECREG
  ==========================================================================================*/
@IdWorkflow BIGINT
AS
BEGIN


SELECT A.ID,A.ID_WORKFLOW,A.COD_ESTADO,ISNULL(C.ABREV_ESTADO,'') AS DES_ESTADO,
			ISNULL(A.CARGO,'') CARGO,ISNULL(A.AREA,'') AS AREA,
			A.AUDIT_REG_USR AS USR_REG,
			ISNULL(D.NOMBRES,'')+' '+ISNULL(D.APELLIDOS,'') AS NOMBREUSRREGISTRO,
			ISNULL(CONVERT(VARCHAR,A.AUDIT_REG_FEC,103) +' '+CONVERT(VARCHAR,A.AUDIT_REG_FEC,8),'')  AS FEC_REG,
			ISNULL(CONVERT(varchar,A.AUDIT_REG_FEC,103),'') FECREG, 
			ISNULL(CONVERT(varchar,A.AUDIT_REG_FEC,8),'') HORAREG 
FROM TBM_WORKFLOWLOG A WITH(NOLOCK) 
INNER JOIN TBM_WORKFLOW B WITH(NOLOCK) ON  A.ID_WORKFLOW=B.ID
LEFT JOIN TBM_PROCESOESTADOS C WITH (NOLOCK)  ON B.ID_PROCESO = C.ID_PROCESO AND A.COD_ESTADO=C.COD_ESTADO
LEFT JOIN TBM_SEGURIDAD_USUARIO  D WITH(NOLOCK) ON A.AUDIT_REG_USR = D.USUARIO
WHERE ID_WORKFLOW = @IdWorkflow

END
