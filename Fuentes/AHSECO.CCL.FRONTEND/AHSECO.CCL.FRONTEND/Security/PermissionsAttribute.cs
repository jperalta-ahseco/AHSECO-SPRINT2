using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Web;
using System.Web.Mvc;
using AHSECO.CCL.FRONTEND.Core;

namespace AHSECO.CCL.FRONTEND.Security
{
    
    /// <summary>
    /// Custom authorization attribute for setting per-method accessibility 
    /// </summary>
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public class PermissionsAttribute : AuthorizeAttribute
    {
        /// <summary>
        /// El nombre de cada acción que será permitido por este método, separados por coma.
        /// </summary>
        public string Permissions { get; set; }

        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            bool isUserAuthorized = base.AuthorizeCore(httpContext);

            if (isUserAuthorized)
            {
                if (Permissions == null) return true;
                List<string> lstPermissions = Permissions.Split(',').ToList();
                var lista = VariableSesion.getListaPermisos("listaPermisos");
            
                if (lista!=null && lista.Count>0)
                {
                    var listaActions = lista.Select(x => x.Action);
                    var listaNames = lista.Select(x => x.Name);

                    if (listaActions.Intersect(lstPermissions, StringComparer.OrdinalIgnoreCase).Any() || listaNames.Intersect(lstPermissions, StringComparer.OrdinalIgnoreCase).Any())
                    {
                        VariableSesion.setCadena("Permision", "true");
                        return true;
                    }
                }

                if (httpContext.Request.IsAjaxRequest())
                {
                    httpContext.Response.StatusCode = 401;
                    httpContext.Response.End();
                    VariableSesion.setCadena("Permision", "");
                    return false;
                }
                else
                {
                    VariableSesion.setCadena("Permision", "");
                    return false;
                }
            }
            else
            {
                VariableSesion.setCadena("Permision", "");
                return false;
            }

        }
    }
}
