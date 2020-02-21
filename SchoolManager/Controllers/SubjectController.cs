using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SchoolManager.Models;
using SchoolManager.ViewModels;
namespace SchoolManager.Controllers
{
    public class SubjectController : Controller
    {
        SchoolManagementEntities db = new SchoolManagementEntities();
        // GET: Subject
        public ActionResult Index()
        {

            return View();
        }
        [HttpPost]
        public PartialViewResult Listsubject(int pageNumber , int pageSize,string search)
        {
            var data = db.Subjects.OrderBy(x => x.Name);
                       
                        
            if (search.Trim() != "")
            {
                    data = data.Where(x => x.Name.Contains(search)).OrderBy(x=>x.Name);
            }
            var pageCount = data.Count() % pageSize == 0 ? data.Count() / pageSize : data.Count() / pageSize + 1;
            if (pageNumber <= pageCount)
            {
                var model = data.OrderBy(x => x.Name).Skip(pageSize * pageNumber - pageSize).Take(pageSize).ToList();
                ViewBag.pageCount = pageCount;
                ViewBag.pageNumber = pageNumber;
                return PartialView(model);
            }
            return PartialView(data.OrderBy(x => x.Name));
        }
        public PartialViewResult FormCreateEdit()
        {
            return PartialView();
        }

        public PartialViewResult DetailInfo(int id)
        {
            var sb = db.Subjects.Find(id);
            return PartialView(sb);
        }

        [HttpPost]
        public JsonResult Create(string Name,string Node,int Status)
        {
            var sb = new Subject();
            sb.Name = Name;
            sb.Node = Node;
            sb.CreateDate = DateTime.Now;
            sb.UpdateDate = DateTime.Now;
            
            sb.Status = Status;
            db.Subjects.Add(sb);
            db.SaveChanges();
            return Json(true);
        }

        [HttpPost]
        public JsonResult Update(int id,string Name, string Node, int Status)
        {
            var sb = db.Subjects.Find(id);
            sb.Name = Name;
            sb.Node = Node;
            sb.UpdateDate = DateTime.Now;
           
            sb.Status = Status;
            db.SaveChanges();
            return Json(true);
        }

        [HttpPost]
        public JsonResult Delete(int id)
        { 
            var sb = db.Subjects.Find(id);
            db.Subjects.Remove(sb);
            db.SaveChanges();
            return Json(true);
        }
        
        public ActionResult Detail(int id)
        {
            var sb = db.Subjects.Find(id);
            return View(sb);
        }
    }
}