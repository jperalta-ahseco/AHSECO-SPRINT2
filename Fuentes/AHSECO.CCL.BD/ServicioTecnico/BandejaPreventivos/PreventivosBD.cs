using AHSECO.CCL.BE;
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
using System.Text;
using System.Threading.Tasks;

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
                    result.Empresas = _listEmpresa;
                    result.Estados = _Estados;
                }
            }
            return result;
        }

        public IEnumerable<ResultPreventivoDTO> ObtenerPreventivos(ReqPreventivoDTO req)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using(var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();

                parameters.Add("IsIdMant", req.Id_Mant);
                parameters.Add("IsNumSerie", req.NumSerie);
                parameters.Add("IsNumProc", req.NumProc);
                parameters.Add("IsNumOrdCompra", req.NumOrdCompra);
                parameters.Add("IsNumFianza", req.NumFianza);
                parameters.Add("IsEmpresa", req.Empresa);
                parameters.Add("IsPeriodoInicio", req.PeriodoInicio);
                parameters.Add("IsPeriodoFinal", req.PeriodoFinal);
                parameters.Add("IsEstado", req.Estado);

                var result = connection.Query(
                    sql: "USP_PREV_SEL_PREVENTIVOS",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new ResultPreventivoDTO()
                    {
                        Id_Mant = i.Single( d => d.Key.Equals("ID_MANT")).Value.Parse<long>(),
                        Serie = i.Single(d => d.Key.Equals("SERIE")).Value.Parse<string>(),
                        Descripcion = i.Single(d => d.Key.Equals("DESCRIPCION")).Value.Parse<string>(),
                        FechaInstalacion = i.Single(d => d.Key.Equals("FECHAINSTALACION")).Value.Parse<DateTime>(),
                        ProxFechaMant = i.Single(d => d.Key.Equals("PROXFECHAMANT")).Value.Parse<string>(),
                        TotalPrevent = i.Single(d => d.Key.Equals("TOTALPREVE")).Value.Parse<int>(),
                        PreventReal = i.Single(d => d.Key.Equals("COMPLETADOS")).Value.Parse<int>(),
                        PreventPend = i.Single(d => d.Key.Equals("PENDIENTES")).Value.Parse<int>(),
                        UbigeoDest = i.Single(d => d.Key.Equals("UBIGEODEST")).Value.Parse<string>()
                    });
                connection.Close();
                return result;
            }
        }


        public GrupoMantPreventivoDTO ObtenerMainMant(long NumMant, long IdWorkFlow)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            var result = new GrupoMantPreventivoDTO();
            using(var connection = Factory.ConnectionSingle())
            {
                SqlCommand cmd;
                connection.Open();
                string query = "EXEC [USP_PREV_SEL_MAIN_MANT] @IsNumMant ="+NumMant.ToString()+" ,@IsIdWorkFlow ="+IdWorkFlow.ToString();
                cmd = new SqlCommand(query, connection);

                using (var reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    var mantenimiento = new ResultPreventivoDTO()
                    {
                        Id_Mant = reader.IsDBNull(reader.GetOrdinal("ID_MANT")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_MANT")),
                        //Id_WorkFlow = reader.IsDBNull(reader.GetOrdinal("ID_WORKFLOW")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_WORKFLOW")),
                        Serie = reader.IsDBNull(reader.GetOrdinal("SERIE")) ? "" : reader.GetString(reader.GetOrdinal("SERIE")),
                        RazonSocial = reader.IsDBNull(reader.GetOrdinal("RAZONSOCIAL")) ? "" : reader.GetString(reader.GetOrdinal("RAZONSOCIAL")),
                        FechaInstalacion = reader.GetDateTime(reader.GetOrdinal("FECHAINSTALACION")),
                        FechaMantenimiento = reader.GetDateTime(reader.GetOrdinal("FECHAMANTENIMIENTO")),
                        Empresa =reader.IsDBNull(reader.GetOrdinal("EMPRESA")) ? "" : reader.GetString(reader.GetOrdinal("EMPRESA")), 
                        Direccion = reader.IsDBNull(reader.GetOrdinal("DIRECCION")) ? "" : reader.GetString(reader.GetOrdinal("DIRECCION")),
                        UbigeoDest = reader.IsDBNull(reader.GetOrdinal("UBIGEODEST")) ? "" : reader.GetString(reader.GetOrdinal("UBIGEODEST")),  
                        CodItem = reader.IsDBNull(reader.GetOrdinal("CODITEM")) ? "" : reader.GetString(reader.GetOrdinal("CODITEM")),
                        Descripcion = reader.IsDBNull(reader.GetOrdinal("DESCRIPCION")) ? "" : reader.GetString(reader.GetOrdinal("DESCRIPCION")),
                        DesMarca = reader.IsDBNull(reader.GetOrdinal("DESMARCA")) ? "" : reader.GetString(reader.GetOrdinal("DESMARCA")),
                        Garantia = reader.IsDBNull(reader.GetOrdinal("GARANTIA")) ? "" : reader.GetString(reader.GetOrdinal("GARANTIA")),
                        Ciclo = reader.IsDBNull(reader.GetOrdinal("CICLO")) ? "" : reader.GetString(reader.GetOrdinal("CICLO")),
                        NumProceso = reader.IsDBNull(reader.GetOrdinal("NUMPROCESO")) ? "" : reader.GetString(reader.GetOrdinal("NUMPROCESO")),
                        TipoProceso = reader.IsDBNull(reader.GetOrdinal("TIPOPROCESO")) ? "" : reader.GetString(reader.GetOrdinal("TIPOPROCESO")),
                        OrdenCompra = reader.IsDBNull(reader.GetOrdinal("ORDENCOMPRA")) ? "" : reader.GetString(reader.GetOrdinal("ORDENCOMPRA")),
                        NumFianza = reader.IsDBNull(reader.GetOrdinal("NUMFIANZA")) ? "" : reader.GetString(reader.GetOrdinal("NUMFIANZA")),
                        CodEstado = reader.IsDBNull(reader.GetOrdinal("ESTADO")) ? "" : reader.GetString(reader.GetOrdinal("ESTADO")),
                        TotalPrevent = reader.IsDBNull(reader.GetOrdinal("TOTALPREVENT")) ? 0 : reader.GetInt32(reader.GetOrdinal("TOTALPREVENT")),
                        PreventPend = reader.IsDBNull(reader.GetOrdinal("PREVENTPEND")) ? 0 : reader.GetInt32(reader.GetOrdinal("PREVENTPEND")),
                        PreventReal = reader.IsDBNull(reader.GetOrdinal("PREVENTREAL")) ? 0 : reader.GetInt32(reader.GetOrdinal("PREVENTREAL")),
                    };

                    reader.NextResult();
                    List<TecnicoMantPreventivoDTO> _listTecnicos = new List<TecnicoMantPreventivoDTO>();
                    while (reader.Read())
                    {
                        var tecnico = new TecnicoMantPreventivoDTO()
                        {
                            Id_Asig = reader.IsDBNull(reader.GetOrdinal("ID")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID")),
                            Id_Mant = reader.IsDBNull(reader.GetOrdinal("ID_RECLAMO")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_RECLAMO")),
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

                    result.MantPreventivo = mantenimiento;
                    result.Tecnicos = _listTecnicos;
                    result.Seguimiento = _listaSeguimiento;
                    result.Observaciones = _listaObservaciones;
                    result.Adjuntos = _listaAdjuntos;
                }
                return result;
            }
        }

    }
}
