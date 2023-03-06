using Microsoft.AspNetCore.Identity;

namespace Commerce.Api.Entities
{
    public class ApplicationUser: IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public bool Active { get; set; }
        public DateTime LastActivity { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
