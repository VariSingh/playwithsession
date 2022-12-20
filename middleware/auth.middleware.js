exports.checkSignIn = (req, res,next) => {
    if(req.session.user){
       next();     //If session exists, proceed to page
    } else {
       res.redirect("login");
    }
 }