const Student=require('../Models/StudentRegistration')
const text=require('../Models/text');
const department=require('../Models/department');
const newClass=require('../Models/class');
const attendance=require('../Models/attendance');

exports.studentRegistration=(req,res)=>{
    department.find()
    .then(dp=>{
        res.render('./StudentRegistration.ejs',{
            title:"Add New Student",
            subTitle:"This is the best app ever!",
            dp:dp
           
        })
       
    })
   
}

exports.postStudent=(req,res)=>{
    const name=req.body.name;
    const lname=req.body.lname;
    const fname=req.body.fname;
    const email=req.body.email;
    const phone=req.body.phone;
    const nationalId=req.body.nationalId;
    const address=req.body.address;
    const dateOfBirth=req.body.dateOfBirth;
    const c=req.body.class;
    const major=req.body.major;
    const image=req.file;
    const imageUrl=(image==null?'null':image.path);
    const other=req.body.other;
	var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' +dd ;
    const dateOfRegistration= today;
    var firstLatter;
    department.find({_id:c})
    .then((department)=>{
        firstLatter=department[0].depname.slice(0,1);
        return firstLatter
    })
    .then((firstLatter)=>{
        const student=
        new Student({name:name,lname:lname,fname:fname,email:email,phone:phone,nationalId:nationalId,address:address,dateOfBirth:dateOfBirth,photo:imageUrl,classId:c,major:major,other:other,dateOfRegistration:dateOfRegistration,score:null,status:"Pinding",dateOfExpire:null,dateOfIssue:null,nativeScore:null,
        deleted:0,result:null,description:null,registerToClass:null,studentDp:firstLatter ,studentYear:yyyy,cardNumber:0,studentId:null});
        student.save()
        .then(result=>{
            res.redirect('./applicants')
        })
        .catch(err=>console.log(err))
    })
 
}
exports.applicants=(req,res)=>{
  
    Student.find().sort({_id:-1}).populate('classId')
    .then(students=>{
    res.render('./applicants.ejs',{
        students:students,
        title:"result"
    }
    )
    })
    .catch(err=>console.log(err))
}

exports.registred=(req,res)=>{
    department.find()
    .then((dp)=>{
        Student.find()
        .then((student)=>{
            res.render('./registred.ejs',{
                title:"Failed Student",
                students:student,
                dp:dp
            })
        })
        .catch(err=>console.log(err))
    })
    
}
exports.generateCard=(req,res)=>{
    const id=req.body.myInput;
    var studentId;
    var date;
    var count=1;

    // let StudentPurpose;
    Student.findById(id)
    .then((student)=>{
        const studentYear = student.studentYear;
        const studentDp = student.studentDp;

        Student.find({$and: 
            [
                {studentYear: student.studentYear}, 
                {studentDp: student.studentDp}
            ]}).sort({"cardNumber": -1}).limit(1)
            .then(studentDoc => {
                const cardNumber = ++studentDoc[0].cardNumber
                return cardNumber;
                // console.log(studentDoc)
                // console.log(cardNumber)
            })
            .then(idNumber => {
                Student.findById(id)
                .then(S=>{
                    S.studentId=studentDp+"_"+studentYear+"_"+idNumber
                    S.cardNumber=idNumber;
                    S.result='Passed'
                    S.save();
                    res.render('./generateCard.ejs',{
                            title:"Generate Card",
                            student:S,
                            studentId:studentId
                        })
                })
            })

        })
        .then()
        .catch(err=>console.log(err))
       
      
 
}


exports.postScore=(req,res,next)=>{
    const id = req.body.id;
    const score= req.body.score;
    const nativeScore=req.body.nativeScore;
    console.log(id, score)
    Student.findById(id)
    .then(student => {
        // console.log(student)
      student.score = score;
      student.save()
    })
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


  exports.examResult=(req,res)=>{
    const id = req.body.id;
    const result=req.body.result;
   
    Student.findById(id)
    .then(student => {
        // console.log(student)
      student.result = result;
      student.save()
    })
    .then(result => {
        console.log("result --- ",result.result)
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

    exports.result=(req,res)=>{
        Student.find().sort({_id:-1}).populate('classId')
        .then(students=>{
        res.render('./result.ejs',{
            students:students,
            title:"Result"
        })
        })
        .catch(err=>console.log(err))
    }

exports.postNativeScore=(req,res,next)=>{
    const nativeScore=req.body.nativeScore;
    Student.find()
    .then(student => {
        // console.log(student)
        for(var i=0; i<=student.length;i++){
      student[i].nativeScore = nativeScore;
      student[i].save()
    }
    })
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
exports.postCard=(req,res)=>{
    const dateOfExpire=req.body.dateOfExpire;
    const dateOfIssue=req.body.dateOfIssue;

    const id=req.body.ID;
    Student.findById(id)
    .then((student)=>{
        student.dateOfExpire=dateOfExpire;
        student.dateOfIssue=dateOfIssue;
        student.status="Present"
        student.save();
    })
    .then(()=>{
        res.redirect('./result');
    })
    .catch(err=>console.log(err));

}




exports.allStudent=(req,res)=>{
    department.find()
    .then((dp)=>{
        Student.find()
        .then((student)=>{
            res.render('./AllStudent.ejs',{
                title:"All Students",
                students:student,
                dp:dp,
            })
        })
        .catch(err=>console.log(err))
    })
   
   
}
exports.deletedStudent=(req,res)=>{
    Student.find()
    .then((student)=>{
        res.render('./deleted.ejs',{
            title:"Deleted Students",
            students:student
        })
    })
    .catch(err=>console.log(err))
}
exports.onlineRgistration=(req,res)=>{
    let para=[];
   text.find()
   .then((p)=>{
       para=p
      department.find()
     .then((dp)=>{
        res.render('./onlineRegistration.ejs',{
            title:"fffffffffff",
            para:para,
            dp:dp
        }); 
    })
   })
   
      
}

exports.editOnlineRgistration=(req,res)=>{
    text.find()
    .then((caption)=>{
        res.render('./editInformation.ejs',{
            title:"Edit Information",
            caption:caption
        })
    })  
}
exports.postEditOnlineRgistration=(req,res)=>{
    const title=req.body.title;
    const information=req.body.information;
    text.find()
    .then((caption)=>{
        caption[0].title=title;
        caption[0].information=information;
        caption[0].save();
    })
    .then(()=>{
        res.redirect('/onlineRegistration')
    })
    .catch(err=>console.log(err))
}

exports.getDetail=(req,res)=>{
    const studentId=req.body.studentId;
    let dep;
    let cls;
    department.find()
    .then((dp)=>{
        dep=dp
    })
    newClass.find()
    .then((cl)=>{
        cls=cl
    })
    Student.findById(studentId).populate('classId')
    .then((student)=>{
        res.render('./detail.ejs',{
            title:'Student Details',
            student:student,
            dp:dep,
            cls:cls
        });
    })
    .catch(err=>console.log(err))
   
} 
exports.postDetail=(req,res)=>{
    let dep;
    let cls;
    department.find()
    .then((dp)=>{
        dep=dp
    })
    newClass.find()
    .then((cl)=>{
        cls=cl
    })
    const name=req.body.name;
    const lname=req.body.lname;
    const fname=req.body.fname;
    const email=req.body.email;
    const phone=req.body.phone;
    const nationalId=req.body.nationalId;
    const address=req.body.address;
    const dateOfBirth=req.body.dateOfBirth;
    const dateOfRegistration=req.body.dateOfRegistration;  
    const image=req.file;
    const c=req.body.class;
    const major=req.body.major;
    const imageUrl=(image==null?'':image.path);
    const status=req.body.status;
    const cardId=req.body.cardId;
    const description=req.body.description;
    const registerToClass=req.body.registerToClass;
    let studentId=req.body.studentId;
    Student.findById(studentId).populate('classId')
    .then(student=>{
        // console.log(student)
        student.name=name;
        student.lname=lname;
        student.fname=fname;
        student.major=major;
        student.classId=c;
        student.email=email;
        student.phone=phone
        student.dateOfBirth=dateOfBirth;
        student.dateOfRegistration=dateOfRegistration;
        student.nationalId=nationalId;
        student.address=address;
        student.studentId=cardId;
        student.status=status;
        student.description=description;
        student.registerToClass=registerToClass;
        student.photo=(imageUrl==''?student.photo:imageUrl);
        return student.save(); 
    })
     .then((student)=>{
         console.log(student);
       return Student.findById(student._id).populate('classId')  
    })
    .then((stu)=>{
        // console.log('-------------',stu)
        res.render('./detail.ejs',{
            title:'Student Details',
            student:stu,
            dp:dep,
            cls:cls
        });
    })
    .catch(err=>console.log(err))
    // .catch(err=>console.log(err))
}

exports.deleteStudent=(req,res,next)=>{
    const studentId=req.params.studentId
    Student.findById(studentId)
    .then((student)=>{
        student.deleted=1;
       student.save()
       .then(()=>{
            res.redirect('/allStudent')
       
           })
    })
    
}


exports.undo=(req,res,next)=>{
    const studentId=req.params.studentId
    Student.findById(studentId)
    .then((student)=>{
        student.deleted=0;
      return  student.save()
        .then(result=>{
         res.redirect('/deleted')
       
           })
    })
    .catch(err=>console.log(err))
}

exports.passed=(req,res)=>{
    const studentId=req.params.studentId
    Student.findById(studentId)
    .then((student)=>{
        student.result="Passed";
        return student.save()
        .then(result=>{
            res.redirect('/registred')
        })
    })
}

exports.graph=(req,res)=>{
    res.render('./graph.ejs',{
        title:"graph"
    })
}
//deleteFromDb...
exports.deleteFromDb=(req,res)=>{
    const id=req.body.studentId;
    Student.findByIdAndRemove(id)
    .then(result=>{
        res.redirect('/deleted')
    })
    .catch(err=>console.log(err))
}


//search by student StudentId,name,last name....
exports.searchByStudentId=(req,res)=>{
    const start=req.body.start;
    // const end=req.body.end.slice(0,7);
    // const num1=req.body.start.slice(7,9)
    // const num2=req.body.end.slice(7,9)
    // console.log(num1,num2)s
   department.find()
   .then(department=>{
    Student.find({$or:[{studentId:start},{name:start},{lname:start},{studentYear:start}]})
    .then(student=>{
        res.render('./AllStudent',{
            students:student,
            title:"All Student",
            dp:department
        })
    })
   })

   
}

//search by status............

exports.DepartementListStudent=(req,res)=>{
    const selectValue=req.body.mySelect;
    department.find()
    .then((dp)=>{
        Student.find({status:selectValue})
        .then(student=>{
            res.render('./AllStudent.ejs',{
                students:student,
                dp:dp,
                title:"All Student"
            })
        })
    })
   
 
}


//search by department............
exports.searchByDepartment=(req,res)=>{
   const valueSelect=req.body.valueSelect;
   department.find()
   .then((dp)=>{
    Student.find({classId:valueSelect})
    .then((student)=>{
      res.render('./AllStudent',{
         students:student,
         dp:dp,
         title:"All Student"
     })
    })
   })
 
}


//attendnce.................................


exports.postAttendance=(req,res,next)=>{
	var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' +dd ;
   
        // {$and: [{depname:depname}, {year:year}, {satus: "present"}]}
        
    // Student.find().populate({studentId})
    const selectValue=req.body.selectValue;
    console.log(selectValue)
    Student.find({registerToClass:selectValue})
    .then(students=>{
        res.render('./attendance.ejs',{
            title:"Attendance",
            today:today,
            students:students          
        })
    })   
    .catch(err=> console.log(err))
}


exports.getgenerate_Attendance=(req,res)=>{
    newClass.find()
    .then(newClass=>{
        res.render('./GenerateAttendance.ejs',{
            title:"Attendance",
            newClass:newClass
        })
    })
}

exports.getAttendance=(req,res)=>{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '/' + mm + '/' +dd ;
    Student.find().sort({_id:-1})
    .then(students=>{
        res.render('./attendance.ejs',{
            title:"Attendance",
            today:today,
            students:students      
        })
    })   
    .catch(err=> console.log(err))
}


exports.attendanceReport=(req,res)=>{
   
    const comment=req.body.comment;
    const date=req.body.date;
    const ids=req.body.hhh;
    const amount=req.body.amount;

   for(var i=0;i<=ids.length-1;i++){
        const Attendance=new attendance({
              date:date,
              studentId:ids[i],  
              attendence:amount[i],
              comment:comment[i]
            });
        Attendance.save()
        .then(()=>{
            res.redirect('./attendance')
        })
      }
    
}
exports.attendanceDetail=(req,res)=>{
    const date=req.body.date;
    const registerToClass=req.body.dep;
    let studentIds=[];
    Student.find({registerToClass:registerToClass})
    .then((students)=>{
        students.map((key,index)=>{
            studentIds[index]=students[index]._id
        })
    attendance.find({studentId:studentIds}).populate('studentId')
    .then(a=>{
    //   console.log(a.length)
        var d=[]
        for(var i=0; i<a.length; i++){
            var c=[];
             var b;
            for(j=0; j<a.length; j++){
                b = a.filter(e=> a[i].studentId === e.studentId)
            }
    
            b.forEach(f => a.splice(a.findIndex(e=> e.studentId === f.studentId), 1))
            
            for(var e=0; e<b.length; e++){
                c.push({
                 _id:b[e]._id, date: b[e].date.slice(8,10), attendance: b[e].attendence,comment:b[e].comment
                })
            }
    
            d.push({
                id: b[0].studentId,
                attendanceDetail: c
            })
    
        }
    return d
    })
    .then(students=>{
        console.log(students[0].attendanceDetail)
          res.render('./attendanceReport.ejs',{
                students:students,
                title:'dd'
            })
    })

    })



    //  attendance.find().sort({_id:-1}).populate('studentId')
    // .then((students)=>{
        // console.log(students)
  
    // })
    
}

exports.searchAttendance=(req,res)=>{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '/' + mm + '/' +dd ;
    newClass.find()
    .then(newClass=>{
        res.render('./searchAttendance.ejs',{
            newClass:newClass,
            today:today,
            title:"Search"
        })
    })
    
}

exports.postSearchAttendance=(req,res)=>{

}




exports.attendanceResult=(req,res)=>{
 

    const department=req.body.d;
    const today=req.body.date;
    // attendance.find({$or:[{registerToClass:department},{date:date}]})
    
    // console.log(department,today)

    let absent;
    let present;
    let sick;
    let late;
    let id=[];
    let dep;
        Student.find({registerToClass:department})
        .then((stu)=>{
            stu.map((key,index)=>{
                 id[index] = stu[index]._id
                 dep = stu[index].registerToClass
                
             })
            
             attendance.find({$and:[{date:today},{studentId:id}]})
             .countDocuments({attendence:'A'})
             .then(sum=>{
             absent=sum
            //    console.log("absent______________"+absent)
             })
             
        attendance.find({$and:[{date:today},{studentId:id}]}).countDocuments({attendence:'P'})
        .then(sum=>{
            // console.log("present",sum)

          return present=sum
        })
        
        attendance.find({$and:[{date:today},{studentId:id}]}).countDocuments({attendence:'S'})
        .then(sum=>{
            // console.log("sick",sum)

          return sick=sum
        })
        
        attendance.find({$and:[{date:today},{studentId:id}]}).countDocuments({attendence:'L'})
        .then(sum=>{
            // console.log("late",sum)
           return late=sum
        })
            
    .then(()=>{
        attendance.find()
        .then(sum=>{
            console.log(present,absent,late,sick)
            res.render('./attendanceResult.ejs',{
                today:today,
                present:present,
                absent:absent,
                late:late,
                sick:sick,
                dep:dep,
                title:'Attendance Result'
            })
        })
    })
  
     })

    
    
}
exports.registerToClass=(req,res)=>{
    Student.find()
    .then((student)=>{
        newClass.find()
        .then((newClass)=>{
            department.find()
            .then(dp=>{
                // console.log(dp)
                res.render('./registerToClass.ejs',{
                    title:"Register To Class",
                    students:student,
                    newClass:newClass,
                    dp:dp
                })
            })
            
        })
        
    })
    .catch(err=>console.log(err))
}


exports.postToNewClass=(req,res,next)=>{
    const belongsToClass=req.body.belongsToClass;
    const id=req.body.id;
    
    Student.findById(id)
    .then(student => {
        student.registerToClass=belongsToClass;
        student.save();
        
    })
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

exports.searchDepartment=(req,res)=>{
    const option=req.body.option;
    console.log(option)
    Student.find({classId:option})
    .then((student)=>{
        newClass.find()
        .then((newClass)=>{
            department.find()
            .then(dp=>{
                res.render('./registerToClass.ejs',{
                    title:"Register To Class",
                    students:student,
                    newClass:newClass,
                    dp:dp
                })
            })
            
        })
        
    })
}