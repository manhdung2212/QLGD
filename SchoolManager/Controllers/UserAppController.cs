using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SchoolManager.Models;
using SchoolManager.ViewModels; 
using SchoolManager.Utilities;
using System.Net.Mail;
using System.Net;

namespace SchoolManager.Controllers
{
    public class UserAppController : Controller
    {
        // GET: UserApp
        SchoolManagementEntities db = new SchoolManagementEntities();  
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Login()
        {
            return View(); 
        }
        [HttpPost]
        public JsonResult Login( string account , string password)
        {
            var user = db.UserManager.Where(x => x.Account == account && x.Password == password).FirstOrDefault();  
            if( user != null)
            {
                var userApp = db.UserApp.Find(user.ID);
                Session["userName"] = userApp.Name;
                Session["userApp"] = userApp;  
                return Json(true, JsonRequestBehavior.AllowGet);


            }
            return Json( false, JsonRequestBehavior.AllowGet);   
        }
        public ActionResult UpdateInfo( int id  )
        {
            var model = db.UserApp.Find(id);
            return View(model);   
        }
        [HttpPost]
        public JsonResult UpdateInfo( int id , string name ,  string address,  string email ,  string phone  , DateTime birth ,  string gender , string position ,  string desc)
        {
            var user = db.UserApp.Find(id);
            user.Name = name;
            user.Email = email;
            user.Address = address;
            user.Phone = phone;
            user.Birthday = birth;
            user.Gender = gender == "male" ? true : false;
            user.Position = position;
            user.Description = desc;
            db.SaveChanges();
            Session["userApp"] = user;  
            return Json(true , JsonRequestBehavior.AllowGet);  
        }
        public PartialViewResult ListUser( int pageNumber , int pageSize  ,  string search)
        {
            search = search.ToLower();  
            var data = from u in db.UserManager
                       join userApp in db.UserApp on u.ID equals userApp.ID
                       where u.Account.ToLower().Contains(search) || userApp.Phone.Contains(search) || userApp.Name.Contains(search)
                       select new UserViewModel
                       {
                           userApp = userApp ,  
                           userManager = u
                       };  
            var pageCount = data.Count() % pageSize == 0 ? data.Count() / pageSize : data.Count() / pageSize + 1;
            ViewBag.pageCount = pageCount;
            ViewBag.pageNumber = pageNumber;  
            if( pageNumber <= pageCount)
            {
                var model = data.OrderBy(x => x.userApp.Name).Skip(pageNumber * pageSize - pageSize).Take(pageSize).ToList();
                return PartialView(model);

            }
            return PartialView(data.OrderBy( x => x.userApp.Name).ToList());
        
        }

        [HttpPost]
        public JsonResult AddOrEdit( int id , string name , string account , string password)
        {
            var userName = Session["userName"];  
            if( userName == null)
            {
                return Json(false, JsonRequestBehavior.AllowGet); 
            }
            if( id ==0)
            {
                UserManager user = new UserManager { Account = account , Password = password, DateLogin = DateTime.Now };
                UserApp userApp = new UserApp { Name = name , CreateBy  = userName.ToString() , UpdateBy = userName.ToString() , CreateDate = DateTime.Now , UpdateDate = DateTime.Now , Status = 0  };
                db.UserApp.Add(userApp); 
                db.UserManager.Add(user);
                db.SaveChanges();
                return Json(true , JsonRequestBehavior.AllowGet);
            }
            return Json( false , JsonRequestBehavior.AllowGet);  
        }
        [HttpPost]
        public JsonResult Delete( int id)
        {
            var model = db.UserManager.Find(id);
            if (model != null) db.UserManager.Remove(model);
            var data = db.UserApp.Find(id);
            if (data != null) db.UserApp.Remove(data);
            db.SaveChanges(); 
            return Json(true); 
        }
        public ActionResult ForgotPassword()
        {
            return View();  
        }
        public JsonResult GetEmail( string email )
        {
            if( CheckContains.ContainEmail(email))
            {
                SendEmail(email); 
                return Json(true , JsonRequestBehavior.AllowGet);  
            }
            return Json(false , JsonRequestBehavior.AllowGet);  
        }
        public void SendEmail ( string email)
        {
            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = true,
                Credentials = new NetworkCredential("manhdung22122000@gmail.com", "manhdung123")
            };
            var mes = new MailMessage("manhdung22122000@gmail.com", email)
            {
                Subject = " Mail xác nhận tài khoản ",
                Body = "https://localhost:44311/QuanLyGiangVien/Index"
            };
            smtp.Send(mes); 
        }

        public PartialViewResult GetByID(int id)
        {
            var data = (from u in db.UserManager
                       join userApp in db.UserApp on u.ID equals userApp.ID
                       where u.ID == id 
                       select new UserViewModel
                       {
                           userApp = userApp,
                           userManager = u
                       }).FirstOrDefault() ;
            return PartialView(data); 

        }

        [HttpPost]
        public PartialViewResult GetFromUpdate( int id )
        {
            var data = (from u in db.UserManager
                        join userApp in db.UserApp on u.ID equals userApp.ID
                        where u.ID == id
                        select new UserViewModel
                        {
                            userApp = userApp,
                            userManager = u
                        }).FirstOrDefault();
            ViewBag.data = data; 
            return PartialView(); 

        }
    }
}