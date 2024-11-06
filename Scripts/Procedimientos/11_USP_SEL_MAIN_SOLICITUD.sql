USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_SEL_MAIN_SOLICITUD] 
(
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		03.10.24		Realiza el multi-select relacionados con la solicitud.
	EXEC [USP_SEL_MAIN_SOLICITUD] 11,41,1
	exec USP_SEL_MAIN_SOLICITUD @isIdSolicitud=3, @isIdCliente=6, @isIdWorkFlow=18 
=======================================================================================================*/
	@isIdSolicitud BIGINT,
	@isIdCliente BIGINT,
	@isIdWorkFlow BIGINT 
)
AS
BEGIN
	DECLARE @sql NVARCHAR(MAX)

	--Detalle de la solicitud:
	EXEC [USP_SEL_SOLICITUDES] @isIdCliente,@isIdSolicitud
	
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
				 WHERE ID_WORKFLOW=@isIdWorkFlow
				 AND ELIMINADO = 0

	--Documentos adjuntos:
	EXEC [USP_SEL_OBSERVACIONES] @isIdWorkFlow

	--Seguimiento de flujo de ventas:
	EXEC [USP_CONSULTA_WORKFLOWLOG] @isIdWorkFlow
END