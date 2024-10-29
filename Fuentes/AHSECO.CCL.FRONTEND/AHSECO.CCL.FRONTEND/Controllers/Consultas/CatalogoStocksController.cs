using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AHSECO.CCL.BE;
using AHSECO.CCL.BL;
using AHSECO.CCL.BL.Consulta;
using AHSECO.CCL.FRONTEND.Identity;
using AHSECO.CCL.FRONTEND.Security;
using NPOI.HSSF.UserModel;
using NPOI.HSSF.Util;
using NPOI.SS.UserModel;
namespace AHSECO.CCL.FRONTEND.Controllers.Consultas
{
    public class CatalogoStocksController : Controller
    {
        // GET: CatalogoStocks
        [Permissions(Permissions = "CATALOGOSTOCKS")]
        public ActionResult Index()
        {
            IEnumerable<string> listaStocks = new List<string>
            {
                "Código Producto",
                "Nombre Producto",
                "Unidad Medida",
                "Código Fabrica",
                "Almacen",
                "Familia",
                "Marca",
                "Control",
                "Lote",
                "Fec.Ven",
                "Stock",
                "Stock Disponible",
                "Precio Referencia",
                "Tip.Moneda"
            };
            ViewData["ListaStocks"] = listaStocks;
            return View();
        }
        public JsonResult ObtenerStocks(StockDTO stockDTO)
        {
            var stockBL = new ConsultaStocksBL();
            stockDTO.UsuarioRegistra = User.ObtenerUsuario();
            var stocks = stockBL.ObtenerStock(stockDTO);
            return Json(stocks);
        }

        public void ExportarStocks(StockDTO stockDTO)
        {
            var stockBL = new ConsultaStocksBL();
            var listaStocks = stockBL.ObtenerStock(stockDTO).Result.ToList();
            var hssfworkbook = new HSSFWorkbook();
            ISheet sh = hssfworkbook.CreateSheet("Consulta de Stocks");

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
            cell.SetCellValue("Código Producto");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Descripción Producto");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Unidad Medida");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Código Fabrica");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Código Almacen");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Nombre Almacen");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Código Familia");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Nombre Familia");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Código Marca");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Nombre Marca");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Control");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Lote");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha Vencimiento");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Stock");


            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Stock Disponible");


            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Precio Referencial");


            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Tipo de Moneda");

            #endregion


            //// Impresión de la data
            foreach (var item in listaStocks)
            {
                cellnum = 0;
                row = sh.CreateRow(rownum++);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.CodigoProducto);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.DescripcionProducto);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.UnidadMedida);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.CodigoFabrica);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.CodigoAlmacen);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.DescripcionAlmacen);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.CodigoFamilia);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NombreFamilia);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.CodigoMarca);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NombreMarca);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Control);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Lote);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.FechaVencimiento);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.StockLote.ToString("0.00"));

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.StockDisponible.ToString("0.00"));

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.PrecioReferencial.ToString("0.00"));
                
                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Moneda);
            }

            var filename = "REPORTE_CATALOGO_STOCKS" + DateTime.Now.ToString("ddMMyyyyHHmmss") + ".xls";
            Response.AddHeader("content-disposition", "attachment; filename=" + filename);
            Response.ContentType = "application/vnd.ms-excel";

            Stream outStream = Response.OutputStream;
            hssfworkbook.Write(outStream);
            outStream.Close();
            Response.End();

        }

        public JsonResult FiltrosStocks()
        {
            var consultaPreciosBL = new ConsultaPrecioBL();
            var filtros = consultaPreciosBL.FiltrosPrecios();
            return Json(filtros);
        }

    }
}