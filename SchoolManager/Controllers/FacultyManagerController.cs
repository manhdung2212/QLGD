using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SchoolManager.Models;
namespace SchoolManager.Controllers
{
    public class FacultyManagerController : Controller
    {
        SchoolManagementEntities db = new SchoolManagementEntities();
        // GET: Faculty
        public ActionResult Index()
        {
            return View();
        }
        public PartialViewResult ListFaculty(int pageNumber, int pagesize, string search)
        {
            
            var data = db.Faculties.OrderBy(x => x.Name);
           

            if (search.Trim() != "")
            {
                data = data.Where(x => x.Name.Contains(search)).OrderBy(x => x.Name);
            }
            var pageCount = data.Count() % pagesize == 0 ? data.Count() / pagesize : data.Count() / pagesize + 1;
            ViewBag.pageCount = pageCount;
            if (pageNumber <= pageCount)
            {
                var model = data.OrderBy(x => x.Name).Skip(pagesize * pageNumber - pagesize).Take(pagesize);
                ViewBag.pageCount = pageCount;
                ViewBag.pageNumber = pageNumber;
                return PartialView(model);
            }
            ViewBag.pageNumber = 1;
            return PartialView(data.OrderBy(x => x.Name));
        }
        public PartialViewResult FormCreateEdit(int id)
        {
            ViewBag.data = db.Faculties.Find(id);
            return PartialView();
        }
        [HttpPost]
     
        public JsonResult AddOrEdit(int id, string Name, string Node, int Status)
        {
            if (id == 0)
            {

                Faculty Fa = new Faculty();
                Fa.Node = Node;
                Fa.Name = Name;
                Fa.Status = Status;
                Fa.CreateDate = DateTime.Now;

                db.Faculties.Add(Fa);
               
            }
            else
            {
                var Fa = db.Faculties.Find(id);
                Fa.Name = Name;
                Fa.Node = Node;
                Fa.UpdateDate = DateTime.Now;
                Fa.Status = Status;
            }
            db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }
     
        [HttpPost]
        public JsonResult Delete(int id)
        {
            var model = db.Faculties.Find(id);
            db.Faculties.Remove(model);
            db.SaveChanges();
            return Json(true);
        }
    
        public PartialViewResult InfoDetail(int id)
        {
            Faculty data = db.Faculties.Find(id);

            return PartialView(data);
        }

    
}
}