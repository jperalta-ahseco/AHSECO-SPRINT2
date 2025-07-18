USE [DB_AHSECO]
GO

BEGIN TRY
	DECLARE @Transaction VARCHAR(40) = 'Transaction Update_Datos'
	BEGIN TRANSACTION @Transaction;
	
		IF OBJECT_ID('#tmpDatos_insert') IS NOT NULL DROP TABLE #tmpDatos_insert
		
		--Construimos tabla temporal
		
		SELECT
			ID_CABECERA
			,REPLACE(PARAMETRO,'TIPDOC','TDOC00') PARAMETRO
			,DOMINIO
			,DESCRIPCION
			,COD_VALOR1
			,VALOR1
			,COD_VALOR2
			,VALOR2
			,COD_VALOR3
			,VALOR3
			,ESTADO
			,AUDIT_USR
			,AUDIT_TIMESTAMP
			,HABILITADO
			,EDITABLE
		INTO #tmpDatos_insert
		FROM TBD_DATOS_GENERALES WHERE DOMINIO = 'TIPODOC'
		---
		---Limpiamos la tabla de plantilla
		DELETE FROM TBD_DATOS_GENERALES WHERE DOMINIO = 'TIPODOC'
		-----

		---Generamos nueva data de plantillas
		INSERT INTO TBD_DATOS_GENERALES
		SELECT * from #tmpDatos_insert
		--

		DROP TABLE #tmpDatos_insert

	COMMIT TRANSACTION @Transaction;
END TRY 
BEGIN CATCH
	PRINT 'Error: ' + ERROR_MESSAGE();
    PRINT 'Código de error: ' + CAST(ERROR_NUMBER() AS VARCHAR);
	ROLLBACK TRANSACTION @Transaction;
END CATCH