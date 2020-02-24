using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SchoolManager.Models;
using SchoolManager.ViewModels;
namespace SchoolManager.Controllers
{
    public class ResourcesController : Controller
    {
        SchoolManagementEntities db = new SchoolManagementEntities();
        // GET: Resources
        public ActionResult Index()
        {

            ViewBag.listbuild = db.Building.ToList();
            return View();
        }
        [HttpPost]
        public PartialViewResult ListResource(string search, int pageNumber, int pageSize, int idbuildorroom, int searchstatus)
        {
            search = search.ToLower();
            var data = (from r in db.Resources
                        join b in db.Building on r.IDBuildOrRoom equals b.ID
                        where r.Name.ToLower().Contains(search)||b.Name.ToLower().Contains(search)
                        select new ResourceJoin
                        {
                            resource = r,
                            buidling = b
                        });

            if (idbuildorroom != 0)
            {
                data = data.Where(x => x.resource.IDBuildOrRoom == idbuildorroom);
            }
            if (searchstatus != -1)
            {
                data = data.Where(x => x.resource.Status == searchstatus);
            }
            var pageCount = data.Count() % pageSize == 0 ? data.Count() / pageSize : data.Count() / pageSize + 1;
            ViewBag.pageCount = pageCount;
            if (pageNumber <= pageCount)
            {
                var model = data.OrderBy(x => x.resource.Name).Skip(pageSize * pageNumber - pageSize).Take(pageSize).ToList();
                ViewBag.pageCount = pageCount;
                ViewBag.pageNumber = pageNumber;
                return PartialView(model);
            }
            ViewBag.PageNumber = 1;
            return PartialView(data.OrderBy(x => x.resource.Name).ToList());
        }

  
        public PartialViewResult FormCreateEdit(int id)
        {
            ViewBag.data = db.Resources.Find(id);
            ViewBag.listbuild = db.Building.ToList();
            return PartialView();
        }

        [HttpPost]
        public PartialViewResult InfoDetail(int id)
        {

            Resources re = db.Resources.Find(id);
            ViewBag.listbuild = db.Building.ToList();
            return PartialView(re);
        }


        [HttpPost]
        public JsonResult AddOrEdit(int id,string name, int amount, int status, int broken, string node, int BuildorRoom, int IDBuildorRoom)
        {
            if (id == 0)
            {
                Resources re = new Resources();
                re.Name = name;
                re.Node = node;
                re.Amount = amount;
                re.Broken = broken;
                re.Status = status;
                re.CreateDate = DateTime.Now;
                re.IDBuildOrRoom = IDBuildorRoom;
                re.BuildOrRoom = BuildorRoom;  
                db.Resources.Add(re);
            }
            else
            {
                var re = db.Resources.Find(id);
                re.Node = node;
                re.Name = name;
                re.Status = status;
                re.BuildOrRoom = BuildorRoom;
                re.IDBuildOrRoom = IDBuildorRoom;
                re.Amount = amount;
                re.Broken = broken;
                re.UpdateDate = DateTime.Now;
            }
            db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }
  
        [HttpPost]
        public JsonResult Delete(int ID)
        {
            Resources re = db.Resources.Find(ID);
           
  
            db.Resources.Remove(re);
            db.SaveChanges();
            return Json(true);
        }

    }
}