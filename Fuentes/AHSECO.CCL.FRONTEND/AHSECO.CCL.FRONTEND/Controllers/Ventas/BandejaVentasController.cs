using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using AHSECO.CCL.FRONTEND.Identity;
using AHSECO.CCL.BE;
using AHSECO.CCL.BL;
using Microsoft.Ajax.Utilities;
using AHSECO.CCL.BE.Mantenimiento;
using AHSECO.CCL.FRONTEND.Core;
using AHSECO.CCL.FRONTEND.Security;
using AHSECO.CCL.BL.Ventas;
using AHSECO.CCL.BE.Ventas;
using AHSECO.CCL.BE.ServicioTecnico.BandejaPreventivos;
using AHSECO.CCL.BL.ServicioTecnico.BandejaPreventivos;
using NPOI.HSSF.UserModel;
using NPOI.HSSF.Util;
using NPOI.SS.UserModel;
using System.IO;

namespace AHSECO.CCL.FRONTEND.Controllers.Ventas
{
    public class BandejaVentasController : Controller
    {

        const string TAG_ConceptosVenta = "ConceptosVenta";
        const string TAG_CDI = "CDItems";
        const string TAG_CDCI_CotDetItem = "CostoItemsCDI";
        const string TAG_CDCI_CotDetItem_BKP = "CostoItemsCDI_BKP";
        const string TAG_CDCI_Tabs = "CostoItemsTab";

        const string opcTablaTemporal = "1";
        const string opcTablaFinal = "2";
        const string opcTablaTabs = "3";


        //GET BandejaVentas
        [Permissions(Permissions = "BANDEJAVENTAS")]
        public ActionResult Index()
        {

            VariableSesion.setCadena("numSol", null);
            VariableSesion.setCadena("idWorkFlow", null);
            VariableSesion.setCadena("estadoSol", null);
            VariableSesion.setCadena("tipoSol", null);
            VariableSesion.setCadena("idFlujo", null);
            VariableSesion.setCadena("idCotizacion", null);
            VariableSesion.setCadena("estadoAbrev", null);
            VariableSesion.setObject("VENTA_CLIENTE", null);

            var NumeroDocumento = "";
            var idUsuario = User.ObtenerIdUsuario();
            ViewBag.CodUsuario = idUsuario;
            ViewBag.VerGestion = false;
            ViewBag.CheckGestion = "";

            ViewBag.FecIni = "";
            ViewBag.FecFin = "";
            ViewBag.TipoVenta = "";
            ViewBag.TipoSolicitud = "";
            ViewBag.Ruc = "";
            ViewBag.NombreCliente = "";
            ViewBag.NombreVendedor = "";
            ViewBag.Empresa = "";
            ViewBag.NombreContacto = "";
            ViewBag.FormaPago = "";
            ViewBag.Moneda = "";
            ViewBag.Estado = "";
            ViewBag.NumeroOrden = "";
            ViewBag.NumeroProceso = "";
            ViewBag.NumeroContrato = "";
            ViewBag.Garantia = "";
            ViewBag.NroSol = "";
            ViewBag.NroFianzaPP = "";
            ViewBag.NroFianzaPA = "";
            ViewBag.Flujo = "";


            var procesosBL = new ProcesosBL();
            var roles = procesosBL.ConsultaWorkFLowRoles(User.ObtenerUsuario(), 1).Result.FirstOrDefault();

            var detalleEmpleado = new EmpleadoDTO()
            {
                CodigoEmpleado = 0,
                NombresCompletosEmpleado = ""
            };

            if (roles != null)
            {
                VariableSesion.setCadena("VENTA_NOMBRE_ROL", roles.NombreRol);
                ViewBag.CodigoArea = roles.CodigoArea;
                var rol = roles.NombreRol;
                if (rol == "SGI_VENTA_GERENTE" || rol == "SGI_VENTA_IMPORTACION" || rol == "SGI_VENTA_COSTOS"
                    || rol == "SGI_VENTA_LOGISTICA" || rol == "SGI_VENTA_SERVICIOTECNICO" ||  rol == "SGI_VENTA_FACTURA")
                {
                    ViewBag.VerGestion = true;
                    ViewBag.CheckGestion = "checked";
                    ViewBag.FecIni = "disabled";
                    ViewBag.FecFin = "disabled";
                    ViewBag.TipoVenta = "disabled";
                    ViewBag.TipoSolicitud = "disabled";
                    ViewBag.Ruc = "disabled";
                    ViewBag.NombreCliente = "disabled";
                    ViewBag.NombreVendedor = "disabled";
                    ViewBag.Empresa = "disabled";
                    ViewBag.NombreContacto = "disabled";
                    ViewBag.FormaPago = "disabled";
                    ViewBag.Moneda = "disabled";
                    ViewBag.Estado = "disabled";
                    ViewBag.NumeroOrden = "disabled";
                    ViewBag.NumeroProceso = "disabled";
                    ViewBag.NumeroContrato = "disabled";
                    ViewBag.Garantia = "disabled";
                    ViewBag.NroSol = "disabled";
                    ViewBag.NroFianzaPP = "disabled";
                    ViewBag.NroFianzaPA = "disabled";
                    ViewBag.Flujo = "disabled";

                }
            }

            var usuarioBL = new UsuarioBL();
            var empleadosBL = new EmpleadosBL();

            List<IEnumerable<UsuarioDTO>> usuarios = new List<IEnumerable<UsuarioDTO>>();
            List<IEnumerable<EmpleadoDTO>> empleados = new List<IEnumerable<EmpleadoDTO>>();

            var usuarioDTO = new UsuarioDTO()
            {
                Id = Int32.Parse(idUsuario)
            };

            usuarios.Add(usuarioBL.Obtener(usuarioDTO).Result);

            foreach (var usuario in usuarios)
            {
                foreach (var detalle in usuario)
                {
                    NumeroDocumento = detalle.NumeroDocumento; //Obtengo número de documento del trabajador en la TBM_SEGURIDAD_USUARIO
                }
            };

            var empleadosDTO = new FiltroEmpleadosDTO()
            {
                CodigoEmpleado = 0,
                NombreEmpleado = null,
                ApellidoPaternoEmpleado = null,
                ApellidoMaternoEmpleado = null,
                CodigoCargo = null,
                TipoDocumento = null,
                TipoEmpleado = null,
                NumeroDocumento = NumeroDocumento,
                Estado = 2,
                FechaInicio = null,
                FechaFinal = null,
            };

            empleados.Add(empleadosBL.ListarEmpleados(empleadosDTO).Result);

            foreach (var empleado in empleados)
            {
                foreach (var detalle in empleado)
                {
                    ViewBag.CodEmpleado = detalle.CodigoEmpleado.ToString(); ////Obtengo código de empleado de TBM_EMPLEADO.
                    ViewBag.Asesor = detalle.NombresCompletosEmpleado;

                    detalleEmpleado.CodigoEmpleado = detalle.CodigoEmpleado;
                    detalleEmpleado.NombresCompletosEmpleado = detalle.NombresCompletosEmpleado;
                };
            };

            VariableSesion.setObject("VENTA_EMPLEADO", detalleEmpleado); //Encapsulamos información relevante del empleado.
            return View();
        }
        
        public JsonResult InicializaDetalle(ClienteDTO clienteDTO)
        {
            VariableSesion.setObject("VENTA_CLIENTE", clienteDTO);

            return Json(new
            {
                Status = 1
            });
        }

        public JsonResult ObtenerClientesVentas(ClienteDTO clienteDTO)
        {
            var ventasBL = new VentasBL();
            var result = ventasBL.ObtenerClientesVentas(clienteDTO);
            return Json(result);
        }

        public JsonResult GrupoBandejaSolicitudesFiltro()
        {
            var ventasBL = new VentasBL();
            var response = ventasBL.GrupoBandejaSolicitudesFiltro();
            return Json(response);
        }

        public JsonResult ConsultaBandejaSolicitudes(FiltroBandejaVentasDTO filtros)
        {
            var ventasBL = new VentasBL();
            filtros.UsuarioRegistro = User.ObtenerUsuario();
            var response = ventasBL.ConsultaBandejaSolicitudes(filtros);
            return Json(response);
        }

        public void GenerarReporteVentas(FiltroBandejaVentasDTO filtros)
        {
            var ventasBL = new VentasBL();
            filtros.UsuarioRegistro = User.ObtenerUsuario();
            var solicitudes = ventasBL.ConsultaBandejaSolicitudes(filtros).Result.ToList();

            var hssfworkbook = new HSSFWorkbook();
            ISheet sh = hssfworkbook.CreateSheet("Reporte Solicitudes");

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
            cell.SetCellValue("N° Solicitud");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Flujo Área");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha Solicitud");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Tipo Venta");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Tipo Solicitud");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Medio Contacto");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Tipo Proceso");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("N° Proceso");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Ruc Cliente");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Nombre Cliente");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Sede");


            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Vendedor");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Empresa");

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
            cell.SetCellValue("N° Cotización");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha Cotización");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Nombre Contacto");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Área Contacto");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Teléfono Contacto");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Email Contacto");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Plazo Entrega (Días)");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Forma Pago");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Tipo Moneda");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Vigencia (Días)");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Garantía");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Observación");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("% Descuento");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Subtotal");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Monto IGV.");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Total Venta");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("N° Orden");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha Orden");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha Máxima Entrega");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("N° Contrato");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha Contrato");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Prestación Principal");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Prestación Accesoria");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("N° Fianza P. Principal");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("N° Fianza P. Accesoria");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Tiene Fianza");


            //// Impresión de la data
            foreach (var item in solicitudes)
            {
                cellnum = 0;
                row = sh.CreateRow(rownum++);


                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NumeroSolicitud);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NombreFlujo);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.FechaSolicitud);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.TipoVenta);

                cell = row.CreateCell(cellnum++);
                cell.CellStyle = styleDate;
                cell.SetCellValue(item.TipoSolicitud);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.MedioContacto);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.TipoProceso);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NumeroProceso);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.RucEmpresa);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NombreCliente);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NomSede);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NombreVendedor);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NombreEmpresa);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NombreEstado);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.UsuarioRegistro);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.FechaRegistro);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NumeroCotizacion);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.FechaCotizacion);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NombreContacto);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.AreaContacto);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.TelefonoContacto);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.EmailContacto);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.PlazoEntrega);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.FormaPago);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Moneda);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Vigencia);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Garantia);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Observacion);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.PorcentajeDescuento);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Subtotal);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.MontoIGV);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.TotalVenta);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NumOrden);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.FechaOrden);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.FechaMaxima);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NumContrato);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.FechaContrato);


                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.PrestacionPrincipal);


                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.PrestacionAccesoria);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NroFianzaPP);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NroFianzaPA);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Fianza);




                sh.SetColumnWidth(0, 20 * 256);
                sh.SetColumnWidth(1, 20 * 256);
                sh.SetColumnWidth(2, 20 * 256);
                sh.SetColumnWidth(3, 20 * 256);
                sh.SetColumnWidth(4, 20 * 256);
                sh.SetColumnWidth(5, 20 * 256);
                sh.SetColumnWidth(6, 20 * 256);
                sh.SetColumnWidth(7, 20 * 256);
                sh.SetColumnWidth(8, 20 * 256);
                sh.SetColumnWidth(9, 30 * 256);
                sh.SetColumnWidth(10, 20 * 256);
                sh.SetColumnWidth(11, 20 * 256);
                sh.SetColumnWidth(12, 20 * 256);
                sh.SetColumnWidth(13, 20 * 256);
                sh.SetColumnWidth(14, 20 * 256);
                sh.SetColumnWidth(15, 20 * 256);
                sh.SetColumnWidth(16, 20 * 256);
                sh.SetColumnWidth(17, 20 * 256);
                sh.SetColumnWidth(18, 20 * 256);
                sh.SetColumnWidth(19, 20 * 256);
                sh.SetColumnWidth(20, 20 * 256);
                sh.SetColumnWidth(21, 20 * 256);
                sh.SetColumnWidth(22, 20 * 256);
                sh.SetColumnWidth(23, 20 * 256);
                sh.SetColumnWidth(24, 20 * 256);
                sh.SetColumnWidth(25, 20 * 256);
                sh.SetColumnWidth(26, 20 * 256);
                sh.SetColumnWidth(27, 20 * 256);
                sh.SetColumnWidth(28, 20 * 256);
                sh.SetColumnWidth(29, 20 * 256);
                sh.SetColumnWidth(30, 20 * 256);
                sh.SetColumnWidth(31, 20 * 256);
                sh.SetColumnWidth(32, 20 * 256);
                sh.SetColumnWidth(33, 20 * 256);
                sh.SetColumnWidth(34, 20 * 256);
                sh.SetColumnWidth(35, 20 * 256);
                sh.SetColumnWidth(36, 20 * 256);
                sh.SetColumnWidth(37, 20 * 256);
                sh.SetColumnWidth(38, 20 * 256);
                sh.SetColumnWidth(39, 20 * 256);
                sh.SetColumnWidth(40, 20 * 256);
                sh.SetColumnWidth(41, 20 * 256);

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