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
using static AHSECO.CCL.COMUN.ConstantesDTO;
using System.Net;
using System.Diagnostics.Eventing.Reader;
using System.Security.Cryptography;
using System.Xml.Linq;
using System.Data.Common;
using Microsoft.Win32;

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


                    result.Periodos = _periodos;
                    result.Empresas = _listEmpresa;
                    result.Estados = _Estados;
                    result.Clientes = _Clientes;
                    result.TipVenta = _tiposVenta;
                    result.TipoEmpleado = _tipoEmpleado;
                    result.Garantias = _garantias;

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
                parameters.Add("IsTipVenta", filtros.TipoVenta);
                parameters.Add("IsNumProceso", filtros.NroProceso);
                parameters.Add("IsNumContrato", filtros.Contrato);
                parameters.Add("IsNumOrdenCompra", filtros.OrdenCompra); //pendiente de añadir en ventas
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
                        NombreContacto = i.Single(d => d.Key.Equals("NOMBRECONTACTO")).Value.Parse<string>(),
                        TelefonoContacto = i.Single(d => d.Key.Equals("TELEFONOCONTACTO")).Value.Parse<string>(),
                        CargoContacto = i.Single(d => d.Key.Equals("CARGOCONTACTO")).Value.Parse<string>(),
                        Establecimiento = i.Single(d => d.Key.Equals("ESTABLECIMIENTO")).Value.Parse<string>(),
                        TipoVenta = i.Single(d => d.Key.Equals("TIPOVENTA")).Value.Parse<string>(),
                        Vendedor = i.Single(d => d.Key.Equals("VENDEDOR")).Value.Parse<string>(),
                        CodEmpresa = i.Single(d => d.Key.Equals("CODEMPRESA")).Value.Parse<string>(),
                        FechaMax = i.Single(d => d.Key.Equals("FECHAMAX")).Value.Parse<DateTime>(),
                        Destino = i.Single(d => d.Key.Equals("DESTINOS")).Value.Parse<string>(),
                        Estado = i.Single(d => d.Key.Equals("ESTADO")).Value.Parse<string>(),
                        CodEstado = i.Single(d => d.Key.Equals("CODESTADO")).Value.Parse<string>(),
                        FecRegFormat = i.Single(d => d.Key.Equals("FECREGISTRO")).Value.Parse<string>(),
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
                            Id = reader.IsDBNull(reader.GetOrdinal("ID_DETALLECOTIZ")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_DETALLECOTIZ")),
                            NumReq = reader.IsDBNull(reader.GetOrdinal("NUMREQ")) ? 0 : reader.GetInt64(reader.GetOrdinal("NUMREQ")),
                            CodProducto = reader.IsDBNull(reader.GetOrdinal("CODIGOPRODUCTO")) ? "" : reader.GetString(reader.GetOrdinal("CODIGOPRODUCTO")),
                            DescProducto = reader.IsDBNull(reader.GetOrdinal("DESCRIPCION")) ? "" : reader.GetString(reader.GetOrdinal("DESCRIPCION")),
                            Cantidad = reader.IsDBNull(reader.GetOrdinal("CANTIDAD")) ? 0 : reader.GetInt32(reader.GetOrdinal("CANTIDAD")),
                            Marca = reader.IsDBNull(reader.GetOrdinal("MARCA")) ? "" : reader.GetString(reader.GetOrdinal("MARCA")),
                            NumFianza = reader.IsDBNull(reader.GetOrdinal("NUMFIANZA")) ? "" : reader.GetString(reader.GetOrdinal("NUMFIANZA")),
                            //IndLLaveMano = reader.GetString(reader.GetOrdinal("INDLLAVEMANO")) == "S" ? true : false,
                            Dimensiones = reader.IsDBNull(reader.GetOrdinal("DIMENSIONES")) ? "" : reader.GetString(reader.GetOrdinal("DIMENSIONES")),
                            MontoPrestAcc = reader.IsDBNull(reader.GetOrdinal("MONTOPACCE")) ? 0 : reader.GetDecimal(reader.GetOrdinal("MONTOPACCE")),
                            MontoPrestPrin = reader.IsDBNull(reader.GetOrdinal("MONTOPPRINC")) ? 0 : reader.GetDecimal(reader.GetOrdinal("MONTOPPRINC")),
                            //FecLimInsta = reader.GetDateTime(reader.GetOrdinal("FECLIMINSTA"))
                        };
                        result.Add(detalleDTO);
                    };

                    reader.NextResult();
                    List<ElementosxProductoDTO> _elementos = new List<ElementosxProductoDTO>();
                    while (reader.Read())
                    {
                        var elemento = new ElementosxProductoDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("ID")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID")),
                            Id_Detalle = reader.IsDBNull(reader.GetOrdinal("ID_DETALLECOTIZ")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_DETALLECOTIZ")),
                            Id_Despacho = reader.IsDBNull(reader.GetOrdinal("ID_DESPACHO_DIST")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_DESPACHO_DIST")),
                            CodProduct = reader.IsDBNull(reader.GetOrdinal("CODIGOPRODUCTO")) ? "" : reader.GetString(reader.GetOrdinal("CODIGOPRODUCTO")),
                            DescProduct = reader.IsDBNull(reader.GetOrdinal("DESCRIPCION")) ? "" : reader.GetString(reader.GetOrdinal("DESCRIPCION")),
                            Marca = reader.IsDBNull(reader.GetOrdinal("MARCA")) ? "" : reader.GetString(reader.GetOrdinal("MARCA")),
                            Serie = reader.IsDBNull(reader.GetOrdinal("SERIE")) ? "" : reader.GetString(reader.GetOrdinal("SERIE")),
                            CantPreventivo = reader.IsDBNull(reader.GetOrdinal("CANTIDADMP")) ? 0 : reader.GetInt32(reader.GetOrdinal("CANTIDADMP")),
                            CodCicloPreventivo = reader.IsDBNull(reader.GetOrdinal("PERIODICIDAD")) ? "" : reader.GetString(reader.GetOrdinal("PERIODICIDAD")),
                            CodUbigeoDestino = reader.IsDBNull(reader.GetOrdinal("CODUBIGEODEST")) ? "" : reader.GetString(reader.GetOrdinal("CODUBIGEODEST")),
                            DescUbigeoDestino = reader.IsDBNull(reader.GetOrdinal("DESCUBIGEODEST")) ? "" : reader.GetString(reader.GetOrdinal("DESCUBIGEODEST")),
                            Direccion = reader.IsDBNull(reader.GetOrdinal("DIRECCION")) ? "" : reader.GetString(reader.GetOrdinal("DIRECCION")),
                            NroPiso = reader.IsDBNull(reader.GetOrdinal("NROPISO")) ? 0 : reader.GetInt32(reader.GetOrdinal("NROPISO")),
                            NombreCompletoTecnico = reader.IsDBNull(reader.GetOrdinal("NOMBRECOMPLETO")) ? "" : reader.GetString(reader.GetOrdinal("NOMBRECOMPLETO")),
                            Empresa = reader.IsDBNull(reader.GetOrdinal("EMPRESA")) ? "" : reader.GetString(reader.GetOrdinal("EMPRESA")),
                            FechaProgramacion = reader.IsDBNull(reader.GetOrdinal("FECHAPROGRAMACION")) ? "" : reader.GetString(reader.GetOrdinal("FECHAPROGRAMACION")),
                            FechaInstalacion = reader.IsDBNull(reader.GetOrdinal("FECHAINSTALACION")) ? "" : reader.GetString(reader.GetOrdinal("FECHAINSTALACION")),
                        };
                        _elementos.Add(elemento);
                    };
                    foreach(var item in result)
                    {
                        var listElementos = _elementos.FindAll(elemento => elemento.Id_Detalle == item.Id);
                        item.Elementos = listElementos;
                    };
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
                            ApellidoPaterno = reader.IsDBNull(reader.GetOrdinal("APELLIDOPATERNO")) ? "" : reader.GetString(reader.GetOrdinal("APELLIDOPATERNO")),
                            ApellidoMaterno = reader.IsDBNull(reader.GetOrdinal("APELLIDOMATERNO")) ? "" : reader.GetString(reader.GetOrdinal("APELLIDOMATERNO")),
                            Documento = reader.IsDBNull(reader.GetOrdinal("DOCUMENTO")) ? "" : reader.GetString(reader.GetOrdinal("DOCUMENTO")),
                            TipDocumento = reader.IsDBNull(reader.GetOrdinal("TIPO_DOCUMENTO")) ? "" : reader.GetString(reader.GetOrdinal("TIPO_DOCUMENTO")),
                            Empresa = reader.IsDBNull(reader.GetOrdinal("EMPRESA")) ? "" : reader.GetString(reader.GetOrdinal("EMPRESA")),
                            Nom_TipDocumento = reader.IsDBNull(reader.GetOrdinal("NOM_TIPO_DOCUMENTO")) ? "" : reader.GetString(reader.GetOrdinal("NOM_TIPO_DOCUMENTO")),
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
                parameters.Add("CODEMPRESA", instalacion.CodEmpresa);
                parameters.Add("RUCEMPRESA", instalacion.RucEmpresa);
                parameters.Add("NOMEMPRESA", instalacion.NomEmpresa);
                parameters.Add("UBICACION", instalacion.Ubicacion);
                parameters.Add("NOMBRECONTACTO", instalacion.NombreContacto);
                parameters.Add("TELEFONOCONTACTO", instalacion.TelefonoContacto);
                parameters.Add("CARGOCONTACTO", instalacion.CargoContacto);
                parameters.Add("ESTABLECIMIENTO", instalacion.Establecimiento);
                parameters.Add("TIPOVENTA", instalacion.TipoVenta);
                parameters.Add("ORDENCOMPRA", instalacion.OrdenCompra);          //pendiente de crear en solicitud ventas
                parameters.Add("NUMPROCESO", instalacion.NroProceso);
                parameters.Add("TIPOPROCESO", instalacion.TipoProcesoVenta);
                parameters.Add("CONTRATO", instalacion.Contrato);               //pendiente de crear en solicitud ventas
                parameters.Add("VENDEDOR", instalacion.Vendedor);
                parameters.Add("FECHAMAX", instalacion.FechaMax);
                parameters.Add("DESTINO", instalacion.Destino);
                parameters.Add("ESTADO", instalacion.Estado);
                parameters.Add("GARANTIA", instalacion.Garantia);
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
            var result = new RespuestaDTO();
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();

                foreach( var elemento in detalle.Elementos)
                {
                    parameters.Add("IsTipoProceso", detalle.TipoProceso);
                    parameters.Add("IsID_DETALLECOTIZ", detalle.Id);
                    parameters.Add("IsNUMREQ", detalle.NumReq);
                    parameters.Add("IsCODIGOPRODUCTO", detalle.CodProducto);
                    parameters.Add("IsDESCRIPCION", detalle.DescProducto);
                    parameters.Add("IsCANTIDAD", detalle.Cantidad);
                    parameters.Add("IsMARCA", detalle.Marca);
                    parameters.Add("IsNUMFIANZA", detalle.NumFianza);
                    //parameters.Add("IsINDLLAVEMANO", detalle.IndLLaveMano == true ? "S" : "N");
                    //parameters.Add("IsFECLIMINSTA", detalle.FecLimInsta);
                    parameters.Add("IsINDFIANZA", detalle.IndFianza == true ? "S" : "N");
                    parameters.Add("IsMONTOPPRINC", detalle.MontoPrestPrin);
                    parameters.Add("IsMONTOPACCE", detalle.MontoPrestAcc);
                    parameters.Add("UsrEjecuta", detalle.UsuarioRegistra);
                    parameters.Add("IsDIMENSIONES", detalle.Dimensiones);
                    parameters.Add("IsID", elemento.Id);
                    parameters.Add("IsID_DESPACHO_DIST", elemento.Id_Despacho);
                    parameters.Add("IsSERIE", elemento.Serie);
                    parameters.Add("IsCANTIDADMP", elemento.CantPreventivo);
                    parameters.Add("IsPERIODICIDAD", elemento.CodCicloPreventivo);
                    parameters.Add("IsCODUBIGEODEST", elemento.CodUbigeoDestino);
                    parameters.Add("IsDIRECCION", elemento.Direccion);
                    parameters.Add("IsNROPISO", elemento.NroPiso);

                    result = connection.Query(
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
                }
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
                parameters.Add("IsNOMBRES", tecnico.NombreTecnico);
                parameters.Add("IsAPELLIDOPATERNO", tecnico.ApellidoPaterno);
                parameters.Add("IsAPELLIDOMATERNO", tecnico.ApellidoMaterno);
                parameters.Add("IsDOCUMENTO",tecnico.Documento);
                parameters.Add("IsTIP_DOCUMENTO", tecnico.TipDocumento);
                parameters.Add("IsCORREO",tecnico.Correo);
                parameters.Add("IsTELEFONO",tecnico.Telefono);
                parameters.Add("IsZONA",tecnico.Zona);
                parameters.Add("IsEmpresa", tecnico.Empresa);
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
        
        public RespuestaDTO SetDatosElementos(ElementosxProductoDTO elemento)
        {
            using(var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                    parameters.Add("IsTipoProceso", elemento.TipoProceso);
                    parameters.Add("IsID_DESPACHO", elemento.Id);
                    parameters.Add("IsFECHAPROGRAMACION", elemento.FechaProgramacion);
                    parameters.Add("IsFECHAINSTALACION", elemento.FechaInstalacion);
                    parameters.Add("IsCODTECNICO", elemento.CodTecnico);
                    parameters.Add("IsEMPRESA", elemento.Empresa);
                    parameters.Add("IsUSR_MOD", elemento.UsuarioModifica);

                    var result = connection.Query(
                        sql: "USP_MANT_DATOS_INSTALL",
                        param: parameters,
                        commandType: CommandType.StoredProcedure)
                        .Select(s => s as IDictionary<string, object>)
                        .Select(i => new RespuestaDTO
                        {
                            Codigo = i.Single(d => d.Key.Equals("COD")).Value.Parse<int>(),
                            Mensaje = i.Single(d => d.Key.Equals("MSG")).Value.Parse<string>()
                        }).FirstOrDefault();
                    result.Codigo = ValidadorEstado(result.Codigo);
                    return result;
            }
        }

        public int ValidadorEstado(int IdDespacho)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using(var connection = Factory.ConnectionFactory())
            {
                int codigo;
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("IsIdDespacho", IdDespacho);

                var result = connection.Query(
                    sql: "USP_SEL_INSTALL_ESTADO",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => codigo = i.Single(d => d.Key.Equals("COD")).Value.Parse<int>()).FirstOrDefault();

                return result;
            }
        }

        //public RespuestaDTO AsignaTecnico(ElementosxProductoDTO elemento)
        //{
        //    using (var connection = Factory.ConnectionFactory())
        //    {
        //        connection.Open();
        //        var result = new List<RespuestaDTO>();
        //        var parameters = new DynamicParameters();
        //        parameters.Add("IsTipoProceso", elemento.TipoProceso);
        //        parameters.Add("IsID_DESPACHO", elemento.Id);
        //        parameters.Add("IsFECHAPROGRAMACION", elemento.FechaProgramacion);
        //        parameters.Add("IsFECHAINSTALACION", elemento.FechaInstalacion);
        //        parameters.Add("IsCODTECNICO", elemento.CodTecnico);
        //        parameters.Add("IsUSR_MOD", elemento.UsuarioModifica);


        //        foreach (var i in elemento.Id_DespachoList)
        //        {
        //            parameters.Add("IsTipoProceso", elemento.TipoProceso);
        //            parameters.Add("IsID_DESPACHO", i);
        //            parameters.Add("IsFECHAPROGRAMACION", elemento.FechaProgramacion);
        //            parameters.Add("IsFECHAINSTALACION", elemento.FechaInstalacion);
        //            parameters.Add("IsCODTECNICO", elemento.CodTecnico);
        //            parameters.Add("IsUSR_MOD", elemento.UsuarioModifica);

        //            var rpta = connection.Query(
        //            sql: "USP_MANT_DATOS_INSTALL",
        //            param: parameters,
        //            commandType: CommandType.StoredProcedure)
        //            .Select(s => s as IDictionary<string, object>)
        //            .Select(f => new RespuestaDTO
        //            {
        //                Codigo = f.Single(d => d.Key.Equals("COD")).Value.Parse<int>(),
        //                Mensaje = f.Single(d => d.Key.Equals("MSG")).Value.Parse<string>()
        //            }).FirstOrDefault();
        //            result.Add(rpta);
        //        };
        //        return result.FirstOrDefault();
        //    }
        //}

        public IEnumerable<InstalacionTecnicaDetalleDTO> ObtenerElementosdeProducto(long IdProducto)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using ( var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("IsCodigoProductoPadre", IdProducto);

                var result = connection.Query(
                    sql: "USP_SEL_ITEC_PRODUCTOS",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new InstalacionTecnicaDetalleDTO
                    {

                    });

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
                parameters.Add("IsTipoIngreso", "3");

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
                        TipoVenta = i.Single(d => d.Key.Equals("TIPOVENTA")).Value.Parse<string>(),
                        NombreTipoVenta = i.Single(d => d.Key.Equals("NOMTIPOVENTA")).Value.Parse<string>(),
                        NomTipoSol = i.Single(d => d.Key.Equals("TIPO")).Value.Parse<string>(),
                        Tipo_Sol = i.Single(d => d.Key.Equals("CODTIPOSOL")).Value.Parse<string>(),
                        Fecha_Sol = i.Single(d => d.Key.Equals("FECHA_SOL")).Value.Parse<string>(),
                        nomEstado = i.Single(d => d.Key.Equals("NOM_ESTADO")).Value.Parse<string>(),
                        Id_WorkFlow = i.Single(d => d.Key.Equals("ID_WORKFLOW")).Value.Parse<long>(),
                        Cod_MedioCont = i.Single(d => d.Key.Equals("COD_MEDIOCONT")).Value.Parse<string>(),
                        IdCliente = i.Single(d => d.Key.Equals("IDCLIENTE")).Value.Parse<int>(),
                        RUC = i.Single(d => d.Key.Equals("RUC")).Value.Parse<string>(),
                        RazonSocial = i.Single(d => d.Key.Equals("RAZONSOCIAL")).Value.Parse<string>(),
                        AsesorVenta = i.Single(d => d.Key.Equals("ASESORVENTA")).Value.Parse<string>(),
                        NroProceso = i.Single(d => d.Key.Equals("NROPROCESO")).Value.Parse<string>(),
                        TipoProceso = i.Single(d => d.Key.Equals("TIPOPROCESO")).Value.Parse<string>(),
                    });
                connection.Close();
                return result;
            };
        }
        public GrupoSolicitudVentaTecDTO ObtenerDetalleSolicitud(long id)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using ( var connection = Factory.ConnectionSingle())
            {
                var parameters = new DynamicParameters();

                SqlCommand command;
                var result = new GrupoSolicitudVentaTecDTO();
                string query = "exec USP_SEL_SOLICITUD_INSTALL_TEC @isIdSolicitud=" + id;
                connection.Open();
                command = new SqlCommand(query, connection);

                using (var reader = command.ExecuteReader())
                {

                    reader.Read();
                    SolicitudVentaTecDTO solicitud = new SolicitudVentaTecDTO
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
                        NombreContacto = reader.IsDBNull(reader.GetOrdinal("NOMBRECONTACTO")) ? "" : reader.GetString(reader.GetOrdinal("NOMBRECONTACTO")),
                        TelefonoContacto = reader.IsDBNull(reader.GetOrdinal("TELEFONOCONTACTO")) ? "" : reader.GetString(reader.GetOrdinal("TELEFONOCONTACTO")),
                        Garantia = reader.IsDBNull(reader.GetOrdinal("GARANTIA")) ? "" : reader.GetString(reader.GetOrdinal("GARANTIA")),
                        Establecimiento = reader.IsDBNull(reader.GetOrdinal("ESTABLECIMIENTO")) ? "" : reader.GetString(reader.GetOrdinal("ESTABLECIMIENTO")),
                        CargoContacto = reader.IsDBNull(reader.GetOrdinal("CARGOCONTACTO")) ? "" : reader.GetString(reader.GetOrdinal("CARGOCONTACTO")),
                        TipoVenta = reader.IsDBNull(reader.GetOrdinal("TIPOVENTA")) ? "" : reader.GetString(reader.GetOrdinal("TIPOVENTA")),
                        Fecha_Sol = reader.IsDBNull(reader.GetOrdinal("FECHA_SOL")) ? "" : reader.GetString(reader.GetOrdinal("FECHA_SOL")),
                        nomEstado = reader.IsDBNull(reader.GetOrdinal("ESTADO")) ? "" : reader.GetString(reader.GetOrdinal("ESTADO")),
                        NroProceso = reader.IsDBNull(reader.GetOrdinal("NROPROCESO")) ? "" : reader.GetString(reader.GetOrdinal("NROPROCESO")),
                        TipoProceso = reader.IsDBNull(reader.GetOrdinal("TIPOPROCESO")) ? "" : reader.GetString(reader.GetOrdinal("TIPOPROCESO")),
                        FechaMaxima = reader.IsDBNull(reader.GetOrdinal("FECHAMAX")) ? "" : reader.GetString(reader.GetOrdinal("FECHAMAX"))

                    };
                    reader.NextResult();

                    List<CotizacionDetalleTecDTO> _detalleCotizacion = new List<CotizacionDetalleTecDTO>();
                    while (reader.Read())
                    {
                        var cotDetalle = new CotizacionDetalleTecDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("ID")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID")),
                            CodItem = reader.IsDBNull(reader.GetOrdinal("CODIGOPRODUCTO")) ? "" : reader.GetString(reader.GetOrdinal("CODIGOPRODUCTO")),
                            Descripcion = reader.IsDBNull(reader.GetOrdinal("DESCRIPCION")) ? "" : reader.GetString(reader.GetOrdinal("DESCRIPCION")),
                            Marca = reader.IsDBNull(reader.GetOrdinal("DESMARCA")) ? "" : reader.GetString(reader.GetOrdinal("DESMARCA")),
                            Cantidad = reader.IsDBNull(reader.GetOrdinal("CANTIDAD")) ? 0 : reader.GetInt32(reader.GetOrdinal("CANTIDAD")),
                            IndFianza = reader.GetString(reader.GetOrdinal("INDFIANZA")) == "S" ? true : false,
                            NumFianza = reader.IsDBNull(reader.GetOrdinal("NUMFIANZA")) ? "" : reader.GetString(reader.GetOrdinal("NUMFIANZA")),
                            //GarantiaAdicional = reader.IsDBNull(reader.GetOrdinal("GARANTIAADIC")) ? "" : reader.GetString(reader.GetOrdinal("GARANTIAADIC")),
                            //IndLLaveMano = reader.GetString(reader.GetOrdinal("INDLLAVEMANO")) == "S" ? true : false,
                            Dimensiones = reader.IsDBNull(reader.GetOrdinal("DIMENSIONES")) ? "" : reader.GetString(reader.GetOrdinal("DIMENSIONES")),
                            //IndRequierePlaca = reader.GetString(reader.GetOrdinal("INDREQUIEREPLACA")) == "S" ? true : false,
                            MontoPrestPrin = reader.IsDBNull(reader.GetOrdinal("MONTOPPRINC")) ? 0 : reader.GetDecimal(reader.GetOrdinal("MONTOPPRINC")),
                            MontoPrestAcc = reader.IsDBNull(reader.GetOrdinal("MONTOPACCE")) ? 0 : reader.GetDecimal(reader.GetOrdinal("MONTOPACCE")),
                            //FecLimInsta = reader.GetDateTime(reader.GetOrdinal("FECLIMINSTA"))
                            NumInstalados = reader.IsDBNull(reader.GetOrdinal("NUM_INST")) ? 0 : reader.GetInt32(reader.GetOrdinal("NUM_INST")),
                            NumProgramados = reader.IsDBNull(reader.GetOrdinal("NUM_PROG")) ? 0 : reader.GetInt32(reader.GetOrdinal("NUM_PROG")),
                        };
                        _detalleCotizacion.Add(cotDetalle);
                    }

                    reader.NextResult();
                    List<ElementosxProductoDTO> _elementos = new List<ElementosxProductoDTO>();
                    while (reader.Read())
                    {
                        ElementosxProductoDTO elemento = new ElementosxProductoDTO
                        {
                            Id_Detalle = reader.IsDBNull(reader.GetOrdinal("ID_DETALLE")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_DETALLE")),
                            Id_Despacho = reader.IsDBNull(reader.GetOrdinal("ID_DESPACHO")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_DESPACHO")),
                            CodProduct = reader.IsDBNull(reader.GetOrdinal("CODIGOPRODUCTO")) ? "" : reader.GetString(reader.GetOrdinal("CODIGOPRODUCTO")),
                            DescProduct = reader.IsDBNull(reader.GetOrdinal("DESCRIPCION")) ? "" : reader.GetString(reader.GetOrdinal("DESCRIPCION")),
                            Marca = reader.IsDBNull(reader.GetOrdinal("DESMARCA")) ? "" : reader.GetString(reader.GetOrdinal("DESMARCA")),
                            Serie = reader.IsDBNull(reader.GetOrdinal("NUMSERIE")) ? "" : reader.GetString(reader.GetOrdinal("NUMSERIE")),
                            NumSec = reader.IsDBNull(reader.GetOrdinal("NUMSEC")) ? 0 : reader.GetInt32(reader.GetOrdinal("NUMSEC")),
                            CantPreventivo = reader.IsDBNull(reader.GetOrdinal("CANTPREVENTIVO")) ? 0 : reader.GetInt32(reader.GetOrdinal("CANTPREVENTIVO")),
                            CodCicloPreventivo = reader.IsDBNull(reader.GetOrdinal("CODCICLOPREVENT")) ? "" : reader.GetString(reader.GetOrdinal("CODCICLOPREVENT")),
                            CodUbigeoDestino = reader.IsDBNull(reader.GetOrdinal("CODUBIGEODEST")) ? "" : reader.GetString(reader.GetOrdinal("CODUBIGEODEST")),
                            DescUbigeoDestino = reader.IsDBNull(reader.GetOrdinal("DESCUBIGEODEST")) ? "" : reader.GetString(reader.GetOrdinal("DESCUBIGEODEST")),
                            Direccion = reader.IsDBNull(reader.GetOrdinal("DIRECCION")) ? "" : reader.GetString(reader.GetOrdinal("DIRECCION")),
                            NroPiso = reader.IsDBNull(reader.GetOrdinal("NROPISO")) ? 0: reader.GetInt32(reader.GetOrdinal("NROPISO")),
                        };
                        _elementos.Add(elemento);
                    }

                    result.Solicitud = solicitud;
                    result.DetalleCotizacion = _detalleCotizacion;
                    result.ElementosDeProducto = _elementos;
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
                        ,OrdenCompra = reader.IsDBNull(reader.GetOrdinal("ORDENCOMPRA")) ? "" : reader.GetString(reader.GetOrdinal("ORDENCOMPRA"))
                        ,NroProceso = reader.IsDBNull(reader.GetOrdinal("NUMPROCESO")) ? "" : reader.GetString(reader.GetOrdinal("NUMPROCESO"))
                        ,TipoProceso = reader.IsDBNull(reader.GetOrdinal("TIPOPROCESO")) ? "" : reader.GetString(reader.GetOrdinal("TIPOPROCESO"))
                        ,Contrato = reader.IsDBNull(reader.GetOrdinal("CONTRATO")) ? "" : reader.GetString(reader.GetOrdinal("CONTRATO"))
                        ,TipoVenta = reader.IsDBNull(reader.GetOrdinal("CODTIPOVENTA")) ? "" : reader.GetString(reader.GetOrdinal("CODTIPOVENTA"))
                        ,Vendedor = reader.IsDBNull(reader.GetOrdinal("VENDEDOR")) ? "" : reader.GetString(reader.GetOrdinal("VENDEDOR"))
                        ,CodEmpresa = reader.IsDBNull(reader.GetOrdinal("CODEMPRESA")) ? "" : reader.GetString(reader.GetOrdinal("CODEMPRESA"))
                        ,FechaMax = reader.GetDateTime(reader.GetOrdinal("FECHAMAX")) // reader.IsDBNull(reader.GetOrdinal("FECHAMAX")) ? "" : reader.GetString(reader.GetOrdinal("FECHAMAX"))
                        ,Destino = reader.IsDBNull(reader.GetOrdinal("DESTINO")) ? "" : reader.GetString(reader.GetOrdinal("DESTINO"))
                        ,Estado = reader.IsDBNull(reader.GetOrdinal("ESTADO")) ? "" : reader.GetString(reader.GetOrdinal("ESTADO"))
                        ,Garantia = reader.IsDBNull(reader.GetOrdinal("CODGARANTIA")) ? "" : reader.GetString(reader.GetOrdinal("CODGARANTIA"))
                    };

                    reader.NextResult();
                    List<InstalacionTecnicaDetalleDTO> _listDetalle = new List<InstalacionTecnicaDetalleDTO>(); 
                    while (reader.Read()) 
                    {
                        var detalle = new InstalacionTecnicaDetalleDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("ID_DETALLECOTIZ")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_DETALLECOTIZ")),
                            NumReq = reader.IsDBNull(reader.GetOrdinal("NUMREQ")) ? 0 : reader.GetInt64(reader.GetOrdinal("NUMREQ")),
                            CodProducto = reader.IsDBNull(reader.GetOrdinal("CODIGOPRODUCTO")) ? "" : reader.GetString(reader.GetOrdinal("CODIGOPRODUCTO")),
                            DescProducto = reader.IsDBNull(reader.GetOrdinal("DESCRIPCION")) ? "" : reader.GetString(reader.GetOrdinal("DESCRIPCION")),
                            Cantidad = reader.IsDBNull(reader.GetOrdinal("CANTIDAD")) ? 0 : reader.GetInt32(reader.GetOrdinal("CANTIDAD")),
                            Marca = reader.IsDBNull(reader.GetOrdinal("MARCA")) ? "" : reader.GetString(reader.GetOrdinal("MARCA")),
                            NumFianza = reader.IsDBNull(reader.GetOrdinal("NUMFIANZA")) ? "" : reader.GetString(reader.GetOrdinal("NUMFIANZA")),
                            //IndLLaveMano = reader.GetString(reader.GetOrdinal("INDLLAVEMANO")) == "S" ? true : false,
                            Dimensiones = reader.IsDBNull(reader.GetOrdinal("DIMENSIONES")) ? "" : reader.GetString(reader.GetOrdinal("DIMENSIONES")),
                            MontoPrestAcc = reader.IsDBNull(reader.GetOrdinal("MONTOPACCE")) ? 0 : reader.GetDecimal(reader.GetOrdinal("MONTOPACCE")),
                            MontoPrestPrin = reader.IsDBNull(reader.GetOrdinal("MONTOPPRINC")) ? 0 : reader.GetDecimal(reader.GetOrdinal("MONTOPPRINC")),
                            //FecLimInsta = reader.GetDateTime(reader.GetOrdinal("FECLIMINSTA")),
                            NumInstalados = reader.IsDBNull(reader.GetOrdinal("NUM_INST")) ? 0 : reader.GetInt32(reader.GetOrdinal("NUM_INST")),
                            NumProgramados = reader.IsDBNull(reader.GetOrdinal("NUM_PROG")) ? 0 : reader.GetInt32(reader.GetOrdinal("NUM_PROG")),
                        };
                        _listDetalle.Add(detalle);
                    }
                    reader.NextResult();
                    List<ElementosxProductoDTO> _elementos = new List<ElementosxProductoDTO>();
                    while (reader.Read())
                    {
                        var elemento = new ElementosxProductoDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("ID")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID")),
                            Id_Detalle = reader.IsDBNull(reader.GetOrdinal("ID_DETALLECOTIZ")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_DETALLECOTIZ")),
                            Id_Despacho = reader.IsDBNull(reader.GetOrdinal("ID_DESPACHO_DIST")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_DESPACHO_DIST")),
                            CodProduct = reader.IsDBNull(reader.GetOrdinal("CODIGOPRODUCTO")) ? "" : reader.GetString(reader.GetOrdinal("CODIGOPRODUCTO")),
                            DescProduct = reader.IsDBNull(reader.GetOrdinal("DESCRIPCION")) ? "" : reader.GetString(reader.GetOrdinal("DESCRIPCION")),
                            Marca = reader.IsDBNull(reader.GetOrdinal("MARCA")) ? "" : reader.GetString(reader.GetOrdinal("MARCA")),
                            Serie = reader.IsDBNull(reader.GetOrdinal("SERIE")) ? "" : reader.GetString(reader.GetOrdinal("SERIE")),
                            CantPreventivo = reader.IsDBNull(reader.GetOrdinal("CANTIDADMP")) ? 0 : reader.GetInt32(reader.GetOrdinal("CANTIDADMP")),
                            CodCicloPreventivo = reader.IsDBNull(reader.GetOrdinal("PERIODICIDAD")) ? "" : reader.GetString(reader.GetOrdinal("PERIODICIDAD")),
                            CodUbigeoDestino = reader.IsDBNull(reader.GetOrdinal("CODUBIGEODEST")) ? "" : reader.GetString(reader.GetOrdinal("CODUBIGEODEST")),
                            DescUbigeoDestino = reader.IsDBNull(reader.GetOrdinal("DESCUBIGEODEST")) ? "" : reader.GetString(reader.GetOrdinal("DESCUBIGEODEST")),
                            Direccion = reader.IsDBNull(reader.GetOrdinal("DIRECCION")) ? "" : reader.GetString(reader.GetOrdinal("DIRECCION")),
                            NroPiso = reader.IsDBNull(reader.GetOrdinal("NROPISO")) ? 0 : reader.GetInt32(reader.GetOrdinal("NROPISO")),
                            NombreCompletoTecnico = reader.IsDBNull(reader.GetOrdinal("NOMBRECOMPLETO")) ? "" : reader.GetString(reader.GetOrdinal("NOMBRECOMPLETO")),
                            Empresa = reader.IsDBNull(reader.GetOrdinal("EMPRESA")) ? "" : reader.GetString(reader.GetOrdinal("EMPRESA")),
                            FechaProgramacion = reader.IsDBNull(reader.GetOrdinal("FECHAPROGRAMACION")) ? "" : reader.GetString(reader.GetOrdinal("FECHAPROGRAMACION")),
                            FechaInstalacion = reader.IsDBNull(reader.GetOrdinal("FECHAINSTALACION")) ? "" : reader.GetString(reader.GetOrdinal("FECHAINSTALACION"))
                        };
                        _elementos.Add(elemento);
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
                            Nombre_Usuario = reader.IsDBNull(reader.GetOrdinal("NOMBRE_USUARIO")) ? "" : reader.GetString(reader.GetOrdinal("NOMBRE_USUARIO")),
                            Perfil_Usuario = reader.IsDBNull(reader.GetOrdinal("PERFIL_USUARIO")) ? "" : reader.GetString(reader.GetOrdinal("PERFIL_USUARIO")),
                            UsuarioRegistra = reader.IsDBNull(reader.GetOrdinal("USR_REG")) ? "" : reader.GetString(reader.GetOrdinal("USR_REG")),
                            Fecha_Registro = reader.IsDBNull(reader.GetOrdinal("FEC_REG")) ? "" : reader.GetString(reader.GetOrdinal("FEC_REG"))
                        };
                        _listaObservaciones.Add(observacion);
                    };

                    result.CabeceraInstalacion = instalacion;
                    result.DetalleInstalacion = _listDetalle;
                    result.Elementos = _elementos;
                    result.Observaciones = _listaObservaciones;
                    result.Adjuntos = _listaAdjuntos;
                }
            }
            return result;
        }

        public RespuestaDTO CrearMantPrevent(long solicitud, string usuario)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();

                parameters.Add("isIdSolicitud", solicitud);
                parameters.Add("UsrEjecuta", usuario);

                var result = connection.Query(
                    sql: "USP_INS_MANT_PREV",
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
    }
}
