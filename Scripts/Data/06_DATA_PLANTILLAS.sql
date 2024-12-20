USE [DB_AHSECO]
GO

--SELECT * FROM TBM_PLANTILLAS

INSERT INTO TBM_PLANTILLAS
VALUES('PLANCOTGER',1,'Plantilla de cotización para gerencia','pminetti@ahsecoperu.pe','','PENDIENTE COSTO FOB - N° SOLICITUD {NRO_SOL}',
			   '<p>Sr. Pedro Minetti,</p>
<p>Usted tiene pendiente de ingreso del costo FOB de cotizaci&oacute;n de la solicitud N&deg; {NRO_SOL} para la empresa {NOM_EMPRESA} solicitado por {NOMBRE_VENDEDOR}.</p>
<p>Por favor ingrese al sistema para completar los datos. Ingrese al siguiente link: <a href="https://192.168.1.220/"><span data-olk-copy-source="MessageBody">https://192.168.1.220/</span></a> .</p>','SYSTEM',GETDATE(),NULL,NULL);

INSERT INTO TBM_PLANTILLAS
VALUES('PLANCOTLOG',1,'Plantilla de cotización para logistica','logistica@ahseco.pe','','PENDIENTE PARA COSTOS - N° SOLICITUD {NRO_SOL}',
			   '<p>Estimado(a),</p>
<p>Ustedes tiene pendiente de ingreso del costos de cotizaci&oacute;n de la solicitud N&deg; {NRO_SOL} para la empresa {NOM_EMPRESA} solicitado por {NOMBRE_VENDEDOR}.</p>
<p>Por favor ingrese al sistema para completar los datos. Ingrese al siguiente link: <a href="https://192.168.1.220/"><span data-olk-copy-source="MessageBody">https://192.168.1.220/</span></a> .</p>','SYSTEM',GETDATE(),NULL,NULL);

INSERT INTO TBM_PLANTILLAS
VALUES('PLANCOTCOS',1,'Plantilla de cotización para costos','felix@ahsecoperu.pe','','PENDIENTE PARA COSTOS - N° SOLICITUD {NRO_SOL}',
			   '<p>Estimado(a),</p>
<p>Usted tiene pendiente de ingreso de costos para la cotizaci&oacute;n de la solicitud N&deg; {NRO_SOL} para la empresa {NOM_EMPRESA} solicitado por {NOMBRE_VENDEDOR}.</p>
<p>Por favor ingrese al sistema para completar los datos. Ingrese al siguiente link: <a href="https://192.168.1.220/"><span data-olk-copy-source="MessageBody">https://192.168.1.220/</span></a> .</p>','SYSTEM',GETDATE(),NULL,NULL);


INSERT INTO TBM_PLANTILLAS
VALUES('PLANCOTSTC',1,'Plantilla de cotización para servicio tecnico','serviciotecnico@ahsecoperu.pe','','PENDIENTE PARA COSTOS - N° SOLICITUD {NRO_SOL}',
			   '<p>Servicio Técnico,</p>
<p>Usted tiene pendiente de ingreso de costos de la cotizaci&oacute;n de la solicitud N&deg; {NRO_SOL} para la empresa {NOM_EMPRESA} solicitado por {NOMBRE_VENDEDOR}.</p>
<p>Por favor ingrese al sistema para completar los datos. Ingrese al siguiente link: <a href="https://192.168.1.220/"><span data-olk-copy-source="MessageBody">https://192.168.1.220/</span></a> .</p>','SYSTEM',GETDATE(),NULL,NULL);


INSERT INTO TBM_PLANTILLAS
VALUES('PLANCOTVEN',1,'Plantilla de cotización para vendedor','','','FINALIZACIÓN DE INGRESO DE COSTOS - N° SOLICITUD {NRO_SOL}',
			   '<p>Sr(a). Vendedor(a), {NOM_VENDEDOR}</p>
<p>Se finalizó el ingreso de montos de la cotizaci&oacute;n perteneciente en la solicitud N&deg; {NRO_SOL} para la empresa {NOM_EMPRESA}.</p>
<p>Por favor ingrese al sistema para continuar con el flujo de venta. Ingrese al siguiente link: <a href="https://192.168.1.220/"><span data-olk-copy-source="MessageBody">https://192.168.1.220/</span></a> .</p>','SYSTEM',GETDATE(),NULL,NULL);

INSERT INTO TBM_PLANTILLAS
VALUES('PLANINSTEC',3,'Plantilla de instalación técnica para vendedor','','pminetti@ahsecoperu.com;facturacion@ahsecoperu.com;ahseco@ahsecoperu.com;cobranzas@ahsecoperu.com','FINALIZACIÓN DE INSTALACIÓN DE EQUIPOS - N° SOLICITUD {NRO_SOL}',
			   '<p>Estimado(a)s,</p>
<p>Se finalizó la instalación de los equipos pertenecientes a la solicitud de venta N°{NRO_SOL} para el cliente {CLIENTE} con el requerimiento N°{NRO_REQ}.</p>
<p>Detalle:</p>
{DETALLE_EQUIPOS}
<p>Se adjunta el documento: Acta de Instalación, que contiene un mayor detalle.</p>
<p>Ingrese al siguiente link para más información: <a href="https://192.168.1.220/"><span data-olk-copy-source="MessageBody">https://192.168.1.220/</span></a> .</p>','SYSTEM',GETDATE(),NULL,NULL);

-- para despacho:
INSERT INTO TBM_PLANTILLAS
VALUES('PLANGUIAPE',1,'Plantilla de Envio de Guia de Pedidos','logistica@ahsecoperu.com','','GUIA DE PEDIDOS - N° SOLICITUD {NRO_SOL}',
			   '<p>Estimado Logistica,</p>
<p>Se realiza el envio de la guía de pedidos de la solicitud N°{NRO_SOL} para el cliente {CLIENTE}.</p>
<p>Su apoyo con la atención de lo solicitado.</p>
<p>Por favor ingrese al sistema para continuar con el flujo de venta. Ingrese al siguiente link: <a href="https://192.168.1.220/"><span data-olk-copy-source="MessageBody">https://192.168.1.220/</span></a> .</p>','SYSTEM',GETDATE(),NULL,NULL);

INSERT INTO TBM_PLANTILLAS
VALUES('PLANATLOCS',1,'Plantilla de Atencion de Logistica Con Stock','','','ATENCION PRODUCTOS CON STOCK - N° SOLICITUD {NRO_SOL}',
			   '<p>Sr(a). Vendedor(a), {NOM_VENDEDOR}</p>
<p>Se realiza la atención del despacho de la solicitud N°{NRO_SOL} para el cliente {CLIENTE}.</p>
<p>Por favor ingrese al sistema para continuar con el flujo de venta. Ingrese al siguiente link: <a href="https://192.168.1.220/"><span data-olk-copy-source="MessageBody">https://192.168.1.220/</span></a> .</p>','SYSTEM',GETDATE(),NULL,NULL);

INSERT INTO TBM_PLANTILLAS
VALUES('PLANATLOSS',1,'Plantilla de Atencion de Logistica Sin Stock','','','ATENCION PRODUCTOS SIN STOCK - N° SOLICITUD {NRO_SOL}',
			   '<p>Sr(a). Vendedor(a), {NOM_VENDEDOR}</p>
<p>Se realiza la atención del despacho de la solicitud N°{NRO_SOL} para el cliente {CLIENTE}.</p>
<p>Por favor ingrese al sistema para continuar con el flujo de venta. Ingrese al siguiente link: <a href="https://192.168.1.220/"><span data-olk-copy-source="MessageBody">https://192.168.1.220/</span></a> .</p>','SYSTEM',GETDATE(),NULL,NULL);

INSERT INTO TBM_PLANTILLAS
VALUES('PLANSTECV',1,'Plantilla de Envio de Servicio Tecnico','serviciotecnico@ahsecoperu.com','','ATENCION DE SERVICIO TECNICO - N° SOLICITUD {NRO_SOL}',
			   '<p>Estimado(a) {NOM_COORDINADOR},</p>
<p>Se acordo la aprobación de la cotizacion de la solicitud N°{NRO_SOL} para el cliente {CLIENTE}.</p>
<p>Su apoyo con la atención de la programación de la instalación.</p>
<p>Por favor ingrese al sistema para continuar con el flujo de venta. Ingrese al siguiente link: <a href="https://192.168.1.220/"><span data-olk-copy-source="MessageBody">https://192.168.1.220/</span></a> .</p>','SYSTEM',GETDATE(),NULL,NULL);

INSERT INTO TBM_PLANTILLAS
VALUES('PLANGUIABO',1,'Plantilla de Envio de Guia de BO','pminetti@ahsecoperu.pe','','GUIA DE BO - N° SOLICITUD {NRO_SOL}',
			   '<p>Estimado Sr. {NOM_GERENTE},</p>
<p>Se realiza el envio de la guía de BO de la solicitud N°{NRO_SOL} para el cliente {CLIENTE}.</p>
<p>Para su revisión.</p>
<p>Por favor ingrese al sistema para continuar con el flujo de venta. Ingrese al siguiente link: <a href="https://192.168.1.220/"><span data-olk-copy-source="MessageBody">https://192.168.1.220/</span></a> .</p>','SYSTEM',GETDATE(),NULL,NULL);

INSERT INTO TBM_PLANTILLAS
VALUES('PLANAPRIMP',1,'Plantilla de Envio de Aprobacion a Importar','importaciones@ahsecoperu.com','importaciones2@ahsecoperu.com','APROBACIÓN DE IMPORTACIÓN - N° SOLICITUD {NRO_SOL}',
			   '<p>Estimada Área de Importación,</p>
<p>Se realiza la aprobación de la importación de la solicitud N°{NRO_SOL} para el cliente {CLIENTE}.</p>
<p>Su apoyo con la atención.</p>
<p>Por favor ingrese al sistema para continuar con el flujo de venta. Ingrese al siguiente link: <a href="https://192.168.1.220/"><span data-olk-copy-source="MessageBody">https://192.168.1.220/</span></a> .</p>','SYSTEM',GETDATE(),NULL,NULL);

INSERT INTO TBM_PLANTILLAS
VALUES('PLANFACTUR',1,'Plantilla de Envio de Facturacion','facturacion@ahsecoperu.com','','ATENCIÓN DE FACTURACIÓN - N° SOLICITUD {NRO_SOL}',
			   '<p>Estimada Área de Facturación,</p>
<p>Se realiza el envío de la solicitud N°{NRO_SOL} para el cliente {CLIENTE}.</p>
<p>Su apoyo con la atención del ingreso de datos de la factura de servicio.</p>
<p>Por favor ingrese al sistema para continuar con el flujo de venta. Ingrese al siguiente link: <a href="https://192.168.1.220/"><span data-olk-copy-source="MessageBody">https://192.168.1.220/</span></a> .</p>','SYSTEM',GETDATE(),NULL,NULL);

INSERT INTO TBM_PLANTILLAS
VALUES('PLANATFACT',1,'Plantilla de Atencion de Facturacion','','','ATENCION DE FACTURACIÓN - N° SOLICITUD {NRO_SOL}',
			   '<p>Sr. Coordinador de Servicios</p>
<p>Se realiza el ingreso de la facturación de la solicitud N°{NRO_SOL} para el cliente {CLIENTE}.</p>
<p>Por favor ingrese al sistema para continuar con el flujo de venta. Ingrese al siguiente link: <a href="https://192.168.1.220/"><span data-olk-copy-source="MessageBody">https://192.168.1.220/</span></a> .</p>','SYSTEM',GETDATE(),NULL,NULL);

INSERT INTO TBM_PLANTILLAS
VALUES('PLANATEIMP',1,'Plantilla de Atencion de Importación','','','ATENCION DE IMPORTACIÓN - N° SOLICITUD {NRO_SOL}',
			   '<p>Estimado(a). Vendedor(a), {NOM_VENDEDOR}</p>
<p>Se realiza el ingreso de los datos de importación de la solicitud N°{NRO_SOL} para el cliente {CLIENTE}.</p>
<p>Por favor ingrese al sistema para continuar con el flujo de venta. Ingrese al siguiente link: <a href="https://192.168.1.220/"><span data-olk-copy-source="MessageBody">https://192.168.1.220/</span></a> .</p>','SYSTEM',GETDATE(),NULL,NULL);


INSERT INTO TBM_PLANTILLAS
VALUES('PLANSSERSS',1,'Plantilla Series Serv Tecnico Sin Stock','serviciotecnico@ahsecoperu.com','','SERIES COMPLETAS SIN STOCK - N° SOLICITUD {NRO_SOL}',
			   '<p>Estimada Área de Servicio Técnico</p>
<p>Se completaron los registros de las series de los productos sin stock de la solicitud N°{NRO_SOL} para el cliente {CLIENTE}.</p>
<p>Por favor ingrese al sistema para continuar con el flujo de instalación. Ingrese al siguiente link: <a href="https://192.168.1.220/"><span data-olk-copy-source="MessageBody">https://192.168.1.220/</span></a> .</p>','SYSTEM',GETDATE(),NULL,NULL);

INSERT INTO TBM_PLANTILLAS
VALUES('PLANSSERCS',1,'Plantilla Series Serv Tecnico Con Stock','serviciotecnico@ahsecoperu.com','','SERIES COMPLETAS CON STOCK - N° SOLICITUD {NRO_SOL}',
			   '<p>Estimada Área de Servicio Técnico</p>
<p>Se completaron los registros de las series de los productos con stock de la solicitud N°{NRO_SOL} para el cliente {CLIENTE}.</p>
<p>Por favor ingrese al sistema para continuar con el flujo de instalación. Ingrese al siguiente link: <a href="https://192.168.1.220/"><span data-olk-copy-source="MessageBody">https://192.168.1.220/</span></a> .</p>','SYSTEM',GETDATE(),NULL,NULL);



--ALERTA DE GARANTIAS:
INSERT INTO TBM_PLANTILLAS
VALUES('PLANGARANT',7,'Plantilla de Alertas de garantias proximas a vencer','serviciotecnico@ahsecoperu.com','','GARANTIAS PROXIMAS A VENCER',
			   '<p>Estimada &Aacute;rea de Servicio T&eacute;cnico,</p>
<p>Se encuentran pr&oacute;ximas a vencer las garant&iacute;as de los siguientes equipos.</p>
<p>{TABLA_DETALLE}</p>
<p>Por favor ingrese al sistema para visualizar la informaci&oacute;n a m&aacute;s detalle. Ingrese al siguiente link: <a href="https://192.168.1.220/"><span data-olk-copy-source="MessageBody">https://192.168.1.220/</span></a>&nbsp;.</p>','SYSTEM',GETDATE(),NULL,NULL);

--Mantenimiento Preventivo
INSERT INTO TBM_PLANTILLAS
VALUES('PLANPREV',6,'Plantilla de Envío de Guía Manuscrita','pminetti@ahsecoperu.pe','','MANTENIMIENTO PREVENTIVO',
			   '<p>Estimado Sr. {NOM_GERENTE},</p>
<p>Se env&iacute;a el documento: Gu&iacute;a Manuscrita, para su revisión</p>
<p>Se realizó el mantenimiento preventivo N°{NRO_PREV} del equipo: {NOM_EQUIPO} de la solicitud de venta N°{NRO_SOL} para el cliente {CLIENTE}.</p>
<p>Por favor ingrese al sistema para visualizar la informaci&oacute;n a m&aacute;s detalle. Ingrese al siguiente link: <a href="https://192.168.1.220/"><span data-olk-copy-source="MessageBody">https://192.168.1.220/</span></a>&nbsp;.</p>','SYSTEM',GETDATE(),NULL,NULL);

--ALERTA DE PREVENTIVOS:
INSERT INTO TBM_PLANTILLAS
VALUES('PLANMANT',6,'Plantilla de Mantenimientos Preventivos proximos a vencer','serviciotecnico@ahsecoperu.com','','MANT. PREVENTIVOS PROXIMOS A REALIZAR',
			   '<p>Estimada &Aacute;rea de Servicio T&eacute;cnico,</p>
<p>Se encuentran pr&oacute;ximas a vencer, los mantenimientos preventivos de los siguientes equipos.</p>
<p>{TABLA_DETALLE}</p>
<p>Por favor ingrese al sistema para visualizar la informaci&oacute;n a m&aacute;s detalle. Ingrese al siguiente link: <a href="https://192.168.1.220/"><span data-olk-copy-source="MessageBody">https://192.168.1.220/</span></a>&nbsp;.</p>','SYSTEM',GETDATE(),NULL,NULL);

