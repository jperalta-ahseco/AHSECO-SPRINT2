using Dapper;
using AHSECO.CCL.BE;
using AHSECO.CCL.COMUN;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics;

namespace AHSECO.CCL.BD
{
    public class ProcesosBD
    {
        CCLog Log;

        public ProcesosBD() : this(new CCLog())
        {
        }

        public ProcesosBD(CCLog cclog)
        {
            Log = cclog;
        }

        public IEnumerable<ProcesoEstadoDTO> ListarEstadosxProceso(FiltroProcesoEstadoDTO filtroProcesoEstadoDTO)
        {
                Log.TraceInfo(Utilidades.GetCaller());
                using (var connection = Factory.ConnectionFactory())
                {
                    connection.Open();
                    var parameters = new DynamicParameters();
                    parameters.Add("IdProceso", filtroProcesoEstadoDTO.CodigoProceso);

                var result = connection.Query(
                     sql: "USP_CONSULTA_LISTAESTADOSXPROCESOS",
                     param: parameters,
                     commandType: CommandType.StoredProcedure)
                     .Select(s => s as IDictionary<string, object>)
                     .Select(i => new ProcesoEstadoDTO
                     {

                         Proceso = new ProcesoDTO
                         {
                             CodigoProceso = i.Single(d => d.Key.Equals("ID_PROCESO")).Value.Parse<int>(),
                             NombreProceso = i.Single(d => d.Key.Equals("NOMPROCESO")).Value.Parse<string>()
                         },
                         CodigoEstado = i.Single(d => d.Key.Equals("COD_ESTADO")).Value.Parse<string>(),
                         NombreEstado = i.Single(d => d.Key.Equals("NOM_ESTADO")).Value.Parse<string>(),
                         AbreviaturaEstado = i.Single(d => d.Key.Equals("ABREV_ESTADO")).Value.Parse<string>()
                     });

                return result;
            }
        }

        public long InsertarWorkflow(FiltroWorkflowDTO filtroWorkflowDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                using (var trans = connection.BeginTransaction())
                {
                    try
                    {
                        var parameters = new DynamicParameters();
                        parameters.Add("IdProceso", filtroWorkflowDTO.CodigoProceso);
                        parameters.Add("UsrRegistro", filtroWorkflowDTO.UsuarioRegistro);
                        parameters.Add("SubTipo", filtroWorkflowDTO.SubTipo);
                        parameters.Add("IdWorkflow", dbType: DbType.Int64, direction: ParameterDirection.Output);
                        var result = connection.Execute
                        (
                            sql: "USP_CREAR_WORKFLOW",
                            param: parameters,
                            commandType: CommandType.StoredProcedure,
                            transaction: trans
                        );
                        var outputWorkflowID = parameters.Get<long>("IdWorkflow");
                        trans.Commit();
                        return outputWorkflowID;
                    }
                    catch (Exception ex)
                    {
                        trans.Rollback();
                        throw ex;
                    }
                    
                }
                
            }
        }
        public long InsertarWorkflowLog(FiltroWorkflowLogDTO filtroWorkflowLogDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                using (var trans = connection.BeginTransaction())
                {
                    try
                    {
                        var parameters = new DynamicParameters();
                        parameters.Add("IdWorkflow", filtroWorkflowLogDTO.CodigoWorkflow);
                        parameters.Add("Usuario", filtroWorkflowLogDTO.Usuario);
                        parameters.Add("CodEstado", filtroWorkflowLogDTO.CodigoEstado);
                        parameters.Add("UsrRegistro", filtroWorkflowLogDTO.UsuarioRegistro);
                        parameters.Add("IdWorkflowLog", dbType: DbType.Int64, direction: ParameterDirection.Output);
                        var result = connection.Execute
                        (
                            sql: "USP_CREAR_WORKFLOWLOG",
                            param: parameters,
                            commandType: CommandType.StoredProcedure,
                            transaction: trans
                        );
                        var outputWorkflowID = parameters.Get<long>("IdWorkflowLog");
                        trans.Commit();
                        return outputWorkflowID;
                    }
                    catch (Exception ex)
                    {
                        trans.Rollback();
                        throw ex;
                    }

                }

            }
        }

        public IEnumerable<WorkflowLogDTO> ConsultaSeguimiento(FiltroWorkflowLogDTO filtroWorkflowLogDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("IdWorkflow", filtroWorkflowLogDTO.CodigoWorkflow);

                var result = connection.Query(
                     sql: "USP_CONSULTA_WORKFLOWLOG",
                     param: parameters,
                     commandType: CommandType.StoredProcedure)
                     .Select(s => s as IDictionary<string, object>)
                     .Select(i => new WorkflowLogDTO
                     {
                         CodigoWorkflowLog = i.Single(d => d.Key.Equals("ID")).Value.Parse<long>(),
                         CodigoWorkflow = i.Single(d => d.Key.Equals("ID_WORKFLOW")).Value.Parse<long>(),
                         CodigoEstado = i.Single(d => d.Key.Equals("COD_ESTADO")).Value.Parse<string>(),
                         DescripcionEstado = i.Single(d => d.Key.Equals("DES_ESTADO")).Value.Parse<string>(),
                         Cargo = i.Single(d => d.Key.Equals("CARGO")).Value.Parse<string>(),
                         Area = i.Single(d => d.Key.Equals("AREA")).Value.Parse<string>(),
                         UsuarioRegistro = i.Single(d => d.Key.Equals("USR_REG")).Value.Parse<string>(),
                         NombreUsuarioRegistro = i.Single(d => d.Key.Equals("NOMBREUSRREGISTRO")).Value.Parse<string>(),
                         FechaRegistro = i.Single(d => d.Key.Equals("FEC_REG")).Value.Parse<string>(),
                     });

                return result;
            }
        }


        public IEnumerable<WorkFlowRolDTO> ConsultaWorkFLowRoles(string usuario,int codProceso)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("USUARIO", usuario);
                parameters.Add("IDPROCESO", codProceso);

                var result = connection.Query(
                     sql: "USP_CONSULTA_ROL_FLUJO",
                     param: parameters,
                     commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                     .Select(i => new WorkFlowRolDTO
                     {
                         NombreRol = i.Single(d => d.Key.Equals("ROL")).Value.Parse<string>(),
                         CodigoArea = i.Single(d => d.Key.Equals("IDAREA")).Value.Parse<int>(),
                     });

                return result;
            }
        }
    }
}
