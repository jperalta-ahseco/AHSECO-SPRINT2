using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace AHSECO.CCL.BE
{
    public class CamposAuditoriaDTO
    {
        public string UsuarioRegistra { get; set; }
        public DateTime FechaRegistro { get; set; }
        public string IpMaquinaRegistro { get; set; }
        public string UsuarioModifica { get; set; }
        public DateTime? FechaModifica { get; set; }
        public string IpMaquinaModifica { get; set; }
        public bool IsTempRecord { get; set; }
        public bool IsUpdated { get; set; }

        public void CopyProperties<Target>(ref Target target)
        {
            foreach (var sProp in this.GetType().GetProperties())
            {
                bool isMatched = target.GetType().GetProperties().Any(tProp => tProp.Name == sProp.Name && tProp.GetType() == sProp.GetType() && tProp.CanWrite);
                if (isMatched)
                {
                    var value = sProp.GetValue(this);
                    PropertyInfo propertyInfo = target.GetType().GetProperty(sProp.Name);
                    propertyInfo.SetValue(target, value);
                }
            }
        }

    }
}
