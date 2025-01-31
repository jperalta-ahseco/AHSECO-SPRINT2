using AHSECO.CCL.BE;
using AHSECO.CCL.BE.Mantenimiento;
using AHSECO.CCL.BE.ServicioTecnico.BandejaGarantias;
using AHSECO.CCL.BE.ServicioTecnico.BandejaPreventivos;
using AHSECO.CCL.BE.Ventas;
using AHSECO.CCL.COMUN;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Cache;
using System.Runtime.InteropServices;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using System.Xml.XPath;
using static AHSECO.CCL.COMUN.ConstantesDTO;

namespace AHSECO.CCL.BD.ServicioTecnico.BandejaPreventivos
{
    public class PreventivosBD
    {
        CCLog Log;
        public PreventivosBD() : this(new CCLog())
        {   
        }

        public PreventivosBD(CCLog cclog)
        {
            Log = cclog;
        }

        public FiltrosPreventivosDTO ObtenerFiltrosPreventivos()
        {
            var result = new FiltrosPreventivosDTO();

            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionSingle())
            {
                SqlCommand cmd;
                connection.Open();
                string query = "EXEC [USP_PREV_SEL_FILTROS]";

                cmd = new SqlCommand(query, connection);



                using (var reader = cmd.ExecuteReader())
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
                    List<ComboDTO> _clientes = new List<ComboDTO>();
                    while (reader.Read())
                    {
                        var cliente = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("ID")) ? "" : reader.GetString(reader.GetOrdinal("ID")),
                            Text = reader.IsDBNull(reader.GetOrdinal("NOMEMPRESA")) ? "" : reader.GetString(reader.GetOrdinal("NOMEMPRESA"))
                        };
                        _clientes.Add(cliente);
                    }

                    reader.NextResult();
                    List<ComboDTO> _tipoDoc = new List<ComboDTO>();
                    while (reader.Read())
                    {
                        var tipoDoc = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("COD")) ? "" : reader.GetString(reader.GetOrdinal("COD")),
                            Text = reader.IsDBNull(reader.GetOrdinal("DESCRIPCION")) ? "" : reader.GetString(reader.GetOrdinal("DESCRIPCION"))
                        };
                        _tipoDoc.Add(tipoDoc);
                    };

                    reader.NextResult();
                    List<ComboDTO> _periodos = new List<ComboDTO>();
                    while (reader.Read())
                    {
                        var _periodo = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("COD")) ? "" : reader.GetString(reader.GetOrdinal("COD")),
                            Text = reader.IsDBNull(reader.GetOrdinal("DESCRIPCION")) ? "" : reader.GetString(reader.GetOrdinal("DESCRIPCION"))
                        };
                        _periodos.Add(_periodo);
                    };

                    reader.NextResult();
                    List<ComboDTO> _garantias = new List<ComboDTO>();
                    while (reader.Read())
                    {
                        var _garantia = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("COD")) ? "" : reader.GetString(reader.GetOrdinal("COD")),
                            Text = reader.IsDBNull(reader.GetOrdinal("DESCRIPCION")) ? "" : reader.GetString(reader.GetOrdinal("DESCRIPCION"))
                        };
                        _garantias.Add(_garantia);
                    }

                    result.Clientes = _clientes;
                    result.Empresas = _listEmpresa;
                    result.Estados = _Estados;
                    result.TipoEmpleado = _tipoEmpleado;
                    result.TipoDoc = _tipoDoc;
                    result.Periodos = _periodos;
                    result.Garantias = _garantias;
                }
            }
            return result;
        }

        public IEnumerable<ContactoPrevDTO> ObtenerContactos(long IdMant)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionSingle())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("IsIdMant", IdMant);

                var result = connection.Query(
                    sql: "USP_SEL_PREV_CONTACTOS",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new ContactoPrevDTO
                    {
                        Id_Asig = i.Single(d => d.Key.Equals("ID_ASIG")).Value.Parse<long>(),
                        Id_Mant = i.Single(d => d.Key.Equals("ID_MANT")).Value.Parse<long>(),
                        IdContacto = i.Single(d => d.Key.Equals("ID_CONTACTO")).Value.Parse<int>(),
                        CodTipDocContacto = i.Single(d => d.Key.Equals("TIPO_DOC")).Value.Parse<string>(),
                        TipDoc = i.Single(d => d.Key.Equals("DESCRIPCION")).Value.Parse<string>(),
                        NumDoc = i.Single(d => d.Key.Equals("NUM_DOC")).Value.Parse<string>(),
                        NomCont = i.Single(d => d.Key.Equals("NOMBRES")).Value.Parse<string>(),
                        Establecimiento = i.Single(d => d.Key.Equals("ESTABLECIMIENTO")).Value.Parse<string>(),
                        AreaContacto = i.Single(d => d.Key.Equals("AREA")).Value.Parse<string>(),
                        Telefono = i.Single(d => d.Key.Equals("TELEFONO")).Value.Parse<string>(),
                        Cargo = i.Single(d => d.Key.Equals("CARGO")).Value.Parse<string>(),
                        Correo = i.Single(d => d.Key.Equals("CORREO")).Value.Parse<string>(),
                        CodEstado = i.Single(d => d.Key.Equals("ESTADO")).Value.Parse<bool>()
                    });
                connection.Close();
                return result;
            }
        }


        public IEnumerable<ContactoDTO> ObtenerContactosxRuc(ContactoDTO contacto)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionSingle())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("IsRUC", contacto.RucCliente);
                parameters.Add("IsNomContacto", contacto.NomCont);
                parameters.Add("IsEstablecimiento", contacto.Establecimiento);

                var result = connection.Query(
                    sql: "USP_SEL_CONTACTOS_X_RUC",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new ContactoDTO
                    {
                        IdContacto = i.Single(d => d.Key.Equals("IDCONTACTO")).Value.Parse<int>(),
                        TipDoc = i.Single(d => d.Key.Equals("DESCRIPCION")).Value.Parse<string>(),
                        NumDoc = i.Single(d => d.Key.Equals("NUMDOCCONTACTO")).Value.Parse<string>(),
                        NomCont = i.Single(d => d.Key.Equals("NOMBRE CONTACTO")).Value.Parse<string>(),
                        Establecimiento = i.Single(d => d.Key.Equals("ESTABLECIMIENTO")).Value.Parse<string>(),
                        AreaContacto = i.Single(d => d.Key.Equals("AREA")).Value.Parse<string>(),
                        Telefono = i.Single(d => d.Key.Equals("TELEFONOCONTACTO")).Value.Parse<string>(),
                        Telefono2 = i.Single(d => d.Key.Equals("TELEFONO2CONTACTO")).Value.Parse<string>(),
                        Cargo = i.Single(d => d.Key.Equals("CARGOCONTACTO")).Value.Parse<string>(),
                        Correo = i.Single(d => d.Key.Equals("CORREOCONTACTO")).Value.Parse<string>(),
                        Estado = i.Single(d => d.Key.Equals("ESTADO")).Value.Parse<string>()
                    });
                connection.Close();
                return result;
            }
        }

        public RespuestaDTO MantContactos(ContactoPrevDTO contacto)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionSingle())
            {
                connection.Open();

                var parameters = new DynamicParameters();
                parameters.Add("IsTipoProceso", contacto.TipoProceso);
                parameters.Add("IsID_ASIG", contacto.Id_Asig);
                parameters.Add("IsID_CONTACTO", contacto.IdContacto);
                parameters.Add("IsID_MANT", contacto.Id_Mant);
                parameters.Add("IsTIPO_DOC", contacto.TipDoc);
                parameters.Add("IsNUM_DOC", contacto.NumDoc);
                parameters.Add("IsNOMBRES", contacto.NomCont);
                parameters.Add("IsESTABLECIMIENTO", contacto.Establecimiento);
                parameters.Add("IsAREA", contacto.AreaContacto);
                parameters.Add("IsTELEFONO", contacto.Telefono);
                parameters.Add("IsRUC", contacto.RucCliente);
                parameters.Add("IsCARGO", contacto.Cargo);
                parameters.Add("IsCORREO", contacto.Correo);
                parameters.Add("IsESTADO", contacto.CodEstado);
                parameters.Add("IsUsrEjecuta", contacto.UsuarioRegistra);


                var result = connection.Query(
                    sql: "USP_MANT_PREV_CONTACTOS",
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


        public IEnumerable<TecnicoMantPreventivoDTO> ObtenerTecnicosPreventivos(long NumPreventivo)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("IsNumPreventivo", NumPreventivo);

                var result = connection.Query(
                    sql: "USP_PREV_SEL_TECNICOS",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new TecnicoMantPreventivoDTO()
                    {
                        Id_Asig = i.Single(d => d.Key.Equals("ID")).Value.Parse<long>(),
                        Id_Detalle = i.Single(d => d.Key.Equals("ID_DETALLE")).Value.Parse<long>(),
                        Cod_Tecnico = i.Single(d => d.Key.Equals("COD_TECNICO")).Value.Parse<int>(),
                        Nombres = i.Single(d => d.Key.Equals("NOMBRES")).Value.Parse<string>(),
                        ApePaterno = i.Single(d => d.Key.Equals("APELLIDOPATERNO")).Value.Parse<string>(),
                        ApeMaterno = i.Single(d => d.Key.Equals("APELLIDOMATERNO")).Value.Parse<string>(),
                        Documento = i.Single(d => d.Key.Equals("DOCUMENTO")).Value.Parse<string>(),
                        Tipo_Documento = i.Single(d => d.Key.Equals("TIPO_DOCUMENTO")).Value.Parse<string>(),
                        Correo = i.Single(d => d.Key.Equals("CORREO")).Value.Parse<string>(),
                        Telefono = i.Single(d => d.Key.Equals("TELEFONO")).Value.Parse<string>(),
                        Zona = i.Single(d => d.Key.Equals("ZONA")).Value.Parse<string>(),
                        DescZona = i.Single(d => d.Key.Equals("UBIGEO")).Value.Parse<string>(),
                        Empresa = i.Single(d => d.Key.Equals("EMPRESA")).Value.Parse<string>(),
                        NomTipoTecnico = i.Single(d => d.Key.Equals("NOMTIPOTECNICO")).Value.Parse<string>(),
                        NomTipoDoc = i.Single(d => d.Key.Equals("NOM_TIPO_DOCUMENTO")).Value.Parse<string>(),
                        TipoTecnico = i.Single(d => d.Key.Equals("TIPOTECNICO")).Value.Parse<string>(),
                        Estado = i.Single(d => d.Key.Equals("ESTADO")).Value.Parse<bool>()
                    });
                connection.Close();
                return result;
            };
        }
       
        public IEnumerable<ResultPreventivoDTO> ObtenerPreventivosMigrados(ReqPreventivoDTO req)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();

                parameters.Add("IsId_Equipo", req.Id_Equipo);
                parameters.Add("IsNumSerie", req.NumSerie);
                parameters.Add("IsNumProc", req.NumProc);
                parameters.Add("IsEmpresa", req.Empresa);
                parameters.Add("IsPeriodoInicio", req.PeriodoInicio);
                parameters.Add("IsPeriodoFinal", req.PeriodoFinal);
                parameters.Add("IsNomEmpresa", req.NombreCliente);
                parameters.Add("IsNomEquipo", req.NomEquipo);
                parameters.Add("IsMarca", req.Marca);
                parameters.Add("IsDestino", req.NomDestino);
                parameters.Add("IsModelo", req.Modelo);
                if (req.IndCronograma.HasValue)
                {
                    parameters.Add("IndCronograma", Utilidades.ParseStringSN<bool?>(req.IndCronograma), DbType.String);
                }
                else
                {
                    parameters.Add("IndCronograma", req.IndCronograma);
                }
                parameters.Add("NUMPAGINAS", req.NumPagina);
                parameters.Add("PAGINA", req.Pagina);

                var result = connection.Query(
                    sql: "USP_PREV_SEL_PREVENTIVOS_MIGRA",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new ResultPreventivoDTO()
                    {
                        Id_Mant = i.Single(d => d.Key.Equals("ID_MANT")).Value.Parse<long>(),
                        Id_Equipo = i.Single(d => d.Key.Equals("ID_EQUIPO")).Value.Parse<long>(),
                        Serie = i.Single(d => d.Key.Equals("NUMSERIE")).Value.Parse<string>(),
                        Descripcion = i.Single(d => d.Key.Equals("NOMEQUIPO")).Value.Parse<string>(),
                        Marca = i.Single(d => d.Key.Equals("MARCA")).Value.Parse<string>(),
                        Modelo = i.Single(d => d.Key.Equals("MODELO")).Value.Parse<string>(),
                        Cliente = i.Single(d => d.Key.Equals("NOMEMPRESA")).Value.Parse<string>(),
                        Proceso = i.Single(d => d.Key.Equals("TIPOPROCESO")).Value.Parse<string>(),
                        FechaInstalacion = i.Single(d => d.Key.Equals("FECHAINSTAL")).Value.Parse<string>(),
                        ProxFechaMant = i.Single(d => d.Key.Equals("PROXFECHAMANT")).Value.Parse<string>(),
                        TotalPrevent = i.Single(d => d.Key.Equals("TOTALPREV")).Value.Parse<int>(),
                        PreventReal = i.Single(d => d.Key.Equals("REALPREV")).Value.Parse<int>(),
                        PreventPend = i.Single(d => d.Key.Equals("PENDPREV")).Value.Parse<int>(),
                        UbigeoDest = i.Single(d => d.Key.Equals("NOM_DESTINO")).Value.Parse<string>(),
                        RazonSocial = i.Single(d => d.Key.Equals("RAZON_SOCIAL")).Value.Parse<string>(),
                        IndCronograma = i.Single(d => d.Key.Equals("INDCRONOGRAMA")).Value.Parse<string>()
                    });
                connection.Close();
                return result;
            }
        }


        public IEnumerable<ResultPreventivoDTO> ObtenerPreventivos(ReqPreventivoDTO req)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using(var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();

                parameters.Add("IsNumReq", req.NumReq);
                parameters.Add("IsNumSerie", req.NumSerie);
                parameters.Add("IsNumProc", req.NumProc);
                parameters.Add("IsNumOrdCompra", req.NumOrdCompra);
                parameters.Add("IsNumFianza", req.NumFianza);
                parameters.Add("IsEmpresa", req.Empresa);
                parameters.Add("IsPeriodoInicio", req.PeriodoInicio);
                parameters.Add("IsPeriodoFinal", req.PeriodoFinal);
                parameters.Add("IsModelo", req.Modelo);
                parameters.Add("IsUbigeoDestino", req.CodUbigeoDest);
                parameters.Add("IsMarca", req.Marca);
                parameters.Add("IsNomEquipo", req.NomEquipo);
                parameters.Add("IsRUC", req.Ruc);
                parameters.Add("IsContrato", req.NumContrato);
                parameters.Add("IsNumFianzaApp", req.NumFianzaPP);
                parameters.Add("IsNumFianzaApa", req.NumFianzaPA);
                //parameters.Add("IsEstado", req.Estado);

                var result = connection.Query(
                    sql: "USP_PREV_SEL_PREVENTIVOS",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new ResultPreventivoDTO()
                    {
                        Id_Mant = i.Single( d => d.Key.Equals("ID_MANT")).Value.Parse<long>(),
                        NumInst = i.Single(d => d.Key.Equals("NUMREQ")).Value.Parse<long>(),
                        Serie = i.Single(d => d.Key.Equals("SERIE")).Value.Parse<string>(),
                        Descripcion = i.Single(d => d.Key.Equals("DESCRIPCION")).Value.Parse<string>(),
                        Marca = i.Single(d => d.Key.Equals("MARCA")).Value.Parse<string>(),
                        Modelo = i.Single(d => d.Key.Equals("MODELO")).Value.Parse<string>(),
                        Cliente = i.Single(d => d.Key.Equals("NOMEMPRESA")).Value.Parse<string>(),
                        FechaInstalacion = i.Single(d => d.Key.Equals("FECHAINSTALACION")).Value.Parse<string>(),
                        ProxFechaMant = i.Single(d => d.Key.Equals("PROXFECHAMANT")).Value.Parse<string>(),
                        TotalPrevent = i.Single(d => d.Key.Equals("TOTALPREVE")).Value.Parse<int>(),
                        PreventReal = i.Single(d => d.Key.Equals("COMPLETADOS")).Value.Parse<int>(),
                        PreventPend = i.Single(d => d.Key.Equals("PENDIENTES")).Value.Parse<int>(),
                        UbigeoDest = i.Single(d => d.Key.Equals("UBIGEODEST")).Value.Parse<string>(),
                        NumContrato = i.Single(d => d.Key.Equals("NUMCONTRATO")).Value.Parse<string>(),
                        NumFianzaPP = i.Single(d => d.Key.Equals("NUMFIANZAPP")).Value.Parse<string>(),
                        NumFianzaPA = i.Single(d => d.Key.Equals("NUMFIANZAPA")).Value.Parse<string>()
                    });
                connection.Close();
                return result;
            }
        }

        public RespuestaDTO MantTecnicosPrev(TecnicoMantPreventivoDTO tecnico)
        {
            using (var connection = Factory.ConnectionFactory())
            {
                var parameters = new DynamicParameters();
                connection.Open();

                parameters.Add("IsTipoProceso", tecnico.TipoProceso);
                parameters.Add("IsID_ASIG", tecnico.Id_Asig);
                parameters.Add("IsIdDetalle", tecnico.Id_Detalle);
                parameters.Add("IsCOD_TECNICO", tecnico.Cod_Tecnico);
                parameters.Add("IsNOMBRES", tecnico.Nombres);
                parameters.Add("IsAPELLIDOPATERNO", tecnico.ApePaterno);
                parameters.Add("IsAPELLIDOMATERNO", tecnico.ApeMaterno);
                parameters.Add("IsDOCUMENTO", tecnico.Documento);
                parameters.Add("IsTIPO_DOCUMENTO", tecnico.Tipo_Documento);
                parameters.Add("IsCORREO", tecnico.Correo);
                parameters.Add("IsTELEFONO", tecnico.Telefono);
                parameters.Add("IsZONA", tecnico.Zona);
                parameters.Add("IsEMPRESA", tecnico.Empresa);
                parameters.Add("IsTIPOTECNICO", tecnico.TipoTecnico);
                parameters.Add("IsESTADO", tecnico.Estado);
                parameters.Add("IsUsrEjecuta", tecnico.UsuarioRegistra);

                var result = connection.Query(
                    sql: "USP_PREV_MANT_TECNICOS",
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

        public RespuestaDTO MantPreventivos(ReqPreventivoDTO req)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using( var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("IsTipoEjecucion", req.TipoProceso);
                parameters.Add("IsID", req.Id_Detalle);
                parameters.Add("IsID_MANT", req.Id_Mant);
                parameters.Add("IsID_WORKFLOW", req.Id_WorkFlow);
                parameters.Add("IsFECHAMANTENIMIENTO", req.FechaMantenimiento);
                parameters.Add("IsMONTOPRESTACCE", req.MontoPrestAcce);
                parameters.Add("IsINDPRESTACION", req.IndPrestAcce == true ? "S" : "N");
                parameters.Add("IsINDREPUESTO", req.IndRepuesto == true ? "S" : "N");
                parameters.Add("IsVAL_OTM", req.valOTM);
                parameters.Add("IsNUMFACTURA", req.NumFactura);
                parameters.Add("IsFECHAFACTURA", req.FecFactura);
                parameters.Add("IsVAL_GUIA", req.valGuia);
                parameters.Add("IsFECGUIA", req.FecGuia);
                parameters.Add("IsESTADO", req.Estado);
                parameters.Add("IsUsrEjecuta", req.UsuarioRegistra);

                var result = connection.Query(
                    sql: "USP_PREV_MANT_PEVENTIVO",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new RespuestaDTO()
                    {
                        Codigo = i.Single(d => d.Key.Equals("COD")).Value.Parse<int>(),
                        Mensaje = i.Single(d => d.Key.Equals("MSG")).Value.Parse<string>()
                    }).FirstOrDefault();
                connection.Close();
                return result;
            }
        }

        public GrupoMantPreventivoDTO ObtenerMainPreventivo(long NumPreventivo, long IdWorkFlow)
        {
            var result = new GrupoMantPreventivoDTO();
            Log.TraceInfo(Utilidades.GetCaller());
            using( var connection = Factory.ConnectionSingle())
            {
                connection.Open();
                SqlCommand cmd;
                string query = "EXEC [USP_PREV_SEL_MAIN_MANT] @IsNumPreventivo =" + NumPreventivo +",@IsIdWorkFlow = "+IdWorkFlow;
                cmd = new SqlCommand(query, connection);

                using(var reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    MantPreventivoDTO mant = new MantPreventivoDTO()
                    {
                        Id = reader.IsDBNull(reader.GetOrdinal("ID")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID")),
                        FechaMantenimiento = reader.GetDateTime(reader.GetOrdinal("FECHAMANTENIMIENTO")),
                        MontoPrestAcce = reader.IsDBNull(reader.GetOrdinal("MONTOPRESTACCE")) ? 0 : reader.GetDecimal(reader.GetOrdinal("MONTOPRESTACCE")),
                        IndPrestacion = reader.IsDBNull(reader.GetOrdinal("INDPRESTACION")) ? false : (reader.GetString(reader.GetOrdinal("INDPRESTACION")) == "S" ? true : false),
                        IndRepuesto = reader.IsDBNull(reader.GetOrdinal("INDREPUESTO")) ? false : (reader.GetString(reader.GetOrdinal("INDREPUESTO")) == "S" ? true : false),
                        NumFactura = reader.IsDBNull(reader.GetOrdinal("NUMFACTURA")) ? "" : reader.GetString(reader.GetOrdinal("NUMFACTURA")),
                        FecFactura = reader.IsDBNull(reader.GetOrdinal("FECHAFACTURA")) ? "" : reader.GetString(reader.GetOrdinal("FECHAFACTURA")),
                        FecGuia = reader.IsDBNull(reader.GetOrdinal("FECGUIA")) ? "" : reader.GetString(reader.GetOrdinal("FECGUIA")),
                        Val_OTM = reader.IsDBNull(reader.GetOrdinal("VAL_OTM")) ? "" : reader.GetString(reader.GetOrdinal("VAL_OTM")),
                        Val_GUIA = reader.IsDBNull(reader.GetOrdinal("VAL_GUIA")) ? "" : reader.GetString(reader.GetOrdinal("VAL_GUIA")),
                        NumConstancia = reader.IsDBNull(reader.GetOrdinal("MIG_CONST")) ? "" : reader.GetString(reader.GetOrdinal("MIG_CONST")),
                        Estado = reader.IsDBNull(reader.GetOrdinal("ESTADO")) ? "" : reader.GetString(reader.GetOrdinal("ESTADO")),
                        CodEstado = reader.IsDBNull(reader.GetOrdinal("CODESTADO")) ? "" : reader.GetString(reader.GetOrdinal("CODESTADO"))
                    };

                    reader.NextResult();
                    List<TecnicoMantPreventivoDTO> _tecnicos = new List<TecnicoMantPreventivoDTO>();
                    while (reader.Read())
                    {
                        var tecnico = new TecnicoMantPreventivoDTO()
                        {
                            Id_Asig = reader.IsDBNull(reader.GetOrdinal("ID")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID")),
                            Id_Detalle = reader.IsDBNull(reader.GetOrdinal("ID_DETALLE")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_DETALLE")),
                            Cod_Tecnico = reader.IsDBNull(reader.GetOrdinal("COD_TECNICO")) ? 0 : reader.GetInt32(reader.GetOrdinal("COD_TECNICO")),
                            ApeMaterno = reader.IsDBNull(reader.GetOrdinal("APELLIDOMATERNO")) ? "" : reader.GetString(reader.GetOrdinal("APELLIDOMATERNO")),
                            ApePaterno = reader.IsDBNull(reader.GetOrdinal("APELLIDOPATERNO")) ? "" : reader.GetString(reader.GetOrdinal("APELLIDOPATERNO")),
                            Nombres = reader.IsDBNull(reader.GetOrdinal("NOMBRES")) ? "" : reader.GetString(reader.GetOrdinal("NOMBRES")),
                            Documento = reader.IsDBNull(reader.GetOrdinal("DOCUMENTO")) ? "" : reader.GetString(reader.GetOrdinal("DOCUMENTO")), 
                            Tipo_Documento = reader.IsDBNull(reader.GetOrdinal("TIPO_DOCUMENTO")) ? "" : reader.GetString(reader.GetOrdinal("TIPO_DOCUMENTO")),
                            Correo = reader.IsDBNull(reader.GetOrdinal("CORREO")) ? "" : reader.GetString(reader.GetOrdinal("CORREO")),
                            Telefono = reader.IsDBNull(reader.GetOrdinal("TELEFONO")) ? "" : reader.GetString(reader.GetOrdinal("TELEFONO")),
                            Zona = reader.IsDBNull(reader.GetOrdinal("ZONA")) ? "" : reader.GetString(reader.GetOrdinal("ZONA")),
                            DescZona = reader.IsDBNull(reader.GetOrdinal("UBIGEO")) ? "" : reader.GetString(reader.GetOrdinal("UBIGEO")),
                            Empresa = reader.IsDBNull(reader.GetOrdinal("EMPRESA")) ? "" : reader.GetString(reader.GetOrdinal("EMPRESA")),
                            NomTipoTecnico = reader.IsDBNull(reader.GetOrdinal("NOMTIPOTECNICO")) ? "" : reader.GetString(reader.GetOrdinal("NOMTIPOTECNICO")),
                            NomTipoDoc = reader.IsDBNull(reader.GetOrdinal("NOM_TIPO_DOCUMENTO")) ? "" : reader.GetString(reader.GetOrdinal("NOM_TIPO_DOCUMENTO")),
                            TipoTecnico = reader.IsDBNull(reader.GetOrdinal("TIPOTECNICO")) ? "" : reader.GetString(reader.GetOrdinal("TIPOTECNICO")),
                            Estado = reader.IsDBNull(reader.GetOrdinal("ESTADO")) ? false : reader.GetBoolean(reader.GetOrdinal("ESTADO"))
                        };
                        _tecnicos.Add(tecnico);
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

                    result.MantPreventivo = mant;
                    result.Tecnicos = _tecnicos;
                    result.Seguimiento = _listaSeguimiento;
                    result.Observaciones = _listaObservaciones;
                    result.Adjuntos = _listaAdjuntos;

                };
                connection.Close();
                return result;
            };
        }
        public GrupoPrevEquipoDTO ObtenerMainMant(long NumMant)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            var result = new GrupoPrevEquipoDTO();
            using(var connection = Factory.ConnectionSingle())
            {
                SqlCommand cmd;
                connection.Open();
                string query = "EXEC [USP_PREV_SEL_MANT] @IsNumMant =" + NumMant.ToString();
                cmd = new SqlCommand(query, connection);

                using (var reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    CabeceraMantDTO cabecera = new CabeceraMantDTO()
                    {
                        RazonSocial = reader.IsDBNull(reader.GetOrdinal("RAZONSOCIAL")) ? "" : reader.GetString(reader.GetOrdinal("RAZONSOCIAL")),
                        NumProceso = reader.IsDBNull(reader.GetOrdinal("NUMPROCESO")) ? "" : reader.GetString(reader.GetOrdinal("NUMPROCESO")),
                        TipoProceso = reader.IsDBNull(reader.GetOrdinal("TIPOPROCESO")) ? "" : reader.GetString(reader.GetOrdinal("TIPOPROCESO")),
                        OrdenCompra = reader.IsDBNull(reader.GetOrdinal("ORDENCOMPRA")) ? "" : reader.GetString(reader.GetOrdinal("ORDENCOMPRA")),
                        Ruc = reader.IsDBNull(reader.GetOrdinal("RUC")) ? "" : reader.GetString(reader.GetOrdinal("RUC")),
                        AsesorV = reader.IsDBNull(reader.GetOrdinal("ASESOR")) ? "" : reader.GetString(reader.GetOrdinal("ASESOR"))
                    };

                    reader.NextResult();
                    reader.Read();
                    EquipoPrevDTO equipo = new EquipoPrevDTO()
                    {
                        CodItem = reader.IsDBNull(reader.GetOrdinal("CODITEM")) ? "" : reader.GetString(reader.GetOrdinal("CODITEM")),
                        Descripcion = reader.IsDBNull(reader.GetOrdinal("DESCRIPCION")) ? "" : reader.GetString(reader.GetOrdinal("DESCRIPCION")),
                        DesMarca = reader.IsDBNull(reader.GetOrdinal("DESMARCA")) ? "" : reader.GetString(reader.GetOrdinal("DESMARCA")),
                        FechaInstalacion = reader.GetDateTime(reader.GetOrdinal("FECHAINSTALACION")),
                        Modelo = reader.IsDBNull(reader.GetOrdinal("MODELO")) ? "" : reader.GetString(reader.GetOrdinal("MODELO")), 
                        Serie = reader.IsDBNull(reader.GetOrdinal("SERIE")) ? "" : reader.GetString(reader.GetOrdinal("SERIE")),
                        Direccion = reader.IsDBNull(reader.GetOrdinal("DIRECCION")) ? "" : reader.GetString(reader.GetOrdinal("DIRECCION")),
                        UbigeoDest = reader.IsDBNull(reader.GetOrdinal("UBIGEODEST")) ? "" : reader.GetString(reader.GetOrdinal("UBIGEODEST")),
                        CodUbigeoDest = reader.IsDBNull(reader.GetOrdinal("CODUBIGEODEST")) ? "" : reader.GetString(reader.GetOrdinal("CODUBIGEODEST")),
                        NumFianza = reader.IsDBNull(reader.GetOrdinal("NUMFIANZA")) ? "" : reader.GetString(reader.GetOrdinal("NUMFIANZA")),
                        FianzaPP = reader.IsDBNull(reader.GetOrdinal("NUMFIANZAPP")) ? "" : reader.GetString(reader.GetOrdinal("NUMFIANZAPP")),
                        FianzaPA = reader.IsDBNull(reader.GetOrdinal("NUMFIANZAPA")) ? "" : reader.GetString(reader.GetOrdinal("NUMFIANZAPA")),
                        TotalPrev = reader.IsDBNull(reader.GetOrdinal("TOTALPREVE")) ? 0 : reader.GetInt32(reader.GetOrdinal("TOTALPREVE")),
                        PrevPendientes = reader.IsDBNull(reader.GetOrdinal("PENDIENTES")) ? 0 : reader.GetInt32(reader.GetOrdinal("PENDIENTES")),
                        PrevCompletados = reader.IsDBNull(reader.GetOrdinal("COMPLETADOS")) ? 0 : reader.GetInt32(reader.GetOrdinal("COMPLETADOS")),
                        ProxFechaMant = reader.IsDBNull(reader.GetOrdinal("PROXFECHAMANT")) ? "" : reader.GetString(reader.GetOrdinal("PROXFECHAMANT")),
                        FechaVencimientoGar = reader.GetDateTime(reader.GetOrdinal("FECHAVENCIMIENTOGAR")),
                        Periodo = reader.IsDBNull(reader.GetOrdinal("PERIODO")) ? "" : reader.GetString(reader.GetOrdinal("PERIODO")), 
                        GarantiaAdic = reader.IsDBNull(reader.GetOrdinal("GARANTIAADIC")) ? "" : reader.GetString(reader.GetOrdinal("GARANTIAADIC")),
                        Garantia= reader.IsDBNull(reader.GetOrdinal("GARANTIA")) ? "" : reader.GetString(reader.GetOrdinal("GARANTIA")),
                        DiasDiff = reader.IsDBNull(reader.GetOrdinal("DIFDIAS")) ? 0 : reader.GetInt32(reader.GetOrdinal("DIFDIAS")),
                        DiasTranscurridos = reader.IsDBNull(reader.GetOrdinal("DIASTRANCURRIDOS")) ? 0 : reader.GetInt32(reader.GetOrdinal("DIASTRANCURRIDOS")),
                    };

                    reader.NextResult();
                    List<MantPreventivoDTO> _preventivos = new List<MantPreventivoDTO>();
                    while (reader.Read()) 
                    {
                        var preventivo = new MantPreventivoDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("ID_DETALLE")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_DETALLE")),
                            Id_WorkFlow = reader.IsDBNull(reader.GetOrdinal("ID_WORKFLOW")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_WORKFLOW")),
                            FechaMantenimiento = reader.GetDateTime(reader.GetOrdinal("FECHAMANTENIMIENTO")),
                            CodEstado = reader.IsDBNull(reader.GetOrdinal("CODESTADO")) ? "" : reader.GetString(reader.GetOrdinal("CODESTADO")),
                            Estado = reader.IsDBNull(reader.GetOrdinal("ESTADO")) ? "" : reader.GetString(reader.GetOrdinal("ESTADO"))
                        };
                        _preventivos.Add(preventivo);
                    }

                    result.CabeceraCot = cabecera;
                    result.CabeceraEquipo = equipo;
                    result.MantenimientosPreventivos = _preventivos;
                }
                return result;
            }
        }

        public GrupoPrevEquipoDTO ObtenerMainMigrado(long NumMant)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            var result = new GrupoPrevEquipoDTO();
            using (var connection = Factory.ConnectionSingle())
            {
                SqlCommand cmd;
                connection.Open();
                string query = "EXEC [USP_PREV_SEL_MAIN_PREVENTIVOS_MIGRA] @IsNumMant =" + NumMant.ToString();
                cmd = new SqlCommand(query, connection);

                using (var reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    CabeceraMantDTO cabecera = new CabeceraMantDTO()
                    {
                        RazonSocial = reader.IsDBNull(reader.GetOrdinal("NOMEMPRESA")) ? "" : reader.GetString(reader.GetOrdinal("NOMEMPRESA")),
                        NumProceso = reader.IsDBNull(reader.GetOrdinal("PROCESO")) ? "" : reader.GetString(reader.GetOrdinal("PROCESO")),
                        Ruc = reader.IsDBNull(reader.GetOrdinal("RUC")) ? "" : reader.GetString(reader.GetOrdinal("RUC"))
                    };

                    reader.NextResult();
                    reader.Read();
                    EquipoPrevDTO equipo = new EquipoPrevDTO()
                    {
                        CodItem = reader.IsDBNull(reader.GetOrdinal("CODITEM")) ? "" : reader.GetString(reader.GetOrdinal("CODITEM")),
                        Descripcion = reader.IsDBNull(reader.GetOrdinal("DESC_EQUIPO")) ? "" : reader.GetString(reader.GetOrdinal("DESC_EQUIPO")),
                        DesMarca = reader.IsDBNull(reader.GetOrdinal("MARCA")) ? "" : reader.GetString(reader.GetOrdinal("MARCA")),
                        FechaInstalacion = reader.GetDateTime(reader.GetOrdinal("FECHA_INSTAL")),
                        Modelo = reader.IsDBNull(reader.GetOrdinal("MODELO")) ? "" : reader.GetString(reader.GetOrdinal("MODELO")),
                        Serie = reader.IsDBNull(reader.GetOrdinal("SERIE")) ? "" : reader.GetString(reader.GetOrdinal("SERIE")),
                        UbigeoDest = reader.IsDBNull(reader.GetOrdinal("DESTINO")) ? "" : reader.GetString(reader.GetOrdinal("DESTINO")),
                        TotalPrev = reader.IsDBNull(reader.GetOrdinal("TOTAL_PREV")) ? 0 : reader.GetInt32(reader.GetOrdinal("TOTAL_PREV")),
                        PrevPendientes = reader.IsDBNull(reader.GetOrdinal("PEND_PREV")) ? 0 : reader.GetInt32(reader.GetOrdinal("PEND_PREV")),
                        PrevCompletados = reader.IsDBNull(reader.GetOrdinal("EJEC_PREV")) ? 0 : reader.GetInt32(reader.GetOrdinal("EJEC_PREV")),
                        FechaVencimientoGar = reader.GetDateTime(reader.GetOrdinal("FECHA_FIN_GAR")),
                        Garantia = reader.IsDBNull(reader.GetOrdinal("CODGARANTIA")) ? "" : reader.GetString(reader.GetOrdinal("CODGARANTIA")),
                        Periodo = reader.IsDBNull(reader.GetOrdinal("CODPERIODO")) ? "" : reader.GetString(reader.GetOrdinal("CODPERIODO")),
                        DiasDiff = reader.IsDBNull(reader.GetOrdinal("DIFDIAS")) ? 0 : reader.GetInt32(reader.GetOrdinal("DIFDIAS")),
                        DiasTranscurridos = reader.IsDBNull(reader.GetOrdinal("DIASTRANCURRIDOS")) ? 0 : reader.GetInt32(reader.GetOrdinal("DIASTRANCURRIDOS")),
                        Observacion = reader.IsDBNull(reader.GetOrdinal("OBSERVACION")) ? "" : reader.GetString(reader.GetOrdinal("OBSERVACION"))
                    };

                    reader.NextResult();
                    List<MantPreventivoDTO> _preventivos = new List<MantPreventivoDTO>();
                    while (reader.Read())
                    {
                        var preventivo = new MantPreventivoDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("ID")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID")),
                            Id_WorkFlow = reader.IsDBNull(reader.GetOrdinal("ID_WORKFLOW")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_WORKFLOW")),
                            FechaMantenimiento = reader.GetDateTime(reader.GetOrdinal("FECHAMANTENIMIENTO")),
                            CodEstado = reader.IsDBNull(reader.GetOrdinal("CODESTADO")) ? "" : reader.GetString(reader.GetOrdinal("CODESTADO")),
                            Estado = reader.IsDBNull(reader.GetOrdinal("ESTADO")) ? "" : reader.GetString(reader.GetOrdinal("ESTADO"))
                        };
                        _preventivos.Add(preventivo);
                    }

                    result.CabeceraCot = cabecera;
                    result.CabeceraEquipo = equipo;
                    result.MantenimientosPreventivos = _preventivos;
                }
                return result;
            }
        }

        public RespuestaDTO MantPrevMigrados(GrupoPrevEquipoDTO req)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("IsTipoProceso", req.TipoProceso);
                parameters.Add("IsID_MANT", req.CabeceraEquipo.Id_Mant);
                parameters.Add("IsSERIE", req.CabeceraEquipo.Serie);
                parameters.Add("IsDESC_EQUIPO",req.CabeceraEquipo.Descripcion);
                parameters.Add("IsCODEQUIPO_NUEVO", req.CabeceraEquipo.CodItem);
                parameters.Add("IsMARCA",req.CabeceraEquipo.DesMarca);
                parameters.Add("IsMODELO",req.CabeceraEquipo.Modelo);
                parameters.Add("IsCODGARANTIA_NUEVO", req.CabeceraEquipo.Garantia);
                parameters.Add("IsFECHA_FIN_GAR",req.CabeceraEquipo.FechaVencimientoGar);
                parameters.Add("IsCODPERIODO",req.CabeceraEquipo.Periodo);
                parameters.Add("IsTOTAL_PREV",req.CabeceraEquipo.TotalPrev);
                parameters.Add("IsEJEC_PREV",req.CabeceraEquipo.PrevCompletados);
                parameters.Add("IsPEND_PREV",req.CabeceraEquipo.PrevPendientes);
                parameters.Add("IsFECHA_INSTAL",req.CabeceraEquipo.FechaInstalacion);
                parameters.Add("IsNOMEMPRESA",req.CabeceraCot.RazonSocial);
                parameters.Add("IsRUC_NUEVO",req.CabeceraCot.Ruc);
                parameters.Add("IsPROCESO",req.CabeceraCot.NumProceso);
                parameters.Add("IsNOM_DESTINO",req.CabeceraEquipo.UbigeoDest);
                parameters.Add("IsUsrEjecuta",req.UsuarioRegistra);

                var result = connection.Query(
                    sql: "USP_MANT_MIGRADOS"
                    , param: parameters
                    , commandType: CommandType.StoredProcedure
                    ).Select(s => s as IDictionary<string, object>
                    ).Select(i => new RespuestaDTO()
                    {
                        Codigo = i.Single(d => d.Key.Equals("COD")).Value.Parse<int>(),
                        Mensaje = i.Single( d => d.Key.Equals("MSG")).Value.Parse<string>()
                    }).FirstOrDefault();
                connection.Close();
                return result;
            }
        }

        public RespuestaDTO GenerarCronograma(EquipoPrevDTO equipo)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using ( var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("IsID_MANT", equipo.Id_Mant );
                parameters.Add("IsFECHA_INSTAL", equipo.FechaInstalacion);
                parameters.Add("IsSERIE", equipo.Serie);
                parameters.Add("IsCODPERIODO", equipo.Periodo);
                parameters.Add("IsTOTAL_PREV", equipo.TotalPrev);
                parameters.Add("IsEJEC_PREV", equipo.PrevCompletados);
                parameters.Add("IsUsrEjecuta", equipo.UsuarioRegistra);

                var result = connection.Query(
                    sql: "USP_PREV_GENERA_CRONOGRAMA"
                    , param: parameters
                    , commandType: CommandType.StoredProcedure
                    ).Select(s => s as IDictionary<string, object>)
                    .Select(i => new RespuestaDTO()
                    {
                        Codigo = i.Single(d => d.Key.Equals("COD")).Value.Parse<int>(),
                        Mensaje = i.Single(d => d.Key.Equals("MSG")).Value.Parse<string>()
                    }).FirstOrDefault();

                connection.Close();

                return result;
            }

        }
    }
}
