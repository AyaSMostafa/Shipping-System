using APIs.Constants;
using APIs.Helpers;
using APIs.Models;
using DTOLibrary;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolePermissionsController : Controller
    {
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly Context db;

        public RolePermissionsController(RoleManager<IdentityRole> roleManager, Context db )
        {
            this.roleManager = roleManager;
            this.db = db;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var roles = roleManager.Roles.ToList();
            return Ok(roles);
        }


        [HttpPost]
        public async Task<IActionResult> AddorUpdate(RolePermissionsDTO newRole)
        {
            try
            {
                IdentityRole role;
                if (newRole.RoleId != "")//if role exists, delete all claims
                {
                    role = await roleManager.FindByIdAsync(newRole.RoleId);
                    var claims = await roleManager.GetClaimsAsync(role);
                    foreach (var claim in claims)
                        {
                            await roleManager.RemoveClaimAsync(role, claim);
                        }
                }
                else //if not, add new role
                {
                    role = new IdentityRole();
                    role.Name = newRole.Name.Trim();
                    IdentityResult result = await roleManager.CreateAsync(role);
                }
                foreach (var claim in newRole.Permissions)
                {
                    await roleManager.AddPermissionClaim(role, claim);
                }
                return Ok(role);
            }catch(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteRole(string RoleId)
        {
            try
            {
                if (RoleId != null)
                {
                    var role = await roleManager.FindByIdAsync(RoleId);
                    await roleManager.DeleteAsync(role);
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}
