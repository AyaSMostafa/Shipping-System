using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOLibrary
{
    public class OrdersStatusNumDTO
    {
        public OrdersStatusNumDTO()
        {
            statusNums = new List<StatusNumDTO>();
        }
        public List<StatusNumDTO> statusNums { get; set; }
    }
}
