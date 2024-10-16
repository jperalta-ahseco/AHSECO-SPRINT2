using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace AHSECO.CCL.FRONTEND.Reporte
{
    public class GetResultsDataSet
    {
        public static DataSet GetViaticos(string cadenaCodigoViaticos)
        {
            string constr = ReporteConexion.getConnection();
            DataSet ds = new DataSet();
            string sql = "SELECT A.COD_VIATICO,A.ID_WORKFLOW,A.COD_EMPRESA,A.FECHAVIATICO,A.COD_ENCARGADO,"+
                         "A.COD_CARGO,A.MOTIVO,A.COD_AREA,A.UBIGEO,"+
                         "(ISNULL(C.NOMDEPARTAMENTO,'')+'/'+ISNULL(C.NOMPROVINCIA,'')+'/'+ISNULL(C.NOMDISTRITO,'')) NOMUBIGEO,"+
                         "A.CLIENTE,A.DIAS_VIAJE,ISNULL(A.OBSERVACION,'') OBSERVACION,A.ESTADO,ISNULL(B.ABREV_ESTADO,'') NOMESTADO,"+
                         "ISNULL(D.VALOR1,'') NOMEMPRESA,ISNULL(CONVERT(varchar,A.FECHAVIATICO,103) ,'') AS FECVIATICOFORMAT,"+
                         "ISNULL(E.NOMBRES,'')+' '+ISNULL(E.APELLIDOPATERNO,'')+' '+ISNULL(E.APELLIDOMATERNO,'') AS NOMBREENCARGADO,"+
                         "ISNULL(F.NOMBREAREA,'') AS NOMBREAREA,ISNULL(G.NOMBRECARGO,'') AS NOMBRECARGO,"+
                         "ISNULL(CONVERT(varchar,A.FEC_ABO,103) ,'')AS FEC_ABO,ISNULL(A.ANULADO,'N') ANULADO "+
                         "FROM TBM_VIATICOS A WITH(NOLOCK) "+
                         "LEFT JOIN TBM_PROCESOESTADOS B ON A.ESTADO=B.COD_ESTADO "+
                         "LEFT JOIN TBM_UBIGEO C ON A.UBIGEO=C.CODUBIGEO "+
                         "LEFT JOIN TBD_DATOS_GENERALES D ON D.DOMINIO='RAZSOCIAL' AND A.COD_EMPRESA=D.COD_VALOR1 "+
                         "LEFT JOIN TBM_EMPLEADOS E ON A.COD_ENCARGADO=E.ID_EMPLEADO "+
                         "LEFT JOIN TBM_AREAS F ON A.COD_AREA = F.ID_AREA "+
                         "LEFT JOIN TBM_CARGOS G ON A.COD_CARGO=G.ID_CARGO "+
                         "WHERE A.COD_VIATICO IN("+ cadenaCodigoViaticos + ")"+
                         "ORDER BY A.COD_VIATICO";
            SqlConnection con = new SqlConnection(constr);
            SqlCommand cmd = new SqlCommand(sql, con);
            SqlDataAdapter adpt = new SqlDataAdapter(cmd);
            adpt.Fill(ds);
            return ds;
        }
    }
}