using Commerce.Api.Data;
using Commerce.Api.Entities;
using Commerce.Api.Extensions;
using Commerce.Api.Models.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Commerce.Api.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("api/entreprises")]
    public class EntrepriseController: ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EntrepriseController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get(CancellationToken cancellationToken)
        {
            var entreprises = await _context.Entreprises.ToListAsync(cancellationToken);
            return Ok(entreprises.ToViewModels());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id, CancellationToken cancellationToken)
        {
            var entreprise = await _context.Entreprises.FirstOrDefaultAsync(e => e.Id == id, cancellationToken);

            if(entreprise is null)
            {
                return NotFound();
            }

            return Ok(entreprise.ToViewModel());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
        {
            var entreprise = await _context.Entreprises.FirstOrDefaultAsync(e => e.Id == id, cancellationToken);

            if (entreprise is null)
            {
                return NotFound();
            }

            await _context.Entreprises.Where(e => e.Id == id)
                .ExecuteDeleteAsync(cancellationToken);

            return NoContent();
        }

        [HttpPut]
        public async Task<IActionResult> Create(CreateEntrepriseRequest request, CancellationToken cancellationToken)
        {
            var entreprise = new Entreprise
            {
                Nom = request.Nom,
                Addresse = request.Addresse,
                CodePostal = request.CodePostal,
                Ville = request.Ville,
                TypeEntreprise = request.TypeEntreprise,
            };

            await _context.Entreprises.AddAsync(entreprise, cancellationToken);

            await _context.SaveChangesAsync(cancellationToken); 

            return CreatedAtAction(nameof(Get), new {id = entreprise.Id});
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateEntrepriseRequest request, CancellationToken cancellationToken)
        {
            var entreprise = await _context.Entreprises.FirstOrDefaultAsync(e => e.Id == id);

            if(entreprise is null)
            {
                return NotFound();
            }

            entreprise.Addresse = request.Addresse;
            entreprise.Nom = request.Nom;
            entreprise.Ville = request.Ville;
            entreprise.CodePostal = request.CodePostal;
            entreprise.TypeEntreprise = request.TypeEntreprise;

            await _context.SaveChangesAsync(cancellationToken);

            return Ok();
        }

    }
}
