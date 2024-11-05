using AHSECO.CCL.BE;
using AHSECO.CCL.COMUN;
using Dapper;
using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AHSECO.CCL.BE.Ventas;
using System.Data;
using AHSECO.CCL.BE.ServicioTecnico.BandejaInstalacionTecnica;
using Microsoft.Extensions.DependencyInjection;
using System.Runtime.CompilerServices;
using System.Net.Http.Headers;
using System.Security.Permissions;
using System.Diagnostics.Contracts;
using static AHSECO.CCL.COMUN.ConstantesDTO.CotizacionVenta;
using System.Web.UI.WebControls.Expressions;

namespace AHSECO.CCL.BD.ServicioTecnico.BandejaInstalacionTecnica
{
    public class InstalacionTecnicaBD
    {
        CCLog Log;

        public InstalacionTecnicaBD() : this(new CCLog())
        {

        }

        public InstalacionTecnicaBD(CCLog cclog)
        {
            Log = cclog;    
        }

        public FiltroInstalacionTecnica ObtenerFiltrosInstalacion()
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionSingle())
            {
                SqlCommand command;
                var result = new FiltroInstalacionTecnica();
                string query = "EXEC [USP_FILTROS_INSTALACION]";
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
                            //Text = reader.IsDBNull(reader.GetOrdinal("DESCTIPO")) ? "" : reader.GetString(reader.GetOrdinal("DESCTIPO"))
                        };
                        _tipoEmpleado.Add(tipEmpleado);
                    }

                    result.Empresas = _listEmpresa;
                    result.Estados = _Estados;
                    result.Clientes = _Clientes;
                    result.TipVenta = _tiposVenta;
                    result.TipoEmpleado = _tipoEmpleado;

                    return result;
                };
            };
        }
        public IEnumerable<InstalacionTecnicaDTO> ObtenerInstalacionesTec(FiltroInstalacionTecDTO filtros)
        {
            Log.TraceInfo(Utilidades.GetCaller());  
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("isFecIni", filtros.FecIni);
                parameters.Add("isFecFin", filtros.FecFin);
                parameters.Add("IsRequerimiento", filtros.NumReq);
                parameters.Add("IsEstado", filtros.Estado);
                parameters.Add("IsDestino", filtros.Destino);
                parameters.Add("IsVendedor", filtros.Vendedor);
                parameters.Add("IsRuc", filtros.RucEmpresa);
                parameters.Add("IsCodEmpresa", filtros.CodEmpresa);
                parameters.Add("IsTipVenta", filtros.Id_Flujo);
                parameters.Add("IsNumProceso", filtros.NumProceso);
                parameters.Add("IsNumContrato", filtros.Contrato);
                parameters.Add("IsNumOrdenCompra", filtros.OrdenCompra);
                parameters.Add("IsNumFianza", filtros.NumFianza);

                var result = connection.Query(
                    sql: "USP_SEL_INSTALL_TEC",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new InstalacionTecnicaDTO
                    {
                        NumReq = i.Single(d => d.Key.Equals("NUMREQ")).Value.Parse<long>(),
                        Id_Solicitud = i.Single(d => d.Key.Equals("ID_SOLICITUD")).Value.Parse<long>(),
                        Id_WorkFlow = i.Single(d => d.Key.Equals("ID_WORKFLOW")).Value.Parse<long>(),
                        RucEmpresa = i.Single(d => d.Key.Equals("RUCEMPRESA")).Value.Parse<string>(),
                        NomEmpresa = i.Single(d => d.Key.Equals("NOMEMPRESA")).Value.Parse<string>(),
                        Ubicacion = i.Single(d => d.Key.Equals("UBICACION")).Value.Parse<string>(),
                        TipoVenta = i.Single(d => d.Key.Equals("TIPOVENTA")).Value.Parse<string>(),
                        Vendedor = i.Single(d => d.Key.Equals("VENDEDOR")).Value.Parse<string>(),
                        CodEmpresa = i.Single(d => d.Key.Equals("CODEMPRESA")).Value.Parse<string>(),
                        FechaMax = i.Single(d => d.Key.Equals("FECHAMAX")).Value.Parse<string>(),
                        Destino = i.Single(d => d.Key.Equals("DESTINO")).Value.Parse<string>(),
                        Estado = i.Single(d => d.Key.Equals("ESTADO")).Value.Parse<string>(),
                        CodEstado = i.Single(d => d.Key.Equals("CODESTADO")).Value.Parse<string>()
                    });
                return result;
            };
        }

        public List<InstalacionTecnicaDetalleDTO> ObtenerDetalleInstalacion(InstalacionTecnicaDetalleDTO detalle)
        {
            var result = new List<InstalacionTecnicaDetalleDTO>();

            Log.TraceInfo(Utilidades.GetCaller());
            using( var connection = Factory.ConnectionSingle())
            {
                connection.Open();
                SqlCommand command;
                string query = "EXEC [USP_SEL_DETALLE_INSTALL] @isNumReq=" + detalle.NumReq;
                command = new SqlCommand(query, connection);

                using(var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var detalleDTO = new InstalacionTecnicaDetalleDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("ID")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID")),
                            NumReq = reader.IsDBNull(reader.GetOrdinal("NUMREQ")) ? 0 : reader.GetInt64(reader.GetOrdinal("NUMREQ")),
                            CodProducto = reader.IsDBNull(reader.GetOrdinal("CODIGOPRODUCTO")) ? "" : reader.GetString(reader.GetOrdinal("CODIGOPRODUCTO")),
                            DescProducto = reader.IsDBNull(reader.GetOrdinal("DESCRIPCION")) ? "" : reader.GetString(reader.GetOrdinal("DESCRIPCION")),
                            Cantidad = reader.IsDBNull(reader.GetOrdinal("CANTIDAD")) ? 0 : reader.GetInt32(reader.GetOrdinal("CANTIDAD")),
                            Marca = reader.IsDBNull(reader.GetOrdinal("MARCA")) ? "" : reader.GetString(reader.GetOrdinal("MARCA")),
                            Modelo = reader.IsDBNull(reader.GetOrdinal("MODELO")) ? "" : reader.GetString(reader.GetOrdinal("MODELO")),
                            Serie = reader.IsDBNull(reader.GetOrdinal("SERIE")) ? "" : reader.GetString(reader.GetOrdinal("SERIE")),
                            NumFianza = reader.IsDBNull(reader.GetOrdinal("NUMFIANZA")) ? "" : reader.GetString(reader.GetOrdinal("NUMFIANZA")),
                            CantidadMP = reader.IsDBNull(reader.GetOrdinal("CANTIDADMP")) ? 0 : reader.GetInt32(reader.GetOrdinal("CANTIDADMP")),
                            Periodicidad = reader.IsDBNull(reader.GetOrdinal("PERIODICIDAD")) ? "" : reader.GetString(reader.GetOrdinal("PERIODICIDAD")),
                            Garantia = reader.IsDBNull(reader.GetOrdinal("GARANTIA")) ? "" : reader.GetString(reader.GetOrdinal("GARANTIA")),
                            FechaProgramacion = reader.IsDBNull(reader.GetOrdinal("FECHAPROGRAMACION")) ? "" : reader.GetString(reader.GetOrdinal("FECHAPROGRAMACION")),
                            FechaReal = reader.IsDBNull(reader.GetOrdinal("FECHAREAL")) ? "" : reader.GetString(reader.GetOrdinal("FECHAREAL"))
                        };

                        detalleDTO.Tecnicos = this.ObtenerTecnico(detalleDTO.Id);
                        result.Add(detalleDTO);
                    }
                }
            }
            return result;
        }

        public List<TecnicoInstalacionDTO> ObtenerTecnico(long CodDetalle)
        {
            var result = new List<TecnicoInstalacionDTO>();
            Log.TraceInfo(Utilidades.GetCaller());
            using(var connection = Factory.ConnectionSingle())
            {
                connection.Open();
                SqlCommand command;
                string query = "EXEC [USP_SEL_DETALLE_TECNICOS] @isCodDetalle="+CodDetalle;
                command = new SqlCommand(query, connection);

                using(var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var tecnico = new TecnicoInstalacionDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("ID")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID")),
                            Id_Detalle = reader.IsDBNull(reader.GetOrdinal("ID_DETALLE")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_DETALLE")),
                            Cod_Tecnico = reader.IsDBNull(reader.GetOrdinal("COD_TECNICO")) ? 0 : reader.GetInt32(reader.GetOrdinal("COD_TECNICO")),
                            NombreTecnico = reader.IsDBNull(reader.GetOrdinal("NOMBRETECNICO")) ? "" : reader.GetString(reader.GetOrdinal("NOMBRETECNICO")),
                            Documento = reader.IsDBNull(reader.GetOrdinal("DOCUMENTO")) ? "" : reader.GetString(reader.GetOrdinal("DOCUMENTO")),
                            TipDocumento = reader.IsDBNull(reader.GetOrdinal("TIPO_DOCUMENTO")) ? "" : reader.GetString(reader.GetOrdinal("TIPO_DOCUMENTO")),
                            Correo = reader.IsDBNull(reader.GetOrdinal("CORREO")) ? "" : reader.GetString(reader.GetOrdinal("CORREO")),
                            Telefono = reader.IsDBNull(reader.GetOrdinal("TELEFONO")) ? "" : reader.GetString(reader.GetOrdinal("TELEFONO")),
                            Zona = reader.IsDBNull(reader.GetOrdinal("ZONA")) ? "" : reader.GetString(reader.GetOrdinal("ZONA")),
                            TipoTecnico = reader.IsDBNull(reader.GetOrdinal("TIPOTECNICO")) ? "" : reader.GetString(reader.GetOrdinal("TIPOTECNICO"))
                        };
                        result.Add(tecnico);
                    }
                }
            }
            return result;
        }

        public RespuestaDTO MantInstalacion(InstalacionTecnicaDTO instalacion)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();   
                parameters.Add("IsTipoProceso", instalacion.TipoProceso);
                parameters.Add("NUMREQ", instalacion.NumReq);
                parameters.Add("ID_WORKFLOW", instalacion.Id_WorkFlow);
                parameters.Add("ID_SOLICITUD", instalacion.Id_Solicitud);
                parameters.Add("RUCEMPRESA", instalacion.RucEmpresa);
                parameters.Add("NOMEMPRESA", instalacion.NomEmpresa);
                parameters.Add("UBICACION", instalacion.Ubicacion);
                parameters.Add("CODEMPRESA", instalacion.CodEmpresa);
                parameters.Add("NOMBRECONTACTO", instalacion.NombreContacto);
                parameters.Add("TELEFONOCONTACTO", instalacion.TelefonoContacto);
                parameters.Add("CARGOCONTACTO", instalacion.CargoContacto);
                parameters.Add("ESTABLECIMIENTO", instalacion.Establecimiento);
                parameters.Add("TIPOVENTA", instalacion.TipoVenta);
                parameters.Add("ORDENCOMPRA", instalacion.OrdenCompra);
                parameters.Add("NUMPROCESO", instalacion.NumProceso);
                parameters.Add("CONTRATO", instalacion.Contrato);
                parameters.Add("VENDEDOR", instalacion.Vendedor);
                parameters.Add("FECHAMAX", instalacion.FechaMax);
                parameters.Add("DESTINO", instalacion.Destino);
                parameters.Add("ESTADO", instalacion.Estado);
                parameters.Add("UsrEjecuta", instalacion.UsuarioRegistra);

                var result = connection.Query(
                    sql: "USP_MANT_TBM_INSTALACION",
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

        public RespuestaDTO MantInstalacionTecnicaDetalle(InstalacionTecnicaDetalleDTO detalle)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("IsTipoProceso", detalle.TipoProceso);
                parameters.Add("IsID", detalle.Id);
                parameters.Add("IsNUMREQ", detalle.NumReq);
                parameters.Add("IsCODIGOPRODUCTO", detalle.CodProducto);
                parameters.Add("IsDESCRIPCION", detalle.DescProducto);
                parameters.Add("IsCANTIDAD", detalle.Cantidad);
                parameters.Add("IsMARCA", detalle.Marca);
                parameters.Add("IsMODELO", detalle.Modelo);
                parameters.Add("IsSERIE",detalle.Serie);
                parameters.Add("IsNUMFIANZA", detalle.NumFianza);
                parameters.Add("IsCANTIDADMP", detalle.CantidadMP);
                parameters.Add("IsPERIODICIDAD",detalle.Periodicidad);
                parameters.Add("IsGARANTIA",detalle.Garantia);
                parameters.Add("UsrEjecuta", detalle.UsuarioRegistra);

                    var result = connection.Query(
                    sql: "USP_MANT_TBD_INSTALACION",
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

        public RespuestaDTO MantTecnicoxDetalle(TecnicoInstalacionDTO tecnico)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("IsTipoProceso", tecnico.TipoProceso);
                parameters.Add("IsID", tecnico.Id);
                parameters.Add("IsID_DETALLE", tecnico.Id_Detalle);
                parameters.Add("IsCOD_TECNICO", tecnico.Cod_Tecnico);
                parameters.Add("IsNOMBRETECNICO",tecnico.NombreTecnico);
                parameters.Add("IsDOCUMENTO",tecnico.Documento);
                parameters.Add("IsTIP_DOCUMENTO", tecnico.TipDocumento);
                parameters.Add("IsCORREO",tecnico.Correo);
                parameters.Add("IsTELEFONO",tecnico.Telefono);
                parameters.Add("IsZONA",tecnico.Zona);
                parameters.Add("IsTIPOTECNICO",tecnico.TipoTecnico);
                parameters.Add("IsESTADO", tecnico.Estado);
                parameters.Add("IsUsrEjecuta", tecnico.UsuarioRegistra);

                var result = connection.Query(
                    sql: "USP_MANT_TBD_TECNICOINSTALACION",
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
        public IEnumerable<SolicitudDTO> ObtenerSolicitudes(SolicitudDTO solicitudDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());

            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("isIdCliente", solicitudDTO.IdCliente);
                parameters.Add("isIdSolicitud", solicitudDTO.Id_Solicitud);
                parameters.Add("isEstado", solicitudDTO.Estado);
                parameters.Add("isTipoSol", solicitudDTO.Tipo_Sol);

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
                        nomEstado = i.Single(d => d.Key.Equals("NOM_ESTADO")).Value.Parse<string>(),
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
        public SolicitudVentaGrupoDTO ObtenerDetalleSolicitud(long id)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using ( var connection = Factory.ConnectionSingle())
            {
                var parameters = new DynamicParameters();

                SqlCommand command;
                var result = new SolicitudVentaGrupoDTO();
                string query = "exec USP_SEL_SOLICITUD_INSTALL_TEC @isIdSolicitud=" + id;
                connection.Open();
                command = new SqlCommand(query, connection);

                using (var reader = command.ExecuteReader())
                {
                    reader.Read();
                    SolicitudDTO solicitud = new SolicitudDTO
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
                        nomFlujo = reader.IsDBNull(reader.GetOrdinal("FLUJO")) ? "" : reader.GetString(reader.GetOrdinal("FLUJO")),
                        Id_Flujo = reader.IsDBNull(reader.GetOrdinal("ID_FLUJO")) ? 0 : reader.GetInt32(reader.GetOrdinal("ID_FLUJO")),
                        NomTipoSol = reader.IsDBNull(reader.GetOrdinal("TIPO")) ? "" : reader.GetString(reader.GetOrdinal("TIPO")),
                        Fecha_Sol = reader.IsDBNull(reader.GetOrdinal("FECHA_SOL")) ? "" : reader.GetString(reader.GetOrdinal("FECHA_SOL")),
                        nomEstado = reader.IsDBNull(reader.GetOrdinal("ESTADO")) ? "" : reader.GetString(reader.GetOrdinal("ESTADO")),
                    };
                    reader.NextResult();

                    List<CotizacionDetalleDTO> _detalleCotizacion = new List<CotizacionDetalleDTO>();
                    while (reader.Read())
                    {
                        var cotDetalle = new CotizacionDetalleDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("ID")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID")),
                            NroItem = reader.IsDBNull(reader.GetOrdinal("NROITEM")) ? 0 : reader.GetInt32(reader.GetOrdinal("NROITEM")),
                            CodItem = reader.IsDBNull(reader.GetOrdinal("CODIGOPRODUCTO")) ? "" : reader.GetString(reader.GetOrdinal("CODIGOPRODUCTO")),
                            TipoItem = reader.IsDBNull(reader.GetOrdinal("TIPOITEM")) ? "" : reader.GetString(reader.GetOrdinal("TIPOITEM")),
                            Cantidad = reader.IsDBNull(reader.GetOrdinal("CANTIDAD")) ? 0 : reader.GetInt32(reader.GetOrdinal("CANTIDAD")),
                            Descripcion = reader.IsDBNull(reader.GetOrdinal("DESCRIPCION")) ? "" : reader.GetString(reader.GetOrdinal("DESCRIPCION")),
                            Marca = reader.IsDBNull(reader.GetOrdinal("DESMARCA")) ? "" : reader.GetString(reader.GetOrdinal("DESMARCA")),
                            Serie = reader.IsDBNull(reader.GetOrdinal("LOTESERIE")) ? "" : reader.GetString(reader.GetOrdinal("LOTESERIE")),
                        };
                        _detalleCotizacion.Add(cotDetalle);
                    }

                    result.Solicitud = solicitud;
                    result.DetalleCotizacion = _detalleCotizacion;
                    connection.Close();
                }
                return result;
            }
        }

        public GrupoInstalacionTecnicaDTO ObtenerMainInstalacion(long NumReq, long IdWorkFlow)
        {
            var result = new GrupoInstalacionTecnicaDTO();
            using (var connection = Factory.ConnectionSingle())
            {
                SqlCommand sqlcommand;
                string query = "EXEC USP_SEL_MAIN_INSTALL_TEC @isNumReq=" + NumReq.ToString() + ", @isIdWorkFlow="+ IdWorkFlow.ToString();
                connection.Open();
                sqlcommand = new SqlCommand(query, connection);

                using (var reader = sqlcommand.ExecuteReader())
                {
                    reader.Read();
                    InstalacionTecnicaDTO instalacion = new InstalacionTecnicaDTO
                    {
                        Id_Solicitud = reader.IsDBNull(reader.GetOrdinal("ID_SOLICITUD")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_SOLICITUD"))
                        ,RucEmpresa = reader.IsDBNull(reader.GetOrdinal("RUCEMPRESA")) ? "" : reader.GetString(reader.GetOrdinal("RUCEMPRESA"))
                        ,NomEmpresa = reader.IsDBNull(reader.GetOrdinal("NOMEMPRESA")) ? "" : reader.GetString(reader.GetOrdinal("NOMEMPRESA"))
                        ,Ubicacion = reader.IsDBNull(reader.GetOrdinal("UBICACION")) ? "" : reader.GetString(reader.GetOrdinal("UBICACION"))
                        ,NombreContacto = reader.IsDBNull(reader.GetOrdinal("NOMBRECONTACTO")) ? "" : reader.GetString(reader.GetOrdinal("NOMBRECONTACTO"))
                        ,TelefonoContacto = reader.IsDBNull(reader.GetOrdinal("TELEFONOCONTACTO")) ? "" : reader.GetString(reader.GetOrdinal("TELEFONOCONTACTO"))
                        ,CargoContacto = reader.IsDBNull(reader.GetOrdinal("CARGOCONTACTO")) ? "" : reader.GetString(reader.GetOrdinal("CARGOCONTACTO"))
                        ,Establecimiento = reader.IsDBNull(reader.GetOrdinal("ESTABLECIMIENTO")) ? "" : reader.GetString(reader.GetOrdinal("ESTABLECIMIENTO"))
                        ,TipoVenta = reader.IsDBNull(reader.GetOrdinal("TIPOVENTA")) ? "" : reader.GetString(reader.GetOrdinal("TIPOVENTA"))
                        ,OrdenCompra = reader.IsDBNull(reader.GetOrdinal("ORDENCOMPRA")) ? "" : reader.GetString(reader.GetOrdinal("ORDENCOMPRA"))
                        ,NumProceso = reader.IsDBNull(reader.GetOrdinal("NUMPROCESO")) ? "" : reader.GetString(reader.GetOrdinal("NUMPROCESO"))
                        ,Contrato = reader.IsDBNull(reader.GetOrdinal("CONTRATO")) ? "" : reader.GetString(reader.GetOrdinal("CONTRATO"))
                        ,Vendedor = reader.IsDBNull(reader.GetOrdinal("VENDEDOR")) ? "" : reader.GetString(reader.GetOrdinal("VENDEDOR"))
                        ,CodEmpresa = reader.IsDBNull(reader.GetOrdinal("CODEMPRESA")) ? "" : reader.GetString(reader.GetOrdinal("CODEMPRESA"))
                        ,FechaMax = reader.IsDBNull(reader.GetOrdinal("FECHAMAX")) ? "" : reader.GetString(reader.GetOrdinal("FECHAMAX"))
                        ,Destino = reader.IsDBNull(reader.GetOrdinal("DESTINO")) ? "" : reader.GetString(reader.GetOrdinal("DESTINO"))
                        ,Estado = reader.IsDBNull(reader.GetOrdinal("ESTADO")) ? "" : reader.GetString(reader.GetOrdinal("ESTADO"))
                    };

                    reader.NextResult();
                    List<InstalacionTecnicaDetalleDTO> _listDetalle = new List<InstalacionTecnicaDetalleDTO>(); 
                    while (reader.Read()) 
                    {
                        var detalle = new InstalacionTecnicaDetalleDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("ID")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID"))
                            ,NumReq = reader.IsDBNull(reader.GetOrdinal("NUMREQ")) ? 0 : reader.GetInt64(reader.GetOrdinal("NUMREQ"))
                            ,CodProducto = reader.IsDBNull(reader.GetOrdinal("CODIGOPRODUCTO")) ? "" : reader.GetString(reader.GetOrdinal("CODIGOPRODUCTO"))
                            ,DescProducto = reader.IsDBNull(reader.GetOrdinal("DESCRIPCION")) ? "" : reader.GetString(reader.GetOrdinal("DESCRIPCION"))
                            ,Cantidad = reader.IsDBNull(reader.GetOrdinal("CANTIDAD")) ? 0 : reader.GetInt32(reader.GetOrdinal("CANTIDAD"))
                            ,Marca = reader.IsDBNull(reader.GetOrdinal("MARCA")) ? "" : reader.GetString(reader.GetOrdinal("MARCA"))
                            ,Modelo = reader.IsDBNull(reader.GetOrdinal("MODELO")) ? "" : reader.GetString(reader.GetOrdinal("MODELO"))
                            ,Serie = reader.IsDBNull(reader.GetOrdinal("SERIE")) ? "" : reader.GetString(reader.GetOrdinal("SERIE"))
                            ,NumFianza = reader.IsDBNull(reader.GetOrdinal("NUMFIANZA")) ? "" : reader.GetString(reader.GetOrdinal("NUMFIANZA"))
                            ,CantidadMP = reader.IsDBNull(reader.GetOrdinal("CANTIDADMP")) ? 0 : reader.GetInt32(reader.GetOrdinal("CANTIDADMP"))
                            ,Periodicidad = reader.IsDBNull(reader.GetOrdinal("PERIODICIDAD")) ? "" : reader.GetString(reader.GetOrdinal("PERIODICIDAD"))
                            ,Garantia = reader.IsDBNull(reader.GetOrdinal("GARANTIA")) ? "" : reader.GetString(reader.GetOrdinal("GARANTIA"))
                            ,FechaProgramacion = reader.IsDBNull(reader.GetOrdinal("FECHAPROGRAMACION")) ? "" : reader.GetString(reader.GetOrdinal("FECHAPROGRAMACION"))
                            ,FechaReal = reader.IsDBNull(reader.GetOrdinal("FECHAREAL")) ? "" : reader.GetString(reader.GetOrdinal("FECHAREAL"))
                        };
                        detalle.Tecnicos = this.ObtenerTecnico(detalle.Id);
                        _listDetalle.Add(detalle);
                    }
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
                            Nombre_Usuario = reader.IsDBNull(reader.GetOrdinal("NOMBRE_USUARIO")) ? "" : reader.GetString(reader.GetOrdinal("NOMBRE_USUARIO")),
                            Perfil_Usuario = reader.IsDBNull(reader.GetOrdinal("PERFIL_USUARIO")) ? "" : reader.GetString(reader.GetOrdinal("PERFIL_USUARIO")),
                            UsuarioRegistra = reader.IsDBNull(reader.GetOrdinal("USR_REG")) ? "" : reader.GetString(reader.GetOrdinal("USR_REG")),
                            Fecha_Registro = reader.IsDBNull(reader.GetOrdinal("FEC_REG")) ? "" : reader.GetString(reader.GetOrdinal("FEC_REG"))
                        };
                        _listaObservaciones.Add(observacion);
                    };

                    result.CabeceraInstalacion = instalacion;
                    result.DetalleInstalacion = _listDetalle;
                    result.Observaciones = _listaObservaciones;
                    result.Adjuntos = _listaAdjuntos;
                }
            }
            return result;
        }
    }
}
