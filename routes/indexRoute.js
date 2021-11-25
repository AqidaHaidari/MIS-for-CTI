const express=require('express');
const router=express();
const indexController=require('../controllers/indexController');
const isAuth=require('../midleware/isAuth');
router.get('/index',isAuth,indexController.getIndex);
router.get('/index2',indexController.getIndex2);
module.exports=router;