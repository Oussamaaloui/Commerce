using Commerce.Api.Entities.Enums;

namespace Commerce.Api.Models
{
    public class EntrepriseViewModel
    {
        public int Id { get; set; }
        public string Nom { get; set; } = string.Empty;
        public string Addresse { get; set; } = string.Empty;
        public string Ville { get; set; } = string.Empty;
        public int CodePostal { get; set; }
        public TypeEntreprise TypeEntreprise { get; set; }
    }
}
