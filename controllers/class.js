const newClass = require('../Models/class');
const department=require('../Models/department');

 
exports.getAddDepartment = (req, res) => {
  department.find()
  .then(department=>{
    newClass.find().sort({_id: -1})
  .then((classs)=>{
    res.render('./newClass.ejs',{
      title:"New Class",
      path:"/form",
      classs:classs,
      department:department
    });
  }).catch(err=>console.log(err)) 
  })
 
    
}



exports.postAddDepartment = (req, res) => {
  const depname= req.body.depname;
  const year= req.body.year;
  const month= req.body.month;
  const time=req.body.time;
  const day=req.body.day;
  const name=req.body.name;
 
  const Class = new newClass({
      depname: depname,
      time:time,
      day:day,
      name:name,
      year: year,
      month: month,
      attendence:0,
      deleted:0
  });
  Class.save()
    .then(result => {
      res.status(201).json({
        post: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

exports.postEditDepartment = (req, res) => {
  const id = req.body.id;
  const depname= req.body.depname;
  const year= req.body.year;
  const month= req.body.month;
  const time=req.body.time;
  const day=req.body.day;
  const name=req.body.name
  console.log(id,depname,year,month,time,day,name)
  
  newClass.findById(id)
  .then(department => {
    department.depname = depname;
    department.time=time;
    department.day=day;
    department.name=name;
    department.month = month;
    department.year = year;
    department.save()
  }).then(result => {
    res.status(201).json({
      post: result
    });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
}
exports.postDeleteDepartment = (req, res) => {
  const id= req.body.id;
console.log(id)
  newClass.findByIdAndRemove(id)
  .then(result => {
    res.status(201).json({
        message: "deleted successfully",
      post: result
    });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
}