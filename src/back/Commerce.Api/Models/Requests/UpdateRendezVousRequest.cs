using Commerce.Api.Entities.Enums;

namespace Commerce.Api.Models.Requests
{

    public class UpdateRendezVousRequest
    {
        public string Titre { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty; 
        public int Interlocuteur { get; set; }  
        public TypeRendezVous TypeRendezVous { get; set; }
        public MotifRendezVous Motif { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }

    public class UpdateTimingRequest
    {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
