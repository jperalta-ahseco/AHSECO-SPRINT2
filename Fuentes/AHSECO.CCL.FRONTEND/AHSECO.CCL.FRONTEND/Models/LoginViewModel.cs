using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
/*
 * =============== CREATION ===================================
 * Author: Vector Software Factory Peru | http://www.vectoritcgroup.com/
 * Date: 2018-02-08
 * Request: CEEFFC Etapa 2 
 * Description: CEEFFC Etapa 2
 * =============== MODIFICATION 0000 (MOD.0000) ===============
 * Author:
 * Date:
 * Request:
 * Description:
 * ============================================================
 */
namespace AHSECO.CCL.FRONTEND.Models
{
    public class LoginViewModel
    {
        [Required]
        [Display(Name = "Nombre de usuario")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }
    }
}