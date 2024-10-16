using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using AHSECO.CCL.BE;
using AHSECO.CCL.BL;
using AHSECO.CCL.FRONTEND.Identity;

namespace AHSECO.CCL.FRONTEND.Controllers
{
    public class SeguridadJerarquiaController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        //No enviar Usuario
        public JsonResult ObtenerJerarquias(JerarquiaDTO jerarquiaDTO)
        {
            if (jerarquiaDTO == null)
            {
                jerarquiaDTO = new JerarquiaDTO();
            }
            if (jerarquiaDTO.Ejecutor == null)
            {
                jerarquiaDTO.Ejecutor = new CentroEvaluacionDTO();
            }
            var jerarquiaBL = new JerarquiaBL();
            var response = jerarquiaBL.Obtener(jerarquiaDTO);
            return Json(response);
        }
        //No enviar Usuario
        //public JsonResult ObtenerOrganizaciones(bool indicadorEje, bool indicadorEPS)
        //{
        //    var centroEvaluacionBL = new CentroEvaluacionBL();
        //    var result = centroEvaluacionBL.Obtener(new CentroEvaluacionDTO ());
        //    var rs = new
        //    {
        //        result.Status,
        //        result.CurrentException,
        //        Result = result.Result.Where(x => (   (indicadorEPS && x.IndicadorEPS == indicadorEPS) || (indicadorEje && x.IndicadorEje == indicadorEje)))
        //        .Select(i => new
        //        {
        //            Id = i.Id,
        //            Text = i.RazonSocial
        //        })
        //    };
        //    return Json(rs);
        //}

        public JsonResult Guardar(JerarquiaDTO jerarquiaDTO)
        {
            var jerarquiaBL = new JerarquiaBL();
            if (jerarquiaDTO.Id == 0)
            {
                jerarquiaDTO.UsuarioRegistra = User.ObtenerUsuario();
                jerarquiaDTO.IpMaquinaRegistro = User.ObtenerIP();
                var response = jerarquiaBL.Insertar(jerarquiaDTO);
                return Json(response);
            }
            else
            {
                jerarquiaDTO.UsuarioModifica = User.ObtenerUsuario();
                jerarquiaDTO.IpMaquinaModifica = User.ObtenerIP();
                var response = jerarquiaBL.Actualizar(jerarquiaDTO);
                return Json(response);
            }
        }

        public JsonResult Eliminar(JerarquiaDTO jerarquiaDTO)
        {
            var jerarquiaBL = new JerarquiaBL();
            var response = jerarquiaBL.Eliminar(jerarquiaDTO);
            return Json(response);
        }
    }
}