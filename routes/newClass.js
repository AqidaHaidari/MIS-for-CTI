const express = require("express");
const router = express();
const registrationController = require('../controllers/class');
const isAuth=require('../midleware/isAuth');

router.get('/newClass',isAuth,registrationController.getAddDepartment);
router.post('/newClass',registrationController.postAddDepartment);
router.post('/deleteClass',registrationController.postDeleteDepartment);
router.post('/editedClass',registrationController.postEditDepartment);

module.exports = router;