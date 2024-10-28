using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Ventas
{
    public class GuiaDTO
    {
        public GuiaCabDTO GuiaCabecera { get; set; }
        public List<GuiaDetDTO> GuiaDetalle { get; set; }
        public int NroItems { get; set; }
    }
}
