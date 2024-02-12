using ModelLibrary;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOLibrary
{
    public class OrderTableDTO
    {
        public int Id { get; set; }
        public decimal NetWeight { get; set; }
        public decimal ShippingCost { get; set; }
        public decimal ProductsCost { get; set; }
        public DateTime OrderDate { get; set; }
        public string ClientName { get; set; }
        public string GovernrateName { get; set; }
        public string CityName { get; set; }
        public string MerchantName { get; set; }
        public int? OrderStateID { get; set; }
        public string OrderStateName { get; set; }
        public List<string> ClientPhones { get; set; }

    }
}
