using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOLibrary
{
    public class PermissionDTO
    {
        public string RoleId { get; set; }
        public IList<RoleClaimsDTO> RoleClaims { get; set; }
    }
}
