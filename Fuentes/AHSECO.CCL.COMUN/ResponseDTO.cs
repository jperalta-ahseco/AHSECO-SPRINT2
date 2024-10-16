using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;

namespace AHSECO.CCL.COMUN
{
    
    public class ResponseDTO<T>
    {
   
        public ResponseStatusDTO Status { get; set; }

           public string CurrentException { get; set; }

       public T Result { get; set; }

        public ResponseDTO(T result)
        {
            Result = result;
            Status = ResponseStatusDTO.Success;
            CurrentException = null;
        }

        public ResponseDTO(Exception exception)
        {
            Result = default(T);
            Status = ResponseStatusDTO.Failed;
            CurrentException = exception.Message;
        }

        public ResponseDTO(string exceptionMessage)
        {
            Result = default(T);
            Status = ResponseStatusDTO.Failed;
            CurrentException = exceptionMessage;
        }
    }
}
