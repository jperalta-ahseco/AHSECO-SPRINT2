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

namespace AHSECO.CCL.BD
{
    public class DocumentosBD
    {
        CCLog Log;

        public DocumentosBD() : this(new CCLog())
        {
        }

        public DocumentosBD(CCLog cclog)
        {
            Log = cclog;
        }

        public IEnumerable<DocumentoDTO> ConsultaDocumentos(long CodigoWorkFlow)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("CODWORKFLOW", CodigoWorkFlow);

                var result = connection.Query(
                     sql: "USP_CONSULTA_DOCUMENTOS",
                     param: parameters,
                     commandType: CommandType.StoredProcedure)
                     .Select(s => s as IDictionary<string, object>)
                     .Select(i => new DocumentoDTO
                     {
                         CodigoDocumento = i.Single(d => d.Key.Equals("COD_DOCUMENTO")).Value.Parse<long>(),
                         CodigoWorkFlow = i.Single(d => d.Key.Equals("ID_WORKFLOW")).Value.Parse<long>(),
                         CodigoTipoDocumento = i.Single(d => d.Key.Equals("COD_TIPODOC")).Value.Parse<string>(),
                         NombreTipoDocumento = i.Single(d => d.Key.Equals("NOMTIPODOC")).Value.Parse<string>(),
                         NombreDocumento = i.Single(d => d.Key.Equals("NOM_DOCUMENTO")).Value.Parse<string>(),
                         VerDocumento = i.Single(d => d.Key.Equals("VER_DOCUMENTO")).Value.Parse<bool>(),
                         RutaDocumento = i.Single(d => d.Key.Equals("RUTA_DOCUMENTO")).Value.Parse<string>(),
                         NombreUsuario = i.Single(d => d.Key.Equals("NOMBRE_USUARIO")).Value.Parse<string>(),
                         NombrePerfil = i.Single(d => d.Key.Equals("PERFIL")).Value.Parse<string>(),
                         Eliminado = i.Single(d => d.Key.Equals("ELIMINADO")).Value.Parse<int>(),
                         UsuarioRegistra = i.Single(d => d.Key.Equals("USR_REG")).Value.Parse<string>(),
                         FechaRegistroFormat = i.Single(d => d.Key.Equals("FEC_REG")).Value.Parse<string>(),
                     });

                return result;
            }
        }

        public RespuestaDTO MantenimientoDocumentos(DocumentoDTO documentoDTO)
        {
            var rpta = new RespuestaDTO();
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("ACCION", documentoDTO.Accion);
                parameters.Add("COD_DOCUMENTO", documentoDTO.CodigoDocumento);
                parameters.Add("CODWORKFLOW", documentoDTO.CodigoWorkFlow);
                parameters.Add("COD_TIPODOC", documentoDTO.CodigoTipoDocumento);
                parameters.Add("NOMDOCUMENTO", documentoDTO.NombreDocumento);
                parameters.Add("VER_DOCUMENTO", documentoDTO.VerDocumento);
                parameters.Add("RUTADOCUMENTO", documentoDTO.RutaDocumento);
                parameters.Add("NOMBREUSUARIO", documentoDTO.NombreUsuario);
                parameters.Add("PERFILUSUARIO", documentoDTO.NombrePerfil);
                parameters.Add("ELIMINADO", documentoDTO.Eliminado);
                parameters.Add("USRREG", documentoDTO.UsuarioRegistra);
                var result = connection.Query
                      (
                          sql: "USP_MANT_DOCUMENTOS",
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


    }
}
