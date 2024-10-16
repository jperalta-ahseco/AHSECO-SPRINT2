using System;
using AHSECO.CCL.BD;
using AHSECO.CCL.COMUN;
using AHSECO.CCL.BE;
using System.DirectoryServices;
using static System.Net.Mime.MediaTypeNames;

namespace AHSECO.CCL.BL
{
    public class AutorizacionBL
    {
        private AutorizacionBD Repository;

        private CCLog Log;
        public AutorizacionBL()
            : this(new AutorizacionBD(), new CCLog())
        {
        }
        public AutorizacionBL(AutorizacionBD autorizacionBD, CCLog log)
        {
            Repository = autorizacionBD;
            Log = log;
        }

        public ResponseDTO<UsuarioDTO> Autenticar(UsuarioDTO usuarioDTO)
        {
            try
            {
                ValidarParametros(usuarioDTO);
                var usuario = AutenticarUsuario(usuarioDTO);

                return new ResponseDTO<UsuarioDTO>(usuario);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<UsuarioDTO>(ex);
            }
        }

        private void ValidarParametros(UsuarioDTO usuarioDTO)
        {
            if (usuarioDTO == null)
            {
                throw new ArgumentException("La solicitud es inválida.");
            }
            if (string.IsNullOrEmpty(usuarioDTO.Usuario) ||
                string.IsNullOrEmpty(usuarioDTO.Password))
            {
                throw new ArgumentException("Los parámetros son invalidos.");
            }
        }

        private UsuarioDTO AutenticarUsuario(UsuarioDTO usuarioDTO)
        {
            var result = Repository.Autenticar(usuarioDTO);

            if (result == null || result.Id == 0)
            {
                throw new UnauthorizedAccessException("Usuario y/o password incorrectos.");
            }

            if (result.ValidarAD.Equals("1"))
            {
                AutenticarAD(result.UsuarioRed, usuarioDTO.Password);
            }
            else
            {
                var passEncoded = Utilidades.EncodeBase64(usuarioDTO.Password);
                //var passEncoded = Utilidades.Hash(usuarioDTO.Password);

                if (result.Password != passEncoded)
                {
                    throw new UnauthorizedAccessException("Usuario y/o password incorrectos.");
                }
            }

            return result;
        }

        private void AutenticarAD(string userName, string password)
        {
            try
            {
                string domain = Utilidades.ObtenerValorConfig("DominioAD");
                string host = Utilidades.ObtenerValorConfig("HostAD");
                string fullUserName = domain + @"\" + userName;
                var path = "LDAP://" + host;
                var entry = new DirectoryEntry(path, fullUserName, password);
                var obj = entry.NativeObject;
            }
            catch (DirectoryServicesCOMException ex)
            {
                Log.TraceError(ex.Message);
                throw new ArgumentException("Usuario y/o password incorrectos.");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ResponseDTO<bool> ActualizarUltimaSesion(UsuarioDTO usuarioDTO)
        {
            try
            {
                var result = Repository.ActualizarUltimaSesion(usuarioDTO);
                return new ResponseDTO<bool>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<bool>(ex);
            }
        }
    }
}
