USE [DB_AHSECO]
GO

BEGIN TRY
	DECLARE @Transaction VARCHAR(40) = 'Transaction Update_plantilla'
	BEGIN TRANSACTION @Transaction;
	
		IF OBJECT_ID('#tmpPlantillas_insert') IS NOT NULL DROP TABLE #tmpPlantillas_insert
		
		
		DECLARE @ID INT
		DECLARE @NEWBODY VARCHAR(MAX)
		DECLARE @PARAM VARCHAR(200)
		DECLARE @COUNT INT
		DECLARE @I int

		INSERT INTO  [TBM_DATOS_GENERALES] VALUES ('URLSERV','URLS','Url de Servidor',1,'system',GETDATE())
		SELECT @ID=CAST(SCOPE_IDENTITY() AS INT)
		INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'URLS0001','URLSERV','Url de servidor','URL01','https://192.168.1.220/',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)

		--Construimos tabla temporal
		SELECT 
				COD_PLANTILLA
				,ID_PROCESO
				,DES_PLANTILLA
				,[TO]
				,[CC]
				,[SUBJECT]
				,REPLACE(BODY,'https://192.168.1.220/', '{URL}') As BODY
				,USR_REG
				,FEC_REG
				,USR_MOD
				,FEC_MOD
			INTO #tmpPlantillas_insert
			FROM TBM_PLANTILLAS
		---
		---Limpiamos la tabla de plantilla
		TRUNCATE TABLE TBM_PLANTILLAS
		-----

		---Generamos nueva data de plantillas
		INSERT INTO TBM_PLANTILLAS
		SELECT * from #tmpPlantillas_insert
		--

		DROP TABLE #tmpPlantillas_insert

	COMMIT TRANSACTION @Transaction;
END TRY 
BEGIN CATCH
	PRINT 'Error: ' + ERROR_MESSAGE();
    PRINT 'Código de error: ' + CAST(ERROR_NUMBER() AS VARCHAR);
	ROLLBACK TRANSACTION @Transaction;
END CATCH




