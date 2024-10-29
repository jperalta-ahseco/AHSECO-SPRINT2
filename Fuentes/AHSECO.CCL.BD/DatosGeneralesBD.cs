using System;
using System.Collections.Generic;
using AHSECO.CCL.COMUN;
using AHSECO.CCL.BE;
using Dapper;
using System.Data;
using System.Linq;
using System.Data.SqlClient;

namespace AHSECO.CCL.BD
{

    public class DatosGeneralesBD
    {
        CCLog Log = new CCLog();

        public IEnumerable<DatosGeneralesDetalleDTO> Obtener(DatosGeneralesDetalleDTO DatosGeneralesDetalle)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();

                var parameters = new DynamicParameters();
                if (DatosGeneralesDetalle.DatosGenerales != null) { parameters.Add("isDominio", DatosGeneralesDetalle.DatosGenerales.Dominio); }
                parameters.Add("isParametro", DatosGeneralesDetalle.Parametro);
                if (DatosGeneralesDetalle.DatosGenerales != null) { parameters.Add("inCabeceraId", DatosGeneralesDetalle.DatosGenerales.Id); }
                parameters.Add("inDetalleId", DatosGeneralesDetalle.Id);

                var result = connection.Query(
                    sql: "USP_SEL_DATOS_GENERALES_DETALLE",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new DatosGeneralesDetalleDTO
                    {
                        Id = i.Single(d => d.Key.Equals("ID")).Value.Parse<int>(),
                        DatosGenerales = new DatosGeneralesDTO
                        {
                            Id = i.Single(d => d.Key.Equals("ID_CAB")).Value.Parse<int>(),
                        },
                        Parametro = i.Single(d => d.Key.Equals("PARAMETRO")).Value.Parse<string>(),
                        Descripcion = i.Single(d => d.Key.Equals("DESCRIPCION")).Value.Parse<string>(),
                        CodValor1 = i.Single(d => d.Key.Equals("COD_VALOR1")).Value.Parse<string>(),
                        CodValor2 = i.Single(d => d.Key.Equals("COD_VALOR2")).Value.Parse<string>(),
                        CodValor3 = i.Single(d => d.Key.Equals("COD_VALOR3")).Value.Parse<string>(),
                        Valor1 = i.Single(d => d.Key.Equals("VALOR1")).Value.Parse<string>(),
                        Valor2 = i.Single(d => d.Key.Equals("VALOR2")).Value.Parse<string>(),
                        Valor3 = i.Single(d => d.Key.Equals("VALOR3")).Value.Parse<string>(),
                        Habilitado = i.Single(d => d.Key.Equals("HABILITADO")).Value.Parse<bool>(),
                        Estado = Utilidades.Parse<int>(i.Single(d => d.Key.Equals("ESTADO")).Value),
                        Editable = Utilidades.Parse<int>(i.Single(d => d.Key.Equals("EDITABLE")).Value),
                        Dominio = i.Single(d => d.Key.Equals("DOMINIO")).Value.Parse<string>(),

                    });
                connection.Close();
                return result;
            }
        }

        public RespuestaDTO ObtenerParametroNuevo(int idCabecera)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using(var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("inCabeceraId", idCabecera);

                var result = connection.Query
                      (
                          sql: "USP_SEL_NUEVO_PARAMETRO",
                          param: parameters,
                          commandType: CommandType.StoredProcedure
                      )
                       .Select(s => s as IDictionary<string, object>)
                          .Select(i => new RespuestaDTO
                          {
                              Mensaje = i.Single(d => d.Key.Equals("NUEVOPARAMETRO")).Value.Parse<string>()

                          }).FirstOrDefault();
                connection.Close();
                return result;

            }
        }
        public bool Insertar(DatosGeneralesDetalleDTO DatosGeneralesDetalle)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();

                var parameters = new DynamicParameters();
                parameters.Add("inCabeceraId", DatosGeneralesDetalle.DatosGenerales.Id);
                parameters.Add("isDescripcion", DatosGeneralesDetalle.Descripcion);
                parameters.Add("isValor1", DatosGeneralesDetalle.CodValor1);
                parameters.Add("isValor2", DatosGeneralesDetalle.CodValor2);
                parameters.Add("isValor3", DatosGeneralesDetalle.CodValor3);
                parameters.Add("inValor1", DatosGeneralesDetalle.Valor1);
                parameters.Add("inValor2", DatosGeneralesDetalle.Valor2);
                parameters.Add("inValor3", DatosGeneralesDetalle.Valor3);
                parameters.Add("isHabilitado", DatosGeneralesDetalle.Habilitado);
                parameters.Add("inEstado", DatosGeneralesDetalle.Estado);
                parameters.Add("isEditable", DatosGeneralesDetalle.Editable);
         
                parameters.Add("isUsuarioId", DatosGeneralesDetalle.UsuarioRegistra);

                var result = connection.Execute
                (
                    sql: "USP_INS_DATOS_GENERALES_DETALLE",
                    param: parameters,
                    commandType: CommandType.StoredProcedure
                );
                connection.Close();
                return true;
            }
        }

        public bool Actualizar(DatosGeneralesDetalleDTO DatosGeneralesDetalle)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();

                var parameters = new DynamicParameters();
                parameters.Add("inDetalleId", DatosGeneralesDetalle.Id);
                parameters.Add("inCabeceraId", DatosGeneralesDetalle.DatosGenerales.Id);
                parameters.Add("isDescripcion", DatosGeneralesDetalle.Descripcion);
                parameters.Add("isValor1", DatosGeneralesDetalle.CodValor1);
                parameters.Add("isValor2", DatosGeneralesDetalle.CodValor2);
                parameters.Add("isValor3", DatosGeneralesDetalle.CodValor3);
                parameters.Add("inValor1", DatosGeneralesDetalle.Valor1);
                parameters.Add("inValor2", DatosGeneralesDetalle.Valor2);
                parameters.Add("inValor3", DatosGeneralesDetalle.Valor3);
                parameters.Add("isHabilitado", DatosGeneralesDetalle.Habilitado);
                parameters.Add("inEstado", DatosGeneralesDetalle.Estado);
                parameters.Add("isEditable", DatosGeneralesDetalle.Editable);
              
                parameters.Add("isUsuarioId", DatosGeneralesDetalle.UsuarioModifica);

                var result = connection.Execute
                (
                    sql: "USP_UPD_DATOS_GENERALES_DETALLE",
                    param: parameters,
                    commandType: CommandType.StoredProcedure
                );
                connection.Close();
                return true;
            }
        }


        public IEnumerable<DatosGeneralesDTO> ObtenerCabeceras(DatosGeneralesDTO datosGeneralesDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();

                var parameters = new DynamicParameters();
                parameters.Add("inCabeceraId", datosGeneralesDTO.Id);
                parameters.Add("isDominio", datosGeneralesDTO.Dominio);

                var result = connection.Query<DatosGeneralesDTO>(
                    sql: "USP_SEL_DATOS_GENERALES_CABECERA",
                    param: parameters,
                    commandType: CommandType.StoredProcedure);

                connection.Close();
                return result;
            }
        }

        public bool GuardarCabecera(DatosGeneralesDTO datosGeneralesDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();

                var parameters = new DynamicParameters();
                parameters.Add("inCabeceraId", datosGeneralesDTO.Id);
                parameters.Add("isDescripcion", datosGeneralesDTO.Descripcion);
                parameters.Add("isUsuarioModifica", datosGeneralesDTO.UsuarioModifica);
                parameters.Add("isPuedeCrecer", datosGeneralesDTO.PuedeCrecer);
                var result = connection.Execute(
                    sql: "USP_UPD_DATOS_GENERALES_CABECERA",
                    param: parameters,
                    commandType: CommandType.StoredProcedure);
                connection.Close();
                return true;
            }
        }
        public bool InsetarCabecera(DatosGeneralesDTO datosGeneralesDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using(var connection = Factory.ConnectionFactory())
            {
             
                    connection.Open();
                    var parameters = new DynamicParameters();
                    parameters.Add("isDominio", datosGeneralesDTO.Dominio);
                    parameters.Add("isPrefijo", datosGeneralesDTO.Prefijo);
                    parameters.Add("isDescripcion", datosGeneralesDTO.Descripcion);
                    parameters.Add("isPuedeCrecer", datosGeneralesDTO.PuedeCrecer);
                    parameters.Add("isAudit_Reg_Usr", datosGeneralesDTO.UsuarioRegistra);
                    parameters.Add("isAudit_TimeStamp", datosGeneralesDTO.FechaModifica);

                    var result = connection.Execute(
                        sql: "USP_INS_DATOS_GENERALES",
                        param: parameters,
                        commandType: CommandType.StoredProcedure);


                connection.Close();
                return true;
            }
          
        }
    }
}