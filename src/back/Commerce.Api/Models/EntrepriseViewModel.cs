using Commerce.Api.Entities.Enums;
using System.ComponentModel.DataAnnotations;

namespace Commerce.Api.Models
{
    public record EntrepriseViewModel
    {
        public int Id { get; set; } 
        public string Nom { get; set; } = string.Empty; 
        public string Addresse { get; set; } = string.Empty; 
        public string Ville { get; set; } = string.Empty; 
        public string CodePostal { get; set; } = string.Empty; 
    }
}
