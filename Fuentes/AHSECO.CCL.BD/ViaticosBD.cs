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
    public class ViaticosBD
    {
        CCLog Log;

        public ViaticosBD() : this(new CCLog())
        {
        }

        public ViaticosBD(CCLog cclog)
        {
            Log = cclog;
        }

        public IEnumerable<ViaticosDTO> ListarViaticos(FiltroViaticosDTO filtroViaticosDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("COD_VIATICO", filtroViaticosDTO.CodigoViatico);
                parameters.Add("COD_EMPRESA", filtroViaticosDTO.CodigoEmpresa);
                parameters.Add("FECVIATICOINI", filtroViaticosDTO.FechaViaticoInicio);
                parameters.Add("FECVIATICOFIN", filtroViaticosDTO.FechaViaticoFinal);
                parameters.Add("CODCARGO", filtroViaticosDTO.CodigoCargo);
                parameters.Add("CODENCARGADO", filtroViaticosDTO.CodigoEncargado);
                parameters.Add("CODAREA", filtroViaticosDTO.CodigoArea);
                parameters.Add("UBIGEO", filtroViaticosDTO.CodigoUbigeo);
                parameters.Add("ESTADO", filtroViaticosDTO.CodigoEstado);
                parameters.Add("USRREG", filtroViaticosDTO.UsuarioRegistro);
                parameters.Add("CODAREA_USUARIO", filtroViaticosDTO.CodigoAreaUsuario);

                var result = connection.Query(
                     sql: "USP_SEL_VIATICOS",
                     param: parameters,
                     commandType: CommandType.StoredProcedure)
                     .Select(s => s as IDictionary<string, object>)
                     .Select(i => new ViaticosDTO
                     {
                         CodigoViatico = i.Single(d => d.Key.Equals("COD_VIATICO")).Value.Parse<int>(),
                         CodigoWorkflow = i.Single(d => d.Key.Equals("ID_WORKFLOW")).Value.Parse<long>(),
                         Empresa = new DatosGeneralesDetalleDTO
                         {
                             CodValor1 = i.Single(d => d.Key.Equals("COD_EMPRESA")).Value.Parse<string>(),
                             Valor1 = i.Single(d => d.Key.Equals("NOM_EMPRESA")).Value.Parse<string>(),
                             Valor2 = i.Single(d => d.Key.Equals("RUC_EMPRESA")).Value.Parse<string>()
                         },
                         FechaViatico = i.Single(d => d.Key.Equals("FECHAVIATICO")).Value.Parse<DateTime>(),
                         Cargo = new CargoDTO
                         {
                             CodigoCargo = i.Single(d => d.Key.Equals("COD_CARGO")).Value.Parse<int>(),
                             NombreCargo = i.Single(d => d.Key.Equals("NOMBRECARGO")).Value.Parse<string>()
                         },
                         Encargado = new EmpleadoDTO
                         {
                             CodigoEmpleado = i.Single(d => d.Key.Equals("COD_ENCARGADO")).Value.Parse<int>(),
                             NombresEmpleado = i.Single(d => d.Key.Equals("NOM_ENCARGADO")).Value.Parse<string>(),
                             ApellidoPaternoEmpleado = i.Single(d => d.Key.Equals("APEPAT_ENCARGADO")).Value.Parse<string>(),
                             ApellidoMaternoEmpleado = i.Single(d => d.Key.Equals("APEMAT_ENCARGADO")).Value.Parse<string>(),
                             NombresCompletosEmpleado = i.Single(d => d.Key.Equals("NOMBRECOMPLETO_ENCARGADO")).Value.Parse<string>()
                         },
                         Area = new AreaDTO
                         {
                             CodigoArea = i.Single(d => d.Key.Equals("COD_AREA")).Value.Parse<int>(),
                             NombreArea = i.Single(d => d.Key.Equals("NOMBREAREA")).Value.Parse<string>()
                         },
                         Ubigeo = i.Single(d => d.Key.Equals("UBIGEO")).Value.Parse<string>(),
                         DiasViaje = i.Single(d => d.Key.Equals("DIAS_VIAJE")).Value.Parse<string>(),
                         Autorizado = i.Single(d => d.Key.Equals("AUTORIZADO")).Value.Parse<string>(),
                         Anulado = i.Single(d => d.Key.Equals("ANULADO")).Value.Parse<string>(),
                         Abonado = i.Single(d => d.Key.Equals("ABONADO")).Value.Parse<string>(),
                         Observacion = i.Single(d => d.Key.Equals("OBSERVACION")).Value.Parse<string>(),
                         FechaAbonado = i.Single(d => d.Key.Equals("FEC_ABO")).Value.Parse<string>(),
                         Estado = new ProcesoEstadoDTO
                         {
                             CodigoEstado = i.Single(d => d.Key.Equals("ESTADO")).Value.Parse<string>(),
                             AbreviaturaEstado = i.Single(d => d.Key.Equals("NOMESTADO")).Value.Parse<string>()
                         },
                         UsuarioRegistra = i.Single(d => d.Key.Equals("USR_REG")).Value.Parse<string>(),
                         FechaRegistro = i.Single(d => d.Key.Equals("FEC_REG")).Value.Parse<DateTime>(),
                     });

                return result;
            }
        }


        public RespuestaDTO MantenimientoDetalleViaticos(ViaticosDetalleDTO viaticosDetalleDTO)
        {
            var rpta = new RespuestaDTO();
            Log.TraceInfo(Utilidades.GetCaller());
    
                    
            using (var connection = Factory.ConnectionFactory())
            {
                        connection.Open();

                        var parameters = new DynamicParameters();
                        parameters.Add("ACCION", viaticosDetalleDTO.Accion);
                        parameters.Add("ID", viaticosDetalleDTO.CodigoDetalleViatico);
                        parameters.Add("COD_VIATICO", viaticosDetalleDTO.CodigoViatico);
                        parameters.Add("COD_TIPO", viaticosDetalleDTO.CodigoTipo);
                        parameters.Add("TIPO", viaticosDetalleDTO.Tipo == null ? "": viaticosDetalleDTO.Tipo);
                        parameters.Add("CONCEPTO", viaticosDetalleDTO.Concepto == null ? "": viaticosDetalleDTO.Concepto);
                        parameters.Add("DETALLE", viaticosDetalleDTO.Detalle == null ? "" : viaticosDetalleDTO.Detalle);
                        parameters.Add("CANTIDAD", viaticosDetalleDTO.Cantidad);
                        parameters.Add("VALORUNITARIO", viaticosDetalleDTO.ValorUnitario);
                        parameters.Add("MONTO", viaticosDetalleDTO.Monto);
                        parameters.Add("ESTADO", viaticosDetalleDTO.Estado);
                        parameters.Add("USR_REG", viaticosDetalleDTO.UsuarioRegistra);
                        parameters.Add("MONTO", viaticosDetalleDTO.Monto);

                        var result = connection.Query
                        (
                            sql: "USP_MANT_DETALLE_VIATICO",
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

        public RespuestaDTO MantenimientoCabeceraViaticos(ViaticosDTO viaticosDTO)
        {
            var rpta = new RespuestaDTO();
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
               connection.Open();
               var parameters = new DynamicParameters();
                        parameters.Add("ACCION", viaticosDTO.Accion);
                        parameters.Add("COD_VIATICO", viaticosDTO.CodigoViatico);
                        parameters.Add("ID_WORKFLOW", viaticosDTO.CodigoWorkflow);
                        parameters.Add("COD_EMPRESA", viaticosDTO.CodigoEmpresa);
                        parameters.Add("FECHAVIATICO", viaticosDTO.FechaViatico);
                        parameters.Add("COD_ENCARGADO", viaticosDTO.CodigoEncargado);
                        parameters.Add("COD_CARGO", viaticosDTO.CodigoCargo);
                        parameters.Add("MOTIVO", viaticosDTO.Motivo);
                        parameters.Add("COD_AREA", viaticosDTO.CodigoArea);
                        parameters.Add("UBIGEO", viaticosDTO.CodigoUbigeo);
                        parameters.Add("CLIENTE", viaticosDTO.Cliente);
                        parameters.Add("DIAS_VIAJE", viaticosDTO.DiasViaje);
                        parameters.Add("AUTORIZADO", viaticosDTO.Autorizado);
                        parameters.Add("ANULADO", viaticosDTO.Anulado);
                        parameters.Add("ABONADO", viaticosDTO.Abonado);
                        parameters.Add("OBSERVACION", viaticosDTO.Observacion);
                        parameters.Add("ESTADO", viaticosDTO.CodigoEstado);
                        parameters.Add("USR_REG", viaticosDTO.UsuarioRegistra);
                var result = connection.Query
                      (
                          sql: "USP_MANT_MAIN_VIATICO",
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

        public RespuestaDTO ValidarViaticos(string codigos)
        {
            var rpta = new RespuestaDTO();
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("CODIGOS", codigos);
                var result = connection.Query
                      (
                          sql: "USP_VALIDA_VIATICOS",
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



        public FiltroGrupoViaticosDTO GrupoFiltrosViaticos(string nombreRol, int codArea)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionSingle())
            {
               
                var parameters = new DynamicParameters();
                parameters.Add("NOMBREROL", nombreRol);
                parameters.Add("CODAREA", codArea);
                SqlCommand command;
                var result = new FiltroGrupoViaticosDTO();
                string query = "exec USP_FILTROS_VIATICOS @NOMBREROL='"+ nombreRol + "',@CODAREA="+codArea.ToString();
                connection.Open();
                command = new SqlCommand(query,connection);


                using (var reader = command.ExecuteReader())
                {
                    List<ComboDTO> _listaEmpresas = new List<ComboDTO>();

                    while (reader.Read())
                    {
                        var empresa = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("Codigo")) ? "" : reader.GetString(reader.GetOrdinal("Codigo")),
                            Text = reader.IsDBNull(reader.GetOrdinal("Valor")) ? "" : reader.GetString(reader.GetOrdinal("Valor"))
                        };
                        _listaEmpresas.Add(empresa);
                    }
                    reader.NextResult();

                    List<ComboDTO> _listaAreas = new List<ComboDTO>();

                    while (reader.Read())
                    {
                        var area = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("ID_AREA")) ? "0" : reader.GetString(reader.GetOrdinal("ID_AREA")),
                            Text = reader.IsDBNull(reader.GetOrdinal("NOMBREAREA")) ? "" : reader.GetString(reader.GetOrdinal("NOMBREAREA"))
                        };
                        _listaAreas.Add(area);
                    }

                    reader.NextResult();

                    List<ComboDTO> _listaEstados = new List<ComboDTO>();

                    while (reader.Read())
                    {
                        var estado = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("COD_ESTADO")) ? "" : reader.GetString(reader.GetOrdinal("COD_ESTADO")),
                            Text = reader.IsDBNull(reader.GetOrdinal("ABREV_ESTADO")) ? "" : reader.GetString(reader.GetOrdinal("ABREV_ESTADO"))
                        };
                        _listaEstados.Add(estado);
                    }

                    reader.NextResult();

                    List<ComboDTO> _listaCargos = new List<ComboDTO>();

                    while (reader.Read())
                    {
                        var cargo = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("ID_CARGO")) ? "" : reader.GetString(reader.GetOrdinal("ID_CARGO")),
                            Text = reader.IsDBNull(reader.GetOrdinal("NOMBRECARGO")) ? "" : reader.GetString(reader.GetOrdinal("NOMBRECARGO"))
                        };
                        _listaCargos.Add(cargo);
                    }

                    reader.NextResult();

                    List<ComboDTO> _listaEncargados = new List<ComboDTO>();

                    while (reader.Read())
                    {
                        var encargado = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("ID_EMPLEADO")) ? "" : reader.GetString(reader.GetOrdinal("ID_EMPLEADO")),
                            Text = reader.IsDBNull(reader.GetOrdinal("NOMBREENCARGADO")) ? "" : reader.GetString(reader.GetOrdinal("NOMBREENCARGADO"))
                        };
                        _listaEncargados.Add(encargado);
                    }

                    result.Empresas = _listaEmpresas;
                    result.Areas = _listaAreas;
                    result.Estados = _listaEstados;
                    result.Cargos = _listaCargos;
                    result.Encargados =_listaEncargados;

                }

                return result;

            }
        }


        public IEnumerable<CargoDTO> ObtenerCargosxAreaViaticos(int codigoArea)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();

                var parameters = new DynamicParameters();
                parameters.Add("codArea", codigoArea);
                var result = connection.Query
                (
                    sql: "USP_SEL_CARGOS_VIATICOS",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new CargoDTO
                    {
                        CodigoCargo = i.Single(d => d.Key.Equals("ID_CARGO")).Value.Parse<int>(),
                        NombreCargo = i.Single(d => d.Key.Equals("NOMBRECARGO")).Value.Parse<string>(),
                        Area = new AreaDTO
                        {
                            CodigoArea = i.Single(d => d.Key.Equals("ID_AREA")).Value.Parse<int>(),
                            NombreArea = i.Single(d => d.Key.Equals("NOMBREAREA")).Value.Parse<string>()
                        },
                        Estado = i.Single(d => d.Key.Equals("ESTADO")).Value.Parse<int>(),
                        UsuarioRegistra = i.Single(d => d.Key.Equals("USR_REG")).Value.Parse<string>(),
                        FechaRegistroFormat = i.Single(d => d.Key.Equals("FEC_REG")).Value.Parse<string>()
                    });
                return result;
            }
        }


        public ViaticosGrupalDTO VerViaticos(int codViatico)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionSingle())
            {

                var parameters = new DynamicParameters();
                parameters.Add("COD_VIATICO", codViatico);
                SqlCommand command;
                var result = new ViaticosGrupalDTO();
                string query = "exec USP_CONSULTA_VIATICO @COD_VIATICO ="+ codViatico.ToString();
                connection.Open();
                command = new SqlCommand(query, connection);


                using (var reader = command.ExecuteReader())
                {
                    reader.Read();
                    ViaticosDTO _viaticoCabecera = new ViaticosDTO
                    { 
                        CodigoViatico = reader.IsDBNull(reader.GetOrdinal("COD_VIATICO")) ? 0 : reader.GetInt32(reader.GetOrdinal("COD_VIATICO")),
                        CodigoWorkflow = reader.IsDBNull(reader.GetOrdinal("ID_WORKFLOW")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_WORKFLOW")),
                        CodigoEmpresa = reader.IsDBNull(reader.GetOrdinal("COD_EMPRESA")) ? "" : reader.GetString(reader.GetOrdinal("COD_EMPRESA")),
                        FechaViatico = reader.GetDateTime(reader.GetOrdinal("FECHAVIATICO")),
                        CodigoEncargado = reader.IsDBNull(reader.GetOrdinal("COD_ENCARGADO")) ? 0 : reader.GetInt32(reader.GetOrdinal("COD_ENCARGADO")),
                        CodigoCargo = reader.IsDBNull(reader.GetOrdinal("COD_CARGO")) ? 0 : reader.GetInt32(reader.GetOrdinal("COD_CARGO")),
                        Motivo = reader.IsDBNull(reader.GetOrdinal("MOTIVO")) ? "" : reader.GetString(reader.GetOrdinal("MOTIVO")),
                        CodigoArea = reader.IsDBNull(reader.GetOrdinal("COD_AREA")) ? 0 : reader.GetInt32(reader.GetOrdinal("COD_AREA")),
                        CodigoUbigeo = reader.IsDBNull(reader.GetOrdinal("UBIGEO")) ? "" : reader.GetString(reader.GetOrdinal("UBIGEO")),
                        NombreUbigeo = reader.IsDBNull(reader.GetOrdinal("NOMUBIGEO")) ? "" : reader.GetString(reader.GetOrdinal("NOMUBIGEO")),
                        Cliente = reader.IsDBNull(reader.GetOrdinal("CLIENTE")) ? "" : reader.GetString(reader.GetOrdinal("CLIENTE")),
                        DiasViaje = reader.IsDBNull(reader.GetOrdinal("DIAS_VIAJE")) ? "" : reader.GetString(reader.GetOrdinal("DIAS_VIAJE")),
                        Observacion = reader.IsDBNull(reader.GetOrdinal("OBSERVACION")) ? "" : reader.GetString(reader.GetOrdinal("OBSERVACION")),
                        CodigoEstado = reader.IsDBNull(reader.GetOrdinal("ESTADO")) ? "" : reader.GetString(reader.GetOrdinal("ESTADO")),
                        NombreEstado = reader.IsDBNull(reader.GetOrdinal("NOMESTADO")) ? "" : reader.GetString(reader.GetOrdinal("NOMESTADO")),
                        NombreEmpresa = reader.IsDBNull(reader.GetOrdinal("NOMEMPRESA")) ? "" : reader.GetString(reader.GetOrdinal("NOMEMPRESA")),
                        FechaViaticoFormat = reader.IsDBNull(reader.GetOrdinal("FECVIATICOFORMAT")) ? "" : reader.GetString(reader.GetOrdinal("FECVIATICOFORMAT")),
                        NombreEncargado = reader.IsDBNull(reader.GetOrdinal("NOMBREENCARGADO")) ? "" : reader.GetString(reader.GetOrdinal("NOMBREENCARGADO")),
                        NombreArea = reader.IsDBNull(reader.GetOrdinal("NOMBREAREA")) ? "" : reader.GetString(reader.GetOrdinal("NOMBREAREA")),
                        NombreCargo = reader.IsDBNull(reader.GetOrdinal("NOMBRECARGO")) ? "" : reader.GetString(reader.GetOrdinal("NOMBRECARGO")),
                        FechaAbonado = reader.IsDBNull(reader.GetOrdinal("FEC_ABO")) ? "" : reader.GetString(reader.GetOrdinal("FEC_ABO")),
                        Anulado = reader.IsDBNull(reader.GetOrdinal("ANULADO")) ? "" : reader.GetString(reader.GetOrdinal("ANULADO")),
                        CodigoTipoDocumento = reader.IsDBNull(reader.GetOrdinal("CODTIPODOCUMENTO")) ? "" : reader.GetString(reader.GetOrdinal("CODTIPODOCUMENTO")),
                        TipoDocumento = reader.IsDBNull(reader.GetOrdinal("NOMTIPODOCUMENTO")) ? "" : reader.GetString(reader.GetOrdinal("NOMTIPODOCUMENTO")),
                        NumeroDocumento = reader.IsDBNull(reader.GetOrdinal("NRODOCUMENTO")) ? "" : reader.GetString(reader.GetOrdinal("NRODOCUMENTO")),
                    };

                    reader.NextResult();

                    List<ViaticosDetalleDTO> _listaViaticosDetalle = new List<ViaticosDetalleDTO>();

                    while (reader.Read())
                    {
                        var viatico = new ViaticosDetalleDTO()
                        {
                            CodigoDetalleViatico = reader.IsDBNull(reader.GetOrdinal("ID")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID")),
                            CodigoViatico = reader.IsDBNull(reader.GetOrdinal("COD_VIATICO")) ? 0 : reader.GetInt32(reader.GetOrdinal("COD_VIATICO")),
                            CodigoTipo = reader.IsDBNull(reader.GetOrdinal("COD_TIPO")) ? "" : reader.GetString(reader.GetOrdinal("COD_TIPO")),
                            DescripcionTipo = reader.IsDBNull(reader.GetOrdinal("DESTIPO")) ? "" : reader.GetString(reader.GetOrdinal("DESTIPO")),
                            Tipo = reader.IsDBNull(reader.GetOrdinal("TIPO")) ? "" : reader.GetString(reader.GetOrdinal("TIPO")),
                            Concepto = reader.IsDBNull(reader.GetOrdinal("CONCEPTO")) ? "" : reader.GetString(reader.GetOrdinal("CONCEPTO")),
                            Detalle = reader.IsDBNull(reader.GetOrdinal("DETALLE")) ? "" : reader.GetString(reader.GetOrdinal("DETALLE")),
                            Cantidad = reader.IsDBNull(reader.GetOrdinal("CANTIDAD")) ? 0 : reader.GetInt32(reader.GetOrdinal("CANTIDAD")),
                            ValorUnitario = reader.IsDBNull(reader.GetOrdinal("VALORUNITARIO")) ? 0 : reader.GetDecimal(reader.GetOrdinal("VALORUNITARIO")),
                            Monto = reader.IsDBNull(reader.GetOrdinal("MONTO")) ? 0 : reader.GetDecimal(reader.GetOrdinal("MONTO")),
                        };
                        _listaViaticosDetalle.Add(viatico);
                    }

                    reader.NextResult();

                    List<WorkflowLogDTO> _listaSeguimiento = new List<WorkflowLogDTO>();

                    while (reader.Read())
                    {
                        var seguimiento = new WorkflowLogDTO()
                        {
                            DescripcionEstado = reader.IsDBNull(reader.GetOrdinal("NOMESTADO")) ? "" : reader.GetString(reader.GetOrdinal("NOMESTADO")),
                            Cargo = reader.IsDBNull(reader.GetOrdinal("CARGO")) ? "" : reader.GetString(reader.GetOrdinal("CARGO")),
                            Area = reader.IsDBNull(reader.GetOrdinal("AREA")) ? "" : reader.GetString(reader.GetOrdinal("AREA")),
                            NombreUsuarioRegistro = reader.IsDBNull(reader.GetOrdinal("NOMUSUARIO")) ? "" : reader.GetString(reader.GetOrdinal("NOMUSUARIO")),
                            FechaRegistro = reader.IsDBNull(reader.GetOrdinal("FECREG")) ? "" : reader.GetString(reader.GetOrdinal("FECREG")),
                            HoraRegistro = reader.IsDBNull(reader.GetOrdinal("HORAREG")) ? "" : reader.GetString(reader.GetOrdinal("HORAREG"))
                        };
                        _listaSeguimiento.Add(seguimiento);
                    }

                    reader.NextResult();

                    List<DocumentoDTO> _listaAdjuntos = new List<DocumentoDTO>();

                    while (reader.Read())
                    {
                        var adjunto = new DocumentoDTO()
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
                            UsuarioRegistra = reader.IsDBNull(reader.GetOrdinal("USR_REG")) ? "" : reader.GetString(reader.GetOrdinal("USR_REG")),
                            FechaRegistroFormat = reader.IsDBNull(reader.GetOrdinal("FEC_REG")) ? "" : reader.GetString(reader.GetOrdinal("FEC_REG")),
                        };
                        _listaAdjuntos.Add(adjunto);
                    }



                    result.CabeceraViatico= _viaticoCabecera;
                    result.DetallesViatico = _listaViaticosDetalle;
                    result.Seguimiento = _listaSeguimiento;
                    result.Adjuntos = _listaAdjuntos;

                }

                return result;

            }
        }
    }
}
