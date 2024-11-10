USE [DB_AHSECO]
GO

DECLARE @ID INT,@ID_ANT INT

SELECT @ID=ID FROM TBM_SEGURIDAD_OPCION WHERE NOMBRE='Mantenimientos';

SELECT @ID_ANT=ID FROM TBM_SEGURIDAD_OPCION WHERE NOMBRE='Prestación Accesoria';

--INSERT INTO TBM_SEGURIDAD_OPCION VALUES ('M',NULL,'Servicios','Servicios','~BandejaServicios',2,90,@ID,'fa fa-briefcase',1,'system',GETDATE(),'192.168.1.6',NULL,NULL,NULL)

UPDATE TBM_SEGURIDAD_OPCION
SET Nombre='Servicios',
	   DESCRIPCION='Servicios',
	   [URL]='~BandejaServicios',
	   Nivel=2,
	   Orden=90,
	   PADRE=@ID,
	   ICONO='fa fa-briefcase',
	   HABILITADO=1
	   WHERE ID=@ID_ANT;

