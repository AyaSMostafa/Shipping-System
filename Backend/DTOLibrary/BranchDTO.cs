using System;
using System.ComponentModel.DataAnnotations;

namespace DTOLibrary
{
    public class BranchDTO
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public bool Status { get; set; }

        [Required]
        public DateTime CreationDate { get; set; } = DateTime.Now;
    }
}
