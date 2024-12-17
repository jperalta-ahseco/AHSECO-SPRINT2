USE [DB_AHSECO]
GO

/*
ALTER TABLE TBD_DESPACHO_DIST DROP CONSTRAINT FK_TBD_COTIZACIONVENTA
GO
DROP TABLE TBD_DESPACHO_DIST
GO

ALTER TABLE TBD_COTIZACIONCOSTOS DROP CONSTRAINT FK_TBD_COTIZACIONVENTA_2
GO
DROP TABLE TBD_COTIZACIONCOSTOS
GO

ALTER TABLE TBM_COTDET_DESPACHO DROP CONSTRAINT FK_TBD_COTIZACIONVENTA
GO
DROP TABLE TBM_COTDET_DESPACHO
GO

ALTER TABLE TBD_COTIZACIONVENTA DROP CONSTRAINT FK_TBM_COTIZACIONVENTA
GO
DROP TABLE TBD_COTIZACIONVENTA
GO

ALTER TABLE TBM_DESPACHO DROP CONSTRAINT FK_TBM_SOLICITUD
GO
ALTER TABLE TBM_DESPACHO DROP CONSTRAINT FK_TBM_COTIZACION
GO
DROP TABLE TBM_DESPACHO
GO

ALTER TABLE TBM_COTIZACIONVENTA DROP CONSTRAINT FK_TBM_COTIZACIONVENTA_SOL
ALTER TABLE TBM_COTIZACIONVENTA DROP CONSTRAINT FK_TBM_CONTACTOS
GO
DROP TABLE TBM_COTIZACIONVENTA
GO

DROP TABLE TBM_SOLICITUDVENTA
GO
*/

CREATE TABLE [dbo].[TBM_SOLICITUDVENTA](
	[ID_SOLICITUD] [bigint] IDENTITY(1,1) NOT NULL,
	[ID_WORKFLOW] [bigint] NOT NULL,
	[ID_FLUJO] [int] NOT NULL,
	[TIPOVENTA] [VARCHAR](6) NOT NULL,
	[FECHA_SOL] [datetime] NOT NULL,
	[TIPO_SOL] [varchar](6) NOT NULL,
	[COD_MEDIOCONT] [varchar](6) NOT NULL,
	[TIPOPROCESO] [VARCHAR](200) NULL,
	[NROPROCESO] [VARCHAR](50) NULL,
	[IDCLIENTE] [int] NOT NULL,
	[RUC] [varchar](12) NOT NULL,
	[RAZONSOCIAL] [varchar](200) NOT NULL,
	[ASESORVENTA] [varchar](200) NOT NULL,
	[COD_EMPRESA] [varchar](10) NOT NULL,
	[ESTADO] [varchar](5) NOT NULL,
	[USR_REG] [varchar](50) NOT NULL,
	[FEC_REG] [datetime] NOT NULL,
	[IP_REG] [varchar](35) NOT NULL,
	[USR_MOD] [varchar](50) NULL,
	[FEC_MOD] [datetime] NULL,
	[IP_MOD] [varchar](35) NULL,
 CONSTRAINT [PK_TBM_SOLICITUDVENTA] PRIMARY KEY CLUSTERED 
(
	[ID_SOLICITUD] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[TBM_COTIZACIONVENTA](
	[ID_COTIZACION] [bigint] IDENTITY(1,1) NOT NULL,
	[ID_SOLICITUD] [bigint] NOT NULL,
	[FEC_COTIZACION] [datetime] NOT NULL,
	[IDCONTACTO] [int] NULL,
	[NOMBRECONTACTO] [varchar](150) NOT NULL,
	[AREACONTACTO] [varchar](100) NOT NULL,
	[TELEFONOCONTACTO] [varchar](50) NOT NULL,
	[EMAILCONTACTO] [varchar](35) NOT NULL,
	[PLAZOENTREGA] [int] NOT NULL,
	[FORMAPAGO] [varchar](10) NOT NULL,
	[MONEDA] [varchar](10) NULL,
	[VIGENCIA] [varchar](50) NULL,
	[GARANTIA] [varchar](10) NULL,
	[OBSERVACION] [varchar](200) NULL,
	[PORCDSCTO] [decimal](18, 9) NULL,
	[INDDSCTOREQAPROB] [char](1) NULL,
	[INDDSCTOAPROB] [char](1) NULL,
	[SUBTOTALVENTA] [decimal](18, 9) NULL,
	[MONTOIGV] [decimal](18, 9) NULL,
	[TOTALVENTA] [decimal](18, 9) NULL,
	[ESTADO] [char](1) NOT NULL,
	[INDVALORIZADO] [char](1) NULL,
	[INDCOSTEADO] [char](1) NULL,
	[USR_REG] [varchar](50) NOT NULL,
	[FEC_REG] [datetime] NOT NULL,
	[USR_MOD] [varchar](50) NULL,
	[FEC_MOD] [datetime] NULL,
 CONSTRAINT [PK_TBM_COTIZACIONVENTA] PRIMARY KEY CLUSTERED 
(
	[ID_COTIZACION] ASC
)
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[TBM_COTIZACIONVENTA]  WITH CHECK ADD  CONSTRAINT [FK_TBM_COTIZACIONVENTA_SOL] FOREIGN KEY([ID_SOLICITUD])
REFERENCES [dbo].[TBM_SOLICITUDVENTA] ([ID_SOLICITUD])
GO

ALTER TABLE [dbo].[TBM_COTIZACIONVENTA]  WITH CHECK ADD  CONSTRAINT [FK_TBM_CONTACTOS] FOREIGN KEY([IDCONTACTO])
REFERENCES [dbo].[TBM_CONTACTOS] ([IDCONTACTO])
GO

ALTER TABLE [dbo].[TBM_COTIZACIONVENTA] CHECK CONSTRAINT [FK_TBM_COTIZACIONVENTA_SOL]
GO

CREATE TABLE [dbo].[TBD_COTIZACIONVENTA](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[ID_COTIZACION] [bigint] NOT NULL,
	[NROITEM] [int] NOT NULL,
	[TIPOITEM] [varchar](5) NOT NULL,
	[CODITEM] [varchar](35) NOT NULL,
	[DESCRIPCION] [varchar](100) NOT NULL,
	[DESCRIPADIC] [varchar](1000) NULL,
	[STOCK] [int] NULL,
	[INDSTOCK] [char](1) NULL,
	[UNDMED] [varchar](3) NULL,
	[CANTIDAD] [int] NOT NULL,
	[COSTOFOB] [decimal](18, 9) NULL,
	[VVENTAUNI] [decimal](18, 9) NULL,
	[VVTOTALSIGV] [decimal](18, 9) NULL,
	[PORCGANANCIA] [decimal](18, 9) NULL,
	[VVTOTALSIGVCGAN] [decimal](18, 9) NULL,
	[MONTODSCTO] [decimal](18, 9) NULL,
	[VVTOTALSIGVDSCTO] [decimal](18, 9) NULL,
	[USR_REG] [varchar](50) NOT NULL,
	[FEC_REG] [datetime] NOT NULL,
	[USR_MOD] [varchar](50) NULL,
	[FEC_MOD] [datetime] NULL,
 CONSTRAINT [PK_TBD_COTIZACIONVENTA] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[TBD_COTIZACIONVENTA]  WITH CHECK ADD  CONSTRAINT [FK_TBM_COTIZACIONVENTA] FOREIGN KEY([ID_COTIZACION])
REFERENCES [dbo].[TBM_COTIZACIONVENTA] ([ID_COTIZACION])
GO

ALTER TABLE [dbo].[TBD_COTIZACIONVENTA] CHECK CONSTRAINT [FK_TBM_COTIZACIONVENTA]
GO

CREATE TABLE [dbo].[TBM_COTDET_DESPACHO](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[ID_COTDETALLE] [bigint] NOT NULL,
	[INDINFOVIDEO] [char](1) NULL,
	[INDINFOMANUAL] [char](1) NULL,
	[INDINSTALACION] [char](1) NULL,
	[INDCAPACITACION] [char](1) NULL,
	[INDGARANADIC] [char](1) NULL,
	[CODGARANADIC] [nvarchar](10) NULL,
	[INDMANTPREVENT] [char](1) NULL,
	[INDCALIB] [char](1) NULL,
	[DIMENSIONES] [varchar](50) NULL,
	[INDCOMPRALOCAL] [char](1) NULL,
	[INDREQPLACA] [char](1) NULL,
	[INDFLETE] [char](1) NULL,
	[OBSCLIENTE] [varchar](2000) NULL,
	[OBSDESPACHO] [varchar](2000) NULL,
	[MTOTOTALCOSTO] [decimal](18, 9) NULL,
	[INDFIANZA] [char](1) NULL,
	[NUMFIANZA] [varchar](50) NULL,
	[MONTOPPRINC] [decimal](18, 9) NULL,
	[MONTOPACCE] [decimal](18, 9) NULL,
	[USR_REG] [varchar](50) NOT NULL,
	[FEC_REG] [datetime] NOT NULL,
	[USR_MOD] [varchar](50) NULL,
	[FEC_MOD] [datetime] NULL,
 CONSTRAINT [PK_TBM_COTDET_DESPACHO] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[TBM_COTDET_DESPACHO]  WITH CHECK ADD  CONSTRAINT [FK_TBD_COTIZACIONVENTA] FOREIGN KEY([ID_COTDETALLE])
REFERENCES [dbo].[TBD_COTIZACIONVENTA] ([ID])
GO

ALTER TABLE [dbo].[TBM_COTDET_DESPACHO] CHECK CONSTRAINT [FK_TBD_COTIZACIONVENTA]
GO

CREATE TABLE [dbo].[TBD_COTIZACIONCOSTOS]
(
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[ID_COTDETALLE] [bigint] NOT NULL,
	[NUMSEC] [int] NOT NULL,
	[CODCOSTO] [nvarchar](10) NOT NULL,
	[CANTCOSTO] [int] NULL,
	[CANTPREVENTIVO] [int] NULL,
	[CODCICLOPREVENT] [nvarchar](10) NULL,
	[CODUBIGEODEST] [varchar](6) NULL,
	[DIRECCION] [varchar](150) NULL,
	[AMBIENTEDEST] [varchar](200) NULL,
	[NROPISO] [int] NULL,
	[MONTOUNICOSTO] [decimal](18, 9) NULL,
	[MONTOTOTCOSTO] [decimal](18, 9) NULL,
	[USR_REG] [varchar](50) NOT NULL,
	[FEC_REG] [datetime] NOT NULL,
	[USR_MOD] [varchar](50) NULL,
	[FEC_MOD] [datetime] NULL,
 CONSTRAINT [PK_TBD_COTIZACIONCOSTOS] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[TBD_COTIZACIONCOSTOS] ADD CONSTRAINT FK_TBD_COTIZACIONVENTA_2
FOREIGN KEY (ID_COTDETALLE) REFERENCES TBD_COTIZACIONVENTA(ID);
GO

ALTER TABLE [dbo].[TBD_COTIZACIONCOSTOS] CHECK CONSTRAINT [FK_TBD_COTIZACIONVENTA_2]
GO

CREATE TABLE [dbo].[TBD_DESPACHO_DIST]
(
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[ID_DESPACHO] [bigint] NOT NULL,
	[ID_COTDETALLE] [bigint] NOT NULL,
	[NUMSEC] [int] NOT NULL,
	[NUMSERIE] [varchar](100) NULL,
	[FECHAPROGRAMACION] [DATETIME] NULL,
	[FECHAINSTALACION] [DATETIME] NULL,
	[COD_TECNICO] [INT] NULL,
	[EMPRESA] [VARCHAR](200) NULL,
	[USR_REG] [varchar](50) NOT NULL,
	[FEC_REG] [datetime] NOT NULL,
	[USR_MOD] [varchar](50) NULL,
	[FEC_MOD] [datetime] NULL,
 CONSTRAINT [PK_TBD_DESPACHO_DIST] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[TBD_DESPACHO_DIST] ADD CONSTRAINT FK_TBD_COTIZACIONVENTA2
FOREIGN KEY (ID_COTDETALLE) REFERENCES TBD_COTIZACIONVENTA(ID);
GO

ALTER TABLE [dbo].[TBD_DESPACHO_DIST] CHECK CONSTRAINT [FK_TBD_COTIZACIONVENTA2]
GO

CREATE TABLE [dbo].[TBD_COTDET_ACTIVIDADES](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[ID_COTDETALLE] [bigint] NOT NULL,
	[CODACTIVIDAD] [varchar](50) NULL,
	[DESCACTIVIDAD] [varchar](200) NULL,
	[USR_REG] [varchar](50) NOT NULL,
	[FEC_REG] [datetime] NOT NULL,
	[USR_MOD] [varchar](50) NULL,
	[FEC_MOD] [datetime] NULL,
 CONSTRAINT [PK_TBD_COTDET_ACTIVIDADES] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[TBD_COTDET_ACTIVIDADES]  WITH CHECK ADD  CONSTRAINT [FK_TBD_COTIZACIONVENTA3] FOREIGN KEY([ID_COTDETALLE])
REFERENCES [dbo].[TBD_COTIZACIONVENTA] ([ID])
GO

ALTER TABLE [dbo].[TBD_COTDET_ACTIVIDADES] CHECK CONSTRAINT [FK_TBD_COTIZACIONVENTA3]
GO

--TABLA PRINCIPAL DE DESPACHO:
CREATE TABLE [dbo].[TBM_DESPACHO]
(
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[ID_SOLICITUD] [bigint] NOT NULL,
	[ID_COTIZACION] [bigint] NOT NULL,
	[STOCK][CHAR](1) NOT NULL,
	[NUMORDEN] [varchar](50) NOT NULL,
	[FECHAORDEN][DATETIME] NOT NULL,
	[FECHAMAX][DATETIME] NOT NULL,
	[FECHAENTREGA][DATETIME] NULL,
	[FECHAFACTURA][DATETIME] NULL,
	[NUMFACTURA][VARCHAR](50) NULL,
	[NUMGUIAREM][VARCHAR](50) NULL,
	[NUMPEDIDO][VARCHAR](50) NULL,
	[FECHAINGRESO][DATETIME] NULL,
	[ESTAPROB][varchar](3) NULL,
	[FECAPROB][datetime] NULL,
	[OBSERVACION][varchar](1000) NULL,
	[ENVIOGP][BIT] NULL,
	[ENVIOBO][BIT] NULL,
	[ENVIOFC][BIT] NULL,
	[GESLOG][BIT] NULL,
	[GESFAC][BIT] NULL,
	[NUMFACTSERV][VARCHAR](50) NULL,
	[USR_REG] [varchar](50) NOT NULL,
	[FEC_REG] [datetime] NOT NULL,
	[USR_MOD] [varchar](50) NULL,
	[FEC_MOD] [datetime] NULL,
 CONSTRAINT [PK_TBM_DESPACHO] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[TBM_DESPACHO] ADD CONSTRAINT FK_TBM_SOLICITUD
FOREIGN KEY (ID_SOLICITUD) REFERENCES TBM_SOLICITUDVENTA(ID_SOLICITUD);
GO

ALTER TABLE [dbo].[TBM_DESPACHO] ADD CONSTRAINT FK_TBM_COTIZACION
FOREIGN KEY (ID_COTIZACION) REFERENCES TBM_COTIZACIONVENTA(ID_COTIZACION);
GO


CREATE TABLE [TBD_TECNICODESPACHO] (
	ID BIGINT IDENTITY(1,1) NOT NULL,
	ID_DESPACHO BIGINT NOT NULL,
	COD_TECNICO INT NULL,
	NOMBRES VARCHAR(50) NULL,
	APELLIDOPATERNO VARCHAR(50) NULL,
	APELLIDOMATERNO VARCHAR(50) NULL,
	DOCUMENTO VARCHAR(12) NULL,
	TIPO_DOCUMENTO VARCHAR(9) NULL, 
	CORREO VARCHAR(100) NULL,
	TELEFONO VARCHAR(100) NULL,
	ZONA VARCHAR(6) NULL,
	EMPRESA VARCHAR(200) NULL,
	TIPOTECNICO CHAR(1) NULL,
	ESTADO BIT NULL,
	USR_REG VARCHAR(50) NOT NULL,
	FEC_REG DATETIME NOT NULL,
	USR_MOD VARCHAR(50) NULL,
	FEC_MOD DATETIME NULL
 CONSTRAINT [PK_TBD_TECNICOTECNICODESPACHO] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)
) ON [PRIMARY]
GO
