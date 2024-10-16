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
    public class ZonasBL
    {
        private ZonasBD Repository;
        private CCLog Log;


        public ZonasBL() : this(new ZonasBD(),new CCLog())
        {
        }

        public ZonasBL(ZonasBD zonasBD, CCLog log)
        {
            Repository = zonasBD;
            Log = log;    
        }

        public ResponseDTO<IEnumerable<ZonaDTO>> Obtener(ZonaDTO zonaDTO)
        {
            try
            {
                var result = Repository.Obtener(zonaDTO);
                return new ResponseDTO<IEnumerable<ZonaDTO>>(result);
            }
            catch(Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " +  ex.Message);
                return new ResponseDTO<IEnumerable<ZonaDTO>>(ex);
            }
        }

        public  ResponseDTO<RespuestaDTO> Insertar(ZonaDTO zonaDTO)
        {
            try
            {
                var result = Repository.Insertar(zonaDTO);
                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch(Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            }
        }

        public ResponseDTO<RespuestaDTO> Actualizar(ZonaDTO zonaDTO)
        {
            try
            {
                var result = Repository.Actualizar(zonaDTO);
                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            }
        }
    }
}
