using Commerce.Api.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Commerce.Api.Controllers
{
    [Authorize(Roles = "Administrator")]
    [ApiController]
    [Route("api/reporting")]
    public class ReportingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReportingController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("by-type")]
        public async Task<IActionResult> GetByType()
        {
            var result = await _context.RendezVous.AsNoTracking()
                .GroupBy(r => r.TypeRendezVous)
                .Select(g => new { key = g.Key, val = g.Count() })
                .ToListAsync(); 

            return Ok(result);
        }

        [HttpGet("by-motif")]
        public async Task<IActionResult> GetByMotif()
        {
            var result = await _context.RendezVous.AsNoTracking()
                .GroupBy(r => r.Motif)
                .Select(g => new { key = g.Key, val = g.Count() })
                .ToListAsync();

            return Ok(result);
        }

        [HttpGet("by-type-entreprise")]
        public async Task<IActionResult> GetByTypeEntreprise()
        {
            var result = await _context.RendezVous.AsNoTracking()
                .GroupBy(r => r.Entreprise.TypeEntreprise)
                .Select(g => new { key = g.Key, val = g.Count() })
                .ToListAsync();

            return Ok(result);
        }

        [HttpGet("by-day-of-week")]
        public async Task<IActionResult> GetByDayOfWeek()
        {
            var result = (await _context.RendezVous
                .AsNoTracking()
                .ToListAsync())
                .GroupBy(r => r.Start.DayOfWeek)
                .OrderBy(g => g.Key)
                .Select(g => new { key = (int) g.Key, val = g.Count() });

            return Ok(result);
        }
        [HttpGet("by-month")]
        public async Task<IActionResult> GetByMonth()
        {
            var result = (await _context.RendezVous
                .AsNoTracking()
                .ToListAsync())
                .GroupBy(r => r.Start.Month)
                .OrderBy(g => g.Key)
                .Select(g => new { key = (int)g.Key - 1, val = g.Count() });

            return Ok(result);
        }
    }
}
