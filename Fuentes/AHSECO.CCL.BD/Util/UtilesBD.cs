using AHSECO.CCL.COMUN;
using System;
using System.Collections.Generic;
using AHSECO.CCL.BE;
using Dapper;
using System.Data;
using System.Linq;
using System.Diagnostics;
namespace AHSECO.CCL.BD.Util
{
    public class UtilesBD
    {
        CCLog Log = new CCLog();
        public int ValidarParametros(FiltroValidadorDTO filtroValidadorDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();

                parameters.Add("Identificador", filtroValidadorDTO.Identificador);
                parameters.Add("Param1", filtroValidadorDTO.Parametro1);
                parameters.Add("Param2", filtroValidadorDTO.Parametro2);
                parameters.Add("Param3", filtroValidadorDTO.Parametro3);
                parameters.Add("Param4", filtroValidadorDTO.Parametro4);
                parameters.Add("Param5", filtroValidadorDTO.Parametro5);
                parameters.Add("Param6", filtroValidadorDTO.Parametro6);
                parameters.Add("Rpta", dbType: DbType.Int32, direction: ParameterDirection.Output);
                var result = connection.Execute
                        (
                            sql: "USP_VALIDADOR",
                            param: parameters,
                            commandType: CommandType.StoredProcedure
                        );
                var outputRpta = parameters.Get<int>("Rpta");
                return outputRpta;          
            };
        }
    }
}
