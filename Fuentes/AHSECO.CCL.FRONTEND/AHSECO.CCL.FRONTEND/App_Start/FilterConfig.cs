using System.Web;
using System.Web.Mvc;

namespace AHSECO.CCL.FRONTEND
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
            filters.Add(new AHSECO.CCL.FRONTEND.Core.CustomAuthorizeAttribute());
        }
    }
}
