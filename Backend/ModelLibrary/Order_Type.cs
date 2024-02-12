using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLibrary
{
    public class Order_Type
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        //Foreign Keys

        //Navigation Properties
        public virtual List<OrderBase> Orders { get; set; }
    }
}
