USE [DB_AHSECO]
GO

BEGIN TRY
	DECLARE @Transaction VARCHAR(40) = 'Transaction Update_plantilla'
	BEGIN TRANSACTION @Transaction;
		DECLARE @ID INT

		ALTER TABLE [TBD_DATOS_GENERALES] ALTER COLUMN [VALOR2] NVARCHAR(400)
		
		UPDATE [TBM_DATOS_GENERALES] SET PREFIJO = 'URLS' WHERE DOMINIO = 'URLSERV'
		UPDATE [TBD_DATOS_GENERALES] SET PARAMETRO = 'URLS0001' WHERE DOMINIO = 'URLSERV'

		INSERT INTO  [TBM_DATOS_GENERALES] VALUES ('CORREODEST','CORR','Configuración de plantilla de correos',1,'system',GETDATE())
		SELECT @ID=CAST(SCOPE_IDENTITY() AS INT)
		INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CORR0001','CORREODEST','Plantilla de cotización para gerencia','PLANCOTGER','pminetti@ahsecoperu.pe','CC','',NULL,NULL,1,'system',GETDATE(),1,1)
		INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CORR0002','CORREODEST','Plantilla de cotización para logistica','PLANCOTLOG','logistica@ahseco.pe','CC','',NULL,NULL,1,'system',GETDATE(),1,1)
		INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CORR0003','CORREODEST','Plantilla de cotización para costos','PLANCOTCOS','felix@ahsecoperu.pe','CC','',NULL,NULL,1,'system',GETDATE(),1,1)
		INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CORR0004','CORREODEST','Plantilla de cotización para servicio tecnico','PLANCOTSTC','serviciotecnico@ahsecoperu.pe','CC','',NULL,NULL,1,'system',GETDATE(),1,1)
		INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CORR0005','CORREODEST','Plantilla de cotización para vendedor','PLANCOTVEN','','CC','',NULL,NULL,1,'system',GETDATE(),1,1)
		INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CORR0006','CORREODEST','Plantilla de Descuento Pendiente','PENAPDSCTO','pminetti@ahsecoperu.pe','CC','',NULL,NULL,1,'system',GETDATE(),1,1)
		INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CORR0007','CORREODEST','Plantilla de Descuento Aprobado','DSCTOAPROB','','CC','',NULL,NULL,1,'system',GETDATE(),1,1)
		INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CORR0008','CORREODEST','Plantilla de Descuento Desaprobado','DSCTODESAP','','CC','',NULL,NULL,1,'system',GETDATE(),1,1)
		INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CORR0009','CORREODEST','Plantilla de instalación técnica para vendedor','PLANINSTEC','','CC','pminetti@ahsecoperu.com;facturacion@ahsecoperu.com;ahseco@ahsecoperu.com;cobranzas@ahsecoperu.com',NULL,NULL,1,'system',GETDATE(),1,1)
		INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CORR0010','CORREODEST','Plantilla de Envio de Guia de Pedidos','PLANGUIAPE','logistica@ahsecoperu.com','CC','',NULL,NULL,1,'system',GETDATE(),1,1)
		INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CORR0011','CORREODEST','Plantilla de Atencion de Logistica Con Stock','PLANATLOCS','','CC','',NULL,NULL,1,'system',GETDATE(),1,1)
		INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CORR0012','CORREODEST','Plantilla de Atencion de Logistica Sin Stock','PLANATLOSS','','CC','',NULL,NULL,1,'system',GETDATE(),1,1)
		INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CORR0013','CORREODEST','Plantilla de Envio de Servicio Tecnico','PLANSTECV','serviciotecnico@ahsecoperu.com','CC','',NULL,NULL,1,'system',GETDATE(),1,1)
		INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CORR0014','CORREODEST','Plantilla de Envio de Guia de BO','PLANGUIABO','pminetti@ahsecoperu.pe','CC','',NULL,NULL,1,'system',GETDATE(),1,1)
		INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CORR0015','CORREODEST','Plantilla de Envio de Aprobacion a Importar','PLANAPRIMP','importaciones@ahsecoperu.com','CC','',NULL,NULL,1,'system',GETDATE(),1,1)
		INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CORR0016','CORREODEST','Plantilla de Envio de Facturacion','PLANFACTUR','facturacion@ahsecoperu.com','CC','',NULL,NULL,1,'system',GETDATE(),1,1)
		INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CORR0016','CORREODEST','Plantilla de Atencion de Facturacion','PLANATFACT','','CC','',NULL,NULL,1,'system',GETDATE(),1,1)
		INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CORR0016','CORREODEST','Plantilla de Atencion de Importación','PLANATEIMP','','CC','',NULL,NULL,1,'system',GETDATE(),1,1)
		INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CORR0016','CORREODEST','Plantilla Series Serv Tecnico Sin Stock','PLANSSERSS','serviciotecnico@ahsecoperu.com','CC','',NULL,NULL,1,'system',GETDATE(),1,1)
		INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CORR0016','CORREODEST','Plantilla Series Serv Tecnico Con Stock','PLANSSERCS','serviciotecnico@ahsecoperu.com','CC','',NULL,NULL,1,'system',GETDATE(),1,1)
		INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CORR0016','CORREODEST','Plantilla de Observacion de Gerencia','PLANOBSVTA','','CC','',NULL,NULL,1,'system',GETDATE(),1,1)
		INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CORR0016','CORREODEST','Plantilla de Fecha Ingreso Almacen','PLANFECING','','CC','',NULL,NULL,1,'system',GETDATE(),1,1)
		INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CORR0016','CORREODEST','Plantilla de Alertas de garantias proximas a vencer','PLANGARANT','','CC','',NULL,NULL,1,'system',GETDATE(),1,1)
		INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CORR0016','CORREODEST','Plantilla de Envío de Guía Manuscrita','PLANPREV','pminetti@ahsecoperu.pe','CC','',NULL,NULL,1,'system',GETDATE(),1,1)
		INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CORR0016','CORREODEST','Plantilla de Mantenimientos Preventivos proximos a vencer','PLANMANT','serviciotecnico@ahsecoperu.com','CC','',NULL,NULL,1,'system',GETDATE(),1,1)

	COMMIT TRANSACTION @Transaction;
END TRY 
BEGIN CATCH
	PRINT 'Error: ' + ERROR_MESSAGE();
    PRINT 'Código de error: ' + CAST(ERROR_NUMBER() AS VARCHAR);
	ROLLBACK TRANSACTION @Transaction;
END CATCH




