using Commerce.Api.Entities;
using Commerce.Api.Models;

namespace Commerce.Api.Extensions
{
    public static class EntrepriseExtensions
    {
        public static IEnumerable<EntrepriseViewModel> ToViewModels(this IEnumerable<Entreprise> interlocuteurs)
        {
            foreach (var item in interlocuteurs)
            {
                yield return item.ToViewModel();
            }
        }
        public static EntrepriseViewModel ToViewModel(this Entreprise entreprise)
        {
            return new()
            {
                Id = entreprise.Id,
                Nom = entreprise.Nom,
                Addresse = entreprise.Addresse,
                CodePostal = entreprise.CodePostal,
                Ville = entreprise.Ville,
                Type = entreprise.TypeEntreprise
            };
        }
    }
}
