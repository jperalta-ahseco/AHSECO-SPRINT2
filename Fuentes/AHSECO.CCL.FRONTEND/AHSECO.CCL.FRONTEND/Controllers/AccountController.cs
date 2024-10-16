using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using AHSECO.CCL.BL;
using AHSECO.CCL.BE;
using AHSECO.CCL.FRONTEND.Core;
using AHSECO.CCL.FRONTEND.Core.Identity;
using AHSECO.CCL.FRONTEND.Models;
using AHSECO.CCL.COMUN;
using AHSECO.CCL.FRONTEND.Identity;
using PF.Nsga.Web.Security;
using System.Collections.Generic;
using System.Web.Security;
using AHSECO.CCL.FRONTEND.Security;


namespace AHSECO.CCL.FRONTEND.Controllers
{
    public class AccountController : Controller
    {

        private CustomUserManager CustomUserManager { get; set; }

        public AccountController() : this(new CustomUserManager()) { }

        public AccountController(CustomUserManager customUserManager)
        {
            CustomUserManager = customUserManager;
        }

        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToLocal("/");
            }
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Login(LoginViewModel modelView, string returnUrl)
        {
            if (!ModelState.IsValid)
            {
                return View(modelView);
            }

            var result = await CustomUserManager.FindAsync(modelView.UserName, modelView.Password);

            if (result.Response.Status == ResponseStatusDTO.Success)
            {
                await SignInAsync(result, true);

                var perfilBL = new PerfilBL();
                var autorizacionBL = new AutorizacionBL();
                var opciones = perfilBL.ObtenerPermisos(new PerfilDTO
                    {
                        Id = result.Response.Result.Perfil.Id
                    }
                );
                if (opciones.Status == ResponseStatusDTO.Success)
                {
                    //Se guarda los permisos de las opciones del sistema:

                    VariableSesion.setListaPermisos(AddChildItem(opciones.Result.Where(t => t.Url != "" && t.Url != null).ToList(), ""), "listaPermisos");
                    VariableSesion.setCadena("Permision", "true");
                    GenerateTokenLogin(modelView.UserName);

                    VariableSesion.setCadena("Menus", Utils.ConstruirMenu(opciones.Result.ToList()));
                    var usuarioDTO = new UsuarioDTO();
                    usuarioDTO.Id = result.Response.Result.Id;
                    usuarioDTO.UsuarioModifica = User.ObtenerUsuario();
                    usuarioDTO.IpMaquinaModifica = User.ObtenerIP();
                    autorizacionBL.ActualizarUltimaSesion(usuarioDTO);
                }

                return RedirectToLocal(returnUrl);
            }
            else
            {
                ModelState.AddModelError("", result.Response.CurrentException);
            }

            return View(modelView);
        }

        private bool GenerateTokenLogin(string user)
        {
            var tokenService = new TokenService();
            var token = tokenService.GenerarToken(user);
            if (token != "")
            {
                VariableSesion.setCadena("Token", token);
                return true;
            }
            else { return false; }
        }


        private List<PermisosModel> AddChildItem(List<OpcionDTO> childItem, string menuParent)
        {

            var objListaPermisos = new List<PermisosModel>();

            foreach (OpcionDTO cItem in childItem)
            {
                PermisosModel objPermisos = new PermisosModel();

                objPermisos.Parent = menuParent;
                objPermisos.Name = cItem.Nombre;
                objPermisos.Action = !String.IsNullOrEmpty(cItem.Url) ? cItem.Url.Replace("~/", "").Replace("/", "_").Replace("~", "").ToUpper() : "";
                objListaPermisos.Add(objPermisos);

            }
            return objListaPermisos;
        }





            [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LogOff(string returnUrl)
        {
            Session.Abandon();
            AuthenticationManager.SignOut();
            VariableSesion.setCadena("Token", "");
            return RedirectToLocal(returnUrl);
        }

        [HttpGet]
        public ActionResult Logout(string returnUrl)
        {
            AuthenticationManager.SignOut();
            VariableSesion.setCadena("Token", "");
            return RedirectToLocal(returnUrl);
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }

            return Redirect(Utils.UriBase);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing && CustomUserManager != null)
            {
                CustomUserManager.Dispose();
                CustomUserManager = null;
            }
            base.Dispose(disposing);
        }

        /// <summary>
        /// Método para obtener la context autentificacion
        /// </summary>
        /// <returns></returns>
        private IAuthenticationManager AuthenticationManager
        {
            get { return HttpContext.GetOwinContext().Authentication; }
        }

        /// <summary>
        /// Método para sincronizar el acceso
        /// </summary>
        /// <param name="user">Datos Usuario</param>
        /// <param name="isPersistent">true</param>
        /// <returns></returns>
        public async Task SignInAsync(CustomApplicationUser user, bool isPersistent)
        {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);

            var identity = await CustomUserManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie);

            identity.AddClaim(new Claim("Id", user.Response.Result.Id.ToString() ?? ""));
            identity.AddClaim(new Claim("Usuario", user.Response.Result.Usuario ?? ""));
            identity.AddClaim(new Claim("Nombres", user.Response.Result.Nombres ?? ""));
            identity.AddClaim(new Claim("Apellidos", user.Response.Result.Apellidos ?? ""));
            identity.AddClaim(new Claim("Email", user.Response.Result.Email ?? ""));
            identity.AddClaim(new Claim("UsuarioRed", user.Response.Result.UsuarioRed ?? ""));
            identity.AddClaim(new Claim("PerfilId", user.Response.Result.Perfil.Id.ToString() ?? ""));
            identity.AddClaim(new Claim("Perfil", user.Response.Result.Perfil.Descripcion ?? ""));
            identity.AddClaim(new Claim("OrganoEjecutor", user.Response.Result.IdEjecutor.ToString()));
            identity.AddClaim(new Claim("EPS", user.Response.Result.IdEPS.ToString()));
            identity.AddClaim(new Claim("FechaUltimaSesion", user.Response.Result.FechaUltimaSesion ?? ""));

            var authenticationProperties = new AuthenticationProperties();
            authenticationProperties.IsPersistent = isPersistent;
            authenticationProperties.ExpiresUtc = DateTime.UtcNow.AddMinutes(Utils.TiempoSesion);
            authenticationProperties.AllowRefresh = true;

            AuthenticationManager.SignIn(authenticationProperties, identity);

        }

        public ActionResult ChangePassword()
        {
            return View();
        }
    }
}