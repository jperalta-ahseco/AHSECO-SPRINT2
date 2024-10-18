using AHSECO.CCL.BE;
using AHSECO.CCL.COMUN;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BD.Consulta
{
    public class ConsultaStockBD
    {
        CCLog Log;
        public ConsultaStockBD() : this(new CCLog())
        {
        }
        public ConsultaStockBD(CCLog log) { 
            Log=log;
        }
        public IEnumerable<StockDTO> ObtenerStock(StockDTO stock) {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection=Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("CODPRODUCTO", stock.CodigoProducto);
                parameters.Add("DESPRODUCTO", stock.DescripcionProducto);
                parameters.Add("CODIGOFABRICA", stock.CodigoFabrica);
                parameters.Add("TIPOMEDIDA", stock.UnidadMedida);
                parameters.Add("CODALMACEN", stock.CodigoAlmacen);
                parameters.Add("CODMARCA", stock.CodigoMarca);
                parameters.Add("CODFAMILIA", stock.CodigoFamilia);
                parameters.Add("NUMPAGINAS", stock.NumeroPaginas);
                parameters.Add("PAGINA", stock.Pagina);

                var result = connection.Query(
                    sql: "USP_SEL_STOCKS",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new StockDTO
                    {
                        CodigoProducto=i.Single(d=>d.Key.Equals("CODIGOPRODUCTO")).Value.Parse<string>(),
                        DescripcionProducto = i.Single(d => d.Key.Equals("NOMPRODUCTO")).Value.Parse<string>(),
                        UnidadMedida= i.Single(d => d.Key.Equals("UM")).Value.Parse<string>(),
                        CodigoFabrica=i.Single(d=>d.Key.Equals("CODFABRICA")).Value.Parse<string>(),
                        CodigoAlmacen = i.Single(d => d.Key.Equals("CODALMACEN")).Value.Parse<string>(),
                        DescripcionAlmacen = i.Single(d => d.Key.Equals("NOMALMACEN")).Value.Parse<string>(),
                        StockDisponible = i.Single(d => d.Key.Equals("STOCKDISPONIBLE")).Value.Parse<decimal>(),
                        Control = i.Single(d => d.Key.Equals("CONTROL")).Value.Parse<string>(),
                        Lote = i.Single(d => d.Key.Equals("LOTESERIE")).Value.Parse<string>(),
                        StockLote = i.Single(d => d.Key.Equals("STOCKLT")).Value.Parse<decimal>(),
                        FechaVencimiento = i.Single(d => d.Key.Equals("FECVENC")).Value.Parse<string>(),
                        CodigoMarca = i.Single(d => d.Key.Equals("CODMARCA")).Value.Parse<string>(),
                        NombreMarca = i.Single(d => d.Key.Equals("DESMARCA")).Value.Parse<string>(),
                        CodigoFamilia = i.Single(d => d.Key.Equals("CODFAMILIA")).Value.Parse<string>(),
                        NombreFamilia = i.Single(d => d.Key.Equals("DESFAMILIA")).Value.Parse<string>(),
                        PrecioReferencial = i.Single(d => d.Key.Equals("PRECIOREFERENCIA")).Value.Parse<decimal>()
                    });
                return result;
            }
        }
    }
}
