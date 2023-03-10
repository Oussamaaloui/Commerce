using System.ComponentModel.DataAnnotations;

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
    }
}
