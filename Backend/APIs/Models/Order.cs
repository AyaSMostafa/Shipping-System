using ModelLibrary;
using System.ComponentModel.DataAnnotations.Schema;

namespace APIs.Models
{
    public class Order : OrderBase
    {
        [ForeignKey("merchant")]
        public string MerchantID { get; set; }
        public ApplicationUser merchant { get; set; }

    }
}
