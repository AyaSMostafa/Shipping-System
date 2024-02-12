using APIs.Constants;
using APIs.Models;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace APIs.Seeds
{
    public static class DefaultUsers
    {
        public static async Task SeedMerchantUserAsync(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            var defaultUser = new ApplicationUser()
            {
                FullName = "Merchant",
                UserName = "Merchant@gmail.com",
                Email = "Merchant@gmail.com",
                EmailConfirmed = true,
            };

            var user = await userManager.FindByEmailAsync(defaultUser.Email);
            if (user == null)
            {
                await userManager.CreateAsync(defaultUser, "123Pa$$word!");
                await userManager.AddToRoleAsync(defaultUser, Roles.Merchant.ToString());
            }
            await roleManager.SeedClaimsForMerchant();
        }

        private async static Task SeedClaimsForMerchant(this RoleManager<IdentityRole> roleManager)
        {
            var merchRole = await roleManager.FindByNameAsync("Merchant");
            await roleManager.AddPermissionClaimForMerch(merchRole, Entities.Orders.ToString());
        }
        public static async Task AddPermissionClaimForMerch(this RoleManager<IdentityRole> roleManager, IdentityRole role, string entity)
        {
            var allClaims = await roleManager.GetClaimsAsync(role);
            var allPermissions = new string[] { "OrdersDisplay", "OrdersCreate" };
            foreach (var permission in allPermissions)
            {
                if (!allClaims.Any(a => a.Type == "Permission" && a.Value == permission))
                {
                    await roleManager.AddClaimAsync(role, new Claim("Permission", permission));
                }
            }
        }
        public static async Task SeedSuperAdminAsync(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            var defaultUser = new ApplicationUser
            {
                FullName = "SuperAdmin",
                UserName = "superadmin@gmail.com",
                Email = "superadmin@gmail.com",
                EmailConfirmed = true
            };

            var user = await userManager.FindByEmailAsync(defaultUser.Email);
            if (user == null)
            {
                await userManager.CreateAsync(defaultUser, "123Pa$$word!");
                await userManager.AddToRoleAsync(defaultUser, Roles.SuperAdmin.ToString());
            }
            await roleManager.SeedClaimsForSuperAdmin();
        }

        private async static Task SeedClaimsForSuperAdmin(this RoleManager<IdentityRole> roleManager)
        {
            var adminRole = await roleManager.FindByNameAsync("SuperAdmin");
            await roleManager.AddPermissionClaim(adminRole, Entities.Cities.ToString());
            await roleManager.AddPermissionClaim(adminRole, Entities.Branches.ToString());
            await roleManager.AddPermissionClaim(adminRole, Entities.Governates.ToString());
            await roleManager.AddPermissionClaim(adminRole, Entities.Orders.ToString());
        }

        public static async Task AddPermissionClaim(this RoleManager<IdentityRole> roleManager, IdentityRole role, string entity)
        {
            var allClaims = await roleManager.GetClaimsAsync(role);
            var allPermissions = PermissionsClassProvider.GeneratePermissionsForEntity(entity);
            foreach (var permission in allPermissions)
            {
                if (!allClaims.Any(a => a.Type == "Permission" && a.Value == permission))
                {
                    await roleManager.AddClaimAsync(role, new Claim("Permission", permission));
                }
            }
        }

    }
}
