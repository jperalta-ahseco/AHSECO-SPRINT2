using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using log4net;
using log4net.Config;
using System.Xml;
using System.Resources;
using System.Globalization;

namespace AHSECO.CCL.COMUN
{

    public class CCLog
    {
        private static readonly ILog Logger = LogManager.GetLogger("LOGAuditoria");
        public CCLog()
        {
            /*var objDocument = new XmlDocument();

            objDocument.LoadXml(CCServiciosGenerales.Recursos.log4net);
            var objElement = objDocument.DocumentElement;
            XmlConfigurator.Configure(objElement);*/
        }

        public void TraceStartLogicalOperation(string operationName)
        {
            throw new NotImplementedException();
        }

        public void TraceStopLogicalOperation()
        {
            throw new NotImplementedException();
        }

        public void TraceStart()
        {
            Logger.Info("**** SE INICIA REGISTRO DE LOG ****");
        }

        public void TraceStop()
        {
            Logger.Info("**** SE DETIENE REGISTRO DE LOG ****");
        }

        public void TraceInfo(string message)
        {
            Logger.Info("INFO: " + message);
        }

        public void TraceWarning(string message)
        {
            Logger.Warn("WARN: " + message);
        }

        public void TraceError(string message)
        {

            Logger.Error("ERROR: " + message);
        }

        public void TraceCritical(string message)
        {

            Logger.Fatal("FATAL: " + message);
        }
    }
}
