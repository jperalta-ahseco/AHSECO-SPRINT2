﻿using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using static AHSECO.CCL.COMUN.ConstantesDTO.CotizacionVenta;

namespace AHSECO.CCL.BE.ServicioTecnico.BandejaGarantias
{
    public class ReclamosDTO : CamposAuditoriaDTO
    {
        public long Id_Reclamo         {get;set;}
        public long Id_Workflow        {get;set;}
        public long Id_Solicitud       {get;set;}
        public string RucEmpresa       {get;set;}
        public string NomEmpresa       {get;set;}
        public string Ubicacion        {get;set;}
        public string NombreContacto   {get;set;}
        public string TelefonoContacto {get;set;}
        public string CargoContacto    {get;set;}
        public string Establecimiento  {get;set;}
        public string TipoVenta        {get;set;}
        public string CodTipoVenta     { get; set; }
        public string OrdenCompra      {get;set;}
        public int    NumProceso       {get;set;}
        public string TipoProceso      {get;set;}
        public string Contrato         {get;set;}
        public string RazonSocial      { get; set; }
        public string CodEmpresa       {get;set;}
        public string Vendedor         {get;set;}
        public string CodigoProducto   {get;set;}
        public string Descripcion      {get;set;}
        public string Marca            {get;set;}
        public string Modelo           {get;set;}
        public string Serie            {get;set;}
        public string NumFianza        {get;set;}
        public string FechaInstalacion {get;set;}
        public string Ubigeo           {get;set;}
        public string CodUbigeo        { get; set; }
        public string Direccion        {get;set;}
        public string Urgencia         {get;set;}
        public string CodUrgencia      {get;set;}
        public string Motivo           {get;set;}
        public string Estado           {get;set;}
        public string CodEstado           {get;set;}
    }
}