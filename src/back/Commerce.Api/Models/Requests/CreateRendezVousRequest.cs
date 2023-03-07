using Commerce.Api.Entities.Enums;

namespace Commerce.Api.Models.Requests
{
    public class CreateRendezVousRequest
    {
        public string Titre { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Entreprise { get; set; } = string.Empty;
        public string Addresse { get; set; } = string.Empty;
        public string Ville { get; set; } = string.Empty;
        public string CodePostal { get; set; }
        public TypeEntreprise TypeEntreprise { get; set; }
        public string Interlocuteur { get; set; } = string.Empty;
        public string Numero { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public TypeRendezVous TypeRendezVous { get; set; }
        public MotifRendezVous Motif { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
