using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLibrary
{
    public class WeightSettings
    {
        public int Id { get; set; }
        public decimal DefaultWeight { get; set; }
        public int DefaultPrice { get; set; }
        public int AdditionalPrice { get; set; }

        //Navigation Properties
        public virtual List<OrderBase>? Orders { get; set; }
    }
}
