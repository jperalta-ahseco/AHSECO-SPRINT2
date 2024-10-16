using System;
using AHSECO.CCL.BD;
using AHSECO.CCL.COMUN;
using AHSECO.CCL.BE;
using System.DirectoryServices;
using static System.Net.Mime.MediaTypeNames;
using System.Collections.Generic;
using AHSECO.CCL.BE.Filtros;

namespace AHSECO.CCL.BL
{
    public class EmpleadosBL
    {
        private EmpleadosBD Repository;

        private CCLog Log;
        public EmpleadosBL()
            : this(new EmpleadosBD(), new CCLog())
        {
        }
        public EmpleadosBL(EmpleadosBD empleadosBD, CCLog log)
        {
            Repository = empleadosBD;
            Log = log;
        }

        public ResponseDTO<IEnumerable<EmpleadoDTO>> ListarEmpleados(FiltroEmpleadosDTO filtroEmpleadosDTO)
        {
            try
            {
                var result = Repository.ListarEmpleados(filtroEmpleadosDTO);
                return new ResponseDTO<IEnumerable<EmpleadoDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<IEnumerable<EmpleadoDTO>>(ex);
            }
        }

        public ResponseDTO<bool> MantenimientoEmpleado(FiltroEmpleadosDTO filtroEmpleadosDTO)
        {
            try
            {
                var result = Repository.MantenimientoEmpleado(filtroEmpleadosDTO);
                return new ResponseDTO<bool>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<bool>(ex);
            }
        }
        public ResponseDTO<bool> EmpleadosMant(EmpleadoDTO empleadoDTO)
        {
            try
            {
                var result = Repository.EmpleadosMant(empleadoDTO);
                return new ResponseDTO<bool>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<bool>(ex);
            }
        }
        public ResponseDTO<FiltroGrupoEmpledosDTO> GrupoEmpleadosFiltro()
        {
            try
            {
                var result = Repository.GrupoEmpleadosFiltro();

                return new ResponseDTO<FiltroGrupoEmpledosDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<FiltroGrupoEmpledosDTO>(ex);
            }
        }

    }
}
