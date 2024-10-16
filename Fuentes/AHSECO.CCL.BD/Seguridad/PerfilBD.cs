using Dapper;
using AHSECO.CCL.BE;
using AHSECO.CCL.COMUN;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace AHSECO.CCL.BD
{
    public class PerfilBD
    {
        CCLog Log = new CCLog();

        public IEnumerable<PerfilDTO> Obtener(PerfilDTO perfilDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();

                var parameters = new DynamicParameters();
                parameters.Add("id", perfilDTO.Id);
                parameters.Add("isDescripcion", perfilDTO.Descripcion);

                var result = connection.Query(
                    sql: "USP_SEL_SEGURIDAD_PERFIL",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new PerfilDTO
                    {
                        Id = i.Single(d => d.Key.Equals("ID")).Value.Parse<int>(),
                        Descripcion = i.Single(d => d.Key.Equals("DESCRIPCION")).Value.Parse<string>(),
                        Habilitado = i.Single(d => d.Key.Equals("HABILITADO")).Value.Parse<string>(),
                        DescripcionHabilitado = i.Single(d => d.Key.Equals("DESHAB")).Value.Parse<string>(),
                        UsuarioRegistra = i.Single(d => d.Key.Equals("USR_REG")).Value.Parse<string>(),
                        FechaRegistroFormat = i.Single(d => d.Key.Equals("FEC_REG")).Value.Parse<string>(),
                        IpMaquinaRegistro = i.Single(d => d.Key.Equals("IP_REG")).Value.Parse<string>(),
                        UsuarioModifica = i.Single(d => d.Key.Equals("USR_MOD")).Value.Parse<string>(),
                        FechaModificacionFormat = i.Single(d => d.Key.Equals("FEC_MOD")).Value.Parse<string>(),
                        IpMaquinaModifica = i.Single(d => d.Key.Equals("IP_MOD")).Value.Parse<string>(),
                    });

                return result;
            }
        }

        public bool Insertar(PerfilDTO perfilDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();

                var parameters = new DynamicParameters();
                parameters.Add("isDescripcion", perfilDTO.Descripcion);
                parameters.Add("isHabilitado", perfilDTO.Habilitado);
                parameters.Add("isUsuarioRegistra", perfilDTO.UsuarioRegistra);
                parameters.Add("isIpRegistra", perfilDTO.IpMaquinaRegistro);

                var result = connection.Execute
                (
                    sql: "USP_INS_SEGURIDAD_PERFIL",
                    param: parameters,
                    commandType: CommandType.StoredProcedure
                );

                return true;
            }
        }

        public bool Actualizar(PerfilDTO perfilDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();

                var parameters = new DynamicParameters();
                parameters.Add("id", perfilDTO.Id);
                parameters.Add("isDescripcion", perfilDTO.Descripcion);
                parameters.Add("isHabilitado", perfilDTO.Habilitado);
                parameters.Add("isUsuarioModifica", perfilDTO.UsuarioModifica);
                parameters.Add("IpMaquinaModifica", perfilDTO.IpMaquinaModifica);

                var result = connection.Execute
                (
                    sql: "USP_UPD_SEGURIDAD_PERFIL",
                    param: parameters,
                    commandType: CommandType.StoredProcedure
                );

                return true;
            }
        }

        public bool GuardarPermisos(string xmlPermisos)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();

                var parameters = new DynamicParameters();
                parameters.Add("iXmlPermisos", xmlPermisos.ToString(), DbType.Xml, ParameterDirection.Input);

                var result = connection.Execute
                (
                    sql: "USP_INS_SEGURIDAD_PERMISO",
                    param: parameters,
                    commandType: CommandType.StoredProcedure
                );

                return true;
            }
        }

        public IEnumerable<OpcionDTO> ObtenerPermisos(PerfilDTO perfilDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("idPerfil", perfilDTO.Id);
                var result = connection.Query(
                    sql: "USP_SEL_SEGURIDAD_PERMISO",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new OpcionDTO
                    {
                        Id = i.Single(d => d.Key.Equals("ID")).Value.Parse<int>(),
                        Tipo = i.Single(d => d.Key.Equals("TIPO")).Value.Parse<string>(),
                        Codigo = i.Single(d => d.Key.Equals("CODIGO")).Value.Parse<string>(),
                        Nombre = i.Single(d => d.Key.Equals("NOMBRE")).Value.Parse<string>(),
                        Descripcion = i.Single(d => d.Key.Equals("DESCRIPCION")).Value.Parse<string>(),
                        Url = i.Single(d => d.Key.Equals("URL")).Value.Parse<string>(),
                        Nivel = i.Single(d => d.Key.Equals("NIVEL")).Value.Parse<int>(),
                        Orden = i.Single(d => d.Key.Equals("ORDEN")).Value.Parse<int>(),
                        Padre = new OpcionDTO
                        {
                            Id = i.Single(d => d.Key.Equals("PADRE")).Value.Parse<int>(),
                        },
                        Icono = i.Single(d => d.Key.Equals("ICONO")).Value.Parse<string>(),
                        Habilitado = i.Single(d => d.Key.Equals("HABILITADO")).Value.Parse<string>(),
                        UsuarioModifica = i.Single(d => d.Key.Equals("USR_REG")).Value.Parse<string>(),
                        FechaModifica = i.Single(d => d.Key.Equals("FEC_REG")).Value.Parse<DateTime>(),
                    });
                return result;
            }
        }
    }
}
