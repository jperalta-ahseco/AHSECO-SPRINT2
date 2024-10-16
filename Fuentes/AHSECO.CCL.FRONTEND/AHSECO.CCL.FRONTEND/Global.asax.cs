using AHSECO.CCL.COMUN;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace AHSECO.CCL.FRONTEND
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        private CCLog Log;
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            
        }

        protected void Application_Error()
        {
            var ex = Server.GetLastError();
            Log = new CCLog();
            Log.TraceError(ex.Message);
            Server.ClearError();
            Response.Clear();
            Response.Redirect("~/Error/Index");
        }
    }
}