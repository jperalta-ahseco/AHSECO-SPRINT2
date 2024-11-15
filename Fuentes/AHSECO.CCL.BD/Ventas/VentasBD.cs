﻿using AHSECO.CCL.BE;
using AHSECO.CCL.BE.Ventas;
using AHSECO.CCL.COMUN;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using static AHSECO.CCL.COMUN.ConstantesDTO.CotizacionVentaDetalle;

namespace AHSECO.CCL.BD.Ventas
{
    public class VentasBD
    {
        CCLog Log;
        public VentasBD() : this(new CCLog())
        {}

        public VentasBD(CCLog log)
        {
            Log = log;
        }

        public IEnumerable<SolicitudDTO> ObtenerSolicitudes(SolicitudDTO solicitudDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());

            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("isIdCliente", solicitudDTO.IdCliente);
                parameters.Add("isIdSolicitud", solicitudDTO.Id_Solicitud);
                if (solicitudDTO.Estado != null) { parameters.Add("isEstado", solicitudDTO.Estado); }
                else { parameters.Add("isEstado", DBNull.Value, DbType.String, ParameterDirection.Input); }
                if (solicitudDTO.Tipo_Sol != null) { parameters.Add("isTipoSol", solicitudDTO.Tipo_Sol); }
                else { parameters.Add("isTipoSol", DBNull.Value, DbType.String, ParameterDirection.Input); }

                var result = connection.Query(
                    sql: "USP_SEL_SOLICITUDES",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new SolicitudDTO
                    {
                        Id_Solicitud = i.Single(d => d.Key.Equals("ID_SOLICITUD")).Value.Parse<long>(),
                        Id_WorkFlow = i.Single(d => d.Key.Equals("ID_WORKFLOW")).Value.Parse<long>(),
                        nomFlujo = i.Single(d => d.Key.Equals("FLUJO")).Value.Parse<string>(),
                        Id_Flujo = i.Single(d => d.Key.Equals("CODFLUJO")).Value.Parse<int>(), 
                        NomTipoSol = i.Single(d => d.Key.Equals("TIPO")).Value.Parse<string>(),
                        Tipo_Sol = i.Single(d => d.Key.Equals("CODTIPOSOL")).Value.Parse<string>(),
                        Fecha_Sol = i.Single(d => d.Key.Equals("FECHA_SOL")).Value.Parse<string>(),
                        Estado = i.Single(d => d.Key.Equals("ESTADO")).Value.Parse<string>(),
                        nomEstado = Utilidades.Parse<string>(i.Single(d => d.Key.Equals("NOM_ESTADO")).Value),
                        abrevEstado = Utilidades.Parse<string>(i.Single(d => d.Key.Equals("ABREV_ESTADO")).Value),
                        Cod_MedioCont = i.Single(d => d.Key.Equals("COD_MEDIOCONT")).Value.Parse<string>(),
                        IdCliente = i.Single(d => d.Key.Equals("IDCLIENTE")).Value.Parse<int>(),
                        RUC = i.Single(d => d.Key.Equals("RUC")).Value.Parse<string>(),
                        RazonSocial = i.Single(d => d.Key.Equals("RAZONSOCIAL")).Value.Parse<string>(),
                        AsesorVenta = i.Single(d => d.Key.Equals("ASESORVENTA")).Value.Parse<string>()
                    });

                connection.Close();
                return result;
            };
        }

        public IEnumerable<CotizacionDTO> ObtenerCotizacionVenta(CotizacionDTO cotizacionDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());

            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("pId_Cotizacion", cotizacionDTO.IdCotizacion,DbType.Int32,ParameterDirection.Input);
                parameters.Add("pId_Solicitud", cotizacionDTO.IdSolicitud, DbType.Int32, ParameterDirection.Input);
                if (cotizacionDTO.FecCotizacion.HasValue)
                {
                    parameters.Add("pFec_Cotizacion", cotizacionDTO.FecCotizacion.Value, DbType.DateTime, ParameterDirection.Input);
                }
                else
                {
                    parameters.Add("pFec_Cotizacion", DBNull.Value, DbType.DateTime, ParameterDirection.Input);
                }
                parameters.Add("pEstado", cotizacionDTO.Estado, DbType.String, ParameterDirection.Input);

                var result = connection.Query(
                    sql: "USP_SEL_COTIZACIONVENTA",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new CotizacionDTO
                    {
                        IdCotizacion = i.Single(d => d.Key.Equals("ID_COTIZACION")).Value.Parse<int>(),
                        IdSolicitud = i.Single(d => d.Key.Equals("ID_SOLICITUD")).Value.Parse<int>(),
                        FecCotizacion = i.Single(d => d.Key.Equals("FEC_COTIZACION")).Value.Parse<DateTime>(),
                        IdContacto = Utilidades.Parse<int?>(i.Single(d => d.Key.Equals("IDCONTACTO")).Value),
                        NombreContacto = i.Single(d => d.Key.Equals("NOMBRECONTACTO")).Value.Parse<string>(),
                        AreaContacto = i.Single(d => d.Key.Equals("AREACONTACTO")).Value.Parse<string>(),
                        TelefonoContacto = i.Single(d => d.Key.Equals("TELEFONOCONTACTO")).Value.Parse<string>(),
                        EmailContacto = i.Single(d => d.Key.Equals("EMAILCONTACTO")).Value.Parse<string>(),
                        PlazoEntrega = i.Single(d => d.Key.Equals("PLAZOENTREGA")).Value.Parse<int>(),
                        FormaPago = i.Single(d => d.Key.Equals("FORMAPAGO")).Value.Parse<string>(),
                        Moneda = i.Single(d => d.Key.Equals("MONEDA")).Value.Parse<string>(),
                        Vigencia = i.Single(d => d.Key.Equals("VIGENCIA")).Value.Parse<string>(),
                        Garantia = i.Single(d => d.Key.Equals("GARANTIA")).Value.Parse<string>(),
                        Observacion = Utilidades.Parse<string>(i.Single(d => d.Key.Equals("OBSERVACION")).Value),
                        PorcentajeDescuento = Utilidades.Parse<decimal?>(i.Single(d => d.Key.Equals("PORCDSCTO")).Value),
                        SubtotalVenta = Utilidades.Parse<decimal?>(i.Single(d => d.Key.Equals("SUBTOTALVENTA")).Value),
                        MontoIGV = Utilidades.Parse<decimal?>(i.Single(d => d.Key.Equals("MONTOIGV")).Value),
                        TotalVenta = Utilidades.Parse<decimal?>(i.Single(d => d.Key.Equals("TOTALVENTA")).Value),
                        Estado = i.Single(d => d.Key.Equals("ESTADO")).Value.Parse<string>(),
                        UsuarioRegistra = i.Single(d => d.Key.Equals("USR_REG")).Value.Parse<string>(),
                        FechaRegistro = i.Single(d => d.Key.Equals("FEC_REG")).Value.Parse<DateTime>(),
                        UsuarioModifica = Utilidades.Parse<string>(i.Single(d => d.Key.Equals("USR_MOD")).Value),
                        FechaModifica = Utilidades.Parse<DateTime>(i.Single(d => d.Key.Equals("FEC_MOD")).Value)
                    });

                connection.Close();
                return result;
            };
        }

        public IEnumerable<CotizacionDetalleDTO> ObtenerCotizacionVentaDetalle(CotizacionDetalleDTO cotizaciondetDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());

            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("pId_Cotizacion", cotizaciondetDTO.IdCotizacion, DbType.Int32, ParameterDirection.Input);

                var result = connection.Query(
                    sql: "USP_SEL_COTIZACIONVENTADETALLE",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new CotizacionDetalleDTO
                    {
                        Id = i.Single(d => d.Key.Equals("ID")).Value.Parse<int>(),
                        IdCotizacion = i.Single(d => d.Key.Equals("ID_COTIZACION")).Value.Parse<int>(),
                        NroItem = i.Single(d => d.Key.Equals("NROITEM")).Value.Parse<int>(),
                        TipoItem = i.Single(d => d.Key.Equals("TIPOITEM")).Value.Parse<string>(),
                        CodItem = i.Single(d => d.Key.Equals("CODITEM")).Value.Parse<string>(),
                        Descripcion = i.Single(d => d.Key.Equals("DESCRIPCION")).Value.Parse<string>(),
                        DescripcionAdicional = i.Single(d => d.Key.Equals("DESCRIPADIC")).Value.Parse<string>(),
                        Stock = i.Single(d => d.Key.Equals("STOCK")).Value.Parse<int>(),
                        CodUnidad = i.Single(d => d.Key.Equals("UNDMED")).Value.Parse<string>(),
                        Cantidad = i.Single(d => d.Key.Equals("CANTIDAD")).Value.Parse<int>(),
                        CostoFOB = i.Single(d => d.Key.Equals("COSTOFOB")).Value.Parse<decimal?>(),
                        VentaUnitaria = i.Single(d => d.Key.Equals("VVENTAUNI")).Value.Parse<decimal?>(),
                        VentaTotalSinIGV = i.Single(d => d.Key.Equals("VVTOTALSIGV")).Value.Parse<decimal?>(),
                        PorcentajeGanancia = i.Single(d => d.Key.Equals("PORCGANANCIA")).Value.Parse<decimal?>(),
                        VentaTotalSinIGVConGanacia = i.Single(d => d.Key.Equals("VVTOTALSIGVCGAN")).Value.Parse<decimal?>(),
                        MontoDescuento = i.Single(d => d.Key.Equals("MONTODSCTO")).Value.Parse<decimal?>(),
                        VentaTotalSinIGVDscto = i.Single(d => d.Key.Equals("VVTOTALSIGVDSCTO")).Value.Parse<decimal?>(),
                        CotizacionDespacho = new CotDetDespachoDTO()
                        {
                            Id = Utilidades.Parse<int>(i.Single(d => d.Key.Equals("ID_COTDETDESPACHO")).Value),
                            IndInfoVideo = Utilidades.parseObjectToBool(i.Single(d => d.Key.Equals("INDINFOVIDEO")).Value.Parse<string>()),
                            IndInfoManual = Utilidades.parseObjectToBool(i.Single(d => d.Key.Equals("INDINFOMANUAL")).Value.Parse<string>()),
                            IndInstaCapa = Utilidades.parseObjectToBool(i.Single(d => d.Key.Equals("INDINSTACAPA")).Value.Parse<string>()),
                            IndGarantiaAdicional = Utilidades.parseObjectToBool(i.Single(d => d.Key.Equals("INDGARANADIC")).Value.Parse<string>()),
                            IndMantPreventivo = Utilidades.parseObjectToBool(i.Single(d => d.Key.Equals("INDMANTPREVENT")).Value.Parse<string>()),
                            IndLLaveMano = Utilidades.parseObjectToBool(i.Single(d => d.Key.Equals("INDLLAVEMANO")).Value.Parse<string>()),
                            Dimensiones = i.Single(d => d.Key.Equals("DIMENSIONES")).Value.Parse<string>(),
                            IndCompraLocal = Utilidades.parseObjectToBool(i.Single(d => d.Key.Equals("INDCOMPRALOCAL")).Value.Parse<string>()),
                            ObsCliente = i.Single(d => d.Key.Equals("OBSCLIENTE")).Value.Parse<string>(),
                            IndRequierePlaca = Utilidades.parseObjectToBool(i.Single(d => d.Key.Equals("INDREQPLACA")).Value.Parse<string>()),
                            ObsDespacho = i.Single(d => d.Key.Equals("OBSDESPACHO")).Value.Parse<string>(),
                            FecLimInsta = i.Single(d => d.Key.Equals("FECLIMINSTA")).Value.Parse<DateTime?>(),
                            MontoTotalCosto = i.Single(d => d.Key.Equals("MTOTOTALCOSTO")).Value.Parse<decimal?>(),
                            IndFianza = Utilidades.parseObjectToBool(i.Single(d => d.Key.Equals("INDFIANZA")).Value.Parse<string>()),
                            NumFianza = i.Single(d => d.Key.Equals("NUMFIANZA")).Value.Parse<string>(),
                            MontoPrestPrin = i.Single(d => d.Key.Equals("MONTOPPRINC")).Value.Parse<decimal?>(),
                            MontoPrestAcc = i.Single(d => d.Key.Equals("MONTOPACCE")).Value.Parse<decimal?>()
                        }
                    });

                connection.Close();
                return result;
            };
        }

        public RespuestaDTO MantenimientoSolicitudes(SolicitudDTO solicitudDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();

                parameters.Add("IsTipoProceso", solicitudDTO.IsTipoProceso);
                parameters.Add("isCodSolicitud", solicitudDTO.Id_Solicitud);
                parameters.Add("IsID_WORKFLOW",solicitudDTO.Id_WorkFlow);
                parameters.Add("IsID_FLUJO", solicitudDTO.Id_Flujo);
                parameters.Add("IsTipoVenta", solicitudDTO.TipoVenta);
                parameters.Add("IsFECHA_SOL", solicitudDTO.Fecha_Sol);
                parameters.Add("IsTIPO_SOL", solicitudDTO.Tipo_Sol);
                parameters.Add("IsCOD_MEDIOCONT", solicitudDTO.Cod_MedioCont);
                parameters.Add("IsIDCLIENTE", solicitudDTO.IdCliente);
                parameters.Add("IsRUC", solicitudDTO.RUC);
                parameters.Add("IsRAZONSOCIAL", solicitudDTO.RazonSocial);
                parameters.Add("IsASESORVENTA", solicitudDTO.AsesorVenta);
                parameters.Add("IsESTADO", solicitudDTO.Estado);
                parameters.Add("IsCOD_EMPRESA", solicitudDTO.Cod_Empresa);
                parameters.Add("TipoProceso", solicitudDTO.TipoProceso);
                parameters.Add("NumProceso", solicitudDTO.NroProceso);
                parameters.Add("isUsrEjecuta", solicitudDTO.UsuarioRegistra);
                parameters.Add("isIP_Ejecuta", solicitudDTO.IpMaquinaRegistro);

                var result = connection.Query(
                    sql: "USP_MANT_MAIN_SOLICITUDES",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                     .Select(s => s as IDictionary<string, object>)
                     .Select(i => new RespuestaDTO
                     {
                         Codigo = i.Single(d => d.Key.Equals("COD")).Value.Parse<int>(),
                         Mensaje = i.Single(d => d.Key.Equals("MSG")).Value.Parse<string>()
                     }).FirstOrDefault();

                connection.Close();
                return result;
            }
        }

        public RespuestaDTO MantenimientoCotizacion(CotizacionDTO cotizacion)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();

                parameters.Add("IsTipoProceso",cotizacion.TipoProceso);
                parameters.Add("isIdCotizacion", cotizacion.IdCotizacion);
                parameters.Add("isID_SOLICITUD", cotizacion.IdSolicitud);
                parameters.Add("isFEC_COTIZACION", cotizacion.FecCotizacion);
                if (cotizacion.IdContacto.HasValue) { parameters.Add("isIDCONTACTO", cotizacion.IdContacto.Value); }
                else { parameters.Add("isIDCONTACTO", DBNull.Value); }
                parameters.Add("isNOMBRECONTACTO", cotizacion.NombreContacto);
                parameters.Add("isAREACONTACTO", cotizacion.AreaContacto);
                parameters.Add("isTELEFONOCONTACTO", cotizacion.TelefonoContacto);
                parameters.Add("isEMAILCONTACTO", cotizacion.EmailContacto);
                parameters.Add("isPLAZOENTREGA", cotizacion.PlazoEntrega);
                parameters.Add("isFORMAPAGO", cotizacion.FormaPago);
                parameters.Add("isMONEDA", cotizacion.Moneda);
                parameters.Add("isVIGENCIA", cotizacion.Vigencia);
                parameters.Add("isGARANTIA", cotizacion.Garantia);
                parameters.Add("isOBSERVACION", cotizacion.Observacion);
                parameters.Add("isESTADO", cotizacion.Estado);
                parameters.Add("isUsrEjecuta", cotizacion.UsuarioRegistra);
                parameters.Add("isFecEjecucion", cotizacion.FechaRegistro);

                var result = connection.Query(
                    sql: "USP_MANT_TBM_COTIZACIONVENTA",
                    param : parameters,
                    commandType: CommandType.StoredProcedure)
                     .Select(s => s as IDictionary<string, object>)
                     .Select(i => new RespuestaDTO
                     {
                         Codigo = i.Single(d => d.Key.Equals("COD")).Value.Parse<int>(),
                         Mensaje = i.Single(d => d.Key.Equals("MSG")).Value.Parse<string>()
                     }).FirstOrDefault();

                connection.Close();
                return result;
            }
        }

        public RespuestaDTO MantenimientoCotizacionDetalle(CotizacionDetalleDTO detalleCotizacion)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using ( var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();

                parameters.Add("isTipoProceso",detalleCotizacion.TipoProceso);
                parameters.Add("isID", detalleCotizacion.Id);
                parameters.Add("isID_COTIZACION", detalleCotizacion.IdCotizacion);
                parameters.Add("isNROITEM", detalleCotizacion.NroItem);
                parameters.Add("isTIPOITEM", detalleCotizacion.TipoItem);
                parameters.Add("isCODITEM", detalleCotizacion.CodItem);
                parameters.Add("isDESCRIPCION", detalleCotizacion.Descripcion);
                parameters.Add("isDESCRIPADIC", detalleCotizacion.DescripcionAdicional);
                parameters.Add("isSTOCK", detalleCotizacion.Stock);
                parameters.Add("isUNDMED", detalleCotizacion.CodUnidad);
                parameters.Add("isCANTIDAD", detalleCotizacion.Cantidad);
                if (detalleCotizacion.CostoFOB.HasValue)
                { parameters.Add("isCOSTOFOB", detalleCotizacion.CostoFOB.Value); }
                else
                { parameters.Add("isCOSTOFOB", DBNull.Value, DbType.Decimal); }
                if (detalleCotizacion.VentaUnitaria.HasValue)
                { parameters.Add("isVVENTAUNI", detalleCotizacion.VentaUnitaria.Value); }
                else
                { parameters.Add("isVVENTAUNI", DBNull.Value, DbType.Decimal); }
                if (detalleCotizacion.PorcentajeGanancia.HasValue)
                { parameters.Add("isPORCGANANCIA", detalleCotizacion.PorcentajeGanancia.Value); }
                else
                { parameters.Add("isPORCGANANCIA", DBNull.Value, DbType.Decimal); }
                parameters.Add("isUsrEjecuta",detalleCotizacion.UsuarioRegistra);
                parameters.Add("isFecEjecuta", detalleCotizacion.FechaRegistro);

                var result = connection.Query(
                    sql: "USP_MANT_TBD_COTIZACIONVENTA",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new RespuestaDTO
                    {
                        Codigo = i.Single(d => d.Key.Equals("COD")).Value.Parse<int>(),
                        Mensaje = i.Single(d => d.Key.Equals("MSG")).Value.Parse<string>()
                    }).FirstOrDefault();

                connection.Close();
                return result;
            }
        }

        public RespuestaDTO MantenimientoCotiDetDespacho(CotDetDespachoDTO detCotDespacho)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();

                parameters.Add("pTipoProceso", detCotDespacho.TipoProceso);
                parameters.Add("pId_CodDetalle", detCotDespacho.IdCotizacionDetalle);
                parameters.Add("pIndInfoVideo", Utilidades.ParseStringSN<bool?>(detCotDespacho.IndInfoVideo), DbType.String);
                parameters.Add("pIndInfoManual", Utilidades.ParseStringSN<bool?>(detCotDespacho.IndInfoManual), DbType.String);
                parameters.Add("pIndInstaCapa", Utilidades.ParseStringSN<bool?>(detCotDespacho.IndInstaCapa), DbType.String);
                parameters.Add("pIndGarantiaAdic", Utilidades.ParseStringSN<bool?>(detCotDespacho.IndGarantiaAdicional), DbType.String);
                parameters.Add("pIndMantPrevent", Utilidades.ParseStringSN<bool?>(detCotDespacho.IndMantPreventivo), DbType.String);
                parameters.Add("pIndLLaveMano", Utilidades.ParseStringSN<bool?>(detCotDespacho.IndLLaveMano), DbType.String);
                parameters.Add("pDimensiones", detCotDespacho.Dimensiones);
                parameters.Add("pIndCompraLocal", Utilidades.ParseStringSN<bool?>(detCotDespacho.IndCompraLocal), DbType.String);
                parameters.Add("pObsCliente", detCotDespacho.ObsCliente);
                parameters.Add("pIndReqPlaca", Utilidades.ParseStringSN<bool?>(detCotDespacho.IndRequierePlaca), DbType.String);
                parameters.Add("pObsDespacho", detCotDespacho.ObsDespacho);
                if (detCotDespacho.FecLimInsta.HasValue)
                { parameters.Add("pFecLimInsta", detCotDespacho.FecLimInsta.Value, DbType.DateTime); }
                else
                { parameters.Add("pFecLimInsta", DBNull.Value, DbType.DateTime); }
                if (detCotDespacho.MontoTotalCosto.HasValue)
                { parameters.Add("pMontoTotalCosto", detCotDespacho.MontoTotalCosto.Value,DbType.Decimal); }
                else
                { parameters.Add("pMontoTotalCosto", DBNull.Value, DbType.Decimal); }
                parameters.Add("pIndFianza", Utilidades.ParseStringSN<bool?>(detCotDespacho.IndFianza), DbType.String);
                parameters.Add("pNumFianza", detCotDespacho.NumFianza);
                if (detCotDespacho.MontoPrestPrin.HasValue)
                { parameters.Add("pMontoPPrinc", detCotDespacho.MontoPrestPrin.Value, DbType.Decimal); }
                else
                { parameters.Add("pMontoPPrinc", DBNull.Value, DbType.Decimal); }
                if (detCotDespacho.MontoPrestAcc.HasValue)
                { parameters.Add("pMontoPAcce", detCotDespacho.MontoPrestAcc.Value, DbType.Decimal); }
                else
                { parameters.Add("pMontoPAcce", DBNull.Value, DbType.Decimal); }
                parameters.Add("pUsuarioRegistro", detCotDespacho.UsuarioRegistra);

                var result = connection.Query(
                    sql: "USP_MANT_TBM_COTDET_DESPACHO",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new RespuestaDTO
                    {
                        Codigo = i.Single(d => d.Key.Equals("COD")).Value.Parse<int>(),
                        Mensaje = i.Single(d => d.Key.Equals("MSG")).Value.Parse<string>()
                    }).FirstOrDefault();

                connection.Close();
                return result;
            }
        }

        public RespuestaDTO MantenimientoObservaciones(ObservacionDTO observacionDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using ( var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("@IsTipoProceso", observacionDTO.TipoProceso);
                parameters.Add("@isID_WORKFLOW", observacionDTO.Id_WorkFlow);
                parameters.Add("@isESTADO_INSTANCIA", observacionDTO.Estado_Instancia);
                parameters.Add("@isOBSERVACION", observacionDTO.Observacion);
                parameters.Add("@isNOMBRE_USUARIO", observacionDTO.Nombre_Usuario);
                parameters.Add("@isPERFIL_USUARIO", observacionDTO.Perfil_Usuario);
                parameters.Add("@isUSR_REG", observacionDTO.UsuarioRegistra);

                var result = connection.Query(
                    sql: "USP_MANT_OBSERVACIONES",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                     .Select(s => s as IDictionary<string, object>)
                     .Select(i => new RespuestaDTO
                     {
                         Codigo = i.Single(d => d.Key.Equals("COD")).Value.Parse<int>(),
                         Mensaje = i.Single(d => d.Key.Equals("MSG")).Value.Parse<string>()
                     }).FirstOrDefault();

                connection.Close();
                return result;
            };
        }

        public SolicitudVentaGrupoDTO VerDetalleSolicitud(SolicitudDTO solicitudDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());

            using(var connection = Factory.ConnectionSingle())
            {
                var parameters = new DynamicParameters();
                parameters.Add("isIdSolicitud", solicitudDTO.Id_Solicitud);
                parameters.Add("isIdCliente", solicitudDTO.IdCliente);
                parameters.Add("isIdWorkFlow", solicitudDTO.Id_WorkFlow);

                SqlCommand command;
                var result = new SolicitudVentaGrupoDTO();
                string query = "exec USP_SEL_MAIN_SOLICITUD @isIdSolicitud=" + solicitudDTO.Id_Solicitud.ToString() + ", @isIdCliente="+ solicitudDTO.IdCliente.ToString() + ", @isIdWorkFlow="+ solicitudDTO.Id_WorkFlow.ToString();
                connection.Open();
                command = new SqlCommand(query, connection);

                using (var reader = command.ExecuteReader())
                {
                    reader.Read();
                    SolicitudDTO solicitud = new SolicitudDTO
                    {
                        Id_Solicitud = reader.IsDBNull(reader.GetOrdinal("ID_SOLICITUD")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_SOLICITUD")),
                        Id_WorkFlow = reader.IsDBNull(reader.GetOrdinal("ID_WORKFLOW")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_WORKFLOW")),
                        nomFlujo = reader.IsDBNull(reader.GetOrdinal("FLUJO")) ? "" : reader.GetString(reader.GetOrdinal("FLUJO")),
                        Id_Flujo = reader.IsDBNull(reader.GetOrdinal("CODFLUJO")) ? 0 : reader.GetInt32(reader.GetOrdinal("CODFLUJO")),
                        NomTipoSol = reader.IsDBNull(reader.GetOrdinal("TIPO")) ? "" : reader.GetString(reader.GetOrdinal("TIPO")),
                        Tipo_Sol = reader.IsDBNull(reader.GetOrdinal("CODTIPOSOL")) ? "" : reader.GetString(reader.GetOrdinal("CODTIPOSOL")),
                        Fecha_Sol = reader.IsDBNull(reader.GetOrdinal("FECHA_SOL")) ? "" : reader.GetString(reader.GetOrdinal("FECHA_SOL")),
                        nomEstado = reader.IsDBNull(reader.GetOrdinal("ESTADO")) ? "" : reader.GetString(reader.GetOrdinal("ESTADO")),
                        Cod_MedioCont = reader.IsDBNull(reader.GetOrdinal("COD_MEDIOCONT")) ? "" : reader.GetString(reader.GetOrdinal("COD_MEDIOCONT")),
                        IdCliente = reader.IsDBNull(reader.GetOrdinal("IDCLIENTE")) ? 0 : reader.GetInt32(reader.GetOrdinal("IDCLIENTE")),
                        RUC = reader.IsDBNull(reader.GetOrdinal("RUC")) ? "" : reader.GetString(reader.GetOrdinal("RUC")),
                        RazonSocial = reader.IsDBNull(reader.GetOrdinal("RAZONSOCIAL")) ? "" : reader.GetString(reader.GetOrdinal("RAZONSOCIAL")),
                        AsesorVenta = reader.IsDBNull(reader.GetOrdinal("ASESORVENTA")) ? "" : reader.GetString(reader.GetOrdinal("ASESORVENTA")),
                        Cod_Empresa = reader.IsDBNull(reader.GetOrdinal("COD_EMPRESA")) ? "" : reader.GetString(reader.GetOrdinal("COD_EMPRESA")),
                        TipoProceso = reader.IsDBNull(reader.GetOrdinal("TIPOPROCESO")) ? "" : reader.GetString(reader.GetOrdinal("TIPOPROCESO")),
                        NroProceso = reader.IsDBNull(reader.GetOrdinal("NROPROCESO")) ? "" : reader.GetString(reader.GetOrdinal("NROPROCESO")),
                        TipoVenta = reader.IsDBNull(reader.GetOrdinal("TIPOVENTA")) ? "" : reader.GetString(reader.GetOrdinal("TIPOVENTA")),
                        NombreTipoVenta = reader.IsDBNull(reader.GetOrdinal("NOMTIPOVENTA")) ? "" : reader.GetString(reader.GetOrdinal("NOMTIPOVENTA")),
                        NroCotizacionEliminado = reader.IsDBNull(reader.GetOrdinal("COTELIM")) ? 0 : reader.GetInt32(reader.GetOrdinal("COTELIM"))
                    };

                    reader.NextResult();

                    List<DocumentoDTO> _listaAdjuntos = new List<DocumentoDTO>();

                    while (reader.Read())
                    {
                        var documento = new DocumentoDTO
                        {
                            CodigoDocumento = reader.IsDBNull(reader.GetOrdinal("COD_DOCUMENTO")) ? 0 : reader.GetInt64(reader.GetOrdinal("COD_DOCUMENTO")),
                            CodigoWorkFlow = reader.IsDBNull(reader.GetOrdinal("ID_WORKFLOW")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_WORKFLOW")),
                            CodigoTipoDocumento = reader.IsDBNull(reader.GetOrdinal("COD_TIPODOC")) ? "" : reader.GetString(reader.GetOrdinal("COD_TIPODOC")),
                            NombreTipoDocumento = reader.IsDBNull(reader.GetOrdinal("NOMTIPODOC")) ? "" : reader.GetString(reader.GetOrdinal("NOMTIPODOC")),
                            NombreDocumento = reader.IsDBNull(reader.GetOrdinal("NOM_DOCUMENTO")) ? "" : reader.GetString(reader.GetOrdinal("NOM_DOCUMENTO")),
                            VerDocumento = reader.IsDBNull(reader.GetOrdinal("VER_DOCUMENTO")) ? false : reader.GetBoolean(reader.GetOrdinal("VER_DOCUMENTO")),
                            RutaDocumento = reader.IsDBNull(reader.GetOrdinal("RUTA_DOCUMENTO")) ? "" : reader.GetString(reader.GetOrdinal("RUTA_DOCUMENTO")),
                            NombreUsuario = reader.IsDBNull(reader.GetOrdinal("NOMBRE_USUARIO")) ? "" : reader.GetString(reader.GetOrdinal("NOMBRE_USUARIO")),
                            NombrePerfil = reader.IsDBNull(reader.GetOrdinal("PERFIL")) ? "" : reader.GetString(reader.GetOrdinal("PERFIL")),
                            Eliminado = reader.IsDBNull(reader.GetOrdinal("ELIMINADO")) ? 0 : reader.GetInt32(reader.GetOrdinal("ELIMINADO")),
                            UsuarioRegistra = reader.IsDBNull(reader.GetOrdinal("USR_REG")) ? "" : reader.GetString(reader.GetOrdinal("USR_REG")),
                            FechaRegistroFormat = reader.IsDBNull(reader.GetOrdinal("FEC_REG")) ? "" : reader.GetString(reader.GetOrdinal("FEC_REG")),
                        };
                        _listaAdjuntos.Add(documento);
                    };

                    reader.NextResult();

                    List<ObservacionDTO> _listaObservaciones = new List<ObservacionDTO>();

                    while (reader.Read())
                    {
                        var observacion = new ObservacionDTO
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("ID_OBSERVACION")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_OBSERVACION")),
                            Id_WorkFlow = reader.IsDBNull(reader.GetOrdinal("ID_WORKFLOW")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_WORKFLOW")),
                            Estado_Instancia = reader.IsDBNull(reader.GetOrdinal("ESTADO_INSTANCIA")) ? "" : reader.GetString(reader.GetOrdinal("ESTADO_INSTANCIA")),
                            Observacion = reader.IsDBNull(reader.GetOrdinal("OBSERVACION")) ? "" : reader.GetString(reader.GetOrdinal("OBSERVACION")),
                            Nombre_Usuario= reader.IsDBNull(reader.GetOrdinal("NOMBRE_USUARIO")) ? "" : reader.GetString(reader.GetOrdinal("NOMBRE_USUARIO")),
                            Perfil_Usuario = reader.IsDBNull(reader.GetOrdinal("PERFIL_USUARIO")) ? "" : reader.GetString(reader.GetOrdinal("PERFIL_USUARIO")),
                            UsuarioRegistra = reader.IsDBNull(reader.GetOrdinal("USR_REG")) ? "" : reader.GetString(reader.GetOrdinal("USR_REG")),
                            Fecha_Registro = reader.IsDBNull(reader.GetOrdinal("FEC_REG")) ? "" : reader.GetString(reader.GetOrdinal("FEC_REG"))
                        };
                        _listaObservaciones.Add(observacion);
                    };

                    reader.NextResult();

                    List<WorkflowLogDTO> _listaSeguimiento = new List<WorkflowLogDTO>();

                    while (reader.Read())
                    {
                        var seguimiento = new WorkflowLogDTO()
                        {
                            CodigoWorkflowLog = reader.IsDBNull(reader.GetOrdinal("ID")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID")),
                            CodigoWorkflow = reader.IsDBNull(reader.GetOrdinal("ID_WORKFLOW")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_WORKFLOW")),
                            CodigoEstado = reader.IsDBNull(reader.GetOrdinal("COD_ESTADO")) ? "" : reader.GetString(reader.GetOrdinal("COD_ESTADO")),
                            DescripcionEstado = reader.IsDBNull(reader.GetOrdinal("DES_ESTADO")) ? "" : reader.GetString(reader.GetOrdinal("DES_ESTADO")),
                            Cargo = reader.IsDBNull(reader.GetOrdinal("CARGO")) ? "" : reader.GetString(reader.GetOrdinal("CARGO")),
                            Area = reader.IsDBNull(reader.GetOrdinal("AREA")) ? "" : reader.GetString(reader.GetOrdinal("AREA")),
                            UsuarioRegistro = reader.IsDBNull(reader.GetOrdinal("USR_REG")) ? "" : reader.GetString(reader.GetOrdinal("USR_REG")),
                            NombreUsuarioRegistro = reader.IsDBNull(reader.GetOrdinal("NOMBREUSRREGISTRO")) ? "" : reader.GetString(reader.GetOrdinal("NOMBREUSRREGISTRO")),
                            FechaRegistro = reader.IsDBNull(reader.GetOrdinal("FECREG")) ? "" : reader.GetString(reader.GetOrdinal("FECREG")),
                            HoraRegistro = reader.IsDBNull(reader.GetOrdinal("HORAREG")) ? "" : reader.GetString(reader.GetOrdinal("HORAREG")),
                        };
                        _listaSeguimiento.Add(seguimiento);
                    };

                    reader.NextResult();
                    ContadorCabeceraDespacho contadorCabecera = new ContadorCabeceraDespacho();
                    if (reader.HasRows)
                    {
                        reader.Read();
                        contadorCabecera = new ContadorCabeceraDespacho()
                        {
                            CodigoSolicitud = reader.IsDBNull(reader.GetOrdinal("ID_SOLICITUD")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_SOLICITUD")),
                            NumeroOrden = reader.IsDBNull(reader.GetOrdinal("NUMORDEN")) ? "" : reader.GetString(reader.GetOrdinal("NUMORDEN")),
                            FechaOrden = reader.IsDBNull(reader.GetOrdinal("FECHAORDEN")) ? "" : reader.GetString(reader.GetOrdinal("FECHAORDEN")),
                            FechaMaxima = reader.IsDBNull(reader.GetOrdinal("FECHAMAX")) ? "" : reader.GetString(reader.GetOrdinal("FECHAMAX")),
                            ContadorConStock = reader.IsDBNull(reader.GetOrdinal("CONT_CS")) ? 0 : reader.GetInt32(reader.GetOrdinal("CONT_CS")),
                            ContadorSinStock = reader.IsDBNull(reader.GetOrdinal("CONT_SS")) ? 0 : reader.GetInt32(reader.GetOrdinal("CONT_SS"))
                        };
                    }


                    reader.NextResult();
                    CabeceraDespachoDTO cabeceraDespachoconStock = new CabeceraDespachoDTO();
                    if (reader.HasRows)
                    {
                        reader.Read();
                        CabeceraDespachoDTO cabeceraDesconStock = new CabeceraDespachoDTO
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("ID")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID")),
                            CodigoSolicitud = reader.IsDBNull(reader.GetOrdinal("ID_SOLICITUD")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_SOLICITUD")),
                            Stock = reader.IsDBNull(reader.GetOrdinal("STOCK")) ? "" : reader.GetString(reader.GetOrdinal("STOCK")),
                            NumeroOrden = reader.IsDBNull(reader.GetOrdinal("NUMORDEN")) ? "" : reader.GetString(reader.GetOrdinal("NUMORDEN")),
                            FechaOrden = reader.IsDBNull(reader.GetOrdinal("FECHAORDEN")) ? "" : reader.GetString(reader.GetOrdinal("FECHAORDEN")),
                            FechaMaxima = reader.IsDBNull(reader.GetOrdinal("FECHAMAX")) ? "" : reader.GetString(reader.GetOrdinal("FECHAMAX")),
                            FechaEntrega = reader.IsDBNull(reader.GetOrdinal("FECHAENTREGA")) ? "" : reader.GetString(reader.GetOrdinal("FECHAENTREGA")),
                            NumeroFactura = reader.IsDBNull(reader.GetOrdinal("NUMFACTURA")) ? "" : reader.GetString(reader.GetOrdinal("NUMFACTURA")),
                            NumeroGuiaRemision = reader.IsDBNull(reader.GetOrdinal("NUMGUIAREM")) ? "" : reader.GetString(reader.GetOrdinal("NUMGUIAREM")),
                            NumeroPedido = reader.IsDBNull(reader.GetOrdinal("NUMPEDIDO")) ? "" : reader.GetString(reader.GetOrdinal("NUMPEDIDO")),
                            FechaIngreso = reader.IsDBNull(reader.GetOrdinal("FECHAINGRESO")) ? "" : reader.GetString(reader.GetOrdinal("FECHAINGRESO")),
                            EstadoAprobacion = reader.IsDBNull(reader.GetOrdinal("ESTAPROB")) ? "" : reader.GetString(reader.GetOrdinal("ESTAPROB")),
                            FechaAprobacion = reader.IsDBNull(reader.GetOrdinal("FECAPROB")) ? "" : reader.GetString(reader.GetOrdinal("FECAPROB")),
                            Observacion = reader.IsDBNull(reader.GetOrdinal("OBSERVACION")) ? "" : reader.GetString(reader.GetOrdinal("OBSERVACION")),
                            UsuarioRegistra = reader.IsDBNull(reader.GetOrdinal("USR_REG")) ? "" : reader.GetString(reader.GetOrdinal("USR_REG")),
                            FechaRegistro = reader.IsDBNull(reader.GetOrdinal("FEC_REG")) ? DateTime.Now : reader.GetDateTime(reader.GetOrdinal("FEC_REG")),
                            UsuarioModifica = reader.IsDBNull(reader.GetOrdinal("USR_MOD")) ? "" : reader.GetString(reader.GetOrdinal("USR_MOD")),
                            FechaModifica = reader.IsDBNull(reader.GetOrdinal("FEC_MOD")) ? DateTime.Now : reader.GetDateTime(reader.GetOrdinal("FEC_MOD"))
                        };

                        cabeceraDespachoconStock = cabeceraDesconStock;
                    }
                   

                    reader.NextResult();

                    List<DetalleDespachoDTO> _listaDetalleDespachoconStock = new List<DetalleDespachoDTO>();
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            var detalleDespachoConStock = new DetalleDespachoDTO()
                            {
                                RowNumber = reader.IsDBNull(reader.GetOrdinal("ROWNUM")) ? 0 : reader.GetInt64(reader.GetOrdinal("ROWNUM")),
                                CodigoEquipo = reader.IsDBNull(reader.GetOrdinal("CODEQUIPO")) ? "" : reader.GetString(reader.GetOrdinal("CODEQUIPO")),
                                DescripcionEquipo = reader.IsDBNull(reader.GetOrdinal("DESCRIPCION")) ? "" : reader.GetString(reader.GetOrdinal("DESCRIPCION")),
                                Marca = reader.IsDBNull(reader.GetOrdinal("MARCA")) ? "" : reader.GetString(reader.GetOrdinal("MARCA")),
                                NumeroSerie = reader.IsDBNull(reader.GetOrdinal("NUMSERIE")) ? "" : reader.GetString(reader.GetOrdinal("NUMSERIE"))
                            };
                            _listaDetalleDespachoconStock.Add(detalleDespachoConStock);
                        };
                    }
                   

                    reader.NextResult();
                    CabeceraDespachoDTO cabeceraDespachosinStock = new CabeceraDespachoDTO();
                    if (reader.HasRows)
                    {
                        reader.Read();
                        CabeceraDespachoDTO cabeceraDessinStock = new CabeceraDespachoDTO
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("ID")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID")),
                            CodigoSolicitud = reader.IsDBNull(reader.GetOrdinal("ID_SOLICITUD")) ? 0 : reader.GetInt64(reader.GetOrdinal("ID_SOLICITUD")),
                            Stock = reader.IsDBNull(reader.GetOrdinal("STOCK")) ? "" : reader.GetString(reader.GetOrdinal("STOCK")),
                            NumeroOrden = reader.IsDBNull(reader.GetOrdinal("NUMORDEN")) ? "" : reader.GetString(reader.GetOrdinal("NUMORDEN")),
                            FechaOrden = reader.IsDBNull(reader.GetOrdinal("FECHAORDEN")) ? "" : reader.GetString(reader.GetOrdinal("FECHAORDEN")),
                            FechaMaxima = reader.IsDBNull(reader.GetOrdinal("FECHAMAX")) ? "" : reader.GetString(reader.GetOrdinal("FECHAMAX")),
                            FechaEntrega = reader.IsDBNull(reader.GetOrdinal("FECHAENTREGA")) ? "" : reader.GetString(reader.GetOrdinal("FECHAENTREGA")),
                            NumeroFactura = reader.IsDBNull(reader.GetOrdinal("NUMFACTURA")) ? "" : reader.GetString(reader.GetOrdinal("NUMFACTURA")),
                            NumeroGuiaRemision = reader.IsDBNull(reader.GetOrdinal("NUMGUIAREM")) ? "" : reader.GetString(reader.GetOrdinal("NUMGUIAREM")),
                            NumeroPedido = reader.IsDBNull(reader.GetOrdinal("NUMPEDIDO")) ? "" : reader.GetString(reader.GetOrdinal("NUMPEDIDO")),
                            FechaIngreso = reader.IsDBNull(reader.GetOrdinal("FECHAINGRESO")) ? "" : reader.GetString(reader.GetOrdinal("FECHAINGRESO")),
                            EstadoAprobacion = reader.IsDBNull(reader.GetOrdinal("ESTAPROB")) ? "" : reader.GetString(reader.GetOrdinal("ESTAPROB")),
                            FechaAprobacion = reader.IsDBNull(reader.GetOrdinal("FECAPROB")) ? "" : reader.GetString(reader.GetOrdinal("FECAPROB")),
                            Observacion = reader.IsDBNull(reader.GetOrdinal("OBSERVACION")) ? "" : reader.GetString(reader.GetOrdinal("OBSERVACION")),
                            UsuarioRegistra = reader.IsDBNull(reader.GetOrdinal("USR_REG")) ? "" : reader.GetString(reader.GetOrdinal("USR_REG")),
                            FechaRegistro = reader.IsDBNull(reader.GetOrdinal("FEC_REG")) ? DateTime.Now : reader.GetDateTime(reader.GetOrdinal("FEC_REG")),
                            UsuarioModifica = reader.IsDBNull(reader.GetOrdinal("USR_MOD")) ? "" : reader.GetString(reader.GetOrdinal("USR_MOD")),
                            FechaModifica = reader.IsDBNull(reader.GetOrdinal("FEC_MOD")) ? DateTime.Now : reader.GetDateTime(reader.GetOrdinal("FEC_MOD"))
                        };
                        cabeceraDespachosinStock = cabeceraDessinStock;
                    }
                   

                    reader.NextResult();

                    List<DetalleDespachoDTO> _listaDetalleDespachosinStock = new List<DetalleDespachoDTO>();

                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            var detalleDespachoSinStock = new DetalleDespachoDTO()
                            {
                                RowNumber = reader.IsDBNull(reader.GetOrdinal("ROWNUM")) ? 0 : reader.GetInt64(reader.GetOrdinal("ROWNUM")),
                                CodigoEquipo = reader.IsDBNull(reader.GetOrdinal("CODEQUIPO")) ? "" : reader.GetString(reader.GetOrdinal("CODEQUIPO")),
                                DescripcionEquipo = reader.IsDBNull(reader.GetOrdinal("DESCRIPCION")) ? "" : reader.GetString(reader.GetOrdinal("DESCRIPCION")),
                                Marca = reader.IsDBNull(reader.GetOrdinal("MARCA")) ? "" : reader.GetString(reader.GetOrdinal("MARCA")),
                                NumeroSerie = reader.IsDBNull(reader.GetOrdinal("NUMSERIE")) ? "" : reader.GetString(reader.GetOrdinal("NUMSERIE"))
                            };
                            _listaDetalleDespachosinStock.Add(detalleDespachoSinStock);
                        };
                    }
                    


                    result.Solicitud = solicitud;
                    result.Adjuntos = _listaAdjuntos;
                    result.Observaciones = _listaObservaciones;
                    result.Seguimiento = _listaSeguimiento;
                    result.ContadorCabecera = contadorCabecera;
                    result.DespachoCabeceraConStock = cabeceraDespachoconStock;
                    result.DespachoDetalleConStock = _listaDetalleDespachoconStock;
                    result.DespachoCabeceraSinStock = cabeceraDespachosinStock;
                    result.DespachoDetalleSinStock = _listaDetalleDespachosinStock;
                };
                return result;
            };
        }

        public FiltroGrupoSolicitudVentaDTO GrupoSolicitudVentaFiltro(int codFlujo)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionSingle())
            {
                SqlCommand sqlcommand;
                var result = new FiltroGrupoSolicitudVentaDTO();
                string query = "exec USP_FILTROS_SOLICITUD_VENTAS @CodFlujo="+codFlujo.ToString();
                connection.Open();
                sqlcommand = new SqlCommand(query, connection);
                using (var reader = sqlcommand.ExecuteReader())
                {
                    List<ComboDTO> _flujos = new List<ComboDTO>();
                    while (reader.Read()) 
                    {
                        var flujo = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("CODSOL")) ? "" : reader.GetString(reader.GetOrdinal("CODSOL")),
                            Text = reader.IsDBNull(reader.GetOrdinal("FLUJOSOL")) ? "" : reader.GetString(reader.GetOrdinal("FLUJOSOL"))
                        };
                        _flujos.Add(flujo);
                    };

                    reader.NextResult();

                    List<ComboDTO> _tipoSol = new List<ComboDTO>();
                    while (reader.Read())
                    {
                        var tipSol = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("CODTIPOSOL")) ? "" : reader.GetString(reader.GetOrdinal("CODTIPOSOL")),
                            Text = reader.IsDBNull(reader.GetOrdinal("TIPOSOL")) ? "" : reader.GetString(reader.GetOrdinal("TIPOSOL"))
                        };
                        _tipoSol.Add(tipSol);
                    };

                    reader.NextResult();
                    List<ComboDTO> _medioContacto = new List<ComboDTO>();
                    while (reader.Read())
                    {
                        var medContacto = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("CODMED")) ? "" : reader.GetString(reader.GetOrdinal("CODMED")),
                            Text = reader.IsDBNull(reader.GetOrdinal("MEDIOCONTACT")) ? "" : reader.GetString(reader.GetOrdinal("MEDIOCONTACT"))
                        };
                        _medioContacto.Add(medContacto);
                    };

                    reader.NextResult();
                    List<ComboDTO> _tipMoneda = new List<ComboDTO>();
                    while (reader.Read())
                    {
                        var tipMoneda = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("CODMONEDA")) ? "" : reader.GetString(reader.GetOrdinal("CODMONEDA")),
                            Text = reader.IsDBNull(reader.GetOrdinal("MONEDA")) ? "" : reader.GetString(reader.GetOrdinal("MONEDA"))
                        };
                        _tipMoneda.Add(tipMoneda);
                    };

                    reader.NextResult();
                    List<ComboDTO> _garantias = new List<ComboDTO>();
                    while (reader.Read()) 
                    {
                        var garantia = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("CODGARANTIA")) ? "" : reader.GetString(reader.GetOrdinal("CODGARANTIA")),
                            Text = reader.IsDBNull(reader.GetOrdinal("NOMGARANTIA")) ? "" : reader.GetString(reader.GetOrdinal("NOMGARANTIA"))
                        };
                        _garantias.Add(garantia);
                    };

                    reader.NextResult();
                    List<ComboDTO> _formPago = new List<ComboDTO>();
                    while (reader.Read())
                    {
                        var pago = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("CODPAGO")) ? "" : reader.GetString(reader.GetOrdinal("CODPAGO")),
                            Text = reader.IsDBNull(reader.GetOrdinal("NOMPAGO")) ? "" : reader.GetString(reader.GetOrdinal("NOMPAGO"))
                        };
                        _formPago.Add(pago);
                    };

                    reader.NextResult();
                    List<ComboDTO> _empresas = new List<ComboDTO>();
                    while (reader.Read())
                    {
                        var emp = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("CODEMPRESA")) ? "" : reader.GetString(reader.GetOrdinal("CODEMPRESA")),
                            Text = reader.IsDBNull(reader.GetOrdinal("RAZONSOCIAL")) ? "" : reader.GetString(reader.GetOrdinal("RAZONSOCIAL"))
                        };
                        _empresas.Add(emp);
                    };

                    reader.NextResult();
                    List<ComboDTO> _tipoVenta = new List<ComboDTO>();
                    while (reader.Read())
                    {
                        var tventa = new ComboDTO()
                        {
                            Id = reader.IsDBNull(reader.GetOrdinal("CODTIPOVENTA")) ? "" : reader.GetString(reader.GetOrdinal("CODTIPOVENTA")),
                            Text = reader.IsDBNull(reader.GetOrdinal("TIPOVENTA")) ? "" : reader.GetString(reader.GetOrdinal("TIPOVENTA"))
                        };
                        _tipoVenta.Add(tventa);
                    };

                    result.Flujos = _flujos;
                    result.TipoSol = _tipoSol;
                    result.MedioContacto = _medioContacto;
                    result.TipoMoneda = _tipMoneda;
                    result.Garantias = _garantias;
                    result.FormPago = _formPago;
                    result.Empresas = _empresas;
                    result.TipoVenta = _tipoVenta;
                };
                return result;
            };
        }

        public bool ActualizarSolicitudEstado(SolicitudDTO solicitudDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();

                parameters.Add("isIdSolicitud", solicitudDTO.Id_Solicitud);
                parameters.Add("isESTADO", solicitudDTO.Estado);
                parameters.Add("isUsuarioModifica", solicitudDTO.UsuarioModifica);
                parameters.Add("isIpMaqModifica", solicitudDTO.IpMaquinaModifica);

                var result = connection.Execute
                (
                    sql: "USP_UPD_SOLICITUDVENTA_ESTADO",
                    param: parameters,
                    commandType: CommandType.StoredProcedure
                );

                connection.Close();
                return true;
            }
        }

        public IEnumerable<ProcesoEstadoDTO> ObtenerEstadosProcesos(ProcesoEstadoDTO procestDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());

            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("pID", procestDTO.Id, DbType.Int32, ParameterDirection.Input);
                parameters.Add("pIDPROCESO", procestDTO.IdProceso, DbType.Int32, ParameterDirection.Input);
                parameters.Add("pCODESTADO", procestDTO.CodigoEstado, DbType.String, ParameterDirection.Input);

                var result = connection.Query(
                    sql: "USP_SEL_PROCESOESTADOS",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new ProcesoEstadoDTO
                    {
                        Id = i.Single(d => d.Key.Equals("ID")).Value.Parse<int>(),
                        Proceso = new ProcesoDTO() { 
                            CodigoProceso = i.Single(d => d.Key.Equals("ID_PROCESO")).Value.Parse<int>(),
                            NombreProceso = i.Single(d => d.Key.Equals("NOMPROCESO")).Value.Parse<string>()
                        },
                        CodigoEstado = i.Single(d => d.Key.Equals("COD_ESTADO")).Value.Parse<string>(),
                        NombreEstado = i.Single(d => d.Key.Equals("NOM_ESTADO")).Value.Parse<string>(),
                        AbreviaturaEstado = i.Single(d => d.Key.Equals("ABREV_ESTADO")).Value.Parse<string>(),
                        Habilitado = i.Single(d => d.Key.Equals("HABILITADO")).Value.Parse<bool>()
                    });

                connection.Close();
                return result;
            };
        }

		public IEnumerable<HistorialCotizacionCabeceraDTO> ListarHistorialCotizacion(long codCotizacion, long codSolicitud)
        {
            Log.TraceInfo(Utilidades.GetCaller());

            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("pId_Cotizacion", codCotizacion);
                parameters.Add("pId_Solicitud", codSolicitud);

                var result = connection.Query(
                    sql: "USP_CONSULTA_HISTORIALCOTIZACION",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new HistorialCotizacionCabeceraDTO
                    {
                        IdCotizacion = i.Single(d => d.Key.Equals("ID_COTIZACION")).Value.Parse<long>(),
                        IdSolicitud = i.Single(d => d.Key.Equals("ID_SOLICITUD")).Value.Parse<long>(),
                        FecCotizacion = i.Single(d => d.Key.Equals("FEC_COTIZACION")).Value.Parse<string>(),
                        NombreContacto = i.Single(d => d.Key.Equals("NOMBRECONTACTO")).Value.Parse<string>(),
                        AreaContacto = i.Single(d => d.Key.Equals("AREACONTACTO")).Value.Parse<string>(),
                        TelefonoContacto = i.Single(d => d.Key.Equals("TELEFONOCONTACTO")).Value.Parse<string>(),
                        EmailContacto = i.Single(d => d.Key.Equals("EMAILCONTACTO")).Value.Parse<string>(),
                        PlazoEntrega = i.Single(d => d.Key.Equals("PLAZOENTREGA")).Value.Parse<string>(),
                        FormaPago = i.Single(d => d.Key.Equals("FORMAPAGO")).Value.Parse<string>(),
                        Moneda = i.Single(d => d.Key.Equals("MONEDA")).Value.Parse<string>(),
                        Vigencia = i.Single(d => d.Key.Equals("VIGENCIA")).Value.Parse<string>(),
                        Garantia = i.Single(d => d.Key.Equals("GARANTIA")).Value.Parse<string>(),
                        Estado = i.Single(d => d.Key.Equals("ESTADO")).Value.Parse<string>(),
                        UsuarioRegistro = i.Single(d => d.Key.Equals("USR_REG")).Value.Parse<string>(),
                        FechaRegistroFormat = i.Single(d => d.Key.Equals("FEC_REG")).Value.Parse<string>(),
                        UsuarioModifica = i.Single(d => d.Key.Equals("USR_MOD")).Value.Parse<string>(),
                        FechaModificacionFormat = i.Single(d => d.Key.Equals("FEC_MOD")).Value.Parse<string>()
                    });

                return result;
            };
        }

        public DocumentoCotizacionDTO ConsultaCotizacionCliente(long codCotizacion)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionSingle())
            {

                var parameters = new DynamicParameters();
                parameters.Add("COD_COTIZACION", codCotizacion);
                SqlCommand command;
                var result = new DocumentoCotizacionDTO();
                string query = "exec USP_CREAR_COTIZACIONCLIENTE @COD_COTIZACION=" +  codCotizacion.ToString();
                connection.Open();
                command = new SqlCommand(query, connection);


                using (var reader = command.ExecuteReader())
                {
                    reader.Read();
                    DocumentoCabCotizacionDTO _cabeceraCotizacion = new DocumentoCabCotizacionDTO()
                    {
                        RutaImagen = reader.IsDBNull(reader.GetOrdinal("RUTAIMAGEN")) ? "" : reader.GetString(reader.GetOrdinal("RUTAIMAGEN")),
                        NumeroCotizacion = reader.IsDBNull(reader.GetOrdinal("NUM_COTIZACION")) ? "" : reader.GetString(reader.GetOrdinal("NUM_COTIZACION")),
                        Encabezado = reader.IsDBNull(reader.GetOrdinal("ENCABEZADO")) ? "" : reader.GetString(reader.GetOrdinal("ENCABEZADO")),
                        Ruc = reader.IsDBNull(reader.GetOrdinal("RUC")) ? "" : reader.GetString(reader.GetOrdinal("RUC")),
                        Fecha = reader.IsDBNull(reader.GetOrdinal("FECHA")) ? "" : reader.GetString(reader.GetOrdinal("FECHA")),
                        RazonSocial = reader.IsDBNull(reader.GetOrdinal("RAZONSOCIAL")) ? "" : reader.GetString(reader.GetOrdinal("RAZONSOCIAL")),
                        NombreContacto = reader.IsDBNull(reader.GetOrdinal("NOMBRECONTACTO")) ? "" : reader.GetString(reader.GetOrdinal("NOMBRECONTACTO")),
                        AreaContacto = reader.IsDBNull(reader.GetOrdinal("AREA")) ? "" : reader.GetString(reader.GetOrdinal("AREA")),
                        TelefonoContacto = reader.IsDBNull(reader.GetOrdinal("TELEFONO")) ? "" : reader.GetString(reader.GetOrdinal("TELEFONO")),
                        EmailContacto = reader.IsDBNull(reader.GetOrdinal("CORREO")) ? "" : reader.GetString(reader.GetOrdinal("CORREO")),
                        PlazoEntrega = reader.IsDBNull(reader.GetOrdinal("PLAZOENTREGA")) ? "" : reader.GetString(reader.GetOrdinal("PLAZOENTREGA")),
                        FormaPago = reader.IsDBNull(reader.GetOrdinal("FORMAPAGO")) ? "" : reader.GetString(reader.GetOrdinal("FORMAPAGO")),
                        Moneda = reader.IsDBNull(reader.GetOrdinal("MONEDA")) ? "" : reader.GetString(reader.GetOrdinal("MONEDA")),
                        Vigencia = reader.IsDBNull(reader.GetOrdinal("VIGENCIA")) ? "" : reader.GetString(reader.GetOrdinal("VIGENCIA")),
                        Garantia = reader.IsDBNull(reader.GetOrdinal("GARANTIA")) ? "" : reader.GetString(reader.GetOrdinal("GARANTIA")),
                        Observacion = reader.IsDBNull(reader.GetOrdinal("OBSERVACION")) ? "" : reader.GetString(reader.GetOrdinal("OBSERVACION")),
                        Contrato = reader.IsDBNull(reader.GetOrdinal("CONTRATO")) ? "" : reader.GetString(reader.GetOrdinal("CONTRATO")),
                        NombreVendedor = reader.IsDBNull(reader.GetOrdinal("NOMBREVENDEDOR")) ? "" : reader.GetString(reader.GetOrdinal("NOMBREVENDEDOR")),
                        TelefonoVendedor = reader.IsDBNull(reader.GetOrdinal("TELEFONOVENDEDOR")) ? "" : reader.GetString(reader.GetOrdinal("TELEFONOVENDEDOR")),
                        EmailVendedor = reader.IsDBNull(reader.GetOrdinal("CORREOVENDEDOR")) ? "" : reader.GetString(reader.GetOrdinal("CORREOVENDEDOR")),
                        Pie = reader.IsDBNull(reader.GetOrdinal("PIE")) ? "" : reader.GetString(reader.GetOrdinal("PIE")),
                        Subtotal = reader.IsDBNull(reader.GetOrdinal("SUBTOTAL")) ? "" : reader.GetString(reader.GetOrdinal("SUBTOTAL")),
                        Igv = reader.IsDBNull(reader.GetOrdinal("IGV")) ? "" : reader.GetString(reader.GetOrdinal("IGV")),
                        Total = reader.IsDBNull(reader.GetOrdinal("TOTAL")) ? "" : reader.GetString(reader.GetOrdinal("TOTAL"))
                    };

                    result.DocumentoCabecera = _cabeceraCotizacion;

                    reader.NextResult();

                    List<DocumentoDetCotizacionDTO> _listadetalleCotizacion = new List<DocumentoDetCotizacionDTO>();

                    while (reader.Read())
                    {
                        var detalle = new DocumentoDetCotizacionDTO()
                        {
                            NumeroItem = reader.IsDBNull(reader.GetOrdinal("NROITEM")) ? "" : reader.GetString(reader.GetOrdinal("NROITEM")),
                            Catalogo = reader.IsDBNull(reader.GetOrdinal("CATALOGO")) ? "" : reader.GetString(reader.GetOrdinal("CATALOGO")),
                            Descripcion = reader.IsDBNull(reader.GetOrdinal("DESCRIPCION")) ? "" : reader.GetString(reader.GetOrdinal("DESCRIPCION")),
                            Unidad = reader.IsDBNull(reader.GetOrdinal("UNIDAD")) ? "" : reader.GetString(reader.GetOrdinal("UNIDAD")),
                            Cantidad = reader.IsDBNull(reader.GetOrdinal("CANTIDAD")) ? "" : reader.GetString(reader.GetOrdinal("CANTIDAD")),
                            PrecioUnitario = reader.IsDBNull(reader.GetOrdinal("PRECIOUNITARIO")) ? "" : reader.GetString(reader.GetOrdinal("PRECIOUNITARIO")),
                            Total = reader.IsDBNull(reader.GetOrdinal("TOTAL")) ? "" : reader.GetString(reader.GetOrdinal("TOTAL"))
                        };
                        _listadetalleCotizacion.Add(detalle);
                    }

                    result.DocumentoDetalle = _listadetalleCotizacion;
                    result.NroItems = _listadetalleCotizacion.Count();

                }

                return result;

            }
        }

        public IEnumerable<ArticuloDTO> ObtenerArticulosxFiltro(FiltroArticuloDTO filtro)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            try
            {
                using (var connection = Factory.ConnectionFactory())
                {
                    connection.Open();
                    var parameters = new DynamicParameters();
                    if (filtro.CodsArticulo != null) { parameters.Add("pAR_CCODIGO", filtro.CodsArticulo, DbType.String, ParameterDirection.Input); }
                    else { parameters.Add("pAR_CCODIGO", DBNull.Value, DbType.String, ParameterDirection.Input); }
                    if (filtro.DescArticulo != null) { parameters.Add("pAR_CDESCRI", filtro.DescArticulo, DbType.String, ParameterDirection.Input); }
                    else { parameters.Add("pAR_CDESCRI", DBNull.Value, DbType.String, ParameterDirection.Input); }
                    if (filtro.CodsUnidad != null) { parameters.Add("pAR_CUNIDAD", filtro.CodsUnidad, DbType.String, ParameterDirection.Input); }
                    else { parameters.Add("pAR_CUNIDAD", DBNull.Value, DbType.String, ParameterDirection.Input); }
                    if (filtro.CodsFamilia != null) { parameters.Add("pAR_CFAMILI", filtro.CodsFamilia, DbType.String, ParameterDirection.Input); }
                    else { parameters.Add("pAR_CFAMILI", DBNull.Value, DbType.String, ParameterDirection.Input); }
                    if (filtro.CodsLinea != null) { parameters.Add("pAR_CLINEA", filtro.CodsLinea, DbType.String, ParameterDirection.Input); }
                    else { parameters.Add("pAR_CLINEA", DBNull.Value, DbType.String, ParameterDirection.Input); }
                    if (filtro.CodsMarca != null) { parameters.Add("pAR_CMARCA", filtro.CodsMarca, DbType.String, ParameterDirection.Input); }
                    else { parameters.Add("pAR_CMARCA", DBNull.Value, DbType.String, ParameterDirection.Input); }
                    if (filtro.CodsAlma != null) { parameters.Add("pSK_CALMA", filtro.CodsAlma, DbType.String, ParameterDirection.Input); }
                    else { parameters.Add("pSK_CALMA", DBNull.Value, DbType.String, ParameterDirection.Input); }
                    if (filtro.CantidadRegistros != null) { parameters.Add("pCANTREG", filtro.CantidadRegistros.Value, DbType.Int32, ParameterDirection.Input); }
                    else { parameters.Add("pCANTREG", DBNull.Value, DbType.String, ParameterDirection.Input); }

                    var result = connection.Query(
                        sql: "USP_SEL_ARTICULOSXFILTRO",
                        param: parameters,
                        commandType: CommandType.StoredProcedure)
                        .Select(s => s as IDictionary<string, object>)
                        .Select(i => new ArticuloDTO
                        {
                            CodArticulo = i.Single(d => d.Key.Equals("COD_ARTICULO")).Value.Parse<string>(),
                            DescArticulo = i.Single(d => d.Key.Equals("DESC_ARTICULO")).Value.Parse<string>(),
                            CodUnidad = i.Single(d => d.Key.Equals("COD_UNIDAD")).Value.Parse<string>(),
                            DescUnidad = i.Single(d => d.Key.Equals("DESC_UNIDAD")).Value.Parse<string>(),
                            CodFamilia = i.Single(d => d.Key.Equals("COD_FAMILIA")).Value.Parse<string>(),
                            DescFamilia = i.Single(d => d.Key.Equals("DESC_FAMILIA")).Value.Parse<string>(),
                            CodLinea = i.Single(d => d.Key.Equals("COD_LINEA")).Value.Parse<string>(),
                            DescLinea = i.Single(d => d.Key.Equals("DESC_LINEA")).Value.Parse<string>(),
                            CodMarca = i.Single(d => d.Key.Equals("COD_MARCA")).Value.Parse<string>(),
                            DescMarca = i.Single(d => d.Key.Equals("DESC_MARCA")).Value.Parse<string>(),
                            StockDisponible = i.Single(d => d.Key.Equals("STOCK_DISPO")).Value.Parse<int>(),
                            PrecioRef = i.Single(d => d.Key.Equals("PRECIO_REF")).Value.Parse<decimal>(),
                            CodModelo = i.Single(d => d.Key.Equals("COD_MODELO")).Value.Parse<string>(),
                            DescModelo = i.Single(d => d.Key.Equals("DESC_MODELO")).Value.Parse<string>(),
                            CodAlmacen = i.Single(d => d.Key.Equals("COD_ALMACEN")).Value.Parse<string>(),
                            DescAlmacen = i.Single(d => d.Key.Equals("DESC_ALMACEN")).Value.Parse<string>()
                        });

                    connection.Close();

                    if (result != null)
                    {
                        List<ArticuloDTO> lst = new List<ArticuloDTO>();
                        foreach (string codArti in result.Select(x => x.CodArticulo).Distinct().ToList())
                        {
                            var lstArticulo = result.Where(x => x.CodArticulo == codArti).ToList();
                            var oArticulo = lstArticulo.FirstOrDefault(x => x.CodArticulo == codArti);
                            var newItem = new ArticuloDTO();
                            newItem.CodArticulo = oArticulo.CodArticulo;
                            newItem.DescArticulo = oArticulo.DescArticulo;
                            newItem.CodUnidad = oArticulo.CodUnidad;
                            newItem.DescUnidad = oArticulo.DescUnidad;
                            newItem.CodFamilia = oArticulo.CodFamilia;
                            newItem.DescFamilia = oArticulo.DescFamilia;
                            newItem.CodLinea = oArticulo.CodLinea;
                            newItem.DescLinea = oArticulo.DescLinea;
                            newItem.CodMarca = oArticulo.CodMarca;
                            newItem.DescMarca = oArticulo.DescMarca;
                            newItem.PrecioRef = oArticulo.PrecioRef;
                            if (oArticulo != null && lstArticulo.Any())
                            {
                                var Almacenes = new List<AlmacenDTO>();
                                foreach (ArticuloDTO objArt in lstArticulo)
                                {
                                    Almacenes.Add(new AlmacenDTO() { CodAlmacen = objArt.CodAlmacen, DescAlmacen = objArt.DescAlmacen, StockDisponible = objArt.StockDisponible });
                                }
                                newItem.Almacenes = Almacenes.ToArray();
                                lst.Add(newItem);
                            }
                        }
                        result = lst;
                    }

                    return result;
                };

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public GuiaDTO ConsultaGuia(long codSolicitud, string tipo)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionSingle())
            {

                var parameters = new DynamicParameters();
                parameters.Add("CodigoSol", codSolicitud);
                parameters.Add("Tipo", tipo);
                SqlCommand command;
                var result = new GuiaDTO();
                string query = "exec USP_CREAR_GUIA @CodigoSol=" + codSolicitud.ToString() + ",@Tipo='"+tipo+"'";
                connection.Open();
                command = new SqlCommand(query, connection);


                using (var reader = command.ExecuteReader())
                {
                    reader.Read();
                    GuiaCabDTO _cabeceraGuia = new GuiaCabDTO()
                    {
                        RutaImagen = reader.IsDBNull(reader.GetOrdinal("RUTAIMAGEN")) ? "" : reader.GetString(reader.GetOrdinal("RUTAIMAGEN")),
                        Titulo = reader.IsDBNull(reader.GetOrdinal("TITULO")) ? "" : reader.GetString(reader.GetOrdinal("TITULO")),
                        FechaOrdenCompra = reader.IsDBNull(reader.GetOrdinal("FECHAOC")) ? "" : reader.GetString(reader.GetOrdinal("FECHAOC")),
                        PlazoEntrega = reader.IsDBNull(reader.GetOrdinal("PLAZOENTREGA")) ? "" : reader.GetString(reader.GetOrdinal("PLAZOENTREGA")),
                        NombreVendedor = reader.IsDBNull(reader.GetOrdinal("NOMBREVENDEDOR")) ? "" : reader.GetString(reader.GetOrdinal("NOMBREVENDEDOR")),
                        VendidoA = reader.IsDBNull(reader.GetOrdinal("VENDIDOA")) ? "" : reader.GetString(reader.GetOrdinal("VENDIDOA")),
                        EnviadoA = reader.IsDBNull(reader.GetOrdinal("ENVIADOA")) ? "" : reader.GetString(reader.GetOrdinal("ENVIADOA")),
                        Ruc = reader.IsDBNull(reader.GetOrdinal("RUC")) ? "" : reader.GetString(reader.GetOrdinal("RUC")),
                        Direccion = reader.IsDBNull(reader.GetOrdinal("DIRECCION")) ? "" : reader.GetString(reader.GetOrdinal("DIRECCION")),
                        Ciudad = reader.IsDBNull(reader.GetOrdinal("CIUDAD")) ? "" : reader.GetString(reader.GetOrdinal("CIUDAD")),         
                        NumeroOrdenCompra = reader.IsDBNull(reader.GetOrdinal("NUMOC")) ? "" : reader.GetString(reader.GetOrdinal("NUMOC")),
                        Subtotal = reader.IsDBNull(reader.GetOrdinal("SUBTOTAL")) ? "" : reader.GetString(reader.GetOrdinal("SUBTOTAL")),
                        Igv = reader.IsDBNull(reader.GetOrdinal("IGV")) ? "" : reader.GetString(reader.GetOrdinal("IGV")),
                        Total = reader.IsDBNull(reader.GetOrdinal("TOTAL")) ? "" : reader.GetString(reader.GetOrdinal("TOTAL"))
                    };

                    result.GuiaCabecera = _cabeceraGuia;

                    reader.NextResult();

                    List<GuiaDetDTO> _listadetalleGuia = new List<GuiaDetDTO>();

                    while (reader.Read())
                    {
                        var detalle = new GuiaDetDTO()
                        {
                            NumeroItem = reader.IsDBNull(reader.GetOrdinal("NROITEM")) ? "" : reader.GetString(reader.GetOrdinal("NROITEM")),
                            Catalogo = reader.IsDBNull(reader.GetOrdinal("CATALOGO")) ? "" : reader.GetString(reader.GetOrdinal("CATALOGO")),
                            Descripcion = reader.IsDBNull(reader.GetOrdinal("DESCRIPCION")) ? "" : reader.GetString(reader.GetOrdinal("DESCRIPCION")),
                            Unidad = reader.IsDBNull(reader.GetOrdinal("UNIDAD")) ? "" : reader.GetString(reader.GetOrdinal("UNIDAD")),
                            Cantidad = reader.IsDBNull(reader.GetOrdinal("CANTIDAD")) ? "" : reader.GetString(reader.GetOrdinal("CANTIDAD")),
                            PrecioUnitario = reader.IsDBNull(reader.GetOrdinal("PRECIOUNITARIO")) ? "" : reader.GetString(reader.GetOrdinal("PRECIOUNITARIO")),
                            Total = reader.IsDBNull(reader.GetOrdinal("TOTAL")) ? "" : reader.GetString(reader.GetOrdinal("TOTAL"))
                        };
                        _listadetalleGuia.Add(detalle);
                    }

                    result.GuiaDetalle = _listadetalleGuia;
                    result.NroItems = _listadetalleGuia.Count();

                }

                return result;

            }
        }


        public RespuestaDTO MantenimientoDespacho(DatosDespachoDTO datosDespachoDTO)
        {
            var rpta = new RespuestaDTO();
            Log.TraceInfo(Utilidades.GetCaller());


            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();

                var parameters = new DynamicParameters();
                parameters.Add("TIPO", datosDespachoDTO.Tipo);
                parameters.Add("CODSOLICITUD", datosDespachoDTO.CodigoSolicitud);
                parameters.Add("CODCOTIZACION", datosDespachoDTO.CodigoCotizacion);
                parameters.Add("ID_WORKFLOW", datosDespachoDTO.CodigoWorkFlow);
                parameters.Add("NOMPERFIL", datosDespachoDTO.NombrePerfil == null ? "" : datosDespachoDTO.NombrePerfil);
                parameters.Add("NUMRODEN", datosDespachoDTO.NumeroOrden == null ? "" : datosDespachoDTO.NumeroOrden);
                parameters.Add("FECHAORDEN", datosDespachoDTO.FechaOrden);
                parameters.Add("FECHAMAX", datosDespachoDTO.FechaMaxima);
                parameters.Add("STOCK", datosDespachoDTO.Stock);
                parameters.Add("FECHAENTREGA", datosDespachoDTO.FechaEntrega);
                parameters.Add("NUMFACTURA", datosDespachoDTO.NumeroFactura);
                parameters.Add("NUMGUIAREM", datosDespachoDTO.NumeroGuiaRemision);
                parameters.Add("NUMPEDIDO", datosDespachoDTO.NumeroPedido);
                parameters.Add("FECHAINGRESO", datosDespachoDTO.FechaIngreso);
                parameters.Add("ESTAPROB", datosDespachoDTO.EstadoAprobacion);
                parameters.Add("OBSERVACION", datosDespachoDTO.Observacion);
                parameters.Add("USRREG", datosDespachoDTO.UsuarioRegistro);

                var result = connection.Query
                (
                    sql: "USP_MANT_DESPACHOVENTAS",
                    param: parameters,
                    commandType: CommandType.StoredProcedure
                )
                 .Select(s => s as IDictionary<string, object>)
                    .Select(i => new RespuestaDTO
                    {
                        Codigo = i.Single(d => d.Key.Equals("COD")).Value.Parse<int>(),
                        Mensaje = i.Single(d => d.Key.Equals("MSG")).Value.Parse<string>()

                    }).FirstOrDefault();

                return result;
            }
        }
    }
}
