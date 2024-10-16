using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class TreeMenuDTO
    {
        public string id { get; set; }
        public string text { get; set; }
        public OpcionDTO opcion { get; set; }
        public StateTreeMenuDTO state { get; set; }
        public List<TreeMenuDTO> children { get; set; }
    }

    public class StateTreeMenuDTO
    {
        public bool disabled { get; set; }
        public bool opened { get; set; }
        public bool selected { get; set; }
    }
}