using System;
using AHSECO.CCL.BD;
using AHSECO.CCL.COMUN;
using AHSECO.CCL.BE;
using System.DirectoryServices;
using static System.Net.Mime.MediaTypeNames;
using System.Collections.Generic;

namespace AHSECO.CCL.BL
{
    public class PlantillasBL
    {
        private PlantillasBD Repository;

        private CCLog Log;
        public PlantillasBL()
            : this(new PlantillasBD(), new CCLog())
        {
        }
        public PlantillasBL(PlantillasBD plantillasBD, CCLog log)
        {
            Repository = plantillasBD;
            Log = log;
        }



        public ResponseDTO<PlantillaCorreoDTO> ConsultarPlantillaCorreo(FiltroPlantillaDTO filtros)
        {
            try
            {
                var result = Repository.ConsultarPlantillaCorreo(filtros);
                return new ResponseDTO<PlantillaCorreoDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<PlantillaCorreoDTO>(ex);
            }
        }

    }
}
