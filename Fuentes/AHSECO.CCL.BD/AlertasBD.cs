using Dapper;
using AHSECO.CCL.BE;
using AHSECO.CCL.COMUN;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AHSECO.CCL.BE.Filtros;
using System.Data.SqlClient;

namespace AHSECO.CCL.BD
{
    public class AlertasBD
    {
        CCLog Log;

        public AlertasBD() : this(new CCLog())
        {
        }

        public AlertasBD(CCLog cclog)
        {
            Log = cclog;
        }


    }
}
