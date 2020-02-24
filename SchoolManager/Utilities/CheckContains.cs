using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SchoolManager.Models;
namespace SchoolManager.Utilities
{
    public static class CheckContains
    {
        private static SchoolManagementEntities db = new SchoolManagementEntities();  
        public static bool ContainEmail( string email)
        {
            return db.UserApp.Where(x => x.Email == email).Count() > 0; 
        }
    }
}