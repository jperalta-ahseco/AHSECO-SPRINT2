using AHSECO.CCL.BE;
using AHSECO.CCL.BE.Ventas;
using AHSECO.CCL.COMUN;
using Dapper;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace AHSECO.CCL.BD.Ventas
{
    public class VentasBD
    {
        CCLog Log;
        public VentasBD() : this(new CCLog())
        {}

        public VentasBD(CCLog log)
        {
            Log = log;
        }
        public IEnumerable<SolicitudDTO> ObtenerSolicitudes(SolicitudDTO solicitudDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());

            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("isIdCliente", solicitudDTO.IdCliente);
                parameters.Add("isIdSolicitud", solicitudDTO.Id_Solicitud);

                var result = connection.Query(
                    sql: "USP_SEL_SOLICITUDES",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new SolicitudDTO
                    {
                        Id_Solicitud = i.Single(d => d.Key.Equals("ID_SOLICITUD")).Value.Parse<long>(),
                        nomFlujo = i.Single(d => d.Key.Equals("FLUJO")).Value.Parse<string>(),
                        Id_Flujo = i.Single(d => d.Key.Equals("CODFLUJO")).Value.Parse<int>(), 
                        NomTipoSol = i.Single(d => d.Key.Equals("TIPO")).Value.Parse<string>(),
                        Tipo_Sol = i.Single(d => d.Key.Equals("CODTIPOSOL")).Value.Parse<string>(),
                        Fecha_Sol = i.Single(d => d.Key.Equals("FECHA_SOL")).Value.Parse<string>(),
                        nomEstado = i.Single(d => d.Key.Equals("ESTADO")).Value.Parse<string>(),
                        Id_WorkFlow = i.Single(d => d.Key.Equals("ID_WORKFLOW")).Value.Parse<long>(),
                        Cod_MedioCont = i.Single(d => d.Key.Equals("COD_MEDIOCONT")).Value.Parse<string>(),
                        IdCliente = i.Single(d => d.Key.Equals("IDCLIENTE")).Value.Parse<int>(),
                        RUC = i.Single(d => d.Key.Equals("RUC")).Value.Parse<string>(),
                        RazonSocial = i.Single(d => d.Key.Equals("RAZONSOCIAL")).Value.Parse<string>(),
                        AsesorVenta = i.Single(d => d.Key.Equals("ASESORVENTA")).Value.Parse<string>()
                    });

                connection.Close();
                return result;
            };
        }
        
        public RespuestaDTO MantenimientoSolicitudes(SolicitudDTO solicitudDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();

                parameters.Add("IsTipoProceso", solicitudDTO.IsTipoProceso);
                parameters.Add("isCodSolicitud", solicitudDTO.Id_Solicitud);
                parameters.Add("IsID_WORKFLOW",solicitudDTO.Id_WorkFlow);
                parameters.Add("IsID_FLUJO", solicitudDTO.Id_Flujo);
                parameters.Add("IsFECHA_SOL", solicitudDTO.Fecha_Sol);
                parameters.Add("IsTIPO_SOL", solicitudDTO.Tipo_Sol);
                parameters.Add("IsCOD_MEDIOCONT", solicitudDTO.Cod_MedioCont);
                parameters.Add("IsIDCLIENTE", solicitudDTO.IdCliente);
                parameters.Add("IsRUC", solicitudDTO.RUC);
                parameters.Add("IsRAZONSOCIAL", solicitudDTO.RazonSocial);
                parameters.Add("IsASESORVENTA", solicitudDTO.AsesorVenta);
                parameters.Add("IsESTADO", solicitudDTO.Estado);
                parameters.Add("isUsrEjecuta", solicitudDTO.UsuarioRegistra);
                parameters.Add("isIP_Ejecuta", solicitudDTO.IpMaquinaRegistro);

                var result = connection.Query(
                    sql: "USP_MANT_MAIN_SOLICITUDES",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                     .Select(s => s as IDictionary<string, object>)
                     .Select(i => new RespuestaDTO
                     {
                         Codigo = i.Single(d => d.Key.Equals("COD")).Value.Parse<int>(),
                         Mensaje = i.Single(d => d.Key.Equals("MSG")).Value.Parse<string>()
                     }).FirstOrDefault();

                connection.Close();
                return result;
            }
        }
        public RespuestaDTO MantenimientoCotizacion(CotizacionDTO cotizacion)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();

                parameters.Add("IsTipoProceso",cotizacion.TipoProceso);
                parameters.Add("isIdCotizacion", cotizacion.IdCotizacion);
                parameters.Add("isID_SOLICITUD", cotizacion.IdSolicitud);
                parameters.Add("isFEC_COTIZACION", cotizacion.FecCotizacion);
                parameters.Add("isNOMBRECONTACTO", cotizacion.NombreContacto);
                parameters.Add("isAREACONTACTO", cotizacion.AreaContacto);
                parameters.Add("isTELEFONOCONTACTO", cotizacion.TelefonoContacto);
                parameters.Add("isEMAILCONTACTO", cotizacion.EmailContacto);
                parameters.Add("isPLAZOENTREGA", cotizacion.PlazoEntrega);
                parameters.Add("isFORMAPAGO", cotizacion.FormaPago);
                parameters.Add("isMONEDA", cotizacion.Moneda);
                parameters.Add("isVIGENCIA", cotizacion.Vigencia);
                parameters.Add("isGARANTIA", cotizacion.Garantia);
                parameters.Add("isOBSERVACION", cotizacion.Observacion);
                parameters.Add("isESTADO", cotizacion.Estado);
                parameters.Add("isUsrEjecuta", cotizacion.UsuarioRegistra);
                parameters.Add("isFecEjecucion", cotizacion.FechaRegistro);

                var result = connection.Query(
                    sql: "USP_MANT_TBM_COTIZACIONVENTA",
                    param : parameters,
                    commandType: CommandType.StoredProcedure)
                     .Select(s => s as IDictionary<string, object>)
                     .Select(i => new RespuestaDTO
                     {
                         Codigo = i.Single(d => d.Key.Equals("COD")).Value.Parse<int>(),
                         Mensaje = i.Single(d => d.Key.Equals("MSG")).Value.Parse<string>()
                     }).FirstOrDefault();

                connection.Close();
                return result;
            }
        }
        public RespuestaDTO MantenimientoCotizacionDetalle(DetalleCotizacionDTO detalleCotizacion)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using ( var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();

                parameters.Add("isTipoProceso",detalleCotizacion.TipoProceso);
                parameters.Add("isID_DETALLE", detalleCotizacion.IdDetalleCot);
                parameters.Add("isID_COTIZACION", detalleCotizacion.IdDetalleCot);
                parameters.Add("isTIPO", detalleCotizacion.Tipo);
                parameters.Add("isTIPOPRODUCTO", detalleCotizacion.TipoProducto);
                parameters.Add("isCODPRODUCTO", detalleCotizacion.CodProducto);
                parameters.Add("isDESCRIPCION", detalleCotizacion.Descripcion);
                parameters.Add("isUNIDAD", detalleCotizacion.Unidad);
                parameters.Add("isCANTIDAD", detalleCotizacion.Cantidad);
                parameters.Add("isCOSTOFOB", detalleCotizacion.CostoFob);
                parameters.Add("isVVENTAUNI", detalleCotizacion.VventaUni);
                parameters.Add("isVVTOTALSIGV", detalleCotizacion.VvTotalSigv);
                parameters.Add("isELIMINADO", detalleCotizacion.Eliminado);
                parameters.Add("isUsrEjecuta",detalleCotizacion.UsuarioRegistra);
                parameters.Add("isFecEjecuta", detalleCotizacion.FechaRegistro);

                var result = connection.Query(
                    sql: "",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new RespuestaDTO
                    {
                        Codigo = i.Single(d => d.Key.Equals("COD")).Value.Parse<int>(),
                        Mensaje = i.Single(d => d.Key.Equals("MSG")).Value.Parse<string>()
                    }).FirstOrDefault();

                connection.Close();
                return result;
            }
        }
        public RespuestaDTO MantenimientoObservaciones(ObservacionDTO observacionDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using ( var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("@IsTipoProceso", observacionDTO.TipoProceso);
                parameters.Add("@isID_WORKFLOW", observacionDTO.Id_WorkFlow);
                parameters.Add("@isESTADO_INSTANCIA", observacionDTO.Estado_Instancia);
                parameters.Add("@isOBSERVACION", observacionDTO.Observacion);
                parameters.Add("@isNOMBRE_USUARIO", observacionDTO.Nombre_Usuario);
                parameters.Add("@isPERFIL_USUARIO", observacionDTO.Perfil_Usuario);
                parameters.Add("@isUSR_REG", observacionDTO.UsuarioRegistra);

                var result = connection.Query(
                    sql: "USP_MANT_OBSERVACIONES",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                     .Select(s => s as IDictionary<string, object>)
                     .Select(i => new RespuestaDTO
                     {
                         Codigo = i.Single(d => d.Key.Equals("COD")).Value.Parse<int>(),
                         Mensaje = i.Single(d => d.Key.Equals("MSG")).Value.Parse<string>()
                     }).FirstOrDefault();

                connection.Close();
                return result;
            };
        }
        public SolicitudVentaGrupoDTO VerDetalleSolicitud(SolicitudDTO solicitudDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());

            using(var connection = Factory.ConnectionSingle())
            {
                var parameters = new DynamicParameters();
                parameters.Add("isIdSolicitud", solicitudDTO.Id_Solicitud);
                parameters.Add("isIdCliente", solicitudDTO.IdCliente);
                parameters.Add("isIdWorkFlow", solicitudDTO.Id_WorkFlow);

                SqlCommand command;
                var result = new SolicitudVentaGrupoDTO();
                string query = "exec USP_SEL_MAIN_SOLICITUD @isIdSolicitud=" + solicitudDTO.Id_Solicitud.ToString() + ", @isIdCliente="+ solicitudDTO.IdCliente.ToString() + ", @isIdWorkFlow="+ solicitudDTO.Id_WorkFlow.ToString();
                connection.Open();
                command = new SqlCommand(query, connection);

                using (var reader = command.ExecuteReader())
                {
                    reader.Read();
                    SolicitudDTO solicitud = new SolicitudDTO
                    {
                        Id_Solicitud = reader.IsDBNull(reader.GetOrdinal("ID_SOLICITUD")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_SOLICITUD")),
                        Id_WorkFlow = reader.IsDBNull(reader.GetOrdinal("ID_WORKFLOW")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_WORKFLOW")),
                        nomFlujo = reader.IsDBNull(reader.GetOrdinal("FLUJO")) ? "" : reader.GetString(reader.GetOrdinal("FLUJO")),
                        Id_Flujo = reader.IsDBNull(reader.GetOrdinal("CODFLUJO")) ? 0 : reader.GetInt32(reader.GetOrdinal("CODFLUJO")),
                        NomTipoSol = reader.IsDBNull(reader.GetOrdinal("TIPO")) ? "" : reader.GetString(reader.GetOrdinal("TIPO")),
                        Tipo_Sol = reader.IsDBNull(reader.GetOrdinal("CODTIPOSOL")) ? "" : reader.GetString(reader.GetOrdinal("CODTIPOSOL")),
                        Fecha_Sol = reader.IsDBNull(reader.GetOrdinal("FECHA_SOL")) ? "" : reader.GetString(reader.GetOrdinal("FECHA_SOL")),
                        nomEstado = reader.IsDBNull(reader.GetOrdinal("ESTADO")) ? "" : reader.GetString(reader.GetOrdinal("ESTADO")),
                        Cod_MedioCont = reader.IsDBNull(reader.GetOrdinal("COD_MEDIOCONT")) ? "" : reader.GetString(reader.GetOrdinal("COD_MEDIOCONT")),
                        IdCliente = reader.IsDBNull(reader.GetOrdinal("IDCLIENTE")) ? 0 : reader.GetInt32(reader.GetOrdinal("IDCLIENTE")),
                        RUC = reader.IsDBNull(reader.GetOrdinal("RUC")) ? "" : reader.GetString(reader.GetOrdinal("RUC")),
                        RazonSocial = reader.IsDBNull(reader.GetOrdinal("RAZONSOCIAL")) ? "" : reader.GetString(reader.GetOrdinal("RAZONSOCIAL")),
                        AsesorVenta = reader.IsDBNull(reader.GetOrdinal("ASESORVENTA")) ? "" : reader.GetString(reader.GetOrdinal("ASESORVENTA"))
                    };

                    reader.NextResult();

                    List<DocumentoDTO> _listaAdjuntos = new List<DocumentoDTO>();

                    while (reader.Read())
                    {
                        var documento = new DocumentoDTO
                        {
                            CodigoDocumento = reader.IsDBNull(reader.GetOrdinal("COD_DOCUMENTO")) ? 0 : reader.GetInt64(reader.GetOrdinal("COD_DOCUMENTO")),
                            CodigoWorkFlow = reader.IsDBNull(reader.GetOrdinal("ID_WORKFLOW")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_WORKFLOW")),
                            CodigoTipoDocumento = reader.IsDBNull(reader.GetOrdinal("COD_TIPODOC")) ? "" : reader.GetString(reader.GetOrdinal("COD_TIPODOC")),
                            NombreTipoDocumento = reader.IsDBNull(reader.GetOrdinal("NOMTIPODOC")) ? "" : reader.GetString(reader.GetOrdinal("NOMTIPODOC")),
                            NombreDocumento = reader.IsDBNull(reader.GetOrdinal("NOM_DOCUMENTO")) ? "" : reader.GetString(reader.GetOrdinal("NOM_DOCUMENTO")),
                            VerDocumento = reader.IsDBNull(reader.GetOrdinal("VER_DOCUMENTO")) ? false : reader.GetBoolean(reader.GetOrdinal("VER_DOCUMENTO")),
                            RutaDocumento = reader.IsDBNull(reader.GetOrdinal("RUTA_DOCUMENTO")) ? "" : reader.GetString(reader.GetOrdinal("RUTA_DOCUMENTO")),
                            NombreUsuario = reader.IsDBNull(reader.GetOrdinal("NOMBRE_USUARIO")) ? "" : reader.GetString(reader.GetOrdinal("NOMBRE_USUARIO")),
                            NombrePerfil = reader.IsDBNull(reader.GetOrdinal("PERFIL")) ? "" : reader.GetString(reader.GetOrdinal("PERFIL")),
                            Eliminado = reader.IsDBNull(reader.GetOrdinal("ELIMINADO")) ? 0 : reader.GetInt32(reader.GetOrdinal("ELIMINADO")),
                            UsuarioRegistra = reader.IsDBNull(reader.GetOrdinal("USR_REG")) ? "" : reader.GetString(reader.GetOrdinal("USR_REG")),
                            FechaRegistroFormat = reader.IsDBNull(reader.GetOrdinal("FEC_REG")) ? "" : reader.GetString(reader.GetOrdinal("FEC_REG")),
                        };
                        _listaAdjuntos.Add(documento);
                    };

                    reader.NextResult();

                    List<ObservacionDTO> _listaObservaciones = new List<ObservacionDTO>();

                    while (reader.Read())
                    {
                        var observacion = new ObservacionDTO
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("ID_OBSERVACION")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_OBSERVACION")),
                            Id_WorkFlow = reader.IsDBNull(reader.GetOrdinal("ID_WORKFLOW")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_WORKFLOW")),
                            Estado_Instancia = reader.IsDBNull(reader.GetOrdinal("ESTADO_INSTANCIA")) ? "" : reader.GetString(reader.GetOrdinal("ESTADO_INSTANCIA")),
                            Observacion = reader.IsDBNull(reader.GetOrdinal("OBSERVACION")) ? "" : reader.GetString(reader.GetOrdinal("OBSERVACION")),
                            Nombre_Usuario= reader.IsDBNull(reader.GetOrdinal("NOMBRE_USUARIO")) ? "" : reader.GetString(reader.GetOrdinal("NOMBRE_USUARIO")),
                            Perfil_Usuario = reader.IsDBNull(reader.GetOrdinal("PERFIL_USUARIO")) ? "" : reader.GetString(reader.GetOrdinal("PERFIL_USUARIO")),
                            UsuarioRegistra = reader.IsDBNull(reader.GetOrdinal("USR_REG")) ? "" : reader.GetString(reader.GetOrdinal("USR_REG")),
                            Fecha_Registro = reader.IsDBNull(reader.GetOrdinal("FEC_REG")) ? "" : reader.GetString(reader.GetOrdinal("FEC_REG"))
                        };
                        _listaObservaciones.Add(observacion);
                    };

                    reader.NextResult();

                    List<WorkflowLogDTO> _listaSeguimiento = new List<WorkflowLogDTO>();

                    while (reader.Read())
                    {
                        var seguimiento = new WorkflowLogDTO()
                        {
                            CodigoWorkflowLog = reader.IsDBNull(reader.GetOrdinal("ID")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID")),
                            CodigoWorkflow = reader.IsDBNull(reader.GetOrdinal("ID_WORKFLOW")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_WORKFLOW")),
                            CodigoEstado = reader.IsDBNull(reader.GetOrdinal("COD_ESTADO")) ? "" : reader.GetString(reader.GetOrdinal("COD_ESTADO")),
                            DescripcionEstado = reader.IsDBNull(reader.GetOrdinal("DES_ESTADO")) ? "" : reader.GetString(reader.GetOrdinal("DES_ESTADO")),
                            Cargo = reader.IsDBNull(reader.GetOrdinal("CARGO")) ? "" : reader.GetString(reader.GetOrdinal("CARGO")),
                            Area = reader.IsDBNull(reader.GetOrdinal("AREA")) ? "" : reader.GetString(reader.GetOrdinal("AREA")),
                            UsuarioRegistro = reader.IsDBNull(reader.GetOrdinal("USR_REG")) ? "" : reader.GetString(reader.GetOrdinal("USR_REG")),
                            NombreUsuarioRegistro = reader.IsDBNull(reader.GetOrdinal("NOMBREUSRREGISTRO")) ? "" : reader.GetString(reader.GetOrdinal("NOMBREUSRREGISTRO")),
                            FechaRegistro = reader.IsDBNull(reader.GetOrdinal("FECREG")) ? "" : reader.GetString(reader.GetOrdinal("FECREG")),
                            HoraRegistro = reader.IsDBNull(reader.GetOrdinal("HORAREG")) ? "" : reader.GetString(reader.GetOrdinal("HORAREG")),
                        };
                        _listaSeguimiento.Add(seguimiento);
                    };
                    result.Solicitud = solicitud;
                    result.Adjuntos = _listaAdjuntos;
                    result.Observaciones = _listaObservaciones;
                    result.Seguimiento = _listaSeguimiento;
                };
                return result;
            };
        }

        public FiltroGrupoSolicitudVentaDTO GrupoSolicitudVentaFiltro()
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionSingle())
            {
                SqlCommand sqlcommand;
                var result = new FiltroGrupoSolicitudVentaDTO();
                string query = "USP_FILTROS_SOLICITUD_VENTAS";
                connection.Open();
                sqlcommand = new SqlCommand(query, connection);
                using (var reader = sqlcommand.ExecuteReader())
                {
                    List<ComboDTO> _flujos = new List<ComboDTO>();
                    while (reader.Read()) 
                    {
                        var flujo = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("CODSOL")) ? "" : reader.GetString(reader.GetOrdinal("CODSOL")),
                            Text = reader.IsDBNull(reader.GetOrdinal("FLUJOSOL")) ? "" : reader.GetString(reader.GetOrdinal("FLUJOSOL"))
                        };
                        _flujos.Add(flujo);
                    };

                    reader.NextResult();

                    List<ComboDTO> _tipoSol = new List<ComboDTO>();
                    while (reader.Read())
                    {
                        var tipSol = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("CODTIPOSOL")) ? "" : reader.GetString(reader.GetOrdinal("CODTIPOSOL")),
                            Text = reader.IsDBNull(reader.GetOrdinal("TIPOSOL")) ? "" : reader.GetString(reader.GetOrdinal("TIPOSOL"))
                        };
                        _tipoSol.Add(tipSol);
                    };

                    reader.NextResult();
                    List<ComboDTO> _medioContacto = new List<ComboDTO>();
                    while (reader.Read())
                    {
                        var medContacto = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("CODMED")) ? "" : reader.GetString(reader.GetOrdinal("CODMED")),
                            Text = reader.IsDBNull(reader.GetOrdinal("MEDIOCONTACT")) ? "" : reader.GetString(reader.GetOrdinal("MEDIOCONTACT"))
                        };
                        _medioContacto.Add(medContacto);
                    };

                    reader.NextResult();
                    List<ComboDTO> _tipMoneda = new List<ComboDTO>();
                    while (reader.Read())
                    {
                        var tipMoneda = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("CODMONEDA")) ? "" : reader.GetString(reader.GetOrdinal("CODMONEDA")),
                            Text = reader.IsDBNull(reader.GetOrdinal("MONEDA")) ? "" : reader.GetString(reader.GetOrdinal("MONEDA"))
                        };
                        _tipMoneda.Add(tipMoneda);
                    };

                    reader.NextResult();
                    List<ComboDTO> _garantias = new List<ComboDTO>();
                    while (reader.Read()) 
                    {
                        var garantia = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("CODGARANTIA")) ? "" : reader.GetString(reader.GetOrdinal("CODGARANTIA")),
                            Text = reader.IsDBNull(reader.GetOrdinal("NOMGARANTIA")) ? "" : reader.GetString(reader.GetOrdinal("NOMGARANTIA"))
                        };
                        _garantias.Add(garantia);
                    };

                    reader.NextResult();
                    List<ComboDTO> _formPago = new List<ComboDTO>();
                    while (reader.Read())
                    {
                        var pago = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("CODPAGO")) ? "" : reader.GetString(reader.GetOrdinal("CODPAGO")),
                            Text = reader.IsDBNull(reader.GetOrdinal("NOMPAGO")) ? "" : reader.GetString(reader.GetOrdinal("NOMPAGO"))
                        };
                        _formPago.Add(pago);
                    };

                    result.Flujos = _flujos;
                    result.TipoSol = _tipoSol;
                    result.MedioContacto = _medioContacto;
                    result.TipoMoneda = _tipMoneda;
                    result.Garantias = _garantias;
                    result.FormPago = _formPago;
                };
                return result;
            };
        }

    }
}
