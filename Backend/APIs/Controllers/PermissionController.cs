using APIs.Constants;
using APIs.Helpers;
using DTOLibrary;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "SuperAdmin")]
    public class PermissionController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> roleManager;
        public PermissionController(RoleManager<IdentityRole> roleManager)
        {
            this.roleManager = roleManager;
        }

        [HttpGet("GetAllPermissions")]
        public IActionResult GetAllPermissions()
        {
            var model = new PermissionDTO();
            var allPermissions = new List<RoleClaimsDTO>();
            allPermissions.GetPermissions(typeof(PermissionsClassProvider.Cities));
            allPermissions.GetPermissions(typeof(PermissionsClassProvider.Branches));
            allPermissions.GetPermissions(typeof(PermissionsClassProvider.Governates));
            allPermissions.GetPermissions(typeof(PermissionsClassProvider.Orders));
            foreach (var permission in allPermissions)
            {
               permission.Selected = false;
            }
            model.RoleClaims = allPermissions;
            return Ok(model);
        }

        [HttpGet("GetRolePermissions")]
        public async Task<ActionResult> GetRolePermissions(string roleId)
        {
            var model = new PermissionDTO();
            var allPermissions = new List<RoleClaimsDTO>();
            allPermissions.GetPermissions(typeof(PermissionsClassProvider.Cities));
            allPermissions.GetPermissions(typeof(PermissionsClassProvider.Branches));
            allPermissions.GetPermissions(typeof(PermissionsClassProvider.Governates));
            allPermissions.GetPermissions(typeof(PermissionsClassProvider.Orders));
            var role = await roleManager.FindByIdAsync(roleId);
            model.RoleId = roleId;
            var claims = await roleManager.GetClaimsAsync(role);
            var allClaimValues = allPermissions.Select(a => a.Value).ToList();
            var roleClaimValues = claims.Select(a => a.Value).ToList();
            var authorizedClaims = allClaimValues.Intersect(roleClaimValues).ToList();
            foreach (var permission in allPermissions)
            {
                if (authorizedClaims.Any(a => a == permission.Value))
                {
                    permission.Selected = true;
                }
            }
            model.RoleClaims = allPermissions;
            return Ok(model);
        }

        [HttpPost]
        public async Task<IActionResult> AddOrUpdate(PermissionDTO model)
        {
            var role = await roleManager.FindByIdAsync(model.RoleId);
            var claims = await roleManager.GetClaimsAsync(role);
            foreach (var claim in claims)
            {
                await roleManager.RemoveClaimAsync(role, claim);
            }
            var selectedClaims = model.RoleClaims.Where(a => a.Selected).ToList();
            foreach (var claim in selectedClaims)
            {
                await roleManager.AddPermissionClaim(role, claim.Value);
            }
            return Ok();
        }
    }
}
