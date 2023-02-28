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
                Addresse = input.Entreprise.Addresse,
                Titre = input.Titre,
                Description = input.Description,
                Ville = input.Entreprise.Ville,
                Interlocuteur = input.Interlocuteur.Nom,
                Numero = input.Interlocuteur.Numero,
                CodePostal = input.Entreprise.CodePostal,
                Email = input.Interlocuteur.Email,
                Entreprise = input.Entreprise.Nom,
                Motif = input.Motif,
                TypeEntreprise = input.Entreprise.TypeEntreprise,
                TypeRendezVous = input.TypeRendezVous,
                Start = input.Start,
                End= input.End,
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
