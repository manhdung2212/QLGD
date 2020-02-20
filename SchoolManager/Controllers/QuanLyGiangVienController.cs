using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SchoolManager.Models;
using SchoolManager.ViewModels;

namespace SchoolManager.Controllers
{
    public class QuanLyGiangVienController : Controller
    {
        SchoolManagementEntities db = new SchoolManagementEntities();
        // GET: QuanLyGiangVien
        public ActionResult Index()
        {
            ViewBag.ListLecture = db.Lecturers.ToList();
            ViewBag.ListFaculty = db.Faculties.ToList();
            return View();
        }
        [HttpPost]
        public PartialViewResult GetLecture(int id)
        {

            var model = (from lecture in db.Lecturers
                         join faculty in db.Faculties on lecture.FacultyID equals faculty.ID
                         select new LectureViewModel
                         {
                             lecturer = lecture,
                             faculty = faculty
                         }).FirstOrDefault();
            return PartialView(model); 
        }
       [HttpPost]
        public PartialViewResult ListLecture (int pageSize, int pageNumber, string search, int subjectID)
        {
            var data =  (from s in db.Lecturers
                        join c in db.Faculties on s.FacultyID equals c.ID
            select new ViewModelLecturer
            {
                ID = s.ID,
                name = s.Name,
                Gender = s.Gender,
                Birthday = s.Birthday,
                address = s.Address,
                phone = s.Phone,
                email = s.Email,
                facultyID = c.ID,
                namefaculty = c.Name,
                node = s.Node,
            });
            if (search.Trim() != "")
            {
                data = data.Where(x => x.name.Contains(search)).OrderBy(x => x.name);
            }
            if (subjectID != 0)
            {
                data = data.Where(x => x.facultyID == subjectID);
            }
            var pageCount = data.Count() % pageSize == 0 ? data.Count() / pageSize : data.Count() / pageSize + 1;
            if (pageNumber <= pageCount)
            {
                var model = data.OrderBy(x => x.name).Skip(pageSize * pageNumber - pageSize).Take(pageSize).ToList();
                ViewBag.pageCount = pageCount;
                ViewBag.pageNumber = pageNumber;
                return PartialView(model);
            }
            return PartialView(data.OrderBy(x => x.name).ToList());
        }
        public PartialViewResult FormCreateAndEdit()
        {
            
            ViewBag.ListFaculty = db.Faculties.ToList();
            return PartialView();
        }
        [HttpPost]
        public JsonResult Create (string name, string gender, DateTime birthday, string address, string phone, string email, int FaculityID, string node)
        {
            Lecturer lecture = new Lecturer();
            lecture.Name = name;
            if(gender == "male")
            {
                lecture.Gender = true;
            }
            else
            {
                lecture.Gender = false;
            }
            lecture.Birthday = birthday;
            lecture.Address = address;
            lecture.Phone = phone;
            lecture.Email = email;
            lecture.FacultyID = FaculityID;
            lecture.Node = node;
            lecture.CreateDate = DateTime.Now;
            lecture.UpdateDate = DateTime.Now;
            db.Lecturers.Add(lecture);
            db.SaveChanges();
            return Json(true);
        }
        [HttpPost]
        public JsonResult Edit (int id, string name, string gender, DateTime birthday, string address, string phone, string email, int FaculityID, string node)
        {
            var model = db.Lecturers.Where(x => x.ID == id).FirstOrDefault();
            model.Name = name;
            model.Gender = (gender == "female" ? false : true);
            model.Birthday = birthday;
            model.Address = address;
            model.Phone = phone;
            model.Email = email;
            model.FacultyID = FaculityID;
            model.Node = node;
            model.UpdateDate = DateTime.Now;
            db.SaveChanges();
            return Json(true);
        }
        [HttpPost]
        public JsonResult Delete (int id)
        {
            var model = db.Lecturers.Where(x => x.ID == id).FirstOrDefault();
            db.Lecturers.Remove(model);
            db.SaveChanges();
            return Json(true);
        }
        public ActionResult Details(int id)
        {
            var model = db.Lecturers.Where(x => x.ID == id).FirstOrDefault();
            ViewBag.khoa = db.Faculties.ToList();
            return View(model);
        }
    }
}