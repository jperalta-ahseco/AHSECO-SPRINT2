using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AHSECO.CCL.FRONTEND.Core;

namespace PF.Nsga.Web.Security
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AjaxAuthorizeAttribute : AuthorizeAttribute
    {
        public string Permissions { get; set; }
        
        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            base.OnAuthorization(filterContext);
            OnAuthorizationHelp(filterContext);
        }

        internal void OnAuthorizationHelp(AuthorizationContext filterContext)
        {

            if (filterContext.Result is HttpUnauthorizedResult)
            {
                if (filterContext.HttpContext.Request.IsAjaxRequest())
                {
                    filterContext.HttpContext.Response.StatusCode = 401;
                    filterContext.HttpContext.Response.End();
                }
            }
        }

        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            bool isUserAuthorized = base.AuthorizeCore(httpContext);

            if (isUserAuthorized)
            {
                List<string> lstPermissions = Permissions.Split(',').ToList();
                var lista = VariableSesion.getListaPermisos("listaPermisos");

                if (lista != null && lista.Count > 0)
                {
                    var listaActions = lista.Select(x => x.Action);
                    if (listaActions.Intersect(lstPermissions).Any())
                    {
                        return true;
                    }
                }

                return false;
            }
            else
            {
                return false;
            }

        }


    }
}