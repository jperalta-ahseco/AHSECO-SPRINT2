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
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TSOL0001','TIPOSOLVT','Tipo Solicitud 1','TSOL01','Servicio','2',NULL,'GRPFAM01','02;03;06',1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TSOL0002','TIPOSOLVT','Tipo Solicitud 2','TSOL02','Repuestos o Consumibles','2',NULL,'GRPFAM02','06',1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TSOL0003','TIPOSOLVT','Tipo Solicitud 3','TSOL03','Servicios y Repuestos','2',NULL,'GRPFAM03','02;03;06',1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TSOL0004','TIPOSOLVT','Tipo Solicitud 4','TSOL04','Venta Materiales','1',NULL,'GRPFAM04','02;03;06',1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TSOL0005','TIPOSOLVT','Tipo Solicitud 5','TSOL05','Venta de Equipos','1',NULL,'GRPFAM05','01;03;04;08',1,'system',GETDATE(),1,1)


--DECLARE @ID INT 
INSERT INTO  [TBM_DATOS_GENERALES] VALUES ('TIPMONEDA','TMON','Tipo de Moneda',0,'system',GETDATE())
SELECT @ID=CAST(SCOPE_IDENTITY() AS INT)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TMON0001','TIPMONEDA','Moneda 1','MON01','Soles','PEN',NULL,'S/.',NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TMON0002','TIPMONEDA','Moneda 2','MON02','D�lares Americanos','USD',NULL,'$',NULL,1,'system',GETDATE(),1,1)


--DECLARE @ID INT 
INSERT INTO  [TBM_DATOS_GENERALES] VALUES ('GARANTIAS','GARN','Garant�as',1,'system',GETDATE())
SELECT @ID=CAST(SCOPE_IDENTITY() AS INT)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'GARN0001','GARANTIAS','Garantia 1','GAR06','6 MESES','6',NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'GARN0002','GARANTIAS','Garantia 2','GAR12','12 MESES','12',NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'GARN0003','GARANTIAS','Garantia 3','GAR24','24 MESES','24',NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'GARN0004','GARANTIAS','Garantia 4','GAR36','36 MESES','36',NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'GARN0005','GARANTIAS','Garantia 5','GAR48','48 MESES','48',NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'GARN0006','GARANTIAS','Garantia 6','GAR60','60 MESES','60',NULL,NULL,NULL,1,'system',GETDATE(),1,1)


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
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'SERV0001','TIPOSERV','Tipo Servicio 1','SERV01','Calibraci�n',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'SERV0002','TIPOSERV','Tipo Servicio 2','SERV02','Capacitaci�n',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'SERV0003','TIPOSERV','Tipo Servicio 3','SERV03','Configuraci�n de Software',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'SERV0004','TIPOSERV','Tipo Servicio 4','SERV04','Diagnostico',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'SERV0005','TIPOSERV','Tipo Servicio 5','SERV05','Instalaci�n',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'SERV0006','TIPOSERV','Tipo Servicio 6','SERV06','Mantenimiento Preventivo',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'SERV0007','TIPOSERV','Tipo Servicio 7','SERV07','Mantenimiento Correctivo',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)


--DECLARE @ID INT 
INSERT INTO  [TBM_DATOS_GENERALES] VALUES ('CICLOPREV','CIPR','Ciclos de Preventivo',1,'system',GETDATE())
SELECT @ID=CAST(SCOPE_IDENTITY() AS INT)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CIPR0001','CICLOPREV','Diario',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CIPR0002','CICLOPREV','Semanal',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CIPR0003','CICLOPREV','Quincenal',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CIPR0004','CICLOPREV','Mensual',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CIPR0005','CICLOPREV','Bimestral',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CIPR0006','CICLOPREV','Trimestral',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CIPR0007','CICLOPREV','Cuatrimestral',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CIPR0008','CICLOPREV','Quimestral',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CIPR0009','CICLOPREV','Semestral',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CIPR0010','CICLOPREV','Septimestral',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CIPR0011','CICLOPREV','Octamestral',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CIPR0012','CICLOPREV','Novamestral',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CIPR0013','CICLOPREV','Decamestral',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CIPR0014','CICLOPREV','Anual',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)


--DECLARE @ID INT 
INSERT INTO  [TBM_DATOS_GENERALES] VALUES ('TIPOVENTA','TVEN','Tipo de ventas',1,'system',GETDATE())
SELECT @ID=CAST(SCOPE_IDENTITY() AS INT)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TVEN0001','TIPOVENTA','Tipo de Venta 1','TVEN01','Venta Directa',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TVEN0002','TIPOVENTA','Tipo de Venta 2','TVEN02','Venta con Licitaci�n',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)


--DECLARE @ID INT 
INSERT INTO  [TBM_DATOS_GENERALES] VALUES ('DOCXINSTA','DCXI','Documentos por Instalaci�n',1,'system',GETDATE())
SELECT @ID=CAST(SCOPE_IDENTITY() AS INT)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'DCXI0001','DOCXINSTA','Acta',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'DCXI0002','DOCXINSTA','Programa de Mantenimiento Preventivo',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'DCXI0003','DOCXINSTA','Procedimiento de Mantenimiento Preventivo',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'DCXI0004','DOCXINSTA','Protocolo de Pruebas',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'DCXI0005','DOCXINSTA','Resultado de Protocolo',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'DCXI0006','DOCXINSTA','Ficha T�cnica',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'DCXI0007','DOCXINSTA','Certificado de Garant�a (AHSECO)',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'DCXI0008','DOCXINSTA','Certificado de Garant�a (PROVEEDOR)',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'DCXI0009','DOCXINSTA','Certificado de A�o de Fabricaci�n',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'DCXI0010','DOCXINSTA','Tem�tica (Horas) Usuario',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'DCXI0011','DOCXINSTA','Tem�tica (Horas) Usuario',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'DCXI0012','DOCXINSTA','Constancia de Capacitaci�n Usuario',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'DCXI0013','DOCXINSTA','Constancia de Capacitaci�n T�cnico',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)


--DECLARE @ID INT 
INSERT INTO [TBM_DATOS_GENERALES] VALUES ('COSTOXCD','CXCD','Costos de Env�o por Venta',1,'system',GETDATE())
SELECT @ID=CAST(SCOPE_IDENTITY() AS INT)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CXCD0001','COSTOXCD','Trabajo LLave en mano',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CXCD0002','COSTOXCD','Instalaci�n',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CXCD0003','COSTOXCD','Capacitaci�n',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CXCD0004','COSTOXCD','Manuales',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CXCD0005','COSTOXCD','Videos',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CXCD0006','COSTOXCD','Mantenimiento Preventivo',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CXCD0007','COSTOXCD','Calibraci�n',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'CXCD0008','COSTOXCD','Flete',NULL,NULL,NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)


--DECLARE @ID INT
SELECT @ID=ID FROM  [TBM_DATOS_GENERALES] WHERE DOMINIO='TIPODOC'

--INSTALACION TECNICA:
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TIPDOC05','TIPODOC','Tipo Documento 5','3','','DI01','Acta de Instalaci�n','','',1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TIPDOC06','TIPODOC','Tipo Documento 6','3','','DI02','Otros Documentos','','',1,'system',GETDATE(),1,1)
--VENTAS
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TIPDOC07','TIPODOC','Tipo Documento 7','1','','DVT01','Acta de Conformidad','','',1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TIPDOC08','TIPODOC','Tipo Documento 8','1','','DVT02','Constancia Servicio T�cnico','','',1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TIPDOC09','TIPODOC','Tipo Documento 9','1','','DVT03','Factura','','',1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TIPDOC10','TIPODOC','Tipo Documento 10','1','','DVT04','Ficha de Instalaci�n','','',1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TIPDOC11','TIPODOC','Tipo Documento 11','1','','DVT05','Gu�a Manuscrita','','',1,'system',GETDATE(),1,1)

--GARANTIAS
--DECLARE @ID INT
SELECT @ID=ID FROM  [TBM_DATOS_GENERALES] WHERE DOMINIO='TIPODOC'

INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TIPDOC12','TIPODOC','Tipo Documento 12','7','','DG01','Constancia de Servicio T�cnico','','',1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TIPDOC13','TIPODOC','Tipo Documento 13','7','','DG02','Otros Documentos','','',1,'system',GETDATE(),1,1)

--POST-VENTA:
--DECLARE @ID INT
SELECT @ID=ID FROM  [TBM_DATOS_GENERALES] WHERE DOMINIO='TIPODOC'
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TIPDOC14','TIPODOC','Tipo Documento 14','1','','DVT06','Gu�a de BO','','',1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TIPDOC15','TIPODOC','Tipo Documento 15','1','','DVT07','Gu�a de Pedidos','','',1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TIPDOC16','TIPODOC','Tipo Documento 16','1','','DVT08','Gu�a de Remision','','',1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TIPDOC17','TIPODOC','Tipo Documento 17','1','','DVT09','Otros Documentos','','',1,'system',GETDATE(),1,1)



--DECLARE @ID INT 
INSERT INTO  [TBM_DATOS_GENERALES] VALUES ('URGENCIA','URG','Niveles de Urgencia',1,'system',GETDATE())
SELECT @ID=CAST(SCOPE_IDENTITY() AS INT)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'URG0001','URGENCIA','Urgencia Alta','URG1','Alta',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'URG0002','URGENCIA','Urgencia Media','URG2','Media',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'URG0003','URGENCIA','Urgencia Baja','URG3','Baja',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)

--MOTIVOS
--Rango d�as garant�a pr�xima a vencer.
--DECLARE @ID INT 
INSERT INTO  [TBM_DATOS_GENERALES] VALUES ('MOTIVOSREC','MTVREC','Motivos de Reclamo',1,'system',GETDATE())
SELECT @ID=CAST(SCOPE_IDENTITY() AS INT)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'MTVREC0001','MOTIVOSREC','Cambio de Repuesto','MTVREC1','Cambio de Repuesto',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'MTVREC0002','MOTIVOSREC','Consulta a F�brica','MTVREC2','Consulta a F�brica',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'MTVREC0003','MOTIVOSREC','Actualizaci�n Software','MTVREC3','Actualizaci�n Software',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'MTVREC0003','MOTIVOSREC','Configuraci�n','MTVREC3','Configuraci�n',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'MTVREC0003','MOTIVOSREC','Diagn�stico','MTVREC3','Diagn�stico',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)


--Rango d�as garant�a pr�xima a vencer.
--DECLARE @ID INT 
INSERT INTO  [TBM_DATOS_GENERALES] VALUES ('DIASGAR','DXVG','D�as para vencer garant�a',1,'system',GETDATE())
SELECT @ID=CAST(SCOPE_IDENTITY() AS INT)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'DXVG0001','DIASGAR','D�as en vencer garant�as','DIAS1','40',NULL,NULL,NULL,NULL,1,'system',GETDATE(),1,1)

--PREVENTIVOS
--DECLARE @ID INT
SELECT @ID=ID FROM  [TBM_DATOS_GENERALES] WHERE DOMINIO='TIPODOC'

INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TIPDOC14','TIPODOC','Tipo Documento 14','6','','DP01','Constancia','','',1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TIPDOC15','TIPODOC','Tipo Documento 15','6','','DP02','Informe','','',1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TIPDOC16','TIPODOC','Tipo Documento 16','6','','DP03','OTM','','',1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TIPDOC17','TIPODOC','Tipo Documento 17','6','','DP04','Gu�a Manuscrita','','',1,'system',GETDATE(),1,1)
INSERT INTO [TBD_DATOS_GENERALES] VALUES (@ID,'TIPDOC18','TIPODOC','Tipo Documento 18','6','','DP05','Otros Documentos','','',1,'system',GETDATE(),1,1)



/*
select * from TBM_DATOS_GENERALES
select * from TBD_DATOS_GENERALES
*/



