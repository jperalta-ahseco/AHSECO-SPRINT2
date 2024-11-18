using AHSECO.CCL.BE.Ventas;
using System;
using System.Collections.Generic;

namespace AHSECO.CCL.BE.ServicioTecnico.BandejaInstalacionTecnica
{
    public class GrupoInstalacionTecnicaDTO
    {
        public InstalacionTecnicaDTO CabeceraInstalacion { get; set; }
        public List<InstalacionTecnicaDetalleDTO> DetalleInstalacion{ get; set; }
        public List<ElementosxProductoDTO> Elementos { get; set; }

        //        public List<TecnicoInstalacionDTO> TecnicoInstalacion { get; set; }
        public List<ObservacionDTO> Observaciones { get; set; }
        public List<DocumentoDTO> Adjuntos { get; set; }
    }
}
