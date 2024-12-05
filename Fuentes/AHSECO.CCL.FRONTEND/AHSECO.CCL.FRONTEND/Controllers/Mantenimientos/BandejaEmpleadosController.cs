using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AHSECO.CCL;
using AHSECO.CCL.BL;
using AHSECO.CCL.BE;
using AHSECO.CCL.FRONTEND.Identity;
using AHSECO.CCL.BL.Mantenimiento;
using NPOI.HSSF.UserModel;
using NPOI.HSSF.Util;
using NPOI.SS.UserModel;
using System.IO;
using AHSECO.CCL.COMUN;
using AHSECO.CCL.FRONTEND.Security;
using System.Resources;
namespace AHSECO.CCL.FRONTEND.Controllers.Mantenimientos
{
    public class BandejaEmpleadosController : Controller
    {
        // GET: BandejaEmpleados
        [Permissions(Permissions = "BANDEJAEMPLEADOS")]
        public ActionResult Index()
        {
            return View();
        }

        [Permissions(Permissions = "BANDEJAEMPLEADOS")]
        public ActionResult RegistrarEmpleados()
        {
            return View("RegistrarEmpleados");
        }
        public JsonResult ObtenerEmpleados(FiltroEmpleadosDTO filtrosEmpleadoDTO)
        {
            var empleadosBL = new EmpleadosBL();
            filtrosEmpleadoDTO.UsuarioRegistra = User.ObtenerUsuario();
            var response = empleadosBL.ListarEmpleados(filtrosEmpleadoDTO);
            return Json(response);
        }
        [HttpPost]
        public JsonResult GrupoFiltrosEmpleados()
        {
            var empleadosBL = new EmpleadosBL();
            var response = empleadosBL.GrupoEmpleadosFiltro();
            return Json(response);
        }

        public JsonResult MantenimientoEmpleados(EmpleadoDTO empleadoDTO)
        {
            var empleadosBL = new EmpleadosBL();
            empleadoDTO.UsuarioRegistra = User.ObtenerUsuario();
            var response = empleadosBL.EmpleadosMant(empleadoDTO);
            return Json(response);
            

        }
        public void ExportarEmpleados(FiltroEmpleadosDTO filtrpoEmpleadosDTO)
        {
            var empleadosBL = new EmpleadosBL();
            var listaEmpleados = empleadosBL.ListarEmpleados(filtrpoEmpleadosDTO).Result.ToList();

            var hssfworkbook = new HSSFWorkbook();
            ISheet sh = hssfworkbook.CreateSheet("Empleados");
            /*Configuraicón de Empleados*/
   

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
            cell.SetCellValue("Código Empleado");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Nombre Empleado");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Apellido Paterno ");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Apellido Materno ");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Cargo");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Área");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Tipo de Documento");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Número de Documento");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Teléfono");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Correo Electrónico");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Lugar Laboral");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Sexo");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha Nacimiento");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Dirección");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Empresa");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha Ingreso");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Jefe Inmediato");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Tipo de Trabajador");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Estado");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha Registro");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Usuario Registro");

      

            //cell = row.CreateCell(cellnum++);
            //cell.CellStyle = style;
            //cell.SetCellValue("Usuario Modificacion");

            //cell = row.CreateCell(cellnum++);
            //cell.CellStyle = style;
            //cell.SetCellValue("Fecha Modificacion");
            #endregion


            //// Impresión de la data
            foreach (var item in listaEmpleados)
            {
                cellnum = 0;
                row = sh.CreateRow(rownum++);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.CodigoEmpleado);

                cell=row.CreateCell(cellnum++);
                cell.SetCellValue(item.NombresEmpleado);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.ApellidoPaternoEmpleado);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.ApellidoMaternoEmpleado);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Cargo.NombreCargo);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Cargo.Area.NombreArea);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Documento.Descripcion);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NumeroDocumento);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.TelefonoEmpleado);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.EmailEmpleado);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.LugarLaboral.NombreDepartamento + "\\" + item.LugarLaboral.NombreProvincia + "\\" + item.LugarLaboral.NombreDistrito);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.SexoEmpleado == "M" ? "Masculino" : "Femenino");

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.FechaNacimientoFormat);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.DireccionEmpleado);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Empresa.Valor1);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.FechaIngresoFormat);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NombreJefe);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.TipoEmpleado);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Estado == 1 ? "Activo":"Inactivo");

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.FechaRegistroFormat);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.UsuarioRegistra);

                //cell = row.CreateCell(cellnum++);
                //cell.SetCellValue(item.UsuarioModifica);


                //cell = row.CreateCell(cellnum++);
                //cell.SetCellValue(item.UsuarioModifica == null ? "" : item.UsuarioModifica);

      
            }
            for(var i = 0; i < 21; i++)
            {
                sh.SetColumnWidth(i,28*255);
            }
				
            var filename = "REPORTE_EMPLEADOS_" + DateTime.Now.ToString("ddMMyyyyHHmmss") + ".xls";
            Response.AddHeader("content-disposition", "attachment; filename=" + filename);
            Response.ContentType = "application/vnd.ms-excel";

            Stream outStream = Response.OutputStream;
            hssfworkbook.Write(outStream);
            outStream.Close();
            Response.End();

        }
    }
}