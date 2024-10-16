using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using AHSECO.CCL.BE;
using AHSECO.CCL.BE.Mantenimiento;
using AHSECO.CCL.COMUN;
using Dapper;

namespace AHSECO.CCL.BD.Mantenimiento
{
    public class CargosBD
    {
        CCLog Log = new CCLog();

        public CargosBD() : this(new CCLog())
        {
        }
        public CargosBD(CCLog cclog)
        {
            Log = cclog;
        }
        public IEnumerable<CargoDTO> Obtener(CargoDTO cargoDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();

                var parameters = new DynamicParameters();

                parameters.Add("codCargo", cargoDTO.CodigoCargo);
                parameters.Add("nombreCargo", cargoDTO.NombreCargo);
                parameters.Add("codArea", cargoDTO.CodigoArea);
                parameters.Add("Estado", cargoDTO.Estado);

                var result = connection.Query
                (
                    sql: "USP_SEL_CARGOS",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new CargoDTO
                    {
                        CodigoCargo = i.Single(d => d.Key.Equals("ID_CARGO")).Value.Parse<int>(),
                        NombreCargo = i.Single( d => d.Key.Equals("NOMBRECARGO")).Value.Parse<string>(),
                        Area = new AreaDTO {
                            CodigoArea = i.Single(d => d.Key.Equals("ID_AREA")).Value.Parse<int>(),
                            NombreArea = i.Single(d => d.Key.Equals("NOMBREAREA")).Value.Parse<string>()
                        },
                        Estado = i.Single(d => d.Key.Equals("ESTADO")).Value.Parse<int>(),
                        UsuarioRegistra =i.Single(d => d.Key.Equals("USR_REG")).Value.Parse<string>(),
                        FechaRegistroFormat = i.Single(d => d.Key.Equals("FEC_REG")).Value.Parse<string>()
                    });
                return result;
            }
        }
        public bool MantenimientoCargo(CargoDTO cargoDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using(var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("isTipoProceso", cargoDTO.TipoProceso);
                parameters.Add("isIdCargo",cargoDTO.CodigoCargo);
                parameters.Add("isIdArea", cargoDTO.Area.CodigoArea);
                parameters.Add("isDescripcion", cargoDTO.NombreCargo);
                parameters.Add("isEstado", cargoDTO.Estado);
                parameters.Add("isUserReg", cargoDTO.UsuarioRegistra);
                parameters.Add("isFecReg", cargoDTO.FechaRegistroFormat);

                var result = connection.Execute(
                    sql: "USP_MANT_CARGOS",
                    param: parameters,
                    commandType: CommandType.StoredProcedure
                    );
            }
            return true;
        }
    }
}
