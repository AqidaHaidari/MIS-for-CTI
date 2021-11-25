const Student=require('../Models/StudentRegistration');
const users=require('../Models/user')

exports.getIndex=(req,res)=>{
  
    var fullstack;
    var unity;
    var mobile;
    var graphic;
    var jobholder;
    var graduated;
    var present;
    Student.find({status:'Jobholder'}).count()
    .then((j)=>{
        jobholder=j
        return Student.find({status:'Graduated'}).count()
    })
    .then((g)=>{
        graduated=g
        return Student.find({status:'present'}).count()
    })
    .then((p)=>{
        present=p
        return Student.find({studentDp:'F'}).count()
    })
    .then((f)=>{
        fullstack=f;
        return   Student.find({studentDp:'U'}).count()
    })
    .then((u)=>{
        unity=u;
        return Student.find({studentDp:'M'}).count()
    })
    .then((m)=>{
        mobile=m;
        return Student.find({studentDp:'G'}).count()
    })
    .then((g)=>{
        console.log(present,graduated,jobholder)
        res.render('./index.ejs',{
            title:"Code To Inspire",
            subTitle:"This is the best app ever!",
            fullstack:fullstack,
            mobile:mobile,
            unity:unity,
            graphic:g,
            present:present,
            graduated:graduated,
            jobholder:jobholder

            

        })
    })
   

}

exports.getIndex2=(req,res)=>{
    var fullstack;
    var unity;
    var mobile;
    var graphic;
    var jobholder;
    var graduated;
    var present;
    Student.find({status:'Jobholder'}).count()
    .then((j)=>{
        jobholder=j
        return Student.find({status:'Graduated'}).count()
    })
    .then((g)=>{
        graduated=g
        return Student.find({status:'present'}).count()
    })
    .then((p)=>{
        present=p
        return Student.find({studentDp:'F'}).count()
    })
    .then((f)=>{
        fullstack=f;
        return   Student.find({studentDp:'U'}).count()
    })
    .then((u)=>{
        unity=u;
        return Student.find({studentDp:'M'}).count()
    })
    .then((m)=>{
        mobile=m;
        return Student.find({studentDp:'G'}).count()
    })
    .then((g)=>{
        console.log(present,graduated,jobholder)
        res.render('./index2.ejs',{
            title:"Code To Inspire",
            subTitle:"This is the best app ever!",
            fullstack:fullstack,
            mobile:mobile,
            unity:unity,
            graphic:g,
            present:present,
            graduated:graduated,
            jobholder:jobholder

            

        })
    })
   

}
