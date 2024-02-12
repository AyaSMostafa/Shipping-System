using APIs.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using DTOLibrary;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> usermanger;
        private readonly IConfiguration config;
        private readonly RoleManager<IdentityRole> roleManager;

        public AccountController(UserManager<ApplicationUser> usermanger,
            IConfiguration config, RoleManager<IdentityRole> roleManager)
        {
            this.usermanger = usermanger;
            this.config = config;
            this.roleManager = roleManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var allUsersExceptCurrentUser = await usermanger.Users.ToListAsync();
            //TODO: Tansform application user to userDTO
            return Ok(allUsersExceptCurrentUser);
        }

        [HttpPost("RegisterMerchant")]//api/account/register
        public async Task<IActionResult> RegistrationMerchant(UserRegisterationDTO userDto)
        {
            if (ModelState.IsValid)
            {
                //save
                ApplicationUser user = new ApplicationUser();
                user.UserName = userDto.Username;
                user.FullName = userDto.FullName;
                user.Email = userDto.Email;

                IdentityResult result = await usermanger.CreateAsync(user, userDto.Password);
               
                if (result.Succeeded)
                {
                    await usermanger.AddToRoleAsync(user, userDto.Role);
                    return Ok("Account Add Success");
                }
                else
                {
                    foreach (var item in result.Errors)
                    {
                        ModelState.AddModelError("", item.Description);//password
                    }
                }
                return BadRequest(ModelState);
            }
            return BadRequest(ModelState);
        }

        [HttpPost("login")]//api/account/login
        public async Task<IActionResult> Login(LoginDTO loginInfo)
        {
            if (ModelState.IsValid == true)
            {
                //check cookie
                ApplicationUser user = await usermanger.FindByEmailAsync(loginInfo.Email);
                if (user != null)
                {
                    bool found = await usermanger.CheckPasswordAsync(user, loginInfo.Password);
                    if (found)
                    {
                        //Claims Token
                        var claims = new List<Claim>();
                        claims.Add(new Claim(ClaimTypes.Name, user.UserName));
                        claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id));
                        claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));

                        //get role
                        var roleName = await usermanger.GetRolesAsync(user);
                        var role = await roleManager.FindByNameAsync(roleName[0]);
                        claims.Add(new Claim(ClaimTypes.Role,role.Name));
                        var permissions = await roleManager.GetClaimsAsync(role);
                        claims.AddRange(permissions.Where(c=> c.Type == "Permission"));
                        
                        List<string> permissionsNames = new List<string>();
                        foreach (var permission in permissions)
                        {
                            permissionsNames.Add(permission.Value);
                        }
                        SecurityKey securityKey =
                            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JWT:Secret"]));

                        SigningCredentials signincred =
                            new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
                        //Create token
                        JwtSecurityToken mytoken = new JwtSecurityToken(
                            issuer: config["JWT:ValidIssuer"],//url web api
                            audience: config["JWT:ValidAudiance"],//url consumer react
                            claims: claims,
                            expires: DateTime.Now.AddMonths(1),
                            signingCredentials: signincred
                            );
                        return Ok(new
                        {
                            token = new JwtSecurityTokenHandler().WriteToken(mytoken),
                            expiration = mytoken.ValidTo,
                            Role = role.Name,
                            Id = user.Id,
                            Permissions = permissionsNames
                        });
                    }
                }
                return Unauthorized();

            }
            return Unauthorized();
        }
    }

}
