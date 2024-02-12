using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOLibrary
{
    public class ShipmentDTO
    {
        public int Id { get; set; }
        [Required]
        public string Type { get; set; }
        public decimal ShipmentPrice { get; set; }
    }
}
