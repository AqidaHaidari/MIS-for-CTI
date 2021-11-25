const express = require("express");
const router = express();
const authController=require('../controllers/auth');
const isAuth=require('../midleware/isAuth');
const {body}=require('express-validator/check')

router.get('/login',authController.getlogin);
router.post('/login',authController.postlogin);
router.post('/logOut',authController.logOut);
router.get('/signUp',authController.signUp);
router.post('/signUp',
body('email','Please enter a valid Email').isEmail()
.normalizeEmail(),
body('password',
'Please enter a password include numbers  and text at least 5 characters!')
.isAlphanumeric().isLength({min:5}),
body('repeatPassword')
.custom((value,{req})=>{
    if(value===req.body.password){
        return true;

    }
    throw new Error('Your password does\'nt mutch with confirm password!')
})
,authController.postSignUp);
router.get('/resetPassword',authController.resetPassword);
router.get('/resetPassword/:token',authController.getNewPassword);
router.post('/resetPassword',authController.postResetPassword);
router.post('/new-password',authController.postNewPassword);


module.exports = router;