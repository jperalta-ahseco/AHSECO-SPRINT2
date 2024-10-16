USE [DB_AHSECO]
GO

CREATE PROCEDURE [dbo].[USP_MANT_EMPLEADOS](
/*=======================================================================================================
	Nombre:				Fecha:			Descripción:
	Gabriel M. Sullca   10.09.24		Realiza el registro o actualización de la tabla de empleados.
  =======================================================================================================*/
		@isTipoProceso CHAR(1) ,
		@isId BIGINT,--Pasar solo en actualizar
		@isNombres VARCHAR(50),
		@isApePat VARCHAR(50),
		@isApeMat VARCHAR(50),
		@isIdArea INT,
		@isIdCargo INT ,
		@isCentroLaboral VARCHAR(6),
		@isFecNac DATETIME NULL,
		@isTelefono VARCHAR(35),
		@isCorreo VARCHAR(75),
		@isTipDoc VARCHAR(9),
		@isNumDoc VARCHAR(12),
		@isSexo CHAR(1),
		@isDireccion VARCHAR(100),
		@isCodEmpresa VARCHAR(10),
		@isFecIng DATETIME NULL,
		@isTipoEmpleado VARCHAR(1),
		@isCodJefe INT,
		@isEstado BIT,
		@isUsrReg VARCHAR(35)
)AS 
BEGIN
	IF @isTipoProceso=1-->INSERTAR ASESOR VENTA
		BEGIN
			INSERT INTO [DBO].[TBM_EMPLEADOS](
				[NOMBRES],
				[APELLIDOPATERNO],
				[APELLIDOMATERNO],
				[ID_AREA],
				[ID_CARGO],
				[FECHANACIMIENTO],
				[LUGARLABORAL],
				[TELEFONO],
				[EMAIL],
				[DIRECCION],
				[SEXO],
				[TIPO_DOCUMENTO],
				[NUMDOCUMENTO],
				[CODEMPRESA],
				[COD_JEFE],
				[FECHA_INGRESO],
				[TIPO],
				[ESTADO],
				[USR_REG],
				[FEC_REG]
			)VALUES(
				TRIM(@isNombres),
				TRIM(@isApePat),
				TRIM(@isApeMat),
				@isIdArea,
				@isIdCargo,
				@isFecNac,
				@isCentroLaboral,
				TRIM(@isTelefono),
				TRIM(@isCorreo),
				TRIM(@isDireccion),
				@isSexo,
				@isTipDoc,
				TRIM(@isNumDoc),
				@isCodEmpresa,
				@isCodJefe,
				@isFecIng,
				@isTipoEmpleado,
				@isEstado,
				@isUsrReg,
				GETDATE()
			)
		END
	ELSE IF @isTipoProceso=2 -->ACTUALIZAR ASESOR VENTA
		BEGIN
			UPDATE [dbo].[TBM_EMPLEADOS]
			SET
			[NOMBRES]=@isNombres,
			[APELLIDOPATERNO]=@isApePat,
			[APELLIDOMATERNO]=@isApeMat,	
			[ID_AREA]=@isIdArea,
			[ID_CARGO]=@isIdCargo,
			[LUGARLABORAL]=@isCentroLaboral,
			[FECHANACIMIENTO]=@isFecNac,
			[TELEFONO]=@isTelefono,
			[EMAIL]=@isCorreo,
			[TIPO_DOCUMENTO]=@isTipDoc,
			[NUMDOCUMENTO]=@isNumDoc,
			[SEXO]=@isSexo,
			[DIRECCION]=@isDireccion,
			[CODEMPRESA]=@isCodEmpresa,
			[FECHA_INGRESO]=@isFecIng,
			[TIPO]=@isTipoEmpleado,
			[COD_JEFE]=@isCodJefe,
			[ESTADO]=@isEstado,
			[USR_MOD]=@isUsrReg,
			[FEC_MOD]=GETDATE()
			WHERE [ID_EMPLEADO]=@isId
		END
END
