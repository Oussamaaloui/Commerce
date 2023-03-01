using Commerce.Api.Data;
using Commerce.Api.Entities;
using Commerce.Api.Extensions;
using Commerce.Api.Models;
using Commerce.Api.Models.Requests;
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
    [Route("api/rendez-vous")]
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
            var currentUserId = User.Claims.Where(c => c.Type == ClaimTypes.Sid)
                .First()
                .Value;

            var listeRendezVous = await _context.RendezVous
                .Where(r => r.UserId == currentUserId)
                .ToListAsync();

             

            return Ok(listeRendezVous.ToListViewModel());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var currentUserId = User.Claims.Where(c => c.Type == ClaimTypes.Sid)
                .First()
                .Value;

            var rendezVous = await _context.RendezVous
                .Where(r => r.UserId == currentUserId)
                .Where(r => r.Id == id)
                .FirstOrDefaultAsync();

            if (rendezVous is null)
            {
                return NotFound();
            }

            return Ok(rendezVous.ToViewModel());
        }

        [HttpPut]
        public async Task<IActionResult> Create(CreateRendezVousRequest input)
        {
            var currentUserId = User.Claims.Where(c => c.Type == ClaimTypes.Sid)
                .First()
                .Value;

            var rdv = new RendezVous
            {
                Id = Guid.NewGuid().ToString(),
                Titre = input.Titre,
                Description = input.Description,
                Motif = input.Motif,
                UserId = currentUserId,
                TypeRendezVous = input.TypeRendezVous,
                Start = input.Start,
                End = input.End,
                Entreprise = new()
                {
                    Nom = input.Entreprise,
                    Addresse = input.Addresse,
                    CodePostal = input.CodePostal,
                    Ville = input.Ville,
                    TypeEntreprise = input.TypeEntreprise,
                },
                Interlocuteur = new()
                {
                    Nom = input.Interlocuteur,
                    Email = input.Email,
                    Numero = input.Numero,
                }
            };

            _context.RendezVous.Add(rdv);
            var result = await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] UpdateRendezVousRequest input)
        {
            var currentUserId = User.Claims.Where(c => c.Type == ClaimTypes.Sid)
                .First()
                .Value;

            var rendezVous = await _context.RendezVous
                .Where(r => r.UserId == currentUserId)
                .Where(r => r.Id == id)
                .FirstOrDefaultAsync();

            if (rendezVous is null)
            {
                return NotFound();
            }

            rendezVous.Titre = input.Titre;
            rendezVous.Description = input.Description;
            rendezVous.Motif = input.Motif;
            rendezVous.TypeRendezVous = input.TypeRendezVous;
            rendezVous.Start = input.Start;
            rendezVous.End = input.End;
            rendezVous.Entreprise.Nom = input.Entreprise;
            rendezVous.Entreprise.Addresse = input.Addresse;
            rendezVous.Entreprise.CodePostal = input.CodePostal;
            rendezVous.Entreprise.Ville = input.Ville;
            rendezVous.Entreprise.TypeEntreprise = input.TypeEntreprise;
            rendezVous.Interlocuteur.Nom = input.Interlocuteur;
            rendezVous.Interlocuteur.Numero = input.Numero;
            rendezVous.Interlocuteur.Email = input.Email;

            _context.RendezVous.Update(rendezVous);
            var result = await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var currentUserId = User.Claims.Where(c => c.Type == ClaimTypes.Sid)
                .First()
                .Value;

            var rendezVous = await _context.RendezVous
                .Where(r => r.UserId == currentUserId)
                .Where(r => r.Id == id)
                .FirstOrDefaultAsync();

            if (rendezVous is null)
            {
                return NotFound();
            }

            _context.RendezVous.Remove(rendezVous);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost("update-timing/{id}")]
        public async Task<IActionResult> UpdateTiming(string id, [FromBody] UpdateTimingRequest request)
        {
            var currentUserId = User.Claims.Where(c => c.Type == ClaimTypes.Sid)
                .First()
                .Value;

            var rendezVous = await _context.RendezVous
                .Where(r => r.UserId == currentUserId)
                .Where(r => r.Id == id)
                .FirstOrDefaultAsync();

            if (rendezVous is null)
            {
                return NotFound();
            }

            rendezVous.Start = request.Start;
            rendezVous.End = request.End;

            _context.RendezVous.Update(rendezVous);
            var result = await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
