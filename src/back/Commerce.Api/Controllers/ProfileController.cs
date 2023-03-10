using Commerce.Api.Data;
using Commerce.Api.Entities;
using Commerce.Api.Models.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Commerce.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/profile")]
    public class ProfileController: ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        public ProfileController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost("info")]
        public async Task<IActionResult> ChangeInformation(ChangeInfoRequest request)
        {
            if (request == null) {
                var response = new Response { Status = "Erreur", Message = "Valeurs invalides" };
                return BadRequest(response);
            }

            if (string.IsNullOrEmpty(request.FirstName))
            {
                var response = new Response { Status = "Erreur", Message = "Prénom obligatoir" };
                return BadRequest(response);
            }

            if (string.IsNullOrEmpty(request.LastName))
            {
                var response = new Response { Status = "Erreur", Message = "Nom obligatoir" };
                return BadRequest(response);
            }

            var currentUserId = User.Claims.Where(c => c.Type == ClaimTypes.Sid)
                .First()
                .Value;

            var currentUser = await _userManager.FindByIdAsync(currentUserId);

            currentUser.FirstName = request.FirstName;
            currentUser.LastName = request.LastName;

            await _userManager.UpdateAsync(currentUser);

            return Ok();
        }

        [HttpPost("email")]
        public async Task<IActionResult> ChangeEmail(ChangeEmailRequest request)
        {
            if (request == null)
            {
                var response = new Response { Status = "Erreur", Message = "Valeurs invalides" };
                return BadRequest(response);
            }

            if (string.IsNullOrEmpty(request.Email))
            {
                var response = new Response { Status = "Erreur", Message = "Email invalid" };
                return BadRequest(response);
            } 

            var currentUserId = User.Claims.Where(c => c.Type == ClaimTypes.Sid)
                .First()
                .Value;

            var userWithTheSameEmail = await _userManager.FindByEmailAsync(request.Email);

            if(userWithTheSameEmail is not null && userWithTheSameEmail.Id != currentUserId)
            {
                // email exists for another user!
                var response = new Response { Status = "Erreur", Message = "Cet email est déjà utilisé. veuillez choisir un email différent!" };
                return BadRequest(response);
            }

            var currentUser = await _userManager.FindByIdAsync(currentUserId);

            // now we change the email!
            currentUser.Email = request.Email; 

            await _userManager.UpdateAsync(currentUser);

            return Ok();
        }
    }
}
