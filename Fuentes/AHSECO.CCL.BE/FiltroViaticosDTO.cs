using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class FiltroViaticosDTO
    {
        public int CodigoViatico{ get; set; }
        public string CodigoEmpresa { get; set; }
        public string FechaViaticoInicio { get; set; }
        public string FechaViaticoFinal { get; set; }
        public int CodigoCargo { get; set; }
        public int CodigoEncargado { get; set; }
        public int CodigoArea { get; set; }
        public string CodigoUbigeo { get; set; }
        public string CodigoEstado { get; set; }
        public string UsuarioRegistro { get; set; }
        public int CodigoAreaUsuario { get; set; }



    }
}
