USE [DB_AHSECO]
GO

DECLARE @ID INT 
--INSERT TABLA DE DATOS GENERALES:
INSERT INTO  [TBM_DATOS_GENERALES] VALUES ('FLOWSOL','FLOW','Flujo de solicitud de ventas',1,'system',GETDATE())
SELECT @ID=CAST(SCOPE_IDENTITY() AS INT)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'FLOW0001','FLOWSOL','Ventas','1','Ventas',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'FLOW0002','FLOWSOL','Post - Ventas','2','Post - Ventas',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)


--DECLARE @ID INT 
INSERT INTO  [TBM_DATOS_GENERALES] VALUES ('MEDIOCONT','MCON','Medios de Contacto',1,'system',GETDATE())
SELECT @ID=CAST(SCOPE_IDENTITY() AS INT)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'MCON0001','MEDIOCONT','Medio Contacto 1','MED01','Tel�fono',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'MCON0002','MEDIOCONT','Medio Contacto 2','MED02','Correo Electr�nico',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'MCON0003','MEDIOCONT','Medio Contacto 3','MED03','Redes Sociales',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'MCON0004','MEDIOCONT','Medio Contacto 4','MED04','Avisos Publicitarios',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'MCON0005','MEDIOCONT','Medio Contacto 5','MED05','Whatsapp',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)

--DECLARE @ID INT 
INSERT INTO  [TBM_DATOS_GENERALES] VALUES ('SSVTSTOCK','SSVT','Stocks Solicitud Venta',0,'system',GETDATE())
SELECT @ID=CAST(SCOPE_IDENTITY() AS INT)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'SSVT0001','SSVTSTOCK','Con Stock','1','Con Stock',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'SSVT0002','SSVTSTOCK','Sin Stock','0','Sin Stock',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)

--DECLARE @ID INT 
INSERT INTO  [TBM_DATOS_GENERALES] VALUES ('TIPOSOLVT','TSOL','Tipos Solicitud Venta/Post-Venta',1,'system',GETDATE())
SELECT @ID=CAST(SCOPE_IDENTITY() AS INT)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TSOL0001','TIPOSOLVT','Tipo Solicitud 1','TSOL01','Servicio','2',NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TSOL0002','TIPOSOLVT','Tipo Solicitud 2','TSOL02','Repuestos o Consumibles','2',NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TSOL0003','TIPOSOLVT','Tipo Solicitud 3','TSOL03','Servicios y Repuestos','2',NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TSOL0004','TIPOSOLVT','Tipo Solicitud 4','TSOL04','Venta Materiales','1',NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TSOL0005','TIPOSOLVT','Tipo Solicitud 5','TSOL05','Venta de Equipos','1',NULL,NULL,NULL,1,'system',GETDATE(),1,1)


--DECLARE @ID INT 
INSERT INTO  [TBM_DATOS_GENERALES] VALUES ('TIPMONEDA','TMON','Tipo de Moneda',0,'system',GETDATE())
SELECT @ID=CAST(SCOPE_IDENTITY() AS INT)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TMON0001','TIPMONEDA','Moneda 1','MON01','Soles','PEN',NULL,'S/.',NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TMON0002','TIPMONEDA','Moneda 2','MON02','D�lares Americanos','USD',NULL,'$',NULL,1,'system',GETDATE(),1,1)

--DECLARE @ID INT 
INSERT INTO  [TBM_DATOS_GENERALES] VALUES ('GARANTIAS','GARN','Garant�as',1,'system',GETDATE())
SELECT @ID=CAST(SCOPE_IDENTITY() AS INT)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'GARN0001','GARANTIAS','Garantia 1','GAR06','6 MESES',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'GARN0002','GARANTIAS','Garantia 2','GAR12','12 MESES',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'GARN0003','GARANTIAS','Garantia 3','GAR24','24 MESES',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'GARN0004','GARANTIAS','Garantia 4','GAR36','36 MESES',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'GARN0005','GARANTIAS','Garantia 5','GAR48','48 MESES',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'GARN0006','GARANTIAS','Garantia 6','GAR60','60 MESES',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)

--DECLARE @ID INT 
INSERT INTO  [TBM_DATOS_GENERALES] VALUES ('CDALMACEN','CALM','C�digo de Almacenes',1,'system',GETDATE())
SELECT @ID=CAST(SCOPE_IDENTITY() AS INT)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CALM0001','CDALMACEN','Almacen 1','0001','ALMACEN PRINCIPAL',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CALM0002','CDALMACEN','Almacen 2','0017','ALMACEN SERVICIO TECNICO',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)

--DECLARE @ID INT 
INSERT INTO  [TBM_DATOS_GENERALES] VALUES ('FORMAPAGO','FPAG','Formas de Pago',1,'system',GETDATE())
SELECT @ID=CAST(SCOPE_IDENTITY() AS INT)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'FPAG0001','FORMAPAGO','Forma de Pago 1','FPAG01','Adelantado',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'FPAG0002','FORMAPAGO','Forma de Pago 2','FPAG02','Contra Entrega',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'FPAG0003','FORMAPAGO','Forma de Pago 3','FPAG03','1 D�a',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'FPAG0004','FORMAPAGO','Forma de Pago 4','FPAG04','7 D�as',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'FPAG0005','FORMAPAGO','Forma de Pago 5','FPAG05','15 D�as',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'FPAG0006','FORMAPAGO','Forma de Pago 6','FPAG06','30 D�as',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'FPAG0007','FORMAPAGO','Forma de Pago 7','FPAG07','60 D�as',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'FPAG0008','FORMAPAGO','Forma de Pago 8','FPAG08','90 D�as',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'FPAG0009','FORMAPAGO','Forma de Pago 9','FPAG09','120 D�as',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)


--DECLARE @ID INT 
INSERT INTO  [TBM_DATOS_GENERALES] VALUES ('TIPOSERV','SERV','Tipo de Servicios',1,'system',GETDATE())
SELECT @ID=CAST(SCOPE_IDENTITY() AS INT)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'SERV0001','TIPOSERV','Tipo Servicio 1','SERV01','Mantenimiento Preventivo',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)

/*
select * from TBM_DATOS_GENERALES
select * from TBD_DATOS_GENERALES
*/



