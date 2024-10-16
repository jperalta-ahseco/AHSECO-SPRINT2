using AHSECO.CCL.BE;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AHSECO.CCL.FRONTEND.Models
{
    public class UbigeoModel {
        public IEnumerable<UbigeoDTO> Departamentos { get; set; }
        public IEnumerable<UbigeoDTO> Provincias { get; set; }
        public IEnumerable<UbigeoDTO> Distritos { get; set; }
    }
}