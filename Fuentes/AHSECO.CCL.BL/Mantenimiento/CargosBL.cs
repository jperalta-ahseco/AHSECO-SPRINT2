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
    public class CargosBL
    {
        private CargosBD Repository;
        private CCLog Log;


        public CargosBL() : this(new CargosBD(),new CCLog())
        {
        }

        public CargosBL(CargosBD cargosBD, CCLog log)
        {
            Repository = cargosBD;
            Log = log;    
        }

        public ResponseDTO<IEnumerable<CargoDTO>> Obtener(CargoDTO cargoDTO)
        {
            try
            {
                var result = Repository.Obtener(cargoDTO);
                return new ResponseDTO<IEnumerable<CargoDTO>>(result);
            }
            catch(Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " +  ex.Message);
                return new ResponseDTO<IEnumerable<CargoDTO>>(ex);
            }
        }
        public ResponseDTO<bool> MantenimientosCargos(CargoDTO cargoDTO)
        {
            try
            {
                var result=Repository.MantenimientoCargo(cargoDTO);
                return new ResponseDTO<bool>(result);
            }
            catch (Exception ex) { 
                Log.TraceError(Utilidades.GetCaller()+"::"+ex.Message); 
                return new ResponseDTO<bool>(ex);
            }
        }
    }
}
