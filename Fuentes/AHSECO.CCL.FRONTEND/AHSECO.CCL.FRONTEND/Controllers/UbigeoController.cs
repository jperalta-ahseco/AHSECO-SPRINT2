using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AHSECO.CCL.BE;
using AHSECO.CCL.BL;
using AHSECO.CCL.BL.Util;
using AHSECO.CCL.FRONTEND.Identity;


namespace AHSECO.CCL.FRONTEND.Controllers
{
    public class UbigeoController : Controller
    {
        public JsonResult ObtenerUbigeo(UbigeoDTO ubigeoDTO)
        {
            var ubigeoBL = new UbigeoBL();
            ubigeoDTO.UsuarioRegistra = User.ObtenerIdUsuario();
            var response = ubigeoBL.Obtener(ubigeoDTO);
            return Json(response);
        }
    }
}