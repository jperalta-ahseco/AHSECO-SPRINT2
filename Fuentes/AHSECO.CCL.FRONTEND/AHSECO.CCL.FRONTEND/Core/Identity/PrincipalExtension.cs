using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading;
using Newtonsoft.Json;
using System.Net;
using System.Web;

namespace AHSECO.CCL.FRONTEND.Identity
{
    public static class PrincipalExtension
    {
        public static string ObtenerIdUsuario(this IPrincipal user)
        {
            if (user.Identity.IsAuthenticated)
            {
                var claims = user.Identity as ClaimsIdentity;
                return claims.Claims.FirstOrDefault(m => m.Type.Equals("Id")).Value;
            }
            return null;
        }

        public static string ObtenerUsuario(this IPrincipal user)
        {
            if (user.Identity.IsAuthenticated)
            {
                var claims = user.Identity as ClaimsIdentity;
                return claims.Claims.FirstOrDefault(m => m.Type.Equals("Usuario")).Value;
            }
            return null;
        }

        public static string ObtenerNombres(this IPrincipal user)
        {
            if (user.Identity.IsAuthenticated)
            {
                var claims = user.Identity as ClaimsIdentity;
                return claims.Claims.FirstOrDefault(m => m.Type.Equals("Nombres")).Value;
            }
            return null;
        }

        public static string ObtenerApellidos(this IPrincipal user)
        {
            if (user.Identity.IsAuthenticated)
            {
                var claims = user.Identity as ClaimsIdentity;
                return claims.Claims.FirstOrDefault(m => m.Type.Equals("Apellidos")).Value;
            }
            return null;
        }

        public static string ObtenerNombresCompletos(this IPrincipal user)
        {
            if (user.Identity.IsAuthenticated)
            {
                var claims = user.Identity as ClaimsIdentity;
                var nombres =  claims.Claims.FirstOrDefault(m => m.Type.Equals("Nombres")).Value;
                var apellidos = claims.Claims.FirstOrDefault(m => m.Type.Equals("Apellidos")).Value;
                return string.Format("{0} {1}", nombres, apellidos);
            }
            return null;
        }

        public static string ObtenerEmail(this IPrincipal user)
        {
            if (user.Identity.IsAuthenticated)
            {
                var claims = user.Identity as ClaimsIdentity;
                return claims.Claims.FirstOrDefault(m => m.Type.Equals("Email")).Value;
            }
            return null;
        }

        public static string ObtenerUsuarioRed(this IPrincipal user)
        {
            if (user.Identity.IsAuthenticated)
            {
                var claims = user.Identity as ClaimsIdentity;
                return claims.Claims.FirstOrDefault(m => m.Type.Equals("UsuarioRed")).Value;
            }
            return null;
        }

        public static string ObtenerIdPerfil(this IPrincipal user)
        {
            if (user.Identity.IsAuthenticated)
            {
                var claims = user.Identity as ClaimsIdentity;
                return claims.Claims.FirstOrDefault(m => m.Type.Equals("PerfilId")).Value;
            }
            return null;
        }

        public static string ObtenerPerfil(this IPrincipal user)
        {
            if (user.Identity.IsAuthenticated)
            {
                var claims = user.Identity as ClaimsIdentity;
                return claims.Claims.FirstOrDefault(m => m.Type.Equals("Perfil")).Value;
            }
            return null;
        }

        public static string ObtenerOrganoEjecutor(this IPrincipal user)
        {
            if (user.Identity.IsAuthenticated)
            {
                var claims = user.Identity as ClaimsIdentity;
                return claims.Claims.FirstOrDefault(m => m.Type.Equals("OrganoEjecutor")).Value;
            }
            return null;
        }

        public static string ObtenerOrganoEPS(this IPrincipal user)
        {
            if (user.Identity.IsAuthenticated)
            {
                var claims = user.Identity as ClaimsIdentity;
                return claims.Claims.FirstOrDefault(m => m.Type.Equals("EPS")).Value;
            }
            return null;
        }

        public static string ObtenerFechaUltimaSesion(this IPrincipal user)
        {
            if (user.Identity.IsAuthenticated)
            {
                var claims = user.Identity as ClaimsIdentity;
                return claims.Claims.FirstOrDefault(m => m.Type.Equals("FechaUltimaSesion")).Value;
            }
            return null;
        }

        public static string ObtenerIP(this IPrincipal user)
        {
            string localIP = "";
            IPHostEntry host = Dns.GetHostEntry(Dns.GetHostName());

            foreach (IPAddress ip in host.AddressList)
            {
                if(ip.AddressFamily.ToString() == "InterNetwork")
                {
                    localIP = ip.ToString();
                }
            }

            var req =HttpContext.Current.Request;
            localIP = req.UserHostAddress;

            return localIP;
        }
    }
}