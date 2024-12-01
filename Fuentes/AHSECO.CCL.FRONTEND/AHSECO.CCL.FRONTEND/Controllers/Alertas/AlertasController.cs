using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Configuration;
using AHSECO.CCL.BE;
using AHSECO.CCL.BL;
using System.Web.Http;
using Microsoft.Ajax.Utilities;
using System.Threading.Tasks;
using AHSECO.CCL.FRONTEND.Identity;
using AHSECO.CCL.COMUN;


namespace AHSECO.CCL.FRONTEND.Controllers.Alertas
{
    [RoutePrefix("api/Alertas")]
    public class AlertasController : ApiController
    {
        //GET Alertas
        [Route("ObtenerGarantiasProximasVencer")]
        [HttpGet]
        public void ObtenerGarantiasProximasVencer()
        {
            var alertasBL = new AlertasBL();
            var result = alertasBL.ObtenerGarantiasProximasVencer().Result.ToList();
            if(result.Count() > 0)
            {
                EnvioAlertaGarantias(result);
            }


        }

        public string EnvioAlertaGarantias(List<GarantiaResultDTO> lista)
        {
            var plantillasBL = new PlantillasBL();
            //Envio de correo:
            var filtros = new FiltroPlantillaDTO();
            filtros.CodigoProceso = 7;
            filtros.CodigoPlantilla = "PLANGARANT";
            filtros.Usuario = User.ObtenerUsuario();
            filtros.Codigo = 0;

            var datos_correo = plantillasBL.ConsultarPlantillaCorreo(filtros).Result;

            var tabla = "<table style='border:1px solid black;'>";
            tabla += "<tr style='background:red;color:white;'>";
            tabla += "<td> N° de Solicitud </td>";
            tabla += "<td> Equipo </td>";
            tabla += "<td> Marca </td>";
            tabla += "<td> Modelo </td>";
            tabla += "<td> Código de Producto </td>";
            tabla += "<td> N° de Serie </td>";
            tabla += "<td> Fecha Instalación </td>";
            tabla += "<td> Valor Garantía </td>";
            tabla += "<td> Fecha Vencimiento </td>";
            tabla += "</tr>";
            foreach (var item in lista)
            {
                var num_sol = "000000" + item.Id_Solicitud.ToString();
                tabla += "<tr>";
                tabla += "<td>"+ num_sol.Substring(num_sol.Length - 6) + "</td>";
                tabla += "<td>"+item.Descripcion.ToString() + "</td>";
                tabla += "<td>" + item.Marca.ToString() + "</td>";
                tabla += "<td>" + item.Modelo.ToString() + "</td>";
                tabla += "<td>" + item.CodProducto.ToString() + "</td>";
                tabla += "<td>" + item.NumSerie.ToString() + "</td>";
                tabla += "<td>" + item.FechaInstalacion.ToString("dd/MM/yyyy") + "</td>";
                tabla += "<td>" + item.ValorGarantia.ToString() + "</td>";
                tabla += "<td>" + item.FechaVencimiento.ToString("dd/MM/yyyy") + "</td>";
                tabla += "</tr>";
            }
            tabla += "</table>";

            datos_correo.Body = datos_correo.Body.Replace("{TABLA_DETALLE}",tabla);
            var respuesta = Utilidades.Send(datos_correo.To, datos_correo.CC, "", datos_correo.Subject, datos_correo.Body, null, "");
            CCLog Log = new CCLog();
            Log.TraceInfo("Envio de alerta de garantias:" + respuesta);
            return "ok";
        }
    }
}