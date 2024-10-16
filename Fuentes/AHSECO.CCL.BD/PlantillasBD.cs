using Dapper;
using AHSECO.CCL.BE;
using AHSECO.CCL.COMUN;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AHSECO.CCL.BE.Filtros;
using System.Data.SqlClient;

namespace AHSECO.CCL.BD
{
    public class PlantillasBD
    {
        CCLog Log;

        public PlantillasBD() : this(new CCLog())
        {
        }

        public PlantillasBD(CCLog cclog)
        {
            Log = cclog;
        }


        public PlantillaCorreoDTO ConsultarPlantillaCorreo(FiltroPlantillaDTO filtros)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("IdProceso", filtros.CodigoProceso);
                parameters.Add("CodPlantilla", filtros.CodigoPlantilla);
                parameters.Add("Usuario", filtros.Usuario);
                parameters.Add("Codigo", filtros.Codigo);

                var result = connection.Query(
                     sql: "USP_CONSULTA_PLANTILLA",
                     param: parameters,
                     commandType: CommandType.StoredProcedure)
                     .Select(s => s as IDictionary<string, object>)
                     .Select(i => new PlantillaCorreoDTO
                     {
                         Subject = i.Single(d => d.Key.Equals("SUBJECT")).Value.Parse<string>(),
                         Body = i.Single(d => d.Key.Equals("BODY")).Value.Parse<string>(),
                         To = i.Single(d => d.Key.Equals("TO")).Value.Parse<string>(),
                         CC = i.Single(d => d.Key.Equals("CC")).Value.Parse<string>(),
                     }).FirstOrDefault();

                return result;
            }
        }


    }
}
