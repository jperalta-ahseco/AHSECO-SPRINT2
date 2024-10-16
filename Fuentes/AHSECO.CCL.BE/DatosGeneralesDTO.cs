
using System;
using System.Data;
using System.Collections;
using System.Collections.Generic;
using System.Text;
 
using System.Linq;
 
using System.Runtime.Serialization;

namespace AHSECO.CCL.BE
{
	 public class DatosGeneralesDTO : CamposAuditoriaDTO
	 {
	
		
		#region " Propiedades "		
		
        public int Id { get; set; }

        public string Dominio { get; set; }

        public string Prefijo { get; set; }

        public string Descripcion { get; set; }

        public int PuedeCrecer { get; set; }


        #endregion

        public DatosGeneralesDTO()
		{
		// TODO: Complete member initialization
		}
	}
	
	public class BEDatosGeneralesWS
	{
		public List<DatosGeneralesDTO> oDatosGenerales ;
		public string TotalRow { get; set; }
	}
	 
	 

		
		
			
}

