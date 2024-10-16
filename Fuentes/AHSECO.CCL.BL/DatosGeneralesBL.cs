using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AHSECO.CCL.BD;
using AHSECO.CCL.COMUN;
using AHSECO.CCL.BE;

namespace AHSECO.CCL.BL
{
    public class DatosGeneralesBL
    {
        private DatosGeneralesBD Repository;
        private CCLog Log;
        public DatosGeneralesBL()
            : this(new DatosGeneralesBD(), new CCLog())
        {
        }
        public DatosGeneralesBL(DatosGeneralesBD DatosGeneralesBD, CCLog log)
        {
            Repository = DatosGeneralesBD;
            Log = log;
        }
        public ResponseDTO<IEnumerable<DatosGeneralesDetalleDTO>> Obtener(DatosGeneralesDetalleDTO DatosGeneralesDetalle) 
        {
            try
            {
                if (DatosGeneralesDetalle.DatosGenerales == null)
                {
                    DatosGeneralesDetalle.DatosGenerales = new DatosGeneralesDTO();
                }
                var result = Repository.Obtener(DatosGeneralesDetalle);
                return new ResponseDTO<IEnumerable<DatosGeneralesDetalleDTO>>(result);
            }
            catch (Exception ex) {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<IEnumerable<DatosGeneralesDetalleDTO>>(ex);
            
            }
        }

        public ResponseDTO<bool> Insertar(DatosGeneralesDetalleDTO DatosGeneralesDetalle)
        {
            try
            {
                var result = Repository.Insertar(DatosGeneralesDetalle);
                return new ResponseDTO<bool>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<bool>(ex);
            }
        }


        public ResponseDTO<bool> Actualizar(DatosGeneralesDetalleDTO DatosGeneralesDetalle)
        {
            try
            {
                var result = Repository.Actualizar(DatosGeneralesDetalle);
                return new ResponseDTO<bool>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<bool>(ex);
            }
        }

      

        public  ResponseDTO<IEnumerable<DatosGeneralesDTO>> ObtenerCabeceras(DatosGeneralesDTO datosGeneralesDTO)
        {
            try
            {
                var result = Repository.ObtenerCabeceras(datosGeneralesDTO);
                return new ResponseDTO<IEnumerable<DatosGeneralesDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<IEnumerable<DatosGeneralesDTO>>(ex);
            }
        }

        public ResponseDTO<bool> GuardarCabecera(DatosGeneralesDTO datosGeneralesDTO)
        {
            try
            {
                var result = Repository.GuardarCabecera(datosGeneralesDTO);
                return new ResponseDTO<bool>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<bool>(ex);
            }
        }
        public ResponseDTO<bool> InsertarCabecera(DatosGeneralesDTO datosGeneralesDTO)
        {
            try
            {
                var result = Repository.InsetarCabecera(datosGeneralesDTO);
                return new ResponseDTO<bool>(result);
            }
            catch(Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<bool>(ex);
            }
        }
        public ResponseDTO<RespuestaDTO> ObtenerParametro(DatosGeneralesDetalleDTO datosGenerales)
        {
            try
            {
                var result = Repository.ObtenerParametroNuevo(datosGenerales.Id);
                return new ResponseDTO<RespuestaDTO>(result);
            }catch(Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            }
        }
    }
}
