using AHSECO.CCL.COMUN;
using System;
using System.Collections.Generic;
using AHSECO.CCL.BD.Mantenimientos;
using AHSECO.CCL.BE.Mantenimiento;
using AHSECO.CCL.BE;
namespace AHSECO.CCL.BL.Mantenimientos
{
    public class ClienteBL

    {

        private ClienteBD Repository;
        private CCLog Log;
        public ClienteBL() : this(new ClienteBD(), new CCLog())
        {

        }
        public ClienteBL(ClienteBD clienteBD, CCLog log)
        {
            Repository = clienteBD;
            Log = log;
        }
        public ResponseDTO<IEnumerable<ClienteDTO>> ObtenerClientes(ClienteDTO clienteDTO)
        {
            try
            {
                var result = Repository.ObtenerClientes(clienteDTO);
                return new ResponseDTO<IEnumerable<ClienteDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceInfo(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<IEnumerable<ClienteDTO>>(ex);
            }
        }
        public ResponseDTO<IEnumerable<ClienteDTO>> Insertar(ClienteDTO clienteDTO)
        {
            try
            {
                var result = Repository.Insertar(clienteDTO);
                return new ResponseDTO<IEnumerable<ClienteDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<IEnumerable<ClienteDTO>>(ex);

            }
        }

        public ResponseDTO<bool> Actualizar(ClienteDTO clienteDTO)
        {
            try
            {
                var result = Repository.Actualizar(clienteDTO);
                return new ResponseDTO<bool>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<bool>(ex);

            }
        }

        public ResponseDTO<IEnumerable<ContactoDTO>> ObtenerContactos(ContactoDTO contactoDTO)
        {
            try
            {
                var result = Repository.ObtenerContactos(contactoDTO);
                return new ResponseDTO<IEnumerable<ContactoDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<IEnumerable<ContactoDTO>>(ex);
            }

        }


        public ResponseDTO<RespuestaDTO> InsertarContacto(ContactoDTO contactoDTO)
        {
            try
            {
                var result = Repository.InsertarContacto(contactoDTO);
                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            }
        }

        public ResponseDTO<bool> ActualizarContacto(ContactoDTO contactoDTO)
        {
            try
            {
                var result = Repository.ActualizarContacto(contactoDTO);
                return new ResponseDTO<bool>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<bool>(ex);
            }
        }

        public ResponseDTO<IEnumerable<ClienteDTO>> ObtenerAuditClientes(int Id_Ant)
        {
            try
            {
                var result = Repository.ObtenerAuditClientes(Id_Ant);
                return new ResponseDTO<IEnumerable<ClienteDTO>>(result);
            }
            catch (Exception ex)
            {  
                Log.TraceInfo(Utilidades.GetCaller() + "::" + ex.Message);
                return new ResponseDTO<IEnumerable<ClienteDTO>>(ex);
            }
        }
    }
}
