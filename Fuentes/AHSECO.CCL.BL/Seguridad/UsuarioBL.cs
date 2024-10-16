using AHSECO.CCL.BD;
using AHSECO.CCL.BE;
using AHSECO.CCL.BE.Reportes;
using AHSECO.CCL.COMUN;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BL
{
    public class UsuarioBL
    {
        private UsuarioBD Repository;
        private CCLog Log;

        public UsuarioBL()
            : this(new UsuarioBD(), new CCLog())
        {
        }

        public UsuarioBL(UsuarioBD UsuarioBD, CCLog log)
        {
            Repository = UsuarioBD;
            Log = log;
        }

        public ResponseDTO<IEnumerable<UsuarioDTO>> Obtener(UsuarioDTO usuarioDTO)
        {
            try
            {
                var result = Repository.Obtener(usuarioDTO);
                var result2 = result.ToList().Select(x =>
                {
                    x.Password = Utilidades.DecodeBase64(x.Password);
                    return x;
                }).ToList();
                return new ResponseDTO<IEnumerable<UsuarioDTO>>(result2);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<IEnumerable<UsuarioDTO>>(ex);
            }
        }

        public ResponseDTO<RespuestaDTO> Insertar(UsuarioDTO usuarioDTO)
        {
            try
            {
                usuarioDTO.Password = Utilidades.EncodeBase64(usuarioDTO.Password);
                //usuarioDTO.Password = Utilidades.Bcript(usuarioDTO.Password);
                var result = Repository.Insertar(usuarioDTO);
                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            }
        }

        public ResponseDTO<RespuestaDTO> Actualizar(UsuarioDTO usuarioDTO)
        {
            try
            {
                usuarioDTO.Password = Utilidades.EncodeBase64(usuarioDTO.Password);
                //usuarioDTO.Password = Utilidades.Bcript(usuarioDTO.Password);
                var result = Repository.Actualizar(usuarioDTO);
                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            }
        }

        public ResponseDTO<RespuestaDTO> ActualizarPassword(PasswordDTO passwordDTO)
        {
            var result = new RespuestaDTO();
            try
            {
                
                if (passwordDTO.PasswordNuevo != passwordDTO.PasswordConfirmado)
                {
                    result.Codigo = 0;
                    result.Mensaje = "El password nuevo y el confirmado no coinciden.";
                }
                else
                {
                    var usuario = Obtener(new UsuarioDTO
                    {
                        Id = passwordDTO.IdUsuario
                    });

                    passwordDTO.PasswordNuevo = Utilidades.EncodeBase64(passwordDTO.PasswordNuevo);
                    //passwordDTO.PasswordNuevo = Utilidades.Hash(Utilidades.DecodeBase64_Only(passwordDTO.PasswordNuevo));
                    //passwordDTO.PasswordActual = Utilidades.Hash(Utilidades.DecodeBase64_Only(passwordDTO.PasswordActual));

                    if (usuario.Result.FirstOrDefault().Password != passwordDTO.PasswordActual)
                    {
                        result.Codigo = 0;
                        result.Mensaje = "El password actual es inválido";
                    }
                    else
                    {
                        result = Repository.ActualizarPassword(passwordDTO);
                    }

                    
                    
                }

               
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            }

            return new ResponseDTO<RespuestaDTO>(result);
        }

        public ResponseDTO<IEnumerable<SesionReporteDTO>> ReporteSesionUsuario(UsuarioDTO usuarioDTO)
        {
            try
            {
                var result = Repository.ReporteSesionUsuario(usuarioDTO);
                return new ResponseDTO<IEnumerable<SesionReporteDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<IEnumerable<SesionReporteDTO>>(ex);
            }
        }

        public ResponseDTO<IEnumerable<UsuarioAuditoriaDTO>> ReporteAuditoriaUsuario(UsuarioDTO usuarioDTO)
        {
            try
            {
                var result = Repository.ReporteAuditoriaUsuario(usuarioDTO);
                return new ResponseDTO<IEnumerable<UsuarioAuditoriaDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<IEnumerable<UsuarioAuditoriaDTO>>(ex);
            }
        }
    }
}