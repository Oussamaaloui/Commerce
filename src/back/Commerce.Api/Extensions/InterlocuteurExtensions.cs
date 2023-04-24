using Commerce.Api.Entities;
using Commerce.Api.Models;

namespace Commerce.Api.Extensions
{
    public static class InterlocuteurExtensions
    {
        public static IEnumerable<InterlocuteurViewModel> ToViewModels(this IEnumerable<Interlocuteur> interlocuteurs)
        {
            foreach (var item in interlocuteurs)
            {
                yield return item.ToViewModel();
            }
        }
        public static InterlocuteurViewModel ToViewModel(this Interlocuteur interlocuteur)
        {
            return new()
            {
                Id = interlocuteur.Id,
                Email = interlocuteur.Email,
                Nom = interlocuteur.Nom,
                Numero = interlocuteur.Numero,
                Entreprise = interlocuteur.Entreprise?.Nom ?? "Entreprise non assignée!",
                EntrepriseId = interlocuteur.EntrepriseId
            };
        }
    }
}
