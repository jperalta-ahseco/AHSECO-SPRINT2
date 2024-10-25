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

        public JsonResult GenerarCotizacion(int codCotizacion)
        {

            var ventasBL = new VentasBL();
            var cotizacion = ventasBL.ConsultaCotizacionCliente(codCotizacion);

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
                    Table table = doc.Tables.Add(doc.Range(0, 0), numRows, numCols);
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
                    table.Cell(6, 5).Range.Text = cotizacion.Result.DocumentoCabecera.FormaPago;
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
                    table.Cell(7, 5).Range.Text = cotizacion.Result.DocumentoCabecera.Moneda;
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
                    table.Cell(9, 5).Range.Text = cotizacion.Result.DocumentoCabecera.Garantia;
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


    }
}