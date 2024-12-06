USE [DB_AHSECO]
GO

CREATE OR ALTER PROCEDURE [dbo].[USP_CONSULTA_PLANTILLA]
/*============================================================================================
	Nombre:					Fecha:			Descripción:
	Jose A. Peralta			15.09.24		Se construye las plantillas para correo
	Diego A. Bazalar		08.11.24		Se añade la lógica para el código de plantilla: PLANINSTECVEN
	EXEC USP_CONSULTA_PLANTILLA 4,'PLANVIAAPR','',2
	exec USP_CONSULTA_PLANTILLA @IdProceso=4,@CodPlantilla=N'PLANVIAPAP',@Usuario=N'MPITA',@Codigo=2
  ============================================================================================*/
  @IdProceso INT,
  @CodPlantilla VARCHAR(10),
  @Usuario VARCHAR(100),
  @Codigo BIGINT
  AS
  BEGIN
  DECLARE @SUBJECT VARCHAR(100),@BODY VARCHAR(MAX),@TO VARCHAR(250),@CC VARCHAR(250),@OBSERVACION VARCHAR(1000),@CodWorkFlow BIGINT,@FEC_ANU VARCHAR(10)
  DECLARE @CODIGOFORMAT VARCHAR(5),@NOMBREAREA VARCHAR(100),@NOMBREENCARGADO VARCHAR(250),@MOTIVO VARCHAR(200),@NOMBREREG VARCHAR(250),@EMAILREG VARCHAR(100)
  DECLARE @EMAIL_ASIST_GER VARCHAR(100),@EMAIL_COBR VARCHAR(100),@EMAIL_FACT VARCHAR(100), @EMAIL_GER VARCHAR(100), @NUM_SOL VARCHAR(100) -- para Instalación Técnica.
  DECLARE @FECHAABONO VARCHAR(10),@FECHAVIATICO VARCHAR(10),@NOMBRECARGO VARCHAR(100),@CLIENTE VARCHAR(200),@LUGARDESTINO VARCHAR(200),@DIASVIAJE VARCHAR(200)
  DECLARE @IDCLIENTE BIGINT,@NOMEMPRESA VARCHAR(200),@ASESORVENTA VARCHAR(200)

	SELECT @SUBJECT=ISNULL([SUBJECT],'') ,
				@BODY=ISNULL([BODY],''),
				@TO =ISNULL([TO],''),
				@CC =ISNULL([CC],'')
	FROM TBM_PLANTILLAS WHERE COD_PLANTILLA=@CodPlantilla AND ID_PROCESO=@IdProceso

	IF(@CodPlantilla = 'PLANVIAANU')
	BEGIN
			SET @CODIGOFORMAT =RIGHT('00000'+CAST(@Codigo AS VARCHAR),5)

			SELECT @OBSERVACION=OBSERVACION,@CodWorkFlow=ID_WORKFLOW FROM TBM_VIATICOS WHERE COD_VIATICO = @Codigo

			SELECT @NOMBREAREA=B.NOMBREAREA FROM TBM_VIATICOS A
			INNER JOIN TBM_AREAS B ON A.COD_AREA=B.ID_AREA
			WHERE A.COD_VIATICO=@Codigo


			SELECT @NOMBREREG=ISNULL(B.NOMBRES,'')+' '+ISNULL(B.APELLIDOS,'') ,
			@EMAILREG=ISNULL(B.EMAIL,'')
			FROM TBM_VIATICOS A
			INNER JOIN TBM_SEGURIDAD_USUARIO B ON UPPER(A.USR_REG)=UPPER(B.USUARIO)
			WHERE A.COD_VIATICO=@Codigo


			SET @SUBJECT = REPLACE (@SUBJECT,'{NRO_VIA}',@CODIGOFORMAT)
			SET @SUBJECT = REPLACE (@SUBJECT,'{NOMBRE_AREA}',@NOMBREAREA)
			SET @BODY = REPLACE(@BODY,'{NRO_VIA}',@CODIGOFORMAT)
			SET @BODY = REPLACE(@BODY,'{NOMBRE_REG}',@NOMBREREG)
			SET @BODY = REPLACE(@BODY,'{OBSERVACION}',@OBSERVACION)

			SET @TO = @EMAILREG

	END

	IF(@CodPlantilla = 'PLANVIAAPR')
	BEGIN
		    SET @CODIGOFORMAT =RIGHT('00000'+CAST(@Codigo AS VARCHAR),5)

			SELECT @NOMBREAREA=B.NOMBREAREA FROM TBM_VIATICOS A
			INNER JOIN TBM_AREAS B ON A.COD_AREA=B.ID_AREA
			WHERE A.COD_VIATICO=@Codigo

			SELECT @NOMBREENCARGADO=ISNULL(B.NOMBRES,'')+' '+ISNULL(B.APELLIDOPATERNO,'')+ ' '+ISNULL(B.APELLIDOMATERNO,''),
			@MOTIVO =ISNULL(A.MOTIVO,'')
			FROM TBM_VIATICOS A
			INNER JOIN TBM_EMPLEADOS B ON A.COD_ENCARGADO=B.ID_EMPLEADO
			WHERE A.COD_VIATICO=@Codigo


			SET @SUBJECT = REPLACE (@SUBJECT,'{NRO_VIA}',@CODIGOFORMAT)
			SET @SUBJECT = REPLACE (@SUBJECT,'{NOMBRE_AREA}',@NOMBREAREA)
			SET @BODY = REPLACE(@BODY,'{NRO_VIA}',@CODIGOFORMAT)
			SET @BODY = REPLACE(@BODY,'{NOMBRE_ENCARGADO}',@NOMBREENCARGADO)
			SET @BODY = REPLACE(@BODY,'{NOMBRE_AREA}',@NOMBREAREA)
			SET @BODY = REPLACE(@BODY,'{MOTIVO}',@MOTIVO)


	END

	IF(@CodPlantilla = 'PLANVIACON')
	BEGIN
		    SET @CODIGOFORMAT =RIGHT('00000'+CAST(@Codigo AS VARCHAR),5)

			SELECT @NOMBREAREA=B.NOMBREAREA FROM TBM_VIATICOS A
			INNER JOIN TBM_AREAS B ON A.COD_AREA=B.ID_AREA
			WHERE A.COD_VIATICO=@Codigo

			SELECT @NOMBREENCARGADO=ISNULL(B.NOMBRES,'')+' '+ISNULL(B.APELLIDOPATERNO,'')+ ' '+ISNULL(B.APELLIDOMATERNO,''),
			@MOTIVO =ISNULL(A.MOTIVO,'')
			FROM TBM_VIATICOS A
			INNER JOIN TBM_EMPLEADOS B ON A.COD_ENCARGADO=B.ID_EMPLEADO
			WHERE A.COD_VIATICO=@Codigo

			SET @SUBJECT = REPLACE (@SUBJECT,'{NRO_VIA}',@CODIGOFORMAT)
			SET @SUBJECT = REPLACE (@SUBJECT,'{NOMBRE_AREA}',@NOMBREAREA)
			SET @BODY = REPLACE(@BODY,'{NRO_VIA}',@CODIGOFORMAT)
			SET @BODY = REPLACE(@BODY,'{NOMBRE_ENCARGADO}',@NOMBREENCARGADO)
			SET @BODY = REPLACE(@BODY,'{NOMBRE_AREA}',@NOMBREAREA)
			SET @BODY = REPLACE(@BODY,'{MOTIVO}',@MOTIVO)
	END

	IF(@CodPlantilla = 'PLANVIAABO')
	BEGIN
		    SET @CODIGOFORMAT =RIGHT('00000'+CAST(@Codigo AS VARCHAR),5)

			SELECT @NOMBREAREA=B.NOMBREAREA FROM TBM_VIATICOS A
			INNER JOIN TBM_AREAS B ON A.COD_AREA=B.ID_AREA
			WHERE A.COD_VIATICO=@Codigo

			SELECT @FECHAABONO= ISNULL(CONVERT(varchar,A.FEC_ABO,103),''),
			@MOTIVO =ISNULL(A.MOTIVO,'')
			FROM TBM_VIATICOS A
			INNER JOIN TBM_EMPLEADOS B ON A.COD_ENCARGADO=B.ID_EMPLEADO
			WHERE A.COD_VIATICO=@Codigo

			SELECT @NOMBREREG=ISNULL(B.NOMBRES,'')+' '+ISNULL(B.APELLIDOS,'') ,
			@EMAILREG=ISNULL(B.EMAIL,'')
			FROM TBM_VIATICOS A
			INNER JOIN TBM_SEGURIDAD_USUARIO B ON UPPER(A.USR_REG)=UPPER(B.USUARIO)
			WHERE A.COD_VIATICO=@Codigo

			SET @SUBJECT = REPLACE (@SUBJECT,'{NRO_VIA}',@CODIGOFORMAT)
			SET @SUBJECT = REPLACE (@SUBJECT,'{NOMBRE_AREA}',@NOMBREAREA)
			SET @BODY = REPLACE(@BODY,'{NOMBRE_REG}',@NOMBREREG)
			SET @BODY = REPLACE(@BODY,'{NRO_VIA}',@CODIGOFORMAT)
			SET @BODY = REPLACE(@BODY,'{NOMBRE_AREA}',@NOMBREAREA)
			SET @BODY = REPLACE(@BODY,'{MOTIVO}',@MOTIVO)
			SET @BODY = REPLACE(@BODY,'{FEC_ABO}',@FECHAABONO)
			
			SET @TO = @EMAILREG
	END

	IF(@CodPlantilla = 'PLANVIAPAP')
	BEGIN
			SET @CODIGOFORMAT =RIGHT('00000'+CAST(@Codigo AS VARCHAR),5)

			SELECT @NOMBREAREA=B.NOMBREAREA FROM TBM_VIATICOS A
			INNER JOIN TBM_AREAS B ON A.COD_AREA=B.ID_AREA
			WHERE A.COD_VIATICO=@Codigo

			SELECT @FECHAVIATICO=  ISNULL(CONVERT(varchar,A.FECHAVIATICO,103),''),
			 @NOMBREENCARGADO=ISNULL(B.NOMBRES,'')+' '+ISNULL(B.APELLIDOPATERNO,'')+ ' '+ISNULL(B.APELLIDOMATERNO,''),
			 @MOTIVO =ISNULL(A.MOTIVO,''),
			 @NOMBRECARGO=ISNULL(C.NOMBRECARGO,''),
			 @CLIENTE = ISNULL(A.CLIENTE,''),
			 @MOTIVO =ISNULL(A.MOTIVO,''),
			 @LUGARDESTINO=ISNULL(A.UBIGEO,''),
			 @DIASVIAJE=ISNULL(A.DIAS_VIAJE,'')
			FROM TBM_VIATICOS A
			INNER JOIN TBM_EMPLEADOS B ON A.COD_ENCARGADO=B.ID_EMPLEADO
			INNER JOIN TBM_CARGOS C ON A.COD_CARGO=C.ID_CARGO
			WHERE A.COD_VIATICO=@Codigo

			SET @SUBJECT = REPLACE (@SUBJECT,'{NRO_VIA}',@CODIGOFORMAT)
			SET @SUBJECT = REPLACE (@SUBJECT,'{NOMBRE_AREA}',@NOMBREAREA)

			SET @BODY = REPLACE(@BODY,'{NRO_VIA}',@CODIGOFORMAT)
			SET @BODY = REPLACE(@BODY,'{NOMBRE_AREA}',@NOMBREAREA)
			SET @BODY = REPLACE(@BODY,'{FECHA_VIATICO}',@FECHAVIATICO)
			SET @BODY = REPLACE(@BODY,'{NOMBREENCARGADO}',@NOMBREENCARGADO)
			SET @BODY = REPLACE(@BODY,'{NOMBRECARGO}',@NOMBRECARGO)
			SET @BODY = REPLACE(@BODY,'{CLIENTE}',@CLIENTE)
			SET @BODY = REPLACE(@BODY,'{MOTIVO}',@MOTIVO)
			SET @BODY = REPLACE(@BODY,'{LUGARDESTINO}',@LUGARDESTINO)
			SET @BODY = REPLACE(@BODY,'{DIASVIAJE}',@DIASVIAJE)
			
	END

	IF(@CodPlantilla = 'PLANINSTEC')
	BEGIN
	DECLARE @COUNT INT, @I INT, @DETALLE NVARCHAR(MAX), @NOM_EQUIPO VARCHAR(250), @FEC_INSTAL VARCHAR(10)

			SET @CODIGOFORMAT =RIGHT('00000'+CAST(@Codigo AS VARCHAR),5)
			SET @NUM_SOL = RIGHT('000000'+CAST(@NUM_SOL AS VARCHAR),6)

			SELECT 
				@EMAILREG = empl.EMAIL,
				@NOMBREENCARGADO = CONCAT(empl.APELLIDOPATERNO,' ',empl.APELLIDOMATERNO,' ',empl.NOMBRES),
				@CLIENTE = instal.NOMEMPRESA,
				@NUM_SOL = sol.ID_SOLICITUD
			FROM TBM_INSTALACION instal WITH(NOLOCK)
			LEFT JOIN TBM_SOLICITUDVENTA sol WITH(NOLOCK) ON instal.ID_SOLICITUD = sol.ID_SOLICITUD
			LEFT JOIN TBM_SEGURIDAD_USUARIO usuario WITH(NOLOCK) ON usuario.USUARIO = sol.USR_REG
			LEFT JOIN TBM_EMPLEADOS empl WITH(NOLOCK) ON usuario.NUM_DOC = empl.NUMDOCUMENTO
			WHERE NUMREQ = @Codigo

			SET @I = 1
			DROP TABLE #tmpDInstalacion

			;WITH CTE_1 AS (
					SELECT 
					 ROW_NUMBER() OVER ( ORDER BY ID ) AS contar,
					 ID
					FROM TBD_INSTALACION
					WHERE NUMREQ = @Codigo
					GROUP BY (ID)
				)
				SELECT 
					*
				INTO #tmpDInstalacion
				FROM CTE_1

			SELECT 
				@COUNT = count(ID)
			FROM TBD_INSTALACION
			WHERE NUMREQ = @Codigo

			WHILE (@I < @COUNT + 1)
			BEGIN
				SET @DETALLE += 'Nombre de Equipo: {NOM_EQUIPO} - Fecha de Instalación del Equipo: {FEC_INSTAL}'+char(10) + char(13)

				SELECT 
					@NOM_EQUIPO = instal.DESCRIPCION,
					@FEC_INSTAL = CONVERT(VARCHAR(10),DESP.FECHAINSTALACION,103)
				FROM #tmpDInstalacion AS tmp
				LEFT JOIN [dbo].[TBD_INSTALACION] AS instal ON tmp.ID = instal.ID
				LEFT JOIN [dbo].[TBD_DESPACHO_DIST] AS DESP ON instal.SERIE = DESP.NUMSERIE
				WHERE contar = @I

				SET @DETALLE = REPLACE(@DETALLE, '{NOM_EQUIPO}',@NOM_EQUIPO)
				SET @DETALLE = REPLACE(@DETALLE, '{FEC_INSTAL}',@FEC_INSTAL)

				SET @I += 1;
			END
			SET @SUBJECT = REPLACE (@SUBJECT,'{NRO_SOL}',@NUM_SOL)

			SET @BODY = REPLACE(@BODY,'{NOM_VENDEDOR}',@NOMBREENCARGADO)
			SET @BODY = REPLACE(@BODY,'{NRO_SOL}',@NUM_SOL)
			SET @BODY = REPLACE(@BODY,'{CLIENTE}',@CLIENTE)
			SET @BODY = REPLACE(@BODY,'{NRO_REQ}',@CODIGOFORMAT)
			SET @BODY = REPLACE(@BODY,'{DETALLE_EQUIPOS}',@DETALLE)

			SET @TO = @EMAILREG
	END

	IF(@CodPlantilla = 'PLANGUIAPE')
	BEGIN
				SET @NUM_SOL = RIGHT('000000'+CAST(@Codigo AS VARCHAR),6)

				SELECT @CLIENTE=RTRIM(RAZONSOCIAL) 
				FROM TBM_SOLICITUDVENTA WITH(NOLOCK)
				WHERE ID_SOLICITUD=@Codigo

				SET @BODY = REPLACE(@BODY,'{NRO_SOL}',@NUM_SOL)
				SET @BODY = REPLACE(@BODY,'{CLIENTE}',@CLIENTE)

				SET @SUBJECT = REPLACE (@SUBJECT,'{NRO_SOL}',@NUM_SOL)
	END

	IF(@CodPlantilla = 'PLANATLOCS')
	BEGIN
				SET @NUM_SOL = RIGHT('000000'+CAST(@Codigo AS VARCHAR),6)

				SELECT @CLIENTE=RTRIM(A.RAZONSOCIAL) ,
				@EMAILREG = empl.EMAIL,
				@NOMBREENCARGADO = CONCAT(empl.APELLIDOPATERNO,' ',empl.APELLIDOMATERNO,' ',empl.NOMBRES)
				FROM TBM_SOLICITUDVENTA A WITH(NOLOCK)
				LEFT JOIN TBM_SEGURIDAD_USUARIO usuario WITH(NOLOCK) ON usuario.USUARIO = A.USR_REG
			    LEFT JOIN TBM_EMPLEADOS empl WITH(NOLOCK) ON usuario.NUM_DOC = empl.NUMDOCUMENTO
				WHERE A.ID_SOLICITUD=@Codigo


				SET @BODY = REPLACE(@BODY,'{NRO_SOL}',@NUM_SOL)
				SET @BODY = REPLACE(@BODY,'{CLIENTE}',@CLIENTE)
				SET @BODY = REPLACE(@BODY,'{NOM_VENDEDOR}',@NOMBREENCARGADO)

				SET @SUBJECT = REPLACE (@SUBJECT,'{NRO_SOL}',@NUM_SOL)

				SET @TO = @EMAILREG
	END

	IF(@CodPlantilla = 'PLANATLOSS')
	BEGIN
				SET @NUM_SOL = RIGHT('000000'+CAST(@Codigo AS VARCHAR),6)

				SELECT @CLIENTE=RTRIM(A.RAZONSOCIAL) ,
				@EMAILREG = empl.EMAIL,
				@NOMBREENCARGADO = CONCAT(empl.APELLIDOPATERNO,' ',empl.APELLIDOMATERNO,' ',empl.NOMBRES)
				FROM TBM_SOLICITUDVENTA A WITH(NOLOCK)
				LEFT JOIN TBM_SEGURIDAD_USUARIO usuario WITH(NOLOCK) ON usuario.USUARIO = A.USR_REG
			    LEFT JOIN TBM_EMPLEADOS empl WITH(NOLOCK) ON usuario.NUM_DOC = empl.NUMDOCUMENTO
				WHERE A.ID_SOLICITUD=@Codigo


				SET @BODY = REPLACE(@BODY,'{NRO_SOL}',@NUM_SOL)
				SET @BODY = REPLACE(@BODY,'{CLIENTE}',@CLIENTE)
				SET @BODY = REPLACE(@BODY,'{NOM_VENDEDOR}',@NOMBREENCARGADO)

				SET @SUBJECT = REPLACE (@SUBJECT,'{NRO_SOL}',@NUM_SOL)

				SET @TO = @EMAILREG
	END

	IF(@CodPlantilla = 'PLANSTECV')
	BEGIN

				DECLARE @NOM_COORDINADOR VARCHAR(200),@DOCUMENTO VARCHAR(12),@ID_ROL INT

				SET @NOM_COORDINADOR=(SELECT TOP 1 RTRIM(ISNULL(A.NOMBRES,''))+' '+RTRIM(ISNULL(A.APELLIDOS,'')) 
				FROM TBM_SEGURIDAD_USUARIO  A
				INNER JOIN TBM_SEGURIDAD_USUARIO_PERFIL B ON A.ID=B.USUARIO_ID AND B.PERFIL_ID=10
				AND B.HABILITADO=1
				ORDER BY B.FEC_REG DESC)


				SET @NUM_SOL = RIGHT('000000'+CAST(@Codigo AS VARCHAR),6)


				SELECT @CLIENTE=RTRIM(A.RAZONSOCIAL) 
				FROM TBM_SOLICITUDVENTA A WITH(NOLOCK)
				WHERE A.ID_SOLICITUD=@Codigo


				SET @BODY = REPLACE(@BODY,'{NRO_SOL}',@NUM_SOL)
				SET @BODY = REPLACE(@BODY,'{CLIENTE}',@CLIENTE)
				SET @BODY = REPLACE(@BODY,'{NOM_COORDINADOR}',@NOM_COORDINADOR)

				SET @SUBJECT = REPLACE (@SUBJECT,'{NRO_SOL}',@NUM_SOL)


	END

	IF(@CodPlantilla = 'PLANGUIABO')
	BEGIN
				DECLARE @NOM_GERENTE VARCHAR(100)
				SET @NUM_SOL = RIGHT('000000'+CAST(@Codigo AS VARCHAR),6)

				SET @NOM_GERENTE= ( SELECT TOP 1 (RTRIM(ISNULL(A.NOMBRES,''))+' '+RTRIM(ISNULL(A.APELLIDOS,'')))
				FROM TBM_SEGURIDAD_USUARIO A
				INNER JOIN TBM_SEGURIDAD_USUARIO_PERFIL B ON A.ID = B.USUARIO_ID
				WHERE B.PERFIL_ID=1  AND A.HABILITADO=1)--GERENTE GENERAL

				SELECT @CLIENTE=RTRIM(RAZONSOCIAL) 
				FROM TBM_SOLICITUDVENTA WITH(NOLOCK)
				WHERE ID_SOLICITUD=@Codigo

				SET @BODY = REPLACE(@BODY,'{NOM_GERENTE}',ISNULL(@NOM_GERENTE,''))
				SET @BODY = REPLACE(@BODY,'{NRO_SOL}',@NUM_SOL)
				SET @BODY = REPLACE(@BODY,'{CLIENTE}',@CLIENTE)

				SET @SUBJECT = REPLACE (@SUBJECT,'{NRO_SOL}',@NUM_SOL)
	END

	IF(@CodPlantilla = 'PLANAPRIMP')
	BEGIN

				SET @NUM_SOL = RIGHT('000000'+CAST(@Codigo AS VARCHAR),6)



				SELECT @CLIENTE=RTRIM(RAZONSOCIAL) 
				FROM TBM_SOLICITUDVENTA WITH(NOLOCK)
				WHERE ID_SOLICITUD=@Codigo

				SET @BODY = REPLACE(@BODY,'{NRO_SOL}',@NUM_SOL)
				SET @BODY = REPLACE(@BODY,'{CLIENTE}',@CLIENTE)

				SET @SUBJECT = REPLACE (@SUBJECT,'{NRO_SOL}',@NUM_SOL)
	END

	IF(@CodPlantilla = 'PLANCOTGER')
	BEGIN
	
			SET @NUM_SOL = RIGHT('000000'+CAST(@Codigo AS VARCHAR),6)
			SELECT TOP 1 @IDCLIENTE = IDCLIENTE,@ASESORVENTA = ASESORVENTA FROM dbo.TBM_SOLICITUDVENTA WHERE ID_SOLICITUD = @Codigo;

			SELECT TOP 1 @NOMEMPRESA = T1.NOMEMPRESA FROM dbo.TBM_CLIENTES T1 WHERE T1.ID = @IDCLIENTE;
			
			SET @SUBJECT = REPLACE (@SUBJECT,'{NRO_SOL}',@NUM_SOL)
			SET @BODY = REPLACE(@BODY,'{NRO_SOL}',@NUM_SOL)
			SET @BODY = REPLACE(@BODY,'{NOM_EMPRESA}',@NOMEMPRESA)
			SET @BODY = REPLACE(@BODY,'{NOMBRE_VENDEDOR}',@ASESORVENTA)
			SET @BODY = REPLACE(@BODY,'{NOM_VENDEDOR}',@ASESORVENTA)

	END
	
	IF(@CodPlantilla = 'PLANCOTVEN')
	BEGIN
	
			SET @NUM_SOL = RIGHT('000000'+CAST(@Codigo AS VARCHAR),6)
			SELECT TOP 1 @IDCLIENTE = IDCLIENTE,@ASESORVENTA = ASESORVENTA FROM dbo.TBM_SOLICITUDVENTA WHERE ID_SOLICITUD = @Codigo;

			SELECT TOP 1 @NOMEMPRESA = T1.NOMEMPRESA FROM dbo.TBM_CLIENTES T1 WHERE T1.ID = @IDCLIENTE;
			
			SET @SUBJECT = REPLACE (@SUBJECT,'{NRO_SOL}',@NUM_SOL)
			SET @BODY = REPLACE(@BODY,'{NRO_SOL}',@NUM_SOL)
			SET @BODY = REPLACE(@BODY,'{NOM_EMPRESA}',@NOMEMPRESA)
			SET @BODY = REPLACE(@BODY,'{NOMBRE_VENDEDOR}',@ASESORVENTA)
			SET @BODY = REPLACE(@BODY,'{NOM_VENDEDOR}',@ASESORVENTA)

	END

	IF(@CodPlantilla = 'PLANPREV')
	BEGIN
	DECLARE @NUM_MANT VARCHAR(6)

				SET @NUM_MANT = RIGHT('000000'+CAST(@Codigo AS VARCHAR),6)

				SET @NOM_GERENTE= ( SELECT TOP 1 (RTRIM(ISNULL(A.NOMBRES,''))+' '+RTRIM(ISNULL(A.APELLIDOS,'')))
				FROM TBM_SEGURIDAD_USUARIO A
				INNER JOIN TBM_SEGURIDAD_USUARIO_PERFIL B ON A.ID = B.USUARIO_ID
				WHERE B.PERFIL_ID=1  AND A.HABILITADO=1)--GERENTE GENERAL

				SELECT 
					@CLIENTE = MANT.NOMEMPRESA 
				FROM [dbo].[TBD_MANT_PREV] MANTDET
				LEFT JOIN [dbo].[TBM_MANT_PREV] MANT ON MANTDET.ID_MANT = MANT.ID_MANT
				WHERE MANTDET.ID = @Codigo

				SELECT 
					@NUM_SOL = ID_SOLICITUD,
					@NOM_EQUIPO = COTIZDET.DESCRIPCION
				FROM [dbo].[TBD_MANT_PREV] MANTDET
				LEFT JOIN [dbo].[TBM_MANT_PREV] MANT ON MANTDET.ID_MANT = MANT.ID_MANT
				LEFT JOIN [dbo].[TBD_DESPACHO_DIST] DESP ON DESP.NUMSERIE = MANT.SERIE
				LEFT JOIN [dbo].[TBD_COTIZACIONCOSTOS] COTCOST ON DESP.ID_COTCOSTOS = COTCOST.ID
				LEFT JOIN [dbo].[TBD_COTIZACIONVENTA] COTIZDET ON COTIZDET.ID = COTCOST.ID_COTDETALLE
				LEFT JOIN [dbo].[TBM_COTIZACIONVENTA] COTIZ ON COTIZ.ID_COTIZACION = COTIZDET.ID_COTIZACION
				WHERE MANTDET.ID = @Codigo

				SET @NUM_SOL = RIGHT('000000'+CAST(@NUM_SOL AS VARCHAR),6)

				SELECT @CLIENTE=RTRIM(RAZONSOCIAL) 
				FROM TBM_SOLICITUDVENTA WITH(NOLOCK)
				WHERE ID_SOLICITUD=@Codigo

				SET @BODY = REPLACE(@BODY,'{NOM_GERENTE}',ISNULL(@NOM_GERENTE,''))
				SET @BODY = REPLACE(@BODY,'{NRO_SOL}',@NUM_SOL)
				SET @BODY = REPLACE(@BODY,'{NOM_EQUIPO}',@NOM_EQUIPO)
				SET @BODY = REPLACE(@BODY,'{CLIENTE}',@CLIENTE)
	END


	SELECT ISNULL( @SUBJECT,'') [SUBJECT],ISNULL(@BODY,'') BODY, ISNULL(@TO,'') [TO],ISNULL(@CC,'') CC
  END


