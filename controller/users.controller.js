const User = require("../models/users.model");
const { compare } = require("bcrypt");
//Register API and page
exports.register = async (req,res,next) => {
    res.render("register");
}
exports.registerSubmit = async (req,res,next) => {
    const {name,email,password} = req.body;
    try{
        const user = new User({
                name,
                email,
                password
            })
     await user.save();
     res.send("User registered")
    }catch(error){
        res.redirect("login")
    }

}

//Login API and page
exports.login = async (req,res,next) => {
    res.render("login");
}
exports.loginSubmit = async (req,res,next) => {
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.redirect("login");
        }
        const match = await compare(password,user.password);
        if(!match){
            return null;
        }else{
            req.session.user = user;
            res.redirect("/");
        }

    }catch(error){
        //console.log(error);
    }
}

exports.logoutSubmit = async (req,res,next) => {
    await req.session.destroy();
    res.redirect("/login");
}

//Home page
exports.home = async (req,res,next) => {
    if(req.session.user){
        res.render("home",{name:req.session.user.name,email:req.session.user.email});
    }else{
        res.render("login");
    }
    
}