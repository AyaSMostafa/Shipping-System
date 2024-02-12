using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOLibrary
{
    public class CityDTO
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public decimal ShippingCost { get; set; }
        [Required]
        public decimal PickupCost { get; set; }
        public int Governate_Id { get; set; }
        public string Governate_Name { get; set;}
    }
}
