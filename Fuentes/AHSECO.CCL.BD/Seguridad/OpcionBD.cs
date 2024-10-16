using Dapper;
using AHSECO.CCL.BE;
using AHSECO.CCL.COMUN;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BD
{
    public class OpcionBD
    {
        CCLog Log = new CCLog();

        public IEnumerable<OpcionDTO> Obtener(OpcionDTO opcionesDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();

                var parameters = new DynamicParameters();
                parameters.Add("id", opcionesDTO.Id);
                parameters.Add("isNombre", opcionesDTO.Nombre);

                var result = connection.Query(
                    sql: "USP_SEL_SEGURIDAD_OPCION",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new OpcionDTO
                    {
                        Id = i.Single(d => d.Key.Equals("ID")).Value.Parse<int>(),
                        Tipo = i.Single(d => d.Key.Equals("TIPO")).Value.Parse<string>(),
                        Codigo= i.Single(d => d.Key.Equals("CODIGO")).Value.Parse<string>(),
                        Nombre= i.Single(d => d.Key.Equals("NOMBRE")).Value.Parse<string>(),
                        Descripcion = i.Single(d => d.Key.Equals("DESCRIPCION")).Value.Parse<string>(),
                        Url = i.Single(d => d.Key.Equals("URL")).Value.Parse<string>(),
                        Nivel = i.Single(d => d.Key.Equals("NIVEL")).Value.Parse<int>(),
                        Orden = i.Single(d => d.Key.Equals("ORDEN")).Value.Parse<int>(),
                        Padre = new OpcionDTO
                        {
                            Id = i.Single(d => d.Key.Equals("PADRE")).Value.Parse<int>(),
                        },
                        Icono = i.Single(d => d.Key.Equals("ICONO")).Value.Parse<string>(),
                        Habilitado = i.Single(d => d.Key.Equals("HABILITADO")).Value.Parse<string>(),
                        UsuarioModifica = i.Single(d => d.Key.Equals("USR_REG")).Value.Parse<string>(),
                        FechaModifica = i.Single(d => d.Key.Equals("FEC_REG")).Value.Parse<DateTime>(),
                    });

                return result;
            }
        }

        public bool Insertar(OpcionDTO OpcionesDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();

                var parameters = new DynamicParameters();
                parameters.Add("isTipo", OpcionesDTO.Tipo);
                parameters.Add("isCodigo", OpcionesDTO.Codigo);
                parameters.Add("isNombre", OpcionesDTO.Nombre);
                parameters.Add("isDescripcion", OpcionesDTO.Descripcion);
                parameters.Add("isUrl", OpcionesDTO.Url);
                parameters.Add("inPadre", OpcionesDTO.Padre.Id);
                parameters.Add("isIcono", OpcionesDTO.Icono);
                parameters.Add("isHabilitado", OpcionesDTO.Habilitado);
                parameters.Add("isUsuarioRegistra", OpcionesDTO.UsuarioRegistra);
                parameters.Add("isIpMaquinaRegistra",OpcionesDTO.IpMaquinaRegistro);

                var result = connection.Execute
                (
                    sql: "USP_INS_SEGURIDAD_OPCION",
                    param: parameters,
                    commandType: CommandType.StoredProcedure
                );

                return true;
            }
        }

        public bool Actualizar(OpcionDTO OpcionesDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();

                var parameters = new DynamicParameters();
                parameters.Add("id", OpcionesDTO.Id);
                parameters.Add("isTipo", OpcionesDTO.Tipo);
                parameters.Add("isCodigo", OpcionesDTO.Codigo);
                parameters.Add("isNombre", OpcionesDTO.Nombre);
                parameters.Add("isDescripcion", OpcionesDTO.Descripcion);
                parameters.Add("isUrl", OpcionesDTO.Url);
                parameters.Add("inPadre", OpcionesDTO.Padre.Id);
                parameters.Add("isIcono", OpcionesDTO.Icono);
                parameters.Add("isHabilitado", OpcionesDTO.Habilitado);
                parameters.Add("isUsuarioModifica", OpcionesDTO.UsuarioModifica);
                parameters.Add("IpMaquina",OpcionesDTO.IpMaquinaModifica);

                var result = connection.Execute
                (
                    sql: "USP_UPD_SEGURIDAD_OPCION",
                    param: parameters,
                    commandType: CommandType.StoredProcedure
                );

                return true;
            }
        }

        public bool Eliminar(OpcionDTO OpcionesDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();

                var parameters = new DynamicParameters();
                parameters.Add("id", OpcionesDTO.Id);

                var result = connection.Execute
                (
                    sql: "USP_DEL_SEGURIDAD_OPCION",
                    param: parameters,
                    commandType: CommandType.StoredProcedure
                );

                return true;
            }
        }
    }
}
