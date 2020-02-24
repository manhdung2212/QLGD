using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SchoolManager.Models;
using SchoolManager.ViewModels;
namespace SchoolManager.Controllers
{
    public class ResourcesManagementController : Controller
    {
        SchoolManagementEntities db = new SchoolManagementEntities();


        // GET: ResourcesManagement
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public PartialViewResult ListHistory(string search, int pageSize, int pageNumber, int Status)
        {
            search = search.ToLower();
            //var model = db.ResourcesManagements.ToList();
            var data = (from rm in db.ResourcesManagement
                        join r in db.Resources on rm.ResourcesID equals r.ID
                        join l in db.Lecturer on rm.IDLecturer equals l.ID
                        where r.Name.ToLower().Contains(search) || l.Name.ToLower().Contains(search)
                        select new ViewResourceManager
                        {
                            resourcesManagement = rm,
                            lecturer = l,
                            resource = r
                        });
            if (Status == 1)
            {
                data = data.Where(x => x.resourcesManagement.Status == Status);
            }
            if (Status == 0)
            {
                data = data.Where(x => x.resourcesManagement.Status == Status);
            }
            var pageCount = data.Count() % pageSize == 0 ? data.Count() / pageSize : data.Count() / pageSize + 1;


            if (pageNumber <= pageCount)
            {
                var model = data.OrderBy(x => x.lecturer.Name).Skip(pageSize * pageNumber - pageSize).Take(pageSize).ToList();
                ViewBag.pageNumber = pageNumber;
                ViewBag.pageCount = pageCount;
                return PartialView(model);
            }


            return PartialView(data.OrderBy(x => x.lecturer.Name).ToList());
        }

        public PartialViewResult FormCreateEdit(int id)
        {
            ViewBag.data = db.ResourcesManagement.Find(id);
            ViewBag.ListLecture = db.Lecturer.ToList();
            ViewBag.ListResources = db.Resources.ToList();
            return PartialView();
        }

        [HttpPost]
        public JsonResult AddOrEdit(int id , int LecturerID, int ResourcesID, string node, int status)
        {
            if(id == 0)
            {
                ResourcesManagement rm = new ResourcesManagement();
                rm.IDLecturer = LecturerID;
                rm.ResourcesID = ResourcesID;
                rm.TimeTake = DateTime.Now;
                rm.Node = node;
                rm.CreateDate = DateTime.Now;
                rm.Status = status;
                db.ResourcesManagement.Add(rm);
            }
            else
            {
                ResourcesManagement rm = db.ResourcesManagement.Find(id);

                rm.IDLecturer = LecturerID;
                rm.ResourcesID = ResourcesID;
                
                rm.Node = node;
                rm.UpdateDate = DateTime.Now;
                rm.Status = status;
            }
            db.SaveChanges();
            return Json(true);
        }

        [HttpPost]
        public JsonResult Give(int id)
        {
            var rm = db.ResourcesManagement.Find(id);
            rm.UpdateDate = DateTime.Now;
            rm.TimeGive = DateTime.Now;
            rm.Status = 1;
            db.SaveChanges();
            return Json(true);
        }
  

        [HttpPost]
        public JsonResult Delete(int id)
        {
            //var list = db.ResourcesManagements.ToList();
            //db.ResourcesManagements.RemoveRange(list);
            var rm = db.ResourcesManagement.Find(id);
            db.ResourcesManagement.Remove(rm);
            db.SaveChanges();
            return Json(true);
        }

        public PartialViewResult Detail(int id)
        {
            var list = db.ResourcesManagement.Find(id);
            ViewBag.nameLecturer = db.Lecturer.ToList();
            ViewBag.nameResources = db.Resources.ToList();
            return PartialView(list);
        }
    }
}