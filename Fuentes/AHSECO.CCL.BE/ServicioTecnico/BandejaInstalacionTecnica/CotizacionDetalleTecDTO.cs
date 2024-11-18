using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.ServicioTecnico.BandejaInstalacionTecnica
{
    public class CotizacionDetalleTecDTO
    {
        public long Id { get; set; }
        public string CodItem { get; set; }
        public string Descripcion { get; set; }
        public string Marca { get; set; }
        public int Cantidad { get; set; }
        public bool IndFianza { get; set; }
        public string NumFianza { get; set; }
        public string GarantiaAdicional { get; set; }
        public bool? IndLLaveMano { get; set; }
        public string Dimensiones { get; set; }
        public bool? IndRequierePlaca { get; set; }
        public DateTime? FecLimInsta { get; set; }
        public decimal? MontoPrestPrin { get; set; }
        public decimal? MontoPrestAcc { get; set; }

    }
}
