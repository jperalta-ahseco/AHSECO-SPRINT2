USE [DB_AHSECO]
GO

CREATE  PROCEDURE [dbo].[USP_CONSULTA_HISTORIALCOTIZACION]
/*==========================================================================================
	Nombre					Fecha		Descripción
	José A. Peralta		21/10/24	Consulta el historial de cotizaciones.
  ==========================================================================================*/
@pId_Cotizacion INT,
@pId_Solicitud INT
AS
BEGIN

	SELECT
	A.ID_COTIZACION,
	A.ID_SOLICITUD,
	A.FEC_COTIZACION,
	A.NOMBRECONTACTO,
	A.AREACONTACTO,
	A.TELEFONOCONTACTO,
	A.EMAILCONTACTO,
	A.PLAZOENTREGA,
	ISNULL(B.VALOR1,'') FORMAPAGO,
	ISNULL(C.VALOR1,'') MONEDA,
	A.VIGENCIA,
	A.GARANTIA,
	A.ESTADO,
	A.USR_REG,
	ISNULL(CONVERT(varchar,A.FEC_REG,103) +' '+CONVERT(varchar,A.FEC_REG,8),'') FEC_REG,
	ISNULL(A.USR_MOD,'') USR_MOD,
	ISNULL(CONVERT(varchar,A.FEC_MOD,103) +' '+CONVERT(varchar,A.FEC_MOD,8),'') FEC_MOD
	FROM DBO.TBM_COTIZACIONVENTA A WITH(NOLOCK) 
	LEFT JOIN TBD_DATOS_GENERALES B ON ISNULL(A.FORMAPAGO,'') = ISNULL(B.COD_VALOR1,'') AND B.DOMINIO='FORMAPAGO'
	LEFT JOIN TBD_DATOS_GENERALES C ON ISNULL(A.MONEDA,'')=ISNULL(B.COD_VALOR1,'') AND C.DOMINIO='TIPMONEDA'
	WHERE (ISNULL(@pId_Cotizacion,0) = 0 OR A.ID_COTIZACION = @pId_Cotizacion)
	AND (ISNULL(@pId_Solicitud,0) = 0 OR A.ID_SOLICITUD = @pId_Solicitud)
	AND  A.ESTADO = 'I';

END

