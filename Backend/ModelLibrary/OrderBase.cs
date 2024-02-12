using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLibrary
{
    public class OrderBase
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
        [ForeignKey("Branch")]
        public int Branch_Id { get; set; }

        [ForeignKey("City")]
        public int? City_Id { get; set; }

        [ForeignKey("Governate")]
        public int? Governate_Id { get; set; }

        [ForeignKey("Order_Type")]
        public int? OrderType_Id { get; set; }

        [ForeignKey("Order_State")]
        public int? OrderState_Id { get; set; }

        [ForeignKey("Payment")]
        public int? Payment_Id { get; set; }
        [ForeignKey("Shipment")]
        public int Shipment_Id { get; set; }

        [ForeignKey("WeightSettings")]
        public int? WeightSettingsID { get; set; }
        //Navigation Properties
        public virtual Branch Branch { get; set; }
        public virtual City City { get; set; }
        public virtual Governate Governate { get; set; }
        public virtual Order_Type Order_Type { get; set; }
        public virtual Order_State Order_State { get; set; }
        public virtual Payment Payment { get; set; }
        public virtual Shipment Shipment { get; set; }

        public virtual List<ClientPhone> ClientPhones { get; set; } 
        public virtual List<Product> Products { get; set; }

        public virtual WeightSettings WeightSettings { get; set; }
    }
}
