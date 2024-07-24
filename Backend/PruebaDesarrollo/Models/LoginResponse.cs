using System;
namespace PruebaDesarrollo.Models
{
    public class LoginResponse
    {
        public bool IsLogedIn { get; set; } = false;
        public string JwtToken { get; set; }
        public string RefreshToken { get; internal set; }
        public string? Role { get; set; }
    }
}

