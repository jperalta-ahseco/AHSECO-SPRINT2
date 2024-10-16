using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AHSECO.CCL.BE;
using AHSECO.CCL.BL;
using AHSECO.CCL.COMUN;
using AHSECO.CCL.FRONTEND.Core;
using AHSECO.CCL.FRONTEND.Identity;
using AHSECO.CCL.FRONTEND.Security;

namespace AHSECO.CCL.FRONTEND.Controllers
{
    public class SeguridadOpcionController : Controller
    {
        // GET: SeguridadOpciones
        [Permissions(Permissions = "SEGURIDADOPCION")]
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Obtener()
        {
            var opcionesBL = new OpcionBL();
            var response = opcionesBL.Obtener(new OpcionDTO());
            var nodoRaiz = Utils.ConstruirArbolOpciones(response.Result);
            return Json(nodoRaiz, JsonRequestBehavior.AllowGet);
        }
        
        public JsonResult Guardar(OpcionDTO opcionesDTO)
        {
            var opcionesBL = new OpcionBL();
            if (opcionesDTO.Id == 0)
            {
                opcionesDTO.UsuarioRegistra = User.ObtenerUsuario();
                opcionesDTO.IpMaquinaRegistro = User.ObtenerIP();
                var response = opcionesBL.Insertar(opcionesDTO);
                return Json(response);
            }
            else
            {
                opcionesDTO.UsuarioModifica = User.ObtenerUsuario();
                opcionesDTO.IpMaquinaModifica = User.ObtenerIP();
                var response = opcionesBL.Actualizar(opcionesDTO);
                return Json(response);
            }
        }

        public JsonResult Eliminar(OpcionDTO opcionesDTO)
        {
            var opcionesBL = new OpcionBL();
            var response = opcionesBL.Eliminar(opcionesDTO);
            return Json(response);
        }
    }
}