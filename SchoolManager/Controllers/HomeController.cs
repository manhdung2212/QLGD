using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SchoolManager.Models;  
namespace SchoolManager.Controllers
{
    public class HomeController : Controller
    {
        SchoolManagementEntities db = new SchoolManagementEntities();  
        public ActionResult Index()
        {
            if( Session["userApp"] == null)
            {
                return RedirectToAction("Login", "UserApp");
            }
            else
            {
                var userApp = (UserApp)Session["userApp"];  
                if( userApp.Email == null)
                {
                    return RedirectToAction("UpdateInfo", "UserApp", new { id = userApp.ID });  
                }
            }
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult Login()
        {
            return View(); 
        }
    }
}