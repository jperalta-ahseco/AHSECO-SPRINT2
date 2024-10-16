using System;
using System.Linq;
using System.Web.Mvc;
using AHSECO.CCL.BE;
using AHSECO.CCL.BL.Mantenimiento;
using AHSECO.CCL.FRONTEND.Identity;
using NPOI.HSSF.UserModel;
using NPOI.HSSF.Util;
using NPOI.SS.UserModel;
using System.IO;
using AHSECO.CCL.FRONTEND.Security;

namespace AHSECO.CCL.FRONTEND.Controllers.Mantenimientos
{
    public class BandejaCargosController : Controller
    {
        // GET: BandejaVentas
        [Permissions(Permissions = "BANDEJACARGOS")]
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult MantenimientoCargos(CargoDTO cargoDTO) 
        {
            var cargosBL = new CargosBL();
            cargoDTO.UsuarioRegistra = User.ObtenerUsuario();
            cargoDTO.FechaRegistroFormat = User.ObtenerFechaUltimaSesion();
            var response = cargosBL.MantenimientosCargos(cargoDTO);
            return Json(response);
        }
        public JsonResult ObtenerCargos(CargoDTO cargoDTO)
        {
            var cargosBL = new CargosBL();
            cargoDTO.UsuarioRegistra = User.ObtenerUsuario();
            cargoDTO.CodigoCargo = Convert.ToInt32(cargoDTO.CodigoCargo);
            var response=cargosBL.Obtener(cargoDTO);
            return Json(response);

        }

        public void ExportarCargos(CargoDTO cargoDTO)
        {
            var cargosBL = new CargosBL();
            var listaCargos = cargosBL.Obtener(cargoDTO).Result.ToList();

            var hssfworkbook = new HSSFWorkbook();
            ISheet sh = hssfworkbook.CreateSheet("Cargos");

            // Creacion del estilo
            var fontbold = hssfworkbook.CreateFont();
            fontbold.Boldweight = (short)FontBoldWeight.Bold;
            fontbold.Color = HSSFColor.White.Index;
            fontbold.FontHeightInPoints = 10;
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


            #region Impresion de cabeceras
            int rownum = 0;
            int cellnum = 0;
            IRow row = sh.CreateRow(rownum++);
            ICell cell;

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Código Cargo");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Nombre Cargo");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Nombre de Área");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Estado");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Usuario Registro");


            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha de Registro");


            #endregion


            //// Impresión de la data
            foreach (var item in listaCargos)
            {
                cellnum = 0;
                row = sh.CreateRow(rownum++);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.CodigoCargo);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NombreCargo);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Area.NombreArea);

                cell = row.CreateCell(cellnum++);
                var nomEstado = "";
                if(item.Estado > 0)
                {
                    nomEstado = "Activo";
                } else
                {
                    nomEstado = "Inactivo";
                }

                cell.SetCellValue(nomEstado);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.UsuarioRegistra);


                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.FechaRegistroFormat);


               
            }
			 for(var i = 0; i < cellnum; i++)
			 {
				 sh.SetColumnWidth(i, 19 * 255);
			 }
            var filename = "REPORTE_CARGO_" + DateTime.Now.ToString("ddMMyyyyHHmmss") + ".xls";
            Response.AddHeader("content-disposition", "attachment; filename=" + filename);
            Response.ContentType = "application/vnd.ms-excel";

            Stream outStream = Response.OutputStream;
            hssfworkbook.Write(outStream);
            outStream.Close();
            Response.End();

        }
    }
}