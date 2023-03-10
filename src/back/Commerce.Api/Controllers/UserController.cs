using Commerce.Api.Data;
using Commerce.Api.Entities;
using Commerce.Api.Models.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Commerce.Api.Controllers
{
    [Authorize(Roles = "Administrator")]
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UserController(ApplicationDbContext context, RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _roleManager = roleManager;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var result = new List<User>();

            var users = _userManager.Users.ToList();

            if(users is null)
            {
                return NotFound();
            }

            foreach (var applicationUser in users)
            {
                var userModel = new User
                {
                    Id = applicationUser.Id,
                    CreatedAt = applicationUser.CreatedAt,
                    Email = applicationUser.Email,
                    FirstName = applicationUser.FirstName,
                    LastName = applicationUser.LastName,
                    LastActivity = applicationUser.LastActivity,
                    IsActive = applicationUser.Active
                };

                userModel.IsAdmin = await IsUserAdminAsync(applicationUser);

                result.Add(userModel);
            }

            return Ok(result);
        }

        [HttpPost("reset-password/{id}")]
        public async Task<IActionResult> ResetUserPassword(string id, [FromBody] string password)
        {
            if (string.IsNullOrEmpty(password))
            {
                return BadRequest("Mot de passe à réinitialiser ne peut pas être vide");
            }

            var user = await _userManager.FindByIdAsync(id);

            if(user is null)
            {
                return NotFound();
            }

            if(await _userManager.HasPasswordAsync(user))
                await _userManager.RemovePasswordAsync(user);

            var identityResult = await _userManager.AddPasswordAsync(user, password);

            if(identityResult.Succeeded)
            {
                return Ok();
            }

            var response = new Response() { Status = "Erreur", Message = "Erreur lors de la réinitialisation du mot de passe" };

            foreach (var identityError in identityResult.Errors)
            {
                response.Errors.Add(identityError.Description);
            }

            return BadRequest(response);
        }

        [HttpPost("activate/{id}")]
        public async Task<IActionResult> ActivateUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user is null)
            {
                return NotFound();
            }

            user.Active = true;
            await _userManager.UpdateAsync(user);

            return Ok();
        }

        [HttpPost("deactivate/{id}")]
        public async Task<IActionResult> DeActivateUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user is null)
            {
                return NotFound();
            }

            user.Active = false;
            await _userManager.UpdateAsync(user);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var userToBeDeleted = await _userManager.FindByIdAsync(id);

            if (userToBeDeleted is null)
            {
                return NotFound();
            }

            await _userManager.DeleteAsync(userToBeDeleted);

            return Ok();
        }

        private async Task<bool> IsUserAdminAsync(ApplicationUser user)
        {
            var adminRole = await _roleManager.FindByNameAsync("Administrator");

            if (adminRole is null)
            {
                await _roleManager.CreateAsync(new IdentityRole("Administrator"));
            }

            var roles = await _userManager.GetRolesAsync(user);

            return roles.Any() && roles.Where(r => r.Equals("Administrator")).Any();
        }
    }
}
