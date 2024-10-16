using Microsoft.AspNet.Identity;
using AHSECO.CCL.BE;
using AHSECO.CCL.BL;
using AHSECO.CCL.COMUN;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace AHSECO.CCL.FRONTEND.Core.Identity
{
    public class CustomUserManager : UserManager<CustomApplicationUser>
    {
        public CustomUserManager() : base(new CustomUserStore<CustomApplicationUser>())
        {
        }

        /// <summary>
        /// Método para evaluar credenciales de usuario 
        /// </summary>
        /// <param name="strusuario">Nombre de usuario</param>
        /// <param name="strPassword">Palabra clave</param>
        /// <returns></returns>
        public override Task<CustomApplicationUser> FindAsync(string userName, string password)
        {
            var taskInvoke = Task<CustomApplicationUser>.Factory.StartNew(() =>
            {
                var user = new UsuarioDTO
                {
                    Usuario = userName,
                    Password = password
                };

                var autBL = new AutorizacionBL();
                var result = autBL.Autenticar(user);

                return new CustomApplicationUser(result);

            });

            return taskInvoke;
        }

    }
}