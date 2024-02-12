using Microsoft.AspNetCore.Identity;

namespace APIs.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; }

        //Navigation Property
        //   -> permissions
    }
}
