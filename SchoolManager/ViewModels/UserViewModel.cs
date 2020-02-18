using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolManager.ViewModels
{
    public class UserViewModel
    {
        public int ID { get; set; }

        public string Name { get; set; }
        public string Account { get; set; }
        public string Password { get; set; }
        public DateTime? DateLogin { get; set; }
        public string Address { get; set; }
        public bool Gender { get; set; }
        public DateTime Birthday { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Position { get; set; }
        public string Description { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public string CreateBy { get; set; }
        public string UpdateBy { get; set; }
        public int Status { get; set; }
    }
}