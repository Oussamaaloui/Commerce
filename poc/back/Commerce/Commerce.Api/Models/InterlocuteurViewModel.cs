namespace Commerce.Api.Models
{
    public class InterlocuteurViewModel
    {
        public int Id { get; set; }
        public string Nom { get; set; } = string.Empty;
        public string Numero { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }
}
