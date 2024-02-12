﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLibrary
{
    public class Branch
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public bool Status { get; set; }
        [Required]
        public DateTime CreationDate { get; set; }

        //Foreign Keys

        //Navigation Properties
        public virtual List<OrderBase> Orders { get; set; }
    }
}
