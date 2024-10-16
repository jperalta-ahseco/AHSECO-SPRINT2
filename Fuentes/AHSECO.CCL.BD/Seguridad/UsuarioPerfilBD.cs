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
    public class UsuarioPerfilBD
    {
        CCLog Log = new CCLog();

        public IEnumerable<UsuarioDTO> Obtener(PerfilDTO perfilDTO, int asignados)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();

                var parameters = new DynamicParameters();
                parameters.Add("inPerfilId", perfilDTO.Id);
                parameters.Add("inAsignados", asignados);

                var result = connection.Query(
                    sql: "USP_SEL_SEGURIDAD_USUARIO_PERFIL",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new UsuarioDTO
                    {
                        Id = i.Single(d => d.Key.Equals("ID")).Value.Parse<int>(),
                        Nombres = i.Single(d => d.Key.Equals("NOMBRES")).Value.Parse<string>(),
                        Apellidos = i.Single(d => d.Key.Equals("APELLIDOS")).Value.Parse<string>(),
                        Email = i.Single(d => d.Key.Equals("EMAIL")).Value.Parse<string>(),
                        Usuario = i.Single(d => d.Key.Equals("USUARIO")).Value.Parse<string>()
                    });

                return result;
            }
        }

        public bool Guardar(string xmlUsuariosPerfil, PerfilDTO perfilDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();

                var parameters = new DynamicParameters();
                parameters.Add("isPerfilId", perfilDTO.Id);
                parameters.Add("isUsuario", perfilDTO.UsuarioRegistra);
                parameters.Add("isIPMaquina", perfilDTO.IpMaquinaRegistro);
                parameters.Add("iXmlUsuariosPerfil", xmlUsuariosPerfil.ToString(), DbType.Xml, ParameterDirection.Input);

                var result = connection.Execute
                (
                    sql: "USP_INS_SEGURIDAD_USUARIO_PERFIL",
                    param: parameters,
                    commandType: CommandType.StoredProcedure
                );

                return true;
            }
        }
    }
}
