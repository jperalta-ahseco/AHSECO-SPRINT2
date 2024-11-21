using System;

namespace AHSECO.CCL.BE.ServicioTecnico.BandejaGarantias
{
    public class DetalleSolicitudGarantiaDTO
    {
        public long Id_Despacho_Dist        { get; set; }
        public string NumSerie              { get;set;}
        public long Id_Cotizacion           {get;set;}
        public string Descripcion           { get;set;}
        public string Desmarca              { get;set;}
        public string Modelo                { get;set;}
        public string CodigoProducto       { get;set;}
        public int MantPreventivo           { get;set;}
        public int preventReal              { get;set;}
        public int PreventPendiente         { get;set;}
        public DateTime FechaInstalacion    { get;set;}
        public string CodGarantia           { get;set;}
        public string ValorGarantia         { get;set;}
        public string FechaVencimiento      { get; set; }
        public string EstadoGarant          { get; set; }
        public string Direccion             { get; set; }
        public string NumFianza             { get; set; }
        public string UbicacionDestino      { get; set; }
        public string CodUbicacionDestino { get; set; }

    }
}
