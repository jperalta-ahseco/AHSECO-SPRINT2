using AHSECO.CCL.BD;
using AHSECO.CCL.BE;
using AHSECO.CCL.COMUN;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace AHSECO.CCL.BL
{
    public class UsuarioPerfilBL
    {
        private UsuarioPerfilBD Repository;
        private CCLog Log;

        public UsuarioPerfilBL()
            : this(new UsuarioPerfilBD(), new CCLog())
        {
        }

        public UsuarioPerfilBL(UsuarioPerfilBD UsuarioPerfilBD, CCLog log)
        {
            Repository = UsuarioPerfilBD;
            Log = log;
        }

        public ResponseDTO<IEnumerable<UsuarioDTO>> Obtener(PerfilDTO perfilDTO, int asignados)
        {
            try
            {
                var result = Repository.Obtener(perfilDTO, asignados);
                return new ResponseDTO<IEnumerable<UsuarioDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<IEnumerable<UsuarioDTO>>(ex);
            }
        }

        public ResponseDTO<bool> Guardar(List<UsuarioDTO> usuarios, PerfilDTO perfilDTO)
        {
            try
            {
                var xmlPermisos = new XDocument(new XDeclaration("1.0", "utf-8", "yes"),
                    new XElement("Root",
                    from i in usuarios
                    select
                    new XElement("Node",
                        new XElement("PerfilId", perfilDTO.Id),
                        new XElement("UsuarioId", i.Id),
                        new XElement("UsuarioRegistra", perfilDTO.UsuarioRegistra),
                        new XElement("IpMaquinaRegistro", perfilDTO.IpMaquinaRegistro))));
                var result = Repository.Guardar(xmlPermisos.ToString(), perfilDTO);
                return new ResponseDTO<bool>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<bool>(ex);
            }
        }
    }
}