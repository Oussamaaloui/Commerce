using Commerce.Api.Data;
using Commerce.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography.Xml;

namespace Commerce.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class RendezVousController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RendezVousController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var currentUserId = User.Claims.Where(c => c.Type == JwtRegisteredClaimNames.Jti)
                .First()
                .Value;

            var listeRendezVous = await _context.RendezVous
                .Where(r => r.UserId == currentUserId)
                .ToListAsync();

            var result = new List<RendezVousViewModel>();

            foreach (var item in listeRendezVous)
            {
                result.Add(new RendezVousViewModel()
                {

                });
            }

            return Ok(result);
        }
    }
}
