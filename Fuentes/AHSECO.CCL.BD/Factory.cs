using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Common;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;
using Npgsql;

namespace AHSECO.CCL.BD
{
    public static class Factory
    {
        public static Func<DbConnection> ConnectionFactory = () => new SqlConnection(ConnectionManager.GetConnectionStringAhseco());
        //public static Func<DbConnection> ConnectionFactory = () => new SqlConnection("Data Source=srv-qg;Initial Catalog=CCL;User ID=sa;Password=Kasave123$$");

        public static Func<NpgsqlConnection> ConnectionFactoryPostgresSQL = () => new NpgsqlConnection(ConnectionManager.GetConnectionPostgresSQLStringAhseco());

        public static SqlConnection ConnectionSingle()
        {
            return new SqlConnection(ConnectionManager.GetConnectionStringAhseco());
            
        }

        public static NpgsqlConnection ConnectionPostgresSQLSingle()
        {
            return new NpgsqlConnection(ConnectionManager.GetConnectionPostgresSQLStringAhseco());

        }

    }
}
