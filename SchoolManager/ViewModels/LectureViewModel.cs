using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SchoolManager.Models;  
namespace SchoolManager.ViewModels
{
    public class LectureViewModel
    {
        public Lecturer lecturer { get; set; }
        public Faculty faculty { get; set; }
    }
}