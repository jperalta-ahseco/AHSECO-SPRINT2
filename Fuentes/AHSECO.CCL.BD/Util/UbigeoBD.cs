using AHSECO.CCL.COMUN;
using System;
using System.Collections.Generic;
using AHSECO.CCL.BE;
using Dapper;
using System.Data;
using System.Linq;
namespace AHSECO.CCL.BD.Util
{
    public class UbigeoBD
    {
        CCLog Log = new CCLog();
        public IEnumerable<UbigeoDTO> Obtener(UbigeoDTO ubigeoDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();

                parameters.Add("isUbigeoId", ubigeoDTO.UbigeoId);

                var result = connection.Query
                    (
                        sql: "USP_SEL_UBIGEO_ID",
                        commandType: CommandType.StoredProcedure,
                        param: parameters
                    )
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new UbigeoDTO()
                    {
                        UbigeoId = i.Single(d => d.Key.Equals("CODUBIGEO")).Value.Parse<string>(),
                        NombreDepartamento = i.Single(d => d.Key.Equals("NOMDEPARTAMENTO")).Value.Parse<string>(),
                        CodDepartamento = i.Single(d => d.Key.Equals("CODDEPARTAMENTO")).Value.Parse<string>(),
                        NombreProvincia = i.Single(d => d.Key.Equals("NOMPROVINCIA")).Value.Parse<string>(),
                        CodProvincia = i.Single(d => d.Key.Equals("CODPROVINCIA")).Value.Parse<string>(),
                        NombreDistrito = i.Single(d => d.Key.Equals("NOMDISTRITO")).Value.Parse<string>(),
                        NombreCapitalLegal = i.Single(d => d.Key.Equals("NOMCAPITALLEGAL")).Value.Parse<string>(),
                        CodigoRegion = i.Single(d => d.Key.Equals("CODREGION")).Value.Parse<int>(),
                        NombreRegion= i.Single(d => d.Key.Equals("NOMREGION")).Value.Parse<string>(),
                    });
                return result;
            };
        }
    }
}
