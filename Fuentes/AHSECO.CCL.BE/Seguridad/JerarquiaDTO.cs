using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class JerarquiaDTO: CamposAuditoriaDTO
    {
        public int Id { get; set; }
        public CentroEvaluacionDTO Ejecutor { get; set; }
        public CentroEvaluacionDTO Eps { get; set; }
        
    }
}
