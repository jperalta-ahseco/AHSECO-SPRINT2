using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AHSECO.CCL.BE;
using AHSECO.CCL.BL;
using AHSECO.CCL.BL.Mantenimiento;
using AHSECO.CCL.BL.Util;
using AHSECO.CCL.FRONTEND.Core;
using AHSECO.CCL.FRONTEND.Identity;

namespace AHSECO.CCL.FRONTEND.Controllers
{
    public class UtilesController : Controller
    {
        [HttpPost]
        public JsonResult ListarDocumentos()
        {
            DatosGeneralesDetalleDTO datosGeneralesDetalleDTO = new DatosGeneralesDetalleDTO();
            DatosGeneralesDTO datosGenerales = new DatosGeneralesDTO();
            datosGenerales.Dominio = "GENTDOC";
            datosGeneralesDetalleDTO.DatosGenerales = datosGenerales;
            var datosGeneralesBL = new DatosGeneralesBL();
            var result = datosGeneralesBL.Obtener(datosGeneralesDetalleDTO);
            var rs = new
            {
                result.Status,
                result.CurrentException,
                Result = result.Result.Where(t=>t.Habilitado == true).Select(i => new
                {
                    Id = i.Parametro,
                    Text = i.Descripcion
                })
            };
            return Json(rs);
        }

        [HttpPost]
        public JsonResult ListarEmpresas()
        {
            DatosGeneralesDetalleDTO datosGeneralesDetalleDTO = new DatosGeneralesDetalleDTO();
            DatosGeneralesDTO datosGenerales = new DatosGeneralesDTO();
            datosGenerales.Dominio = "RAZSOCIAL";
            datosGeneralesDetalleDTO.DatosGenerales = datosGenerales;
            datosGeneralesDetalleDTO.Habilitado = true;
            datosGeneralesDetalleDTO.Estado = 1;
            var datosGeneralesBL = new DatosGeneralesBL();
            var result = datosGeneralesBL.Obtener(datosGeneralesDetalleDTO);
            var rs = new
            {
                result.Status,
                result.CurrentException,
                Result = result.Result.Where(t => t.Habilitado == true).Select(i => new
                {
                    Id = i.CodValor1,
                    Text = i.Valor1
                })
            };
            return Json(rs);
        }

        [HttpPost]
        public JsonResult ListarAreas()
        {
            AreaDTO areaDTO = new AreaDTO();
            areaDTO.CodigoArea = 0;
            areaDTO.NombreArea = "";
            areaDTO.Estado = 1;
            var areasBL = new AreasBL();
            var result = areasBL.Obtener(areaDTO);
            var rs = new
            {
                result.Status,
                result.CurrentException,
                Result = result.Result.Select(i => new
                {
                    Id = i.CodigoArea,
                    Text = i.NombreArea
                })
            };
            return Json(rs);
        }

        [HttpPost]
        public JsonResult ListarCargos()
        {
            CargoDTO cargoDTO = new CargoDTO();
            AreaDTO areaDTO = new AreaDTO();
            cargoDTO.CodigoCargo = 0;
            cargoDTO.NombreCargo = "";
            areaDTO.CodigoArea = 0;
            cargoDTO.Area = areaDTO;
            cargoDTO.Estado = 1;
            var cargosBL = new CargosBL();
            var result = cargosBL.Obtener(cargoDTO);
            var rs = new
            {
                result.Status,
                result.CurrentException,
                Result = result.Result.Select(i => new
                {
                    Id = i.CodigoCargo,
                    Text = i.NombreCargo
                })
            };
            return Json(rs);
        }

        [HttpPost]
        public JsonResult ListarCargosxArea(int codArea)
        {
            CargoDTO cargoDTO = new CargoDTO();
            AreaDTO areaDTO = new AreaDTO();
            cargoDTO.CodigoCargo = 0;
            cargoDTO.NombreCargo = "";
            areaDTO.CodigoArea = codArea;
            cargoDTO.Area = areaDTO;
            cargoDTO.Estado = 1;
            var cargosBL = new CargosBL();
            var result = cargosBL.Obtener(cargoDTO);
            var rs = new
            {
                result.Status,
                result.CurrentException,
                Result = result.Result.Select(i => new
                {
                    Id = i.CodigoCargo + "|" + i.Area.CodigoArea,
                    Text = i.NombreCargo
                })
            };
            return Json(rs);
        }

        [HttpPost]
        public JsonResult ListarEstados()
        {
            DatosGeneralesDetalleDTO datosGeneralesDetalleDTO = new DatosGeneralesDetalleDTO();
            DatosGeneralesDTO datosGenerales = new DatosGeneralesDTO();
            datosGenerales.Dominio = "ESTADOS";
            datosGeneralesDetalleDTO.DatosGenerales = datosGenerales;
            var datosGeneralesBL = new DatosGeneralesBL();
            var result = datosGeneralesBL.Obtener(datosGeneralesDetalleDTO);
            var rs = new
            {
                result.Status,
                result.CurrentException,
                Result = result.Result.Where(t => t.Habilitado == true).Select(i => new
                {
                    Id = i.CodValor1,
                    Text = i.Valor1
                })
            };
            return Json(rs);
        }

        [HttpPost]
        public JsonResult ValidarParametros(FiltroValidadorDTO filtroValidadorDTO)
        {
            var utilesBL = new UtilesBL();
            var result = utilesBL.ValidarParametros(filtroValidadorDTO);
            return Json(result);
        }

        [HttpPost]
        public JsonResult ListarTipoDocumentos(int codFlujo)
        {
            DatosGeneralesDetalleDTO datosGeneralesDetalleDTO = new DatosGeneralesDetalleDTO();
            DatosGeneralesDTO datosGenerales = new DatosGeneralesDTO();
            datosGenerales.Dominio = "TIPODOC";
            datosGeneralesDetalleDTO.DatosGenerales = datosGenerales;
            var datosGeneralesBL = new DatosGeneralesBL();
            var result = datosGeneralesBL.Obtener(datosGeneralesDetalleDTO);
            var rs = new
            {
                result.Status,
                result.CurrentException,
                Result = result.Result.Where(t => t.Habilitado == true && t.CodValor1 == codFlujo.ToString()).Select(i => new
                {
                    Id = i.CodValor2,
                    Text = i.Valor2
                })
            };
            return Json(rs);
        }
        [HttpPost]
        public JsonResult ListarTipos()
        {
            DatosGeneralesDetalleDTO datosGeneralesDetalleDTO = new DatosGeneralesDetalleDTO();
            DatosGeneralesDTO datosGenerales = new DatosGeneralesDTO();
            datosGenerales.Dominio = "TIPEMPL";
            datosGeneralesDetalleDTO.DatosGenerales = datosGenerales;
            var datosGeneralesBL = new DatosGeneralesBL();
            var result = datosGeneralesBL.Obtener(datosGeneralesDetalleDTO);
            var rs = new
            {
                result.Status,
                result.CurrentException,
                Result = result.Result.Where(t => t.Habilitado == true).Select(i => new
                {
                    Id = i.CodValor1,
                    Text = i.Valor1
                })
            };
            return Json(rs);
        }
        [HttpPost]
        public JsonResult ListarSexos()
        {
            DatosGeneralesDetalleDTO datosGeneralesDetalleDTO = new DatosGeneralesDetalleDTO();
            DatosGeneralesDTO datosGenerales = new DatosGeneralesDTO();
            datosGenerales.Dominio = "SEXEMPL";
            datosGeneralesDetalleDTO.DatosGenerales = datosGenerales;
            var datosGeneralesBL = new DatosGeneralesBL();
            var result = datosGeneralesBL.Obtener(datosGeneralesDetalleDTO);
            var rs = new
            {
                result.Status,
                result.CurrentException,
                Result = result.Result.Where(t => t.Habilitado == true).Select(i => new
                {
                    Id = i.CodValor1,
                    Text = i.Valor1
                })
            };
            return Json(rs);
        }
    }
}