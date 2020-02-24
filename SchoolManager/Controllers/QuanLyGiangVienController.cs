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
            ViewBag.ListFaculty = db.Faculty.ToList();
            ViewBag.ListLecture = db.Lecturer.ToList();
            return View();
        }
        [HttpPost]
        public PartialViewResult GetLecture(int id)
        {

            var model = (from lecture in db.Lecturer
                         join faculty in db.Faculty on lecture.FacultyID equals faculty.ID
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
            var data =  (from s in db.Lecturer
                        join c in db.Faculty on s.FacultyID equals c.ID
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
                ViewBag.pageSize = pageSize;
                return PartialView(model);
            }
            return PartialView(data.OrderBy(x => x.name).ToList());
        }
        public PartialViewResult FormCreateAndEdit(int id)
        {
            ViewBag.faculties = db.Faculty.ToList(); 
            ViewBag.data = db.Lecturer.Find(id);
            return PartialView();
        }
        [HttpPost]
        public JsonResult AddOrEdit(int id, string name, string gender, DateTime birthday, string address, string phone, string email, int FaculityID, string node)
        {
            if (id == 0)
            {
                Lecturer lecture = new Lecturer();
                lecture.Name = name;
                if (gender == "male")
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
                db.Lecturer.Add(lecture);
            }
            else
            {
                var model = db.Lecturer.Where(x => x.ID == id).FirstOrDefault();
                model.Name = name;
                if (gender == "male")
                {
                    model.Gender = true;
                }
                else
                {
                    model.Gender = false;
                }
                model.Birthday = birthday;
                model.Address = address;
                model.Phone = phone;
                model.Email = email;
                model.FacultyID = FaculityID;
                model.Node = node;
                model.UpdateDate = DateTime.Now;
            }
            db.SaveChanges();
            return Json(true);
        }
        
        [HttpPost]
        public JsonResult Delete (int id)
        {
            var model = db.Lecturer.Where(x => x.ID == id).FirstOrDefault();
            db.Lecturer.Remove(model);
            db.SaveChanges();
            return Json(true);
        }
        public PartialViewResult Details(int id)
        {
            var data = (from s in db.Lecturer
                        join c in db.Faculty on s.FacultyID equals c.ID
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
                        }).Where(x => x.ID == id).FirstOrDefault();
            return PartialView(data);
        }
    }
}