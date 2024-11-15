using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Diagnostics;
using System.IO;
using System.Net.Mail;
using System.Net.Mime;
using System.Net;

namespace AHSECO.CCL.COMUN
{
    public static class Utilidades
    {
        public static string ObtenerBody(string customerName, string contractNum)
        {
            var resp = "";
            resp = customerName.ToUpper().Trim() + ", The contract Nº. " + contractNum + ", please review it.";

            return resp;

        }

        public static string Send(string CorreoTo, string CorreoToCC, string CorreoToBCC, string CorreoSubject, string CorreoBody, List<string> AtachDocuments, string AtachDocuments2, string cid = "")
        {
            try
            {

                //Se construye el correo:
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient();
                SmtpServer.Port = Convert.ToInt32(Utilidades.ObtenerValorConfig("CONFIG_SERVER_MAIL_PORT"));
                SmtpServer.Host = Utilidades.ObtenerValorConfig("SMTP");
                SmtpServer.UseDefaultCredentials = Utilidades.ObtenerValorConfig("CONFIG_SERVER_MAIL_CREDENTIALS") == "true" ? true : false;
                SmtpServer.EnableSsl = Utilidades.ObtenerValorConfig("CONFIG_SERVER_SSL") == "true" ? true : false;

                /*
                Configuracion Servidor
                */
                SmtpServer.DeliveryMethod = SmtpDeliveryMethod.Network;
                SmtpServer.Credentials = new NetworkCredential(Utilidades.ObtenerValorConfig("UsernameEmail"), Utilidades.ObtenerValorConfig("Key"));
                if (AtachDocuments != null)
                {
                    //var sourcePath = Utilidades.ObtenerValorConfig("CONFIG_SERVER_SOURCE_PATH_FILE") + AtachDocuments;
                    //DirectoryInfo dir = new DirectoryInfo(sourcePath);

                    //foreach (FileInfo file in dir.GetFiles())
                    //{
                    //    if (file.Exists)
                    //    {
                    //        mail.Attachments.Add(new Attachment(file.FullName));
                    //    }
                    //}
                    foreach(var file in AtachDocuments)
                    {
                        if (File.Exists(file)) {
                            mail.Attachments.Add(new Attachment(file));
                        }      
                    }

                }
                //Para adjuntar rutas dinamicas:
                if (AtachDocuments2 != "")
                {
                    var sourcePath = AtachDocuments2;
                    DirectoryInfo dir = new DirectoryInfo(sourcePath);

                    foreach (FileInfo file in dir.GetFiles(Utilidades.ObtenerValorConfig("CONFIG_SERVER_MAIL_TYPEFILE")))// Tipo de archivos a Enviar 
                    {
                        if (file.Exists)
                        {
                            mail.Attachments.Add(new Attachment(file.FullName));
                        }
                    }
                }

                //From
                mail.From = new MailAddress(Utilidades.ObtenerValorConfig("EmailFrom")); //notificaciones.ahseco@gmail.com

                //To
                //mail.To.Add(CorreoTo);
                if (CorreoTo != null && CorreoTo.Length > 1)
                {
                    string[] EmailTOs = CorreoTo.Split(';');
                    foreach (string emailto in EmailTOs)
                    {
                        mail.To.Add(emailto);
                    }
                }

                //Bcc
                if(CorreoToBCC != null && CorreoToBCC.Length > 1)
                {
                    mail.Bcc.Add(new MailAddress(CorreoToBCC));
                }
                

                //Cc
                if (CorreoToCC != null && CorreoToCC.Length > 1)
                {
                    string[] EmailCCs = CorreoToCC.Split(';');
                    foreach (string email in EmailCCs)
                    {
                        mail.CC.Add(email);
                        mail.Bcc.Add(email);
                    }
                }

                if (cid != "")
                {

                    AlternateView htmlView =
                   AlternateView.CreateAlternateViewFromString(CorreoBody,
                                           Encoding.UTF8,
                                           MediaTypeNames.Text.Html);


                    LinkedResource img =
                        new LinkedResource(cid,
                                            MediaTypeNames.Image.Jpeg);
                    img.ContentId = "imagen";

                    htmlView.LinkedResources.Add(img);

                    //mail.AlternateViews.Add(plainView);
                    mail.AlternateViews.Add(htmlView);
                }
                else
                {
                    mail.Body = CorreoBody;
                    mail.IsBodyHtml = true;
                }
                mail.Subject = CorreoSubject;

                SmtpServer.Send(mail);
                return "OK";
            }
            catch (Exception ex)
            {
                var rta = ex.ToString();
                Console.Write(ex.ToString());
                return "error" + rta;
            }

        }

        public static string EnviarCorreo(string email, string body, string asunto, string cc)
        {
            try
            {

                /*-------------------------MENSAJE DE CORREO----------------------*/

                //Creamos un nuevo Objeto de mensaje
                System.Net.Mail.MailMessage mmsg = new System.Net.Mail.MailMessage();

                //Direccion de correo electronico a la que queremos enviar el mensaje
                mmsg.To.Add(email);

                //Direccion de correo electronico con copia del mensaje
                if (cc !=null && cc != "")
                {
                    mmsg.CC.Add(cc);
                }

                //Nota: La propiedad To es una colección que permite enviar el mensaje a más de un destinatario

                //Asunto
                mmsg.Subject = asunto;
                mmsg.SubjectEncoding = System.Text.Encoding.UTF8;


                //Cuerpo del Mensaje
                mmsg.Body = body;
                mmsg.BodyEncoding = System.Text.Encoding.UTF8;
                mmsg.IsBodyHtml = false; //Si no queremos que se envíe como HTML

                var emailfrom = Utilidades.ObtenerValorConfig("EmailFrom");
                var serversmtp = Utilidades.ObtenerValorConfig("SMTP");
                var usernameEnvio = Utilidades.ObtenerValorConfig("UsernameEmail");
                var usernameKey = Utilidades.ObtenerValorConfig("Key");

                //Correo electronico desde la que enviamos el mensaje
                mmsg.From = new System.Net.Mail.MailAddress(emailfrom);


                /*-------------------------CLIENTE DE CORREO----------------------*/

                //Creamos un objeto de cliente de correo
                System.Net.Mail.SmtpClient cliente = new System.Net.Mail.SmtpClient();

                //Hay que crear las credenciales del correo emisor
                cliente.Credentials =
                    new System.Net.NetworkCredential(usernameEnvio, usernameKey);

                //Lo siguiente es obligatorio si enviamos el mensaje desde Gmail
            
                cliente.Port = 587;
                cliente.EnableSsl = true;
              

                cliente.Host = serversmtp; //Para Gmail "smtp.gmail.com";


                /*-------------------------ENVIO DE CORREO----------------------*/


                //Enviamos el mensaje      
                cliente.Send(mmsg);
                return "OK";
            }
            catch (System.Net.Mail.SmtpException ex)
            {

                return ex.Message;
            }
        }


        public static string ObtenerScriptActivoOpcion(int IDOpcion)
        {
            var rpt = "";
            switch (IDOpcion)
            {
                case 1:
                    rpt = "<a href='/Security/UserRoles'  class='ModuloHomeLink'>Security </a>"; break;
                case 2:
                    rpt = "<a href='/Maintenance/ReasonOfLost' class='ModuloHomeLink'>Reason of Lost</a>"; break;
                case 3:
                    rpt = "<a href='/Maintenance/Status' class='ModuloHomeLink'>Status</a>"; break;

                case 4:
                    rpt = "<a href='/Maintenance/DocumentType' class='ModuloHomeLink'>Document Type</a>"; break;

                case 5:
                    rpt = "<a href='/Maintenance/ReasonNotParticipe' class='ModuloHomeLink'>Reason Not Participate</a>"; break;

                case 6:
                    rpt = "<a href='/Maintenance/Result' class='ModuloHomeLink'>Result</a>"; break;
                case 7:
                    rpt = "<a href='/Maintenance/SalesRepresentative' class='ModuloHomeLink'>Sales Representative</a>"; break;
                case 8:
                    rpt = "<a href='/Maintenance/ManagerGBU' class='ModuloHomeLink'>BU Manager</a>"; break;

                case 20:
                    rpt = "<a href='/Master/Master' class='ModuloHomeLink'>Item Master</a>"; break;
                case 21:
                    rpt = "<a href='/Master/Customer' class='ModuloHomeLink'>Customer</a>"; break;

                case 31:
                    rpt = "<a href='/Contract/New' class='ModuloHomeLink'>New Bids/Contract</a>"; break;
                case 32:
                    rpt = "<a href='/Contract/ProcessAlerts' class='ModuloHomeLink'>Process Alerts</a>"; break;

                case 41:
                    rpt = "<a href='/Report/New' class='ModuloHomeLink'>New Report/Contract</a>"; break;

            }

            return rpt;

        }

        public static string ObtenerScriptInactivoOpcion(int IDOpcion)
        {
            var rpt = "";
            switch (IDOpcion)
            {
                case 1:
                    rpt = "<a href='#' onclick='NoAccesos();'  class='ModuloHomeLinkNo'>Security </a>"; break;
                case 2:
                    rpt = "<a href='#' onclick='NoAccesos();' class='ModuloHomeLinkNo'>Reason of Lost</a>"; break;
                case 3:
                    rpt = "<a href='#' onclick='NoAccesos();' class='ModuloHomeLinkNo'>Status</a>"; break;

                case 4:
                    rpt = "<a href='#' onclick='NoAccesos();' class='ModuloHomeLinkNo'>Document Type</a>"; break;

                case 5:
                    rpt = "<a href='#' onclick='NoAccesos();' class='ModuloHomeLinkNo'>Reason Not Participe</a>"; break;

                case 6:
                    rpt = "<a href='#' onclick='NoAccesos();' class='ModuloHomeLinkNo'>Result</a>"; break;
                case 7:
                    rpt = "<a href='#' onclick='NoAccesos();' class='ModuloHomeLinkNo'>Sales Representative</a>"; break;
                case 8:
                    rpt = "<a href='#' onclick='NoAccesos();' class='ModuloHomeLinkNo'>Manager GBU</a>"; break;

                case 20:
                    rpt = "<a href='#' onclick='NoAccesos();' class='ModuloHomeLinkNo'>Item Master</a>"; break;
                case 21:
                    rpt = "<a href='#' onclick='NoAccesos();' class='ModuloHomeLinkNo'>Customer</a>"; break;

                case 31:
                    rpt = "<a href='#' onclick='NoAccesos();' class='ModuloHomeLinkNo'>New Bids/Contract</a>"; break;
                case 32:
                    rpt = "<a href='#' onclick='NoAccesos();' class='ModuloHomeLinkNo'>Process Alerts</a>"; break;

                case 41:
                    rpt = "<a href='#' onclick='NoAccesos();' class='ModuloHomeLinkNo'>New Report/Contract</a>"; break;


            }

            return rpt;

        }


        public static string ObtenerScriptOpcionVacio()
        {
            var rpt = "";


            rpt = "<a href='#'   class='ModuloHomeLinkVC'></a>";


            return rpt;

        }

        /// <summary>
        /// Combierte la fecha de formato int(20130125) to string(25/01/2013)
        /// </summary>
        /// <param name="fecha">fecha en formato int(20130125)</param>
        /// <returns></returns>
        public static string FechaIntToString(int fecha)
        {
            var rpt = "";

            try
            {
                var anio = fecha.ToString().Substring(0, 4);
                var dia = fecha.ToString().Substring(4, 2);
                var mes = fecha.ToString().Substring(6, 2);
                rpt = mes + "/" + dia + "/" + anio;
            }
            catch (Exception ex)
            {
                rpt = "";
            }

            return rpt;
        }


        public static string Moneda2d(double value)
        {

            return value.ToString("#,##0.00");

        }

        public static string Moneda2dUS(double value)
        {
            try
            {
                return "$ " + value.ToString("F2");
            }
            catch (Exception ex)
            {

                return "$ 0.00";
            }

        }


        public static string Moneda2dUS(decimal value)
        {
            try
            {
                return "$ " + value.ToString("F2");
            }
            catch (Exception ex)
            {

                return "$ 0.00";
            }

        }

        public static string Moneda5dUS(decimal value)
        {
            try
            {
                return "$ " + value.ToString("F5");
            }
            catch (Exception ex)
            {

                return "$ 0.00000";
            }

        }


        public static string Moneda5d(decimal value)
        {
            try
            {
                return value.ToString("#,##0.00000");
            }
            catch (Exception ex)
            {

                return "0.00000";
            }

        }


        public static decimal ToDecimal(string value)
        {
            value = value.Replace("$", "").Trim();
            try
            {
                value = value.Replace(",", "");
                return decimal.Parse(value);
            }
            catch (Exception ex)
            {

                try
                {
                    value = value.Replace(",", "");
                    value = value.Replace(".", ",");
                    return decimal.Parse(value);
                }
                catch (Exception es)
                {
                    return 0;
                }

            }

        }

        public static double ToDouble(string value)
        {
            value = value.Replace("$", "").Trim();
            try
            {
                // value = value.Replace(",", "");
                return double.Parse(value);
            }
            catch (Exception ex)
            {

                try
                {
                    value = value.Replace(",", "");
                    value = value.Replace(".", ",");
                    return double.Parse(value);
                }
                catch (Exception es)
                {
                    return 0;
                }

            }

        }

        public static int ToInt(string value)
        {
            try
            {
                return int.Parse(value.Split(char.Parse(".")).First<string>());
            }
            catch (Exception e)
            {
                return 0;
            }
        }

        /// <summary>
        /// Convierte una fecha String a Int
        /// </summary>
        /// <param name="fecha">Fecha en formato dd/mm/yyyy</param>
        /// <returns></returns>
        public static int FechaStringToInt(string fecha)
        {
            int rpt = 0;

            try
            {
                var partes = fecha.Split(char.Parse("/"));
                var mes = partes[0];
                var dia = partes[1];
                var anio = partes[2];


                var aux = anio + int.Parse(dia).ToString("##00") + int.Parse(mes).ToString("##00");
                rpt = int.Parse(aux);

            }
            catch (Exception ex)
            {
                rpt = 0;
            }

            return rpt;
        }

        public static string GetFechaActual()
        {
            var rpt = "";


            try
            {
                var anio = DateTime.Now.Year;
                var mes = DateTime.Now.Month;
                var dia = DateTime.Now.Day;
                rpt = mes.ToString("##00") + "/" + dia.ToString("##00") + "/" + anio.ToString("##00");
            }
            catch (Exception ex)
            {
                rpt = "";
            }



            return rpt;

        }

        public static int GetIntFechaActual()
        {
            var rpt = 0;


            try
            {
                var anio = DateTime.Now.Year;
                var mes = DateTime.Now.Month;
                var dia = DateTime.Now.Day;
                rpt = int.Parse(anio.ToString() + dia.ToString("##00") + mes.ToString("##00"));
            }
            catch (Exception ex)
            {
                rpt = 0;
            }



            return rpt;

        }

        public static string ObtenerValorConfig(string key)
        {
            var rpt = "";

            var lg = new CCLog();
            try
            {
                rpt = System.Configuration.ConfigurationManager.AppSettings[key].ToString();
            }
            catch (Exception ex)
            {
                lg.TraceError("CCBidCom.Utiles.ObtenerValorConfig:" + ex.Message);
                rpt = "";
            }

            return rpt;


        }

        public static string GetCaller()
        {
            var st = new StackTrace();
            var caller = string.Format("{0}.{1}", st.GetFrame(1).GetMethod().ReflectedType.FullName, st.GetFrame(1).GetMethod().Name);
            return caller;
        }

        public static dynamic Parse<T>(this object obj)
        {
            try
            {
                if (obj == DBNull.Value || obj == null)
                {
                    if (typeof(T) == typeof(int)) { return 0; }
                    return null;
                }
                
                if (typeof(T) == typeof(string))
                {
                    return obj.ToString();
                }
                else if (typeof(T) == typeof(char))
                {
                    return Convert.ToChar(obj);
                }
                else if (typeof(T) == typeof(bool))
                {
                    return Convert.ToBoolean(obj);
                }
                else if (typeof(T) == typeof(int))
                {
                    return Convert.ToInt32(obj);
                }
                else if (typeof(T) == typeof(Int16))
                {
                    return Convert.ToInt16(obj);
                }
                else if (typeof(T) == typeof(Int32))
                {
                    return Convert.ToInt32(obj);
                }
                else if (typeof(T) == typeof(Int64))
                {
                    return Convert.ToInt64(obj);
                }
                else if (typeof(T) == typeof(DateTime))
                {
                    return Convert.ToDateTime(obj);
                }
                else if (typeof(T) == typeof(decimal))
                {
                    return Convert.ToDecimal(obj);
                }
                else if (typeof(T) == typeof(double))
                {
                    return Convert.ToDouble(obj);
                }
                else
                {
                    return obj;
                }
            }
            catch (Exception)
            {
                return default(T);
            }
        }

        public static T? ParseNullable<T>(this object obj) where T : struct
        {
            return obj == null ? null : (T?)Convert.ChangeType(obj, typeof(T));
        }

        public static string EncodeBase64(string text)
        {
            var utf = new UTF8Encoding();
            var textEncoded = Convert.ToBase64String(utf.GetBytes(Convert.ToBase64String(utf.GetBytes(Convert.ToBase64String(utf.GetBytes(text))))));

            return textEncoded;
        }

        public static string EncodeBase64_Only(string text)
        {
            var utf = new UTF8Encoding();
            var textEncoded = Convert.ToBase64String(utf.GetBytes(text));
            return textEncoded;
        }

        public static string DecodeBase64(string text)
        {
            var utf = new UTF8Encoding();
            var textDecoded = utf.GetString(Convert.FromBase64String(utf.GetString(Convert.FromBase64String(utf.GetString(Convert.FromBase64String(text))))));

            return textDecoded;
        }

        public static string DecodeBase64_Only(string text)
        {
            var utf = new UTF8Encoding();
            var textDecoded = utf.GetString(Convert.FromBase64String(text));
            return textDecoded;
        }

        public static string Hash(string text)
        {
            var crypt = new System.Security.Cryptography.SHA256Managed();
            var hash = new StringBuilder();
            byte[] crypto = crypt.ComputeHash(Encoding.UTF8.GetBytes(text));
            foreach (byte theByte in crypto)
            {
                hash.Append(theByte.ToString("x2"));
            }
            return hash.ToString();
        }

        public static string Bcript(string text)
        {
            string passwordHash = BCrypt.Net.BCrypt.EnhancedHashPassword(text, 13);
            return passwordHash;
        }

        public static string ParseStringSN<T>(object sw)
        {
            
            if (sw == DBNull.Value) { return null; }

            if (typeof(T) == typeof(string))
            {
                return sw.ToString().ToUpper();
            }

            if (typeof(T) == typeof(bool))
            {
                if (bool.Parse(sw.ToString()) == true) { return "S"; }
                if (bool.Parse(sw.ToString()) == false) { return "N"; }
            }

            if (typeof(T) == typeof(bool?))
            {
                if (((bool?)sw).HasValue)
                {
                    if (((bool?)sw).Value)
                    { return "S"; }
                    else
                    { return "N"; }
                }
            }

            if (typeof(T) == typeof(int))
            {
                if (int.Parse(sw.ToString()) == 1) { return "S"; }
                if (int.Parse(sw.ToString()) == 0) { return "N"; }
            }

            if (typeof(T) == typeof(int?))
            {
                if (((int?)sw).HasValue)
                {
                    if (((int?)sw).Value == 1)
                    { return "S"; }
                    if (((int?)sw).Value == 0)
                    { return "N"; }
                }
            }

            return null;
        }

        public static bool? parseObjectToBool(object str)
        {
            if (str != null && str != DBNull.Value)
            {
                if (str.ToString().ToUpper().Trim() == "S" || str.ToString().ToUpper().Trim() == "Y" 
                    || str.ToString().ToUpper().Trim() == "1" || str.ToString().ToUpper().Trim() == true.ToString().ToUpper().Trim())
                { return true; }
                if (str.ToString().ToUpper().Trim() == "N" 
                    || str.ToString().ToUpper().Trim() == "0" || str.ToString().ToUpper().Trim() == false.ToString().ToUpper().Trim())
                { return false; }
            }
            return null;
        }

    }
}
