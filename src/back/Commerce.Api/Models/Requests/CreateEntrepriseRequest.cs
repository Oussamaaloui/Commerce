using Commerce.Api.Entities.Enums;
using System.ComponentModel.DataAnnotations;

namespace Commerce.Api.Models.Requests
{
    public record CreateEntrepriseRequest
    {
        public string Nom { get; set; } = string.Empty;
        [MaxLength(200)]
        public string Addresse { get; set; } = string.Empty;
        [MaxLength(50)]
        public string Ville { get; set; } = string.Empty;
        [MaxLength(5)]
        public string CodePostal { get; set; } = string.Empty;
        public TypeEntreprise TypeEntreprise { get; set; }
    }
}
