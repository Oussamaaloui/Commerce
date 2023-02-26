using System.ComponentModel.DataAnnotations;

namespace Commerce.Api.Models.Auth
{
    public class LoginModel
    {
        [Required(ErrorMessage = "Email obligatoire")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Mot de pass obligatoire")]
        public string? Password { get; set; }
    }
}
