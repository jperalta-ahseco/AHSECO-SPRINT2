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
    public class ZonasBD
    {
        CCLog Log = new CCLog();
        public IEnumerable<ZonaDTO> Obtener(ZonaDTO zonaDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();

                var parameters = new DynamicParameters();

                parameters.Add("isDescripcion", zonaDTO.DesZona);
                parameters.Add("isEstado", zonaDTO.Estado);
                parameters.Add("isID", zonaDTO.Id);

                var result = connection.Query
                (
                    sql: "USP_SEL_ZONA",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new ZonaDTO
                    {
                        Id = i.Single(d => d.Key.Equals("ID")).Value.Parse<int>(),
                        DesZona = i.Single( d => d.Key.Equals("DESZONA")).Value.Parse<string>(),
                        Estado = i.Single(d => d.Key.Equals("ESTADO")).Value.Parse<bool>(),
                        UsuarioRegistra =i.Single(d => d.Key.Equals("AUDIT_REG_USR")).Value.Parse<string>(),
                        FechaRegistro = i.Single(d => d.Key.Equals("AUDIT_REG_FEC")).Value.Parse<DateTime>(),
                        FechaModifica= i.Single(d => d.Key.Equals("AUDIT_MOD_FEC")).Value.Parse<DateTime>()
                    });
                connection.Close();
                return result;
            }
        }
        public RespuestaDTO Insertar(ZonaDTO zonaDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();

                parameters.Add("isTipoProceso", "1");
                parameters.Add("isDesZona", zonaDTO.DesZona);
                parameters.Add("isEstado", zonaDTO.Estado);
                parameters.Add("isAudit_Reg_Usr", zonaDTO.UsuarioRegistra);

                var result = connection.Query
                (
                        sql: "USP_MANT_ZONAS",
                        param: parameters,
                        commandType: CommandType.StoredProcedure
                    )
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new RespuestaDTO
                    {
                        Codigo = i.Single(d => d.Key.Equals("COD")).Value.Parse<int>(),
                        Mensaje = i.Single(d => d.Key.Equals("MSJ")).Value.Parse<string>()
                    }).FirstOrDefault();
                connection.Close();
                return result;
            };
        }

        public RespuestaDTO Actualizar(ZonaDTO zonaDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();

                parameters.Add("isTipoProceso", "2");
                parameters.Add("isID", zonaDTO.Id);
                parameters.Add("isDesZona",zonaDTO.DesZona);
                parameters.Add("isEstado", zonaDTO.Estado);
                parameters.Add("isAudit_Mod_Usr", zonaDTO.UsuarioModifica);

                var result = connection.Query
                (
                        sql: "USP_MANT_ZONAS",
                        param: parameters,
                        commandType: CommandType.StoredProcedure
                    )
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new RespuestaDTO
                    {
                        Codigo = i.Single(d => d.Key.Equals("COD")).Value.Parse<int>(),
                        Mensaje = i.Single(d => d.Key.Equals("MSJ")).Value.Parse<string>()
                    }).FirstOrDefault();
                connection.Close();
                return result;
            };
        }
    };
};
