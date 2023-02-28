using Commerce.Api.Entities.Enums;

namespace Commerce.Api.Entities
{
    public class RendezVous
    {
        public int Id { get; set; }
        public string Titre { get; set; } = string.Empty; 
        public string Description { get; set; } = string.Empty;
        public Entreprise Entreprise { get; set; } = new();
        public Interlocuteur Interlocuteur { get; set; } = new();
        public TypeRendezVous TypeRendezVous { get; set; }
        public MotifRendezVous Motif { get; set; }
        public string UserId { get; set; }

        public ApplicationUser User { get; set; }
    }
}
