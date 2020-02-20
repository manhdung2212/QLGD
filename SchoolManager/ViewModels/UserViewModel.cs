using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SchoolManager.Models;
namespace SchoolManager.ViewModels
{
    public class UserViewModel
    {
        public UserApp userApp { get; set; }
        public UserManager userManager { get; set; }
    }
}