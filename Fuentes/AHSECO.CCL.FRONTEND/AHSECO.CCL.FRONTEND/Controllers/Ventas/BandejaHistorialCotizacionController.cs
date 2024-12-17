using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using AHSECO.CCL.FRONTEND.Identity;
using System.Web.Mvc;
using AHSECO.CCL.BE.Ventas;
using AHSECO.CCL.BL.Ventas;
using AHSECO.CCL.FRONTEND.Security;
using Microsoft.Office.Interop.Word;
using NPOI.Util;
using System.Runtime.InteropServices;
using System.Configuration;
using System.IO;
using System.Web;
using AHSECO.CCL.BE;
using AHSECO.CCL.BL;
using NPOI.HSSF.UserModel;
using NPOI.HSSF.Util;
using NPOI.SS.UserModel;
using System.Web.UI.WebControls;
using Microsoft.SqlServer.Server;


namespace AHSECO.CCL.FRONTEND.Controllers.Ventas
{
    public class BandejaHistorialCotizacionController : Controller
    {
        // GET BandejaHistorialCotizacion
        [Permissions(Permissions = "BANDEJAVENTAS")]
        public ActionResult Index()
        {
            return View();
        }


        public JsonResult ListarBandejaHistorialCotizacion(CotizacionDTO parametros)
        {
            var ventasBL = new VentasBL();
            var result = ventasBL.ListarHistorialCotizacion(parametros.IdCotizacion,parametros.IdSolicitud);
            return Json(result);
        }

        public JsonResult ConsultaCotizacionCliente(int codCotizacion)
        {
            var ventasBL = new VentasBL();
            var result = ventasBL.ConsultaCotizacionCliente(codCotizacion);
            return Json(result);
        }

        [HttpPost]
        public JsonResult GenerarCotizacion(CotizacionDTO cotizacionDTO)
        {

            var ventasBL = new VentasBL();
            var cotizacion = ventasBL.ConsultaCotizacionCliente(cotizacionDTO.IdCotizacion);

            // Crear una nueva aplicación de Word
            Application wordApp = new Application();
            wordApp.Visible = false;

            // Crear un nuevo documento
            Document doc = wordApp.Documents.Add();

            int retries = 5;
            while (retries > 0)
            {
                try
                {
                    // Establecer márgenes (en puntos)
                    float marginInPoints = 36; // 1 pulgada = 72 puntos

                    // Establecer márgenes izquierdo, derecho, superior e inferior
                    doc.PageSetup.LeftMargin = marginInPoints;   // Margen izquierdo
                    doc.PageSetup.RightMargin = marginInPoints;  // Margen derecho
                    doc.PageSetup.TopMargin = marginInPoints;    // Margen superior
                    doc.PageSetup.BottomMargin = marginInPoints; // Margen inferior

                    // Usar Range para insertar HTML
                    Range range = doc.Content;
                    range.InsertParagraphAfter();
                    // Definir el número de filas y columnas
                    int numRows = 22 + cotizacion.Result.NroItems; 
                    int numCols = 7;

                    // Agregar una tabla al documento
                    Microsoft.Office.Interop.Word.Table table = doc.Tables.Add(doc.Range(0, 0), numRows, numCols);
                    table.Borders.Enable = 0; // Habilitar bordes

                    #region Encabezado
                    // Combinando celdas en la primera fila
                    table.Cell(1, 1).Merge(table.Cell(2, 2));

                    var url1 = new Uri(HttpContext.Request.Url, Url.Content(cotizacion.Result.DocumentoCabecera.RutaImagen));
                    var imageLogo = url1.AbsoluteUri;
                    // Insertar la imagen
                    InlineShape inlineShape = table.Cell(1, 1).Range.InlineShapes.AddPicture(imageLogo, LinkToFile: false, SaveWithDocument: true);

                    // Opcional: Ajustar el tamaño de la imagen
                    inlineShape.Width = 150; // Ajustar el ancho
                    inlineShape.Height = 80; // Ajustar el alto

                    // Opcional: Centrar la imagen en la celda
                    inlineShape.Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;

                    table.Cell(1, 1).Width = 150;

                    table.Cell(1, 2).Merge(table.Cell(2, 4));
                    table.Cell(1, 2).Range.Text = cotizacion.Result.DocumentoCabecera.Encabezado;
                    table.Cell(1, 2).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                    table.Cell(1, 2).Range.Font.Size = 8;
                    table.Cell(1, 2).Width = 250;

                    table.Cell(1, 3).Merge(table.Cell(1, 4));
                    table.Cell(1, 3).Range.Text = "COTIZACIÓN";
                    table.Cell(1, 3).Width = 120;
                    // Establecer bordes para la celda
                    Borders borders = table.Cell(1, 3).Borders;
                    borders.Enable = 1; // Habilitar bordes
                    table.Cell(1, 3).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;

                    table.Cell(2, 3).Merge(table.Cell(2, 4));
                    table.Cell(2, 3).Range.Text = cotizacion.Result.DocumentoCabecera.NumeroCotizacion;
                    table.Cell(2, 3).Width = 120;
                    Borders borders2 = table.Cell(2, 3).Borders;
                    borders2.Enable = 1; // Habilitar bordes
                    table.Cell(2, 3).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;

                    #endregion

                    table.Cell(3, 1).Merge(table.Cell(3, 7));

                    #region Cabecera Cotizacion


                    table.Cell(4, 1).Range.Text = "";
                    table.Cell(4, 1).Width = 30;

                    table.Cell(4, 2).Range.Text = "RUC:";
                    table.Cell(4, 2).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                    table.Cell(4, 2).Range.Font.Size = 8;
                    table.Cell(4, 2).Range.Bold = 1;
                    table.Cell(4, 2).Width = 70;

                    table.Cell(4, 3).Range.Text = cotizacion.Result.DocumentoCabecera.Ruc;
                    table.Cell(4, 3).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                    table.Cell(4, 3).Range.Font.Size = 8;
                    table.Cell(4, 3).Width = 200;

                    table.Cell(4, 4).Merge(table.Cell(4, 5));
                    table.Cell(4, 4).Range.Text = "Fecha:";
                    table.Cell(4, 4).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                    table.Cell(4, 4).Range.Font.Size = 8;
                    table.Cell(4, 4).Range.Bold = 1;
                    table.Cell(4, 4).Width = 100;

                    table.Cell(4, 5).Merge(table.Cell(4, 6));
                    table.Cell(4, 5).Range.Text = cotizacion.Result.DocumentoCabecera.Fecha;
                    table.Cell(4, 5).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                    table.Cell(4, 5).Range.Font.Size = 8;
                    table.Cell(4, 5).Width = 120;

                    table.Cell(5, 1).Merge(table.Cell(6, 1));
                    table.Cell(5, 1).Range.Text = "";
                    table.Cell(5, 1).Width = 30;

                    table.Cell(5, 2).Merge(table.Cell(6, 2));
                    table.Cell(5, 2).Range.Text = "Señor:";
                    table.Cell(5, 2).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                    table.Cell(5, 2).Range.Font.Size = 8;
                    table.Cell(5, 2).Range.Bold = 1;
                    table.Cell(5, 2).Width = 70;

                    table.Cell(5, 3).Merge(table.Cell(6, 3));
                    table.Cell(5, 3).Range.Text = cotizacion.Result.DocumentoCabecera.RazonSocial;
                    table.Cell(5, 3).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                    table.Cell(5, 3).Range.Font.Size = 8;
                    table.Cell(5, 3).Width = 200;


                    table.Cell(5, 4).Merge(table.Cell(5, 5));
                    table.Cell(5, 4).Range.Text = "Plazo de entrega:";
                    table.Cell(5, 4).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                    table.Cell(5, 4).Range.Font.Size = 8;
                    table.Cell(5, 4).Range.Bold = 1;
                    table.Cell(5, 4).Width = 100;

                    table.Cell(5, 5).Merge(table.Cell(5, 6));
                    table.Cell(5, 5).Range.Text = cotizacion.Result.DocumentoCabecera.PlazoEntrega;
                    table.Cell(5, 5).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                    table.Cell(5, 5).Range.Font.Size = 8;
                    table.Cell(5, 5).Width = 120;

                    table.Cell(6, 4).Merge(table.Cell(6, 5));
                    table.Cell(6, 4).Range.Text = "Forma de pago:";
                    table.Cell(6, 4).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                    table.Cell(6, 4).Range.Font.Size = 8;
                    table.Cell(6, 4).Range.Bold = 1;
                    table.Cell(6, 4).Width = 100;

                    table.Cell(6, 5).Merge(table.Cell(6, 6));
                    table.Cell(6, 5).Range.Text = cotizacionDTO.DescFormaPago; //cotizacion.Result.DocumentoCabecera.FormaPago;
                    table.Cell(6, 5).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                    table.Cell(6, 5).Range.Font.Size = 8;
                    table.Cell(6, 5).Width = 120;

                    table.Cell(7, 1).Range.Text = "";
                    table.Cell(7, 1).Width = 30;

                    table.Cell(7, 2).Range.Text = "Atención:";
                    table.Cell(7, 2).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                    table.Cell(7, 2).Range.Font.Size = 8;
                    table.Cell(7, 2).Range.Bold = 1;
                    table.Cell(7, 2).Width = 70;

                    table.Cell(7, 3).Range.Text = cotizacion.Result.DocumentoCabecera.NombreContacto;
                    table.Cell(7, 3).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                    table.Cell(7, 3).Range.Font.Size = 8;
                    table.Cell(7, 3).Width = 200;

                    table.Cell(7, 4).Merge(table.Cell(7, 5));
                    table.Cell(7, 4).Range.Text = "Moneda:";
                    table.Cell(7, 4).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                    table.Cell(7, 4).Range.Font.Size = 8;
                    table.Cell(7, 4).Range.Bold = 1;
                    table.Cell(7, 4).Width = 100;

                    table.Cell(7, 5).Merge(table.Cell(7, 6));
                    table.Cell(7, 5).Range.Text = cotizacionDTO.DescMoneda; //cotizacion.Result.DocumentoCabecera.Moneda;
                    table.Cell(7, 5).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                    table.Cell(7, 5).Range.Font.Size = 8;
                    table.Cell(7, 5).Width = 120;

                    table.Cell(8, 1).Range.Text = "";
                    table.Cell(8, 1).Width = 30;

                    table.Cell(8, 2).Range.Text = "Área:";
                    table.Cell(8, 2).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                    table.Cell(8, 2).Range.Font.Size = 8;
                    table.Cell(8, 2).Range.Bold = 1;
                    table.Cell(8, 2).Width = 70;

                    table.Cell(8, 3).Range.Text = cotizacion.Result.DocumentoCabecera.AreaContacto;
                    table.Cell(8, 3).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                    table.Cell(8, 3).Range.Font.Size = 8;
                    table.Cell(8, 3).Width = 200;

                    table.Cell(8, 4).Merge(table.Cell(8, 5));
                    table.Cell(8, 4).Range.Text = "Vigencia cotización:";
                    table.Cell(8, 4).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                    table.Cell(8, 4).Range.Font.Size = 8;
                    table.Cell(8, 4).Range.Bold = 1;
                    table.Cell(8, 4).Width = 100;

                    table.Cell(8, 5).Merge(table.Cell(8, 6));
                    table.Cell(8, 5).Range.Text = cotizacion.Result.DocumentoCabecera.Vigencia;
                    table.Cell(8, 5).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                    table.Cell(8, 5).Range.Font.Size = 8;
                    table.Cell(8, 5).Width = 120;

                    table.Cell(9, 1).Range.Text = "";
                    table.Cell(9, 1).Width = 30;

                    table.Cell(9, 2).Range.Text = "Teléfono:";
                    table.Cell(9, 2).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                    table.Cell(9, 2).Range.Font.Size = 8;
                    table.Cell(9, 2).Range.Bold = 1;
                    table.Cell(9, 2).Width = 70;

                    table.Cell(9, 3).Range.Text = cotizacion.Result.DocumentoCabecera.TelefonoContacto;
                    table.Cell(9, 3).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                    table.Cell(9, 3).Range.Font.Size = 8;
                    table.Cell(9, 3).Width = 200;

                    table.Cell(9, 4).Merge(table.Cell(9, 5));
                    table.Cell(9, 4).Range.Text = "Garantía:";
                    table.Cell(9, 4).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                    table.Cell(9, 4).Range.Font.Size = 8;
                    table.Cell(9, 4).Range.Bold = 1;
                    table.Cell(9, 4).Width = 100;

                    table.Cell(9, 5).Merge(table.Cell(9, 6));
                    table.Cell(9, 5).Range.Text = cotizacionDTO.DescGarantia; //cotizacion.Result.DocumentoCabecera.Garantia;
                    table.Cell(9, 5).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                    table.Cell(9, 5).Range.Font.Size = 8;
                    table.Cell(9, 5).Width = 120;

                    table.Cell(10, 1).Range.Text = "";
                    table.Cell(10, 1).Width = 30;

                    table.Cell(10, 2).Range.Text = "Correo:";
                    table.Cell(10, 2).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                    table.Cell(10, 2).Range.Font.Size = 8;
                    table.Cell(10, 2).Range.Bold = 1;
                    table.Cell(10, 2).Width = 70;

                    table.Cell(10, 3).Range.Text = cotizacion.Result.DocumentoCabecera.EmailContacto;
                    table.Cell(10, 3).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                    table.Cell(10, 3).Range.Font.Size = 8;
                    table.Cell(10, 3).Width = 200;

                    table.Cell(10, 4).Merge(table.Cell(10, 5));
                    table.Cell(10, 4).Range.Text = "Observación:";
                    table.Cell(10, 4).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                    table.Cell(10, 4).Range.Font.Size = 8;
                    table.Cell(10, 4).Range.Bold = 1;
                    table.Cell(10, 4).Width = 100;

                    table.Cell(10, 5).Merge(table.Cell(10, 6));
                    table.Cell(10, 5).Range.Text = cotizacion.Result.DocumentoCabecera.Observacion;
                    table.Cell(10, 5).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                    table.Cell(10, 5).Range.Font.Size = 8;
                    table.Cell(10, 5).Width = 120;
                    #endregion

                    table.Cell(11, 1).Merge(table.Cell(11, 7));

                    #region Cabecera Tabla
                    table.Cell(12, 1).Range.Text = "ITEM";
                    table.Cell(12, 1).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                    table.Cell(12, 1).Range.Font.Size = 8;
                    table.Cell(12, 1).Shading.BackgroundPatternColor = WdColor.wdColorBlueGray;
                    table.Cell(12, 1).Range.Bold = 1;
                    table.Cell(12, 1).Width = 30;
                    Borders borders3 = table.Cell(12, 1).Borders;
                    borders3.Enable = 1; // Habilitar bordes

                    table.Cell(12, 2).Range.Text = "CATÁLOGO";
                    table.Cell(12, 2).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                    table.Cell(12, 2).Range.Font.Size = 8;
                    table.Cell(12, 2).Shading.BackgroundPatternColor = WdColor.wdColorBlueGray;
                    table.Cell(12, 2).Range.Bold = 1;
                    table.Cell(12, 2).Width = 70;
                    Borders borders4 = table.Cell(12, 2).Borders;
                    borders4.Enable = 1; // Habilitar bordes

                    table.Cell(12, 3).Range.Text = "DESCRIPCIÓN";
                    table.Cell(12, 3).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                    table.Cell(12, 3).Range.Font.Size = 8;
                    table.Cell(12, 3).Shading.BackgroundPatternColor = WdColor.wdColorBlueGray;
                    table.Cell(12, 3).Range.Bold = 1;
                    table.Cell(12, 3).Width = 200;
                    Borders borders5 = table.Cell(12, 3).Borders;
                    borders5.Enable = 1; // Habilitar bordes

                    table.Cell(12, 4).Range.Text = "UND";
                    table.Cell(12, 4).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                    table.Cell(12, 4).Range.Font.Size = 8;
                    table.Cell(12, 4).Shading.BackgroundPatternColor = WdColor.wdColorBlueGray;
                    table.Cell(12, 4).Range.Bold = 1;
                    table.Cell(12, 4).Width = 50;
                    Borders borders6 = table.Cell(12, 4).Borders;
                    borders6.Enable = 1; // Habilitar bordes

                    table.Cell(12, 5).Range.Text = "CANT.";
                    table.Cell(12, 5).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                    table.Cell(12, 5).Range.Font.Size = 8;
                    table.Cell(12, 5).Shading.BackgroundPatternColor = WdColor.wdColorBlueGray;
                    table.Cell(12, 5).Range.Bold = 1;
                    table.Cell(12, 5).Width = 50;
                    Borders borders7 = table.Cell(12, 5).Borders;
                    borders7.Enable = 1; // Habilitar bordes

                    table.Cell(12, 6).Range.Text = "PRECIO UNITARIO";
                    table.Cell(12, 6).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                    table.Cell(12, 6).Range.Font.Size = 8;
                    table.Cell(12, 6).Shading.BackgroundPatternColor = WdColor.wdColorBlueGray;
                    table.Cell(12, 6).Range.Bold = 1;
                    table.Cell(12, 6).Width = 60;
                    Borders borders8 = table.Cell(12, 6).Borders;
                    borders8.Enable = 1; // Habilitar bordes

                    table.Cell(12, 7).Range.Text = "TOTAL";
                    table.Cell(12, 7).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                    table.Cell(12, 7).Range.Font.Size = 8;
                    table.Cell(12, 7).Shading.BackgroundPatternColor = WdColor.wdColorBlueGray;
                    table.Cell(12, 7).Range.Bold = 1;
                    table.Cell(12, 7).Width = 60;
                    Borders borders9 = table.Cell(12, 7).Borders;
                    borders9.Enable = 1; // Habilitar bordes
                    #endregion

                    var detalleCotizacion = cotizacion.Result.DocumentoDetalle;

                    foreach(var detalle in detalleCotizacion)
                    {
                        var i = 12 + Convert.ToInt32(detalle.NumeroItem);

                        table.Cell(i, 1).Range.Text = detalle.NumeroItem;
                        table.Cell(i, 1).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                        table.Cell(i, 1).Range.Font.Size = 8;
                        table.Cell(i, 1).Width = 30;
                        Borders borders10 = table.Cell(i, 1).Borders;
                        borders10.Enable = 1; // Habilitar bordes

                        table.Cell(i, 2).Range.Text = detalle.Catalogo;
                        table.Cell(i, 2).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                        table.Cell(i, 2).Range.Font.Size = 8;
                        table.Cell(i, 2).Width = 70;
                        Borders borders11 = table.Cell(i, 2).Borders;
                        borders11.Enable = 1; // Habilitar bordes

                        table.Cell(i, 3).Range.Text = detalle.Descripcion;
                        table.Cell(i, 3).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                        table.Cell(i, 3).Range.Font.Size = 8;
                        table.Cell(i, 3).Width = 200;
                        Borders borders12 = table.Cell(i, 3).Borders;
                        borders12.Enable = 1; // Habilitar bordes

                        table.Cell(i, 4).Range.Text = detalle.Unidad;
                        table.Cell(i, 4).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                        table.Cell(i, 4).Range.Font.Size = 8;
                        table.Cell(i, 4).Width = 50;
                        Borders borders13 = table.Cell(i, 4).Borders;
                        borders13.Enable = 1; // Habilitar bordes

                        table.Cell(i, 5).Range.Text = detalle.Cantidad;
                        table.Cell(i, 5).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                        table.Cell(i, 5).Range.Font.Size = 8;
                        table.Cell(i, 5).Width = 50;
                        Borders borders14 = table.Cell(i, 5).Borders;
                        borders14.Enable = 1; // Habilitar bordes

                        table.Cell(i, 6).Range.Text = detalle.PrecioUnitario;
                        table.Cell(i, 6).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                        table.Cell(i, 6).Range.Font.Size = 8;
                        table.Cell(i, 6).Width = 60;
                        Borders borders15 = table.Cell(i, 6).Borders;
                        borders15.Enable = 1; // Habilitar bordes

                        table.Cell(i, 7).Range.Text = detalle.Total;
                        table.Cell(i, 7).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                        table.Cell(i, 7).Range.Font.Size = 8;
                        table.Cell(i, 7).Width = 60;
                        Borders borders16 = table.Cell(i, 7).Borders;
                        borders16.Enable = 1; // Habilitar bordes

                    }

                    var j = 13 + Convert.ToInt32(cotizacion.Result.NroItems);

                    table.Cell(j, 1).Range.Text = "";
                    table.Cell(j, 1).Range.Font.Size = 8;
                    table.Cell(j, 1).Width = 30;

                    table.Cell(j, 2).Range.Text = "";
                    table.Cell(j, 2).Range.Font.Size = 8;
                    table.Cell(j, 2).Width = 70;

                    table.Cell(j, 3).Range.Text = "";
                    table.Cell(j, 3).Range.Font.Size = 8;
                    table.Cell(j, 3).Width = 200;

                    table.Cell(j, 4).Range.Text = "";
                    table.Cell(j, 4).Range.Font.Size = 8;
                    table.Cell(j, 4).Width = 50;

                    table.Cell(j, 5).Range.Text = "";
                    table.Cell(j, 5).Range.Font.Size = 8;
                    table.Cell(j, 5).Width = 50;

                    table.Cell(j, 6).Range.Text = "SUBTOTAL:";
                    table.Cell(j, 6).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                    table.Cell(j, 6).Range.Font.Size = 8;
                    table.Cell(j, 6).Width = 60;
                    table.Cell(j, 6).Range.Bold = 1;
                    Borders borders24 = table.Cell(j, 6).Borders;
                    borders24.Enable = 1; // Habilitar bordes

                    table.Cell(j, 7).Range.Text = cotizacion.Result.DocumentoCabecera.Subtotal;
                    table.Cell(j, 7).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                    table.Cell(j, 7).Range.Font.Size = 8;
                    table.Cell(j, 7).Width = 60;
                    Borders borders25 = table.Cell(j, 7).Borders;
                    borders25.Enable = 1; // Habilitar bordes

                    j++;

                    table.Cell(j, 1).Range.Text = "";
                    table.Cell(j, 1).Range.Font.Size = 8;
                    table.Cell(j, 1).Width = 30;

                    table.Cell(j, 2).Range.Text = "";
                    table.Cell(j, 2).Range.Font.Size = 8;
                    table.Cell(j, 2).Width = 70;

                    table.Cell(j, 3).Range.Text = "";
                    table.Cell(j, 3).Range.Font.Size = 8;
                    table.Cell(j, 3).Width = 200;

                    table.Cell(j, 4).Range.Text = "";
                    table.Cell(j, 4).Range.Font.Size = 8;
                    table.Cell(j, 4).Width = 50;

                    table.Cell(j, 5).Range.Text = "";
                    table.Cell(j, 5).Range.Font.Size = 8;
                    table.Cell(j, 5).Width = 50;

                    table.Cell(j, 6).Range.Text = "IGV (18%):";
                    table.Cell(j, 6).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                    table.Cell(j, 6).Range.Font.Size = 8;
                    table.Cell(j, 6).Width = 60;
                    table.Cell(j, 6).Range.Bold = 1;
                    Borders borders26 = table.Cell(j, 6).Borders;
                    borders26.Enable = 1; // Habilitar bordes

                    table.Cell(j, 7).Range.Text = cotizacion.Result.DocumentoCabecera.Igv;
                    table.Cell(j, 7).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                    table.Cell(j, 7).Range.Font.Size = 8;
                    table.Cell(j, 7).Width = 60;
                    Borders borders27 = table.Cell(j, 7).Borders;
                    borders27.Enable = 1; // Habilitar bordes

                    j ++;

                    table.Cell(j, 1).Range.Text = "";
                    table.Cell(j, 1).Range.Font.Size = 8;
                    table.Cell(j, 1).Width = 30;

                    table.Cell(j, 2).Range.Text = "";
                    table.Cell(j, 2).Range.Font.Size = 8;
                    table.Cell(j, 2).Width = 70;

                    table.Cell(j, 3).Range.Text = "";
                    table.Cell(j, 3).Range.Font.Size = 8;
                    table.Cell(j, 3).Width = 200;

                    table.Cell(j, 4).Range.Text = "";
                    table.Cell(j, 4).Range.Font.Size = 8;
                    table.Cell(j, 4).Width = 50;

                    table.Cell(j, 5).Range.Text = "";
                    table.Cell(j, 5).Range.Font.Size = 8;
                    table.Cell(j, 5).Width = 50;

                    table.Cell(j, 6).Range.Text = "TOTAL";
                    table.Cell(j, 6).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                    table.Cell(j, 6).Range.Font.Size = 8;
                    table.Cell(j, 6).Width = 60;
                    table.Cell(j, 6).Range.Bold = 1;
                    Borders borders28 = table.Cell(j, 6).Borders;
                    borders28.Enable = 1; // Habilitar bordes

                    table.Cell(j, 7).Range.Text = cotizacion.Result.DocumentoCabecera.Total;
                    table.Cell(j, 7).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                    table.Cell(j, 7).Range.Font.Size = 8;
                    table.Cell(j, 7).Width = 60;
                    table.Cell(j, 7).Range.Bold = 1;
                    Borders borders29 = table.Cell(j, 7).Borders;
                    borders29.Enable = 1; // Habilitar bordes

                    j++; 
                    table.Cell(j, 1).Merge(table.Cell(j, 7));
                    j++;

                    table.Cell(j, 1).Merge(table.Cell(j, 7));
                    table.Cell(j, 1).Range.Text = cotizacion.Result.DocumentoCabecera.Contrato;
                    table.Cell(j, 1).Range.Font.Size = 8;
                    table.Cell(j, 1).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphJustify;
                    j++;
                    table.Cell(j, 1).Merge(table.Cell(j, 7));
                    j++;
                    table.Cell(j, 1).Range.Text = "Vendedor:";
                    table.Cell(j, 1).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphJustify;
                    table.Cell(j, 1).Range.Font.Size = 8;
                    table.Cell(j, 1).Range.Bold = 1;
                    table.Cell(j, 1).Width = 80;

                    table.Cell(j, 2).Range.Text = cotizacion.Result.DocumentoCabecera.NombreVendedor;
                    table.Cell(j, 2).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphJustify;
                    table.Cell(j, 2).Range.Font.Size = 8;
                    table.Cell(j, 2).Range.Bold = 1;
                    table.Cell(j, 2).Width = 140;

                    j++;

                    table.Cell(j, 1).Range.Text = "Teléfono:";
                    table.Cell(j, 1).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphJustify;
                    table.Cell(j, 1).Range.Font.Size = 8;
                    table.Cell(j, 1).Range.Bold = 1;
                    table.Cell(j, 1).Width = 80;

                    table.Cell(j, 2).Range.Text = cotizacion.Result.DocumentoCabecera.TelefonoVendedor;
                    table.Cell(j, 2).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphJustify;
                    table.Cell(j, 2).Range.Font.Size = 8;
                    table.Cell(j, 2).Range.Bold = 1;
                    table.Cell(j, 2).Width = 140;
                    j++;
                    table.Cell(j, 1).Range.Text = "E-mail:";
                    table.Cell(j, 1).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphJustify;
                    table.Cell(j, 1).Range.Font.Size = 8;
                    table.Cell(j, 1).Range.Bold = 1;
                    table.Cell(j, 1).Width = 80;

                    table.Cell(j, 2).Range.Text = cotizacion.Result.DocumentoCabecera.EmailVendedor;
                    table.Cell(j, 2).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphJustify;
                    table.Cell(j, 2).Range.Font.Size = 8;
                    table.Cell(j, 2).Range.Bold = 1;
                    table.Cell(j, 2).Width = 140;

                    table.Cell(j-2, 3).Merge(table.Cell(j, 3));
                    table.Cell(j-2, 3).Range.Text = cotizacion.Result.DocumentoCabecera.Pie;
                    table.Cell(j-2, 3).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphJustify;
                    table.Cell(j-2, 3).Range.Font.Size = 8;
                    table.Cell(j-2, 3).Range.Bold = 1;
                    table.Cell(j-2, 3).Width = 300;

                    j++;

                    table.Cell(j, 1).Merge(table.Cell(j, 7));

                    // Establecer el espaciado después de cada párrafo a 0
                    foreach (Paragraph paragraph in doc.Paragraphs)
                    {
                        paragraph.SpaceAfter = 0; // Quitar espacio después del párrafo
                    }
                   

                    break; // Salir del bucle si tiene éxito
                }
                catch (COMException ex) when (ex.HResult == unchecked((int)0x8001010A))
                {
                    System.Threading.Thread.Sleep(1000); // Esperar 1 segundo
                    retries--;
                }
            }

            string rutaInicial = ConfigurationManager.AppSettings.Get("RutaCotizacionVenta");
            string nombre = cotizacion.Result.DocumentoCabecera.NumeroCotizacion + DateTime.Now.ToString("yyyyMMddHHmmss") + ".docx";
            var ruta_file = rutaInicial + nombre;

            // Guardar el documento
            doc.SaveAs2(ruta_file);
            doc.Close();
            wordApp.Quit();

            return Json(new
            {
                Status = 1,
                Archivo = nombre
            });
        }

        public FileResult ExportarFile(string nombreDoc)
        {
            string url = ConfigurationManager.AppSettings.Get("RutaCotizacionVenta");
            string ruta = url + nombreDoc;

            var fileName = Path.GetFileName(nombreDoc);
            var contentType = MimeMapping.GetMimeMapping(fileName); //determina el tipo de documento que se envía. 

            return File(ruta, contentType, nombreDoc);
        }

        public FileResult ExportarFileGuiaPedido(string nombreDoc)
        {
            string url = ConfigurationManager.AppSettings.Get("RutaVentaGP");
            string ruta = url + nombreDoc;

            var fileName = Path.GetFileName(nombreDoc);
            var contentType = MimeMapping.GetMimeMapping(fileName); //determina el tipo de documento que se envía. 

            return File(ruta, contentType, nombreDoc);
        }

        public FileResult ExportarFileGuiaBO(string nombreDoc)
        {
            string url = ConfigurationManager.AppSettings.Get("RutaVentaBO");
            string ruta = url + nombreDoc;

            var fileName = Path.GetFileName(nombreDoc);
            var contentType = MimeMapping.GetMimeMapping(fileName); //determina el tipo de documento que se envía. 

            return File(ruta, contentType, nombreDoc);
        }


        private static byte[] ReadFully(Stream input)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                input.CopyTo(ms);
                return ms.ToArray();
            }
        }

        [HttpPost]
        public JsonResult ExportarDocumentosVentas(string tipo, long codSolicitud)
        {
            var ventasBL = new VentasBL();
            var datosGuia = ventasBL.ConsultaGuia(codSolicitud,tipo).Result;

            var hssfworkbook = new HSSFWorkbook();

            var namesheet = datosGuia.GuiaCabecera.Titulo;
            if (namesheet == "B/O") namesheet = "BO";

            ISheet sh = hssfworkbook.CreateSheet(namesheet);

            //Se define ancho de columnas:
            sh.SetColumnWidth(0, 12 * 256);
            sh.SetColumnWidth(1, 8 * 256);
            sh.SetColumnWidth(2, 8 * 256);
            sh.SetColumnWidth(3, 7 * 256);
            sh.SetColumnWidth(4, 12 * 256);
            sh.SetColumnWidth(5, 9 * 256);
            sh.SetColumnWidth(6, 17 * 256);
            sh.SetColumnWidth(7, 5 * 256);
            sh.SetColumnWidth(8, 5 * 256);
            sh.SetColumnWidth(9, 5 * 256);
            sh.SetColumnWidth(10, 5 * 256);
            sh.SetColumnWidth(11, 6 * 256);
            sh.SetColumnWidth(12, 9 * 256);
            sh.SetColumnWidth(13, 12 * 256);
            sh.SetColumnWidth(14, 9 * 256);
            sh.SetColumnWidth(15, 8 * 256);
            sh.SetColumnWidth(16, 8 * 256);
            sh.SetColumnWidth(17, 9 * 256);
            sh.SetColumnWidth(18, 9 * 256);

            // Creacion del estilo
            var fontbold = hssfworkbook.CreateFont();
            //fontbold.Boldweight = (short)FontBoldWeight.Bold;
            fontbold.Color = HSSFColor.Black.Index;
            fontbold.FontHeightInPoints = 9;
            fontbold.FontName = "Arial Narrow";

            var fontbold2 = hssfworkbook.CreateFont();
            fontbold2.Boldweight = (short)FontBoldWeight.Bold;
            fontbold2.Color = HSSFColor.Black.Index;
            fontbold2.FontHeightInPoints = 20;
            fontbold2.FontName = "Arial Narrow";

            var fontbold3 = hssfworkbook.CreateFont();
            fontbold3.Boldweight = (short)FontBoldWeight.Bold;
            fontbold3.Color = HSSFColor.Blue.Index;
            fontbold3.FontHeightInPoints = 9;
            fontbold3.FontName = "Arial Narrow";

            var fontbold4 = hssfworkbook.CreateFont();
            fontbold4.Boldweight = (short)FontBoldWeight.Bold;
            fontbold4.Color = HSSFColor.Red.Index;
            fontbold4.FontHeightInPoints = 9;
            fontbold4.FontName = "Arial Narrow";

            var fontbold5 = hssfworkbook.CreateFont();
            fontbold5.Boldweight = (short)FontBoldWeight.Bold;
            fontbold5.Color = HSSFColor.Black.Index;
            fontbold5.FontHeightInPoints = 9;
            fontbold5.FontName = "Arial Narrow";


            var style = hssfworkbook.CreateCellStyle();
            style.SetFont(fontbold);


            var style2 = hssfworkbook.CreateCellStyle();
            style2.SetFont(fontbold2);
            style2.Alignment = HorizontalAlignment.Center;

            var style3 = hssfworkbook.CreateCellStyle();
            style3.SetFont(fontbold3);

            var style4 = hssfworkbook.CreateCellStyle();
            style4.SetFont(fontbold4);


            var style5 = hssfworkbook.CreateCellStyle();
            style5.SetFont(fontbold5);
            style5.BorderBottom = NPOI.SS.UserModel.BorderStyle.Thin;
            style5.BorderTop = NPOI.SS.UserModel.BorderStyle.Thin;
            style5.BorderRight = NPOI.SS.UserModel.BorderStyle.Thin;
            style5.BorderLeft = NPOI.SS.UserModel.BorderStyle.Thin;
            style5.WrapText = true;

            var style6 = hssfworkbook.CreateCellStyle();
            style6.SetFont(fontbold5);
            style6.BorderBottom = NPOI.SS.UserModel.BorderStyle.Thin;
            style6.BorderTop = NPOI.SS.UserModel.BorderStyle.Thin;
            style6.BorderRight = NPOI.SS.UserModel.BorderStyle.Thin;
            style6.BorderLeft = NPOI.SS.UserModel.BorderStyle.Thin;
            style6.Alignment = HorizontalAlignment.Right;

            var style7 = hssfworkbook.CreateCellStyle();
            style7.SetFont(fontbold);
            style7.Alignment = HorizontalAlignment.Center;

            var style8= hssfworkbook.CreateCellStyle();
            style8.SetFont(fontbold5);
            style8.BorderBottom = NPOI.SS.UserModel.BorderStyle.Thin;
            style8.BorderTop = NPOI.SS.UserModel.BorderStyle.Thin;
            style8.BorderRight = NPOI.SS.UserModel.BorderStyle.Thin;
            style8.BorderLeft = NPOI.SS.UserModel.BorderStyle.Thin;
            style8.FillForegroundColor = HSSFColor.BlueGrey.Index; //color de fondo
            style8.FillPattern = FillPattern.SolidForeground; // Relleno sólido

            var style9 = hssfworkbook.CreateCellStyle();
            style9.SetFont(fontbold5);
            style9.BorderBottom = NPOI.SS.UserModel.BorderStyle.Thin;
            style9.BorderTop = NPOI.SS.UserModel.BorderStyle.Thin;
            style9.BorderRight = NPOI.SS.UserModel.BorderStyle.Thin;
            style9.BorderLeft = NPOI.SS.UserModel.BorderStyle.Thin;
            style9.Alignment = HorizontalAlignment.Center;



            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(0, 3, 0, 5)); //1ra fila, ult fila, 1ra col, ult col
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(0, 0, 7, 9));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(1, 1, 7, 9));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(2, 2, 7, 9));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(3, 3, 7, 10));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(0, 0, 10, 11));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(1, 1, 10, 11));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(2, 2, 10, 11));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(0, 2, 14, 18));

            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(4, 4, 0, 1));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(4, 4, 2, 8));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(4, 4, 9, 10));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(4, 4, 11, 17));

            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(5, 5, 0, 1));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(5, 5, 2, 8));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(5, 5, 9, 10));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(5, 5, 11, 17));

            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(6, 6, 0, 1));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(6, 6, 2, 8));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(6, 6, 9, 10));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(6, 6, 11, 17));

            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(7, 7, 0, 1));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(7, 7, 2, 8));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(7, 7, 9, 10));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(7, 7, 11, 17));

            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(8, 8, 0, 1));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(8, 8, 2, 8));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(8, 8, 9, 10));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(8, 8, 11, 15));

            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(9, 9, 0, 15));

            //detalle: cabecera
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(10, 10, 5, 11));

            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(11, 11, 5, 11));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(12, 12, 5, 11));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(13, 13, 5, 11));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(14, 14, 5, 11));

            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(15, 15, 5, 11));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(16, 16, 5, 11));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(17, 17, 5, 11));

            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(18, 18, 0, 2));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(18, 18, 3, 12));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(18, 18, 16, 17));

            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(19, 19, 0, 2));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(19, 19, 3, 4));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(19, 19, 5, 6));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(19, 19, 7, 10));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(19, 19, 11, 12));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(19, 19, 13, 14));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(19, 19, 15, 18));

            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(20, 20, 0, 3));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(20, 20, 4, 6));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(20, 20, 7, 9));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(20, 20, 10, 12));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(20, 20, 13, 14));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(20, 21, 15, 18));

            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(21, 21, 0, 3));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(21, 21, 4, 6));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(21, 21, 7, 9));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(21, 21, 10, 12));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(21, 21, 13, 14));


            int rownum = 0;
            int cellnum = 0;
            IRow row = sh.CreateRow(rownum++);
            NPOI.SS.UserModel.ICell cell;

            // Leer la imagen
            int pictureIndex;
            //var url1 = new Uri(HttpContext.Request.Url, Url.Content(datosGuia.GuiaCabecera.RutaImagen));
            //var imagePath = url1.AbsoluteUri;

            string imagePath = ConfigurationManager.AppSettings.Get("RutaImagenGuia") + datosGuia.GuiaCabecera.RutaImagen;

            using (FileStream fs2 = new FileStream(imagePath, FileMode.Open, FileAccess.Read))
            {
                // Agregar la imagen al libro de trabajo
                pictureIndex = hssfworkbook.AddPicture(ReadFully(fs2), PictureType.PNG);
            }

            // Crear un objeto de dibujo
            IDrawing drawing = sh.CreateDrawingPatriarch();

            // Crear un ancla para la imagen
            IClientAnchor anchor = drawing.CreateAnchor(0, 0, 0, 0, 0, 0, 6, 4); // (col1, row1, col2, row2)

            // Insertar la imagen en la celda
            drawing.CreatePicture(anchor, pictureIndex);

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            //cell.SetCellValue("LOGO");




            cell = row.CreateCell(6);
            row.Height = 20 * 20;
            cell.CellStyle = style;
            cell.SetCellValue("FECHA DE OC");

            cell = row.CreateCell(7);
            cell.CellStyle = style3;
            cell.SetCellValue(datosGuia.GuiaCabecera.FechaOrdenCompra);

            cell = row.CreateCell(10);
            cell.CellStyle = style;
            cell.SetCellValue("BACK ORDERS");

            cell = row.CreateCell(12);
            cell.CellStyle = style3;
            cell.SetCellValue("X");

            cell = row.CreateCell(13);
            cell.CellStyle = style;
            cell.SetCellValue("N°");

            cell = row.CreateCell(14);
            cell.CellStyle = style2;
            cell.SetCellValue(datosGuia.GuiaCabecera.Titulo);


            row = sh.CreateRow(rownum++);

            cell = row.CreateCell(6);
            row.Height = 20 * 20;
            cell.CellStyle = style;
            cell.SetCellValue("TIEMPO DE ENTREGA");

            cell = row.CreateCell(7);
            cell.CellStyle = style3;
            cell.SetCellValue(datosGuia.GuiaCabecera.PlazoEntrega);

            cell = row.CreateCell(10);
            cell.CellStyle = style;
            cell.SetCellValue("COMPLETE");

            cell = row.CreateCell(12);
            cell.CellStyle = style;
            cell.SetCellValue("");

            cell = row.CreateCell(13);
            cell.CellStyle = style;
            cell.SetCellValue("DE");

            row = sh.CreateRow(rownum++);

            cell = row.CreateCell(6);
            row.Height = 20 * 20;
            cell.CellStyle = style;
            cell.SetCellValue("FECHA DE ENTREGA");

            cell = row.CreateCell(7);
            cell.CellStyle = style;
            cell.SetCellValue("");

            cell = row.CreateCell(10);
            cell.CellStyle = style;
            cell.SetCellValue("BACK ORDERS");

            cell = row.CreateCell(12);
            cell.CellStyle = style;
            cell.SetCellValue("");

            cell = row.CreateCell(13);
            cell.CellStyle = style;
            cell.SetCellValue("GUIA");

            row = sh.CreateRow(rownum++);

            cell = row.CreateCell(6);
            row.Height = 20 * 20;
            cell.CellStyle = style;
            cell.SetCellValue("VENDEDOR");

            cell = row.CreateCell(7);
            cell.CellStyle = style3;
            cell.SetCellValue(datosGuia.GuiaCabecera.NombreVendedor);


            cell = row.CreateCell(13);
            cell.CellStyle = style;
            cell.SetCellValue("PAG. N°");

            cell = row.CreateCell(14);
            cell.CellStyle = style4;
            cell.SetCellValue("01");

            cell = row.CreateCell(15);
            cell.CellStyle = style;
            cell.SetCellValue("DE");

            cell = row.CreateCell(16);
            cell.CellStyle = style4;
            cell.SetCellValue("01");

            cell = row.CreateCell(17);
            cell.CellStyle = style;
            cell.SetCellValue("PAGS.");

            cell = row.CreateCell(18);
            cell.CellStyle = style4;
            cell.SetCellValue("01");

            row = sh.CreateRow(rownum++);

            cell = row.CreateCell(0);
            cell.CellStyle = style;
            cell.SetCellValue("VENDIDO A");

            cell = row.CreateCell(2);
            cell.CellStyle = style3;
            cell.SetCellValue(datosGuia.GuiaCabecera.VendidoA);

            cell = row.CreateCell(9);
            cell.CellStyle = style;
            cell.SetCellValue("ENVIADO A");

            cell = row.CreateCell(11);
            cell.CellStyle = style3;
            cell.SetCellValue(datosGuia.GuiaCabecera.EnviadoA);

            row = sh.CreateRow(rownum++);

            cell = row.CreateCell(0);
            cell.CellStyle = style;
            cell.SetCellValue("RUC");

            cell = row.CreateCell(2);
            cell.CellStyle = style3;
            cell.SetCellValue(datosGuia.GuiaCabecera.Ruc);

            cell = row.CreateCell(9);
            cell.CellStyle = style;
            cell.SetCellValue("RUC");

            cell = row.CreateCell(11);
            cell.CellStyle = style3;
            cell.SetCellValue(datosGuia.GuiaCabecera.Ruc);

            row = sh.CreateRow(rownum++);

            cell = row.CreateCell(0);
            cell.CellStyle = style;
            cell.SetCellValue("DIRECCION");

            cell = row.CreateCell(2);
            cell.CellStyle = style3;
            cell.SetCellValue(datosGuia.GuiaCabecera.Direccion);

            cell = row.CreateCell(9);
            cell.CellStyle = style;
            cell.SetCellValue("DIRECCION");

            cell = row.CreateCell(11);
            cell.CellStyle = style3;
            cell.SetCellValue(datosGuia.GuiaCabecera.Direccion);

            row = sh.CreateRow(rownum++);

            cell = row.CreateCell(0);
            cell.CellStyle = style;
            cell.SetCellValue("CIUDAD");

            cell = row.CreateCell(2);
            cell.CellStyle = style3;
            cell.SetCellValue(datosGuia.GuiaCabecera.Ciudad);

            cell = row.CreateCell(9);
            cell.CellStyle = style;
            cell.SetCellValue("CIUDAD");

            cell = row.CreateCell(11);
            cell.CellStyle = style3;
            cell.SetCellValue(datosGuia.GuiaCabecera.Ciudad);

            row = sh.CreateRow(rownum++);

            cell = row.CreateCell(0);
            cell.CellStyle = style;
            cell.SetCellValue("N° ORDEN CLIENTE");

            cell = row.CreateCell(2);
            cell.CellStyle = style3;
            cell.SetCellValue(datosGuia.GuiaCabecera.NumeroOrdenCompra);

            cell = row.CreateCell(9);
            cell.CellStyle = style;
            cell.SetCellValue("REGISTRO N°");


            //detalle:
            int rownum2 = 10;
            row = sh.CreateRow(rownum2++);

            cell = row.CreateCell(0);
            cell.CellStyle = style5;
            cell.SetCellValue("Descargado");

            cell = row.CreateCell(1);
            cell.CellStyle = style5;
            cell.SetCellValue("Pendiente");

            cell = row.CreateCell(2);
            cell.CellStyle = style5;
            cell.SetCellValue("Cantidad");

            cell = row.CreateCell(3);
            cell.CellStyle = style5;
            cell.SetCellValue("Unidad");

            cell = row.CreateCell(4);
            cell.CellStyle = style5;
            cell.SetCellValue("N° de Catálogo");

            cell = row.CreateCell(5);
            cell.CellStyle = style5;
            cell.SetCellValue("DESCRIPCION");

            cell = row.CreateCell(6);
            cell.CellStyle = style5;

            cell = row.CreateCell(7);
            cell.CellStyle = style5;

            cell = row.CreateCell(8);
            cell.CellStyle = style5;

            cell = row.CreateCell(9);
            cell.CellStyle = style5;

            cell = row.CreateCell(10);
            cell.CellStyle = style5;

            cell = row.CreateCell(11);
            cell.CellStyle = style5;

            cell = row.CreateCell(12);
            cell.CellStyle = style5;
            cell.SetCellValue("Valor Unit. De Venta");

            cell = row.CreateCell(13);
            cell.CellStyle = style5;
            cell.SetCellValue("Total Valor de Venta");

            cell = row.CreateCell(14);
            cell.CellStyle = style5;
            cell.SetCellValue("Precio Kardex");

            cell = row.CreateCell(15);
            cell.CellStyle = style5;
            cell.SetCellValue("Total Kardex");

            cell = row.CreateCell(16);
            cell.CellStyle = style5;
            cell.SetCellValue("Unidades Entregadas");

            cell = row.CreateCell(17);
            cell.CellStyle = style5;
            cell.SetCellValue("Unidad Precio Costo");

            cell = row.CreateCell(18);
            cell.CellStyle = style5;
            cell.SetCellValue("Extensión Precio Costo");

            row = sh.CreateRow(rownum2++);

            cell = row.CreateCell(0);
            cell.CellStyle = style5;

            cell = row.CreateCell(1);
            cell.CellStyle = style5;

            cell = row.CreateCell(2);
            cell.CellStyle = style5;
            cell.SetCellValue("4");

            cell = row.CreateCell(3);
            cell.CellStyle = style5;
            cell.SetCellValue("UND");

            cell = row.CreateCell(4);
            cell.CellStyle = style5;
            cell.SetCellValue("UN260");

            cell = row.CreateCell(5);
            cell.CellStyle = style5;
            cell.SetCellValue("ESTUFA DE CONVECCIÓN NATURAL, 256L\r\nMARCA: MEMMERT");

            cell = row.CreateCell(6);
            cell.CellStyle = style5;

            cell = row.CreateCell(7);
            cell.CellStyle = style5;

            cell = row.CreateCell(8);
            cell.CellStyle = style5;

            cell = row.CreateCell(9);
            cell.CellStyle = style5;

            cell = row.CreateCell(10);
            cell.CellStyle = style5;

            cell = row.CreateCell(11);
            cell.CellStyle = style5;

            cell = row.CreateCell(12);
            cell.CellStyle = style5;
            cell.SetCellValue("$. 4,364.41");

            cell = row.CreateCell(13);
            cell.CellStyle = style5;
            cell.SetCellValue("$. 14,364.41");

            cell = row.CreateCell(14);
            cell.CellStyle = style5;

            cell = row.CreateCell(15);
            cell.CellStyle = style5;

            cell = row.CreateCell(16);
            cell.CellStyle = style5;

            cell = row.CreateCell(17);
            cell.CellStyle = style5;

            cell = row.CreateCell(18);
            cell.CellStyle = style5;

            row = sh.CreateRow(rownum2++);

            cell = row.CreateCell(0);
            cell.CellStyle = style5;

            cell = row.CreateCell(1);
            cell.CellStyle = style5;

            cell = row.CreateCell(2);
            cell.CellStyle = style5;
            cell.SetCellValue("3");

            cell = row.CreateCell(3);
            cell.CellStyle = style5;
            cell.SetCellValue("UND");

            cell = row.CreateCell(4);
            cell.CellStyle = style5;
            cell.SetCellValue("IN30");

            cell = row.CreateCell(5);
            cell.CellStyle = style5;
            cell.SetCellValue("INCUBADORA DE 32L\r\nMARCA: MEMMERT");

            cell = row.CreateCell(6);
            cell.CellStyle = style5;

            cell = row.CreateCell(7);
            cell.CellStyle = style5;

            cell = row.CreateCell(8);
            cell.CellStyle = style5;

            cell = row.CreateCell(9);
            cell.CellStyle = style5;

            cell = row.CreateCell(10);
            cell.CellStyle = style5;

            cell = row.CreateCell(11);
            cell.CellStyle = style5;

            cell = row.CreateCell(12);
            cell.CellStyle = style5;
            cell.SetCellValue("$. 4,364.41");

            cell = row.CreateCell(13);
            cell.CellStyle = style5;
            cell.SetCellValue("$. 14,364.41");

            cell = row.CreateCell(14);
            cell.CellStyle = style5;

            cell = row.CreateCell(15);
            cell.CellStyle = style5;

            cell = row.CreateCell(16);
            cell.CellStyle = style5;

            cell = row.CreateCell(17);
            cell.CellStyle = style5;

            cell = row.CreateCell(18);
            cell.CellStyle = style5;

            row = sh.CreateRow(rownum2++);

            cell = row.CreateCell(0);
            cell.CellStyle = style5;

            cell = row.CreateCell(1);
            cell.CellStyle = style5;

            cell = row.CreateCell(2);
            cell.CellStyle = style5;

            cell = row.CreateCell(3);
            cell.CellStyle = style5;

            cell = row.CreateCell(4);
            cell.CellStyle = style5;

            cell = row.CreateCell(5);
            cell.CellStyle = style5;

            cell = row.CreateCell(6);
            cell.CellStyle = style5;

            cell = row.CreateCell(7);
            cell.CellStyle = style5;

            cell = row.CreateCell(8);
            cell.CellStyle = style5;

            cell = row.CreateCell(9);
            cell.CellStyle = style5;

            cell = row.CreateCell(10);
            cell.CellStyle = style5;

            cell = row.CreateCell(11);
            cell.CellStyle = style5;

            cell = row.CreateCell(12);
            cell.CellStyle = style5;

            cell = row.CreateCell(13);
            cell.CellStyle = style5;

            cell = row.CreateCell(14);
            cell.CellStyle = style5;

            cell = row.CreateCell(15);
            cell.CellStyle = style5;

            cell = row.CreateCell(16);
            cell.CellStyle = style5;

            cell = row.CreateCell(17);
            cell.CellStyle = style5;

            cell = row.CreateCell(18);
            cell.CellStyle = style5;

            row = sh.CreateRow(rownum2++);

            cell = row.CreateCell(0);
            cell.CellStyle = style5;

            cell = row.CreateCell(1);
            cell.CellStyle = style5;

            cell = row.CreateCell(2);
            cell.CellStyle = style5;

            cell = row.CreateCell(3);
            cell.CellStyle = style5;

            cell = row.CreateCell(4);
            cell.CellStyle = style5;

            cell = row.CreateCell(5);
            cell.CellStyle = style5;

            cell = row.CreateCell(6);
            cell.CellStyle = style5;

            cell = row.CreateCell(7);
            cell.CellStyle = style5;

            cell = row.CreateCell(8);
            cell.CellStyle = style5;

            cell = row.CreateCell(9);
            cell.CellStyle = style5;

            cell = row.CreateCell(10);
            cell.CellStyle = style5;

            cell = row.CreateCell(11);
            cell.CellStyle = style5;

            cell = row.CreateCell(12);
            cell.CellStyle = style5;

            cell = row.CreateCell(13);
            cell.CellStyle = style5;

            cell = row.CreateCell(14);
            cell.CellStyle = style5;

            cell = row.CreateCell(15);
            cell.CellStyle = style5;

            cell = row.CreateCell(16);
            cell.CellStyle = style5;

            cell = row.CreateCell(17);
            cell.CellStyle = style5;

            cell = row.CreateCell(18);
            cell.CellStyle = style5;

            row = sh.CreateRow(rownum2++);


            cell = row.CreateCell(5);
            cell.CellStyle = style6;
            cell.SetCellValue("DÓLARES  SUB TOTAL");

            cell = row.CreateCell(6);
            cell.CellStyle = style5;

            cell = row.CreateCell(7);
            cell.CellStyle = style5;

            cell = row.CreateCell(8);
            cell.CellStyle = style5;

            cell = row.CreateCell(9);
            cell.CellStyle = style5;

            cell = row.CreateCell(10);
            cell.CellStyle = style5;

            cell = row.CreateCell(11);
            cell.CellStyle = style5;

            cell = row.CreateCell(12);
            cell.CellStyle = style5;

            cell = row.CreateCell(13);
            cell.CellStyle = style5;
            cell.SetCellValue("$. 21,779.00");

            cell = row.CreateCell(14);
            cell.CellStyle = style5;

            cell = row.CreateCell(15);
            cell.CellStyle = style5;

            cell = row.CreateCell(16);
            cell.CellStyle = style5;

            cell = row.CreateCell(17);
            cell.CellStyle = style5;

            cell = row.CreateCell(18);
            cell.CellStyle = style5;

            row = sh.CreateRow(rownum2++);


            cell = row.CreateCell(5);
            cell.CellStyle = style6;
            cell.SetCellValue("DÓLARES  IGV 18%");

            cell = row.CreateCell(6);
            cell.CellStyle = style5;

            cell = row.CreateCell(7);
            cell.CellStyle = style5;

            cell = row.CreateCell(8);
            cell.CellStyle = style5;

            cell = row.CreateCell(9);
            cell.CellStyle = style5;

            cell = row.CreateCell(10);
            cell.CellStyle = style5;

            cell = row.CreateCell(11);
            cell.CellStyle = style5;

            cell = row.CreateCell(12);
            cell.CellStyle = style5;

            cell = row.CreateCell(13);
            cell.CellStyle = style5;
            cell.SetCellValue("$. 21,779.00");

            cell = row.CreateCell(14);
            cell.CellStyle = style5;

            cell = row.CreateCell(15);
            cell.CellStyle = style5;

            cell = row.CreateCell(16);
            cell.CellStyle = style5;

            cell = row.CreateCell(17);
            cell.CellStyle = style5;

            cell = row.CreateCell(18);
            cell.CellStyle = style5;

            row = sh.CreateRow(rownum2++);

            cell = row.CreateCell(5);
            cell.CellStyle = style6;
            cell.SetCellValue("DÓLARES TOTAL");

            cell = row.CreateCell(6);
            cell.CellStyle = style5;

            cell = row.CreateCell(7);
            cell.CellStyle = style5;

            cell = row.CreateCell(8);
            cell.CellStyle = style5;

            cell = row.CreateCell(9);
            cell.CellStyle = style5;

            cell = row.CreateCell(10);
            cell.CellStyle = style5;

            cell = row.CreateCell(11);
            cell.CellStyle = style5;

            cell = row.CreateCell(12);
            cell.CellStyle = style5;

            cell = row.CreateCell(13);
            cell.CellStyle = style5;
            cell.SetCellValue("$. 21,779.00");

            cell = row.CreateCell(14);
            cell.CellStyle = style5;

            cell = row.CreateCell(15);
            cell.CellStyle = style5;

            cell = row.CreateCell(16);
            cell.CellStyle = style5;

            cell = row.CreateCell(17);
            cell.CellStyle = style5;

            cell = row.CreateCell(18);
            cell.CellStyle = style5;

            row = sh.CreateRow(rownum2++);

            cell = row.CreateCell(0);
            cell.CellStyle = style9;
            cell.SetCellValue("OBSERVACIONES:");

            cell = row.CreateCell(1);
            cell.CellStyle = style9;
            cell = row.CreateCell(2);
            cell.CellStyle = style9;
            cell = row.CreateCell(3);
            cell.CellStyle = style9;
            cell = row.CreateCell(4);
            cell.CellStyle = style9;
            cell = row.CreateCell(5);
            cell.CellStyle = style9;
            cell = row.CreateCell(6);
            cell.CellStyle = style9;
            cell = row.CreateCell(7);
            cell.CellStyle = style9;
            cell = row.CreateCell(8);
            cell.CellStyle = style9;
            cell = row.CreateCell(9);
            cell.CellStyle = style9;
            cell = row.CreateCell(10);
            cell.CellStyle = style9;
            cell = row.CreateCell(11);
            cell.CellStyle = style9;
            cell = row.CreateCell(12);
            cell.CellStyle = style9;
            cell = row.CreateCell(13);
            cell.CellStyle = style9;

            cell = row.CreateCell(14);
            cell.CellStyle = style8;
            cell = row.CreateCell(15);
            cell.CellStyle = style9;
            cell = row.CreateCell(16);
            cell.CellStyle = style8;
            cell = row.CreateCell(17);
            cell.CellStyle = style8;


            cell = row.CreateCell(18);
            cell.CellStyle = style5;
            cell.SetCellValue("TOTAL");

            row = sh.CreateRow(rownum2++);

            cell = row.CreateCell(0);
            row.Height = 30 * 20;
            cell.CellStyle = style9;
            cell.SetCellValue("EMPAQUETADO X");

            cell = row.CreateCell(1);
            cell.CellStyle = style9;

            cell = row.CreateCell(2);
            cell.CellStyle = style9;

            cell = row.CreateCell(3);
            cell.CellStyle = style9;
            cell.SetCellValue("FACTURADO X");

            cell = row.CreateCell(4);
            cell.CellStyle = style9;

            cell = row.CreateCell(5);
            cell.CellStyle = style9;
            cell.SetCellValue("N° DE FACTURA");
            cell = row.CreateCell(6);
            cell.CellStyle = style9;

            cell = row.CreateCell(7);
            cell.CellStyle = style9;
            cell.SetCellValue("ENTREGADO POR");

            cell = row.CreateCell(8);
            cell.CellStyle = style9;
            cell = row.CreateCell(9);
            cell.CellStyle = style9;
            cell = row.CreateCell(10);
            cell.CellStyle = style9;

            cell = row.CreateCell(11);
            cell.CellStyle = style9;
            cell.SetCellValue("N° DE CAJAS");
            cell = row.CreateCell(12);
            cell.CellStyle = style9;

            cell = row.CreateCell(13);
            cell.CellStyle = style9;
            cell.SetCellValue("GUIA FLETADOR");

            cell = row.CreateCell(14);
            cell.CellStyle = style9;

            cell = row.CreateCell(15);
            cell.CellStyle = style8;

            cell = row.CreateCell(16);
            cell.CellStyle = style8;

            cell = row.CreateCell(17);
            cell.CellStyle = style8;

            cell = row.CreateCell(18);
            cell.CellStyle = style8;

            row = sh.CreateRow(rownum2++);

            cell = row.CreateCell(0);
            cell.CellStyle = style9;
            cell.SetCellValue("ES CONFORME");

            cell = row.CreateCell(1);
            cell.CellStyle = style9;

            cell = row.CreateCell(2);
            cell.CellStyle = style9;

            cell = row.CreateCell(3);
            cell.CellStyle = style9;

            cell = row.CreateCell(4);
            cell.CellStyle = style9;
            cell.SetCellValue("FECHA DE DESPACHO");

            cell = row.CreateCell(5);
            cell.CellStyle = style9;
            cell = row.CreateCell(6);
            cell.CellStyle = style9;

            cell = row.CreateCell(7);
            cell.CellStyle = style9;
            cell.SetCellValue("CREDITO POR");

            cell = row.CreateCell(8);
            cell.CellStyle = style9;

            cell = row.CreateCell(9);
            cell.CellStyle = style9;

            cell = row.CreateCell(10);
            cell.CellStyle = style9;
            cell.SetCellValue("DESCARGADO");

            cell = row.CreateCell(11);
            cell.CellStyle = style9;

            cell = row.CreateCell(12);
            cell.CellStyle = style9;

            cell = row.CreateCell(13);
            cell.CellStyle = style9;
            cell.SetCellValue("PESO");

            cell = row.CreateCell(14);
            cell.CellStyle = style9;

            cell = row.CreateCell(15);
            cell.CellStyle = style5;

            cell = row.CreateCell(16);
            cell.CellStyle = style5;

            cell = row.CreateCell(17);
            cell.CellStyle = style5;

            cell = row.CreateCell(18);
            cell.CellStyle = style5;

            row = sh.CreateRow(rownum2++);

            cell = row.CreateCell(0);
            row.Height = 40 * 20;
            cell.CellStyle = style5;
            cell.SetCellValue("");

            cell = row.CreateCell(1);
            cell.CellStyle = style5;

            cell = row.CreateCell(2);
            cell.CellStyle = style5;

            cell = row.CreateCell(3);
            cell.CellStyle = style5;

            cell = row.CreateCell(4);
            cell.CellStyle = style5;

            cell = row.CreateCell(5);
            cell.CellStyle = style5;

            cell = row.CreateCell(6);
            cell.CellStyle = style5;

            cell = row.CreateCell(7);
            cell.CellStyle = style5;

            cell = row.CreateCell(8);
            cell.CellStyle = style5;

            cell = row.CreateCell(9);
            cell.CellStyle = style5;

            cell = row.CreateCell(10);
            cell.CellStyle = style5;

            cell = row.CreateCell(11);
            cell.CellStyle = style5;

            cell = row.CreateCell(12);
            cell.CellStyle = style5;

            cell = row.CreateCell(13);
            cell.CellStyle = style5;

            cell = row.CreateCell(14);
            cell.CellStyle = style5;

            cell = row.CreateCell(15);
            cell.CellStyle = style5;

            cell = row.CreateCell(16);
            cell.CellStyle = style5;

            cell = row.CreateCell(17);
            cell.CellStyle = style5;

            cell = row.CreateCell(18);
            cell.CellStyle = style5;


            string rutaInicial;
            string nombre;
            if(tipo == "GP")
            {
                rutaInicial=ConfigurationManager.AppSettings.Get("RutaVentaGP");
                nombre = "GP_" + DateTime.Now.ToString("yyyyMMddHHmmss") + ".xls";
            }
            else
            {
                rutaInicial=ConfigurationManager.AppSettings.Get("RutaVentaBO");
                nombre = "BO_" + DateTime.Now.ToString("yyyyMMddHHmmss") + ".xls";
            }

            
            var ruta_file = rutaInicial + nombre;

            try
            {
                using (var fs = new FileStream(ruta_file, FileMode.Create, FileAccess.Write))
                {
                    hssfworkbook.Write(fs);
                }
                return Json(new
                {
                    Status = 1,
                    Archivo = nombre
                });
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    Status = 0,
                    Archivo = ex.Message.ToString()
                }); 
            }


        }

    }
}