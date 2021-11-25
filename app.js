
const express = require("express");
const app = express();
const path = require("path")
const body_parser = require('body-parser');
const ejs=require('ejs');
const connection=require('mongoose')
const index=require('./routes/indexRoute')
const StudentRegistration=require('./routes/StudentRegistration')
const department = require("./routes/department");
const newClass = require("./routes/newClass");
const text=require('./Models/text');
const auth=require('./routes/auth');
const multer=require('multer')
const session=require('express-session');
const Mongoodbstore=require('connect-mongodb-session')(session)
const csrf=require('csurf');
const flash=require('connect-flash');
const store=new Mongoodbstore({
    uri:'mongodb://localhost:27017/CTI',
    collection:'sessions'
})
const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
app.use(session({
    secret:"Aqida",
    resave:false,
    saveUninitialized:false,
    store:store
}))
// app.use(csrf());
app.use(flash())
app.use(body_parser.urlencoded({extended: false}));
app.use(body_parser.json())
app.use(multer({storage:fileStorage }).single('image'))
app.use(express.static(path.join(__dirname,'public')));
app.use("/images",express.static(path.join(__dirname,'images')));

    

app.set('view engine','ejs')
app.use((req,res,next)=>{
    isAuthenticated=req.session.isLogged
    // csrfToken=req.csrfToken();
    next();
})
app.use(index)
app.use(StudentRegistration);
app.use(department);
app.use(newClass);
app.use(auth);
connection.connect('mongodb://localhost:27017/CTI')


.then(()=>{
    text.findOne()
.then((table)=>{
    if(!table){
        const newTable=new text({title:"Title",information:"description"})
        newTable.save()
        .then(()=>{
            app.listen(3000)
           
        })
        
    }
    else{
      
         app.listen(3000)
        
    }
}).catch(err=>console.log(err))
})

