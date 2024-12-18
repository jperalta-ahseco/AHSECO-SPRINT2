﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class PrecioDTO
    {
        public string CodigoProducto { get; set; }
        public string NombreProducto { get; set; } 
        public string UnidadMedida { get; set; }
        public string CodigoFabrica { get; set; }
        public string CodigoAlmacen { get; set; }
        public string NombreAlmacen { get; set; }
        public decimal StockDisponible { get; set; }
        public string Control { get; set; }
        public string Lote { get; set; }    
        public decimal StockLote { get; set; }
        public string FechaVencimiento { get; set; }
        public string CodigoMarca { get; set; }
        public string NombreMarca { get; set; }
        public string CodigoFamilia { get; set; }
        public string NombreFamilia { get; set; }
        public decimal PrecioReferencial { get; set; }
        public int NumeroPaginas {  get; set; }
        public int Pagina { get; set; }
    }
}
