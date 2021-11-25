const express = require("express");
const router = express();
const registrationController = require('../controllers/department');
const isAuth=require('../midleware/isAuth');

router.get('/',isAuth,registrationController.getAddDepartment);
router.post('/',registrationController.postAddDepartment);
router.post('/deleted',registrationController.postDeleteDepartment);
router.post('/editedData',registrationController.postEditDepartment);

module.exports = router;