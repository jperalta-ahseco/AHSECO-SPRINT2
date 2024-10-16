using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AHSECO.CCL.BL;
using AHSECO.CCL.BE;
using AHSECO.CCL.FRONTEND.Identity;
using AHSECO.CCL.FRONTEND.Security;

namespace AHSECO.CCL.FRONTEND.Controllers
{
    public class BandejaParametrosController : Controller
    {
        // GET: MantenimientosGenerales
        [Permissions(Permissions = "BANDEJAPARAMETROS")]
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ObtenerCabeceras()
        {
            var datosGeneralesBL = new DatosGeneralesBL();
            var result = datosGeneralesBL.ObtenerCabeceras(new DatosGeneralesDTO());
            var rs = new
            {
                result.Status,
                result.CurrentException,
                Result = result.Result.Select(i => new
                {
                    Id = i.Id,
                    Text=i.Descripcion
                })
            };
            return Json(rs);
        }
        public JsonResult ObtenerDominios()
        {
            var datosGeneralesBL = new DatosGeneralesBL();
            var result = datosGeneralesBL.ObtenerCabeceras(new DatosGeneralesDTO());
            var rs = new
            {
                result.Status,
                result.CurrentException,
                Result = result.Result.Select(i => new
                {
                    Id = i.Id,
                    Text=i.Dominio
                })
            };
            return Json(rs);
        }

        public JsonResult ObtenerPrefijos()
        {
            var datosGeneralesBL = new DatosGeneralesBL();
            var result = datosGeneralesBL.ObtenerCabeceras(new DatosGeneralesDTO());
            var rs = new
            {
                result.Status,
                result.CurrentException,
                Result = result.Result.Select(i => new
                {
                    Id = i.Id,
                    Text = i.Prefijo
                })
            };
            return Json(rs);
        }

        public JsonResult ObtenerCabecera(DatosGeneralesDTO datosGeneralesDTO)
        {
            var datosGeneralesBL = new DatosGeneralesBL();
            var result = datosGeneralesBL.ObtenerCabeceras(datosGeneralesDTO);
            return Json(result);
        }

        public JsonResult GuardarCabecera(DatosGeneralesDTO datosGeneralesDTO)
        {
            var datosGeneralesBL = new DatosGeneralesBL();
            datosGeneralesDTO.UsuarioModifica = User.ObtenerUsuario();
            var result = datosGeneralesBL.GuardarCabecera(datosGeneralesDTO);
            return Json(result);
        }

        public JsonResult ObtenerDetalles(DatosGeneralesDetalleDTO datosGeneralesDetalleDTO)
        {
            var datosGeneralesBL = new DatosGeneralesBL();
            datosGeneralesDetalleDTO.UsuarioModifica=User.ObtenerUsuario();
            var result = datosGeneralesBL.Obtener(datosGeneralesDetalleDTO);
            return Json(result);
        }

        public JsonResult GrabarDetalle(DatosGeneralesDetalleDTO datosGeneralesDetalleDTO)
        {
            var datosGeneralesBL = new DatosGeneralesBL();
            if (datosGeneralesDetalleDTO.Id == 0)
            {

                datosGeneralesDetalleDTO.UsuarioRegistra = User.ObtenerUsuario();

                var result = datosGeneralesBL.Insertar(datosGeneralesDetalleDTO);
                return Json(result);
            }
            else
            {

                datosGeneralesDetalleDTO.UsuarioModifica = User.ObtenerUsuario();
                var result = datosGeneralesBL.Actualizar(datosGeneralesDetalleDTO);
                return Json(result);
            }
        }
        public JsonResult InsertarCabecera(DatosGeneralesDTO datosGeneralesDTO) {

            var datosGeneralesBL = new DatosGeneralesBL();
            datosGeneralesDTO.UsuarioRegistra = User.ObtenerUsuario();
            var result = datosGeneralesBL.InsertarCabecera(datosGeneralesDTO);
            return Json(result);

        }
        public JsonResult ObtenerNuevoParametro(DatosGeneralesDetalleDTO datosGeneralesDetalle)
        {
            var datosGeneralesBL = new DatosGeneralesBL();
            datosGeneralesDetalle.UsuarioRegistra=User.ObtenerUsuario();
            var result = datosGeneralesBL.ObtenerParametro(datosGeneralesDetalle);
            return Json(result);
        }

    }
}