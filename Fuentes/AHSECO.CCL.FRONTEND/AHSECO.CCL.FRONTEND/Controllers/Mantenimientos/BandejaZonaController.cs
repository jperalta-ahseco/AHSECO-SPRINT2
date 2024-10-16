using System.IO;
using System;
using System.Web.Mvc;
using AHSECO.CCL.BE.Mantenimiento;
using AHSECO.CCL.BL.Mantenimiento;
using AHSECO.CCL.FRONTEND.Identity;
using AHSECO.CCL.FRONTEND.Security;
using NPOI.HSSF.UserModel;
using NPOI.HSSF.Util;
using NPOI.SS.UserModel;
using System.Linq;

namespace AHSECO.CCL.FRONTEND.Controllers.Mantenimientos
{
    public class BandejaZonaController : Controller
    {
        [Permissions(Permissions = "BANDEJAZONA")]
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Obtener(ZonaDTO zonaDTO)
        {
            var zonaBL = new ZonasBL();
            var result = zonaBL.Obtener(zonaDTO);  
            return Json(result);
        }

        public JsonResult Insertar(ZonaDTO zonaDTO)
        {
            var zonasBL = new ZonasBL();
            zonaDTO.UsuarioRegistra = User.ObtenerUsuario();
            var response = zonasBL.Insertar(zonaDTO);
            return Json(response);
        }

        public JsonResult Actualizar(ZonaDTO zonaDTO)
        {
            var zonasBL = new ZonasBL();
            zonaDTO.UsuarioModifica = User.ObtenerUsuario();
            var response = zonasBL.Actualizar(zonaDTO);
            return Json(response);
        }


        public void GenerarReportesZonas(ZonaDTO zonaDTO)
        {
            var zonaBL = new ZonasBL();
            var clientesFiltrados = zonaBL.Obtener(zonaDTO).Result.ToList();

            var hssfworkbook = new HSSFWorkbook();
            ISheet sh = hssfworkbook.CreateSheet("Zonas");

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
            cell.SetCellValue("Número");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Descripción");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Estado");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Usuario Registra");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha de Creación");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha de Modificación");


            //// Impresión de la data
            foreach (var item in clientesFiltrados)
            {
                var estado = "";
                if (item.Estado == true)
                {
                    estado = "ACTIVO";
                }
                else
                {
                    estado = "INACTIVO";
                }
                cellnum = 0;
                row = sh.CreateRow(rownum++);


                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Id);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.DesZona);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(estado);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.UsuarioRegistra);

                cell = row.CreateCell(cellnum++);
                cell.CellStyle = styleDate;
                DateTime fechaRegistro = DateTime.Parse(item.FechaRegistro.ToString("dd/MM/yyyy"));
                cell.SetCellValue(fechaRegistro);

                sh.SetColumnWidth(0, 20 * 256);
                sh.SetColumnWidth(1, 20 * 256);
                sh.SetColumnWidth(2, 20 * 256);
                sh.SetColumnWidth(3, 20 * 256);
                sh.SetColumnWidth(4, 20 * 256);
                sh.SetColumnWidth(5, 20 * 256);
            }

            var filename = "REPORTE-ZONAS" + DateTime.Now.ToString("ddMMyyyyHHmmss") + ".xls";
            Response.AddHeader("content-disposition", "attachment; filename=" + filename);
            Response.ContentType = "application/vnd.ms-excel";

            Stream outStream = Response.OutputStream;
            hssfworkbook.Write(outStream);
            outStream.Close();
            Response.End();

        }

    }
}