using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using AHSECO.CCL.FRONTEND.Identity;
using AHSECO.CCL.BE;
using AHSECO.CCL.BL;
using Microsoft.Ajax.Utilities;
using AHSECO.CCL.BE.Mantenimiento;
using AHSECO.CCL.FRONTEND.Core;
using AHSECO.CCL.FRONTEND.Security;
using AHSECO.CCL.BL.Ventas;

namespace AHSECO.CCL.FRONTEND.Controllers.Alertas
{
    public class AlertasController : Controller
    {
        //GET Alertas
        public JsonResult ObtenerGarantiasProximasVencer()
        {
            var alertasBL = new AlertasBL();
            var result = alertasBL.ObtenerGarantiasProximasVencer();
            return Json(result);
        }
    }
}