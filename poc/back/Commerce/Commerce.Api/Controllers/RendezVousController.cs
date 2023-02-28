﻿using Commerce.Api.Data;
using Commerce.Api.Entities;
using Commerce.Api.Extensions;
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
    [Route("rendez-vous")]
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

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var currentUserId = User.Claims.Where(c => c.Type == JwtRegisteredClaimNames.Jti)
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
        public async Task<IActionResult> Create(RendezVousViewModel input)
        {
            var currentUserId = User.Claims.Where(c => c.Type == JwtRegisteredClaimNames.Jti)
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
                End= input.End,
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

            if (result == 1)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> Update([FromQuery] string id, [FromBody] RendezVousViewModel input)
        {
            var currentUserId = User.Claims.Where(c => c.Type == JwtRegisteredClaimNames.Jti)
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
            rendezVous.Description  = input.Description;
            rendezVous.Motif = input.Motif;
            rendezVous.TypeRendezVous = input.TypeRendezVous;
            rendezVous.Start = input.Start;
            rendezVous.End = input.End;
            rendezVous.Entreprise.Nom = input.Entreprise;
            rendezVous.Entreprise.Addresse= input.Addresse;
            rendezVous.Entreprise.CodePostal= input.CodePostal;
            rendezVous.Entreprise.Ville= input.Ville;
            rendezVous.Entreprise.TypeEntreprise = input.TypeEntreprise;
            rendezVous.Interlocuteur.Nom = input.Interlocuteur;
            rendezVous.Interlocuteur.Numero = input.Numero;
            rendezVous.Interlocuteur.Email= input.Email;     

            _context.RendezVous.Update(rendezVous);
            var result = await _context.SaveChangesAsync();

            if (result == 1)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var currentUserId = User.Claims.Where(c => c.Type == JwtRegisteredClaimNames.Jti)
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
    }
}
