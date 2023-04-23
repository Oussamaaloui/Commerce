using Commerce.Api.Data;
using Commerce.Api.Entities;
using Commerce.Api.Extensions;
using Commerce.Api.Models.Requests;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; 

namespace Commerce.Api.Controllers
{
    [ApiController]
    [Route("api/interlocuteurs")]
    public class InterlocuteurController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public InterlocuteurController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get(CancellationToken cancellationToken)
        {
            var interlocuteurs = await _context.Interlocuteurs.ToListAsync(cancellationToken);
            return Ok(interlocuteurs.ToViewModels());
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id, CancellationToken cancellationToken)
        {
            var interlocuteur = await _context.Interlocuteurs.FirstOrDefaultAsync(e => e.Id == id, cancellationToken);

            if (interlocuteur is null)
            {
                return NotFound();
            }

            return Ok(interlocuteur.ToViewModel());
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
        {
            var interlocuteur = await _context.Interlocuteurs.FirstOrDefaultAsync(e => e.Id == id, cancellationToken);

            if (interlocuteur is null)
            {
                return NotFound();
            }

            await _context.Interlocuteurs.Where(e => e.Id == id)
                .ExecuteDeleteAsync(cancellationToken);

            return NoContent();
        }

        [HttpPut]
        public async Task<IActionResult> Create(CreateInterlocuteurRequest request, CancellationToken cancellationToken)
        {
            var entreprise = await _context.Entreprises.FirstOrDefaultAsync(e => e.Id == request.EntrepriseId);

            if (entreprise is null)
            {
                return BadRequest($"Entreprise avec Id {request.EntrepriseId} non existante!");
            }

            var interlocuteurAncient = await _context.Interlocuteurs.FirstOrDefaultAsync(i => i.Email == request.Email || i.Numero == request.Numero, cancellationToken);

            if(interlocuteurAncient is not null)
            {
                return BadRequest($"Il existe déjà un interlocuteur avec email '{request.Email}' ou numéro '{request.Numero}'");
            }

            var interlocuteur = new Interlocuteur
            {
                Nom = request.Nom,
                Email = request.Email,
                EntrepriseId = request.EntrepriseId,
                Numero = request.Numero
            };

            await _context.Interlocuteurs.AddAsync(interlocuteur, cancellationToken);

            await _context.SaveChangesAsync(cancellationToken);

            return CreatedAtAction(nameof(Get), new { id = interlocuteur.Id });
        }

        [HttpPost("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateInterlocuteurRequest request, CancellationToken cancellationToken)
        {
            var interlocuteur = await _context.Interlocuteurs.FirstOrDefaultAsync(e => e.Id == id);

            if (interlocuteur is null)
            {
                return NotFound();
            }

            var entreprise = await _context.Entreprises.FirstOrDefaultAsync(e => e.Id == request.EntrepriseId);

            if(entreprise is null)
            {
                return BadRequest($"Entreprise avec Id {request.EntrepriseId} non existante!");
            }

            interlocuteur.Nom = request.Nom;
            interlocuteur.Email = request.Email;
            interlocuteur.EntrepriseId = request.EntrepriseId;
            interlocuteur.Numero = request.Numero;

            await _context.SaveChangesAsync(cancellationToken);

            return Ok();
        }
    }
}
