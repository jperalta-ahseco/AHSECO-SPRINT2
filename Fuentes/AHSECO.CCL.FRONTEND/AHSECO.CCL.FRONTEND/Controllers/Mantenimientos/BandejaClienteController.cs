using AHSECO.CCL.BE.Mantenimiento;
using AHSECO.CCL.BL.Mantenimientos;
using AHSECO.CCL.FRONTEND.Core;
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
    public class BandejaClienteController : Controller
    {
        // GET: BandejaCliente
        [Permissions(Permissions = "BANDEJACLIENTE")]
        public ActionResult Index()
        {
            var clienteDTO = new ClienteDTO();
            var clienteBL = new ClienteBL();
            var response = clienteBL.ObtenerClientes(clienteDTO);
            VariableSesion.setObject("ListaCliente", response.Result);

            return View();
        }

       
        public JsonResult ObtenerClientes(ClienteDTO clienteDTO)
        {
            var clienteBL = new ClienteBL();
            var response = clienteBL.ObtenerClientes(clienteDTO);
            return Json(response);

        }
        public JsonResult Insertar(ClienteDTO clienteDTO)
        {
            var clienteBL = new ClienteBL();
            clienteDTO.UsuarioRegistra = User.ObtenerUsuario();
            var response = clienteBL.Insertar(clienteDTO);
            return Json(response);
        }

        public JsonResult Actualizar(ClienteDTO clienteDTO)
        {
            var clienteBL = new ClienteBL();
            clienteDTO.UsuarioModifica = User.ObtenerUsuario();
            var response = clienteBL.Actualizar(clienteDTO);
            return Json(response);
        }

        public JsonResult ObtenerContactos(ContactoDTO contactoDTO) 
        {
            var clienteBL = new ClienteBL();
            var response = clienteBL.ObtenerContactos(contactoDTO);
            return Json(response);
        }

        public JsonResult InsertarContacto(ContactoDTO contactoDTO)
        {
            var clienteBL = new ClienteBL();
            contactoDTO.UsuarioRegistra = User.ObtenerUsuario();
            var response = clienteBL.InsertarContacto(contactoDTO);
            return Json(response);
        }

        public JsonResult ActualizarContacto(ContactoDTO contactoDTO)
        {
            var clienteBL = new ClienteBL();
            contactoDTO.UsuarioModifica = User.ObtenerUsuario();
            var response = clienteBL.ActualizarContacto(contactoDTO);
            return Json(response);
        }

        public ActionResult RegistrarCliente()
        {
            return View();
        }
        //[HttpPost]
        public ActionResult EditarCliente(ClienteDTO clienteDTO)
        {
            return View(clienteDTO);
        }

        public ActionResult ConsultaCliente()
        {
            return View();
        }

        public void GenerarReportesClientes(ClienteDTO clienteDTO)
        {
            var clienteBL = new ClienteBL();
            var clientesFiltrados = clienteBL.ObtenerClientes(clienteDTO).Result.ToList();

            var hssfworkbook = new HSSFWorkbook();
            ISheet sh = hssfworkbook.CreateSheet("Clientes");

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
            cell.SetCellValue("Sector Cliente");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Categoría");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Dirección Físcal");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Teléfono");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Correo");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("N° Contactos");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Departamento");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Provincia");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Distrito");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Estado");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha de Registro");



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
                cell.SetCellValue(item.RUC);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NomEmpresa);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.SectorCliente);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Categoria);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Direccion);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Telefono);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Correo);

                cell = row.CreateCell(cellnum++);
                if (item.NumContacto.HasValue) cell.SetCellValue(item.NumContacto.Value);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.UbigeoDepartamento.Descripcion);

                cell = row.CreateCell(cellnum++);
                cell.CellStyle = styleDate;
                cell.SetCellValue(item.UbigeoProvincia.Descripcion);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.UbigeoDistrito.Descripcion);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(estado);


                cell = row.CreateCell(cellnum++);
                cell.CellStyle = styleDate;
                DateTime fechaRegistro = DateTime.Parse(item.FechaRegistro.ToString("dd/MM/yyyy"));
                cell.SetCellValue(fechaRegistro);

                sh.SetColumnWidth(0,20 * 256);
                sh.SetColumnWidth(1, 20 * 256);
                sh.SetColumnWidth(2, 20 * 256);
                sh.SetColumnWidth(3, 20 * 256);
                sh.SetColumnWidth(4, 20 * 256);
                sh.SetColumnWidth(5, 20 * 256);
                sh.SetColumnWidth(6, 20 * 256);
                sh.SetColumnWidth(7, 20 * 256);
                sh.SetColumnWidth(8, 20 * 256);
                sh.SetColumnWidth(9, 20 * 256);
                sh.SetColumnWidth(10, 20 * 256);

            }

            var filename = "REPORTE" + DateTime.Now.ToString("ddMMyyyyHHmmss") + ".xls";
            Response.AddHeader("content-disposition", "attachment; filename=" + filename);
            Response.ContentType = "application/vnd.ms-excel";

            Stream outStream = Response.OutputStream;
            hssfworkbook.Write(outStream);
            outStream.Close();
            Response.End();

        }

        public void GenerarHistoricoCliente(int Id_Ant)
        {
            var clienteBL = new ClienteBL();
            var clientesFiltrados = clienteBL.ObtenerAuditClientes(Id_Ant).Result.ToList();

            var hssfworkbook = new HSSFWorkbook();
            ISheet sh = hssfworkbook.CreateSheet("Historico");

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
            cell.SetCellValue("TIPO DE ACCION");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("FECHA ACCION");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("RUC EMPRESA ANTERIOR");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("NOMBRE EMPRESA ANTERIOR");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("DIRECCION ANTERIOR");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("TELEFONO ANTERIOR");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("CORREO ANTERIOR");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("DEPARTAMENTE ANTERIOR");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("PROVINCIA ANTERIOR");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("DISTRITO ANTERIOR");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("CATEGORIA ANTERIOR");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("TIPO DE CLIENTE ANTERIOR");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("SECTOR CLIENTE ANTERIOR");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("ESTADO ANTERIOR");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("USUARIO REGISTRADOR");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("FECHA DE REGISTRO DE CLIENTE");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("USUARIO MODIFICA");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("FECHA DE MODIFICACION DE CLIENTE");

            //// Impresión de la data
            foreach (var item in clientesFiltrados)
            {
                var estado = "";
                if (item.Estado_Ant == true)
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
                cell.SetCellValue(item.Tipo_Audit);

                cell = row.CreateCell(cellnum++);
                cell.CellStyle = styleDate;
                DateTime fecha_Accion = DateTime.Parse(item.Fecha_Accion.ToString("dd/MM/yyyy"));
                cell.SetCellValue(fecha_Accion);


                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.RUC_Ant);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NomEmpresa_Ant);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Direccion_Ant);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Telefono_Ant);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Correo_Ant);

                cell = row.CreateCell(cellnum++);
                cell.CellStyle = styleDate;
                cell.SetCellValue(item.UbigeoDepartamento.Descripcion);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.UbigeoProvincia.Descripcion);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.UbigeoDistrito.Descripcion);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Categoria_Ant);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.TipoCliente_Ant);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.SectorCliente_Ant);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(estado);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Usuario_Registra_Audit);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Audit_Reg_Fec_Ant);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Usuario_Modifica_Audit);


                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Audit_Mod_Fec_Ant);


                sh.SetColumnWidth(0, 20 * 256);
                sh.SetColumnWidth(1, 20 * 256);
                sh.SetColumnWidth(2, 20 * 256);
                sh.SetColumnWidth(3, 20 * 256);
                sh.SetColumnWidth(4, 20 * 256);
                sh.SetColumnWidth(5, 20 * 256);
                sh.SetColumnWidth(6, 20 * 256);
                sh.SetColumnWidth(7, 20 * 256);
                sh.SetColumnWidth(8, 20 * 256);
                sh.SetColumnWidth(9, 20 * 256);
                sh.SetColumnWidth(10, 20 * 256);

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