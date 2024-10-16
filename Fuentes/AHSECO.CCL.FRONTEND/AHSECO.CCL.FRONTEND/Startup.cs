using Microsoft.Owin;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;


[assembly: OwinStartup(typeof(AHSECO.CCL.FRONTEND.Startup))]

namespace AHSECO.CCL.FRONTEND
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
