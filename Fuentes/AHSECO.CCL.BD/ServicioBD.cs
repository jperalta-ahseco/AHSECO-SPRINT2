using AHSECO.CCL.BE;
using AHSECO.CCL.COMUN;
using Dapper;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
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

        public int Equipos()
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactoryPostgresSQL())
            {
                connection.Open();
                NpgsqlCommand cmd = new NpgsqlCommand("SELECT * FROM public.equipos", connection);
                NpgsqlDataReader dr = cmd.ExecuteReader();

                if (dr.Read())
                {
                    //blnfound = true;
                    //modulos form = new modulos();
                    //form.Show();
                    //this.Hide();
                }

            }
                return 0;
        }



        public IEnumerable<ServicioDTO> ObtenerServicios(ServicioDTO servicioDTO) {
            Log.TraceInfo(Utilidades.GetCaller());
            using(var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("isEquipo", servicioDTO.CodigoEquipo);
                parameters.Add("isMarca", servicioDTO.CodigoMarca);
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
                        TipoServicio=i.Single(d=>d.Key.Equals("TIPOSERVICIO")).Value.Parse<string>(),
                        Equipo=i.Single(d => d.Key.Equals("DESCRIPCIONEQUIPO")).Value.Parse<string>(),
                        Modelo = i.Single(d => d.Key.Equals("NOMBREMODELO")).Value.Parse<string>(),
                        Marca = i.Single(d => d.Key.Equals("NOMBREMARCA")).Value.Parse<string>(),
                        PrecioPreventivo = i.Single(d => d.Key.Equals("PRECIOPREVENTIVO")).Value.Parse<string>(),
                        PrecioCapacitacion = i.Single(d => d.Key.Equals("PRECIOCAPACITACION")).Value.Parse<string>(),
                        PrecioActualizacion = i.Single(d => d.Key.Equals("PRECIOSOFTWARE")).Value.Parse<string>(),
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

        public bool InsertarServicio(ServicioDTO servicioDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using(var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("isTipoServicio", servicioDTO.TipoServicio);
                parameters.Add("isDescripcionEquipo",servicioDTO.Equipo);
                parameters.Add("isNombreMarca",servicioDTO.Marca);
                parameters.Add("isNombreModelo",servicioDTO.Modelo);
                parameters.Add("isPrecioPreventivo", servicioDTO.PrecioPreventivo);
                parameters.Add("isPrecioCapacitacion", servicioDTO.PrecioCapacitacion);
                parameters.Add("isPrecioSoftware", servicioDTO.PrecioActualizacion);
                parameters.Add("isIntrumentos", servicioDTO.Instrumentos);
                parameters.Add("isHerramientasComunes",servicioDTO.Herramientas);
                parameters.Add("isHerramientasEspeciales", servicioDTO.HerramientasEspeciales);
                parameters.Add("isEstado", servicioDTO.Estado);
                parameters.Add("isUsuReg", servicioDTO.UsuarioRegistra);
                parameters.Add("isUsuMod", servicioDTO.UsuarioModifica);
                parameters.Add("isFecMod",servicioDTO.FechaModifica);
            }
            return true;
        }
        public bool ActualizarServicio(ServicioDTO servicioDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using(var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("isTipoServicio",servicioDTO.TipoServicio);
                parameters.Add("isDescripcionEquipo",servicioDTO.Equipo);
                parameters.Add("isNombreMarca", servicioDTO.Marca);
                parameters.Add("isNombreModelo", servicioDTO.Modelo);
                parameters.Add("isPrecioPreventivo", servicioDTO.PrecioPreventivo);
                parameters.Add("isPrecioCapacitacion", servicioDTO.PrecioCapacitacion);
                parameters.Add("isPrecioSoftware",servicioDTO.PrecioActualizacion);
                parameters.Add("isInstrumentos", servicioDTO.Instrumentos);
                parameters.Add("isHerramientasComunes", servicioDTO.Herramientas);
                parameters.Add("isHerramientasEspeciales", servicioDTO.HerramientasEspeciales);
                parameters.Add("isEstado", servicioDTO.Estado);
                parameters.Add("isUsuReg", servicioDTO.UsuarioRegistra);
                parameters.Add("isUsuMod", servicioDTO.UsuarioModifica);
                parameters.Add("isFecMod", servicioDTO.FechaModifica);
            }
            return true;
        }
        public bool InsertarDetalleServicio(ServicioDTO servicioDTO) {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("", servicioDTO.DescripcionPreventivo);
            }
            return true;
        }
        
    }
}
