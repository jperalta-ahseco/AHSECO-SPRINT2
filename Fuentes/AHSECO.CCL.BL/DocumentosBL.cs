using System;
using AHSECO.CCL.BD;
using AHSECO.CCL.COMUN;
using AHSECO.CCL.BE;
using System.DirectoryServices;
using static System.Net.Mime.MediaTypeNames;
using System.Collections.Generic;

namespace AHSECO.CCL.BL
{
    public class DocumentosBL
    {
        private DocumentosBD Repository;

        private CCLog Log;
        public DocumentosBL()
            : this(new DocumentosBD(), new CCLog())
        {
        }
        public DocumentosBL(DocumentosBD documentosBD, CCLog log)
        {
            Repository = documentosBD;
            Log = log;
        }



        public ResponseDTO<RespuestaDTO> MantenimientoDocumentos(DocumentoDTO documentoDTO)
        {
            try
            {
                var result = Repository.MantenimientoDocumentos(documentoDTO);
                return new ResponseDTO<RespuestaDTO>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<RespuestaDTO>(ex);
            }
        }

        public ResponseDTO<IEnumerable<DocumentoDTO>> ConsultaDocumentos(long CodigoWorkFlow) 
        { 
            try
            {
                var result = Repository.ConsultaDocumentos(CodigoWorkFlow);
                return new ResponseDTO<IEnumerable<DocumentoDTO>>(result);
            }
            catch (Exception ex)
            {
                Log.TraceError(Utilidades.GetCaller() + ":: " + ex.Message);
                return new ResponseDTO<IEnumerable<DocumentoDTO>>(ex);
            }
        }

    }
}
