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
    public class ServiciosBL
    {
        private ServicioBD Repository;

        private CCLog Log;
        public ServiciosBL()
            : this(new ServicioBD(), new CCLog())
        {
        }
        public ServiciosBL(ServicioBD servicioBD, CCLog log)
        {
            Repository = servicioBD;
            Log = log;
        }

        public ResponseDTO<IEnumerable<ServicioDTO>> ObtenerServicios(ServicioDTO servicioDTO)
        {
            try
            {
                var result = Repository.ObtenerServicios(servicioDTO);
                return new ResponseDTO<IEnumerable<ServicioDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<IEnumerable<ServicioDTO>>(ex);
            }
        }

        public ResponseDTO<FiltrosServiciosDTO> FiltroServicios()
        {
            try
            {
                var result = Repository.FiltroServicios();
                return new ResponseDTO<FiltrosServiciosDTO>(result);
            }
            catch (Exception ex) 
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<FiltrosServiciosDTO>(ex);
            };
        }

        public ResponseDTO<RespuestaDTO> MantenimientoDetalleServicio(DetalleServicioDTO detalle)
        {
            try
            {
                var result = Repository.MantenimientoDetalleServicio(detalle);
                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch(Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller()+ "::" +ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            };
        }

        public ResponseDTO<RespuestaDTO> MantenimientoServicios(ServicioDTO servicio)
        {
            try
            {
                var result = Repository.MantenimientoServicios(servicio);
                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            };
        }

        public ResponseDTO<GrupoServicioDTO> GetFullService(string CodServicio)
        {
            try
            {
                var result = Repository.GetFullService(CodServicio);
                return new ResponseDTO<GrupoServicioDTO>(result);
            }
            catch(Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller()+ "::" + ex.Message);
                return new ResponseDTO<GrupoServicioDTO>(ex);
            }
        }
    }
}
