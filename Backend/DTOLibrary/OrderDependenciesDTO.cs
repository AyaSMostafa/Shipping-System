using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOLibrary
{
    public class OrderDependenciesDTO
    {
        public List<BranchDTO> Branches { get; set; }
        public List<CityDTO> Cities { get; set; }
        public List<GovernateDTO> Governates { get; set; }
        public List<ShipmentDTO> Shipments { get; set; }
        public List<PaymentDTO> Payments { get; set; }
        public List<OrderTypeDTO> OrderTypes { get; set; }

    }
}
