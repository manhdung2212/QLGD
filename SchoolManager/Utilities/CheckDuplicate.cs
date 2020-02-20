using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SchoolManager.Models; 
namespace SchoolManager.Utilities
{
    public class CheckDuplicate
    {
        private static SchoolManagementEntities  db = new SchoolManagementEntities();  
        public static bool CheckEmail( string email )
        {
            return db.UserApps.Where(x => x.Email == email).Count() == 0;
        }
    }
}