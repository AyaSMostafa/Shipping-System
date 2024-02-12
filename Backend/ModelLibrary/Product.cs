using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLibrary
{
    public class Product
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public decimal Weight { get; set; }
        [Required]
        public int Quantity { get; set; }

        //Foreign Keys
        [ForeignKey("Order")]
        public int OrderId { get; set; }

        //Navigation Properties
        public OrderBase? Order { get; set; }
    }
}
