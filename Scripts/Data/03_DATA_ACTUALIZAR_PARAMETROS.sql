USE [DB_AHSECO]
GO

--SELECT * FROM TBM_DATOS_GENERALES
--SELECT * FROM TBD_DATOS_GENERALES

UPDATE TBM_DATOS_GENERALES SET PREFIJO='GETD' WHERE DOMINIO='GENTDOC'

UPDATE TBM_DATOS_GENERALES SET PREFIJO='ESTD' WHERE DOMINIO='ESTADOS'

UPDATE TBD_DATOS_GENERALES SET PARAMETRO='ESTD0001' WHERE ID=16
UPDATE TBD_DATOS_GENERALES SET PARAMETRO='ESTD0002' WHERE ID=17


UPDATE TBD_DATOS_GENERALES SET PARAMETRO='TEMP0001' WHERE ID=18
UPDATE TBD_DATOS_GENERALES SET PARAMETRO='TEMP0002' WHERE ID=19

UPDATE TBD_DATOS_GENERALES SET PARAMETRO='SEXE0001' WHERE ID=20
UPDATE TBD_DATOS_GENERALES SET PARAMETRO='SEXE0002' WHERE ID=21

UPDATE TBD_DATOS_GENERALES SET PARAMETRO='TDOC0001' WHERE ID=22
UPDATE TBD_DATOS_GENERALES SET PARAMETRO='TDOC0002' WHERE ID=23
UPDATE TBD_DATOS_GENERALES SET PARAMETRO='TDOC0003' WHERE ID=24
UPDATE TBD_DATOS_GENERALES SET PARAMETRO='TDOC0004' WHERE ID=25

UPDATE TBD_DATOS_GENERALES SET PARAMETRO='FVIA0001' WHERE ID=26
UPDATE TBD_DATOS_GENERALES SET PARAMETRO='FVIA0002' WHERE ID=27
UPDATE TBD_DATOS_GENERALES SET PARAMETRO='FVIA0003' WHERE ID=28
UPDATE TBD_DATOS_GENERALES SET PARAMETRO='FVIA0004' WHERE ID=29

UPDATE TBD_DATOS_GENERALES SET DESCRIPCION='A',COD_VALOR1=1,VALOR1='A' WHERE PARAMETRO='CCLI0001' 
UPDATE TBD_DATOS_GENERALES SET DESCRIPCION='B',COD_VALOR1=2,VALOR1='B' WHERE PARAMETRO='CCLI0002' 
UPDATE TBD_DATOS_GENERALES SET DESCRIPCION='C',COD_VALOR1=3,VALOR1='C' WHERE PARAMETRO='CCLI0003' 

