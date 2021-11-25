const express=require('express');
const router=express();
const Controller=require('../controllers/studentRegistration');
const isAuth=require('../midleware/isAuth');

router.get('/studentRegistration',isAuth,Controller.studentRegistration);
router.post('/studentRegistration',Controller.postStudent);
router.get('/applicants',isAuth,Controller.applicants);
router.get('/registred',isAuth,Controller.registred);
router.get('/passed/:studentId',isAuth,Controller.passed);
router.get('/result',isAuth,Controller.result);
router.post('/generateCard',Controller.generateCard);
router.get('/generateCard',isAuth,Controller.generateCard);
router.post('/postCard',Controller.postCard);
router.post('/scores',Controller.postScore);
// router.get('/scores',Controller.postScore);
router.post('/NativeScore',Controller.postNativeScore)
router.post('/applicants',Controller.examResult)

router.get('/allStudent',isAuth,Controller.allStudent);
router.get('/deleted',isAuth,Controller.deletedStudent);
router.get('/onlineRegistration',Controller.onlineRgistration);
router.get('/editOnlineRgistration',isAuth,Controller.editOnlineRgistration);
router.post('/editOnlineRgistration',Controller.postEditOnlineRgistration);
router.post('/detail',Controller.getDetail);
router.get('/detail',isAuth,Controller.getDetail);
router.post('/updateDetail',Controller.postDetail);
router.get('/deleteStudent/:studentId',isAuth,Controller.deleteStudent);
router.get('/undo/:studentId',isAuth,Controller.undo);
router.get('/graph',isAuth,Controller.graph);
//delete From Db...
router.post('/deleteFromDb',Controller.deleteFromDb)

//search....
router.post('/searchByStudentId',Controller.searchByStudentId)
router.post('/DepartmentList',Controller.DepartementListStudent);
router.post('/searchByDepartment',Controller.searchByDepartment)

//attendence............
router.post('/attendance',Controller.postAttendance);
router.get('/attendance',isAuth,Controller.getAttendance);
router.post('/attendanceReport',Controller.attendanceReport);
router.post('/attendanceResult',Controller.attendanceResult)
router.post('/attendanceDetail',Controller.attendanceDetail)
// router.post('/attendance',Controller.postAttendance);
router.get('/generateAttendance',isAuth,Controller.getgenerate_Attendance);
router.get('/searchAttendance',Controller.searchAttendance);
router.post('/postSearchAttendance',Controller.postSearchAttendance);

//register to class..........
router.get("/registerToClass",isAuth,Controller.registerToClass);
router.post("/postToNewClass",Controller.postToNewClass)
//...........
router.post("/searchDepartment",Controller.searchDepartment);

module.exports=router;