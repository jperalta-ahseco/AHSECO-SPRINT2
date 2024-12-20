﻿using AHSECO.CCL.BE;
using AHSECO.CCL.BL;
using AHSECO.CCL.FRONTEND.Core;
using AHSECO.CCL.FRONTEND.Identity;
using NPOI.HSSF.UserModel;
using NPOI.HSSF.Util;
using NPOI.POIFS.FileSystem;
using NPOI.SS.UserModel;
using System;
using System.IO;
using System.Linq;
using System.Web.Mvc;
namespace AHSECO.CCL.FRONTEND.Controllers.Mantenimientos
{
    public class BandejaServiciosController : Controller
    {
        public ActionResult Index()
        {
            VariableSesion.setCadena("tipoProceso", "");
            VariableSesion.setCadena("codigoServicio", "0");
            return View();
        }
        public ActionResult RegistroServicio()
        {
            return View();
        }
        public JsonResult SetDatosServicios(string codServicio, string tipoProceso)
        {
            try
            {
                VariableSesion.setCadena("tipoProceso", tipoProceso.ToString());
                VariableSesion.setCadena("codigoServicio", codServicio.ToString());
                return Json(new 
                { 
                    Status = 1                
                });
            }
            catch (Exception ex) {
                return Json(new
                {
                    Status  = 0,
                    Mensaje = ex.Message
                });
            }
        }
        public JsonResult RegistraServiciosMain(GrupoServicioDTO grupoServicioDTO)
        {
            var respuesta = new RespuestaDTO();
            var servicioBL = new ServiciosBL();
            grupoServicioDTO.CabeceraServicio.TipoProceso = "I";
            grupoServicioDTO.CabeceraServicio.UsuarioRegistra = User.ObtenerUsuario();
            var mainCabecera = servicioBL.MantenimientoServicios(grupoServicioDTO.CabeceraServicio);

            if(grupoServicioDTO.servicios != null )
            {
                foreach(var detalle in grupoServicioDTO.servicios)
                {
                    detalle.Id_Servicio = mainCabecera.Result.Codigo;
                    detalle.TipoProceso = "I";
                    detalle.UsuarioRegistra = User.ObtenerUsuario();
                    var resultDetalle = servicioBL.MantenimientoDetalleServicio(detalle);

                    if (resultDetalle.Result.Codigo == 0)
                    {
                        return Json(new
                        {
                            Status = 0,
                            Mensaje = resultDetalle.Result.Mensaje
                        });
                    };
                };
            };
            return Json(new {
                Status= 1, 
                Mensaje = mainCabecera.Result.Mensaje
            });
        }

        public JsonResult MantenimientoServicios(ServicioDTO serviciosDTO)
        {

            var servicioBL = new ServiciosBL();
            serviciosDTO.UsuarioRegistra = User.ObtenerUsuario();
            var result = servicioBL.MantenimientoServicios(serviciosDTO);
            return Json(result);
        }

        public JsonResult MantenimientoDetalleServicio(DetalleServicioDTO detalle)
        {
            var servicioBL = new ServiciosBL();
            detalle.UsuarioRegistra = User.ObtenerUsuario();
            var result = servicioBL.MantenimientoDetalleServicio(detalle);
            return Json(result);
        }

        public JsonResult GetFullService(string CodServicio)
        {
            var serviciosBL = new ServiciosBL();    
            var result = serviciosBL.GetFullService(CodServicio);
            return Json(result);
        }

        public JsonResult ObtenerServicios(ServicioDTO servicioDTO)
        {
            var servicioBL = new ServiciosBL();
            servicioDTO.UsuarioRegistra = User.ObtenerUsuario();
            var response = servicioBL.ObtenerServicios(servicioDTO);
            return Json(response);
        }
        public void ExportarServicios(ServicioDTO servicioDTO)
        {
            var servicioBL = new ServiciosBL();
            var listaServicios = servicioBL.ObtenerServicios(servicioDTO).Result.ToList();
            var hssfworkbook = new HSSFWorkbook();
            ISheet sh = hssfworkbook.CreateSheet("Servicios");
            // Crear estilo para el título
            var fontTitle = hssfworkbook.CreateFont();
            fontTitle.Boldweight = (short)FontBoldWeight.Bold;
            fontTitle.FontHeightInPoints = 14;
            fontTitle.FontName = "Calibri (Body)";

            var styleTitle = hssfworkbook.CreateCellStyle();
            styleTitle.SetFont(fontTitle);
            styleTitle.Alignment = HorizontalAlignment.Left;
            styleTitle.BorderBottom = BorderStyle.Thin;
            
            // Crear la fila para el título
            IRow titleRow = sh.CreateRow(0);
            ICell titleCell = titleRow.CreateCell(0);
            titleCell.SetCellValue("ACTIVIDADES DE MANTENIMIENTO PREVENTIVO");
            titleCell.CellStyle = styleTitle;

            // Fusionar celdas para que el título abarque todas las columnas (en este caso, 21 columnas)
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(0, 0, 0, 20));

            // Crear espacio después del título
            IRow emptyRow = sh.CreateRow(1);

            // Congelar la primera fila para que el título siempre esté visible al hacer scroll
            // Los parámetros son: columnas a congelar, filas a congelar, primera columna visible, primera fila visible
            sh.CreateFreezePane(0, 2); // Congela las primeras dos filas (título y fila vacía)

            // Crear estilos para las cabeceras de las columnas (estilos ya definidos en tu código)
            var fontbold = hssfworkbook.CreateFont();
            fontbold.Boldweight = (short)FontBoldWeight.Bold;
            fontbold.Color = HSSFColor.White.Index;
            fontbold.FontHeightInPoints = 10;
            fontbold.FontName = "Calibri (Body)";

            var style = hssfworkbook.CreateCellStyle();
            style.SetFont(fontbold);
            style.BorderBottom = BorderStyle.Thin;
            style.BorderTop = BorderStyle.Thin;
            style.BorderRight = BorderStyle.Thin;
            style.BorderLeft = BorderStyle.Thin;
            style.FillPattern = FillPattern.SolidForeground;
            style.FillForegroundColor = HSSFColor.BlueGrey.Index;

            // Impresión de cabeceras (empezando desde la fila 2, después del título y la fila vacía)
            int rownum = 2; // Cambiamos a 2 porque la fila 0 es el título y la 1 es vacía
            int cellnum = 0;
            IRow row = sh.CreateRow(rownum++);
            ICell cell;

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("N°");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Equipo");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Marca");

            cell =row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Modelo");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Tipo de Servicio");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Precio Preventivo");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Precio Capacitación");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Precio Actualización de Software");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Instrumentos");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Herramientas Comunes");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Herramientas Especiales");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Estado");

            //// Impresión de la data
            foreach (var item in listaServicios)
            {
                cellnum = 0;
                row = sh.CreateRow(rownum++);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.CodigoServicio);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Equipo);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Marca);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Modelo);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.TipoServicio);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.PrecioPreventivo.ToString());

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.PrecioCapacitacion.ToString());

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.PrecioActualizacion.ToString());

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Instrumentos);

                cell=row.CreateCell(cellnum++);
                cell.SetCellValue(item.Herramientas);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.HerramientasEspeciales);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue((item.Estado == "1") ? "ACTIVO" : "INACTIVO");
            }

            for (var i = 0; i < 21; i++)
            {
                sh.SetColumnWidth(i, 28 * 255);
            }

            var filename = "REPORTE_SERVICIOS_" + DateTime.Now.ToString("ddMMyyyyHHmmss") + ".xls";
            Response.AddHeader("content-disposition", "attachment; filename=" + filename);
            Response.ContentType = "application/vnd.ms-excel";

            Stream outStream = Response.OutputStream;
            hssfworkbook.Write(outStream);
            outStream.Close();
            Response.End();
        }

        public JsonResult FiltroServicios()
        {
            var servicios = new ServiciosBL();
            var result = servicios.FiltroServicios();
            return Json(result);
        }
    }
}