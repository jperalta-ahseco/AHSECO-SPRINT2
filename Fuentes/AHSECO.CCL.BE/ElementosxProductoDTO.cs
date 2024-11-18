using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class ElementosxProductoDTO : CamposAuditoriaDTO
    {
        public string TipoProceso { get; set; }
        public long Id { get; set; }
        public long Id_Detalle { get; set; }
        public long Id_Despacho { get; set; }
        public List<string> Id_DespachoList { get; set; }
        public string CodProduct { get; set; }
        public int CodTecnico { get; set; }
        public string Empresa { get; set; }
        public string NombreCompletoTecnico { get; set; }
        public string DescProduct { get; set; }
        public string Marca { get; set; }
        public string Serie { get; set; }
        public int NumSec { get; set; }
        public int CantPreventivo { get; set; }
        public string CodCicloPreventivo { get; set; }
        public string CodUbigeoDestino { get; set; }
        public string DescUbigeoDestino { get; set; }
        public string Direccion{ get; set; }
        public int NroPiso { get; set; }
        public string FechaProgramacion { get; set; }
        public string FechaInstalacion { get; set; }
    }
}
