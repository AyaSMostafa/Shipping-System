using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLibrary
{
    public class Shipment
    {
        public int Id { get; set; }
        [Required]
        public string Type { get; set; }

        public decimal ShipmentPrice { get; set; }




        //Foreign Keys


        //Navigation Properties
        public virtual List<OrderBase> Orders { get; set; }
    }
}
