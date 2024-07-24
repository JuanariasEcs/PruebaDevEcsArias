using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PruebaDesarrollo.Models;

namespace PruebaDesarrollo.Context
{
    public class AuthDemoDbContext : IdentityDbContext
    {
        public AuthDemoDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<AppUser> appUsers { get; set; }
    }
}

