using System;
using Microsoft.IdentityModel.Tokens;
using PruebaDesarrollo.Models;
using PruebaDesarrollo.Context;
using System.Data.SqlTypes;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Http.HttpResults;


namespace PruebaDesarrollo.Services
{
	public class AuthService : IAuthService
    {
        private readonly AuthDemoDbContext _context;
        private readonly IConfiguration _config;

        public AuthService(AuthDemoDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }



        public async Task<LoginResponse> Login(LoginUser user)
        {
            try
            {
                var response = new LoginResponse();
                var appUser = await _context.appUsers.SingleOrDefaultAsync(u => u.Email == user.UserName);

                if (appUser == null || !VerifyPassword(user.Password, appUser.PasswordHash))
                {
                    return response;
                }

                response.IsLogedIn = true;
                response.JwtToken = GenerateTokenString(appUser.Email, appUser.Role);
                response.RefreshToken = GenerateRefreshTokenString();
                response.Role = appUser.Role;

                appUser.RefreshToken = response.RefreshToken;
                appUser.RefreshTokenExpiry = DateTime.Now.AddMinutes(1);
                _context.appUsers.Update(appUser);
                await _context.SaveChangesAsync();

                return response;
            }catch(Exception e){
                return null;
            }

        }

        public async Task<LoginResponse> RefreshToken(RefreshTokenModel model)
        {
            try
            {
                var principal = GetTokenPrincipal(model.JwtToken);

                var response = new LoginResponse();
                if (principal?.Identity?.Name == null)
                    return response;

                var appUser = await _context.appUsers.SingleOrDefaultAsync(u => u.Email == principal.Identity.Name);

                if (appUser == null || appUser.RefreshToken != model.RefreshToken)
                    return response;

                response.IsLogedIn = true;
                response.JwtToken = GenerateTokenString(appUser.Email, appUser.Role);
                response.RefreshToken = GenerateRefreshTokenString();
                response.Role = appUser.Role;

                appUser.RefreshToken = response.RefreshToken;
                appUser.RefreshTokenExpiry = DateTime.Now.AddMinutes(1);
                _context.appUsers.Update(appUser);
                await _context.SaveChangesAsync();

                return response;
            }
            catch(Exception e){
                return null;
            }
        }

        private ClaimsPrincipal? GetTokenPrincipal(string token)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("Jwt:Key").Value));
            var validation = new TokenValidationParameters
            {
                IssuerSigningKey = securityKey,
                ValidateLifetime = false,
                ValidateActor = false,
                ValidateIssuer = false,
                ValidateAudience = false,
            };
            return new JwtSecurityTokenHandler().ValidateToken(token, validation, out _);
        }

        private string GenerateRefreshTokenString()
        {
            var randomNumber = new byte[64];
            using (var numberGenerator = RandomNumberGenerator.Create())
            {
                numberGenerator.GetBytes(randomNumber);
            }
            return Convert.ToBase64String(randomNumber);
        }

        private string GenerateTokenString(string userName, string role)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, userName),
                new Claim(ClaimTypes.Role, role),
            };

            var staticKey = _config.GetSection("Jwt:Key").Value;
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(staticKey));
            var signingCred = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            var securityToken = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: signingCred
            );

            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            }
        }

        private bool VerifyPassword(string password, string hashedPassword)
        {
            var hashOfInput = HashPassword(password);
            return hashOfInput == hashedPassword;
        }

        public async Task<bool> RegisterUser(LoginUser user)
        {
            try
            {
                var passwordHash = HashPassword(user.Password);
                var expiryDate = DateTime.Now.AddMinutes(10);
                if (expiryDate < (DateTime)SqlDateTime.MinValue || expiryDate > (DateTime)SqlDateTime.MaxValue)
                {
                    expiryDate = (DateTime)SqlDateTime.MaxValue;
                }

                var usernameComplete = user.UserName.Split("@")[0] ?? user.UserName;

                var appUser = new AppUser
                {
                    UserName = usernameComplete,
                    Email = user.UserName,
                    PasswordHash = passwordHash,
                    RefreshToken = GenerateRefreshTokenString(),
                    RefreshTokenExpiry = expiryDate,
                    Role = "user",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                };

                _context.appUsers.Add(appUser);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception e)
            {
                return false;
            }


        }
    }
}


