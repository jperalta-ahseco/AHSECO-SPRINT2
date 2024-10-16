using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AHSECO.CCL.FRONTEND.Models
{
    public class WsMenuNode
    {
        public WsMenuNode()
        {
            SubOpciones = new List<WsMenuNode>();
        }

        public string Rpta { get; set; }
        public string Usuario { get; set; }
        public string UsuarioNT { get; set; }
        public string Nombre { get; set; }
        public string Url { get; set; }
        public List<WsMenuNode> SubOpciones { get; set; }
        public int IdOpcion { get; set; }
        public int NOrden { get; set; }        
        public string Msg { get; set; }
        public string Agencia { get; set; } //REQ-1171

    }
}