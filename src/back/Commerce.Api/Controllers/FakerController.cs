using Bogus;
using Commerce.Api.Data;
using Commerce.Api.Entities;
using Commerce.Api.Entities.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Commerce.Api.Controllers
{
    [Authorize(Roles = "Administrator")]
    [ApiController]
    [Route("api/faker")]
    public class FakerController: ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public FakerController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }


        [HttpGet("generate")]
        public async Task<IActionResult> GenerateRandomTestData()
        {
            var currentUserId = User.Claims.Where(c => c.Type == ClaimTypes.Sid)
                .First()
                .Value;

            await GenerateUsersAsync();

            await GenerateRendezVousAsync(currentUserId);

            return Ok();
        }

        private async Task GenerateRendezVousAsync(string adminId)
        {
            var users = _userManager.Users.ToList();

            var fakerEntreprise = new Faker<Entreprise>("fr")
                .RuleFor(u => u.Addresse, f => f.Address.StreetAddress())
                .RuleFor(u => u.CodePostal, f => f.Address.ZipCode())
                .RuleFor(u => u.Ville, f => f.Address.City())
                .RuleFor(u => u.Nom, f => f.Company.CompanyName())
                .RuleFor(u => u.TypeEntreprise, f => f.PickRandom<TypeEntreprise>());

            var fakerInterlocuteur = new Faker<Interlocuteur>("fr")
                .RuleFor(u => u.Nom, f => f.Person.FullName)
                .RuleFor(u => u.Email, f => f.Person.Email)
                .RuleFor(u => u.Numero, f => f.Person.Phone);

            var fakerRedenzVous = new Faker<RendezVous>("fr")
                .RuleFor(u => u.Titre, f => f.Lorem.Sentence(2, 2))
                .RuleFor(u => u.Description, f => f.Lorem.Sentence(5, 5))
                .RuleFor(u => u.Entreprise, fakerEntreprise.Generate())
                .RuleFor(u => u.Interlocuteur, fakerInterlocuteur.Generate())
                .RuleFor(u => u.TypeRendezVous, f => f.PickRandom<TypeRendezVous>())
                .RuleFor(u => u.Motif, f => f.PickRandom<MotifRendezVous>())
                .RuleFor(u => u.Start, f => f.Date.Between(new DateTime(2023, 1, 1), new DateTime(2023, 12, 31)))
                // End date will be set when going through the records. adding randomly 1 to 4 hours
                .RuleFor(u => u.Entreprise, fakerEntreprise.Generate())
                .RuleFor(u => u.Interlocuteur, fakerInterlocuteur.Generate());


            var rendezVous = fakerRedenzVous.Generate(3000);
            var faker = new Faker();
            foreach (var rdv in rendezVous)
            {
                rdv.Start = new DateTime(rdv.Start.Year, rdv.Start.Month, rdv.Start.Day, faker.PickRandom(8, 9, 10, 11, 12, 13, 14, 15, 16, 17), faker.PickRandom(0, 30), 0);
                rdv.End = rdv.Start.AddHours(faker.PickRandom(1, 2, 3, 4)); 
                rdv.User = faker.PickRandom(users.Where(u => u.Id != adminId));
                rdv.Id = Guid.NewGuid().ToString();

                _context.RendezVous.Add(rdv);
            }

            await _context.SaveChangesAsync(); 
        } 
        private async Task GenerateUsersAsync()
        {
            var faker = new Faker<ApplicationUser>("fr") 
                .RuleFor(u => u.FirstName, f => f.Person.FirstName)
                .RuleFor(u => u.LastName, f => f.Person.LastName)
                .RuleFor(u => u.Email, f => f.Person.Email)
                .RuleFor(u => u.SecurityStamp, Guid.NewGuid().ToString())
                .RuleFor(u => u.UserName, f => f.Person.UserName);

            var users = faker.Generate(10);

            foreach (var user in users)
            {
                user.CreatedAt = DateTime.Now;
                //user.Id = Guid.NewGuid().ToString();
                await _userManager.CreateAsync(user, "P@ssword1");
            }
        }

        [HttpGet("purge-data")]
        public async Task<IActionResult> PurgeAllData()
        {
            await _context.RendezVous
                .ExecuteDeleteAsync();

            var currentUserId = User.Claims.Where(c => c.Type == ClaimTypes.Sid)
                .First()
                .Value;

            await _userManager.Users
                .Where(u => u.Id != currentUserId)
                .ExecuteDeleteAsync();

            return Ok();
        }
    }
}
