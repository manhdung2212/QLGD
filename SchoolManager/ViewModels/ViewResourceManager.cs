using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SchoolManager.Models; 
namespace SchoolManager.ViewModels
{
    public class ViewResourceManager
    {
        public ResourcesManagement  resourcesManagement { get; set; }
        public Lecturer lecturer { get; set; }
        public Resources resource { get; set; }
    }
}