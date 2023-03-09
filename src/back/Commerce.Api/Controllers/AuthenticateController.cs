using Commerce.Api.Entities;
using Commerce.Api.Models.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Commerce.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController: ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        public AuthenticateController(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }

        [Authorize]
        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword(ChangePasswordModel model)
        {
            var response = new Response { Status = "Erreur", Message = "Mise à jour mot de passe échouée" };
            var currentUserEmail = User.Claims.Where(c => c.Type == ClaimTypes.Email)
                .First()
                .Value;

            var user = await _userManager.FindByEmailAsync(currentUserEmail);

            if(user is null)
            {
                return Unauthorized();
            }

            var result = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);

            if (result.Succeeded)
            {
                return Ok();
            }
            else
            {
                foreach (var error in result.Errors)
                {
                    response.Errors.Add(error.Description);
                }

                return StatusCode(StatusCodes.Status400BadRequest, response);
            } 
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                if (!user.Active)
                {
                    return StatusCode(403, "Votre compte est désactivé!");
                }

                var userRoles = await _userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Name, $"{user.FirstName}, {user.LastName}"),
                    new Claim(ClaimTypes.Sid, user.Id),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var token = GetToken(authClaims);

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo,
                    email = user.Email,
                    firstName = user.FirstName,
                    lastName = user.LastName,
                    isAdmin = userRoles?.Contains("Administrator") ?? false
                });
            }
            return Unauthorized();
        }

        //private async Task<bool> IsUserAdminAsync(ApplicationUser user)
        //{
        //    var adminRole = await _roleManager.FindByNameAsync("Administrator");

        //    if(adminRole is null)
        //    {
        //        await _roleManager.CreateAsync(new IdentityRole("Administrator"));
        //    }

        //    var roles = await _userManager.GetRolesAsync(user);

        //    return roles.Any() && roles.Where(r => r.Equals("Administrator")).Any();
        //}

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var response = new Response { Status = "Erreur", Message = "User creation failed! Please check user details and try again." };
            if (string.IsNullOrEmpty(model.Email))
            {
                response.Errors.Add("Email should not be empty");
            }

            if (string.IsNullOrEmpty(model.Password))
            {
                response.Errors.Add("Password should not be empty");
            }

            if(response.Errors.Count > 0)
            {
                return StatusCode(StatusCodes.Status400BadRequest, response);
            }

            var userExists = await _userManager.FindByEmailAsync(model.Email);
            if (userExists != null)
                return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Erreur", Message = "User existant!" });

            ApplicationUser user = new()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Email,
                FirstName= model.FirstName,
                LastName= model.LastName,
                CreatedAt = DateTime.Now
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            { 
                foreach (var error in result.Errors)
                {
                    response.Errors.Add(error.Description);
                }

                return StatusCode(StatusCodes.Status400BadRequest, response);
            }
                

            return Ok();
        }
         

        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }
    }
}
