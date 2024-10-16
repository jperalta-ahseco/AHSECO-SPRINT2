using Dapper;
using AHSECO.CCL.BE;
using AHSECO.CCL.COMUN;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AHSECO.CCL.BE.Reportes;

namespace AHSECO.CCL.BD
{
    public class UsuarioBD
    {
        CCLog Log = new CCLog();

        public IEnumerable<UsuarioDTO> Obtener(UsuarioDTO usuarioDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();

                var parameters = new DynamicParameters();
                parameters.Add("id", usuarioDTO.Id);
                parameters.Add("isUsuario", usuarioDTO.Usuario);
                parameters.Add("isNombres", usuarioDTO.Nombres);
                parameters.Add("isApellidos", usuarioDTO.Apellidos);

                var result = connection.Query(
                    sql: "USP_SEL_SEGURIDAD_USUARIO",
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
                        UsuarioRed = i.Single(d => d.Key.Equals("USUARIO_RED")).Value.Parse<string>(),
                        ValidarAD = i.Single(d => d.Key.Equals("VALIDAR_AD")).Value.Parse<string>(),
                        DescripcionValidarAD = i.Single(d => d.Key.Equals("DESVALIDARAD")).Value.Parse<string>(),
                        Habilitado = i.Single(d => d.Key.Equals("HABILITADO")).Value.Parse<string>(),
                        DescripcionHabilitado = i.Single(d => d.Key.Equals("DESHAB")).Value.Parse<string>(),
                        IdEjecutor = i.Single(d => d.Key.Equals("EJECUTOR_ID")).Value.ParseNullable<int>(),
                        IdEPS = i.Single(d => d.Key.Equals("EPS_ID")).Value.ParseNullable<int>(),
                        NombreEmpleado = i.Single(d => d.Key.Equals("NOMBREEMPLEADO")).Value.Parse<string>(),
                        FechaUltimaSesion = i.Single(d => d.Key.Equals("FEC_ULTSESION")).Value.Parse<string>(),
                        DescripcionBloqueado = i.Single(d => d.Key.Equals("BLOQUEADO")).Value.Parse<string>(),
                        UsuarioRegistra = i.Single(d => d.Key.Equals("USR_REG")).Value.Parse<string>(),
                        FechaRegistroFormat = i.Single(d => d.Key.Equals("FEC_REG")).Value.Parse<string>(),
                        IpMaquinaRegistro = i.Single(d => d.Key.Equals("IP_REG")).Value.Parse<string>(),
                        UsuarioModifica = i.Single(d => d.Key.Equals("USR_MOD")).Value.Parse<string>(),
                        FechaModificaFormat = i.Single(d => d.Key.Equals("FEC_MOD")).Value.Parse<string>(),
                        IpMaquinaModifica = i.Single(d => d.Key.Equals("IP_MOD")).Value.Parse<string>(),
                    });

                return result;
            }
        }

        public RespuestaDTO Insertar(UsuarioDTO UsuarioDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();

                var parameters = new DynamicParameters();
                parameters.Add("isTipoDocumento", UsuarioDTO.TipoDocumento.Parametro);
                parameters.Add("isNumDocumento", UsuarioDTO.NumeroDocumento);
                parameters.Add("isNombres", UsuarioDTO.Nombres);
                parameters.Add("isApellidos", UsuarioDTO.Apellidos);
                parameters.Add("isEmail", UsuarioDTO.Email);
                parameters.Add("isUsuario", UsuarioDTO.Usuario);
                parameters.Add("isUsuarioRed", UsuarioDTO.UsuarioRed);
                parameters.Add("isPassword", UsuarioDTO.Password);
                parameters.Add("isValidarAd", UsuarioDTO.ValidarAD);
                parameters.Add("isHabilitado", UsuarioDTO.Habilitado);
                parameters.Add("inIdEjecutor", UsuarioDTO.IdEjecutor);
                parameters.Add("inIdEps", UsuarioDTO.IdEPS);
                parameters.Add("isUsuarioRegistra", UsuarioDTO.UsuarioRegistra);
                parameters.Add("isIpRegistro", UsuarioDTO.IpMaquinaRegistro);

                var result = connection.Query(
                    sql: "USP_INS_SEGURIDAD_USUARIO",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new RespuestaDTO
                    {
                        Codigo = i.Single(d => d.Key.Equals("COD")).Value.Parse<int>(),
                        Mensaje = i.Single(d => d.Key.Equals("MSG")).Value.Parse<string>()
                       
                    }).FirstOrDefault();

                return result;
            }
        }

        public RespuestaDTO Actualizar(UsuarioDTO UsuarioDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();

                var parameters = new DynamicParameters();
                parameters.Add("id", UsuarioDTO.Id);
                parameters.Add("isTipoDocumento", UsuarioDTO.TipoDocumento.Parametro);
                parameters.Add("isNumDocumento", UsuarioDTO.NumeroDocumento);
                parameters.Add("isNombres", UsuarioDTO.Nombres);
                parameters.Add("isApellidos", UsuarioDTO.Apellidos);
                parameters.Add("isEmail", UsuarioDTO.Email);
                parameters.Add("isUsuario", UsuarioDTO.Usuario);
                parameters.Add("isUsuarioRed", UsuarioDTO.UsuarioRed);
                parameters.Add("isPassword", UsuarioDTO.Password);
                parameters.Add("isValidarAd", UsuarioDTO.ValidarAD);
                parameters.Add("isHabilitado", UsuarioDTO.Habilitado);
                parameters.Add("inIdEjecutor", UsuarioDTO.IdEjecutor);
                parameters.Add("inIdEps", UsuarioDTO.IdEPS);
                parameters.Add("isUsuarioModifica", UsuarioDTO.UsuarioModifica);
                parameters.Add("isIpMaquinaModifica",UsuarioDTO.IpMaquinaModifica);

                var result = connection.Query(
                    sql: "USP_UPD_SEGURIDAD_USUARIO",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new RespuestaDTO
                    {
                        Codigo = i.Single(d => d.Key.Equals("COD")).Value.Parse<int>(),
                        Mensaje = i.Single(d => d.Key.Equals("MSG")).Value.Parse<string>()

                    }).FirstOrDefault();

                return result;
            }
        }

        public RespuestaDTO ActualizarPassword(PasswordDTO passwordDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();

                var parameters = new DynamicParameters();
                parameters.Add("idUsuario", passwordDTO.IdUsuario);
                parameters.Add("isPasswordNuevo", passwordDTO.PasswordNuevo);
                parameters.Add("isUsuarioModifica", passwordDTO.Usuario);
                parameters.Add("IpMaquinaModifica", passwordDTO.IpMaquina);

                var result = connection.Query
                (
                    sql: "USP_UPD_SEGURIDAD_USUARIO_PASSWORD",
                    param: parameters,
                    commandType: CommandType.StoredProcedure
                )
                 .Select(s => s as IDictionary<string, object>)
                    .Select(i => new RespuestaDTO
                    {
                        Codigo = i.Single(d => d.Key.Equals("COD")).Value.Parse<int>(),
                        Mensaje = i.Single(d => d.Key.Equals("MSG")).Value.Parse<string>()

                    }).FirstOrDefault();

                return result;
            }
        }

        public IEnumerable<SesionReporteDTO> ReporteSesionUsuario(UsuarioDTO usuarioDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();

                var parameters = new DynamicParameters();
                parameters.Add("id", usuarioDTO.Id);

                var result = connection.Query(
                    sql: "USP_REP_SEGURIDAD_SESIONES",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new SesionReporteDTO
                    {
                        Id = i.Single(d => d.Key.Equals("ID")).Value.Parse<long>(),
                        CodigoUsuario = i.Single(d => d.Key.Equals("ID_USUARIO")).Value.Parse<int>(),
                        Usuario = i.Single(d => d.Key.Equals("USUARIO")).Value.Parse<string>(),
                        NombreUsuario = i.Single(d => d.Key.Equals("NOMBREUSUARIO")).Value.Parse<string>(),
                        FechaSesion = i.Single(d => d.Key.Equals("FEC_SESION")).Value.Parse<string>(),
                        UsuarioRegistro = i.Single(d => d.Key.Equals("AUDIT_USR")).Value.Parse<string>(),
                        FechaRegistro = i.Single(d => d.Key.Equals("FEC_REG")).Value.Parse<string>(),
                        IpMaquinaRegistro = i.Single(d => d.Key.Equals("AUDIT_IP")).Value.Parse<string>(),
                    });

                return result;
            }
        }

        public IEnumerable<UsuarioAuditoriaDTO> ReporteAuditoriaUsuario(UsuarioDTO usuarioDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();

                var parameters = new DynamicParameters();
                parameters.Add("id", usuarioDTO.Id);

                var result = connection.Query(
                    sql: "USP_REP_SEGURIDAD_AUDITORIA",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new UsuarioAuditoriaDTO
                    {
                        CodigoUsuario = i.Single(d => d.Key.Equals("CODIGO")).Value.Parse<int>(),
                        Tipo = i.Single(d => d.Key.Equals("TIPO")).Value.Parse<string>(),
                        FechaRegistro = i.Single(d => d.Key.Equals("FEC_REG")).Value.Parse<string>(),
                        TipoDocumentoAnterior = i.Single(d => d.Key.Equals("TIPO_DOC_ANT")).Value.Parse<string>(),
                        NumeroDocumentoAnterior = i.Single(d => d.Key.Equals("NUM_DOC_ANT")).Value.Parse<string>(),
                        NombreAnterior = i.Single(d => d.Key.Equals("NOMBRES_ANT")).Value.Parse<string>(),
                        ApellidosAnterior = i.Single(d => d.Key.Equals("APELLIDOS_ANT")).Value.Parse<string>(),
                        EmailAnterior = i.Single(d => d.Key.Equals("EMAIL_ANT")).Value.Parse<string>(),
                        UsuarioAnterior = i.Single(d => d.Key.Equals("USUARIO_ANT")).Value.Parse<string>(),
                        ValidarADAnterior = i.Single(d => d.Key.Equals("VALIDAR_AD_ANT")).Value.Parse<string>(),
                        UsuarioRedAnterior = i.Single(d => d.Key.Equals("USUARIO_RED_ANT")).Value.Parse<string>(),
                        HabilitadoAnterior = i.Single(d => d.Key.Equals("HABILITADO_ANT")).Value.Parse<string>(),
                        EjecutorAnterior = i.Single(d => d.Key.Equals("EJECUTOR_ID_ANT")).Value.Parse<string>(),
                        NombreEmpleadoAnterior = i.Single(d => d.Key.Equals("NOMBREEMPLEADOANT")).Value.Parse<string>(),
                        BloqueadoAnterior = i.Single(d => d.Key.Equals("BLOQUEADO_ANT")).Value.Parse<string>(),
                        UsuarioRegistroAnterior = i.Single(d => d.Key.Equals("USR_REG_ANT")).Value.Parse<string>(),
                        FechaRegistroAnterior = i.Single(d => d.Key.Equals("FEC_REG_ANT")).Value.Parse<string>(),
                        IpRegistroAnterior = i.Single(d => d.Key.Equals("IP_REG_ANT")).Value.Parse<string>(),
                        UsuarioModificacionAnterior = i.Single(d => d.Key.Equals("USR_MOD_ANT")).Value.Parse<string>(),
                        FechaModicacionAnterior = i.Single(d => d.Key.Equals("FEC_MOD_ANT")).Value.Parse<string>(),
                        IpModificacionAnterior = i.Single(d => d.Key.Equals("IP_MOD_ANT")).Value.Parse<string>(),
                        TipoDocumentoActual = i.Single(d => d.Key.Equals("TIPO_DOC_ACT")).Value.Parse<string>(),
                        NumeroDocumentoActual = i.Single(d => d.Key.Equals("NUM_DOC_ACT")).Value.Parse<string>(),
                        NombreActual = i.Single(d => d.Key.Equals("NOMBRES_ACT")).Value.Parse<string>(),
                        ApellidosActual = i.Single(d => d.Key.Equals("APELLIDOS_ACT")).Value.Parse<string>(),
                        EmailActual = i.Single(d => d.Key.Equals("EMAIL_ACT")).Value.Parse<string>(),
                        UsuarioActual = i.Single(d => d.Key.Equals("USUARIO_ACT")).Value.Parse<string>(),
                        ValidarADActual = i.Single(d => d.Key.Equals("VALIDAR_AD_ACT")).Value.Parse<string>(),
                        UsuarioRedActual = i.Single(d => d.Key.Equals("USUARIO_RED_ACT")).Value.Parse<string>(),
                        HabilitadoActual = i.Single(d => d.Key.Equals("HABILITADO_ACT")).Value.Parse<string>(),
                        EjecutorActual = i.Single(d => d.Key.Equals("EJECUTOR_ID_ACT")).Value.Parse<string>(),
                        NombreEmpleadoActual = i.Single(d => d.Key.Equals("NOMBREEMPLEADOACT")).Value.Parse<string>(),
                        BloqueadoActual = i.Single(d => d.Key.Equals("BLOQUEADO_ACT")).Value.Parse<string>(),
                        UsuarioRegistroActual = i.Single(d => d.Key.Equals("USR_REG_ACT")).Value.Parse<string>(),
                        FechaRegistroActual = i.Single(d => d.Key.Equals("FEC_REG_ACT")).Value.Parse<string>(),
                        IpRegistroActual = i.Single(d => d.Key.Equals("IP_REG_ACT")).Value.Parse<string>(),
                        UsuarioModificacionActual = i.Single(d => d.Key.Equals("USR_MOD_ACT")).Value.Parse<string>(),
                        FechaModicacionActual = i.Single(d => d.Key.Equals("FEC_MOD_ACT")).Value.Parse<string>(),
                        IpModificacionActual = i.Single(d => d.Key.Equals("IP_MOD_ACT")).Value.Parse<string>(),
                    });

                return result;
            }
        }
    }
}
