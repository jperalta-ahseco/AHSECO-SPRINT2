using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AHSECO.CCL.BE;
using AHSECO.CCL.BL;
using AHSECO.CCL.FRONTEND.Core;
using AHSECO.CCL.FRONTEND.Identity;
using AHSECO.CCL.FRONTEND.Security;
using NPOI.HSSF.UserModel;
using NPOI.HSSF.Util;
using NPOI.SS.UserModel;

namespace AHSECO.CCL.FRONTEND.Controllers
{
    public class SeguridadPerfilController : Controller
    {
        // GET: SeguridadPerfil
        [Permissions(Permissions = "SEGURIDADPERFIL")]
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Obtener(PerfilDTO perfilDTO)
        {
            var perfilBL = new PerfilBL();
            var response = perfilBL.Obtener(perfilDTO);
            return Json(response);
        }

        public void ExportarPerfiles(PerfilDTO perfilDTO)
        {
            var perfilBL = new PerfilBL();
            var listaPerfiles = perfilBL.Obtener(perfilDTO).Result.ToList();

            var hssfworkbook = new HSSFWorkbook();
            ISheet sh = hssfworkbook.CreateSheet("Perfiles");

            // Creacion del estilo
            var fontbold = hssfworkbook.CreateFont();
            fontbold.Boldweight = (short)FontBoldWeight.Bold;
            fontbold.Color = HSSFColor.White.Index;
            fontbold.FontHeightInPoints = 8;
            fontbold.FontName = "Arial";

            var style = hssfworkbook.CreateCellStyle();
            style.SetFont(fontbold);
            style.BorderBottom = BorderStyle.Thin;
            style.BorderTop = BorderStyle.None;
            style.BorderRight = BorderStyle.None;
            style.BorderLeft = BorderStyle.None;
            style.FillForegroundColor = HSSFColor.Red.Index;
            style.FillPattern = FillPattern.SolidForeground;

            var fontBoldII = hssfworkbook.CreateFont();
            fontBoldII.Boldweight = (short)FontBoldWeight.Bold;
            fontBoldII.Color = HSSFColor.DarkBlue.Index;
            fontBoldII.FontHeightInPoints = 8;
            fontBoldII.FontName = "Arial";

            var styleII = hssfworkbook.CreateCellStyle();
            styleII.SetFont(fontBoldII);
            styleII.BorderBottom = BorderStyle.Thin;
            styleII.BorderTop = BorderStyle.None;
            styleII.BorderRight = BorderStyle.None;
            styleII.BorderLeft = BorderStyle.None;
            styleII.FillForegroundColor = HSSFColor.Yellow.Index;
            styleII.FillPattern = FillPattern.SolidForeground;

            IDataFormat dataFormatCustom = hssfworkbook.CreateDataFormat();
            var styleDate = hssfworkbook.CreateCellStyle();
            styleDate.DataFormat = dataFormatCustom.GetFormat("dd/MM/yyyy");

            var styleIII = hssfworkbook.CreateCellStyle();
            styleIII.SetFont(fontbold);
            styleIII.BorderBottom = BorderStyle.Thin;
            styleIII.BorderTop = BorderStyle.None;
            styleIII.BorderRight = BorderStyle.None;
            styleIII.BorderLeft = BorderStyle.None;
            styleIII.FillForegroundColor = HSSFColor.Red.Index;
            styleIII.FillPattern = FillPattern.SolidForeground;
            styleIII.DataFormat = dataFormatCustom.GetFormat("dd/MM/yyyy");


            // Impresion de cabeceras
            int rownum = 0;
            int cellnum = 0;
            IRow row = sh.CreateRow(rownum++);
            ICell cell;

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Código Perfil");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Descripción");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Habilitado");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("User Registro");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha Registro");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("IP Registro");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("User Modificacion");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha Modificacion");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("IP Modificacion");

            //// Impresión de la data
            foreach (var item in listaPerfiles)
            {
                cellnum = 0;
                row = sh.CreateRow(rownum++);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Id.ToString());

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Descripcion);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.DescripcionHabilitado);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.UsuarioRegistra);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.FechaRegistroFormat);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.IpMaquinaRegistro);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.UsuarioModifica);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.FechaModificacionFormat);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.IpMaquinaModifica);
            }

            var filename = "REPORTE_PERFILES_" + DateTime.Now.ToString("ddMMyyyyHHmmss") + ".xls";
            Response.AddHeader("content-disposition", "attachment; filename=" + filename);
            Response.ContentType = "application/vnd.ms-excel";

            Stream outStream = Response.OutputStream;
            hssfworkbook.Write(outStream);
            outStream.Close();
            Response.End();

        }

        public JsonResult Guardar(PerfilDTO perfilDTO)
        {
            var perfilBL = new PerfilBL();
            if (perfilDTO.Id == 0)
            {
                perfilDTO.UsuarioRegistra = User.ObtenerUsuario();
                perfilDTO.IpMaquinaRegistro = User.ObtenerIP();
                var response = perfilBL.Insertar(perfilDTO);
                return Json(response);
            }
            else
            {
                perfilDTO.UsuarioModifica = User.ObtenerUsuario();
                perfilDTO.IpMaquinaModifica = User.ObtenerIP();
                var response = perfilBL.Actualizar(perfilDTO);
                return Json(response);
            }
        }

        public JsonResult GuardarPermisos(List<TreeMenuDTO> nodos, PerfilDTO perfil)
        {
            var perfilBL = new PerfilBL();
            perfil.UsuarioRegistra = User.ObtenerUsuario();
            perfil.IpMaquinaRegistro = User.ObtenerIP();
            var response = perfilBL.GuardarPermisos(nodos, perfil);
            return Json(response);
        }

        public JsonResult ObtenerPermisos(string idPerfil)
        {
            var opcionesBL = new OpcionBL();
            var responseTotalOpciones = opcionesBL.Obtener(new OpcionDTO());
            var perfilBL = new PerfilBL();
            var responsePermisos = perfilBL.ObtenerPermisos(new PerfilDTO
            {
                Id = Convert.ToInt32(idPerfil)
            });

            var totalOpciones = responseTotalOpciones.Result;
            if (responsePermisos.Status == COMUN.ResponseStatusDTO.Success && responsePermisos.Result.Any())
            {
                totalOpciones = totalOpciones.Select(x =>
                {
                    x.Seleccionado = responsePermisos.Result.Any(y => y.Id == x.Id);
                    return x;
                }).ToList();
            }

            var arbolOpciones = Utils.ConstruirArbolOpciones(totalOpciones);

            return Json(arbolOpciones, JsonRequestBehavior.AllowGet);
        }
    }
}