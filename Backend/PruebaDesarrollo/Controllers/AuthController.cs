using System;
using Microsoft.AspNetCore.Mvc;
using PruebaDesarrollo.Models;
using PruebaDesarrollo.Services;

namespace PruebaDesarrollo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginUser user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var loginResult = await _authService.Login(user);

            if (loginResult.IsLogedIn)
            {
                return Ok(loginResult);
            }

            return Unauthorized();
        }


        [HttpPost("RefreshToken")]
        public async Task<IActionResult> RefreshToken(RefreshTokenModel model)
        {
            var loginResult = await _authService.RefreshToken(model);
            if (loginResult.IsLogedIn)
            {
                return Ok(loginResult);
            }
            return Unauthorized();
        }




    }
}

