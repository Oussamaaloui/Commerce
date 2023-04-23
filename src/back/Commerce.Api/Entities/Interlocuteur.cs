using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Commerce.Api.Entities
{
    public class Interlocuteur
    {
        public int Id { get; set; }
        [MaxLength(50)]
        public string Nom { get; set; } = string.Empty;
        [MaxLength(15)]
        public string Numero { get; set; } = string.Empty;
        [MaxLength(75)]
        public string Email { get; set; } = string.Empty;
        [ForeignKey(nameof(Entreprise))]
        public int? EntrepriseId { get; set; }
        public virtual Entreprise? Entreprise { get; set; }
    }
}
