using AHSECO.CCL.COMUN;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Linq;
using System.Web;

namespace AHSECO.CCL.FRONTEND.Reporte
{
    public class ReporteConexion
    {

        //public static CrystalDecisions.Shared.ConnectionInfo getConexion()
        //{

        //    var strcon = new System.Data.SqlClient.SqlConnectionStringBuilder(ConfigurationManager.ConnectionStrings["AhsecoConnection"].ConnectionString);

        //    CrystalDecisions.Shared.ConnectionInfo infocon = new CrystalDecisions.Shared.ConnectionInfo();

        //    infocon.ServerName = strcon.DataSource;
        //    infocon.DatabaseName = strcon.InitialCatalog;
        //    infocon.IntegratedSecurity = strcon.IntegratedSecurity;

        //    return infocon;
        //}

        public static string getConnection()
        {
            return ConfigurationManager.ConnectionStrings["AhsecoConnection"].ConnectionString.ToString();

        }

        

    }
}