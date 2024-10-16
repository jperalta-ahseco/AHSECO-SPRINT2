using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class DatosGeneralesDetalleDTO : CamposAuditoriaDTO
    {
        #region " Propiedades "
        public int Id { get; set; }
        public DatosGeneralesDTO DatosGenerales { get; set; }
        public string Parametro { get; set; }
        public string Descripcion { get; set; }
        public int Estado { get; set; }
        public string Usuario { get; set; }
        public string Valor1 { get; set; }
        public string Valor2 { get; set; }
        public string Valor3 { get; set; }
        public string CodValor1 { get; set; }
        public string CodValor2 { get; set; }
        public string CodValor3 { get; set; }
        public bool Habilitado { get; set; }
        public string Dominio { get; set; }
        public int Editable { get; set; }
        #endregion
    }
}
