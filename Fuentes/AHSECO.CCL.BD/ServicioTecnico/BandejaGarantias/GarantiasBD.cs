using AHSECO.CCL.BE.Ventas;
using AHSECO.CCL.BE;
using AHSECO.CCL.COMUN;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AHSECO.CCL.BE.ServicioTecnico.BandejaInstalacionTecnica;
using AHSECO.CCL.BE.ServicioTecnico.BandejaGarantias;
using System.Configuration;
using AHSECO.CCL.BE.Mantenimiento;
using System.Globalization;


namespace AHSECO.CCL.BD.ServicioTecnico.BandejaGarantias
{
    public class GarantiasBD
    {
        CCLog Log;

        public GarantiasBD() : this(new CCLog())
        {

        }

        public GarantiasBD(CCLog cclog)
        {
            Log = cclog;
        }

        public FiltroGarantiasDTO ObtenerFiltrosGarantias()
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionSingle())
            {
                SqlCommand command;
                var result = new FiltroGarantiasDTO();
                string query = "EXEC [USP_GAR_SEL_FILTROS]";
                connection.Open();
                command = new SqlCommand(query, connection);

                using (var reader = command.ExecuteReader())
                {
                    List<ComboDTO> _listEmpresa = new List<ComboDTO>();
                    while (reader.Read())
                    {
                        var empresa = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("CODEMPRESA")) ? "" : reader.GetString(reader.GetOrdinal("CODEMPRESA")),
                            Text = reader.IsDBNull(reader.GetOrdinal("RAZONSOCIAL")) ? "" : reader.GetString(reader.GetOrdinal("RAZONSOCIAL"))
                        };
                        _listEmpresa.Add(empresa);
                    }
                    reader.NextResult();

                    List<ComboDTO> _Estados = new List<ComboDTO>();
                    while (reader.Read())
                    {
                        var estado = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("Codigo")) ? "" : reader.GetString(reader.GetOrdinal("Codigo")),
                            Text = reader.IsDBNull(reader.GetOrdinal("Abrev")) ? "" : reader.GetString(reader.GetOrdinal("Abrev"))
                        };

                        _Estados.Add(estado);
                    }
                    reader.NextResult();

                    List<ComboDTO> _Clientes = new List<ComboDTO>();
                    while (reader.Read())
                    {
                        var cliente = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("ID")) ? "" : reader.GetString(reader.GetOrdinal("ID")),
                            Text = reader.IsDBNull(reader.GetOrdinal("NOMEMPRESA")) ? "" : reader.GetString(reader.GetOrdinal("NOMEMPRESA"))
                        };

                        _Clientes.Add(cliente);
                    }

                    reader.NextResult();

                    List<ComboDTO> _tiposVenta = new List<ComboDTO>();
                    while (reader.Read())
                    {
                        var cliente = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("CODVENTA")) ? "" : reader.GetString(reader.GetOrdinal("CODVENTA")),
                            Text = reader.IsDBNull(reader.GetOrdinal("DESCVENTA")) ? "" : reader.GetString(reader.GetOrdinal("DESCVENTA"))
                        };

                        _tiposVenta.Add(cliente);
                    }
                    reader.NextResult();
                    List<ComboDTO> _tipoEmpleado = new List<ComboDTO>();
                    while (reader.Read())
                    {
                        var tipEmpleado = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("CODTIPO")) ? "" : reader.GetString(reader.GetOrdinal("CODTIPO")),
                            Text = reader.IsDBNull(reader.GetOrdinal("DESCTIPO")) ? "" : reader.GetString(reader.GetOrdinal("DESCTIPO"))
                        };
                        _tipoEmpleado.Add(tipEmpleado);
                    }

                    reader.NextResult();
                    List<ComboDTO> _periodos = new List<ComboDTO>();
                    while (reader.Read())
                    {
                        var periodo = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("COD")) ? "" : reader.GetString(reader.GetOrdinal("COD")),
                            Text = reader.IsDBNull(reader.GetOrdinal("DESCRIPCION")) ? "" : reader.GetString(reader.GetOrdinal("DESCRIPCION"))
                        };
                        _periodos.Add(periodo);
                    }

                    reader.NextResult();
                    List<ComboDTO> _garantias = new List<ComboDTO>();
                    while (reader.Read())
                    {
                        var garantia = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("CODGARANTIA")) ? "" : reader.GetString(reader.GetOrdinal("CODGARANTIA")),
                            Text = reader.IsDBNull(reader.GetOrdinal("DESCGARANTIA")) ? "" : reader.GetString(reader.GetOrdinal("DESCGARANTIA"))
                        };
                        _garantias.Add(garantia);
                    }

                    reader.NextResult();
                    List<ComboDTO> _urgencias = new List<ComboDTO>();
                    while (reader.Read())
                    {
                        var urgencia = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("CODURGENCIA")) ? "" : reader.GetString(reader.GetOrdinal("CODURGENCIA")),
                            Text = reader.IsDBNull(reader.GetOrdinal("DESCURGENCIA")) ? "" : reader.GetString(reader.GetOrdinal("DESCURGENCIA"))
                        };
                        _urgencias.Add(urgencia);
                    }

                    reader.NextResult();
                    List<ComboDTO> _motivos = new List<ComboDTO>();
                    while (reader.Read())
                    {
                        var motivo = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("CODMOTIVO")) ? "" : reader.GetString(reader.GetOrdinal("CODMOTIVO")),
                            Text = reader.IsDBNull(reader.GetOrdinal("DESCMOTIVO")) ? "" : reader.GetString(reader.GetOrdinal("DESCMOTIVO"))
                        };
                        _motivos.Add(motivo);
                    };

                    result.Periodos = _periodos;
                    result.Empresas = _listEmpresa;
                    result.Estados = _Estados;
                    result.Clientes = _Clientes;
                    result.TipVenta = _tiposVenta;
                    result.TipoEmpleado = _tipoEmpleado;
                    result.Garantias = _garantias;
                    result.Motivos = _motivos;
                    result.Urgencia = _urgencias;

                    connection.Close();
                    return result;
                };
            };
        }

        public IEnumerable<ReclamosDTO> ObtenerReclamos(FiltroReclamosDTO filtros)
        {
            using(var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();

                parameters.Add("", filtros.FecIni);
                parameters.Add("", filtros.FecFin);
                parameters.Add("", filtros.NumReclamo);
                parameters.Add("", filtros.NumFianza);
                parameters.Add("", filtros.FecIni);
                parameters.Add("", filtros.FecIni);
                parameters.Add("", filtros.FecIni);
                parameters.Add("", filtros.FecIni);
                parameters.Add("", filtros.FecIni);
                parameters.Add("", filtros.FecIni);
                parameters.Add("", filtros.FecIni);

                var result = connection.Query(
                    sql: "",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new ReclamosDTO()
                    {

                    });
                connection.Close();
                return result;
            }
        }

        public RespuestaDTO MantReclamo(ReclamosDTO reclamo)
        {
            using(var connection = Factory.ConnectionFactory())
            {
                var parameters = new DynamicParameters();
                connection.Open();

                parameters.Add("", reclamo.CargoContacto);

                var result = connection.Query(
                    sql: "SMTH",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new RespuestaDTO
                    {

                    }).FirstOrDefault();

                connection.Close();

                return result;
            }
        }

        public RespuestaDTO MantTecnicosReclamo(TecnicoGarantiaDTO tecnico)
        {
            using (var connection = Factory.ConnectionFactory())
            {
                var parameters = new DynamicParameters();
                connection.Open();

                parameters.Add("", tecnico.Cod_Tecnico);

                var result = connection.Query(
                    sql: "SMTH",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new RespuestaDTO
                    {

                    }).FirstOrDefault();

                connection.Close();

                return result;
            }
        }

        public RespuestaDTO MantenimientoObservaciones(ObservacionDTO observacionDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
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

        public GrupoGarantiasDTO ObtenerDatosEquipo(string NumSerie)
        {
            var result = new GrupoGarantiasDTO();
            result.CodRpta = 0;
            Log.TraceInfo(Utilidades.GetCaller());
            using(var connection = Factory.ConnectionSingle())
            {
                SqlCommand cmd;
                string query = "EXEC [USP_GAR_SEL_NUM_SERIE] @IsNumSerie='" + NumSerie+"'";
                connection.Open();
                cmd = new SqlCommand(query, connection);

                using (var reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        SolicitudDTO cabecera = new SolicitudDTO()
                        {
                            Id_Solicitud = reader.IsDBNull(reader.GetOrdinal("ID_SOLICITUD")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_SOLICITUD")),
                            Id_WorkFlow = reader.IsDBNull(reader.GetOrdinal("ID_WORKFLOW")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_WORKFLOW")),
                            Nom_Empresa = reader.IsDBNull(reader.GetOrdinal("EMPRESA")) ? "" : reader.GetString(reader.GetOrdinal("EMPRESA")),
                            Cod_Empresa = reader.IsDBNull(reader.GetOrdinal("CODEMPRESA")) ? "" : reader.GetString(reader.GetOrdinal("CODEMPRESA")),
                            IdCliente = reader.IsDBNull(reader.GetOrdinal("IDCLIENTE")) ? 0 : reader.GetInt32(reader.GetOrdinal("IDCLIENTE")),
                            RUC = reader.IsDBNull(reader.GetOrdinal("RUC")) ? "" : reader.GetString(reader.GetOrdinal("RUC")),
                            RazonSocial = reader.IsDBNull(reader.GetOrdinal("RAZONSOCIAL")) ? "" : reader.GetString(reader.GetOrdinal("RAZONSOCIAL")),
                            Ubigeo = reader.IsDBNull(reader.GetOrdinal("UBIGEO")) ? "" : reader.GetString(reader.GetOrdinal("UBIGEO")),
                            AsesorVenta = reader.IsDBNull(reader.GetOrdinal("ASESORVENTA")) ? "" : reader.GetString(reader.GetOrdinal("ASESORVENTA")),
                            TipoVenta = reader.IsDBNull(reader.GetOrdinal("TIPOVENTA")) ? "" : reader.GetString(reader.GetOrdinal("TIPOVENTA")),
                            NombreTipoVenta = reader.IsDBNull(reader.GetOrdinal("TIPO")) ? "" : reader.GetString(reader.GetOrdinal("TIPO")),
                            Fecha_Sol = reader.IsDBNull(reader.GetOrdinal("FECHA_SOL")) ? "" : reader.GetString(reader.GetOrdinal("FECHA_SOL")),
                            Estado = reader.IsDBNull(reader.GetOrdinal("ESTADO")) ? "" : reader.GetString(reader.GetOrdinal("ESTADO")),
                            nomEstado = reader.IsDBNull(reader.GetOrdinal("NOM_ESTADO")) ? "" : reader.GetString(reader.GetOrdinal("NOM_ESTADO")),
                            TipoProceso = reader.IsDBNull(reader.GetOrdinal("TIPOPROCESO")) ? "" : reader.GetString(reader.GetOrdinal("TIPOPROCESO")),
                            NroProceso = reader.IsDBNull(reader.GetOrdinal("NROPROCESO")) ? "" : reader.GetString(reader.GetOrdinal("NROPROCESO"))
                        };
                        result.CabeceraSolicitud = cabecera;
                        result.CodRpta += 1;

                    }
                    else
                    {
                        SolicitudDTO cabecera = new SolicitudDTO();
                        result.CabeceraSolicitud = cabecera;
                    }

                    reader.NextResult();

                    if (reader.Read())
                    {
                        ContactoDTO contacto = new ContactoDTO()
                        {
                            IdContacto = reader.IsDBNull(reader.GetOrdinal("IDCONTACTO")) ? 0 : reader.GetInt32(reader.GetOrdinal("IDCONTACTO")),
                            NumDoc = reader.IsDBNull(reader.GetOrdinal("NUMDOCCONTACTO")) ? "" : reader.GetString(reader.GetOrdinal("NUMDOCCONTACTO")),
                            NomCont = reader.IsDBNull(reader.GetOrdinal("NOMBRECONTACTO")) ? "" : reader.GetString(reader.GetOrdinal("NOMBRECONTACTO")),
                            Telefono = reader.IsDBNull(reader.GetOrdinal("TELEFONOCONTACTO")) ? "" : reader.GetString(reader.GetOrdinal("TELEFONOCONTACTO")),
                            Establecimiento = reader.IsDBNull(reader.GetOrdinal("ESTABLECIMIENTO")) ? "" : reader.GetString(reader.GetOrdinal("ESTABLECIMIENTO")),
                            Cargo = reader.IsDBNull(reader.GetOrdinal("CARGOCONTACTO")) ? "" : reader.GetString(reader.GetOrdinal("CARGOCONTACTO"))
                        };
                        result.Contacto = contacto;
                        result.CodRpta += 1;

                    }
                    else
                    {
                        ContactoDTO contacto = new ContactoDTO();
                        result.Contacto = contacto;
                    }


                    reader.NextResult();

                    if (reader.Read())
                    {
                        DetalleSolicitudGarantiaDTO solicitud = new DetalleSolicitudGarantiaDTO()
                        {
                            Id_Despacho_Dist = reader.IsDBNull(reader.GetOrdinal("ID_DESPACHO_DIST")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_DESPACHO_DIST")),
                            NumSerie = reader.IsDBNull(reader.GetOrdinal("NUMSERIE")) ? "" : reader.GetString(reader.GetOrdinal("NUMSERIE")),
                            Id_Cotizacion = reader.IsDBNull(reader.GetOrdinal("ID_COTIZACION")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_COTIZACION")),
                            Descripcion = reader.IsDBNull(reader.GetOrdinal("DESCRIPCION")) ? "" : reader.GetString(reader.GetOrdinal("DESCRIPCION")),
                            Desmarca = reader.IsDBNull(reader.GetOrdinal("DESCMARCA")) ? "" : reader.GetString(reader.GetOrdinal("DESCMARCA")),
                            Modelo = reader.IsDBNull(reader.GetOrdinal("MODELO")) ? "" : reader.GetString(reader.GetOrdinal("MODELO")),
                            CodigoProducto = reader.IsDBNull(reader.GetOrdinal("CODIGOPRODUCTO")) ? "" : reader.GetString(reader.GetOrdinal("CODIGOPRODUCTO")),
                            MantPreventivo = reader.IsDBNull(reader.GetOrdinal("MANTPREVENTIVO")) ? 0 : reader.GetInt32(reader.GetOrdinal("MANTPREVENTIVO")),
                            preventReal = reader.IsDBNull(reader.GetOrdinal("PREVREAL")) ? 0 : reader.GetInt32(reader.GetOrdinal("PREVREAL")),
                            PreventPendiente = reader.IsDBNull(reader.GetOrdinal("PREVPEND")) ? 0 : reader.GetInt32(reader.GetOrdinal("PREVPEND")),
                            FechaInstalacion = reader.GetDateTime(reader.GetOrdinal("FECHAINSTALL")),
                            CodGarantia = reader.IsDBNull(reader.GetOrdinal("GARANTIA")) ? "" : reader.GetString(reader.GetOrdinal("GARANTIA")),
                            ValorGarantia = reader.IsDBNull(reader.GetOrdinal("VALORGARANTIA")) ? "" : reader.GetString(reader.GetOrdinal("VALORGARANTIA")),
                            FechaVencimiento = reader.IsDBNull(reader.GetOrdinal("FECHAVENCIMIENTO")) ? "" : reader.GetString(reader.GetOrdinal("FECHAVENCIMIENTO")),
                            EstadoGarant = reader.IsDBNull(reader.GetOrdinal("ESTADOGARANT")) ? "" : reader.GetString(reader.GetOrdinal("ESTADOGARANT"))
                        };
                        result.Detalle = solicitud;
                        result.CodRpta += 1;
                    }
                    else
                    {
                        DetalleSolicitudGarantiaDTO solicitud = new DetalleSolicitudGarantiaDTO();
                        result.Detalle = solicitud;
                    }
                }
                connection.Close();
            }
            return result;
        }

    }
}
