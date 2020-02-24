using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SchoolManager.Models;

namespace SchoolManager.Controllers
{
    public class BuildingController : Controller
    {
        // GET: Building
        SchoolManagementEntities db = new SchoolManagementEntities();
        public ActionResult Index()
        {
            return View();
        }
        
        public PartialViewResult ListBuilding(int pageNumber, int pageSize, string search)
        {

            search = search.ToLower();
            var data = db.Building.ToList();
            if( search.Trim() != "")
            {
                data =  data.Where( x => x.Name.ToLower().Contains(search) || x.Node.ToLower().Contains(search)).ToList();  

            }

            var pageCount = data.Count() % pageSize == 0 ? data.Count() / pageSize : data.Count() / pageSize + 1;
            ViewBag.pageCount = pageCount;
            if ( pageCount >= pageNumber)
            {
                var model = data.OrderBy(x => x.Name).Skip(pageSize * pageNumber - pageSize).Take(pageSize).ToList();
                ViewBag.pageNumber = pageNumber;
                return PartialView(model);
            }
            
            ViewBag.pageNumber = 1;
            return PartialView(data.OrderBy( x => x.Name).ToList());


        }
        public PartialViewResult FormCreateEdit( int id )
        {
            ViewBag.data = db.Building.Find(id);  
            
            return PartialView();
        }
       
        public PartialViewResult InfoDetail(int id)
        {
            Building cl = db.Building.Find(id);
            return PartialView(cl);
        }

        [HttpPost]
        public JsonResult AddOrEdit(int id, string node, string name, int status)
        {
            if( id == 0)
            {
                Building cl = new Building();
                cl.Node = node;
                cl.Name = name;
                cl.Status = status;
                cl.CreateDate = DateTime.Now;

                db.Building.Add(cl);
            }
            else
            {
                var cl = db.Building.Find(id);
                cl.Node = node;
                cl.Name = name;
                cl.Status = status;
                cl.UpdateDate = DateTime.Now;
            }
            db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet); 
        }
        [HttpPost]
        public JsonResult Delete(int id)
        {
            var cl = db.Building.Find(id);
            db.Building.Remove(cl); 
            db.SaveChanges();
            return Json(true);
        }
    }
}