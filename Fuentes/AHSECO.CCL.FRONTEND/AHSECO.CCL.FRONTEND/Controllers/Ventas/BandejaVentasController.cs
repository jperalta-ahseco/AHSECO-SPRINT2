﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using AHSECO.CCL.FRONTEND.Identity;
using AHSECO.CCL.BE;
using AHSECO.CCL.BL;
using Microsoft.Ajax.Utilities;
using AHSECO.CCL.BE.Mantenimiento;
using AHSECO.CCL.FRONTEND.Core;
using AHSECO.CCL.FRONTEND.Security;

namespace AHSECO.CCL.FRONTEND.Controllers.Ventas
{
    public class BandejaVentasController : Controller
    {
        //GET BandejaVentas
        [Permissions(Permissions = "BANDEJAVENTAS")]
        public ActionResult Index()
        {
            var NumeroDocumento = "";
            var idUsuario = User.ObtenerIdUsuario();
            ViewBag.CodUsuario = idUsuario;

            var procesosBL = new ProcesosBL();
            var roles = procesosBL.ConsultaWorkFLowRoles(User.ObtenerUsuario(), 1).Result.FirstOrDefault();

            var detalleEmpleado = new EmpleadoDTO()
            {
                CodigoEmpleado = 0,
                NombresCompletosEmpleado = ""};


            VariableSesion.setCadena("VENTA_NOMBRE_ROL",roles.NombreRol);

            var NombreRol = VariableSesion.getCadena("VENTA_NOMBRE_ROL");

            ViewBag.CodigoArea = roles.CodigoArea;

            if (NombreRol == "SGI_VENTA_ASESOR")
            {
                var usuarioBL = new UsuarioBL();
                var empleadosBL = new EmpleadosBL();

                List<IEnumerable<UsuarioDTO>> usuarios = new List<IEnumerable<UsuarioDTO>>();
                List<IEnumerable<EmpleadoDTO>> empleados = new List<IEnumerable<EmpleadoDTO>>();

                var usuarioDTO = new UsuarioDTO()
                {
                    Id = Int32.Parse(idUsuario)
                };
                var result = usuarioBL.Obtener(usuarioDTO);

                usuarios.Add(usuarioBL.Obtener(usuarioDTO).Result);

                foreach (var usuario in usuarios)
                {
                    foreach (var detalle in usuario)
                    {
                        NumeroDocumento = detalle.NumeroDocumento; //Obtengo número de documento del trabajador en la TBM_SEGURIDAD_USUARIO
                    }
                };

                var empleadosDTO = new FiltroEmpleadosDTO()
                {
                    CodigoEmpleado = 0,
                    NombreEmpleado = null,
                    ApellidoPaternoEmpleado = null,
                    ApellidoMaternoEmpleado = null,
                    CodigoCargo = null,
                    TipoDocumento = null,
                    TipoEmpleado = null,
                    NumeroDocumento = NumeroDocumento,
                    Estado = 2,
                    FechaInicio = null,
                    FechaFinal = null,
                };

                empleados.Add(empleadosBL.ListarEmpleados(empleadosDTO).Result);

                foreach (var empleado in empleados)
                {
                    foreach (var detalle in empleado)
                    {
                        ViewBag.CodEmpleado = detalle.CodigoEmpleado.ToString(); ////Obtengo código de empleado de TBM_EMPLEADO.
                        ViewBag.Asesor = detalle.NombresCompletosEmpleado;

                        detalleEmpleado.CodigoEmpleado = detalle.CodigoEmpleado;
                        detalleEmpleado.NombresCompletosEmpleado = detalle.NombresCompletosEmpleado;
                    };
                };
            };

            VariableSesion.setObject("VENTA_EMPLEADO", detalleEmpleado); //Encapsulamos información relevante del empleado.

            return View();
        }
        
        public JsonResult InicializaDetalle(ClienteDTO clienteDTO)
        {
            VariableSesion.setObject("VENTA_CLIENTE", clienteDTO);

            return Json(new
            {
                Status = 1
            });
        } 
    }
}