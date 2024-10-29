USE [DB_AHSECO]
GO

--SELECT * FROM TBM_PLANTILLAS

INSERT INTO TBM_PLANTILLAS
VALUES('PLANCOTGER',1,'Plantilla de cotización para gerencia','pminetti@ahsecoperu.pe','','PENDIENTE COSTO FOB - N° SOLICITUD {NRO_SOL}',
			   '<p>Sr. Pedro Minetti,</p>
<p>Usted tiene pendiente de ingreso del costo FOB de cotizaci&oacute;n de la solicitud N&deg; {NRO_SOL} para la empresa {NOM_EMPRESA} solicitado por el vendedor {NOMBRE_VENDEDOR}.</p>
<p>Por favor ingrese al sistema para completar los datos. Ingrese al siguiente link: <a href="https://192.168.1.220/"><span data-olk-copy-source="MessageBody">https://192.168.1.220/</span></a> .</p>','SYSTEM',GETDATE(),NULL,NULL);

INSERT INTO TBM_PLANTILLAS
VALUES('PLANCOTLOG',1,'Plantilla de cotización para logistica','logistica@ahseco.pe','','PENDIENTE PARA COSTOS - N° SOLICITUD {NRO_SOL}',
			   '<p>Estimada Area de Logistica</p>
<p>Ustedes tiene pendiente de ingreso del costos de cotizaci&oacute;n de la solicitud N&deg; {NRO_SOL} para la empresa {NOM_EMPRESA} solicitado por el vendedor {NOMBRE_VENDEDOR}.</p>
<p>Por favor ingrese al sistema para completar los datos. Ingrese al siguiente link: <a href="https://192.168.1.220/"><span data-olk-copy-source="MessageBody">https://192.168.1.220/</span></a> .</p>','SYSTEM',GETDATE(),NULL,NULL);

INSERT INTO TBM_PLANTILLAS
VALUES('PLANCOTCOS',1,'Plantilla de cotización para costos','felix@ahsecoperu.pe','','PENDIENTE PARA COSTOS - N° SOLICITUD {NRO_SOL}',
			   '<p>Sr. Felix,</p>
<p>Usted tiene pendiente de ingreso de costos para la cotizaci&oacute;n de la solicitud N&deg; {NRO_SOL} para la empresa {NOM_EMPRESA} solicitado por el vendedor {NOMBRE_VENDEDOR}.</p>
<p>Por favor ingrese al sistema para completar los datos. Ingrese al siguiente link: <a href="https://192.168.1.220/"><span data-olk-copy-source="MessageBody">https://192.168.1.220/</span></a> .</p>','SYSTEM',GETDATE(),NULL,NULL);


INSERT INTO TBM_PLANTILLAS
VALUES('PLANCOTSTC',1,'Plantilla de cotización para servicio tecnico','serviciotecnico@ahsecoperu.pe','','PENDIENTE PARA COSTOS - N° SOLICITUD {NRO_SOL}',
			   '<p>Servicio Técnico,</p>
<p>Usted tiene pendiente de ingreso de costos de la cotizaci&oacute;n de la solicitud N&deg; {NRO_SOL} para la empresa {NOM_EMPRESA} solicitado por el vendedor {NOMBRE_VENDEDOR}.</p>
<p>Por favor ingrese al sistema para completar los datos. Ingrese al siguiente link: <a href="https://192.168.1.220/"><span data-olk-copy-source="MessageBody">https://192.168.1.220/</span></a> .</p>','SYSTEM',GETDATE(),NULL,NULL);


INSERT INTO TBM_PLANTILLAS
VALUES('PLANCOTVEN',1,'Plantilla de cotización para vendedor','','','FINALIZACIÓN DE INGRESO DE COSTOS - N° SOLICITUD {NRO_SOL}',
			   '<p>Sr. Vendedor, {NOM_VENDEDOR}</p>
<p>Se finalizó el ingreso de montos de la cotizaci&oacute;n perteneciente en la solicitud N&deg; {NRO_SOL} para la empresa {NOM_EMPRESA}.</p>
<p>Por favor ingrese al sistema para continuar con el flujo de venta. Ingrese al siguiente link: <a href="https://192.168.1.220/"><span data-olk-copy-source="MessageBody">https://192.168.1.220/</span></a> .</p>','SYSTEM',GETDATE(),NULL,NULL);
