using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Configuration;
using System.Net;
using System.Web.Script.Serialization;
using AHSECO.CCL.COMUN;
namespace AHSECO.CCL.BD
{
    public class ConnectionManager
    {
        public static string GetConnectionStringAhseco()
        {
            CCLog log = new CCLog();
            log.TraceInfo(Utilidades.GetCaller() + "::Inicio Obtener cadena de conexión");

            try
            {
                return ConfigurationManager.ConnectionStrings["AhsecoConnection"].ConnectionString;                
            }
            catch (Exception ex)
            {
                log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                throw;
            }
        }

        public static string GetConnectionPostgresSQLStringAhseco()
        {
            CCLog log = new CCLog();
            log.TraceInfo(Utilidades.GetCaller() + "::Inicio Obtener cadena de conexión");

            try
            {
                return ConfigurationManager.ConnectionStrings["AhsecoConnectionPostgresSQL"].ConnectionString;
            }
            catch (Exception ex)
            {
                log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                throw;
            }
        }


    }
}
