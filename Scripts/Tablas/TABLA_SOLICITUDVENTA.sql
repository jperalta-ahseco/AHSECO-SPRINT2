USE [DB_AHSECO]
GO

/*
SELECT * FROM TBM_SOLICITUDVENTA
SELECT * FROM TBM_COTIZACIONVENTA
SELECT * FROM TBD_COTIZACIONVENTA
SELECT * FROM TBD_COTIZACIONCOSTOS

DROP TABLE TBM_SOLICITUDVENTA
DROP TABLE TBM_COTIZACIONVENTA
DROP TABLE TBD_COTIZACIONVENTA
DROP TABLE TBD_COTIZACIONDESPACHO
DROP TABLE TBD_COTIZACIONCOSTOS
*/


CREATE TABLE [dbo].[TBM_SOLICITUDVENTA](
	[ID_SOLICITUD] [bigint] IDENTITY(1,1) NOT NULL,
	[ID_WORKFLOW] [bigint] NOT NULL,
	[ID_FLUJO] [int] NOT NULL,
	[FECHA_SOL] [datetime] NOT NULL,
	[TIPO_SOL] [varchar](6) NOT NULL,
	[COD_MEDIOCONT] [varchar](6) NOT NULL,
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
	[PLAZOENTREGA] [varchar](100) NOT NULL,
	[FORMAPAGO] [varchar](10) NOT NULL,
	[MONEDA] [varchar](10) NULL,
	[VIGENCIA] [varchar](50) NULL,
	[GARANTIA] [varchar](10) NOT NULL,
	[OBSERVACION] [varchar](200) NULL,
	[ESTADO] [varchar](1) NOT NULL,
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
	[STOCK] [int] NULL,
	[UNIDAD] [varchar](3) NOT NULL,
	[CANTIDAD] [int] NOT NULL,
	[COSTOFOB] [decimal](18, 9) NULL,
	[VVENTAUNI] [decimal](18, 9) NULL,
	[VVTOTALSIGV] [decimal](18, 2) NULL,
	[PORCGANANCIA] [decimal](9, 2) NOT NULL,
	[VVTOTALCGAN] [decimal](18, 2) NOT NULL,
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

ALTER TABLE [dbo].[TBD_COTIZACIONVENTA]  WITH CHECK ADD  CONSTRAINT [FK_TBD_COTIZACIONVENTA_CABECERA] FOREIGN KEY([ID_COTIZACION])
REFERENCES [dbo].[TBM_COTIZACIONVENTA] ([ID_COTIZACION])
GO

ALTER TABLE [dbo].[TBD_COTIZACIONVENTA] CHECK CONSTRAINT [FK_TBD_COTIZACIONVENTA_CABECERA]
GO

CREATE TABLE [dbo].[TBM_COTDET_DESPACHO](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[ID_COTDETALLE] [bigint] NOT NULL,
	[DIMENSION] [varchar](50) NULL,
	[CANTPREVENTIVO] [int] NULL,
	[CICLOPREVENTIVO] [nvarchar](10) NULL,
	[INDLLAVEMANO] [char](1) NULL,
	[CODUBIGEO] [varchar](6) NULL,
	[DIRECCION] [varchar](150) NULL,
	[NROPISO] [int] NULL,
	[INDINFOMANUAL] [char](1) NULL,
	[INDINFOVIDEO] [char](1) NULL,
	[INDINSTACAPA] [char](1) NULL,
	[GARANTIAADIC] [varchar](50) NULL,
	[USR_REG] [varchar](50) NOT NULL,
	[FEC_REG] [datetime] NOT NULL,
	[USR_MOD] [varchar](50) NULL,
	[FEC_MOD] [datetime] NULL,
 CONSTRAINT [PK_TBD_COTIZACIONDESPACHO] PRIMARY KEY CLUSTERED 
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
	ID BIGINT IDENTITY(1,1) NOT NULL,
	ID_COTIZACION BIGINT  NOT NULL,
	ITEM INT NOT NULL,
	VALORVENTAPRODSD DECIMAL(18,9) NOT NULL,
	VALORVENTATOTALSD DECIMAL(18,9) NOT NULL,
	DSCTO DECIMAL(9,2) NOT NULL,
	SUBTOTALSD DECIMAL(18,9) NOT NULL,
	IGVSD DECIMAL(18,2) NOT NULL,
	TOTALVENTASD DECIMAL(18,2) NOT NULL,
	VALORVENTAPRODCD DECIMAL(18,9) NOT NULL,
	VALORVENTATOTALCD DECIMAL(18,9) NOT NULL,
	SUBTOTALCD DECIMAL(18,9) NOT NULL,
	IGVCD DECIMAL(18,2) NOT NULL,
	TOTALVENTACD DECIMAL(18,2) NOT NULL,
	TIPO VARCHAR(5) NOT NULL,
	USR_REG VARCHAR(50) NOT NULL,
	FEC_REG DATETIME NOT NULL,
 CONSTRAINT [PK_TBD_COTIZACIONCOSTOS] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)
) ON [PRIMARY]
GO

ALTER TABLE TBD_COTIZACIONCOSTOS
ADD CONSTRAINT FK_COTIZACIONCOSTOS_CABECERA
FOREIGN KEY (ID_COTIZACION) REFERENCES TBM_COTIZACIONVENTA(ID_COTIZACION);
