﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class ReportParamsDTO
    {
        public string RptFileName { get; set; }
        public string ReportTitle { get; set; }
        public string ReportType { get; set; }
        public DataTable DataSource { get; set; }
        public bool IsHasParams { get; set; }
        public string DataSetName { get; set; }

    }
}
