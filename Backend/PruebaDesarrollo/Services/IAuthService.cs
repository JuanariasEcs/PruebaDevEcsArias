using System;
using PruebaDesarrollo.Models;

namespace PruebaDesarrollo.Services
{
    public interface IAuthService
    {
        Task<LoginResponse> Login(LoginUser user);
        Task<LoginResponse> RefreshToken(RefreshTokenModel model);
        Task<bool> RegisterUser(LoginUser user);

    }
}

