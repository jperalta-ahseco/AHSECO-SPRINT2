using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace AHSECO.CCL.BE.Ventas
{
    public class DatosActualizarSerieSTO:CamposAuditoriaDTO
    {
        public long codDetalleDespacho { get; set; }
        public string NumeroSerie   { get; set; }
        public string CodigoUbigeo { get; set; }
        public string Direccion { get; set; }
        public int NroPiso { get; set; }
        public string NumeroGuiaRemision { get; set; }
        public string RutaDocumento { get; set; }
        public string Tipo { get; set; }
        public string Ids { get; set; }
        public string Series { get; set;}
        public string Guias { get; set;}
        public int FlagAdjunto { get; set; }

        public string Archivo { get; set; }
        public string NombreArchivo { get; set; }
        public string Extension { get; set; }

        public long CodigoWorkFlow { get; set; }
        public long CodigoDocumento { get; set; }
        public int FlagCarga { get; set; }
    }
}
