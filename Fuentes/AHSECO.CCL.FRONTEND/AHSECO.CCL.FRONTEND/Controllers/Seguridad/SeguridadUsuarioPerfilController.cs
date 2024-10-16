using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AHSECO.CCL.BE;
using AHSECO.CCL.BL;
using AHSECO.CCL.FRONTEND.Identity;
using AHSECO.CCL.FRONTEND.Security;

namespace AHSECO.CCL.FRONTEND.Controllers
{
    public class SeguridadUsuarioPerfilController : Controller
    {
        // GET: SeguridadUsuarioPerfil
        [Permissions(Permissions = "SEGURIDADUSUARIOPERFIL")]
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ObtenerPerfiles()
        {
            var perfilBL = new PerfilBL();
            var result = perfilBL.Obtener(new PerfilDTO());
            var rs = new
            {
                result.Status,
                result.CurrentException,
                Result = result.Result.Where(t => t.Habilitado == "1" ).Select(i => new
                {
                    Id = i.Id,
                    Text = i.Descripcion
                })
            };
            return Json(rs);
        }

        public JsonResult ObtenerUsuariosNoAsignados(PerfilDTO perfilDTO)
        {
            var usuarioPerfilBL = new UsuarioPerfilBL();
            var result = usuarioPerfilBL.Obtener(perfilDTO, 0);
            var rs = new
            {
                result.Status,
                result.CurrentException,
                Result = result.Result.Select(i => new
                {
                    Id = i.Id,
                    Text = string.Format("{0}, {1}",i.Apellidos, i.Nombres)
                })
            };
            return Json(rs);
        }

        public JsonResult ObtenerUsuariosAsignados(PerfilDTO perfilDTO)
        {
            var usuarioPerfilBL = new UsuarioPerfilBL();
            var result = usuarioPerfilBL.Obtener(perfilDTO, 1);
            var rs = new
            {
                result.Status,
                result.CurrentException,
                Result = result.Result.Select(i => new
                {
                    Id = i.Id,
                    Text = string.Format("{0}, {1}", i.Apellidos, i.Nombres)
                })
            };
            return Json(rs);
        }

        public JsonResult Guardar(List<UsuarioDTO> usuarios, PerfilDTO perfilDTO)
        {
            var usuarioPerfilBL = new UsuarioPerfilBL();
            perfilDTO.UsuarioRegistra = User.ObtenerUsuario();
            perfilDTO.IpMaquinaRegistro = User.ObtenerIP();
            if (usuarios == null)
            {
                usuarios = new List<UsuarioDTO>();
            }
            var result = usuarioPerfilBL.Guardar(usuarios, perfilDTO);
            return Json(result);
        }
    }
}