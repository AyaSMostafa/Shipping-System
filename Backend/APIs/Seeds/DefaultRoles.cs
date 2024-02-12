using APIs.Constants;
using Microsoft.AspNetCore.Identity;

namespace APIs.Seeds
{
    public static class DefaultRoles
    {
        public static async Task SeedAsync( RoleManager<IdentityRole> roleManager)
        {
            if(!roleManager.Roles.Any(r => r.Name == Roles.SuperAdmin.ToString()))
                 await roleManager.CreateAsync(new IdentityRole(Roles.SuperAdmin.ToString()));

            if (!roleManager.Roles.Any(r => r.Name == Roles.Employee.ToString()))
                await roleManager.CreateAsync(new IdentityRole(Roles.Employee.ToString()));

            if (!roleManager.Roles.Any(r => r.Name == Roles.Merchant.ToString()))
                await roleManager.CreateAsync(new IdentityRole(Roles.Merchant.ToString()));
        }

        public static async Task SeedPermissionsAsync(RoleManager<IdentityRole> roleManager)
        {
            var role = await roleManager.FindByNameAsync(Roles.SuperAdmin.ToString());
            await roleManager.AddPermissionClaim(role, Entities.Governates.ToString());
        }
    }
}
