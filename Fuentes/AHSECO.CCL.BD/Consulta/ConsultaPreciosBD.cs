using AHSECO.CCL.BE;
using AHSECO.CCL.BE.Filtros;
using AHSECO.CCL.COMUN;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BD.Consulta
{
    public class ConsultaPreciosBD
    {
        CCLog Log;
        public ConsultaPreciosBD():this(new CCLog()){
            
            
        }
        public ConsultaPreciosBD(CCLog log)
        {
            Log = log;
        }
        public IEnumerable<PrecioDTO> ObtenerPrecios(PrecioDTO precioDTO) {
            Log.TraceInfo(Utilidades.GetCaller());
            using(var connection = Factory.ConnectionFactory())
            {
                connection.Open();

                var parameters = new DynamicParameters();
                parameters.Add("CODPRODUCTO", precioDTO.CodigoProducto== null? "": precioDTO.CodigoProducto);
                parameters.Add("DESPRODUCTO", precioDTO.NombreProducto== null? "": precioDTO.NombreProducto);
                parameters.Add("TIPOMEDIDA", precioDTO.UnidadMedida == null ? "" : precioDTO.UnidadMedida);
                parameters.Add("CODFAMILIA", precioDTO.CodigoFamilia == null ? "" : precioDTO.CodigoFamilia);
                parameters.Add("CODMARCA ", precioDTO.CodigoMarca == null ? "" : precioDTO.CodigoMarca);
                parameters.Add("NUMPAGINAS", precioDTO.NumeroPaginas);
                parameters.Add("PAGINA", precioDTO.Pagina);

                var result = connection.Query(
                    sql: "USP_SEL_LISTA_PRECIOS",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new PrecioDTO
                    {
                            CodigoProducto=i.Single(d=>d.Key.Equals("CODIGOPRODUCTO")).Value.Parse<string>(),
                            NombreProducto=i.Single(d=>d.Key.Equals("NOMPRODUCTO")).Value.Parse<string>(),
                            UnidadMedida=i.Single(d=>d.Key.Equals("UM")).Value.Parse<string>(),
                            CodigoFabrica = i.Single(d=>d.Key.Equals("CODFABRICA")).Value.Parse<string>(),
                            CodigoAlmacen = i.Single(d => d.Key.Equals("CODALMACEN")).Value.Parse<string>(),
                            NombreAlmacen = i.Single(d => d.Key.Equals("NOMALMACEN")).Value.Parse<string>(),
                            StockDisponible = i.Single(d => d.Key.Equals("STOCKDISPONIBLE")).Value.Parse<decimal>(),
                            Control = i.Single(d => d.Key.Equals("CONTROL")).Value.Parse<string>(),
                            Lote = i.Single(d => d.Key.Equals("LOTESERIE")).Value.Parse<string>(),
                            StockLote = i.Single(d => d.Key.Equals("STOCKLT")).Value.Parse<decimal>(),
                            FechaVencimiento = i.Single(d => d.Key.Equals("FECVENC")).Value.Parse<string>(),
                            CodigoMarca = i.Single(d => d.Key.Equals("CODMARCA")).Value.Parse<string>(),
                            NombreMarca = i.Single(d => d.Key.Equals("DESMARCA")).Value.Parse<string>(),
                            CodigoFamilia = i.Single(d => d.Key.Equals("CODFAMILIA")).Value.Parse<string>(),
                            NombreFamilia = i.Single(d => d.Key.Equals("DESFAMILIA")).Value.Parse<string>(),
                            PrecioReferencial = i.Single(d => d.Key.Equals("PRECIOREFERENCIA")).Value.Parse<decimal>(),
                    });

                return result;
            }
        
        }

        public FiltroGrupoPreciosDTO FiltrosPrecios()
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionSingle())
            {

                var parameters = new DynamicParameters();
                SqlCommand command;
                var result = new FiltroGrupoPreciosDTO();
                string query = "EXEC USP_FILTROS_PRECIOS";
                connection.Open();
                command = new SqlCommand(query, connection);


                using (var reader = command.ExecuteReader())
                {
                    List<ComboDTO> _listaMarcas = new List<ComboDTO>();

                    while (reader.Read())
                    {
                        var marca = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("CODMARCA")) ? "" : reader.GetString(reader.GetOrdinal("CODMARCA")),
                            Text = reader.IsDBNull(reader.GetOrdinal("NOMBREMARCA")) ? "" : reader.GetString(reader.GetOrdinal("NOMBREMARCA"))
                        };
                        _listaMarcas.Add(marca);
                    }
                    reader.NextResult();

                    List<ComboDTO> _listaFamilias = new List<ComboDTO>();

                    while (reader.Read())
                    {
                        var familia = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("CODFAMILIA")) ? "" : reader.GetString(reader.GetOrdinal("CODFAMILIA")),
                            Text = reader.IsDBNull(reader.GetOrdinal("NOMBREFAMILIA")) ? "" : reader.GetString(reader.GetOrdinal("NOMBREFAMILIA"))
                        };
                        _listaFamilias.Add(familia);
                    }

                    reader.NextResult();

                    List<ComboDTO> _listaMedidas = new List<ComboDTO>();

                    while (reader.Read())
                    {
                        var medida = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("CODMEDIDA")) ? "" : reader.GetString(reader.GetOrdinal("CODMEDIDA")),
                            Text = reader.IsDBNull(reader.GetOrdinal("NOMBREMEDIDA")) ? "" : reader.GetString(reader.GetOrdinal("NOMBREMEDIDA"))
                        };
                        _listaMedidas.Add(medida);
                    }

                    reader.NextResult();

                    List<ComboDTO> _listaAlmacenes = new List<ComboDTO>();

                    while (reader.Read())
                    {
                        var almacen = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("CODALMACEN")) ? "" : reader.GetString(reader.GetOrdinal("CODALMACEN")),
                            Text = reader.IsDBNull(reader.GetOrdinal("NOMBREALMACEN")) ? "" : reader.GetString(reader.GetOrdinal("NOMBREALMACEN"))
                        };
                        _listaAlmacenes.Add(almacen);
                    }

                    result.Marcas = _listaMarcas;
                    result.Familias = _listaFamilias;
                    result.Medidas = _listaMedidas;
                    result.Almacenes = _listaAlmacenes;

                }

                return result;

            }
        }
    }
}
