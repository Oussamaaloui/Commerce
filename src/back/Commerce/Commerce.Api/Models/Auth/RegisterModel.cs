using System.ComponentModel.DataAnnotations;

namespace Commerce.Api.Models.Auth
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "Prénom obligatoire")]
        public string FirstName { get; set; } = string.Empty;
        [Required(ErrorMessage ="Nom obligatoire")]

        public string LastName { get; set; } = string.Empty;

        [EmailAddress]
        [Required(ErrorMessage = "Email obligatoire")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Mot de passe obligatoire")]
        public string Password { get; set; } = string.Empty;
    }
}
