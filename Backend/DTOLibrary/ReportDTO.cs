using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOLibrary
{
    public class ReportDTO : IValidatableObject
    {
        [Required]
        public int OrderState_Id { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }

        //check in end > start 
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            int result = DateTime.Compare(EndDate, StartDate);
            if (result < 0)
            {
                yield return new ValidationResult("start date must be less than the end date!", new[] { "ConfirmEmail" });
            }
        }

    }
}
