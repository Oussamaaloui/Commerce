using Commerce.Api.Entities.Enums;
using Commerce.Api.Entities;

namespace Commerce.Api.Models
{
    public class RendezVousViewModel
    {
        public int Id { get; set; }
        public string Titre { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public EntrepriseViewModel Entreprise { get; set; } = new();
        public InterlocuteurViewModel Interlocuteur { get; set; } = new();
        public TypeRendezVous TypeRendezVous { get; set; }
        public MotifRendezVous Motif { get; set; }
    }
}
