const department = require('../Models/department');

exports.getAddDepartment = (req, res) => {
  department.find().sort({_id: -1})
  .then((department)=>{
    res.render('./department.ejs',{
      pagetitle:"Student Department",
      path:"/form",
      department:department
    });
  }).catch(err=>console.log(err))    
}

exports.postEditDepartment = (req, res) => {
  const id = req.body.id;
  const depname= req.body.depname;
 

  // console.log(id, fullname, email, major)
  department.findById(id)
  .then(department => {
    department.depname = depname;
   

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

exports.postAddDepartment = (req, res) => {
  const depname= req.body.depname;
 

  const Department = new department({
      depname: depname
  });
  Department
    .save()
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

exports.postDeleteDepartment = (req, res) => {
  const id= req.body.id;

  department.findByIdAndRemove(id)
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