using AHSECO.CCL.BE;
using AHSECO.CCL.BL;
using AHSECO.CCL.FRONTEND.Identity;
using AHSECO.CCL.FRONTEND.Security;
using NPOI.HSSF.UserModel;
using NPOI.HSSF.Util;
using NPOI.SS.UserModel;
using System;
using System.IO;
using System.Linq;
using System.Web.Mvc;

namespace AHSECO.CCL.FRONTEND.Controllers.Mantenimientos
{
    public class BandejaTecnicoController : Controller
    {

        [Permissions(Permissions = "BANDEJATECNICO")]
        public ActionResult Index()
        {
            return View();
        }
        [Permissions(Permissions = "BANDEJATECNICO")]
        public ActionResult RegistrarTecnico()
        {
            return View("RegistrarTecnico");
        }

        public JsonResult ObtenerTecnico(FiltroEmpleadosDTO filtroEmpleadosDTO)
        {
            var empleadosBL = new EmpleadosBL();
            filtroEmpleadosDTO.UsuarioRegistra = User.ObtenerUsuario();
            var response = empleadosBL.ListarEmpleados(filtroEmpleadosDTO);
            return Json(response);

        }
        public JsonResult InsertarTecnico(FiltroEmpleadosDTO filtroEmpleadosDTO)
        {
            var empleadosBL = new EmpleadosBL();
            filtroEmpleadosDTO.UsuarioRegistra = User.ObtenerUsuario();
            filtroEmpleadosDTO.CodigoCargo = Convert.ToInt32(Core.ConstanteSesion.CodigoCargoTecnico);
            var response = empleadosBL.MantenimientoEmpleado(filtroEmpleadosDTO);
            return Json(response);
        }

        public void ExportarTecnicos(FiltroEmpleadosDTO filtroEmpleadosDTO)
        {
            var empleadosBL = new EmpleadosBL();
            var listatecnicos = empleadosBL.ListarEmpleados(filtroEmpleadosDTO).Result.ToList();

            var hssfworkbook = new HSSFWorkbook();
            ISheet sh = hssfworkbook.CreateSheet("Técnicos");

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


            #region Impresion de cabeceras
            int rownum = 0;
            int cellnum = 0;
            IRow row = sh.CreateRow(rownum++);
            ICell cell;

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Código Empleado");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Nombre Técnico");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Apellido Paterno Técnico");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Apellido Materno Técnico");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Nombre Completo Técnico");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Cargo");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Lugar Laboral");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Teléfono");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Email");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Estado");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Usuario Registro");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha Registro");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Usuario Modificacion");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha Modificacion");
            #endregion

         
            //// Impresión de la data
            foreach (var item in listatecnicos)
            {
                cellnum = 0;
                row = sh.CreateRow(rownum++);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.CodigoEmpleado);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NombresEmpleado);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.ApellidoPaternoEmpleado);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.ApellidoMaternoEmpleado);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NombresCompletosEmpleado);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Cargo.NombreCargo);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.LugarLaboral.NombreDepartamento + "/" + item.LugarLaboral.NombreProvincia + "/" + item.LugarLaboral.NombreDistrito);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.TelefonoEmpleado);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.EmailEmpleado);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NombreEstado);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.UsuarioRegistra);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.FechaRegistroFormat);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.UsuarioModifica == null ? "" : item.UsuarioModifica);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.FechaModificaFormat);


            }
            for(var i = 0; i < 15; i++)
            {
                sh.SetColumnWidth(i, 23 * 255);
            }
            
            var filename = "REPORTE_TECNICO_" + DateTime.Now.ToString("ddMMyyyyHHmmss") + ".xls";
            Response.AddHeader("content-disposition", "attachment; filename=" + filename);
            Response.ContentType = "application/vnd.ms-excel";

            Stream outStream = Response.OutputStream;
            hssfworkbook.Write(outStream);
            outStream.Close();
            Response.End();

        }
    }
}