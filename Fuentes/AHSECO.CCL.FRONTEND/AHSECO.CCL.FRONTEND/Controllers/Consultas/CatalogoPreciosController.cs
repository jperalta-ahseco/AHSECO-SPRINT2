using AHSECO.CCL.BE;
using AHSECO.CCL.BL;
using AHSECO.CCL.BL.Consulta;
using AHSECO.CCL.FRONTEND.Identity;
using AHSECO.CCL.FRONTEND.Security;
using NPOI.HSSF.UserModel;
using NPOI.HSSF.Util;
using NPOI.SS.UserModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AHSECO.CCL.FRONTEND.Controllers.Consultas
{
    public class CatalogoPreciosController : Controller
    {
        [Permissions(Permissions = "CATALOGOPRECIOS")]
        public ActionResult Index()
        {
            IEnumerable<string> listaPrecios = new List<string>
            {
                "Código Producto",
                "Nombre Producto",
                "Unidad Medida",
                "Nombre Familia",
                "Nombre Marca",
                "Precio Referencial"
            };
            ViewData["ListaPrecios"] = listaPrecios;
            return View();
        }

        public JsonResult ObtenerPrecios(PrecioDTO precioDTO)
        {
            var consultaPreciosBL = new ConsultaPrecioBL();
            var listaPrecios = consultaPreciosBL.ObtenerPrecios(precioDTO);
            return Json(listaPrecios);
        }

        public JsonResult FiltrosPrecios(string CodTipoSol)
        {
            var consultaPreciosBL = new ConsultaPrecioBL();
            var filtros = consultaPreciosBL.FiltrosPrecios();
            filtros.Result.TodasFamilias = "";
            if (!string.IsNullOrEmpty(CodTipoSol))
            {
                if (filtros.Result.Familias != null)
                {
                    var datggenBL = new DatosGeneralesBL();
                    var rptadg = datggenBL.Obtener(new DatosGeneralesDetalleDTO { Dominio = "TIPOSOLVT" });
                    if (rptadg.Result.Any(x => x.CodValor1 == CodTipoSol))
                    {
                        var oTipoSol = rptadg.Result.First(x => x.CodValor1 == CodTipoSol);
                        if (!string.IsNullOrEmpty(oTipoSol.Valor3))
                        {
                            var lstFamilias = oTipoSol.Valor3.Split(';').ToList();
                            if (filtros.Result.Familias.Any())
                            {
                                filtros.Result.Familias = filtros.Result.Familias.Where(x => lstFamilias.Any(y => y == x.Id.Trim())).ToList();
                                filtros.Result.TodasFamilias = string.Join(";", lstFamilias.ToArray());
                            }
                        }
                    }
                }
            }
            return Json(filtros);
        }

        public void ExportarPrecios(PrecioDTO precioDTO)
        {
            var precipBL = new ConsultaPrecioBL();
            var listaPrecios = precipBL.ObtenerPrecios(precioDTO).Result.ToList();
            var hssfworkbook = new HSSFWorkbook();
            ISheet sh = hssfworkbook.CreateSheet("Consulta de Precios");

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
            cell.SetCellValue("Nombre Producto");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Unidad Medida");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Nombre Familia");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Nombre Marca");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Precio Lista");

            #endregion

            //// Impresión de la data
            foreach (var item in listaPrecios)
            {
                cellnum = 0;
                row = sh.CreateRow(rownum++);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.CodigoProducto);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NombreProducto);


                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.UnidadMedida);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NombreFamilia);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NombreMarca);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.PrecioReferencial.ToString("0.00"));



            }
            for(var i = 0; i < cellnum; i++)
            {
                sh.SetColumnWidth(i, 18 * 255);
            }

            var filename = "REPORTE_CATALOGO_PRECIOS" + DateTime.Now.ToString("ddMMyyyyHHmmss") + ".xls";
            Response.AddHeader("content-disposition", "attachment; filename=" + filename);
            Response.ContentType = "application/vnd.ms-excel";

            Stream outStream = Response.OutputStream;
            hssfworkbook.Write(outStream);
            outStream.Close();
            Response.End();

        }
    }
}