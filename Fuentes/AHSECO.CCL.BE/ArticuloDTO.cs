using AHSECO.CCL.BE.Ventas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class ArticuloDTO : CamposAuditoriaDTO
    {
        public string CodArticulo { get; set; }
        public string DescArticulo { get; set; }
        public string CodUnidad { get; set; }
        public string DescUnidad { get; set; }
        public string CodFamilia { get; set; }
        public string DescFamilia { get; set; }
        public string CodLinea { get; set; }
        public string DescLinea { get; set; }
        public string CodMarca { get; set; }
        public string DescMarca { get; set; }
        public int StockDisponible { get; set; }
        public decimal PrecioRef { get; set; }
        public string CodAlmacen { get; set; }
        public string DescAlmacen { get; set; }
        public bool EsDisponible { get; set; }
        public AlmacenDTO[] Almacenes { get; set; }
    }
}
