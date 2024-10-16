using AHSECO.CCL.BD;
using AHSECO.CCL.BE;
using AHSECO.CCL.COMUN;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BL
{
    public class OpcionBL
    {
        private OpcionBD Repository;
        private CCLog Log;

        public OpcionBL()
            : this(new OpcionBD(), new CCLog())
        {
        }

        public OpcionBL(OpcionBD opcionesBD, CCLog log)
        {
            Repository = opcionesBD;
            Log = log;
        }

        public ResponseDTO<IEnumerable<OpcionDTO>> Obtener(OpcionDTO opcionesDTO)
        {
            try
            {
                var result = Repository.Obtener(opcionesDTO);
                return new ResponseDTO<IEnumerable<OpcionDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<IEnumerable<OpcionDTO>>(ex);
            }
        }

        public ResponseDTO<bool> Insertar(OpcionDTO opcionesDTO)
        {
            try
            {
                var result = Repository.Insertar(opcionesDTO);
                return new ResponseDTO<bool>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<bool>(ex);
            }
        }

        public ResponseDTO<bool> Actualizar(OpcionDTO opcionesDTO)
        {
            try
            {
                var result = Repository.Actualizar(opcionesDTO);
                return new ResponseDTO<bool>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<bool>(ex);
            }
        }

        public ResponseDTO<bool> Eliminar(OpcionDTO opcionesDTO)
        {
            try
            {
                var result = Repository.Eliminar(opcionesDTO);
                return new ResponseDTO<bool>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<bool>(ex);
            }
        }
    }
}