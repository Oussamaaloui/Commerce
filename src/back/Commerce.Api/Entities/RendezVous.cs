using Commerce.Api.Entities.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Commerce.Api.Entities
{
    public class RendezVous
    {
        [MaxLength(36)]
        public string Id { get; set; } = string.Empty;
        [MaxLength(100)]
        public string Titre { get; set; } = string.Empty;
        [MaxLength(250)]
        public string Description { get; set; } = string.Empty;
        //public virtual Entreprise Entreprise { get; set; } = new();
        [ForeignKey(nameof(Interlocuteur))]
        public int InterlocuteurId { get; set; }
        public virtual Interlocuteur Interlocuteur { get; set; } = new();
        public TypeRendezVous TypeRendezVous { get; set; }
        public MotifRendezVous Motif { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        [MaxLength(450)]
        public string UserId { get; set; } = string.Empty;

        public virtual ApplicationUser User { get; set; }
    }
}
