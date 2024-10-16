
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AHSECO.CCL.FRONTEND.Core
{
    public sealed class ConstanteSesion
    {
        public const string BotonGuardar = "BtnGuardar";
        public const string BotonEnviar = "BtnEnviar";
        public const string BotonProcesar = "BtnProcesar";
        public const string BotonExportarResumen = "BtnExportarResumen";
        public const string BotonExportarDetalle = "BtnExportarDetalle";
        public const string BotonCargar = "BtnCargar";
        public const string BotonAnularDetalle = "BtnAnularDetalle";
        public const string BotonAgregar = "BtnAgregar";
        public const string BotonAnularSolicitud = "BtnAnularSolicitud";
        public const string BotonCambiarEstado = "BtnCambiarEstado";
        public const string BotonReprocesarDetalle = "BtnReprocesarDetalle";
        public const string BotonFinalizarSolicitud = "BtnFinalizarSolicitud";
        public const string BotonDetalles = "BtnDetalles";

        public const string DominioEstadosFichaCandidato = "CANDEST";
        public const string DominioTipoDocumento = "GENTDOC";
        public const string DominioPreguntasActaSupervision = "ACTASUPERVISION";
        public const string DominioRegion = "REGION";
        public const string DominioSexo = "GENSEXO";
        public const string DominioSino = "GENSINO";
        public const string ParametroFichaSecuencial = "CODE0001";
        public const string ParametroEvaluadorSecuencial = "CODE0002";
        public const string ParametroEstadoFichaNueva = "CAES0001";
        public const string DominioPeriodoRemuneracion = "GENPERE";
        public const string DominioLugarEvaluacion = "CONVLUGEV";
        public const string DominioTipoExperiencia = "GENTEXPLAB";
        public const string DominioNivelEducativo = "GENNIVED";
        public const string DominioNivelAlcanzado = "GENNIVEDA";
        public const string DominioFinanciador = "ORDSERVFINPOR";
        public const string DominioMeses = "MES";
        public const string DominioTipoHabilitacion = "EVATIPHAB";
        public const string DominioParametrosGenerales= "PARAMGEN";

        public const string ParametroValidacionDNI = "PARG0002";
        public const string ParametroEvaluadorUCPotencial = "EVTU0001"; // Potencial
        public const string ParametroEvaluadorUCExperienciaLaboral = "EVTU0002"; //Experiencia laboral vinculada
        public const string ParametroEvaluadorUCExperienciaEvaluador = "EVTU0003"; //Experiencia evaluador
        public const string ParametroEvaluadorUCAcreditado = "EVTU0004";// Acreditada

        public const string DominioEstadosEvaluador = "EVAEST";
        public const string ParametroEstadoEvaluadorNuevo = "EVES0001";
        public const string DominioEstadosGrupo = "GRPEST";
        public const string DominioMenciones = "CERTMENCION";

        public const string ParametroEstadoGrupoNuevo = "GRES0001";
        public const string ParametroGrupoSecuencial = "CODE0003";
        public const string ParametroEstadoCandidatosPotenciales = "CAES0001CAES0006CAES0008";  //Falta recibida

        public const string InicioLecturaExcelFichaCabecera = "InicioLecturaExcelFichaCabecera";
        public const string InicioLecturaExcelFichaExperiencia = "InicioLecturaExcelFichaExperiencia";

        public const string NombreHojaExcelFichaCabecera = "NombreHojaExcelFichaCabecera";
        public const string NombreHojaExcelFichaExperiencia = "NombreHojaExcelFichaExperiencia";

        public const string CodigoCargoAsesorVenta = "5";
        public const string CodigoCargoTecnico = "8";
    }    
}
