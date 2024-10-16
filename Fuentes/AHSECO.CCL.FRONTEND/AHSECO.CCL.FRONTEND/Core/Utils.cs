using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AHSECO.CCL.FRONTEND.Models;
using AHSECO.CCL.BL;
using AHSECO.CCL.BE;
using AHSECO.CCL.COMUN;
using System.Text;

namespace AHSECO.CCL.FRONTEND.Core
{
    public static class Utils
    {
        public static IEnumerable<TSource> DistinctBy<TSource, TKey>
    (this IEnumerable<TSource> source, Func<TSource, TKey> keySelector)
        {
            HashSet<TKey> seenKeys = new HashSet<TKey>();
            foreach (TSource element in source)
            {
                if (seenKeys.Add(keySelector(element)))
                {
                    yield return element;
                }
            }
        }
        
        public static List<SelectListItem> generarCombos(ItemModel[] datos)
        {

            List<SelectListItem> items = new List<SelectListItem>();
            items.Add(new SelectListItem { Text = "<-Seleccione->", Value = "" });

            for (int i = 0; i < datos.Count(); i++)
            { items.Add(new SelectListItem { Text = datos[i].Descripcion, Value = datos[i].Codigo }); }



            return items;
        }

        public static dynamic GeneraCombo(string dominio)
        {
            var datosGeneralesBL = new DatosGeneralesBL();
            var datosGeneralesDetalleDTO = new DatosGeneralesDetalleDTO()
            {
                DatosGenerales = new DatosGeneralesDTO
                {
                    Dominio = dominio
                }
            };
            var result = datosGeneralesBL.Obtener(datosGeneralesDetalleDTO);

            dynamic data = null;

            if (result.Status == COMUN.ResponseStatusDTO.Success)
            {
                data = result.Result.Select(x => new
                {
                    Id = x.Parametro,
                    Text = x.Descripcion
                });
            }
            var json = new
            {
                Status = result.Status,
                CurrentException = result.CurrentException,
                Result = data
            };

            return json;
        }

        public static int CalculateAge(DateTime birthDate, DateTime now)
        {
            int age = now.Year - birthDate.Year;

            if (now.Month < birthDate.Month || (now.Month == birthDate.Month && now.Day < birthDate.Day))
                age--;

            return age;
        }

        public static int CalculateMonth(DateTime birthDate, DateTime now)
        {
            int meses = now.Month - birthDate.Month;

            if (now.Day < birthDate.Day)
                meses--;

            if (meses < 0)
                meses = 12 + meses;

            return meses;
        }

        public static int CalculateDay(DateTime birthDate, DateTime now)
        {
            int dias = now.Day - birthDate.Day;

            if (dias < 0)
                dias = 30 + dias;

            return dias;
        }

        public static bool In<T>(this T item, params T[] items)
        {
            if (items == null)
                throw new ArgumentNullException("items");

            return items.Contains(item);
        }

        public static List<TreeMenuDTO> ConstruirArbolOpciones(IEnumerable<OpcionDTO> opciones)
        {
            // Creamos la opción raiz
            var opcionRaiz = new OpcionDTO
            {
                Id = 0,
                Nombre = NombreAplicacion,
                Descripcion = NombreAplicacion,
                Tipo = "M"
            };
            // Creamos el nodo raiz
            var nodoRaiz = new List<TreeMenuDTO>
            {
                new TreeMenuDTO()
                {
                    id = opcionRaiz.Id.ToString(),
                    text = opcionRaiz.Nombre,
                    state = new StateTreeMenuDTO(),
                    opcion = opcionRaiz,
                    children = ConstrutirOpcion(opcionRaiz, opciones.ToList())
                }
            };
            return nodoRaiz;
        }

        private static List<TreeMenuDTO> ConstrutirOpcion(OpcionDTO opcionActual, List<OpcionDTO> listaOpciones)
        {
            var nodos = new List<TreeMenuDTO>();
            var nodosHijos = listaOpciones.Where(x => x.Padre.Id == opcionActual.Id).ToList();

            listaOpciones = listaOpciones.Except(nodosHijos).ToList();

            foreach (var item in nodosHijos)
            {
                var nodo = new TreeMenuDTO
                {
                    id = item.Id.ToString(),
                    text = item.Nombre,
                    children = ConstrutirOpcion(item, listaOpciones),
                    state = new StateTreeMenuDTO
                    {
                        disabled = item.Habilitado.Equals("0"),
                        selected = item.Seleccionado
                    },
                    opcion = item
                };

                nodos.Add(nodo);
            }
            return nodos;
        }

        public static string UriBase
        {
            get
            {
                return VirtualPathUtility.ToAbsolute("~/");
            }
        }

        public static int TiempoSesion
        {
            get
            {
                return Convert.ToInt32(Utilidades.ObtenerValorConfig("TiempoSesion") ?? "5");
            }
        }

        public static string NombreAplicacion
        {
            get
            {
                return Utilidades.ObtenerValorConfig("NombreAplicacion") ?? "AHSECO";
            }
        }

        public static string ConstruirMenu(List<OpcionDTO> opciones)
        {
            // Creamos la opción raiz
            var sb = new StringBuilder();
            sb.Append("<ul class=\"nav nav-pills nav-stacked main-menu\" style=\"display: block;\">");
            sb.Append("<li class=\"accordion\">");
            sb.Append("<a href=\"#\" class=\"nav-pills nav-stacked\"><i class=\"glyphicon glyphicon-globe\"></i><span> &nbsp;" + Utils.NombreAplicacion +"</span></a>");
            sb.Append("<ul class=\"nav nav-pills nav-stacked\" style=\"display: block; \">");

            // Creamos la opción raiz
            var opcionRaiz = new OpcionDTO
            {
                Id = 0,
                Nombre = NombreAplicacion,
                Descripcion = NombreAplicacion,
                Tipo = "M"
            };

            sb.Append(ConstrutirMenuItems(opcionRaiz, opciones));

            sb.Append("</ul>");
            sb.Append("</li>");
            sb.Append("</ul>");
            return sb.ToString();
        }

        private static string ConstrutirMenuItems(OpcionDTO opcionActual, List<OpcionDTO> listaOpciones)
        {
            var nodos = new List<TreeMenuDTO>();
            var sb = new StringBuilder();
            var nodosHijos = listaOpciones.Where(x => x.Padre.Id == opcionActual.Id).ToList();

            listaOpciones = listaOpciones.Except(nodosHijos).ToList();

            foreach (var item in nodosHijos)
            {
                nodosHijos = listaOpciones.Where(x => x.Padre.Id == item.Id).ToList();

                if (!nodosHijos.Any())
                {
                    sb.Append("<li><a class=\"ajax-link\" href=\"" + item.Url + "\"><i class=\""+item.Icono+"\"></i><span> " + item.Nombre + "</span></a></li>");

                     
                }
                else
                {
                    sb.Append("<li class=\"accordion\">");
                    sb.Append("<a class=\"nav-pills nav-stacked\" href=\"#\"><i class=\""+item.Icono+"\"></i><span> " + item.Nombre + "</span></a>");
                    sb.Append("<ul class=\"nav nav-pills nav-stacked\" style=\"display: none;\" >");
                    sb.Append(ConstrutirMenuItems(item, listaOpciones));
                    sb.Append("</ul>");
                    sb.Append("</li>");
                }
            }
            return sb.ToString();
        }
    }
}