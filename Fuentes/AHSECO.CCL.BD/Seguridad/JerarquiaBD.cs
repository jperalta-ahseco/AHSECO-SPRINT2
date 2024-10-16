using Dapper;
using AHSECO.CCL.BE;
using AHSECO.CCL.COMUN;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BD
{
    public class JerarquiaBD
    {
        CCLog Log = new CCLog();

        public IEnumerable<JerarquiaDTO> Obtener(JerarquiaDTO jerarquiaDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();

                var parameters = new DynamicParameters();
                parameters.Add("icId", jerarquiaDTO.Id);
                parameters.Add("icIdEjecutor", jerarquiaDTO.Ejecutor.Id);
                parameters.Add("@isUsuarioId", jerarquiaDTO.UsuarioRegistra);

                var result = connection.Query(
                    sql: "USP_SEL_SEGURIDAD_JERARQUIA",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new JerarquiaDTO
                    {
                        Id = i.Single(d => d.Key.Equals("ID")).Value.Parse<int>(),
                        Ejecutor = new CentroEvaluacionDTO
                        {
                            Id = i.Single(d => d.Key.Equals("EJECUTOR_ID")).Value.Parse<int>(),
                            RazonSocial = i.Single(d => d.Key.Equals("EJECUTOR_RAZON_SOCIAL")).Value.Parse<string>()
                        },
                        Eps = new CentroEvaluacionDTO
                        {
                            Id = i.Single(d => d.Key.Equals("EPS_ID")).Value.Parse<int>(),
                            RazonSocial = i.Single(d => d.Key.Equals("EPS_RAZON_SOCIAL")).Value.Parse<string>()
                        },
                        UsuarioModifica = i.Single(d => d.Key.Equals("AUDIT_USR")).Value.Parse<string>(),
                        FechaModifica = i.Single(d => d.Key.Equals("AUDIT_TIMESTAMP")).Value.Parse<DateTime>(),
                    });

                return result;
            }
        }

        public bool Insertar(JerarquiaDTO jerarquiaDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();

                var parameters = new DynamicParameters();
                parameters.Add("icEjecutorId", jerarquiaDTO.Ejecutor.Id);
                parameters.Add("icEpsId", jerarquiaDTO.Eps.Id);
                parameters.Add("isUsuarioRegistra", jerarquiaDTO.UsuarioRegistra);
                parameters.Add("isIPMaquina",jerarquiaDTO.IpMaquinaRegistro);
                var result = connection.Execute
                (
                    sql: "USP_INS_SEGURIDAD_JERARQUIA",
                    param: parameters,
                    commandType: CommandType.StoredProcedure
                );

                return true;
            }
        }

        public bool Actualizar(JerarquiaDTO jerarquiaDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();

                var parameters = new DynamicParameters();
                parameters.Add("icId", jerarquiaDTO.Id);
                parameters.Add("icEjecutorId", jerarquiaDTO.Ejecutor.Id);
                parameters.Add("icEpsId", jerarquiaDTO.Eps.Id);
                parameters.Add("isUsuarioModifica", jerarquiaDTO.UsuarioModifica);

                var result = connection.Execute
                (
                    sql: "USP_UPD_SEGURIDAD_JERARQUIA",
                    param: parameters,
                    commandType: CommandType.StoredProcedure
                );

                return true;
            }
        }

        public bool Eliminar(JerarquiaDTO jerarquiaDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();

                var parameters = new DynamicParameters();
                parameters.Add("icId", jerarquiaDTO.Id);

                var result = connection.Execute
                (
                    sql: "USP_DEL_SEGURIDAD_JERARQUIA",
                    param: parameters,
                    commandType: CommandType.StoredProcedure
                );

                return true;
            }
        }
    }
}
