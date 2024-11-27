using AHSECO.CCL.BE;
using AHSECO.CCL.BE.ServicioTecnico.BandejaPreventivos;
using AHSECO.CCL.COMUN;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BD.ServicioTecnico.BandejaPreventivos
{
    public class PreventivosBD
    {
        CCLog Log;
        public PreventivosBD() : this(new CCLog())
        {   
        }

        public PreventivosBD(CCLog cclog)
        {
            Log = cclog;
        }

        public FiltrosPreventivosDTO ObtenerFiltrosPreventivos()
        {
            var result = new FiltrosPreventivosDTO();

            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionSingle())
            {
                SqlCommand cmd;
                connection.Open();
                string query = "EXEC [USP_PREV_SEL_FILTROS]";

                cmd = new SqlCommand(query, connection);



                using (var reader = cmd.ExecuteReader())
                {
                    List<ComboDTO> _listEmpresa = new List<ComboDTO>();
                    while (reader.Read())
                    {
                        var empresa = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("CODEMPRESA")) ? "" : reader.GetString(reader.GetOrdinal("CODEMPRESA")),
                            Text = reader.IsDBNull(reader.GetOrdinal("RAZONSOCIAL")) ? "" : reader.GetString(reader.GetOrdinal("RAZONSOCIAL"))
                        };
                        _listEmpresa.Add(empresa);
                    }

                    reader.NextResult();
                    List<ComboDTO> _Estados = new List<ComboDTO>();
                    while (reader.Read())
                    {
                        var estado = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("Codigo")) ? "" : reader.GetString(reader.GetOrdinal("Codigo")),
                            Text = reader.IsDBNull(reader.GetOrdinal("Abrev")) ? "" : reader.GetString(reader.GetOrdinal("Abrev"))
                        };

                        _Estados.Add(estado);
                    }
                    result.Empresas = _listEmpresa;
                    result.Estados = _Estados;
                }
            }
            return result;
        }

        public IEnumerable<ResultPreventivoDTO> ObtenerPreventivos(ReqPreventivoDTO req)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using(var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();

                parameters.Add("IsNumSerie", req.NumSerie);
                parameters.Add("IsNumProc", req.NumProc);
                parameters.Add("IsNumOrdCompra", req.NumOrdCompra);
                parameters.Add("IsNumFianza", req.NumFianza);
                parameters.Add("IsEmpresa", req.Empresa);
                parameters.Add("IsPeriodoInicio", req.PeriodoInicio);
                parameters.Add("IsPeriodoFinal", req.PeriodoFinal);
                parameters.Add("IsEstado", req.Estado);

                var result = connection.Query(
                    sql: "USP_PREV_SEL_PREVENTIVOS",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new ResultPreventivoDTO()
                    {

                    });
                connection.Close();
                return result;
            }
        }

    }
}
