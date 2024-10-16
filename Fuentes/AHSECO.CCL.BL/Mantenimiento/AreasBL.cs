using AHSECO.CCL.BD.Mantenimiento;
using AHSECO.CCL.BE;
using AHSECO.CCL.BE.Mantenimiento;
using AHSECO.CCL.COMUN;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices.ComTypes;

namespace AHSECO.CCL.BL.Mantenimiento
{
    public class AreasBL
    {
        private AreasBD Repository;
        private CCLog Log;


        public AreasBL() : this(new AreasBD(),new CCLog())
        {
        }

        public AreasBL(AreasBD areasBD, CCLog log)
        {
            Repository = areasBD;
            Log = log;    
        }

        public ResponseDTO<IEnumerable<AreaDTO>> Obtener(AreaDTO areaDTO)
        {
            try
            {
                var result = Repository.Obtener(areaDTO);
                return new ResponseDTO<IEnumerable<AreaDTO>>(result);
            }
            catch(Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " +  ex.Message);
                return new ResponseDTO<IEnumerable<AreaDTO>>(ex);
            }
        }
    }
}
