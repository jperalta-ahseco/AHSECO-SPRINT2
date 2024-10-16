using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AHSECO.CCL.COMUN;
using AHSECO.CCL.BE;

namespace AHSECO.CCL.FRONTEND.Core.Identity
{
    public class CustomApplicationUser : IUser
    {

        public string Id { get; }
        public string UserName { get; set; }
        public ResponseDTO<UsuarioDTO> Response { get; set; }

        public CustomApplicationUser() : this(new ResponseDTO<UsuarioDTO>(default(UsuarioDTO)))
        {
        }

        public CustomApplicationUser(ResponseDTO<UsuarioDTO> responseDTO)
        {
            Response = responseDTO;

            if (responseDTO.Status == ResponseStatusDTO.Success)
            {
                Id = responseDTO.Result.Id.ToString();
                UserName = responseDTO.Result.Nombres;
            }
            else
            {
                // Valores por defecto, lo cuales no tendran relevancia, puesto que la aplicación no iniciará sesión.
                Id = "01";
                UserName = "USER";
            }
        }
    }
}