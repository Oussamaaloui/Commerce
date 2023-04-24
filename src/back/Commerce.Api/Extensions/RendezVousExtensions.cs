using Commerce.Api.Entities;
using Commerce.Api.Models;

namespace Commerce.Api.Extensions
{
    public static class RendezVousExtensions
    {

        public static RendezVousViewModel ToViewModel(this RendezVous input)
        {
            return new RendezVousViewModel
            {
                Id = input.Id,
                Titre = input.Titre,
                Description = input.Description,
                Motif = input.Motif,
                TypeRendezVous = input.TypeRendezVous,
                Start = input.Start,
                End= input.End,
                User = $"{input.User.FirstName}, {input.User.LastName}",
                UserId = input.UserId,
                InterlocuteurId = input.InterlocuteurId,
                EntrepriseId = input.Interlocuteur.EntrepriseId
            };
        }

        public static IEnumerable<RendezVousViewModel> ToListViewModel(this IEnumerable<RendezVous> list)
        {
            foreach (var item in list)
            {
                yield return item.ToViewModel();
            }
        }
    }
}
