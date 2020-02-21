using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SchoolManager.Models;
namespace SchoolManager.ViewModels
{
    public class ResourceJoin
    {
        public Resource resource { get; set; }
        public Building building { get; set; }
    }
}