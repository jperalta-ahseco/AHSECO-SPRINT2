USE [DB_AHSECO]
GO

CREATE TABLE TBM_SERVICIOS
(
	ID_SERVICIO INT IDENTITY(1,1) NOT NULL,
	TIPO_SERVICIO VARCHAR(6) NOT NULL,
	DESCRIPCIONEQUIPO VARCHAR(200) NOT NULL,
	NOMBREMARCA VARCHAR(75) NOT NULL,
	NOMBREMODELO VARCHAR(75) NOT NULL,
	PRECIO DECIMAL(18,2) NULL,
	INSTRUMENTOS VARCHAR(2000) NULL,
	TOOLCOMUN VARCHAR(2000) NULL,
	TOOLESPECIAL VARCHAR(2000) NULL,
	ESTADO CHAR(1) NOT NULL,
	USR_REG VARCHAR(50) NOT NULL,
	FEC_REG DATETIME NOT NULL,
	USR_MOD VARCHAR(50) NULL,
	FEC_MOD DATETIME NULL
 CONSTRAINT [PK_TBM_SERVICIOS] PRIMARY KEY CLUSTERED 
(
	[ID_SERVICIO] ASC
)
) ON [PRIMARY]
GO

CREATE TABLE TBD_SERVICIOS
(
	ID BIGINT IDENTITY(1,1) NOT NULL,
	ID_SERVICIO INT  NOT NULL,
	DESMANTENIMIENTO VARCHAR(500)  NULL,
	ELIMINAR INT NOT NULL,
	USR_REG VARCHAR(50) NOT NULL,
	FEC_REG DATETIME NOT NULL,
	USR_MOD VARCHAR(50) NULL,
	FEC_MOD DATETIME NULL
 CONSTRAINT [PK_TBD_SERVICIOS] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)
) ON [PRIMARY]
GO