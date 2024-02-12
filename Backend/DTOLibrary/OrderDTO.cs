
using ModelLibrary;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOLibrary
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public decimal NetWeight { get; set; }
        public decimal ShippingCost { get; set; }
        public decimal ProductsCost { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now.Date;
        [Required]
        [MaxLength(30)]
        [MinLength(3)]
        public string ClientName { get; set; }
        [Required]
        public bool VillageDelivery { get; set; }
        [Required]
        [MaxLength(200)]
        [MinLength(5)]
        public string Street { get; set; }
        [Required]
        [MaxLength(250)]
        public string Notes { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        //Foreign Keys
        public int Branch_Id { get; set; }
        public int? City_Id { get; set; }
        public int? Governate_Id { get; set; }
        public int? OrderType_Id { get; set; }
        public int? OrderState_Id { get; set; }
        public int? Payment_Id { get; set; }
        public int Shipment_Id { get; set; }
        public int? WeightSettingsID { get; set; }
        public string MerchantID { get; set; }


        public List<string> ClientPhones { get; set; }
        public List<ProductDTO> Products { get; set; }
    }
}
