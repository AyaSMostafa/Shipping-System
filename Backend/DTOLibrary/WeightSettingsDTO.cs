using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOLibrary
{
    public class WeightSettingsDTO
    {
        public int Id { get; set; }
        public decimal DefaultWeight { get; set; }
        public int DefaultPrice { get; set; }
        public int AdditionalPrice { get; set; }
    }
}
