using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PruebaDesarrollo.Models;
using PruebaDesarrollo.Services;

namespace PruebaDesarrollo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController
	{
		private readonly UserService _userService;

        public UserController(UserService userService)
		{
			_userService = userService;
        }

        [Authorize]
        [HttpGet("getUsers")]
        public async Task<IActionResult> getUsers()
        {
            var res = await _userService.getUsers();
            return res;

        }

        [Authorize(Policy = "AdminOnly")]
        [HttpGet("getUsersDetails")]
        public async Task<IActionResult> getUsersDetails()
        {
            var res = await _userService.getUsersDetails();
            return res;
        }


    }
}

