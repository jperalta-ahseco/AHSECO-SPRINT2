using AHSECO.CCL.COMUN;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using AHSECO.CCL.BE;
using AHSECO.CCL.BE.Mantenimiento;
using AHSECO.CCL.BE.AsignacionManual;
namespace AHSECO.CCL.BD.Mantenimientos
{
    public class ClienteBD
    {

        CCLog Log = new CCLog();
        public IEnumerable<ClienteDTO> ObtenerClientes(ClienteDTO clienteDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();

                parameters.Add("isId", clienteDTO.ID);
                parameters.Add("isRucEmpresa", clienteDTO.RUC);
                parameters.Add("isNomEmpresa", clienteDTO.NomEmpresa);
                parameters.Add("isAsesor", string.IsNullOrEmpty(clienteDTO.Id_Empleado) ? null : clienteDTO.Id_Empleado);
                parameters.Add("isEstado", clienteDTO.Estado);
                parameters.Add("isFecIni", clienteDTO.FechaInicio);
                parameters.Add("isFecFin", clienteDTO.FechaFinal);
                parameters.Add("isCategoria", string.IsNullOrEmpty(clienteDTO.Categoria) ? "" : clienteDTO.Categoria);
                parameters.Add("isCodUbigeo", clienteDTO.CodUbigeo);
                parameters.Add("isSector", clienteDTO.SectorCliente);

                var result = connection.Query(
                    sql: "USP_SEL_CLIENTE",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new ClienteDTO
                    {
                        ID = i.Single(d => d.Key.Equals("ID")).Value.Parse<int>(),
                        RUC = i.Single(d => d.Key.Equals("RUCEMPRESA")).Value.Parse<string>(),
                        NomEmpresa = i.Single(d => d.Key.Equals("NOMEMPRESA")).Value.Parse<string>(),
                        NumContacto = i.Single(d => d.Key.Equals("NUMCONTACTO")).Value.Parse<int>(),
                        Telefono = i.Single(d => d.Key.Equals("TELEFONO")).Value.Parse<string>(),
                        Correo = i.Single(d => d.Key.Equals("CORREO")).Value.Parse<string>(),
                        UbigeoDepartamento = new UbigeoDTO
                        {
                            Descripcion = i.Single(d => d.Key.Equals("NOMDEPARTAMENTO")).Value.Parse<string>(),
                        },
                        UbigeoProvincia = new UbigeoDTO
                        {
                            Descripcion = i.Single(d => d.Key.Equals("NOMPROVINCIA")).Value.Parse<string>(),
                        },
                        UbigeoDistrito = new UbigeoDTO
                        {
                            Descripcion = i.Single(d => d.Key.Equals("NOMDISTRITO")).Value.Parse<string>(),
                        },
                        CodUbigeo = i.Single(d => d.Key.Equals("CODUBIGEO")).Value.Parse<string>(),
                        Direccion = i.Single(d => d.Key.Equals("DIRECCION")).Value.Parse<string>(),
                        Categoria = i.Single(d => d.Key.Equals("CATEGORIA")).Value.Parse<string>(),
                        CodCategoria = i.Single(d => d.Key.Equals("CODCATEGORIA")).Value.Parse<string>(),
                        Estado = i.Single(d => d.Key.Equals("ESTADO")).Value.Parse<bool>(),
                        SectorCliente = i.Single(d => d.Key.Equals("SECTORCLIENTE")).Value.Parse<string>(),
                        FechaRegistro = i.Single(d => d.Key.Equals("AUDIT_REG_FEC")).Value.Parse<DateTime>(),
                        Empleado = new EmpleadoDTO
                        {
                            NombresCompletosEmpleado = i.Single(d => d.Key.Equals("ASESOR")).Value.Parse<string>()
                        }
                    });

                connection.Close();

                return result;
            }
        }

        public IEnumerable<ClienteDTO> Insertar(ClienteDTO clienteDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("isId", clienteDTO.ID);
                parameters.Add("isTipoProceso", "1");
                parameters.Add("isRucEmpresa", clienteDTO.RUC);
                parameters.Add("isNomEmpresa", clienteDTO.NomEmpresa);
                parameters.Add("isDireccion", clienteDTO.Direccion);
                parameters.Add("isTelefono", clienteDTO.Telefono);
                parameters.Add("isCorreo", clienteDTO.Correo);
                parameters.Add("isSector", clienteDTO.SectorCliente);
                parameters.Add("isCodUbigeo", clienteDTO.CodUbigeo);
                parameters.Add("isCategoria", clienteDTO.Categoria);
                parameters.Add("isEstado", clienteDTO.Estado);
                parameters.Add("isAudit_Reg_Usr", clienteDTO.UsuarioRegistra);

                var result = connection.Query(
                    sql: "USP_MANT_CLIENTES",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new ClienteDTO
                    {
                        ID = i.Single(d => d.Key.Equals("ID")).Value.Parse<int>()
                    });
                connection.Close();

                return result;
            }
        }
        public bool Actualizar(ClienteDTO clienteDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("isId", clienteDTO.ID);
                parameters.Add("isTipoProceso", "2");
                //parameters.Add("isRucEmpresa", clienteDTO.RUC);
                parameters.Add("isNomEmpresa", clienteDTO.NomEmpresa);
                parameters.Add("isDireccion", clienteDTO.Direccion);
                parameters.Add("isTelefono", clienteDTO.Telefono);
                parameters.Add("isCorreo", clienteDTO.Correo);
                parameters.Add("isSector", clienteDTO.SectorCliente);
                parameters.Add("isCodUbigeo", clienteDTO.CodUbigeo);
                parameters.Add("isCategoria", clienteDTO.Categoria);
                parameters.Add("isEstado", clienteDTO.Estado);
                parameters.Add("isAudit_Mod_Usr", clienteDTO.UsuarioModifica);
                var result = connection.Execute(
                    sql: "USP_MANT_CLIENTES",
                    param: parameters,
                    commandType: CommandType.StoredProcedure
                 );
            }
            return true;
        }

        public IEnumerable<ContactoDTO> ObtenerContactos(ContactoDTO contactoDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();

                parameters.Add("isIdContacto", contactoDTO.IdContacto,DbType.Int32,ParameterDirection.Input);
                parameters.Add("isIdCliente", contactoDTO.IdCliente, DbType.Int64, ParameterDirection.Input);

                var result = connection.Query(
                    sql: "USP_SEL_CONTACTOS",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new ContactoDTO
                    {
                        IdContacto = i.Single(d => d.Key.Equals("IDCONTACTO")).Value.Parse<int>(),
                        CodTipDocContacto = i.Single(d => d.Key.Equals("CODTIPDOCCONTACTO")).Value.Parse<string>(),
                        TipDoc = i.Single(d => d.Key.Equals("TIPDOCCONTACTO")).Value.Parse<string>(),
                        NumDoc = i.Single(d => d.Key.Equals("NUMDOCCONTACTO")).Value.Parse<string>(),
                        NomCont = i.Single(d => d.Key.Equals("NOMBRE CONTACTO")).Value.Parse<string>(),
                        Establecimiento = i.Single(d => d.Key.Equals("ESTABLECIMIENTO")).Value.Parse<string>(),
                        AreaContacto = i.Single(d => d.Key.Equals("AREACONTACTO")).Value.Parse<string>(),
                        Telefono = i.Single(d => d.Key.Equals("TELEFONOCONTACTO")).Value.Parse<string>(),
                        Telefono2 = i.Single(d => d.Key.Equals("TELEFONO2CONTACTO")).Value.Parse<string>(),
                        Cargo = i.Single(d => d.Key.Equals("CARGOCONTACTO")).Value.Parse<string>(),
                        Correo = i.Single(d => d.Key.Equals("CORREOCONTACTO")).Value.Parse<string>(),
                        Estado = i.Single(d => d.Key.Equals("ESTADO")).Value.Parse<string>(),
                        CodEstado = i.Single(d => d.Key.Equals("CODESTADO")).Value.Parse<bool>()
                    });

                connection.Close();

                return result;
            }
        }

        public bool InsertarContacto(ContactoDTO contactoDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("isTipoProceso", "1");
                parameters.Add("isIdCliente", contactoDTO.IdCliente);
                parameters.Add("isRucCliente", contactoDTO.RucCliente);
                parameters.Add("isTipDoc", contactoDTO.TipDoc);
                parameters.Add("isNumDoc", contactoDTO.NumDoc);
                parameters.Add("isNomCont", contactoDTO.NomCont);
                parameters.Add("isEstablecimiento", contactoDTO.Establecimiento);
                parameters.Add("isAreaContacto", contactoDTO.AreaContacto);
                parameters.Add("isTelefono", contactoDTO.Telefono);
                parameters.Add("isTelefono2", contactoDTO.Telefono2);
                parameters.Add("isCargo", contactoDTO.Cargo);
                parameters.Add("isCorreo", contactoDTO.Correo);
                parameters.Add("isEstado", contactoDTO.Estado);
                parameters.Add("isAudit_Reg_Usr", contactoDTO.UsuarioRegistra);
                var result = connection.Execute(
                    sql: "USP_MANT_CONTACTOS",
                    param: parameters,
                    commandType: CommandType.StoredProcedure
                 );

            }
            return true;
        } 

        public bool ActualizarContacto(ContactoDTO contactoDTO)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("isTipoProceso", "2");
                parameters.Add("isIdContacto", contactoDTO.IdContacto);
                parameters.Add("isTipDoc", contactoDTO.TipDoc);
                parameters.Add("isNumDoc", contactoDTO.NumDoc);
                parameters.Add("isNomCont", contactoDTO.NomCont);
                parameters.Add("isEstablecimiento", contactoDTO.Establecimiento);
                parameters.Add("isAreaContacto", contactoDTO.AreaContacto);
                parameters.Add("isTelefono", contactoDTO.Telefono);
                parameters.Add("isTelefono2", contactoDTO.Telefono2);
                parameters.Add("isCargo", contactoDTO.Cargo);
                parameters.Add("isCorreo", contactoDTO.Correo);
                parameters.Add("isEstado", contactoDTO.Estado);
                parameters.Add("isAudit_Reg_Usr", contactoDTO.UsuarioRegistra);
                var result = connection.Execute(
                    sql: "USP_MANT_CONTACTOS",
                    param: parameters,
                    commandType: CommandType.StoredProcedure
                 );
            }
            return true;
        }

        public IEnumerable<ClienteDTO> ObtenerAuditClientes(int Id_Ant)
        {
            Log.TraceInfo(Utilidades.GetCaller());
            using (var connection = Factory.ConnectionFactory())
            {
                connection.Open();
                var parameters = new DynamicParameters();

                parameters.Add("isId", Id_Ant);

                var result = connection.Query(
                    sql: "USP_SEL_CLIENTE_AUDIT",
                    param: parameters,
                    commandType: CommandType.StoredProcedure)
                    .Select(s => s as IDictionary<string, object>)
                    .Select(i => new ClienteDTO
                    {
                        //ID = i.Single(d => d.Key.Equals("ID")).Value.Parse<long>(),
                        Tipo_Audit = i.Single(d => d.Key.Equals("TIPO")).Value.Parse<string>(),
                        Fecha_Accion = i.Single(d => d.Key.Equals("FECHA_ACCION")).Value.Parse<DateTime>(),
                        RUC_Ant = i.Single(d => d.Key.Equals("RUCEMPRESA_ANT")).Value.Parse<string>(),
                        NomEmpresa_Ant = i.Single(d => d.Key.Equals("NOMEMPRESA_ANT")).Value.Parse<string>(),
                        Direccion_Ant = i.Single(d => d.Key.Equals("DIRECCION_ANT")).Value.Parse<string>(),
                        Telefono_Ant = i.Single(d => d.Key.Equals("TELEFONO_ANT")).Value.Parse<string>(),
                        Correo_Ant = i.Single(d => d.Key.Equals("CORREO_ANT")).Value.Parse<string>(),
                        UbigeoDepartamento = new UbigeoDTO
                        {
                            Descripcion = i.Single(d => d.Key.Equals("NOMDEPARTAMENTO")).Value.Parse<string>()
                        },
                        UbigeoProvincia = new UbigeoDTO
                        {
                            Descripcion = i.Single(d => d.Key.Equals("NOMPROVINCIA")).Value.Parse<string>()
                        },
                        UbigeoDistrito = new UbigeoDTO
                        {
                            Descripcion = i.Single(d => d.Key.Equals("NOMDISTRITO")).Value.Parse<string>()
                        },
                        Categoria_Ant = i.Single(d => d.Key.Equals("CATEGORIA_ANT")).Value.Parse<string>(),
                        TipoCliente_Ant = i.Single(d => d.Key.Equals("TIPOCLIENTE_ANT")).Value.Parse<string>(),
                        SectorCliente_Ant = i.Single(d => d.Key.Equals("SECTORCLIENTE_ANT")).Value.Parse<string>(),
                        Estado_Ant = i.Single(d => d.Key.Equals("ESTADO_ANT")).Value.Parse<bool>(),
                        Usuario_Registra_Audit = i.Single(d => d.Key.Equals("USUARIO_REGISTRA")).Value.Parse<string>(),
                        Audit_Reg_Fec_Ant = i.Single(d => d.Key.Equals("AUDIT_REG_FEC_ANT")).Value.Parse<string>(),
                        Usuario_Modifica_Audit = i.Single(d => d.Key.Equals("USUARIO_MODIFICA")).Value.Parse<string>(),
                        Audit_Mod_Fec_Ant = i.Single(d => d.Key.Equals("AUDIT_MOD_FEC_ANT")).Value.Parse<string>()
                    });

                connection.Close();

                return result;
            }
        }

    }
}
