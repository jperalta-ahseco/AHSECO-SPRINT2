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
    public class PerfilBL
    {
        private PerfilBD Repository;
        private CCLog Log;

        public PerfilBL()
            : this(new PerfilBD(), new CCLog())
        {
        }

        public PerfilBL(PerfilBD PerfilBD, CCLog log)
        {
            Repository = PerfilBD;
            Log = log;
        }

        public ResponseDTO<IEnumerable<PerfilDTO>> Obtener(PerfilDTO perfilDTO)
        {
            try
            {
                var result = Repository.Obtener(perfilDTO);
                return new ResponseDTO<IEnumerable<PerfilDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<IEnumerable<PerfilDTO>>(ex);
            }
        }

        public ResponseDTO<bool> Insertar(PerfilDTO perfilDTO)
        {
            try
            {
                var result = Repository.Insertar(perfilDTO);
                return new ResponseDTO<bool>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<bool>(ex);
            }
        }

        public ResponseDTO<bool> Actualizar(PerfilDTO perfilDTO)
        {
            try
            {
                var result = Repository.Actualizar(perfilDTO);
                return new ResponseDTO<bool>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<bool>(ex);
            }
        }

        public ResponseDTO<bool> GuardarPermisos(List<TreeMenuDTO> treeMenuDTO, PerfilDTO perfilDTO)
        {
            try
            {
                var xmlPermisos = new XDocument(new XDeclaration("1.0", "utf-8", "yes"),
                    new XElement("Root",
                    from i in treeMenuDTO
                    select
                    new XElement("Node",
                        new XElement("PerfilId", perfilDTO.Id),
                        new XElement("OpcionId", i.id),
                        new XElement("UsuarioRegistra", perfilDTO.UsuarioRegistra),
                        new XElement("IpMaquinaRegistro", perfilDTO.IpMaquinaRegistro))));
                var result = Repository.GuardarPermisos(xmlPermisos.ToString());
                return new ResponseDTO<bool>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<bool>(ex);
            }
        }

        public ResponseDTO<IEnumerable<OpcionDTO>> ObtenerPermisos(PerfilDTO perfilDTO)
        {
            try
            {
                var result = Repository.ObtenerPermisos(perfilDTO);
                return new ResponseDTO<IEnumerable<OpcionDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<IEnumerable<OpcionDTO>>(ex);
            }
        }
    }
}