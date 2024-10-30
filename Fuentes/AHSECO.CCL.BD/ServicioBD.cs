using AHSECO.CCL.BE;
using AHSECO.CCL.BE.Ventas;
using AHSECO.CCL.COMUN;
using Dapper;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BD
{
    public class ServicioBD
    {
        CCLog Log;

        public ServicioBD() : this(new CCLog())
        {
        }

        public ServicioBD(CCLog cclog)
        {
            Log = cclog;
        }

        public FiltrosServiciosDTO FiltroServicios()
        {
            Log.TraceInfo(Utilidades.GetCaller());
            var result = new FiltrosServiciosDTO();
            using (var connection = Factory.ConnectionSingle())
            {
                var parameters = new DynamicParameters();
                SqlCommand command;
                string query = "USP_FILTROS_SERVICIOS";
                connection.Open();
                command = new SqlCommand(query, connection);

                using (var reader = command.ExecuteReader())
                {
                    List<ComboDTO> _tipServicio = new List<ComboDTO>();
                    while (reader.Read())
                    {
                        var servicio = new ComboDTO()
                        {
                            Id = reader.GetString(0),
                            Text = reader.GetString(1)
                        };
                        _tipServicio.Add(servicio);
                    };

                    reader.NextResult();

                    List<ComboDTO> _Estados = new List<ComboDTO>();
                    while (reader.Read())
                    {
                        var estado = new ComboDTO()
                        {
                            Id = reader.GetString(0),
                            Text = reader.GetString(1)
                        };
                        _Estados.Add(estado);
                    };
                    result.Estados = _Estados;
                    result.TipServicio = _tipServicio;
                };
            };
            return result;
        }

        public IEnumerable<ServicioDTO> ObtenerServicios(ServicioDTO servicioDTO) {
            Log.TraceInfo(Utilidades.GetCaller());
            using(var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("isIdServicio", servicioDTO.CodigoServicio);
                parameters.Add("isEquipo", servicioDTO.Equipo);
                parameters.Add("isMarca", servicioDTO.Marca);
                parameters.Add("isModelo",servicioDTO.Modelo);
                parameters.Add("isTipoServicio", servicioDTO.TipoServicio);
                parameters.Add("isEstado", servicioDTO.Estado);

                var result = connection.Query(
                    sql: "USP_SEL_SERVICIO",
                    param: parameters,
                    commandType: CommandType.StoredProcedure
                    ).Select(s => s as IDictionary<string, object>)
                    .Select(i => new ServicioDTO
                    {
                        CodigoServicio=i.Single(d=>d.Key.Equals("ID_SERVICIO")).Value.Parse<int>(),
                        TipoServicio=i.Single(d=>d.Key.Equals("TIPO_SERVICIO")).Value.Parse<string>(),
                        CodTipoServicio = i.Single(d => d.Key.Equals("CODTIPOSERVICIO")).Value.Parse<string>(),
                        //CodEquipo =i.Single(d => d.Key.Equals("CODEQUIPO")).Value.Parse<long>(),
                        Equipo =i.Single(d => d.Key.Equals("DESCRIPCIONEQUIPO")).Value.Parse<string>(),
                        Modelo = i.Single(d => d.Key.Equals("NOMBREMODELO")).Value.Parse<string>(),
                        Marca = i.Single(d => d.Key.Equals("NOMBREMARCA")).Value.Parse<string>(),
                        PrecioPreventivo = i.Single(d => d.Key.Equals("PRECIOPREVENTIVO")).Value.Parse<decimal>(),
                        PrecioCapacitacion = i.Single(d => d.Key.Equals("PRECIOCAPACITACION")).Value.Parse<decimal>(),
                        PrecioActualizacion = i.Single(d => d.Key.Equals("PRECIOSOFTWARE")).Value.Parse<decimal>(),
                        Instrumentos =i.Single(d=>d.Key.Equals("INSTRUMENTOS")).Value.Parse<string>(),
                        Herramientas=i.Single(d=>d.Key.Equals("TOOLCOMUN")).Value.Parse<string>(),
                        HerramientasEspeciales=i.Single(d=>d.Key.Equals("TOOLESPECIAL")).Value.Parse<string>(),
                        Estado = i.Single(d => d.Key.Equals("ESTADO")).Value.Parse<string>(),
                        UsuarioRegistra=i.Single(d=>d.Key.Equals("USR_REG")).Value.Parse<string>(),
                        FechaRegistro=i.Single(d=>d.Key.Equals("FEC_REG")).Value.Parse<DateTime>(),
                        UsuarioModifica = i.Single(d => d.Key.Equals("USR_MOD")).Value.Parse<string>(),
                        FechaModifica = i.Single(d => d.Key.Equals("FEC_MOD")).Value.Parse<DateTime>()
                    });
                return result;
            }
        }

        public RespuestaDTO MantenimientoDetalleServicio(DetalleServicioDTO detalle)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();

                parameters.Add("IsTipoProceso", detalle.TipoProceso);
                parameters.Add("IsID", detalle.Id);
                parameters.Add("IsID_SERVICIO", detalle.Id_Servicio);
                parameters.Add("IsDESMANTENIMIENTO", detalle.DesMantenimiento);
                parameters.Add("IsELIMINAR", detalle.Eliminar);
                parameters.Add("IsUsrEjecuta", detalle.UsuarioRegistra);

                var result = connection.Query(
                    sql: "USP_MANT_DETALLE_SERVICIOS",
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

        public RespuestaDTO MantenimientoServicios(ServicioDTO servicioDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();

                parameters.Add("IsTipoProceso", servicioDTO.TipoProceso);
                parameters.Add("IsID_SERVICIO",servicioDTO.CodigoServicio);
                parameters.Add("IsTIPOSERVICIO",servicioDTO.TipoServicio);
                parameters.Add("IsDESCRIPCIONEQUIPO",servicioDTO.Equipo);
                //parameters.Add("IsCODEQUIPO", servicioDTO.CodEquipo);
                parameters.Add("IsNOMBREMARCA",servicioDTO.Marca);
                parameters.Add("IsNOMBREMODELO",servicioDTO.Modelo);
                parameters.Add("IsPRECIOPREVENTIVO",servicioDTO.PrecioPreventivo);
                parameters.Add("IsPRECIOCAPACITACION",servicioDTO.PrecioCapacitacion);
                parameters.Add("IsPRECIOSOFTWARE",servicioDTO.PrecioActualizacion);
                parameters.Add("IsINSTRUMENTOS",servicioDTO.Instrumentos);
                parameters.Add("IsTOOLCOMUN",servicioDTO.Herramientas);
                parameters.Add("IsTOOLESPECIAL",servicioDTO.HerramientasEspeciales);
                parameters.Add("IsESTADO",servicioDTO.Estado);
                parameters.Add("IsUsrEjecuta",servicioDTO.UsuarioRegistra);
                    
                var result = connection.Query(
                    sql: "USP_MANT_SERVICIOS",
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

        public GrupoServicioDTO GetFullService(string CodServicio)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionSingle())
            {
                var parameters = new DynamicParameters();

                parameters.Add("@isId", CodServicio);

                SqlCommand command;
                var result = new GrupoServicioDTO();
                string query = "exec USP_SEL_MAIN_SERVICIO @isId=" + CodServicio;
                connection.Open();
                command = new SqlCommand(query, connection);

                using (var reader = command.ExecuteReader())
                {
                    reader.Read();
                    ServicioDTO servicio = new ServicioDTO
                    {
                        CodigoServicio = reader.IsDBNull(reader.GetOrdinal("ID_SERVICIO")) ? 0 : reader.GetInt32(reader.GetOrdinal("ID_SERVICIO")),
                        TipoServicio = reader.IsDBNull(reader.GetOrdinal("TIPO_SERVICIO")) ? "" : reader.GetString(reader.GetOrdinal("TIPO_SERVICIO")),
                        CodTipoServicio = reader.IsDBNull(reader.GetOrdinal("CODTIPOSERVICIO")) ? "" : reader.GetString(reader.GetOrdinal("CODTIPOSERVICIO")),
                        //CodEquipo = reader.IsDBNull(reader.GetOrdinal("CODEQUIPO")) ? 0 : reader.GetInt64(reader.GetOrdinal("CODEQUIPO")),
                        Equipo = reader.IsDBNull(reader.GetOrdinal("DESCRIPCIONEQUIPO")) ? "" : reader.GetString(reader.GetOrdinal("DESCRIPCIONEQUIPO")),
                        Modelo = reader.IsDBNull(reader.GetOrdinal("NOMBREMODELO")) ? "" : reader.GetString(reader.GetOrdinal("NOMBREMODELO")),
                        Marca = reader.IsDBNull(reader.GetOrdinal("NOMBREMARCA")) ? "" : reader.GetString(reader.GetOrdinal("NOMBREMARCA")),
                        PrecioPreventivo = reader.IsDBNull(reader.GetOrdinal("PRECIOPREVENTIVO")) ? 0 : reader.GetDecimal(reader.GetOrdinal("PRECIOPREVENTIVO")),
                        PrecioCapacitacion = reader.IsDBNull(reader.GetOrdinal("PRECIOCAPACITACION")) ? 0 : reader.GetDecimal(reader.GetOrdinal("PRECIOCAPACITACION")),
                        PrecioActualizacion = reader.IsDBNull(reader.GetOrdinal("PRECIOSOFTWARE")) ? 0 : reader.GetDecimal(reader.GetOrdinal("PRECIOSOFTWARE")),
                        Instrumentos = reader.IsDBNull(reader.GetOrdinal("INSTRUMENTOS")) ? "" : reader.GetString(reader.GetOrdinal("INSTRUMENTOS")),
                        Herramientas = reader.IsDBNull(reader.GetOrdinal("TOOLCOMUN")) ? "" : reader.GetString(reader.GetOrdinal("TOOLCOMUN")),
                        HerramientasEspeciales = reader.IsDBNull(reader.GetOrdinal("TOOLESPECIAL")) ? "" : reader.GetString(reader.GetOrdinal("TOOLESPECIAL")),
                        Estado = reader.IsDBNull(reader.GetOrdinal("ESTADO")) ? "" : reader.GetString(reader.GetOrdinal("ESTADO"))
                    };

                    reader.NextResult();

                    List<DetalleServicioDTO> _detalleservicios = new List<DetalleServicioDTO>();
                    while (reader.Read())
                    {
                        var detalle = new DetalleServicioDTO
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("ID")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID")),
                            Id_Servicio= reader.IsDBNull(reader.GetOrdinal("ID_SERVICIO")) ? 0 : reader.GetInt32(reader.GetOrdinal("ID_SERVICIO")),
                            DesMantenimiento = reader.IsDBNull(reader.GetOrdinal("DESMANTENIMIENTO")) ? "" : reader.GetString(reader.GetOrdinal("DESMANTENIMIENTO")),
                            Eliminar = reader.IsDBNull(reader.GetOrdinal("ELIMINAR")) ? 0 : reader.GetInt32(reader.GetOrdinal("ELIMINAR")),
                        };
                        _detalleservicios.Add(detalle);
                    }

                    result.CabeceraServicio = servicio;
                    result.servicios = _detalleservicios;

                    return result;
                }
            }
        }
    }
}
