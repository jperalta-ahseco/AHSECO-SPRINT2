using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE.Ventas.Despacho
{
    public class ReqDespachoCabecera : CamposAuditoriaDTO
    {
        public string TipoProceso { get; set; }
        public long? Id { get; set; }
        public long Id_Solicitud { get; set; }
        public long Id_Cotizacion {  get; set; }
        public long Id_WorkFlow {  get; set; }
        public string TipoDesp {  get; set; }
        public string NumOrden {  get; set; }
        public string Estado { get; set; }
        public DateTime? FechaOrden {  get; set; }
        public DateTime? FechaMax {  get; set; }
        public string NumFactura {  get; set; }
        public DateTime? FechaFactura {  get; set; }
        public string NumContrato {  get; set; }
        public DateTime? FecContrato { get; set; }
        public string Calculo {  get; set; }
        public bool? Fianza {  get; set; }
        public bool? PrestPrin {  get; set; }
        public string NumFianzaApp {  get; set; }
        public bool? PrestAcc {  get; set; }
        public string NumFianzaApa {  get; set; }
        public decimal? PorDscto {  get; set; }
        public decimal? SubTotalVenta {  get; set; }
        public decimal? MontoIgV {  get; set; }
        public decimal? TotalVenta { get; set; }

        public string NombreEstado { get; set; }
        public string FechaOrdenFormat {  get; set; }
        public string FechaMaximaFormat { get; set; }
        public string FechaFacturaFormat { get; set; }
        public string FechaContratoFormat { get; set; } 
        public string FianzaFormat { get; set; }
        public string PrestPrinFormat { get; set; }
        public string PrestAccFormat { get; set; }

    }
}
