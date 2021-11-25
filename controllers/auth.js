const users=require('../Models/user');
const bcrypt=require('bcryptjs');
const crypto=require('crypto')
const mailer=require('nodemailer');
const mailTransport=require('nodemailer-sendgrid-transport');
const {validationResult}=require('express-validator/check')
// const transporter=mailer.createTransport(sendgrid({
    // auth:{
        // api_key:
//     }
// }))

exports.getlogin=(req,res)=>{
    let message=req.flash('err')
    if(message.length>0){
        message=message[0]
    }
    else{
        message=null
    }
    res.render("./auth/login.ejs",{
        title:'Login Page',
        errorMessage:message
    })
}

exports.postlogin=(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    users.findOne({email:email})
    .then((user)=>{
        if(!user){
            req.flash('err','Invalid Password or Email')
          return res.redirect('login')
        }
        return bcrypt.compare(password,user.password)
            .then(doMatch=>{
                 if(doMatch){
                    req.session.isLogged=true;
                    return req.session.save(err=>{
                        console.log(err);
                        res.redirect('/index');
                    });
                 }
            req.flash('err','Invalid Password or Email')
             return res.redirect('/login')
              })
              .catch(err=>{
                console.log(err)
                res.redirect('/login')
            })
       
    }) 

}

exports.logOut=(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/index')
    })
}




exports.signUp=(req,res)=>{
    let message=req.flash('err')
    if(message.length>0){
        message=message[0]
    }
    else{
        message=null
    }
    res.render('./auth/signUp.ejs',{
        title:"Sign Up Page",
        errorMessage:message,
        oldPassword:'',
        oldConfirmPassword:'',
        oldEmail:'',
        oldUserName:'',
        oldDepartment:'',
        oldType:''
    });
}

exports.postSignUp=(req,res)=>{
    const userName=req.body.userName;
    const email=req.body.email;
    const password=req.body.password;
    const repeatPassword=req.body.repeatPassword;
    const type=req.body.type;
    const department=req.body.dp;
    const errors=validationResult(req)

    if(!errors.isEmpty()){
     return res.render('./auth/signUp.ejs',{
            title:"Sign Up Page",
            errorMessage:errors.array()[0].msg,
            oldPassword:password,
            oldConfirmPassword:repeatPassword,
            oldEmail:email,
            oldUserName:userName,
            oldDepartment:department,
            oldType:type


        });
    }

    users.findOne({email:email})
    .then(emailDoc=>{
       if(emailDoc){
        req.flash('err','Email already exist!')
           res.redirect('/signUp')
        }
       else{
        users.findOne()
        .then(user=>{
            if(!user){
            return  bcrypt.hash(password,12)
            .then(hashPassword=>{
                const user=new users({
                    userName:userName,
                    email:email,
                    password:hashPassword,
                    repeatPassword:repeatPassword,
                    department:department,
                    type:'Admin'
                })
              return  user.save()
            })
            .then(result=>{
                res.redirect('/login')
                // transporter.sendMail({
                    // to:email,
                    // from:'aghida55@gmail.com',
                    // subject:'Signed up successed!',
                    // html:'<h1>You signed up successfuly!</h1>'
                // })
            })
            }
            else{
                return bcrypt.hash(password,12)
                .then(hashPassword=>{
                    const user=new users({
                        userName:userName,
                        email:email,
                        password:hashPassword,
                        repeatPassword:repeatPassword,
                        department:department,
                        type:type
                    })
                  return  user.save()
                })
          
            .then(result=>{
                res.redirect('/login')
                // transporter.sendMail({
                //     to:email,
                //     from:'aghida55@gmail.com',
                //     subject:'Signed up successed!',
                //     html:'<h1>You signed up successfuly!</h1>'
                // })
            })
        }
        })
       }
    })
}

exports.resetPassword=(req,res,next)=>{
    let message=req.flash('err')
    if(message.length>0){
        message=message[0]
    }
    else{
        message=null
    }
    res.render('./auth/resetpassword.ejs',{
        title:"Reset Password",
        errorMessage:message
    });
}

exports.postResetPassword=(req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
         return   res.redirect('/resetPassword')
        }
        const resetToken=buffer.toString('hex');
        users.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                req.flash('err','Sorry! No Contact with this Email!')
                return res.redirect('/resetPassword')
            }
            user.resetToken=resetToken;
            user.resetTokenExpiration=Date.now()+3600000;
           return user.save()
        })
        .then(result=>{
            res.redirect('/index');
            transporter.sendMail({
                to:req.body.email,
                from:"aghida55@gmail.com",
                subject:"Reset Password",
                html:"Please click here <a href='http://localhost:3000/resetPassword/"+resetToken+"'>Reset Password</a>"
            })
        })
    })
}
exports.getNewPassword=(req,res,next)=>{
    token=req.params.token;
    users.findOne({
        resetToken:token,
        resetTokenExpiration:{$gt:Date.now()}
    })
    .then(user=>{
        if(!user){
            req.flash('err','You are too late!')
            return res.redirect('/resetPassword')
        }
        let message=req.flash('err')
        if(message.length>0){
            message=message[0]
        }
        else{
            message=null
        }
        res.render('./auth/new-password',{
            title:'New Password',
            errorMessage:message,
            id:user._id.toString(),
            token:token
        })
    })
}

exports.postNewPassword=(req,res)=>{
    const password=req.body.password;
    const id=req.body.id;
    const token=req.body.token;
    let resetUser;
    users.findOne({
        resetToken:token,
        resetTokenExpiration:{$gt:Date.naw()},
        _id:id
    })
    .then((user)=>{
        if(!user){
        res.redirect('/resetPassword')
        }
        resetUser=user;
        return bcrypt.hash(password,12)
    })
    .then((hashPassword)=>{
        resetUser.password=hashPassword;
        resetUser.resetToken=undefined;
        resetUser.resetTokenExpiration=undefined
        return resetUser.save();
    })
    .then((result)=>{
        res.redirect('/login')
    })
}