using System;
using AHSECO.CCL.BD;
using AHSECO.CCL.COMUN;
using AHSECO.CCL.BE;
using System.DirectoryServices;
using static System.Net.Mime.MediaTypeNames;
using System.Collections.Generic;

namespace AHSECO.CCL.BL
{
    public class AlertasBL
    {
        private AlertasBD Repository;

        private CCLog Log;
        public AlertasBL()
            : this(new AlertasBD(), new CCLog())
        {
        }
        public AlertasBL(AlertasBD alertasBD, CCLog log)
        {
            Repository = alertasBD;
            Log = log;
        }



    }
}
