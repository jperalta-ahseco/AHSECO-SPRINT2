USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE USP_CREAR_GUIA
/*===========================================================================================
	NOMBRE:					FECHA:		DESCRIPCI�N:
	Jos� A. Peralta		28.10.24		Se obtiene los datos para la guia de pedidos y guia de BO.
	EXEC USP_CREAR_GUIA 1,'GP'
  ===========================================================================================*/
@CodigoSol BIGINT,
@Tipo VARCHAR(2)
AS
BEGIN
DECLARE @RUTAIMAGEN VARCHAR(200),@FECHAOC VARCHAR(10),@PLAZOENTREGA VARCHAR(100),@USUARIO VARCHAR(50),
@NUMDOCUSU VARCHAR(12),@NOMBREVENDEDOR VARCHAR(200),@TITULO VARCHAR(50),@RAZONSOCIAL VARCHAR(200),
@RUC VARCHAR(12),@DIRECCION VARCHAR(150),@CIUDAD VARCHAR(50),@NUMOC VARCHAR(50),@COD_COTIZACION BIGINT

	SELECT @TITULO = CASE WHEN @Tipo = 'GP' THEN 'GU�A DE PEDIDO'
										 WHEN @Tipo = 'BO' THEN 'B/O'
										 ELSE '' END;
												   

	SELECT @RUTAIMAGEN=ISNULL(B.COD_VALOR1 ,'')+'.png',
	@PLAZOENTREGA=ISNULL(COTI.PLAZOENTREGA,''),
	@USUARIO=UPPER(RTRIM(A.USR_REG)),
	@RAZONSOCIAL=A.RAZONSOCIAL,
	@RUC=A.RUC,
	@COD_COTIZACION=COTI.ID_COTIZACION
	FROM TBM_SOLICITUDVENTA A WITH(NOLOCK)
	INNER JOIN TBM_COTIZACIONVENTA COTI WITH(NOLOCK) ON A.ID_SOLICITUD=COTI.ID_SOLICITUD AND COTI.ESTADO='A' 
	LEFT JOIN TBD_DATOS_GENERALES B ON B.DOMINIO='RAZSOCIAL' AND A.COD_EMPRESA=B.COD_VALOR1 
	WHERE A.ID_SOLICITUD=@CodigoSol;

	 SET @FECHAOC =CONVERT(varchar,GETDATE(),103) 

	 SELECT @NUMDOCUSU=NUM_DOC FROM TBM_SEGURIDAD_USUARIO WITH(NOLOCK) WHERE RTRIM(UPPER(USUARIO))=RTRIM(@USUARIO);

	SELECT TOP 1 
	@NOMBREVENDEDOR = RTRIM(ISNULL(NOMBRES,''))+ ' '+RTRIM(ISNULL(APELLIDOPATERNO,''))+' '+RTRIM(ISNULL(APELLIDOMATERNO,''))
	FROM TBM_EMPLEADOS WITH(NOLOCK) 
	WHERE RTRIM(NUMDOCUMENTO)=RTRIM(@NUMDOCUSU)
	ORDER BY FEC_REG DESC;

	SET @NUMOC='OC00000947'
	--SELECT * FROM TBM_SOLICITUDVENTA

	 --SELECT * FROM TBM_COTIZACIONVENTA

--	 SELECT * FROM TBM_CLIENTES

	 SELECT @DIRECCION=A.DIRECCION,
					@CIUDAD = B.NOMCAPITALLEGAL
		FROM TBM_CLIENTES A WITH(NOLOCK) 
		LEFT JOIN TBM_UBIGEO B ON A.CODUBIGEO=B.CODUBIGEO
		WHERE A.RUCEMPRESA=@RUC;

	SELECT @RUTAIMAGEN RUTAIMAGEN, 
				  @TITULO TITULO,
				  @FECHAOC FECHAOC,
				  @PLAZOENTREGA PLAZOENTREGA,
				  @NOMBREVENDEDOR NOMBREVENDEDOR,
				  @RAZONSOCIAL VENDIDOA,
				  @RAZONSOCIAL ENVIADOA,
				  @RUC RUC,
				  @DIRECCION DIRECCION,
				  @CIUDAD CIUDAD,
				  @NUMOC NUMOC,
				  'S/. 60.00' SUBTOTAL,
				  'S/. 10.80' IGV,
				  'S/. 70.80' TOTAL;

	SELECT CAST(NROITEM AS VARCHAR) NROITEM,
							'TSX505GA' CATALOGO,
							DESCRIPCION,
							UNIDAD,
							CAST(CANTIDAD AS VARCHAR) CANTIDAD,
							'S/. 30.00' PRECIOUNITARIO,
							'S/. 30.00' TOTAL 
				FROM TBD_COTIZACIONVENTA WITH(NOLOCK)
				WHERE ID_COTIZACION =@COD_COTIZACION AND TIPOITEM='PRO';



END