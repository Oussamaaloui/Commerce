using Commerce.Api.Entities.Enums;

namespace Commerce.Api.Models
{
    public class RendezVousViewModel
    {
        public string Id { get; set; }
        public string Titre { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;  
        public TypeRendezVous TypeRendezVous { get; set; }
        public MotifRendezVous Motif { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string User { get; set; }
        public string UserId { get; set; }
        public int InterlocuteurId { get; set; }
        public int? EntrepriseId { get; set; }
    }
}
