﻿using AHSECO.CCL.BD.ServicioTecnico.BandejaInstalacionTecnica;
using AHSECO.CCL.BE;
using AHSECO.CCL.BE.Ventas;
using AHSECO.CCL.COMUN;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BL.ServicioTecnico.BandejaInstalacionTecnica
{
    public class InstalacionTecnicaBL
    {
        private InstalacionTecnicaBD Repository;
        private CCLog Log;

        public InstalacionTecnicaBL() : this(new InstalacionTecnicaBD(), new CCLog())
        {}

        public InstalacionTecnicaBL(InstalacionTecnicaBD instalacionTecnicaBD, CCLog log)
        {
            Repository = instalacionTecnicaBD;
            Log = log;
        }

        public ResponseDTO<FiltroInstalacionTecnica> ObtenerFiltrosInstalacion()
        {
            try
            {
                var result = Repository.ObtenerFiltrosInstalacion();
                return new ResponseDTO<FiltroInstalacionTecnica>(result);
            }
            catch (Exception ex) 
            { 
                Log.TraceError(Utilidades.GetCaller()+ "::"+  ex.Message);
                return new ResponseDTO<FiltroInstalacionTecnica>(ex);
            };
        }

        public ResponseDTO<RespuestaDTO> MantenimientoObservaciones(ObservacionDTO observacion)
        {
            try
            {
                var result = Repository.MantenimientoObservaciones(observacion);
                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceInfo(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            }
        }

        public ResponseDTO<IEnumerable<SolicitudDTO>> ObtenerSolicitudes(SolicitudDTO solicitudDTO)
        {
            try
            {
                var result = Repository.ObtenerSolicitudes(solicitudDTO);
                return new ResponseDTO<IEnumerable<SolicitudDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceInfo(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<IEnumerable<SolicitudDTO>>(ex);
            }
        }

    }
}