using AHSECO.CCL.BE.Ventas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AHSECO.CCL.COMUN;

namespace AHSECO.CCL.BE
{
    public class ArticuloDTO : CamposAuditoriaDTO
    {
        public string CodArticulo { get; set; }
        public string DescArticulo { get; set; }
        public string DescRealArticulo 
        {
            get
            {
                var strDesc = this.DescArticulo;
                string strModelo = null;
                var tag = ConstantesDTO.Articulos.Tag.Tag_1;
                if (this.DescArticulo != null)
                {
                    if (this.DescArticulo.ToUpper().IndexOf(tag) >= 0)
                    {
                        strDesc = this.DescArticulo.Substring(0, this.DescArticulo.ToUpper().IndexOf(tag));
                        strModelo = this.DescArticulo.Substring(this.DescArticulo.ToUpper().IndexOf(tag) + tag.Length);
                        if (string.IsNullOrEmpty(strModelo)) { strDesc = this.DescArticulo; }
                    }
                }
                return strDesc;
            }
        }
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
        public string CodModelo { get; set; }
        public string DescModelo { get; set; }
        public string DescRealModelo
        {
            get
            {
                string strModelo = null;
                var tag = ConstantesDTO.Articulos.Tag.Tag_1;
                if (this.DescArticulo != null)
                {
                    if (this.DescArticulo.ToUpper().IndexOf(tag) >= 0)
                    {
                        strModelo = this.DescArticulo.Substring(this.DescArticulo.ToUpper().IndexOf(tag) + tag.Length);
                    }
                }
                return strModelo;
            }
        }
        public string CodAlmacen { get; set; }
        public string DescAlmacen { get; set; }
        public bool EsDisponible { get; set; }
        public AlmacenDTO[] Almacenes { get; set; }
        public bool IsTempRecord { get; set; }
        public string CodArticuloTemp { get; set; }
    }
}
