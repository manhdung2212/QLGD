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
            ViewBag.listLecturer = db.Lecturer.ToList();
            return View();
        }
        [HttpPost]
        public PartialViewResult ListClass(int pageNumber, int pageSize, string search,int subjectID,string searchcode)
        {
            search = search.ToLower();
            var data=from s in db.Class
                      join c in db.Subjects on s.SubjectID equals c.ID
                      join z in db.Lecturer on s.LecturerID equals z.ID
                      where s.Code.ToLower().Contains(search)||s.Name.ToLower().Contains(search)||c.Name.ToLower().Contains(search)||z.Name.ToLower().Contains(search)
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
                      };
            if (subjectID != 0)
            {
                data = data.Where(x => x.SubjectID == subjectID);
            }
            if( searchcode != "")
            {
                data = data.Where(x => x.Code.ToLower().Contains(searchcode.ToLower()));  
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
        public PartialViewResult FormCreateEdit(int id)
        {
            ViewBag.data = db.Class.Find(id);
            ViewBag.listSubject = db.Subjects.ToList();
            ViewBag.listLecturer = db.Lecturer.ToList();
            return PartialView();
        }
        [HttpPost]
        public PartialViewResult InfoDetail(int id)
        {
            Class cl = db.Class.Find(id);
            return PartialView(cl);
        }



        [HttpPost]
        public JsonResult AddOrEdit(int id, string name,string code,string node,int subjectid,int lecturerid,int status)
        {
            if (id == 0)
            {
                Class cl = new Class();
                cl.Node = node;
                cl.Name = name;
                cl.Status = status;
                cl.Code = code;
                cl.SubjectID = subjectid;
                cl.LecturerID = lecturerid;
                cl.CreateDate = DateTime.Now;

                db.Class.Add(cl);
            }
            else
            {
                var cl = db.Class.Find(id);
                cl.Node = node;
                cl.Name = name;
                cl.Status = status;
                cl.Code = code;
                cl.SubjectID = subjectid;
                cl.LecturerID = lecturerid;
                cl.UpdateDate = DateTime.Now;

            }
            db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Delete(int id)
        {
            var cl = db.Class.Find(id);
            db.Class.Remove(cl);
            db.SaveChanges();
            return Json(true);
        }

    }
}