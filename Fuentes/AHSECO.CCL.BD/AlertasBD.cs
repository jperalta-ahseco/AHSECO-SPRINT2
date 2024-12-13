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
using AHSECO.CCL.BE.ServicioTecnico.BandejaGarantias;
using AHSECO.CCL.BE.ServicioTecnico.BandejaPreventivos;

namespace AHSECO.CCL.BD
{
    public class AlertasBD
    {
        CCLog Log;

        public AlertasBD() : this(new CCLog())
        {
        }

        public AlertasBD(CCLog cclog)
        {
            Log = cclog;
        }

        public IEnumerable<GarantiaResultDTO> ObtenerGarantiasProximasVencer()
        {
            using( var connection = Factory.ConnectionFactory())
            {
                Log.TraceInfo(Utilidades.GetCaller());
                connection.Open();
                var parameters = new DynamicParameters();

                var result = connection.Query(
                    sql: "USP_SEL_GARANT_PROX_VENCER",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new GarantiaResultDTO()
                    {
                        Id_Solicitud = i.Single(d => d.Key.Equals("SOLICITUD")).Parse<long>(),
                        Descripcion = i.Single(d => d.Key.Equals("DESCRIPCION")).Parse<string>(),
                        Marca = i.Single(d => d.Key.Equals("DESCMARCA")).Parse<string>(),
                        Modelo = i.Single(d => d.Key.Equals("MODELO")).Parse<string>(),
                        CodProducto = i.Single(d => d.Key.Equals("CODIGOPRODUCTO")).Parse<string>(),
                        NumSerie = i.Single(d => d.Key.Equals("NUMSERIE")).Parse<string>(),
                        FechaInstalacion = i.Single(d => d.Key.Equals("FECHAINSTALACION")).Parse<DateTime>(),
                        ValorGarantia = i.Single(d => d.Key.Equals("VALORGARANTIA")).Parse<string>(),
                        FechaVencimiento = i.Single(d => d.Key.Equals("FECHAVENCIMIENTO")).Parse<DateTime>()
                    });
                return result;
            }
        }


        public IEnumerable<ResultPreventivoDTO> ObtenerPreventivosProxVencer()
        {
            using (var connection = Factory.ConnectionFactory())
            {
                Log.TraceInfo(Utilidades.GetCaller());
                connection.Open();
                var parameters = new DynamicParameters();

                var result = connection.Query(
                    sql: "USP_SEL_PREV_PROX_VENCER",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new ResultPreventivoDTO()
                    {
                        Id_Mant = i.Single(d => d.Key.Equals("ID_MANT")).Value.Parse<long>(),
                        Serie = i.Single(d => d.Key.Equals("SERIE")).Value.Parse<string>(),
                        Descripcion = i.Single(d => d.Key.Equals("DESCRIPCION")).Value.Parse<string>(),
                        FechaInstalacion = i.Single(d => d.Key.Equals("FECHAINSTALACION")).Value.Parse<DateTime>(),
                        ProxFechaMant = i.Single(d => d.Key.Equals("PROXFECHAMANT")).Value.Parse<string>(),
                        TotalPrevent = i.Single(d => d.Key.Equals("TOTALPREVE")).Value.Parse<int>(),
                        PreventReal = i.Single(d => d.Key.Equals("COMPLETADOS")).Value.Parse<int>(),
                        PreventPend = i.Single(d => d.Key.Equals("PENDIENTES")).Value.Parse<int>(),
                        UbigeoDest = i.Single(d => d.Key.Equals("UBIGEODEST")).Value.Parse<string>()
                    });
                return result;
            }
        }
    }
}
