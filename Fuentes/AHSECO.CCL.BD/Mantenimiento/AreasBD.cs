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
    public class AreasBD
    {
        CCLog Log = new CCLog();
        public IEnumerable<AreaDTO> Obtener(AreaDTO areaDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();

                var parameters = new DynamicParameters();

                parameters.Add("codArea", areaDTO.CodigoArea);
                parameters.Add("descripcion", areaDTO.NombreArea);
                parameters.Add("Estado", areaDTO.Estado);

                var result = connection.Query
                (
                    sql: "USP_SEL_AREA",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new AreaDTO
                    {
                        CodigoArea = i.Single(d => d.Key.Equals("ID_AREA")).Value.Parse<int>(),
                        NombreArea = i.Single( d => d.Key.Equals("NOMBREAREA")).Value.Parse<string>(),
                        IdPadre = i.Single(d => d.Key.Equals("ID_AREAPADRE")).Value.Parse<int>(),
                        Estado = i.Single(d => d.Key.Equals("ESTADO")).Value.Parse<int>(),
                        UsuarioRegistra =i.Single(d => d.Key.Equals("USR_REG")).Value.Parse<string>(),
                        FechaRegistroFormat = i.Single(d => d.Key.Equals("FEC_REG")).Value.Parse<string>()
                    });
                return result;
            }
        }

    }
}
