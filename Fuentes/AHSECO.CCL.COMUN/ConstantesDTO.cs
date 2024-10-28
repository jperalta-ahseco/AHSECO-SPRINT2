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

        public static string Activo = "Activo";


        public static string Inactivo = "Inactivo";


        public static string Eliminado = "Eliminado";


        public static string NoDefinido = "No Definido";


        public static string AplicacionInterna = "Aplicación Interna";


        public static string AplicacionExterna = "Aplicación Externa";

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
            }
        }

    }
}
