using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolManager.ViewModels
{
    public class ClassJoin
    {
        public int ID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public Nullable<int> SubjectID { get; set; }
        public Nullable<int> LecturerID { get; set; }
        public string Node { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
        public Nullable<int> CreateBy { get; set; }
        public Nullable<int> UpdateBy { get; set; }
        public Nullable<int> Status { get; set; }
        public string SubjectName { get; set; }
        public string LecturerName { get; set; }
    }
}