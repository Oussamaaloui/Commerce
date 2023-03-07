using Commerce.Api.Entities.Enums;
using System.ComponentModel.DataAnnotations;

namespace Commerce.Api.Entities
{
    public class Entreprise
    {
        public int Id { get; set; }
        public string Nom { get; set; } = string.Empty;
        public string Addresse { get; set; } = string.Empty;
        public string Ville { get; set; } = string.Empty;
        [MaxLength(5)]
        public string CodePostal { get; set; } = string.Empty;
        public TypeEntreprise TypeEntreprise { get; set; }
    }
}
