using System;
using Microsoft.AspNetCore.Identity;

namespace PruebaDesarrollo.Models
{
    public class ExtendedIdentityUser : IdentityUser
    {
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiry { get; set; }
    }
}

