using AHSECO.CCL.BD;
using AHSECO.CCL.BE;
using AHSECO.CCL.COMUN;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace AHSECO.CCL.BL
{
    public class JerarquiaBL
    {
        private JerarquiaBD Repository;
        private CCLog Log;

        public JerarquiaBL()
            : this(new JerarquiaBD(), new CCLog())
        {
        }

        public JerarquiaBL(JerarquiaBD JerarquiaBD, CCLog log)
        {
            Repository = JerarquiaBD;
            Log = log;
        }

        public ResponseDTO<IEnumerable<JerarquiaDTO>> Obtener(JerarquiaDTO jerarquiaDTO)
        {
            try
            {
                var result = Repository.Obtener(jerarquiaDTO);
                return new ResponseDTO<IEnumerable<JerarquiaDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<IEnumerable<JerarquiaDTO>>(ex);
            }
        }

        public ResponseDTO<bool> Insertar(JerarquiaDTO jerarquiaDTO)
        {
            try
            {
                var result = Repository.Insertar(jerarquiaDTO);
                return new ResponseDTO<bool>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<bool>(ex);
            }
        }

        public ResponseDTO<bool> Actualizar(JerarquiaDTO jerarquiaDTO)
        {
            try
            {
                var result = Repository.Actualizar(jerarquiaDTO);
                return new ResponseDTO<bool>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<bool>(ex);
            }
        }

        public ResponseDTO<bool> Eliminar(JerarquiaDTO jerarquiaDTO)
        {
            try
            {
                var result = Repository.Eliminar(jerarquiaDTO);
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