using Commerce.Api.Data;
using Commerce.Api.Entities;
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
        public async Task<IActionResult> GetByType(string userId="")
        {
            var queryable = _context.RendezVous.AsQueryable();

            if (!string.IsNullOrEmpty(userId))
            {
                queryable = queryable.Where(r => userId == r.UserId);
            }

            var result = await queryable.AsNoTracking()
                .GroupBy(r => r.TypeRendezVous)
                .Select(g => new { key = g.Key, val = g.Count() })
                .ToListAsync();

            return Ok(result);
        }

        [HttpGet("by-motif")]
        public async Task<IActionResult> GetByMotif(string userId = "")
        {
            var queryable = _context.RendezVous.AsQueryable();

            if (!string.IsNullOrEmpty(userId))
            {
                queryable = queryable.Where(r => userId == r.UserId);
            }

            var result = await queryable.AsNoTracking()
                .GroupBy(r => r.Motif)
                .Select(g => new { key = g.Key, val = g.Count() })
                .ToListAsync();

            return Ok(result);
        }

        [HttpGet("by-type-entreprise")]
        public async Task<IActionResult> GetByTypeEntreprise(string userId = "")
        {
            var queryable = _context.RendezVous.AsQueryable();

            if (!string.IsNullOrEmpty(userId))
            {
                queryable = queryable.Where(r => userId == r.UserId);
            }


            var result = await queryable.AsNoTracking()
                .GroupBy(r => r.Entreprise.TypeEntreprise)
                .Select(g => new { key = g.Key, val = g.Count() })
                .ToListAsync();

            return Ok(result);
        }

        [HttpGet("by-day-of-week")]
        public async Task<IActionResult> GetByDayOfWeek(string userId = "")
        {
            var queryable = _context.RendezVous.AsQueryable();

            if (!string.IsNullOrEmpty(userId))
            {
                queryable = queryable.Where(r => userId == r.UserId);
            }


            var result = (await queryable
                .AsNoTracking()
                .ToListAsync())
                .GroupBy(r => r.Start.DayOfWeek)
                .OrderBy(g => g.Key)
                .Select(g => new { key = (int)g.Key, val = g.Count() });

            return Ok(result);
        }
        [HttpGet("by-month")]
        public async Task<IActionResult> GetByMonth(string userId = "")
        {
            var queryable = _context.RendezVous.AsQueryable();

            if (!string.IsNullOrEmpty(userId))
            {
                queryable = queryable.Where(r => userId == r.UserId);
            }

            var result = (await queryable
                .AsNoTracking()
                .ToListAsync())
                .GroupBy(r => r.Start.Month)
                .OrderBy(g => g.Key)
                .Select(g => new { key = (int)g.Key - 1, val = g.Count() });

            return Ok(result);
        }


        [HttpGet("summary")]
        public IActionResult GetSummary(string userId = "")
        {
            var queryable = _context.RendezVous.AsQueryable();
            
            var todaysDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);

            var thisMonthStartDate = new DateTime(todaysDate.Year, todaysDate.Month, 1);
            var thisMonthEndDate = thisMonthStartDate.AddMonths(1);
            var thisWeekStartDate = todaysDate.AddDays(-(int)todaysDate.DayOfWeek);
            var thisWeekEndDate = thisWeekStartDate.AddDays(7);

            var today = 0;
            var thisWeek = 0;
            var thisMonth = 0;
            var total = 0;

            if (string.IsNullOrEmpty(userId))
            {
                thisMonth = queryable.Where(r => r.Start >= thisMonthStartDate && r.Start <= thisMonthEndDate).Count();
                thisWeek = queryable.Where(r => r.Start >= thisWeekStartDate && r.Start <= thisWeekEndDate).Count();
                today = queryable.Where(r => r.Start >= todaysDate && r.Start <= todaysDate.AddDays(1).AddSeconds(-1)).Count();
                total = queryable.Count();
            }
            else
            {
                thisMonth = queryable.Where(r => r.Start >= thisMonthStartDate && r.Start <= thisMonthEndDate && userId == r.UserId).Count();
                thisWeek = queryable.Where(r => r.Start >= thisWeekStartDate && r.Start <= thisWeekEndDate && userId == r.UserId).Count();
                today = queryable.Where(r => r.Start >= todaysDate && r.Start <= todaysDate.AddDays(1).AddSeconds(-1) && userId == r.UserId).Count();
                total = queryable.Count(r => r.UserId == userId);
            } 

            return Ok(new
            {
                total = total,
                month = thisMonth,
                week = thisWeek,
                day = today
            });
        }

        [HttpGet("by-agent")]
        public IActionResult GetTotalByAgent()
        {
            var result = _context.RendezVous
                .GroupBy(r => r.User)
                .OrderByDescending(g => g.Count())
                .Select(g => new { key = $"{g.Key.FirstName}, {g.Key.LastName}", val = g.Count() });

            return Ok(result);
        }

        [HttpGet("by-agent-this-month")]
        public IActionResult GetTotalByAgentThisMonth()
        {
            var result = _context.RendezVous
                .Where(r => r.Start.Month == DateTime.Now.Month)
                .GroupBy(r => r.User)
                .OrderByDescending(g => g.Count())
                .Select(g => new { key = $"{g.Key.FirstName}, {g.Key.LastName}", val = g.Count() });

            return Ok(result);
        }
    }
}
