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
using Microsoft.SqlServer.Server;
using System.Security.Permissions;


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

                parameters.Add("isFecIni", filtros.FecIni);
                parameters.Add("isFecFin", filtros.FecFin);
                parameters.Add("IsReclamo", filtros.NumReclamo);
                parameters.Add("IsRuc", filtros.RucEmpresa);
                parameters.Add("IsCodUbigeoDest", filtros.CodUbigeoDest);
                parameters.Add("IsVendedor", filtros.Vendedor);
                parameters.Add("IsEstado", filtros.Estado);
                parameters.Add("IsCodEmpresa", filtros.CodEmpresa);
                parameters.Add("IsTipVenta", filtros.TipoVenta);
                parameters.Add("IsNumProceso", filtros.NroProceso);
                parameters.Add("IsNumContrato", filtros.Contrato);
                parameters.Add("IsNumOrdenCompra", filtros.OrdenCompra);
                parameters.Add("IsNumFianza", filtros.NumFianza);

                var result = connection.Query(
                    sql: "USP_GAR_SEL_RECLAMOS",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new ReclamosDTO()
                    {
                        Id_Reclamo  = i.Single(d => d.Key.Equals("ID_RECLAMO")).Value.Parse<long>(),
                        Id_Workflow= i.Single(d => d.Key.Equals("ID_WORKFLOW")).Value.Parse<long>(),
                        Id_Solicitud  = i.Single(d => d.Key.Equals("ID_SOLICITUD")).Value.Parse<long>(),
                        RucEmpresa = i.Single(d => d.Key.Equals("RUCEMPRESA")).Value.Parse<string>(),
                        RazonSocial = i.Single(d => d.Key.Equals("RAZONSOCIAL")).Value.Parse<string>(),
                        Ubicacion  = i.Single(d => d.Key.Equals("UBICACION")).Value.Parse<string>(),
                        NombreContacto    = i.Single(d => d.Key.Equals("NOMBRECONTACTO")).Value.Parse<string>(),
                        TelefonoContacto      = i.Single(d => d.Key.Equals("TELEFONOCONTACTO")).Value.Parse<string>(),
                        CargoContacto = i.Single(d => d.Key.Equals("CARGOCONTACTO")).Value.Parse<string>(),
                        Establecimiento = i.Single(d => d.Key.Equals("ESTABLECIMIENTO")).Value.Parse<string>(),
                        OrdenCompra = i.Single(d => d.Key.Equals("ORDENCOMPRA")).Value.Parse<string>(),
                        NumProceso = i.Single(d => d.Key.Equals("NUMPROCESO")).Value.Parse<int>(),
                        TipoProceso = i.Single(d => d.Key.Equals("TIPOPROCESO")).Value.Parse<string>(),
                        Contrato = i.Single(d => d.Key.Equals("CONTRATO")).Value.Parse<string>(),
                        CodEmpresa = i.Single(d => d.Key.Equals("CODEMPRESA")).Value.Parse<string>(),
                        NomEmpresa = i.Single(d => d.Key.Equals("NOMEMPRESA")).Value.Parse<string>(),
                        Vendedor = i.Single(d => d.Key.Equals("VENDEDOR")).Value.Parse<string>(),
                        CodigoProducto = i.Single(d => d.Key.Equals("CODIGOPRODUCTO")).Value.Parse<string>(),
                        Descripcion = i.Single(d => d.Key.Equals("DESCRIPCION")).Value.Parse<string>(),
                        Marca = i.Single(d => d.Key.Equals("MARCA")).Value.Parse<string>(),
                        CodTipoVenta = i.Single(d => d.Key.Equals("TIPOVENTA")).Value.Parse<string>(),
                        TipoVenta = i.Single(d => d.Key.Equals("NOMTIPOVENTA")).Value.Parse<string>(),
                        Modelo = i.Single(d => d.Key.Equals("MODELO")).Value.Parse<string>(),
                        Serie = i.Single(d => d.Key.Equals("SERIE")).Value.Parse<string>(),
                        NumFianza = i.Single(d => d.Key.Equals("NUMFIANZA")).Value.Parse<string>(),
                        FechaInstalacion = i.Single(d => d.Key.Equals("FECHAINSTALACION")).Value.Parse<DateTime>(),
                        FechaReclamo = i.Single(d => d.Key.Equals("FECHARECLAMO")).Value.Parse<DateTime>(),
                        FechaProgramacion = i.Single(d => d.Key.Equals("FECHAPROGRAMACION")).Value.Parse<DateTime>(),
                        CodUbigeo = i.Single(d => d.Key.Equals("UBIGEO")).Value.Parse<string>(),
                        Ubigeo = i.Single(d => d.Key.Equals("DESCUBIGEODEST")).Value.Parse<string>(),
                        Direccion = i.Single(d => d.Key.Equals("DIRECCION")).Value.Parse<string>(),
                        Urgencia = i.Single(d => d.Key.Equals("URGENCIA")).Value.Parse<string>(),
                        TipoMotivo = i.Single(d => d.Key.Equals("TIPOMOTIVO")).Value.Parse<string>(),
                        Motivo = i.Single(d => d.Key.Equals("MOTIVO")).Value.Parse<string>(),
                        Estado = i.Single(d => d.Key.Equals("ESTADO")).Value.Parse<string>(),
                        CodEstado = i.Single(d => d.Key.Equals("CODESTADO")).Value.Parse<string>(),
                        UsuarioRegistra = i.Single(d => d.Key.Equals("USR_REG")).Value.Parse<string>(),
                        FechaRegistro = i.Single(d => d.Key.Equals("FEC_REG")).Value.Parse<DateTime>()
                    });
                connection.Close();
                return result;
            }
        }

        public GrupoReclamoDTO ObtenerMainReclamo(long NumReclamo, long IdWorkFlow)
        {
            var result = new GrupoReclamoDTO();
            Log.TraceInfo(Utilidades.GetCaller());
            using( var connection = Factory.ConnectionSingle())
            {
                SqlCommand cmd;
                connection.Open();
                string query = "EXEC USP_GAR_SEL_MAIN_RECLAMOS @IsIdWorkFlow="+IdWorkFlow+"@IsNumReclamo="+NumReclamo;
                cmd = new SqlCommand(query, connection);

                using (var reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    var reclamo = new ReclamosDTO()
                    {
                        Id_Reclamo = reader.IsDBNull(reader.GetOrdinal("ID_RECLAMO")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_RECLAMO")),
                        Id_Workflow = reader.IsDBNull(reader.GetOrdinal("ID_WORKFLOW")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_WORKFLOW")),
                        Id_Solicitud = reader.IsDBNull(reader.GetOrdinal("ID_SOLICITUD")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_SOLICITUD")),
                        RucEmpresa = reader.IsDBNull(reader.GetOrdinal("RUCEMPRESA")) ? "" : reader.GetString(reader.GetOrdinal("RUCEMPRESA")),
                        RazonSocial = reader.IsDBNull(reader.GetOrdinal("RAZONSOCIAL")) ? "" : reader.GetString(reader.GetOrdinal("RAZONSOCIAL")),
                        Ubicacion = reader.IsDBNull(reader.GetOrdinal("UBICACION")) ? "" : reader.GetString(reader.GetOrdinal("UBICACION")),
                        NombreContacto = reader.IsDBNull(reader.GetOrdinal("NOMBRECONTACTO")) ? "" : reader.GetString(reader.GetOrdinal("NOMBRECONTACTO")),
                        TelefonoContacto = reader.IsDBNull(reader.GetOrdinal("TELEFONOCONTACTO")) ? "" : reader.GetString(reader.GetOrdinal("TELEFONOCONTACTO")),
                        CargoContacto = reader.IsDBNull(reader.GetOrdinal("CARGOCONTACTO")) ? "" : reader.GetString(reader.GetOrdinal("CARGOCONTACTO")),
                        Establecimiento = reader.IsDBNull(reader.GetOrdinal("ESTABLECIMIENTO")) ? "" : reader.GetString(reader.GetOrdinal("ESTABLECIMIENTO")),
                        OrdenCompra = reader.IsDBNull(reader.GetOrdinal("ORDENCOMPRA")) ? "" : reader.GetString(reader.GetOrdinal("ORDENCOMPRA")),
                        NumProceso = reader.IsDBNull(reader.GetOrdinal("NUMPROCESO")) ? 0 : reader.GetInt32(reader.GetOrdinal("NUMPROCESO")),
                        TipoProceso = reader.IsDBNull(reader.GetOrdinal("TIPOPROCESO")) ? "" : reader.GetString(reader.GetOrdinal("TIPOPROCESO")),
                        Contrato = reader.IsDBNull(reader.GetOrdinal("CONTRATO")) ? "" : reader.GetString(reader.GetOrdinal("CONTRATO")),
                        CodEmpresa = reader.IsDBNull(reader.GetOrdinal("CODEMPRESA")) ? "" : reader.GetString(reader.GetOrdinal("CODEMPRESA")),
                        NomEmpresa = reader.IsDBNull(reader.GetOrdinal("NOMEMPRESA")) ? "" : reader.GetString(reader.GetOrdinal("NOMEMPRESA")),
                        Vendedor = reader.IsDBNull(reader.GetOrdinal("VENDEDOR")) ? "" : reader.GetString(reader.GetOrdinal("VENDEDOR")),
                        CodigoProducto = reader.IsDBNull(reader.GetOrdinal("CODIGOPRODUCTO")) ? "" : reader.GetString(reader.GetOrdinal("CODIGOPRODUCTO")),
                        Descripcion = reader.IsDBNull(reader.GetOrdinal("DESCRIPCION")) ? "" : reader.GetString(reader.GetOrdinal("DESCRIPCION")),
                        Marca = reader.IsDBNull(reader.GetOrdinal("MARCA")) ? "" : reader.GetString(reader.GetOrdinal("MARCA")),
                        CodTipoVenta = reader.IsDBNull(reader.GetOrdinal("TIPOVENTA")) ? "" : reader.GetString(reader.GetOrdinal("TIPOVENTA")),
                        TipoVenta = reader.IsDBNull(reader.GetOrdinal("NOMTIPOVENTA")) ? "" : reader.GetString(reader.GetOrdinal("NOMTIPOVENTA")),
                        Modelo = reader.IsDBNull(reader.GetOrdinal("MODELO")) ? "" : reader.GetString(reader.GetOrdinal("MODELO")),
                        Serie = reader.IsDBNull(reader.GetOrdinal("SERIE")) ? "" : reader.GetString(reader.GetOrdinal("SERIE")),
                        NumFianza = reader.IsDBNull(reader.GetOrdinal("NUMFIANZA")) ? "" : reader.GetString(reader.GetOrdinal("NUMFIANZA")),
                        FechaInstalacion = reader.GetDateTime(reader.GetOrdinal("FECHAINSTALACION")),
                        FechaReclamo = reader.GetDateTime(reader.GetOrdinal("FECHARECLAMO")),
                        FechaProgramacion = reader.GetDateTime(reader.GetOrdinal("FECHAPROGRAMACION")),
                        CodUbigeo = reader.IsDBNull(reader.GetOrdinal("UBIGEO")) ? "" : reader.GetString(reader.GetOrdinal("UBIGEO")),
                        Ubigeo = reader.IsDBNull(reader.GetOrdinal("DESCUBIGEODEST")) ? "" : reader.GetString(reader.GetOrdinal("DESCUBIGEODEST")),
                        Direccion = reader.IsDBNull(reader.GetOrdinal("DIRECCION")) ? "" : reader.GetString(reader.GetOrdinal("DIRECCION")),
                        Urgencia = reader.IsDBNull(reader.GetOrdinal("URGENCIA")) ? "" : reader.GetString(reader.GetOrdinal("URGENCIA")),
                        TipoMotivo = reader.IsDBNull(reader.GetOrdinal("TIPOMOTIVO")) ? "" : reader.GetString(reader.GetOrdinal("TIPOMOTIVO")),
                        Motivo = reader.IsDBNull(reader.GetOrdinal("MOTIVO")) ? "" : reader.GetString(reader.GetOrdinal("MOTIVO")),
                        Estado = reader.IsDBNull(reader.GetOrdinal("ESTADO")) ? "" : reader.GetString(reader.GetOrdinal("ESTADO")),
                        CodEstado = reader.IsDBNull(reader.GetOrdinal("CODESTADO")) ? "" : reader.GetString(reader.GetOrdinal("CODESTADO"))
                    };

                    reader.NextResult();
                    List<TecnicoGarantiaDTO> _listTecnicos = new List<TecnicoGarantiaDTO>();
                    while (reader.Read())
                    {
                        var tecnico = new TecnicoGarantiaDTO()
                        {
                            Id_Asig = reader.IsDBNull(reader.GetOrdinal("ID")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID")),
                            Id_Reclamo = reader.IsDBNull(reader.GetOrdinal("ID_RECLAMO")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_RECLAMO")),
                            Cod_Tecnico = reader.IsDBNull(reader.GetOrdinal("COD_TECNICO")) ? 0 : reader.GetInt32(reader.GetOrdinal("COD_TECNICO")),
                            Nombres = reader.IsDBNull(reader.GetOrdinal("NOMBRES")) ? "" : reader.GetString(reader.GetOrdinal("NOMBRES")),
                            ApePaterno = reader.IsDBNull(reader.GetOrdinal("APELLIDOPATERNO")) ? "" : reader.GetString(reader.GetOrdinal("APELLIDOPATERNO")),
                            ApeMaterno = reader.IsDBNull(reader.GetOrdinal("APELLIDOMATERNO")) ? "" : reader.GetString(reader.GetOrdinal("APELLIDOMATERNO")),
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
                            Estado = reader.IsDBNull(reader.GetOrdinal("ESTADO")) ? false : reader.GetBoolean(reader.GetOrdinal("ESTADO")),
                        };

                        _listTecnicos.Add(tecnico); 
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

                    result.Reclamo = reclamo;
                    result.Tecnicos = _listTecnicos;
                    result.Seguimiento = _listaSeguimiento;
                    result.Observaciones = _listaObservaciones;
                    result.Adjuntos = _listaAdjuntos;
                }

            };
            return result;
        }

        public IEnumerable<TecnicoGarantiaDTO> ObtenerTecnicosReclamo(long numReclamo)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("IsNumReclamo", numReclamo);

                var result = connection.Query(
                    sql: "USP_GAR_SEL_TECNICOS",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new TecnicoGarantiaDTO()
                    {
                        Id_Asig = i.Single( d => d.Value.Equals("ID")).Parse<long>(),
                        Id_Reclamo = i.Single(d => d.Value.Equals("ID_RECLAMO")).Parse<long>(),
                        Cod_Tecnico = i.Single(d => d.Value.Equals("COD_TECNICO")).Parse<int>(),
                        Nombres = i.Single(d => d.Value.Equals("NOMBRES")).Parse<string>(),
                        ApePaterno = i.Single(d => d.Value.Equals("APELLIDOPATERNO")).Parse<string>(),
                        ApeMaterno = i.Single(d => d.Value.Equals("APELLIDOMATERNO")).Parse<string>(),
                        Documento = i.Single(d => d.Value.Equals("DOCUMENTO")).Parse<string>(),
                        Tipo_Documento = i.Single(d => d.Value.Equals("TIPO_DOCUMENTO")).Parse<string>(),
                        Correo = i.Single(d => d.Value.Equals("CORREO")).Parse<string>(),
                        Telefono = i.Single(d => d.Value.Equals("TELEFONO")).Parse<string>(),
                        Zona = i.Single(d => d.Value.Equals("ZONA")).Parse<string>(),
                        DescZona = i.Single(d => d.Value.Equals("UBIGEO")).Parse<string>(),
                        Empresa = i.Single(d => d.Value.Equals("EMPRESA")).Parse<string>(),
                        NomTipoTecnico = i.Single(d => d.Value.Equals("NOMTIPOTECNICO")).Parse<string>(),
                        NomTipoDoc = i.Single(d => d.Value.Equals("NOM_TIPO_DOCUMENTO")).Parse<string>(),
                        TipoTecnico = i.Single(d => d.Value.Equals("TIPOTECNICO")).Parse<string>(),
                        Estado = i.Single(d => d.Value.Equals("ESTADO")).Parse<bool>()
                    });
                connection.Close();
                return result;
            };
        }


        public RespuestaDTO MantReclamo(ReclamosDTO reclamo)
        {
            using(var connection = Factory.ConnectionFactory())
            {
                var parameters = new DynamicParameters();
                connection.Open();

                parameters.Add("IsTipoProceso", reclamo.TipoProceso);
                parameters.Add("IsID_RECLAMO", reclamo.Id_Reclamo);
                parameters.Add("IsID_WORKFLOW", reclamo.Id_Workflow);
                parameters.Add("IsID_SOLICITUD", reclamo.Id_Solicitud);
                parameters.Add("IsRUCEMPRESA", reclamo.RucEmpresa);
                parameters.Add("IsNOMEMPRESA", reclamo.RazonSocial);
                parameters.Add("IsUBICACION", reclamo.Ubicacion);
                parameters.Add("IsNOMBRECONTACTO", reclamo.NombreContacto);
                parameters.Add("IsTELEFONOCONTACTO", reclamo.TelefonoContacto);
                parameters.Add("IsCARGOCONTACTO", reclamo.CargoContacto);
                parameters.Add("IsESTABLECIMIENTO", reclamo.Establecimiento);
                parameters.Add("IsTIPOVENTA",reclamo.TipoVenta);
                parameters.Add("IsORDENCOMPRA", reclamo.OrdenCompra);
                parameters.Add("IsNUMPROCESO", reclamo.NumProceso);
                parameters.Add("IsTIPOPROCESOSOL", reclamo.TipoProcesoSol);
                parameters.Add("IsCONTRATO", reclamo.Contrato);
                parameters.Add("IsCODEMPRESA", reclamo.CodEmpresa);
                parameters.Add("IsVENDEDOR", reclamo.Vendedor);
                parameters.Add("IsCODIGOPRODUCTO", reclamo.CodigoProducto);
                parameters.Add("IsDESCRIPCION", reclamo.Descripcion);
                parameters.Add("IsMARCA", reclamo.Marca);
                parameters.Add("IsMODELO", reclamo.Modelo);
                parameters.Add("IsSERIE", reclamo.Serie);
                parameters.Add("IsNUMFIANZA", reclamo.NumFianza);
                parameters.Add("IsFECHAINSTALACION", reclamo.FechaInstalacion);
                parameters.Add("IsFECHARECLAMO", reclamo.FechaReclamo);
                parameters.Add("IsFECHAPROGRAMACION", reclamo.FechaProgramacion);
                parameters.Add("IsUBIGEO", reclamo.CodUbigeo);
                parameters.Add("IsDIRECCION", reclamo.Direccion);
                parameters.Add("IsURGENCIA", reclamo.CodUrgencia);
                parameters.Add("IsMOTIVO", reclamo.Motivo);
                parameters.Add("IsTIPOMOTIVO", reclamo.TipoMotivo);
                parameters.Add("IsESTADO", reclamo.CodEstado);
                parameters.Add("UsrEjecuta", reclamo.UsuarioRegistra);

                var result = connection.Query(
                    sql: "USP_GAR_MANT_RECLAMO",
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

        public RespuestaDTO MantTecnicosReclamo(TecnicoGarantiaDTO tecnico)
        {
            using (var connection = Factory.ConnectionFactory())
            {
                var parameters = new DynamicParameters();
                connection.Open();

                parameters.Add("IsTipoProceso", tecnico.TipoProceso);
                parameters.Add("IsID_ASIG", tecnico.Id_Asig);
                parameters.Add("IsID_RECLAMO", tecnico.Id_Reclamo);
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
                    sql: "USP_GAR_MANT_TECNICOS",
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
                            Cod_Ubigeo = reader.IsDBNull(reader.GetOrdinal("CODUBIGEO")) ? "" : reader.GetString(reader.GetOrdinal("CODUBIGEO")),
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
                            Direccion = reader.IsDBNull(reader.GetOrdinal("DIRECCION")) ? "" : reader.GetString(reader.GetOrdinal("DIRECCION")),
                            UbicacionDestino = reader.IsDBNull(reader.GetOrdinal("UBIDESTINO")) ? "" : reader.GetString(reader.GetOrdinal("UBIDESTINO")),
                            CodUbicacionDestino = reader.IsDBNull(reader.GetOrdinal("CODUBIGEODEST")) ? "" : reader.GetString(reader.GetOrdinal("CODUBIGEODEST")),
                            NumFianza = reader.IsDBNull(reader.GetOrdinal("NUMFIANZA")) ? "" : reader.GetString(reader.GetOrdinal("NUMFIANZA")),
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
