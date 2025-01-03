using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using AHSECO.CCL.FRONTEND.Identity;
using System.Web.Mvc;
using AHSECO.CCL.BE.Ventas;
using AHSECO.CCL.BL.Ventas;
using AHSECO.CCL.FRONTEND.Security;
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
using static System.Windows.Forms.VisualStyles.VisualStyleElement.Tab;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Drawing.Charts;
using System.Security.Cryptography;
using DocumentFormat.OpenXml.Spreadsheet;
using DocumentFormat.OpenXml.Drawing;
using static AHSECO.CCL.FRONTEND.Core.MultiFlujo.Tag;
using DocumentFormat.OpenXml.Math;
using System.Web.UI.WebControls.WebParts;
using NPOI.XWPF.UserModel;


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

            string nombre = cotizacion.Result.DocumentoCabecera.NumeroCotizacion + DateTime.Now.ToString("yyyyMMddHHmmss") + ".docx";

            // Crea un MemoryStream para almacenar el archivo Word en memoria
            using (MemoryStream memoryStream = new MemoryStream())
            {
                // Crea el documento Word (.docx)
                using (WordprocessingDocument wordDoc = WordprocessingDocument.Create(memoryStream, DocumentFormat.OpenXml.WordprocessingDocumentType.Document))
                {
                    // Agrega el contenido principal al documento
                    MainDocumentPart mainPart = wordDoc.AddMainDocumentPart();
                    mainPart.Document = new DocumentFormat.OpenXml.Wordprocessing.Document();
                    DocumentFormat.OpenXml.Wordprocessing.Body body = new DocumentFormat.OpenXml.Wordprocessing.Body();
                    mainPart.Document.Append(body);

                    // Crear la sección del documento(con márgenes personalizados)
                    SectionProperties sectionProperties = new SectionProperties();

                    // Establecer los márgenes (en puntos, 1 pulgada = 72 puntos)
                    int marginInPoints = 720;
                    UInt32 marginInPointsU = 720;
                    PageMargin pageMargin = new PageMargin
                    {
                        Top = marginInPoints,   // 10 pulgadas
                        Bottom = marginInPoints, // 10 pulgadas
                        Left = marginInPointsU,  // 20 pulgadas
                        Right = marginInPointsU  // 20 pulgadas
                    };
                    sectionProperties.Append(pageMargin);

                    // Agregar la sección al documento
                    mainPart.Document.Body.Append(sectionProperties);



                    #region Cabecera:
                    DocumentFormat.OpenXml.Wordprocessing.Table table = new DocumentFormat.OpenXml.Wordprocessing.Table();
                    // Establecer las propiedades de la tabla (opcional)
                    DocumentFormat.OpenXml.Wordprocessing.TableProperties tblProperties = new DocumentFormat.OpenXml.Wordprocessing.TableProperties(
                        new TableWidth() { Type = TableWidthUnitValues.Auto }
                    );
                    table.AppendChild(tblProperties);

                   
                    // Crear la primera fila
                    DocumentFormat.OpenXml.Wordprocessing.TableRow row1 = new DocumentFormat.OpenXml.Wordprocessing.TableRow();
                    DocumentFormat.OpenXml.Wordprocessing.TableCellProperties cellProperties1 = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties();

                    // Agregar las propiedades y contenido a la celda
                    var cell1 = CreateCell("Logo","S","16","LEFT");
                    cell1.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new VerticalMerge() { Val = MergedCellValues.Restart },
                                                                                                              new GridSpan() { Val = 4 }
                                                                                                             );
                    CellWith(cell1, "5");


                    var cell2 = CreateCell(cotizacion.Result.DocumentoCabecera.Encabezado,"N","16","CENTER");
                    cell2.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new VerticalMerge() { Val = MergedCellValues.Restart },
                                                                                                              new GridSpan() { Val = 4 }
                                                                                                              );

                    CellWith(cell2, "9");
                    var cell3 = CreateCell("COTIZACIÓN","N","22","CENTER");
                    cell3.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 2 });
                    CellWith(cell3, "4");
                    row1.Append(cell1, cell2, cell3);

                    // Crear la segunda fila
                    DocumentFormat.OpenXml.Wordprocessing.TableRow row2 = new DocumentFormat.OpenXml.Wordprocessing.TableRow();

                    var cell4 = CreateCell("","S","16","LEFT");
                    cell4.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new VerticalMerge() { Val = MergedCellValues.Continue },
                                                                                                              new GridSpan() { Val = 4 });

                    var cell5 = CreateCell("","N","16", "CENTER");
                    cell5.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new VerticalMerge() { Val = MergedCellValues.Continue },
                                                                                                              new GridSpan() { Val = 4 });

                    var cell6 = CreateCell(cotizacion.Result.DocumentoCabecera.NumeroCotizacion,"N","22", "CENTER");
                    cell6.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 2 });


                    row2.Append(cell4, cell5, cell6);

                    // Crear la 3ra fila:
                    DocumentFormat.OpenXml.Wordprocessing.TableRow row3 = new DocumentFormat.OpenXml.Wordprocessing.TableRow();

                    var cell7 = CreateCell("", "N", "16", "CENTER");
                    cell7.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 10 });
                    row3.Append(cell7);

                    // Agregar todas las filas a la tabla
                    table.Append(row1, row2, row3);

                    // Añadir la tabla al cuerpo del documento
                    mainPart.Document.Body.AppendChild(table);
                    #endregion

                    #region Datos Clientes:
                    DocumentFormat.OpenXml.Wordprocessing.Table table2 = new DocumentFormat.OpenXml.Wordprocessing.Table();
                    // Establecer las propiedades de la tabla (opcional)
                    DocumentFormat.OpenXml.Wordprocessing.TableProperties tblProperties2 = new DocumentFormat.OpenXml.Wordprocessing.TableProperties(
                        new TableWidth() { Type = TableWidthUnitValues.Auto }
                    );
                    table2.AppendChild(tblProperties2);

                    // Crear la primera fila
                    DocumentFormat.OpenXml.Wordprocessing.TableRow row8 = new DocumentFormat.OpenXml.Wordprocessing.TableRow();
                    var cell8 = CreateCell("","N","16", "CENTER");
                    cell8.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new TableCellWidth() { Type = TableWidthUnitValues.Pct, Width = "100" });

                    var cell9 = CreateCell("RUC:","S","16", "LEFT");
                    cell9.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 2 }, new TableCellWidth() { Type = TableWidthUnitValues.Pct, Width = "250" });
                    
                    var cell10 = CreateCell(cotizacion.Result.DocumentoCabecera.Ruc,"N","16", "LEFT");
                    cell10.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 3 });
                    
                    var cell11 = CreateCell("Fecha:","S","16", "LEFT");
                    cell11.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 2 });
                    
                    var cell12 = CreateCell(cotizacion.Result.DocumentoCabecera.Fecha,"N","16", "LEFT");
                    cell12.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 2 });
                    
                    row8.Append(cell8, cell9, cell10, cell11, cell12);

                    // Crear la 2da fila
                    DocumentFormat.OpenXml.Wordprocessing.TableRow row9 = new DocumentFormat.OpenXml.Wordprocessing.TableRow();
                    var cell13 = CreateCell("","N","16", "CENTER");
                    cell13.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new VerticalMerge() { Val = MergedCellValues.Restart });
                    
                    var cell14 = CreateCell("Señor:","S","16", "LEFT");
                    //cell14.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 2 });
                    cell14.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new VerticalMerge() { Val = MergedCellValues.Restart },
                                                                      new GridSpan() { Val = 2 });
                    
                    var cell15 = CreateCell(cotizacion.Result.DocumentoCabecera.RazonSocial,"N","16", "LEFT");
                    //cell15.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 3 });
                    cell15.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new VerticalMerge() { Val = MergedCellValues.Restart },
                                                                      new GridSpan() { Val = 3 });

                    var cell16 = CreateCell("Plazo de Entrega:","S","16","LEFT");
                    cell16.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 2 });

                    var cell17 = CreateCell(cotizacion.Result.DocumentoCabecera.PlazoEntrega,"N","16", "LEFT");
                    cell17.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 2 });

                    row9.Append(cell13, cell14, cell15, cell16, cell17);

                    // Crear la 3ra fila
                    DocumentFormat.OpenXml.Wordprocessing.TableRow row10 = new DocumentFormat.OpenXml.Wordprocessing.TableRow();
                    var cell18 = CreateCell("","N","16", "CENTER");
                    cell18.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new VerticalMerge() { Val = MergedCellValues.Continue });
                    
                    var cell19 = CreateCell("","N","16", "CENTER");
                    //cell19.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 2 });
                    cell19.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new VerticalMerge() { Val = MergedCellValues.Continue },
                                                                      new GridSpan() { Val = 2 });
                    var cell20 = CreateCell("","N","16","CENTER");
                    //cell20.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 3 });
                    cell20.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new VerticalMerge() { Val = MergedCellValues.Continue },
                                                                      new GridSpan() { Val = 3 });
                    var cell21 = CreateCell("Forma de Pago:","S","16", "LEFT");
                    cell21.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 2 });

                    var cell22 = CreateCell(cotizacion.Result.DocumentoCabecera.FormaPago, "N","16","LEFT");
                    cell22.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 2 });

                    row10.Append(cell18, cell19, cell20, cell21, cell22);

                    // Crear la 4ta fila
                    DocumentFormat.OpenXml.Wordprocessing.TableRow row11 = new DocumentFormat.OpenXml.Wordprocessing.TableRow();
                    var cell23 = CreateCell("","N","16", "CENTER");

                    var cell24 = CreateCell("Atención:","S","16","LEFT");
                    cell24.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 2 });

                    var cell25 = CreateCell(cotizacion.Result.DocumentoCabecera.NombreContacto,"N","16","LEFT");
                    cell25.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 3 });

                    var cell26 = CreateCell("Moneda:","S","16","LEFT");
                    cell26.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 2 });

                    var cell27 = CreateCell(cotizacionDTO.DescMoneda,"N","16","LEFT");
                    cell27.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 2 });

                    row11.Append(cell23, cell24, cell25, cell26, cell27);

                    // Crear la 5ta fila
                    DocumentFormat.OpenXml.Wordprocessing.TableRow row12 = new DocumentFormat.OpenXml.Wordprocessing.TableRow();
                    var cell28 = CreateCell("","N","16", "CENTER");

                    var cell29 = CreateCell("Área:","S","16","LEFT");
                    cell29.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 2 });

                    var cell30 = CreateCell(cotizacion.Result.DocumentoCabecera.AreaContacto,"N","16", "LEFT");
                    cell30.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 3 });

                    var cell31 = CreateCell("Vigencia cotización:","S","16", "LEFT");
                    cell31.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 2 });

                    var cell32 = CreateCell(cotizacion.Result.DocumentoCabecera.Vigencia,"N","16", "LEFT");
                    cell32.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 2 });

                    row12.Append(cell28, cell29, cell30, cell31, cell32);

                    // Crear la 6ta fila
                    DocumentFormat.OpenXml.Wordprocessing.TableRow row13 = new DocumentFormat.OpenXml.Wordprocessing.TableRow();
                    var cell33 = CreateCell("","N","16", "CENTER");

                    var cell34 = CreateCell("Teléfono:","S","16", "LEFT");
                    cell34.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 2 });

                    var cell35 = CreateCell(cotizacion.Result.DocumentoCabecera.TelefonoContacto,"N","16","LEFT");
                    cell35.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 3 });

                    var cell36 = CreateCell("Garantía:","S","16", "LEFT");
                    cell36.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 2 });

                    var cell37 = CreateCell(cotizacionDTO.DescGarantia,"N","16", "LEFT");
                    cell37.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 2 });

                    row13.Append(cell33, cell34, cell35, cell36, cell37);

                    // Crear la 7ma fila
                    DocumentFormat.OpenXml.Wordprocessing.TableRow row14 = new DocumentFormat.OpenXml.Wordprocessing.TableRow();
                    var cell38 = CreateCell("","N","16", "CENTER");

                    var cell39 = CreateCell("Correo:","S","16", "LEFT");
                    cell39.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 2 });

                    var cell40 = CreateCell(cotizacion.Result.DocumentoCabecera.EmailContacto,"N","16", "LEFT");
                    cell40.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 3 });

                    var cell41 = CreateCell("Observación:","S","16", "LEFT");
                    cell41.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 2 });

                    var cell42 = CreateCell(cotizacion.Result.DocumentoCabecera.Observacion,"N","16", "LEFT");
                    cell42.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 2 });

                    row14.Append(cell38, cell39, cell40, cell41, cell42);

                    // Crear la 8va fila:
                    DocumentFormat.OpenXml.Wordprocessing.TableRow row15 = new DocumentFormat.OpenXml.Wordprocessing.TableRow();

                    var cell43 = CreateCell("","N","16", "CENTER");
                    cell43.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 10 });
                    row15.Append(cell43);

                    // Agregar todas las filas a la tabla
                    table2.Append(row8);
                    table2.Append(row9);
                    table2.Append(row10);
                    table2.Append(row11);
                    table2.Append(row12);
                    table2.Append(row13);
                    table2.Append(row14);
                    table2.Append(row15);

                    // Añadir la tabla al cuerpo del documento
                    mainPart.Document.Body.AppendChild(table2);

                    #endregion

                    #region Detalle Cotizacion:
                    DocumentFormat.OpenXml.Wordprocessing.Table table3 = new DocumentFormat.OpenXml.Wordprocessing.Table();
                    // Establecer las propiedades de la tabla (opcional)
                    DocumentFormat.OpenXml.Wordprocessing.TableProperties tblProperties3 = new DocumentFormat.OpenXml.Wordprocessing.TableProperties(
                        new TableWidth() { Type = TableWidthUnitValues.Auto }
                    );
                    table3.AppendChild(tblProperties3);

                    // Crear la primera fila
                    DocumentFormat.OpenXml.Wordprocessing.TableRow row16 = new DocumentFormat.OpenXml.Wordprocessing.TableRow();
                    var cell44 = CreateCell("ITEM","S","16", "CENTER");
                    cell44.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new TableCellWidth() { Type = TableWidthUnitValues.Pct, Width = "60" });
                    CellBackground(cell44, "22d9f4");
                    CellBorder(cell44, 4, 4, 4, 4, "000000");
                   

                    var cell45 = CreateCell("CATÁLOGO","S","16", "CENTER");
                    cell45.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 2 },
                                                        new TableCellWidth() { Type = TableWidthUnitValues.Pct, Width = "100" });
                    CellBackground(cell45, "22d9f4");
                    CellBorder(cell45, 4, 4, 4, 4, "000000");
                    

                    var cell46 = CreateCell("DESCRIPCIÓN","S","16", "CENTER");
                    cell46.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 3 },
                                                                                                new TableCellWidth() { Type = TableWidthUnitValues.Pct, Width = "400" });
                    CellBackground(cell46, "22d9f4");
                    CellBorder(cell46, 4, 4, 4, 4, "000000");
                    

                    var cell47 = CreateCell("UND","S","16", "CENTER");
                    cell47.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new TableCellWidth() { Type = TableWidthUnitValues.Pct, Width = "100" });
                    CellBackground(cell47, "22d9f4");
                    CellBorder(cell47, 4, 4, 4, 4, "000000");
               

                    var cell48 = CreateCell("CANT.", "S", "16", "CENTER");
                    cell48.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new TableCellWidth() { Type = TableWidthUnitValues.Pct, Width = "100" });
                    CellBackground(cell48, "22d9f4");
                    CellBorder(cell48, 4, 4, 4, 4, "000000");
                  

                    var cell49 = CreateCell("PRECIO UNITARIO","S","16", "CENTER");
                    cell49.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new TableCellWidth() { Type = TableWidthUnitValues.Pct, Width = "120" });
                    CellBackground(cell49, "22d9f4");
                    CellBorder(cell49, 4, 4, 4, 4, "000000");
                  

                    var cell50 = CreateCell("TOTAL","S","16", "CENTER");
                    cell50.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new TableCellWidth() { Type = TableWidthUnitValues.Pct, Width = "120" });
                    CellBackground(cell50, "22d9f4");
                    CellBorder(cell50, 4, 4, 4, 4, "000000");
                   

                    row16.Append(cell44, cell45, cell46, cell47, cell48, cell49, cell50);
                    table3.Append(row16);

                    //Crea detalle de la tabla:
                    foreach (var item in cotizacion.Result.DocumentoDetalle)
                    {
                        var row17 = new DocumentFormat.OpenXml.Wordprocessing.TableRow();
                        var cell51 = CreateCell(item.NumeroItem, "N", "16", "LEFT");
                        CellBorder(cell51, 4, 4, 4, 4, "000000");

                        var cell52 = CreateCell(item.Catalogo, "N", "16", "LEFT");    
                        cell52.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 2 });
                        CellBorder(cell52, 4, 4, 4, 4, "000000");

                        var cell53 = CreateCell(item.Descripcion, "N", "16", "LEFT");
                        cell53.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 3 });
                        CellBorder(cell53, 4, 4, 4, 4, "000000");

                        var cell54 = CreateCell(item.Unidad, "N", "16", "LEFT");
                        CellBorder(cell54, 4, 4, 4, 4, "000000");

                        var cell55 = CreateCell(item.Cantidad, "N", "16", "LEFT");
                        CellBorder(cell55, 4, 4, 4, 4, "000000");

                        var cell56 = CreateCell(item.PrecioUnitario, "N", "16", "LEFT");
                        CellBorder(cell56, 4, 4, 4, 4, "000000");

                        var cell57 = CreateCell(item.Total, "N", "16", "LEFT");
                        CellBorder(cell57, 4, 4, 4, 4, "000000");

                        row17.AppendChild(cell51);
                        row17.AppendChild(cell52);
                        row17.AppendChild(cell53);
                        row17.AppendChild(cell54);
                        row17.AppendChild(cell55);
                        row17.AppendChild(cell56);
                        row17.AppendChild(cell57);

                        table3.AppendChild(row17);
                    }

                    // Crear sub total:
                    DocumentFormat.OpenXml.Wordprocessing.TableRow row18 = new DocumentFormat.OpenXml.Wordprocessing.TableRow();
                    var cell58 = CreateCell("", "N", "16", "CENTER");

                    var cell59 = CreateCell("", "N", "16", "CENTER");
                    cell59.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 2 });
                    
                    var cell60 = CreateCell("", "N", "16","CENTER");
                    cell60.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 3 });
                    
                    var cell61 = CreateCell("", "N", "16","CENTER");

                    var cell62 = CreateCell("", "N", "16","CENTER");

                    var cell63 = CreateCell("SUBTOTAL:", "S", "16", "CENTER");
                    CellBorder(cell63, 4, 4, 4, 4, "000000");

                    var cell64 = CreateCell(cotizacion.Result.DocumentoCabecera.Subtotal, "N", "16","LEFT");
                    CellBorder(cell64, 4, 4, 4, 4, "000000");

                    row18.Append(cell58, cell59, cell60, cell61, cell62, cell63, cell64);
                    table3.Append(row18);

                    // Crear IGV:
                    DocumentFormat.OpenXml.Wordprocessing.TableRow row19 = new DocumentFormat.OpenXml.Wordprocessing.TableRow();
                    var cell65 = CreateCell("", "N", "16","CENTER");

                    var cell66 = CreateCell("", "N", "16","CENTER");
                    cell66.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 2 });
                   
                    var cell67 = CreateCell("", "N", "16","CENTER");
                    cell67.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 3 });
                    
                    var cell68 = CreateCell("", "N", "16","CENTER");

                    var cell69 = CreateCell("", "N", "16","CENTER");

                    var cell70 = CreateCell("IGV (18%):", "S", "16", "CENTER");
                    CellBorder(cell70, 4, 4, 4, 4, "000000");

                    var cell71 = CreateCell(cotizacion.Result.DocumentoCabecera.Igv, "N", "16","LEFT");
                    CellBorder(cell71, 4, 4, 4, 4, "000000");

                    row19.Append(cell65, cell66, cell67, cell68, cell69, cell70, cell71);
                    table3.Append(row19);

                    // Crear Total:
                    DocumentFormat.OpenXml.Wordprocessing.TableRow row20 = new DocumentFormat.OpenXml.Wordprocessing.TableRow();
                    var cell72 = CreateCell("", "N", "16","CENTER");

                    var cell73 = CreateCell("", "N", "16","CENTER");
                    cell73.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 2 });
                    
                    var cell74 = CreateCell("", "N", "16","CENTER");
                    cell74.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 3 });
                    
                    var cell75 = CreateCell("", "N", "16","CENTER");

                    var cell76 = CreateCell("", "N", "16","CENTER");

                    var cell77 = CreateCell("TOTAL:", "S", "16", "CENTER");
                    CellBorder(cell77, 4, 4, 4, 4, "000000");

                    var cell78 = CreateCell(cotizacion.Result.DocumentoCabecera.Total, "N", "16","LEFT");
                    CellBorder(cell78, 4, 4, 4, 4, "000000");

                    row20.Append(cell72, cell73, cell74, cell75, cell76, cell77, cell78);
                    table3.Append(row20);

                    // Crear linea:
                    DocumentFormat.OpenXml.Wordprocessing.TableRow row21 = new DocumentFormat.OpenXml.Wordprocessing.TableRow();

                    var cell79 = CreateCell("", "N", "16","CENTER");
                    cell79.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 10 });
                    
                    row21.Append(cell79);
                    table3.Append(row21);


                    // Añadir la tabla al cuerpo del documento
                    mainPart.Document.Body.AppendChild(table3);

                    #endregion

                    #region Contrato:
                    DocumentFormat.OpenXml.Wordprocessing.Table table4 = new DocumentFormat.OpenXml.Wordprocessing.Table();
                    // Establecer las propiedades de la tabla (opcional)
                    DocumentFormat.OpenXml.Wordprocessing.TableProperties tblProperties4 = new DocumentFormat.OpenXml.Wordprocessing.TableProperties(
                        new TableWidth() { Type = TableWidthUnitValues.Auto }
                    );
                    table4.AppendChild(tblProperties4);

                    // Crear la primera fila
                    DocumentFormat.OpenXml.Wordprocessing.TableRow row22= new DocumentFormat.OpenXml.Wordprocessing.TableRow();
                    var cell80 = CreateCell(cotizacion.Result.DocumentoCabecera.Contrato, "N", "16","LEFT");
                    cell80.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 10 });

                    row22.Append(cell80);
                    table4.Append(row22);

                    // Crear la 2da fila
                    DocumentFormat.OpenXml.Wordprocessing.TableRow row23 = new DocumentFormat.OpenXml.Wordprocessing.TableRow();
                    var cell81 = CreateCell("", "N", "16","CENTER");
                    cell81.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 10 });
                    row23.Append(cell81);
                    table4.Append(row23);

                    // Añadir la tabla al cuerpo del documento
                    mainPart.Document.Body.AppendChild(table4);

                    #endregion

                    #region Pie:
                    DocumentFormat.OpenXml.Wordprocessing.Table table5 = new DocumentFormat.OpenXml.Wordprocessing.Table();
                    // Establecer las propiedades de la tabla (opcional)
                    DocumentFormat.OpenXml.Wordprocessing.TableProperties tblProperties5 = new DocumentFormat.OpenXml.Wordprocessing.TableProperties(
                        new TableWidth() { Type = TableWidthUnitValues.Auto }
                    );
                    table5.AppendChild(tblProperties5);

                    // Crear la primera fila
                    DocumentFormat.OpenXml.Wordprocessing.TableRow row24 = new DocumentFormat.OpenXml.Wordprocessing.TableRow();
                    var cell82 = CreateCell("Vendedor:", "S", "16","LEFT");
                    cell82.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 2 });

                    var cell83 = CreateCell(cotizacion.Result.DocumentoCabecera.NombreVendedor, "N", "16","LEFT");
                    cell83.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 3 });

                    var cell84 = CreateCell(cotizacion.Result.DocumentoCabecera.Pie, "N", "16","LEFT");
                    //cell84.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 5 });
                    cell84.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new VerticalMerge() { Val = MergedCellValues.Restart },
                                                                       new GridSpan() { Val = 5 });

                    row24.Append(cell82, cell83, cell84);
                    table5.Append(row24);

                    // Crear la 2da fila
                    DocumentFormat.OpenXml.Wordprocessing.TableRow row25 = new DocumentFormat.OpenXml.Wordprocessing.TableRow();
                    var cell85 = CreateCell("Teléfono:", "S", "16","LEFT");
                    cell85.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 2 });

                    var cell86 = CreateCell(cotizacion.Result.DocumentoCabecera.TelefonoVendedor, "N", "16","LEFT");
                    cell86.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 3 });

                    var cell87 = CreateCell("", "N", "16","CENTER");
                    cell87.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 5 });
                    cell87.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new VerticalMerge() { Val = MergedCellValues.Continue },
                                                                      new GridSpan() { Val = 5 });
                    row25.Append(cell85, cell86, cell87);
                    table5.Append(row25);

                    // Crear la 3ra fila
                    DocumentFormat.OpenXml.Wordprocessing.TableRow row26 = new DocumentFormat.OpenXml.Wordprocessing.TableRow();
                    var cell88 = CreateCell("E-mail:", "S", "16","LEFT");
                    cell88.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 2 });

                    var cell89 = CreateCell(cotizacion.Result.DocumentoCabecera.EmailVendedor, "N", "16","LEFT");
                    cell89.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 3 });

                    var cell90 = CreateCell("", "N", "16","CENTER");
                    cell90.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 5 });
                    cell90.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new VerticalMerge() { Val = MergedCellValues.Continue },
                                                                      new GridSpan() { Val = 5 });
                    row26.Append(cell88, cell89, cell90);
                    table5.Append(row26);

                    // Crear linea:
                    DocumentFormat.OpenXml.Wordprocessing.TableRow row27 = new DocumentFormat.OpenXml.Wordprocessing.TableRow();
                    var cell91 = CreateCell("", "N", "16","CENTER");
                    cell91.TableCellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(new GridSpan() { Val = 10 });
                    row27.Append(cell91);
                    table5.Append(row27);

                    // Añadir la tabla al cuerpo del documento
                    mainPart.Document.Body.AppendChild(table5);

                    #endregion

                    // Guarda los cambios en el documento
                    mainPart.Document.Save();
                }

                // Convertir el contenido del MemoryStream a un array de bytes
                byte[] byteArray = memoryStream.ToArray();

                // Codificar los bytes en base64 para poder enviarlos en el JSON
                string base64File = Convert.ToBase64String(byteArray);

                // Devolvemos un JsonResult con el archivo en base64
                return Json(new
                {
                    Status = 1,
                    Archivo = base64File,
                    Nombre = nombre
                });
            }



        }








        // Función para crear una celda con contenido de texto
        static DocumentFormat.OpenXml.Wordprocessing.TableCell CreateCell(string text, string negrita, string sizeText,string alineacion)
        {

            var cell = new DocumentFormat.OpenXml.Wordprocessing.TableCell();
            
            var para = new DocumentFormat.OpenXml.Wordprocessing.Paragraph();

            var runProperties = new DocumentFormat.OpenXml.Wordprocessing.RunProperties();
            // Crea un párrafo en la celda
            string[] lineas = text.Split(new[] { "\\r\\n" }, StringSplitOptions.None);
            foreach (var linea in lineas)
            {
                // Establecer las propiedades de estilo (fuente, tamaño, negrita)
                if (negrita == "S")
                {
                    runProperties = new DocumentFormat.OpenXml.Wordprocessing.RunProperties(
                                        new DocumentFormat.OpenXml.Wordprocessing.RunFonts() { Ascii = "Calibri" }, // Fuente Calibri
                                        new DocumentFormat.OpenXml.Wordprocessing.FontSize() { Val = sizeText }, // 8 puntos (16 unidades de medio punto)
                                        new DocumentFormat.OpenXml.Wordprocessing.Bold() // Texto en negrita
);
                }
                else
                {
                    runProperties = new DocumentFormat.OpenXml.Wordprocessing.RunProperties(
                                             new RunFonts() { Ascii = "Calibri" }, // Fuente Calibri
                                             new DocumentFormat.OpenXml.Wordprocessing.FontSize() { Val = sizeText } // 8 puntos (16 unidades de medio punto)
                            );
                }

                // Crea un run para cada línea de texto
                var run = new DocumentFormat.OpenXml.Wordprocessing.Run(runProperties);
                run.Append(new DocumentFormat.OpenXml.Wordprocessing.Text(linea)); // Añade la línea de texto

                if(alineacion == "CENTER")
                {
                    var paraProperties = new DocumentFormat.OpenXml.Wordprocessing.ParagraphProperties(
                        new DocumentFormat.OpenXml.Wordprocessing.Justification() { Val = DocumentFormat.OpenXml.Wordprocessing.JustificationValues.Center } // Alineación al centro
                    );
                    para.Append(paraProperties);
                }
                else if (alineacion == "RIGHT")
                {
                    var paraProperties = new DocumentFormat.OpenXml.Wordprocessing.ParagraphProperties(
                        new DocumentFormat.OpenXml.Wordprocessing.Justification() { Val = DocumentFormat.OpenXml.Wordprocessing.JustificationValues.Right } // Alineación a la derecha
                    );
                    para.Append(paraProperties);
                }
                else if (alineacion == "LEFT")
                {
                    var paraProperties = new DocumentFormat.OpenXml.Wordprocessing.ParagraphProperties(
                        new DocumentFormat.OpenXml.Wordprocessing.Justification() { Val = DocumentFormat.OpenXml.Wordprocessing.JustificationValues.Left } // Alineación a la izquierda
                    );
                    para.Append(paraProperties);
                }

                para.Append(run);

                // Si no es la última línea, agrega un salto de línea
                if (linea != lineas[lineas.Length - 1])
                {
                    para.Append(new DocumentFormat.OpenXml.Wordprocessing.Break());  // Agrega un salto de línea
                }
            }

           

            //run.Append(textCell);
            //para.Append(run);
           
            cell.Append(para);
            return cell;
        }

        static void CellWith(DocumentFormat.OpenXml.Wordprocessing.TableCell celda, string width)
        {
            decimal width_dxa = Convert.ToDecimal(width) * 567;
            // Establece las propiedades de la celda, como el ancho
            var cellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties();
            var cellWidth = new TableWidth() { Type = TableWidthUnitValues.Dxa, Width = width_dxa.ToString() }; // 4000 Dxa es el valor del ancho de la celda
            cellProperties.Append(cellWidth);
            // Aplicar las propiedades de la celda a la celda
            celda.Append(cellProperties);
        }

        static void CellBorder(DocumentFormat.OpenXml.Wordprocessing.TableCell celda, UInt32 top, UInt32 bottom, UInt32 left, UInt32 right, string color)
        { 
            // Establecer los bordes de la celda
            var cellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties();
            var cellBorders = new DocumentFormat.OpenXml.Wordprocessing.TableCellBorders(
                new DocumentFormat.OpenXml.Wordprocessing.TopBorder() { Val = BorderValues.Single, Size = top, Space = 0, Color = color }, // Borde superior
                new DocumentFormat.OpenXml.Wordprocessing.BottomBorder() { Val = BorderValues.Single, Size = bottom, Space = 0, Color = color }, // Borde inferior
                new DocumentFormat.OpenXml.Wordprocessing.LeftBorder() { Val = BorderValues.Single, Size = left, Space = 0, Color = color },  // Borde izquierdo
                new DocumentFormat.OpenXml.Wordprocessing.RightBorder() { Val = BorderValues.Single, Size = right, Space = 0, Color = color }   // Borde derecho
            );

            // Agregar los bordes a las propiedades de la celda
            cellProperties.Append(cellBorders);

            // Aplicar las propiedades de la celda a la celda
            celda.Append(cellProperties);
        }
        
        static void CellBackground(DocumentFormat.OpenXml.Wordprocessing.TableCell celda, string codigoColor)
        {
            var cellProperties = new DocumentFormat.OpenXml.Wordprocessing.TableCellProperties(
              new Shading() { Fill = codigoColor } // Color (hexadecimal)
             );
            celda.Append(cellProperties);
        }

        public FileResult ExportarFile(string nombreDoc)
        {
            string url = ConfigurationManager.AppSettings.Get("RutaCotizacionVenta");
            string ruta = url + nombreDoc;

            var fileName = System.IO.Path.GetFileName(nombreDoc);
            var contentType = MimeMapping.GetMimeMapping(fileName); //determina el tipo de documento que se envía. 

            return File(ruta, contentType, nombreDoc);
        }

        public FileResult ExportarFileGuiaPedido(string nombreDoc)
        {
            string url = ConfigurationManager.AppSettings.Get("RutaVentaGP");
            string ruta = url + nombreDoc;

            var fileName = System.IO.Path.GetFileName(nombreDoc);
            var contentType = MimeMapping.GetMimeMapping(fileName); //determina el tipo de documento que se envía. 

            return File(ruta, contentType, nombreDoc);
        }

        public FileResult ExportarFileGuiaBO(string nombreDoc)
        {
            string url = ConfigurationManager.AppSettings.Get("RutaVentaBO");
            string ruta = url + nombreDoc;

            var fileName = System.IO.Path.GetFileName(nombreDoc);
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
        public JsonResult ExportarDocumentosVentas(string tipo, long codSolicitud, string stock)
        {
            var ventasBL = new VentasBL();
            var datosGuia = ventasBL.ConsultaGuia(codSolicitud,tipo, stock).Result;

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
            style2.VerticalAlignment = VerticalAlignment.Center;

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

            var style10 = hssfworkbook.CreateCellStyle();
            style10.SetFont(fontbold5);
            style10.BorderBottom = NPOI.SS.UserModel.BorderStyle.Thin;
            style10.BorderTop = NPOI.SS.UserModel.BorderStyle.Thin;
            style10.BorderRight = NPOI.SS.UserModel.BorderStyle.Thin;
            style10.BorderLeft = NPOI.SS.UserModel.BorderStyle.Thin;
            style10.Alignment = HorizontalAlignment.Center;
            style10.VerticalAlignment = VerticalAlignment.Center;
            style10.WrapText = true;

            var style11 = hssfworkbook.CreateCellStyle();
            style11.SetFont(fontbold5);
            style11.BorderBottom = NPOI.SS.UserModel.BorderStyle.Thin;
            style11.BorderTop = NPOI.SS.UserModel.BorderStyle.Thin;
            style11.BorderRight = NPOI.SS.UserModel.BorderStyle.Thin;
            style11.BorderLeft = NPOI.SS.UserModel.BorderStyle.Thin;
            style11.Alignment = HorizontalAlignment.Center;
            style11.VerticalAlignment = VerticalAlignment.Top;

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
                pictureIndex = hssfworkbook.AddPicture(ReadFully(fs2), NPOI.SS.UserModel.PictureType.PNG);
            }

            // Crear un objeto de dibujo
            IDrawing drawing = sh.CreateDrawingPatriarch();

            // Crear un ancla para la imagen
            IClientAnchor anchor = drawing.CreateAnchor(0, 0, 0, 0, 0, 0, 5, 3); // (col1, row1, col2, row2)

            // Insertar la imagen en la celda
            drawing.CreatePicture(anchor, pictureIndex);

            cell = row.CreateCell(cellnum++);
            cell.CellStyle = style;
            //cell.SetCellValue("LOGO");


            #region Cabecera:

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
            #endregion

            //detalle:
            #region Cabecera Detalle
            int rownum2 = 10;
            row = sh.CreateRow(rownum2++);

            cell = row.CreateCell(0);
            cell.CellStyle = style10;
            cell.SetCellValue("Descargado");


            cell = row.CreateCell(1);
            cell.CellStyle = style10;
            cell.SetCellValue("Pendiente");

            cell = row.CreateCell(2);
            cell.CellStyle = style10;
            cell.SetCellValue("Cantidad");

            cell = row.CreateCell(3);
            cell.CellStyle = style10;
            cell.SetCellValue("Unidad");

            cell = row.CreateCell(4);
            cell.CellStyle = style10;
            cell.SetCellValue("N° de Catálogo");

            cell = row.CreateCell(5);
            cell.CellStyle = style10;
            cell.SetCellValue("DESCRIPCION");

            cell = row.CreateCell(6);
            cell.CellStyle = style10;

            cell = row.CreateCell(7);
            cell.CellStyle = style10;

            cell = row.CreateCell(8);
            cell.CellStyle = style10;

            cell = row.CreateCell(9);
            cell.CellStyle = style10;

            cell = row.CreateCell(10);
            cell.CellStyle = style10;

            cell = row.CreateCell(11);
            cell.CellStyle = style10;

            cell = row.CreateCell(12);
            cell.CellStyle = style10;
            cell.SetCellValue("Valor Unit. De Venta");

            cell = row.CreateCell(13);
            cell.CellStyle = style10;
            cell.SetCellValue("Total Valor de Venta");

            cell = row.CreateCell(14);
            cell.CellStyle = style10;
            cell.SetCellValue("Precio Kardex");

            cell = row.CreateCell(15);
            cell.CellStyle = style10;
            cell.SetCellValue("Total Kardex");

            cell = row.CreateCell(16);
            cell.CellStyle = style10;
            cell.SetCellValue("Unidades Entregadas");

            cell = row.CreateCell(17);
            cell.CellStyle = style10;
            cell.SetCellValue("Unidad Precio Costo");

            cell = row.CreateCell(18);
            cell.CellStyle = style10;
            cell.SetCellValue("Extensión Precio Costo");

            #endregion

            #region detalle de guia:
            foreach (var det in datosGuia.GuiaDetalle)
            {
                var fila = rownum2++;
                row = sh.CreateRow(fila);

                sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(fila, fila, 5, 11));

                cell = row.CreateCell(0);
                cell.CellStyle = style5;

                cell = row.CreateCell(1);
                cell.CellStyle = style5;

                cell = row.CreateCell(2);
                cell.CellStyle = style5;
                cell.SetCellValue(det.Cantidad);

                cell = row.CreateCell(3);
                cell.CellStyle = style5;
                cell.SetCellValue(det.Unidad);

                cell = row.CreateCell(4);
                cell.CellStyle = style5;
                cell.SetCellValue(det.Catalogo);

                cell = row.CreateCell(5);
                cell.CellStyle = style5;
                cell.SetCellValue(det.Descripcion);

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
                cell.SetCellValue(det.PrecioUnitario);

                cell = row.CreateCell(13);
                cell.CellStyle = style5;
                cell.SetCellValue(det.Total);

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
            }
            #endregion

            #region SubTotal:
            var fila1 = rownum2++;
            row = sh.CreateRow(fila1);
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(fila1, fila1, 5, 11));

            var str_sub = datosGuia.GuiaCabecera.Moneda + " SUBTOTAL:";

            cell = row.CreateCell(5);
            cell.CellStyle = style6;
            cell.SetCellValue(str_sub);

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
            cell.SetCellValue(datosGuia.GuiaCabecera.Subtotal);

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

            #endregion

            #region IGV:
            var fila2 = rownum2++;
            row = sh.CreateRow(fila2);
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(fila2, fila2, 5, 11));

            var str_igv = datosGuia.GuiaCabecera.Moneda + " IGV 18%:";

            cell = row.CreateCell(5);
            cell.CellStyle = style6;
            cell.SetCellValue(str_igv);

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
            cell.SetCellValue(datosGuia.GuiaCabecera.Igv);

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

            #endregion

            #region Total:
            var fila3 = rownum2++;
            row = sh.CreateRow(fila3);
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(fila3, fila3, 5, 11));

            var str_total = datosGuia.GuiaCabecera.Moneda + " TOTAL:";

            cell = row.CreateCell(5);
            cell.CellStyle = style6;
            cell.SetCellValue(str_total);

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
            cell.SetCellValue(datosGuia.GuiaCabecera.Total);

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

            #endregion

            #region Observacion:
            var fila4 = rownum2++;
            row = sh.CreateRow(fila4);

            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(fila4, fila4, 0, 2));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(fila4, fila4, 3, 12));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(fila4, fila4, 16, 17));

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

            #endregion

            #region Empaquetado_x
            var fila5 = rownum2++;
            row = sh.CreateRow(fila5);

            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(fila5, fila5, 0, 2));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(fila5, fila5, 3, 4));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(fila5, fila5, 5, 6));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(fila5, fila5, 7, 10));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(fila5, fila5, 11, 12));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(fila5, fila5, 13, 14));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(fila5, fila5, 15, 18));

            cell = row.CreateCell(0);
            row.Height = 30 * 20;
            cell.CellStyle = style11;
            cell.SetCellValue("EMPAQUETADO X");

            cell = row.CreateCell(1);
            cell.CellStyle = style11;

            cell = row.CreateCell(2);
            cell.CellStyle = style11;

            cell = row.CreateCell(3);
            cell.CellStyle = style11;
            cell.SetCellValue("FACTURADO X");

            cell = row.CreateCell(4);
            cell.CellStyle = style11;

            cell = row.CreateCell(5);
            cell.CellStyle = style11;
            cell.SetCellValue("N° DE FACTURA");
            cell = row.CreateCell(6);
            cell.CellStyle = style11;

            cell = row.CreateCell(7);
            cell.CellStyle = style11;
            cell.SetCellValue("ENTREGADO POR");

            cell = row.CreateCell(8);
            cell.CellStyle = style11;
            cell = row.CreateCell(9);
            cell.CellStyle = style11;
            cell = row.CreateCell(10);
            cell.CellStyle = style11;

            cell = row.CreateCell(11);
            cell.CellStyle = style11;
            cell.SetCellValue("N° DE CAJAS");
            cell = row.CreateCell(12);
            cell.CellStyle = style9;

            cell = row.CreateCell(13);
            cell.CellStyle = style11;
            cell.SetCellValue("GUIA FLETADOR");

            cell = row.CreateCell(14);
            cell.CellStyle = style11;

            cell = row.CreateCell(15);
            cell.CellStyle = style8;

            cell = row.CreateCell(16);
            cell.CellStyle = style8;

            cell = row.CreateCell(17);
            cell.CellStyle = style8;

            cell = row.CreateCell(18);
            cell.CellStyle = style8;

            #endregion

            #region EsConforme
            var fila6 = rownum2++;
            row = sh.CreateRow(fila6);

            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(fila6, fila6, 0, 3));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(fila6, fila6, 4, 6));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(fila6, fila6, 7, 9));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(fila6, fila6, 10, 12));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(fila6, fila6, 13, 14));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(fila6, fila6+1, 15, 18));

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

            #endregion

            #region Firma
            var fila7 = rownum2++;
            row = sh.CreateRow(fila7);

            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(fila7, fila7, 0, 3));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(fila7, fila7, 4, 6));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(fila7, fila7, 7, 9));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(fila7, fila7, 10, 12));
            sh.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(fila7, fila7, 13, 14));

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

            #endregion

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

                //Se actualiza el log de generación de guia:
                DatosDespachoDTO datosDespachoDTO = new DatosDespachoDTO();
                if(tipo == "GP")
                {
                    datosDespachoDTO.Tipo = "G";
                }
                else if(tipo == "BO")
                {
                    datosDespachoDTO.Tipo = "B";
                }
                datosDespachoDTO.CodigoSolicitud = codSolicitud;
                datosDespachoDTO.Stock = stock;
                datosDespachoDTO.UsuarioRegistro = User.ObtenerUsuario();
                datosDespachoDTO.NombrePerfil = User.ObtenerPerfil();
                var envio_log = ventasBL.MantenimientoDespacho(datosDespachoDTO);

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