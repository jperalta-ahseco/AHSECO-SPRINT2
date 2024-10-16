using AHSECO.CCL.BE.Mantenimiento;
using AHSECO.CCL.BE;
using AHSECO.CCL.COMUN;
using Dapper;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using AHSECO.CCL.BE.AsignacionManual;

namespace AHSECO.CCL.BD.AsignacionManual
{
    public class AsignacionManualBD
    {
        CCLog Log = new CCLog();
        public IEnumerable<ClientevsAsesorDTO> ObtenerListClientevsAsesor(ClientevsAsesorDTO clientevsAsesorDTO) 
        { 
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();

                parameters.Add("ID_CLIENTE", clientevsAsesorDTO.Id_Cliente);
                parameters.Add("ID_EMPLEADO", string.IsNullOrEmpty(clientevsAsesorDTO.Id_Empleado) ? null : clientevsAsesorDTO.Id_Empleado);

                var result = connection.Query(
                    sql: "USP_SEL_ASIG_CLIE_MANUAL",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new ClientevsAsesorDTO
                    {
                        Cliente = new ClienteDTO
                        {
                            ID = i.Single(d => d.Key.Equals("ID")).Value.Parse<int>(),
                            RUC = i.Single(d => d.Key.Equals("RUC")).Value.Parse<string>(),
                            NomEmpresa = i.Single(d => d.Key.Equals("NOMEMPRESA")).Value.Parse<string>(),
                            Estado = i.Single(d => d.Key.Equals("ESTADO")).Value.Parse<bool>()

                        },
                        Empleado = new EmpleadoDTO { 
                            NombresCompletosEmpleado = i.Single(d => d.Key.Equals("ASESOR")).Value.Parse<string>()
                        }
                    });

                connection.Close();

                return result;
            }
        }

        public bool Mantenimiento(ClientevsAsesorDTO clientevsAsesorDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                foreach(var i in clientevsAsesorDTO.Id_ClienteList) {
                    var parameters = new DynamicParameters();
                    parameters.Add("isId_cliente", i);
                    parameters.Add("isId_Asesor", clientevsAsesorDTO.Id_Empleado);
                    parameters.Add("isUsuarioRegistra", clientevsAsesorDTO.UsuarioRegistra);
                    parameters.Add("Eliminar", clientevsAsesorDTO.Eliminar);

                    var result = connection.Execute(
                        sql: "USP_MANT_ASIG_CLIENTE_ASESOR",
                        param: parameters,
                        commandType: CommandType.StoredProcedure
                     );
                }
                connection.Close();
            }
            return true;
        }

        public IEnumerable<ClientevsAsesorDTO> ObtenerListClientevsAsesorExcel(ClientevsAsesorDTO clientevsAsesorDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();

                parameters.Add("ID_CLIENTE", clientevsAsesorDTO.Id_Cliente);

                var result = connection.Query(
                    sql: "USP_SEL_CLIE_ASIG",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new ClientevsAsesorDTO
                    {
                        Cliente = new ClienteDTO
                        {
                            ID = i.Single(d => d.Key.Equals("ID")).Value.Parse<int>(),
                            RUC = i.Single(d => d.Key.Equals("RUC")).Value.Parse<string>(),
                            NomEmpresa = i.Single(d => d.Key.Equals("NOMEMPRESA")).Value.Parse<string>()

                        },
                        Empleado = new EmpleadoDTO
                        {
                            NombresCompletosEmpleado = i.Single(d => d.Key.Equals("ASESOR")).Value.Parse<string>()
                        },
                        Eliminado = i.Single(d => d.Key.Equals("ELIMINADO")).Value.Parse<string>(),
                        FecRegistro = i.Single(d => d.Key.Equals("FEC_REG")).Value.Parse<string>(),
                        FechaModificacion = i.Single(d => d.Key.Equals("FEC_MOD")).Value.Parse<string>()
                    });

                connection.Close();

                return result;
            }
        }

    }
}
