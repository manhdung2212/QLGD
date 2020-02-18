using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SchoolManager.Models;
using SchoolManager.ViewModels;
namespace SchoolManager.Controllers
{
    public class ClassController : Controller
    {
        SchoolManagementEntities db = new SchoolManagementEntities();
        // GET: Class
        public ActionResult Index()
        {
            ViewBag.listSubject = db.Subjects.ToList();
            ViewBag.listLecturer = db.Lecturers.ToList();
            return View();
        }
        [HttpPost]
        public PartialViewResult ListClass(int pageNumber, int pageSize, string search,int subjectID,string searchCode)
        {
            var data=from s in db.Classes
                      join c in db.Subjects on s.SubjectID equals c.ID
                      join z in db.Lecturers on s.LecturerID equals z.ID
                      select new ClassJoin
                      {
                          ID = s.ID,
                          Name = s.Name,
                          Code=s.Code,
                          SubjectID=c.ID,
                          LecturerID=z.ID,
                          Node=s.Node,
                          CreateDate=s.CreateDate,
                          UpdateDate=s.UpdateDate,
                          CreateBy=s.CreateBy,
                          UpdateBy=s.UpdateBy,
                          Status=s.Status,
                          SubjectName=c.Name,
                          LecturerName=z.Name,
                      }
                ;
            if (search.Trim() != "")
            {
                data = data.Where(x => x.Name.Contains(search)).OrderBy(x => x.Name);
            }
            if (searchCode.Trim() != "")
            {
                data = data.Where(x => x.Code.Contains(searchCode)).OrderBy(x => x.Code);
            }
            if (subjectID != 0)
            {
                data = data.Where(x => x.SubjectID == subjectID);
            }
            var pageCount = data.Count() % pageSize == 0 ? data.Count() / pageSize : data.Count() / pageSize + 1;
            if (pageNumber <= pageCount)
            {
                var model = data.OrderBy(x => x.Name).Skip(pageSize * pageNumber - pageSize).Take(pageSize).ToList();
                ViewBag.pageCount = pageCount;
                ViewBag.pageNumber = pageNumber;
                return PartialView(model);
            }
            return PartialView(data.OrderBy(x=>x.Name).ToList());



        }
        public PartialViewResult FormCreateEdit()
        {
            ViewBag.listSubject = db.Subjects.ToList();
            ViewBag.listLecturer = db.Lecturers.ToList();
            return PartialView();
        }
        [HttpPost]
        public PartialViewResult InfoDetail(int id)
        {
            Class cl = db.Classes.Find(id);
            return PartialView(cl);
        }
       

        [HttpPost]
        public JsonResult Create(string code, string name, int subjectID, int lecturerID, string node)
        {
            Class cl = new Class() ;
            cl.Code = code;
            cl.Name = name;
            cl.SubjectID = subjectID;
            cl.LecturerID = lecturerID;
            cl.Node = node;
            cl.CreateDate = DateTime.Now;
            
            db.Classes.Add(cl);
            db.SaveChanges();
            return Json(true);
        }
        [HttpPost]
        public JsonResult Update(int id, string code, string name, int subjectID, int lecturerID, string node)
        {
            var cl = db.Classes.Find(id);
            cl.Code = code;
            cl.Name = name;
            cl.SubjectID = subjectID;
            cl.LecturerID = lecturerID;
            cl.Node = node;

            cl.UpdateDate = DateTime.Now;
            
            db.SaveChanges();
            return Json(true);
        }
        [HttpPost]
        public JsonResult Delete(int id)
        {
            var cl = db.Classes.Find(id);
            db.Classes.Remove(cl);
            db.SaveChanges();
            return Json(true);
        }

    }
}