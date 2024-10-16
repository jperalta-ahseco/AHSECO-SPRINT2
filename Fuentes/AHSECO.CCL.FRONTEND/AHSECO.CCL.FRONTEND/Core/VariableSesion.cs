using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using AHSECO.CCL.FRONTEND;
using AHSECO.CCL.FRONTEND.Core;
using AHSECO.CCL.FRONTEND.Core.Identity;
using AHSECO.CCL.FRONTEND.Models;

namespace AHSECO.CCL.FRONTEND.Core
{
    public class VariableSesion
    {
        public static String getUsuario()
        {
            Object usuario = System.Web.HttpContext.Current.Session["UserName"];
            return (string)usuario;
        }

        public static void setUsuario(string userName)
        {
            System.Web.HttpContext.Current.Session["UserName"] = userName;
        }

        public static String getNombreUsuario()
        {
            Object usuario = System.Web.HttpContext.Current.Session["nombreUsuario"];

            return (string)usuario;
        }

        public static void setNombreUsuario(string nombreUsuario)
        {
            System.Web.HttpContext.Current.Session["nombreUsuario"] = nombreUsuario;
        }
        public static String getRol(string userName)
        {
            Object rol = System.Web.HttpContext.Current.Session["ROL_" + userName];

            return (string)rol;
        }

        public static void setRol(string userName, string rol)
        {
            System.Web.HttpContext.Current.Session["ROL_" + userName] = rol;
        }

        public static String getEmpLogeado()
        {
            Object logeado = System.Web.HttpContext.Current.Session["CodEmpLogueado"];
            return (string)logeado;
        }

        public static void setEmpLogeado(string codLogeado)
        {
            System.Web.HttpContext.Current.Session["CodEmpLogueado"] = codLogeado;
        }

        public static string getMensajeLogueo()
        {
            return (string)System.Web.HttpContext.Current.Session["MsjLogueo"];
        }

        public static void setMensajeLogueo(string mensaje)
        {
            System.Web.HttpContext.Current.Session["MsjLogueo"] = mensaje;
        }

        public static string getEstadoUsuario()
        {
            return (string)System.Web.HttpContext.Current.Session["EstadoUsuario"];
        }

        public static void setEstadoUsuario(string estadoUsuario)
        {
            System.Web.HttpContext.Current.Session["EstadoUsuario"] = estadoUsuario;
        }


        public static void setLista(List<SelectListItem> lista, string codLista)
        {

            System.Web.HttpContext.Current.Session[codLista] = lista;
        }

        public static List<SelectListItem> getLista(string codLista)
        {
            Object lista = System.Web.HttpContext.Current.Session[codLista];
            return (List<SelectListItem>)lista;
        }

        public static String getUrlInicio()
        {
            Object urlInicio = System.Web.HttpContext.Current.Session["urlInicio"];
            return (string)urlInicio;
        }

        public static void setUrlInicio(string urlInicio)
        {
            System.Web.HttpContext.Current.Session["urlInicio"] = urlInicio;
        }

        public static void setCadena(string key, string cadena)
        {
            System.Web.HttpContext.Current.Session[key] = cadena;
        }

        public static string getCadena(string key)
        {
            Object valor = System.Web.HttpContext.Current.Session[key];
            return (string)valor;
        }

        public static void setObject(string key, Object value)
        {
            System.Web.HttpContext.Current.Session[key] = value;
        }

        public static Object getObject(string key)
        {
            Object value = System.Web.HttpContext.Current.Session[key];
            return value;
        }

        public static void removeObject(string key)
        {
            System.Web.HttpContext.Current.Session.Remove(key);            
        }

        public static void setListaCadena(List<String> lista, string codLista)
        {

            System.Web.HttpContext.Current.Session[codLista] = lista;
        }

        public static List<String> getListaCadena(string codLista)
        {
            Object lista = System.Web.HttpContext.Current.Session[codLista];
            return (List<String>)lista;
        }


        public static void setListaPermisos(List<PermisosModel> lista, string codLista)
        {

            System.Web.HttpContext.Current.Session[codLista] = lista;
        }

        public static List<PermisosModel> getListaPermisos(string codLista)
        {
            Object lista = System.Web.HttpContext.Current.Session[codLista];
            return (List<PermisosModel>)lista;
        }

        public static string getMenu()
        {
            var valor = System.Web.HttpContext.Current.Session["Menus"];

            if (valor == null || (string)valor == "")
            {
                System.Web.HttpContext.Current.Response.Redirect("~/Account/Logout", false);
            }
            return (string)valor;
        }
    }
}