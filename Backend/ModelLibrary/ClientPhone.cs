using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLibrary
{
    public class ClientPhone
    {
        [ForeignKey("Order")]
        public int OrderId { get; set; }
        [Required]
        [RegularExpression("^01[0-2,5][0-9]{8}$")]
        public string Phone { get; set; }

        //navigation property
        public virtual OrderBase? Order { get; set; }
    }
}
