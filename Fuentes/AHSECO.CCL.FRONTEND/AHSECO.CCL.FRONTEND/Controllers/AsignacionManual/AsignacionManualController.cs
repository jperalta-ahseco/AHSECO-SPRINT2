using System;
using AHSECO.CCL.FRONTEND.Identity;
using NPOI.HSSF.UserModel;
using NPOI.HSSF.Util;
using NPOI.SS.UserModel;
using System.Linq;
using AHSECO.CCL.BE.AsignacionManual;
using AHSECO.CCL.BL.AsignacionManual;
using System.IO;
using System.Web.Mvc;
using AHSECO.CCL.FRONTEND.Security;

namespace AHSECO.CCL.FRONTEND.Controllers.AsignacionManual
{
    public class AsignacionManualController : Controller
    {
        //GET:  AsignacionTerritorial
        [Permissions(Permissions = "ASIGNACIONMANUAL")]
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ObtenerListClientevsAsesor(ClientevsAsesorDTO clientevsAsesorDTO)
        {
            var asignacionManualBL = new AsignacionManualBL();
            var response = asignacionManualBL.ObtenerListClientevsAsesor(clientevsAsesorDTO);
            return Json(response);
        }

        public JsonResult Mantenimiento(ClientevsAsesorDTO clientevsAsesorDTO)
        {
            var asignacionManualBL = new AsignacionManualBL();
            clientevsAsesorDTO.UsuarioRegistra = User.ObtenerUsuario();
            var response = asignacionManualBL.Mantenimiento(clientevsAsesorDTO);
            return Json(response);
        }


       public void GenerarReporte(ClientevsAsesorDTO clientevsAsesorDTO)
        {
            var asignacionManualBL = new AsignacionManualBL();
            var asignacionesFiltrado = asignacionManualBL.ObtenerListClientevsAsesorExcel(clientevsAsesorDTO).Result.ToList();

            var hssfworkbook = new HSSFWorkbook();
            ISheet sh = hssfworkbook.CreateSheet("AsignacionManual");

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
            cell.SetCellValue("RUC");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Nombre Empresa");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Nombre Asesor");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Eliminado");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha de registro de asignacion");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha de modificación de asignacion");

            //// Impresión de la data
            foreach (var item in asignacionesFiltrado)
            {
                cellnum = 0;
                row = sh.CreateRow(rownum++);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Cliente.RUC);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Cliente.NomEmpresa);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Empleado.NombresCompletosEmpleado);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Eliminado);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.FecRegistro);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.FechaModificacion);

                sh.SetColumnWidth(0, 20 * 256);
                sh.SetColumnWidth(1, 20 * 256);
                sh.SetColumnWidth(2, 100 * 256);
                sh.SetColumnWidth(3, 20 * 256);
                sh.SetColumnWidth(4, 40 * 256);
                sh.SetColumnWidth(5, 40 * 256);
            }

            var filename = "REPORTE" + DateTime.Now.ToString("ddMMyyyyHHmmss") + ".xls";
            Response.AddHeader("content-disposition", "attachment; filename=" + filename);
            Response.ContentType = "application/vnd.ms-excel";

            Stream outStream = Response.OutputStream;
            hssfworkbook.Write(outStream);
            outStream.Close();
            Response.End();

        }
    }
}