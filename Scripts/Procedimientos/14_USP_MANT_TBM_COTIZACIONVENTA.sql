USE [DB_AHSECO]
GO

CREATE PROCEDURE [dbo].[USP_MANT_TBM_COTIZACIONVENTA] 
(
	@IsTipoProceso			CHAR(1)
	,@isIdCotizacion		BIGINT
	,@isID_SOLICITUD		BIGINT
	,@isFEC_COTIZACION		DATETIME
	,@isIDCONTACTO			INT
	,@isNOMBRECONTACTO		VARCHAR(150)
	,@isAREACONTACTO		VARCHAR(100)
	,@isTELEFONOCONTACTO	VARCHAR(50)
	,@isEMAILCONTACTO		VARCHAR(35)
	,@isPLAZOENTREGA		VARCHAR(100)
	,@isFORMAPAGO			VARCHAR(10)
	,@isMONEDA				VARCHAR(10)
	,@isVIGENCIA			VARCHAR(50)
	,@isGARANTIA			VARCHAR(10)
	,@isOBSERVACION			VARCHAR(200)
	,@isESTADO				VARCHAR(1)
	,@isUsrEjecuta			VARCHAR(50)
	,@isFecEjecucion		DATETIME
)
/*=======================================================================================================
	Nombre:				Fecha:			Descripcion:
	Diego Bazalar		25.09.24		Realiza el mantenimiento de la tabla TBM_COTIZACIONVENTA con parametros.
  =======================================================================================================*/
AS
BEGIN
	DECLARE @CODIGO BIGINT, @MSG VARCHAR(20)
	SET NOCOUNT ON;

	IF (@IsTipoProceso = 'I')
		BEGIN
			INSERT INTO TBM_COTIZACIONVENTA(ID_SOLICITUD,FEC_COTIZACION,IDCONTACTO,NOMBRECONTACTO,AREACONTACTO,TELEFONOCONTACTO,EMAILCONTACTO,PLAZOENTREGA,FORMAPAGO,MONEDA,
											VIGENCIA,GARANTIA,OBSERVACION,ESTADO,USR_REG,FEC_REG)
				VALUES(@isID_SOLICITUD,@isFEC_COTIZACION,@isIDCONTACTO,@isNOMBRECONTACTO,@isAREACONTACTO,@isTELEFONOCONTACTO,@isEMAILCONTACTO,@isPLAZOENTREGA
							,@isFORMAPAGO,@isMONEDA,@isVIGENCIA,@isGARANTIA,@isOBSERVACION,@isESTADO,@isUsrEjecuta,@isFecEjecucion)

			SET  @CODIGO = @@IDENTITY
			SET @MSG ='Registro Insertado con �xito'
		END
	ELSE
		IF(@IsTipoProceso = 'U')
			BEGIN
				UPDATE TBM_COTIZACIONVENTA
				SET ID_SOLICITUD		 = @isID_SOLICITUD	
					,FEC_COTIZACION		 = @isFEC_COTIZACION	
					,IDCONTACTO			 = @isIDCONTACTO
					,NOMBRECONTACTO		 = @isNOMBRECONTACTO	
					,AREACONTACTO		 = @isAREACONTACTO	
					,TELEFONOCONTACTO	 = @isTELEFONOCONTACTO
					,EMAILCONTACTO		 = @isEMAILCONTACTO	
					,PLAZOENTREGA		 = @isPLAZOENTREGA	
					,FORMAPAGO			 = @isFORMAPAGO		
					,MONEDA				 = @isMONEDA			
					,VIGENCIA			 = @isVIGENCIA		
					,GARANTIA			 = @isGARANTIA		
					,OBSERVACION		 = @isOBSERVACION		
					,ESTADO				 = @isESTADO
					,USR_MOD			 = @isUsrEjecuta		
					,FEC_MOD			 = @isFecEjecucion	
				WHERE ID_COTIZACION = @isIdCotizacion

				SET  @CODIGO = @isIdCotizacion
				SET @MSG ='Registro Insertado con �xito'
			END

	SELECT @CODIGO COD, @MSG MSG
	SET NOCOUNT OFF;

END