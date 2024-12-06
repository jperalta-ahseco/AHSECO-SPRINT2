using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.ServicioTecnico.BandejaPreventivos
{
    public class EquipoPrevDTO
    {
        public long Id_Mant { get; set; }
        public string Serie { get; set; }
        public DateTime FechaInstalacion { get; set; }
        public string Modelo { get; set; }
        public string Direccion { get; set; }
        public string UbigeoDest { get; set; }
        public string CodUbigeoDest { get; set; }
        public string CodItem { get; set; }
        public string Descripcion { get; set; }
        public string NumFianza { get; set; }
        public string DesMarca { get; set; }
        public int PrevPendientes { get; set; }
        public int PrevCompletados { get; set; }
        public int TotalPrev { get; set; }
        public string ProxFechaMant { get; set; }
        public DateTime FechaVencimientoGar { get; set; }
        public string Periodo { get; set; }
        public string GarantiaAdic { get; set; }
        public string Garantia { get; set; }
        public int DiasDiff { get; set; }
        public int DiasTranscurridos { get; set; }
    }
}
