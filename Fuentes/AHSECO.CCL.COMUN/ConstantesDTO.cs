using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;
using NPOI.SS.Formula.Functions;

namespace AHSECO.CCL.COMUN
{

    public static class ConstantesDTO
    {

        public struct WorkflowRol
        {
            public struct Venta
            {
                public static string Asesor = "SGI_VENTA_ASESOR";
                public static string Jefe = "SGI_VENTA_JEFE";
                public static string CoordVta= "SGI_VENTA_COORDINAVENTA";
                public static string ServTecnico = "SGI_VENTA_SERVICIOTECNICO";
                public static string Gerente = "SGI_VENTA_GERENTE";
                public static string Importacion = "SGI_VENTA_IMPORTACION";
                public static string Costos = "SGI_VENTA_COSTOS";
                public static string Logistica = "SGI_VENTA_LOGISTICA";
                public static string CoordServ = "SGI_VENTA_COORDINASERV";
                public static string CoordAtc = "SGI_VENTA_COORDINAATC";
                public static string Facturador = "SGI_VENTA_FACTURA";
            }
            public struct Viatico
            {
                public static string Gerente = "SGI_VIAT_GERENTE";
                public static string Solicitante = "SGI_VIAT_SOLICITANTE";
                public static string Contador = "SGI_VIAT_CONTADOR";
                public static string Admin = "SGI_VIAT_ADMINISTRADOR";
                public static string Importacion = "SGI_VENTA_IMPORTACION";
                public static string Costos = "SGI_VENTA_COSTOS";
                public static string Logistica = "SGI_VENTA_LOGISTICA";
            }
        }

        public struct Mensajes
        {
            public struct CotizacionDetalle
            {
                public static string M1 = "Detalle de {0}";
                public static string M2 = "Detalle de Registro";
            }
        }

        public struct DatosGenerales
        {
            public struct Dominios
            {
                public static string CicloPreventivo = "CICLOPREV";
                public static string CostoEnvio = "COSTOXCD";
                public static string Garantias = "GARANTIAS";
                public static string RazonSocial = "RAZSOCIAL";
            }
            public struct CicloPreventivo
            {
                public static string Diario = "CIPR0001";
                public static string Semanal = "CIPR0002";
                public static string Quincenal = "CIPR0003";
                public static string Mensual = "CIPR0004";
                public static string Bimestral = "CIPR0005";
                public static string Trimestral = "CIPR0006";
                public static string Cuatrimestral = "CIPR0007";
                public static string Quimestral = "CIPR0008";
                public static string Semestral = "CIPR0009";
                public static string Septimestral = "CIPR0010";
                public static string Octamestral = "CIPR0011";
                public static string Novamestral = "CIPR0012";
                public static string Decamestral = "CIPR0013";
                public static string Anual = "CIPR0014";
            }
            public struct CostosEnvio
            {
                public static string LlaveEnMano = "CXCD0001";
                public static string Instalacion = "CXCD0002";
                public static string Capacitacion = "CXCD0003";
                public static string Manuales = "CXCD0004";
                public static string Videos = "CXCD0005";
                public static string MantPrevent = "CXCD0006";
                public static string Calibracion = "CXCD0007";
                public static string Flete = "CXCD0008";
            }
            public struct TipoSolicitud
            {
                public static string Servicio = "TSOL0001";
                public static string RepuestosOComestibles = "TSOL0002";
                public static string ServiciosYRepuestos = "TSOL0003";
                public static string VentaMateriales = "TSOL0004";
                public static string VentaEquipos = "TSOL0005";
                public struct Valor1
                {
                    public static string Servicio = "TSOL01";
                    public static string RepuestosOComestibles = "TSOL02";
                    public static string ServiciosYRepuestos = "TSOL03";
                    public static string VentaMateriales = "TSOL04";
                    public static string VentaEquipos = "TSOL05";
                }
            }
        }

        public struct Procesos
        {
            public struct Ventas
            {
                public static int ID { get { return 1; } }
            }
            public struct PostVenta
            {
                public static int ID { get { return 2; } }
            }
            public struct ServicioTecnio
            {
                public static int ID { get { return 3; } }
            }
            public struct Viaticos
            {
                public static int ID { get { return 4; } }
            }
        }

        public struct SolicitudVenta
        {
            public struct TipoProceso
            {
                public static string Insertar { get { return "I"; } }
                public static string Modificar { get { return "U"; } }
            }
            public struct TipoSolicitud
            {

                /// <summary>
                /// TSOL01 - Servicio
                /// </summary>
                public static string Servicio { get { return "TSOL01"; } }

                /// <summary>
                /// TSOL02 - Repuestos o Consumibles
                /// </summary>
                public static string RepuestosoConsumibles { get { return "TSOL02"; } }

                /// <summary>
                /// TSOL03 - Servicios y Repuestos
                /// </summary>
                public static string ServiciosyRepuestos { get { return "TSOL03"; } }

                /// <summary>
                /// TSOL04 - Venta de Materiales
                /// </summary>
                public static string VentaMateriales { get { return "TSOL04"; } }

                /// <summary>
                /// TSOL05 - Venta de Equipos
                /// </summary>
                public static string VentaEquipos { get { return "TSOL05"; } }

            }
        }

        public struct Observacion
        {
            public struct TipoProceso
            {
                public static string Insertar { get { return "I"; } }
                public static string Modificar { get { return "U"; } }
                public static string Eliminar { get { return "D"; } }
            }
        }

        public struct CotizacionVenta
        {
            public struct TipoProceso
            {
                public static string Insertar { get { return "I"; } }
                public static string Modificar { get { return "U"; } }
            }
            public struct Estados
            {
                public static string Activo { get { return "A"; } }
                public static string Inactivo { get { return "I"; } }
            }
            public struct Observaciones
            {
                public static string Msj01 { get { return "Precios incluyen IGV"; } }
            }
        }

        public struct CotizacionVentaDetalle
        {
            public struct TipoProceso
            {
                public static string Insertar { get { return "I"; } }
                public static string Modificar { get { return "U"; } }
                public static string Eliminar { get { return "D"; } }
            }
            public struct CodigoItem
            {
                public static string FORMAT_IdNewTempRecord { get { return "TMPREC_{0}"; } }
            }
            public struct TipoItem
            {
                public static string Producto { get { return "PRO"; } }
                public static string Accesorio { get { return "ACC"; } }
                public static string Servicio { get { return "SER"; } }
            }
        }

        public struct CotizacionDetalleDespacho
        {
            public struct TipoProceso
            {
                public static string Insertar { get { return "I"; } }
                public static string Modificar { get { return "U"; } }
                public static string Eliminar { get { return "D"; } }
            }
            public struct CicloPreventivo
            {
                public static string Diario { get { return "CIPR0001"; } }
                public static string Semanal { get { return "CIPR0002"; } }
                public static string Quincenal { get { return "CIPR0003"; } }
                public static string Mensual { get { return "CIPR0004"; } }
                public static string Bimestral { get { return "CIPR0005"; } }
                public static string Trimestral { get { return "CIPR0006"; } }
                public static string Cuatrimestral { get { return "CIPR0007"; } }
                public static string Quimestral { get { return "CIPR0008"; } }
                public static string Semestral { get { return "CIPR0009"; } }
                public static string Septimenstral { get { return "CIPR0010"; } }
                public static string Octamestral { get { return "CIPR0011"; } }
                public static string Novamestral { get { return "CIPR0012"; } }
                public static string Decamestral { get { return "CIPR0013"; } }
                public static string Anual { get { return "CIPR0014"; } }
            }
        }

        public struct CotizacionDetalleCostos
        {
            public struct TipoProceso
            {
                public static string Insertar { get { return "I"; } }
                public static string Modificar { get { return "U"; } }
                public static string Eliminar { get { return "D"; } }
            }
            public struct Costos
            {
                public static string LLaveMano { get { return "CXCD0001"; } }
                public static string Instalacion { get { return "CXCD0002"; } }
                public static string Capacitacion { get { return "CXCD0003"; } }
                public static string Manuales { get { return "CXCD0004"; } }
                public static string Videos { get { return "CXCD0005"; } }
                public static string MantPrevent { get { return "CXCD0006"; } }
                public static string Calibra { get { return "CXCD0007"; } }
                public static string Flete { get { return "CXCD0008"; } }
            }
        }

        public struct CotizacionDetalleActividad
        {
            public struct TipoProceso
            {
                public static string Insertar { get { return "I"; } }
                public static string Modificar { get { return "U"; } }
                public static string Eliminar { get { return "D"; } }
            }
        }

        public struct EstadosProcesos
        {
            public struct ProcesoVenta
            {
                public static string Registrado { get { return "SREG"; } }
                public static string EnCotizacion { get { return "SCOT"; } }
                public static string Valorizacion { get { return "CVAL"; } }
                public static string CotAprob { get { return "CAPR"; } }
                public static string CotSinVenta { get { return "NOVT"; } }
                public static string EnProcVentas { get { return "PRVT"; } }
                public static string VentaProg { get { return "VTPG"; } }
                public static string Finalizado { get { return "SFIN"; } }
            }
        }

        public struct Articulos
        {
            public struct Familia
            {
                public static string Equipos { get { return "01"; } }
                public static string ReactivosLaboratorio { get { return "02"; } }
                public static string ArticulosLaboratorio { get { return "03"; } }
                public static string InstApaMedicina { get { return "04"; } }
                public static string Medicon { get { return "05"; } }
                public static string Repuestos { get { return "06"; } }
                public static string Locales { get { return "07"; } }
                public static string Accesorios { get { return "08"; } }
                public static string SinRegistrar { get { return "--"; } }
            }
            public struct Tag
            {
                public static string Tag_1 { get { return "MODELO"; } }
            }
            public struct Text
            {
                public static string Text_1 { get { return "No Registrado en Almacén"; } }
            }
        }

        public struct Plantillas
        {
            public struct Ventas
            {
                public static string EnvioAprobImportar { get { return "PLANAPRIMP"; } }
                public static string AteLogisticaConStock { get { return "PLANATLOCS"; } }
                public static string AteLogisticaSinStock { get { return "PLANATLOSS"; } }
                public static string CotCostos { get { return "PLANCOTCOS"; } }
                public static string CotGerencia { get { return "PLANCOTGER"; } }
                public static string CotLogistica { get { return "PLANCOTLOG"; } }
                public static string CotServTecnio { get { return "PLANCOTSTC"; } }
                public static string CotVendedor { get { return "PLANCOTVEN"; } }
                public static string EnvioGuiaBO { get { return "PLANGUIABO"; } }
                public static string EnvioGuiaPedidos { get { return "PLANGUIAPE"; } }
                public static string EnvioServTecnico { get { return "PLANSTECV"; } }
            }
            public struct Viaticos
            {
                public static string Abono { get { return "PLANVIAABO"; } }
                public static string Anulacion { get { return "PLANVIAANU"; } }
                public static string Administracion { get { return "PLANVIAAPR"; } }
                public static string Contabilidad { get { return "PLANVIACON"; } }
                public static string Aprobar { get { return "PLANVIAPAP"; } }
            }
        }

    }
}
