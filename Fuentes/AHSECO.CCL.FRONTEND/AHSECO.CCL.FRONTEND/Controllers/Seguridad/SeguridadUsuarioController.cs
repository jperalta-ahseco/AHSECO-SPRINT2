using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AHSECO.CCL.BE;
using AHSECO.CCL.BL;
using AHSECO.CCL.FRONTEND.Identity;
using AHSECO.CCL.FRONTEND.Security;
using NPOI.HSSF.UserModel;
using NPOI.HSSF.Util;
using NPOI.SS.UserModel;

namespace AHSECO.CCL.FRONTEND.Controllers
{
    public class SeguridadUsuarioController : Controller
    {
        // GET: SeguridadUsuario
        [Permissions(Permissions = "SEGURIDADUSUARIO")]
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Obtener(UsuarioDTO usuarioDTO)
        {
            var usuarioBL = new UsuarioBL();
            var response = usuarioBL.Obtener(usuarioDTO);
            return Json(response);
        }


        public void ReporteAuditoriaUsuario(UsuarioDTO usuarioDTO)
        {
            var usuarioBL = new UsuarioBL();
            var listarUsuarios = usuarioBL.ReporteAuditoriaUsuario(usuarioDTO).Result.ToList();

            var hssfworkbook = new HSSFWorkbook();
            ISheet sh = hssfworkbook.CreateSheet("Auditoria");

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
            cell.SetCellValue("Código Usuario");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Tipo");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha Registro");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Tipo Documento Anterior");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("N° Documento Anterior");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Nombres Anterior");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Apellidos Anterior");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Email Anterior");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Usuario Anterior");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Validar AD Anterior");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Usuario Red Anterior");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Habilitado Anterior");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Ejecutor Anterior");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Nombre Empleado Anterior");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Bloqueado Anterior");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Usuario Registro Anterior");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha Registro Anterior");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Ip Registro Anterior");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Usuario Modificación Anterior");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha Modificación Anterior");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Ip Modificación Anterior");


            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Tipo Documento Actual");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("N° Documento Actual");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Nombres Actual");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Apellidos Actual");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Email Actual");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Usuario Actual");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Validar AD Actual");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Usuario Red Actual");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Habilitado Actual");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Ejecutor Actual");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Nombre Empleado Actual");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Bloqueado Actual");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Usuario Registro Actual");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha Registro Actual");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Ip Registro Actual");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Usuario Modificación Actual");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha Modificación Actual");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Ip Modificación Actual");

            //// Impresión de la data
            foreach (var item in listarUsuarios)
            {
                cellnum = 0;
                row = sh.CreateRow(rownum++);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.CodigoUsuario.ToString());

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Tipo);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.FechaRegistro);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.TipoDocumentoAnterior);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NumeroDocumentoAnterior);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NombreAnterior);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.ApellidosAnterior);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.EmailAnterior);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.UsuarioAnterior);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.ValidarADAnterior);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.UsuarioRedAnterior);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.HabilitadoAnterior);


                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.EjecutorAnterior);


                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NombreEmpleadoAnterior);


                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.BloqueadoAnterior);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.UsuarioRegistroAnterior);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.FechaRegistroAnterior);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.IpRegistroAnterior);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.UsuarioModificacionAnterior);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.FechaModicacionAnterior);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.IpModificacionAnterior);



                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.TipoDocumentoActual);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NumeroDocumentoActual);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NombreActual);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.ApellidosActual);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.EmailActual);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.UsuarioActual);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.ValidarADActual);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.UsuarioRedActual);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.HabilitadoActual);


                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.EjecutorActual);


                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NombreEmpleadoActual);


                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.BloqueadoActual);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.UsuarioRegistroActual);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.FechaRegistroActual);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.IpRegistroActual);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.UsuarioModificacionActual);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.FechaModicacionActual);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.IpModificacionActual);


            }

            var filename = "REPORTE_AUDIT_USER_" + usuarioDTO.Id.ToString().Trim() + "_" + DateTime.Now.ToString("ddMMyyyyHHmmss") + ".xls";
            Response.AddHeader("content-disposition", "attachment; filename=" + filename);
            Response.ContentType = "application/vnd.ms-excel";

            Stream outStream = Response.OutputStream;
            hssfworkbook.Write(outStream);
            outStream.Close();
            Response.End();

        }

        public void ReporteSesionUsuario(UsuarioDTO usuarioDTO)
        {
            var usuarioBL = new UsuarioBL();
            var listarUsuarios = usuarioBL.ReporteSesionUsuario(usuarioDTO).Result.ToList();

            var hssfworkbook = new HSSFWorkbook();
            ISheet sh = hssfworkbook.CreateSheet("Sesiones");

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
            cell.SetCellValue("Código Usuario");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Usuario de Sistema");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Nombre Usuario");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha de Sesión");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Usuario Registro");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha Registro");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Ip Registro");

            //// Impresión de la data
            foreach (var item in listarUsuarios)
            {
                cellnum = 0;
                row = sh.CreateRow(rownum++);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.CodigoUsuario.ToString());

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Usuario);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NombreUsuario);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.FechaSesion);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.UsuarioRegistro);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.FechaRegistro);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.IpMaquinaRegistro);

            
            }

            var filename = "REPORTE_SESION_USER_"+ usuarioDTO.Id.ToString().Trim() +"_"+ DateTime.Now.ToString("ddMMyyyyHHmmss") + ".xls";
            Response.AddHeader("content-disposition", "attachment; filename=" + filename);
            Response.ContentType = "application/vnd.ms-excel";

            Stream outStream = Response.OutputStream;
            hssfworkbook.Write(outStream);
            outStream.Close();
            Response.End();

        }

        public void ExportarUsuarios(UsuarioDTO usuarioDTO)
        {
            var usuarioBL = new UsuarioBL();
            var listarUsuarios = usuarioBL.Obtener(usuarioDTO).Result.ToList();

            var hssfworkbook = new HSSFWorkbook();
            ISheet sh = hssfworkbook.CreateSheet("Usuarios");

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
            cell.SetCellValue("Código Usuario");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Tipo de Documento");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("N° Documento");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Nombres");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Apellidos");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Email");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Usuario");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Valida AD");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Usuario de Red");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Habilitado");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Ejecutor");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha última sesión");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Asociación Empleado");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Bloqueado");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("User Registro");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha Registro");


            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("IP Registro");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("User Modificacion");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("Fecha Modificacion");

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            cell.SetCellValue("IP Modificacion");

            //// Impresión de la data
            foreach (var item in listarUsuarios)
            {
                cellnum = 0;
                row = sh.CreateRow(rownum++);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Id.ToString());

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.TipoDocumento.Descripcion);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NumeroDocumento);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Nombres);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Apellidos);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Email);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.Usuario);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.DescripcionValidarAD);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.UsuarioRed);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.DescripcionHabilitado);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.IdEjecutor.ToString());

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.FechaUltimaSesion);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.NombreEmpleado);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.DescripcionBloqueado);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.UsuarioRegistra);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.FechaRegistroFormat);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.IpMaquinaRegistro);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.UsuarioModifica);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.FechaModificaFormat);

                cell = row.CreateCell(cellnum++);
                cell.SetCellValue(item.IpMaquinaModifica);
            }

            var filename = "REPORTE_USUARIOS_" + DateTime.Now.ToString("ddMMyyyyHHmmss") + ".xls";
            Response.AddHeader("content-disposition", "attachment; filename=" + filename);
            Response.ContentType = "application/vnd.ms-excel";

            Stream outStream = Response.OutputStream;
            hssfworkbook.Write(outStream);
            outStream.Close();
            Response.End();

        }

        public JsonResult Guardar(UsuarioDTO usuarioDTO)
        {
            var usuarioBL = new UsuarioBL();
            if (usuarioDTO.Id == 0)
            {
                usuarioDTO.UsuarioRegistra = User.ObtenerUsuario();
                usuarioDTO.IpMaquinaRegistro = User.ObtenerIP();
                var response = usuarioBL.Insertar(usuarioDTO);
                return Json(response);
            }
            else
            {
                usuarioDTO.UsuarioModifica = User.ObtenerUsuario();
                usuarioDTO.IpMaquinaModifica = User.ObtenerIP();
                var response = usuarioBL.Actualizar(usuarioDTO);
                return Json(response);
            }
        }
        //No enviar Usuario
        public JsonResult ObtenerEjecutora(JerarquiaDTO jerarquiaDTO)
        {
            DatosGeneralesDetalleDTO datosGeneralesDetalleDTO = new DatosGeneralesDetalleDTO();
            DatosGeneralesDTO datosGenerales = new DatosGeneralesDTO();
            datosGenerales.Dominio = "USUEJEC";
            datosGeneralesDetalleDTO.DatosGenerales = datosGenerales;
            var datosGeneralesBL = new DatosGeneralesBL();
            var result = datosGeneralesBL.Obtener(datosGeneralesDetalleDTO);
            var rs = new
            {
                result.Status,
                result.CurrentException,
                Result = result.Result.Where(t => t.Habilitado == true).Select(i => new
                {
                    Id = i.CodValor1,
                    Text = i.Valor1
                })
            };
            return Json(rs);
        }

        public JsonResult ObtenerEmpleados()
        {
            FiltroEmpleadosDTO filtroEmpleadosDTO = new FiltroEmpleadosDTO();
            filtroEmpleadosDTO.CodigoEmpleado = 0;
            filtroEmpleadosDTO.NombreEmpleado = "";
            filtroEmpleadosDTO.ApellidoPaternoEmpleado = "";
            filtroEmpleadosDTO.ApellidoMaternoEmpleado = "";
            filtroEmpleadosDTO.CodigoCargo = 0;
            filtroEmpleadosDTO.TipoDocumento = "";
            filtroEmpleadosDTO.NumeroDocumento = "";
            filtroEmpleadosDTO.Estado = 1;
            var empleadosBL = new EmpleadosBL();
            var result = empleadosBL.ListarEmpleados(filtroEmpleadosDTO);
            var rs = new
            {
                result.Status,
                result.CurrentException,
                Result = result.Result.Select(i => new
                {
                    Id = i.CodigoEmpleado,
                    Text = i.NombresCompletosEmpleado
                })
            };
            return Json(rs);
        }



        [HttpPost]
        public JsonResult ActualizarPassword(PasswordDTO passwordDTO)
        {
            var usuarioBL = new UsuarioBL();
            passwordDTO.IpMaquina = User.ObtenerIP();
            var response = usuarioBL.ActualizarPassword(passwordDTO);
            return Json(response);
        }


    }
}