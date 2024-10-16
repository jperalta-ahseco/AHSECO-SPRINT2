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
    public class AutorizacionBD
    {
        CCLog Log;

        public AutorizacionBD() : this(new CCLog())
        {
        }

        public AutorizacionBD(CCLog cclog)
        {
            Log = cclog;
        }

        public UsuarioDTO Autenticar(UsuarioDTO usuarioDTO)
        {
                Log.TraceInfo(Utilidades.GetCaller());
                using (var connection = Factory.ConnectionFactory())
                {
                    connection.Open();
                    var parameters = new DynamicParameters();
                    parameters.Add("isUsuario", usuarioDTO.Usuario);

                    var result = connection.Query(
                            sql: "USP_SEL_SEGURIDAD_USUARIO_AUTENTICA",
                            param: parameters,
                            commandType: CommandType.StoredProcedure)
                            .Select(s => s as IDictionary<string, object>)
                            .Select(i => new UsuarioDTO
                            {
                                Id = i.Single(d => d.Key.Equals("ID")).Value.Parse<int>(),
                                TipoDocumento = new DatosGeneralesDetalleDTO
                                {
                                    Parametro = i.Single(d => d.Key.Equals("TIPO_DOC")).Value.Parse<string>(),
                                    Descripcion = i.Single(d => d.Key.Equals("TIPO_DOC_DESC")).Value.Parse<string>()
                                },
                                NumeroDocumento = i.Single(d => d.Key.Equals("NUM_DOC")).Value.Parse<string>(),
                                Nombres = i.Single(d => d.Key.Equals("NOMBRES")).Value.Parse<string>(),
                                Apellidos = i.Single(d => d.Key.Equals("APELLIDOS")).Value.Parse<string>(),
                                Email = i.Single(d => d.Key.Equals("EMAIL")).Value.Parse<string>(),
                                Usuario = i.Single(d => d.Key.Equals("USUARIO")).Value.Parse<string>(),
                                Password = i.Single(d => d.Key.Equals("PASSWORD")).Value.Parse<string>(),
                                UsuarioRed = i.SingleOrDefault(d => d.Key.Equals("USUARIO_RED")).Value.Parse<string>(),
                                ValidarAD = i.Single(d => d.Key.Equals("VALIDAR_AD")).Value.Parse<string>(),
                                IdEjecutor = i.Single(d => d.Key.Equals("EJECUTOR_ID")).Value.ParseNullable<int>(),
                                IdEPS = i.Single(d => d.Key.Equals("EPS_ID")).Value.ParseNullable<int>(),
                                Perfil = new PerfilDTO
                                {
                                    Id = i.Single(d => d.Key.Equals("PERFIL_ID")).Value.Parse<int>(),
                                    Descripcion = i.Single(d => d.Key.Equals("DESCRIPCION")).Value.Parse<string>()
                                },
                                FechaUltimaSesion= i.SingleOrDefault(d => d.Key.Equals("FEC_ULTSESION")).Value.Parse<string>()
                            }).FirstOrDefault();
                    return result;
                }
        }

        public bool ActualizarUltimaSesion(UsuarioDTO usuarioDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();

                var parameters = new DynamicParameters();
                parameters.Add("Id", usuarioDTO.Id);
                parameters.Add("UserMod", usuarioDTO.UsuarioModifica);
                parameters.Add("IpMod", usuarioDTO.IpMaquinaModifica);

                var result = connection.Execute
                (
                    sql: "USP_UPD_ULTIMASESION",
                    param: parameters,
                    commandType: CommandType.StoredProcedure
                );

                return true;
            }
        }
    }
}
