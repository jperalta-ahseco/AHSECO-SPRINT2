using Dapper;
using AHSECO.CCL.BE;
using AHSECO.CCL.COMUN;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics;

namespace AHSECO.CCL.BD
{
    public class EmpleadosBD
    {
        CCLog Log;

        public EmpleadosBD() : this(new CCLog())
        {
        }

        public EmpleadosBD(CCLog cclog)
        {
            Log = cclog;
        }

        public IEnumerable<EmpleadoDTO> ListarEmpleados(FiltroEmpleadosDTO filtroEmpleadosDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("ID_EMPLEADO", filtroEmpleadosDTO.CodigoEmpleado);
                parameters.Add("NOMBRES", filtroEmpleadosDTO.NombreEmpleado);
                parameters.Add("APELLIDOPATERNO", filtroEmpleadosDTO.ApellidoPaternoEmpleado);
                parameters.Add("APELLIDOMATERNO", filtroEmpleadosDTO.ApellidoMaternoEmpleado);
                parameters.Add("IDCARGO", filtroEmpleadosDTO.CodigoCargo);
                parameters.Add("TIPODOCUMENTO", filtroEmpleadosDTO.TipoDocumento);
                parameters.Add("TIPOEMPLEADO", filtroEmpleadosDTO.TipoEmpleado);
                parameters.Add("NUMERODOCUMENTO", filtroEmpleadosDTO.NumeroDocumento);
                parameters.Add("ESTADO", filtroEmpleadosDTO.Estado);
                parameters.Add("FECINI", filtroEmpleadosDTO.FechaInicio);
                parameters.Add("FECFIN", filtroEmpleadosDTO.FechaFinal);

                var result = connection.Query(
                     sql: "USP_CONSULTA_EMPLEADOS",
                     param: parameters,
                     commandType: CommandType.StoredProcedure)
                     .Select(s => s as IDictionary<string, object>)
                     .Select(i => new EmpleadoDTO
                     {
                         CodigoEmpleado = i.Single(d => d.Key.Equals("ID_EMPLEADO")).Value.Parse<int>(),
                         NombresEmpleado = i.Single(d => d.Key.Equals("NOMBRES")).Value.Parse<string>(),
                         ApellidoPaternoEmpleado = i.Single(d => d.Key.Equals("APELLIDOPATERNO")).Value.Parse<string>(),
                         ApellidoMaternoEmpleado = i.Single(d => d.Key.Equals("APELLIDOMATERNO")).Value.Parse<string>(),
                         NombresCompletosEmpleado = i.Single(d => d.Key.Equals("NOMBRECOMPLETOEMPLEADO")).Value.Parse<string>(),
                         Cargo = new CargoDTO
                         {
                             CodigoCargo = i.Single(d => d.Key.Equals("ID_CARGO")).Value.Parse<int>(),
                             Area =new AreaDTO
                             {
                                 CodigoArea = i.Single(d => d.Key.Equals("ID_AREA")).Value.Parse<int>(),
                                 NombreArea = i.Single(d => d.Key.Equals("NOMBREAREA")).Value.Parse<string>(),
                             },
                             NombreCargo = i.Single(d => d.Key.Equals("NOMBRECARGO")).Value.Parse<string>(),
                            
                         },

                         FechaNacimientoFormat = i.Single(d => d.Key.Equals("FECHANACIMIENTO")).Value.Parse<string>(),
                         LugarLaboral = new UbigeoDTO
                         {
                             UbigeoId = i.Single(d => d.Key.Equals("LUGARLABORAL")).Value.Parse<string>(),
                             NombreDepartamento = i.Single(d => d.Key.Equals("DEPLUGARLABORAL")).Value.Parse<string>(),
                             NombreProvincia = i.Single(d => d.Key.Equals("PROVLUGARLABORAL")).Value.Parse<string>(),
                             NombreDistrito = i.Single(d => d.Key.Equals("DISLUGARLABORAL")).Value.Parse<string>()
                         },
                         TelefonoEmpleado = i.Single(d => d.Key.Equals("TELEFONO")).Value.Parse<string>(),
                         EmailEmpleado = i.Single(d => d.Key.Equals("EMAIL")).Value.Parse<string>(),
                         DireccionEmpleado = i.Single(d => d.Key.Equals("DIRECCION")).Value.Parse<string>(),
                         SexoEmpleado = i.Single(d => d.Key.Equals("SEXO")).Value.Parse<string>(),
                         Documento = new DatosGeneralesDetalleDTO
                         {
                             Parametro = i.Single(d => d.Key.Equals("TIPO_DOCUMENTO")).Value.Parse<string>(),
                             Descripcion = i.Single(d => d.Key.Equals("NOM_TIPO_DOCUMENTO")).Value.Parse<string>()
                         },
                         NumeroDocumento = i.Single(d => d.Key.Equals("NUMDOCUMENTO")).Value.Parse<string>(),
                         Empresa = new DatosGeneralesDetalleDTO
                         {
                             CodValor1 = i.Single(d => d.Key.Equals("CODEMPRESA")).Value.Parse<string>(),
                             Valor1 = i.Single(d => d.Key.Equals("NOMEMPRESA")).Value.Parse<string>()
                         },
                         CodigoJefe = i.Single(d => d.Key.Equals("COD_JEFE")).Value.Parse<int>(),
                         NombreJefe = i.Single(d => d.Key.Equals("NOMJEFE")).Value.Parse<string>(),
                         FechaIngresoFormat = i.Single(d => d.Key.Equals("FECHA_INGRESO")).Value.Parse<string>(),
                         CodigoTipoEmpleado = i.Single(d => d.Key.Equals("TIPO")).Value.Parse<string>(),
                         TipoEmpleado = i.Single(d => d.Key.Equals("DESTIPO")).Value.Parse<string>(),
                         Estado = i.Single(d => d.Key.Equals("ESTADO")).Value.Parse<int>(),
                         NombreEstado = i.Single(d => d.Key.Equals("NOMESTADO")).Value.Parse<string>(),
                       
                         UsuarioRegistra = i.Single(d => d.Key.Equals("USR_REG")).Value.Parse<string>(),
                         FechaRegistroFormat = i.Single(d => d.Key.Equals("FEC_REG")).Value.Parse<string>(),
                         UsuarioModifica = i.Single(d => d.Key.Equals("USR_MOD")).Value.Parse<string>(),
                         FechaModificaFormat = i.Single(d => d.Key.Equals("FEC_MOD")).Value.Parse<string>(),
                     });

                return result;
            }
        }

        public bool MantenimientoEmpleado(FiltroEmpleadosDTO filtroEmpleadosDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("isTipoProceso", filtroEmpleadosDTO.TipoMantenimiento);
                parameters.Add("isId", filtroEmpleadosDTO.CodigoEmpleado);
                parameters.Add("isIdCargo", filtroEmpleadosDTO.CodigoCargo);
                parameters.Add("isNombres", filtroEmpleadosDTO.NombreEmpleado);
                parameters.Add("isApePat", filtroEmpleadosDTO.ApellidoPaternoEmpleado);
                parameters.Add("isApeMat", filtroEmpleadosDTO.ApellidoMaternoEmpleado);
                parameters.Add("isCentroLaboral", filtroEmpleadosDTO.LugarLaboral.UbigeoId);
                parameters.Add("isTelefono", filtroEmpleadosDTO.Telefono);
                parameters.Add("isCorreo", filtroEmpleadosDTO.Email);
                parameters.Add("isEstado", filtroEmpleadosDTO.Estado);
                parameters.Add("isUsrReg", filtroEmpleadosDTO.UsuarioRegistra);
                var result = connection.Execute(
                    sql: "USP_MANT_EMPLEADOSVENTAS",
                    param: parameters,
                    commandType: CommandType.StoredProcedure
                 );
            }
            return true;
        }

        public bool EmpleadosMant(EmpleadoDTO empleadoDTO)
        {
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("isTipoProceso", empleadoDTO.TipoMantenimiento);
                parameters.Add("isId", empleadoDTO.CodigoEmpleado);
                parameters.Add("isNombres", empleadoDTO.NombresEmpleado);
                parameters.Add("isApePat", empleadoDTO.ApellidoPaternoEmpleado);
                parameters.Add("isApeMat", empleadoDTO.ApellidoMaternoEmpleado);
                parameters.Add("isIdArea", empleadoDTO.Cargo.Area.CodigoArea);
                parameters.Add("isIdCargo", empleadoDTO.Cargo.CodigoCargo);
                parameters.Add("isCentroLaboral", empleadoDTO.LugarLaboral.UbigeoId);
                parameters.Add("isFecNac", empleadoDTO.FechaNacimiento);
                parameters.Add("isTelefono", empleadoDTO.TelefonoEmpleado);
                parameters.Add("isCorreo", empleadoDTO.EmailEmpleado);
                parameters.Add("isTipDoc", empleadoDTO.Documento.Parametro);
                parameters.Add("isNumDoc", empleadoDTO.NumeroDocumento);
                parameters.Add("isSexo", empleadoDTO.SexoEmpleado);
                parameters.Add("isDireccion", empleadoDTO.DireccionEmpleado);
                parameters.Add("isCodEmpresa", empleadoDTO.Empresa.CodValor1);
                parameters.Add("isFecIng", empleadoDTO.FechaIngreso);
                parameters.Add("isTipoEmpleado", empleadoDTO.TipoEmpleado);
                parameters.Add("isCodJefe", empleadoDTO.CodigoJefe);
                parameters.Add("isEstado", empleadoDTO.Estado);
                parameters.Add("isUsrReg", empleadoDTO.UsuarioRegistra);

                var result = connection.Execute(
                    sql: "USP_MANT_EMPLEADOS",
                    param: parameters,
                    commandType: CommandType.StoredProcedure
                    );
            }

            return true;
        }
        public FiltroGrupoEmpledosDTO GrupoEmpleadosFiltro()
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using(var connection=Factory.ConnectionSingle())
            {
                var parameteres = new DynamicParameters();
                SqlCommand command;
                var result=new FiltroGrupoEmpledosDTO();
                string  query = "USP_FILTROS_EMPLEADOS";
                connection.Open();
                command = new SqlCommand(query, connection);
                using (var reader = command.ExecuteReader())
                {
                    List<ComboDTO> _listaEmpresa = new List<ComboDTO>();
                    while (reader.Read())
                    {
                        var empresa = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("COD_EMPRESA")) ? "" : reader.GetString(reader.GetOrdinal("COD_EMPRESA")),
                            Text = reader.IsDBNull(reader.GetOrdinal("NOM_EMPRESA")) ? "" : reader.GetString(reader.GetOrdinal("NOM_EMPRESA"))
                        };
                        _listaEmpresa.Add(empresa);
                    }
                    reader.NextResult();
                    List<ComboDTO> _listaSexos = new List<ComboDTO>();
                    while (reader.Read())
                    {
                        var sexos = new ComboDTO()
                        {
                            Id=reader.IsDBNull(reader.GetOrdinal("COD_SEXO"))?"":reader.GetString(reader.GetOrdinal("COD_SEXO")),
                            Text= reader.IsDBNull(reader.GetOrdinal("NOM_SEXO")) ? "" : reader.GetString(reader.GetOrdinal("NOM_SEXO"))
                        };
                        _listaSexos.Add(sexos);
                    }
                    reader.NextResult();
                    List<ComboDTO> _listaTipos = new List<ComboDTO>();
                    while (reader.Read())
                    {
                        var tipos = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("COD_TIPEMP")) ? "" : reader.GetString(reader.GetOrdinal("COD_TIPEMP")),
                            Text = reader.IsDBNull(reader.GetOrdinal("NOM_TIPEMP")) ? "" : reader.GetString(reader.GetOrdinal("NOM_TIPEMP"))
                        };
                        _listaTipos.Add(tipos);
                    }
                    reader.NextResult();
                    List<ComboDTO> _listaEstados = new List<ComboDTO>();
                    while (reader.Read())
                    {
                        var estado = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("COD_ESTADO")) ? "" : reader.GetString(reader.GetOrdinal("COD_ESTADO")),
                            Text = reader.IsDBNull(reader.GetOrdinal("NOM_ESTADO")) ? "" : reader.GetString(reader.GetOrdinal("NOM_ESTADO"))
                        };
                        _listaEstados.Add(estado);
                    }
                    reader.NextResult();
                    List<ComboDTO> _listadoTipoDocumento = new List<ComboDTO>();
                    while (reader.Read())
                    {
                        var documento = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("COD_TIPDOC")) ? "" : reader.GetString(reader.GetOrdinal("COD_TIPDOC")),
                            Text = reader.IsDBNull(reader.GetOrdinal("NOM_TIPDOC")) ? "" : reader.GetString(reader.GetOrdinal("NOM_TIPDOC"))
                        };
                        _listadoTipoDocumento.Add(documento);
                    }
                    reader.NextResult();
                    List<ComboDTO> _listaAreas = new List<ComboDTO>();
                    while (reader.Read())
                    {
                        var area = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("ID_AREA")) ? "" : reader.GetString(reader.GetOrdinal("ID_AREA")),
                            Text = reader.IsDBNull(reader.GetOrdinal("NOMBREAREA")) ? "" : reader.GetString(reader.GetOrdinal("NOMBREAREA"))
                        };
                        _listaAreas.Add(area);
                    }
                    result.Empresas = _listaEmpresa;
                    result.Sexo = _listaSexos;
                    result.TipoEmpleado = _listaTipos;
                    result.Estados = _listaEstados;
                    result.TipoDocumento = _listadoTipoDocumento;
                    result.Areas = _listaAreas;
                    return result;  
                }

            }
        }
    }
}
