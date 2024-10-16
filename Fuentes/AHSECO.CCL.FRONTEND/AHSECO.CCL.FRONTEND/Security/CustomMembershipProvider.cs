using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Configuration;
using System.Net;
using System.Text;
using System.Web.Script.Serialization;
using AHSECO.CCL.FRONTEND.Models;
using System.Web.UI.HtmlControls;
using System.Web.Mvc;
using Newtonsoft.Json;
using AHSECO.CCL.FRONTEND.Core;
using System.IO;
using AHSECO.CCL.FRONTEND.Security;
using System.ServiceModel.Security;

namespace PF.Nsga.Web.Security
{
    public class CustomMembershipProvider : MembershipProvider
    {
        List<PermisosModel> objListaPermisos;
        HttpContextBase basecontext = (new HttpContextWrapper(HttpContext.Current));

        public override bool ValidateUser(string token, string pPassword)
        {
            //string resultSrv;
            //string strPlantilla;
            //string strPerfil;

            VariableSesion.setCadena("TOKEN_PORTAL", token);
            //ClientePortal portal = new ClientePortal();

            //   strPlantilla = portal.ObtenerPlantillaHTML(token);
            //resultSrv = portal.ObtenerMenu(token);
            //strPerfil = portal.ObtenerPerfil(token);

            //var headerMenu = JsonConvert.DeserializeObject<HeaderMenuBE>(strPlantilla);

            //VariableSesion.setCadena("Header", headerMenu.Header);
            //VariableSesion.setCadena("Menus", headerMenu.Menu);

            //var perfil = JsonConvert.DeserializeObject<dynamic>(strPerfil);
            //VariableSesion.setCadena("ROL_USUARIO", (string)perfil.Value);
            //ObtieneDatos(resultSrv);

            return true;
        }

       




        /// <summary>
        /// obtiene los datos de la trama
        /// </summary>
        /// <param name="pJson"></param>
        public string ObtieneDatos(string pJson)
        {
            JavaScriptSerializer ser = new JavaScriptSerializer();
            WsMenuNode pInfo = ser.Deserialize<WsMenuNode>(pJson);

            objListaPermisos = new List<PermisosModel>();

            if (pInfo.Rpta == "OK")
            {
                VariableSesion.setUsuario(pInfo.UsuarioNT);
                VariableSesion.setNombreUsuario(pInfo.Usuario);
                VariableSesion.setCadena("AGENCIA", pInfo.Agencia);
                AddChildItem(pInfo.SubOpciones, "");

                VariableSesion.setListaPermisos(objListaPermisos, "listaPermisos");
            }

            return pInfo.Rpta;
        }

        /// <summary>
        /// Agrega lista de opciones hijas
        /// </summary>
        /// <param name="childItem">lista de opciones hijas</param>
        /// <param name="menuParent">nombre de la opcion padre</param>
        /// <returns></returns>
        private void AddChildItem(List<WsMenuNode> childItem, string menuParent)
        {

            foreach (WsMenuNode cItem in childItem)
            {
                PermisosModel objPermisos = new PermisosModel();

                objPermisos.Parent = menuParent;
                objPermisos.Name = cItem.Nombre;
                objPermisos.Action = !String.IsNullOrEmpty(cItem.Url) ? cItem.Url.Replace("~/", "").Replace("/", "_").ToUpper() : "";
                objListaPermisos.Add(objPermisos);

                if (cItem.SubOpciones.Count > 0)
                {
                    AddChildItem(cItem.SubOpciones, cItem.Nombre);
                }
            }
        }


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1065:DoNotRaiseExceptionsInUnexpectedLocations")]
        public override string ApplicationName
        {
            get
            {
                throw new NotImplementedException();
            }
            set
            {
                throw new NotImplementedException();
            }
        }

        public override bool ChangePassword(string username, string oldPassword, string newPassword)
        {
            throw new NotImplementedException();
        }

        public override bool ChangePasswordQuestionAndAnswer(string username, string password, string newPasswordQuestion, string newPasswordAnswer)
        {
            throw new NotImplementedException();
        }

        public override MembershipUser CreateUser(string username, string password, string email, string passwordQuestion, string passwordAnswer, bool isApproved, object providerUserKey, out MembershipCreateStatus status)
        {
            throw new NotImplementedException();
        }

        public override bool DeleteUser(string username, bool deleteAllRelatedData)
        {
            throw new NotImplementedException();
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1065:DoNotRaiseExceptionsInUnexpectedLocations")]
        public override bool EnablePasswordReset
        {
            get { throw new NotImplementedException(); }
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1065:DoNotRaiseExceptionsInUnexpectedLocations")]
        public override bool EnablePasswordRetrieval
        {
            get { throw new NotImplementedException(); }
        }

        public override MembershipUserCollection FindUsersByEmail(string emailToMatch, int pageIndex, int pageSize, out int totalRecords)
        {
            throw new NotImplementedException();
        }

        public override MembershipUserCollection FindUsersByName(string usernameToMatch, int pageIndex, int pageSize, out int totalRecords)
        {
            throw new NotImplementedException();
        }

        public override MembershipUserCollection GetAllUsers(int pageIndex, int pageSize, out int totalRecords)
        {
            throw new NotImplementedException();
        }

        public override int GetNumberOfUsersOnline()
        {
            throw new NotImplementedException();
        }

        public override string GetPassword(string username, string answer)
        {
            throw new NotImplementedException();
        }

        public override MembershipUser GetUser(string username, bool userIsOnline)
        {
            throw new NotImplementedException();
        }

        public override MembershipUser GetUser(object providerUserKey, bool userIsOnline)
        {
            throw new NotImplementedException();
        }

        public override string GetUserNameByEmail(string email)
        {
            throw new NotImplementedException();
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1065:DoNotRaiseExceptionsInUnexpectedLocations")]
        public override int MaxInvalidPasswordAttempts
        {
            get { throw new NotImplementedException(); }
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1065:DoNotRaiseExceptionsInUnexpectedLocations")]
        public override int MinRequiredNonAlphanumericCharacters
        {
            get { throw new NotImplementedException(); }
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1065:DoNotRaiseExceptionsInUnexpectedLocations")]
        public override int MinRequiredPasswordLength
        {
            get { throw new NotImplementedException(); }
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1065:DoNotRaiseExceptionsInUnexpectedLocations")]
        public override int PasswordAttemptWindow
        {
            get { throw new NotImplementedException(); }
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1065:DoNotRaiseExceptionsInUnexpectedLocations")]
        public override MembershipPasswordFormat PasswordFormat
        {
            get { throw new NotImplementedException(); }
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1065:DoNotRaiseExceptionsInUnexpectedLocations")]
        public override string PasswordStrengthRegularExpression
        {
            get { throw new NotImplementedException(); }
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1065:DoNotRaiseExceptionsInUnexpectedLocations")]
        public override bool RequiresQuestionAndAnswer
        {
            get { throw new NotImplementedException(); }
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1065:DoNotRaiseExceptionsInUnexpectedLocations")]
        public override bool RequiresUniqueEmail
        {
            get { throw new NotImplementedException(); }
        }

        public override string ResetPassword(string username, string answer)
        {
            throw new NotImplementedException();
        }

        public override bool UnlockUser(string userName)
        {
            throw new NotImplementedException();
        }

        public override void UpdateUser(MembershipUser user)
        {
            throw new NotImplementedException();
        }

        public static string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            string plainTextConverted = System.Convert.ToBase64String(plainTextBytes);
            plainTextConverted = ReplaceCharacters(plainTextConverted);
            return plainTextConverted;
        }

        public static string ReplaceCharacters(string valor)
        {
            return valor.Replace("+", "-").Replace("/", "_");
        }
    }
}