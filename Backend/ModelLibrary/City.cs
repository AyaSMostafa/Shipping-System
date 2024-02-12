using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLibrary
{
    public class City
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public decimal ShippingCost { get; set; }
        [Required]
        public decimal PickupCost { get; set; }
        //Foreign Keys
        [ForeignKey("Governate")]
        public int Governate_Id { get; set; }

        //Navigation Properties
        public virtual List<OrderBase> Orders { get; set; }
        public Governate Governate { get; set; }
    }
}
