using Commerce.Api.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Commerce.Api.Models.Requests
{
    public record UpdateInterlocuteurRequest
    {
        public string Nom { get; set; } = string.Empty;
        public string Numero { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int EntrepriseId { get; set; }
    }
}
