using System;
using System.Drawing.Imaging;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Sockets;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Windows.Forms;
using Microsoft.IdentityModel.Tokens;

namespace AHSECO.CCL.FRONTEND.Security
{
    public class TokenService
    {
        private const string SecretKey = "4hs3c0p3ru"; // Cambia esto
        private const int ExpirationMinutes = 60;

        public string GenerarToken(string user)
        {
            try
            {

                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(GenerateSecretKey()));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var claims = new[]
                {
                new Claim(ClaimTypes.Name, user)
                // Puedes añadir más claims si es necesario
                };

                var token = new JwtSecurityToken(
                    issuer: "AHSECO", // Cambia esto
                    audience: "AUDIENCE", // Cambia esto
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(ExpirationMinutes),
                    signingCredentials: credentials);

                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            catch (Exception ex)
            {
                return "";
            }
           
        }

        public static string GenerateSecretKey(int size = 32)
        {
            using (var rng = new RNGCryptoServiceProvider())
            {
                byte[] secretKey = new byte[size];
                rng.GetBytes(secretKey);
                return Convert.ToBase64String(secretKey);
            }
        }
    }
}

