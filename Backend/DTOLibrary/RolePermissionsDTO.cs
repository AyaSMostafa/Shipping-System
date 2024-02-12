using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOLibrary
{
    public class RolePermissionsDTO
    {
        public string RoleId { get; set; }
        public string Name { get; set; }
        public IList<String> Permissions { get; set; }
    }
}
