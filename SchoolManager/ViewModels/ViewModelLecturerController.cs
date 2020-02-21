using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SchoolManager.ViewModels
{
    public class ViewModelLecturer
    {
        public int ID { get; set; }
        public string name { get; set; }
        public Nullable<bool> Gender { get; set; }
        public Nullable<System.DateTime> Birthday { get; set; }
        public string address { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
        public int facultyID { get; set; }
        public string namefaculty { get; set; }
        public string node { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
        public Nullable<int> CreateBy { get; set; }
        public Nullable<int> UpdateBy { get; set; }
        public Nullable<int> Status { get; set; }
    }
}