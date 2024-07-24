using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PruebaDesarrollo.Context;
using PruebaDesarrollo.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace PruebaDesarrollo.Services
{
	public class UserService
	{

        private readonly AuthDemoDbContext _context;

        public UserService(AuthDemoDbContext context)
		{
            _context = context;
        }

        public async Task<IActionResult> getUsers()
        {
            try
            {
                var data = await _context.appUsers
                .Select(user => new
                {
                    user.Id,
                    user.UserName,
                    user.Email
                }).ToArrayAsync();
                return new JsonResult(new CommandResult<object>(true, "Consulta realizada con éxito", data));
            }
            catch (Exception e)
            {
                return new JsonResult(new CommandResult<object>(true, "Consulta ocurrido un error", e.Message.ToString()));

            }

        }


        public async Task<IActionResult> getUsersDetails()
        {

            try
            {
                var data = await _context.appUsers.ToListAsync();
                return new JsonResult(new CommandResult<object>(true, "Consulta realizada con éxito", data));
            }
            catch (Exception e)
            {
                return new JsonResult(new CommandResult<object>(true, "Consulta ocurrido un error", e.Message.ToString()));

            }

        }

    }
}

