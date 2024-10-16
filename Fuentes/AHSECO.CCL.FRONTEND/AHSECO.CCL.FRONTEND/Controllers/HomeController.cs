using AHSECO.CCL.FRONTEND.Core;
using AHSECO.CCL.FRONTEND.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace AHSECO.CCL.FRONTEND.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";
            ViewBag.Mensaje = ConfigurationManager.AppSettings.Get("MensajeSeguridad");
            string token = VariableSesion.getCadena("Token");
            if (token != "" && token != null)
            {
                var permision = VariableSesion.getCadena("Permision");
                if (permision == null || permision == "")
                {
                    ViewBag.Mensaje = "Usted no tiene permisos para ingresar a esta opción del sistema. Ingrese por el menú del sistema.";
                    return View();
                }
                string controlador = "Home";
                string vista = "Inicio";
                return Redirect(Url.Action(vista, controlador));
            }
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Index(LoginViewModel model)
        {

            return View();
        }

        public ActionResult Inicio()
        {
            return View();
        }

        public ActionResult Cerrar()
        {
            return View();
        }

        public ActionResult Error()
        {
            ViewBag.Mensaje = Request.Params["mensaje"];
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LogOut()
        {
            FormsAuthentication.SignOut();
            Session.Abandon();
            return Redirect(Url.Action("Cerrar", "Home"));
        }
    }
}
