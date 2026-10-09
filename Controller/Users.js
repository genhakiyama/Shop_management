const User = require('../Module/user');

exports.log = (req , res , next) => {
    if (req.session.isLoggedIn) return res.redirect('/profile/viewprofile');
    else {
        res.render('Login' , {pageTtle : 'LOG IN' , path : '/Login'});
    }
};

exports.ViewProfile = (req , res , next) => {
    User.findAll()
        .then(users => {
            if (!users)  return users.createUser();
            return users[0];
        })
        .then(user  => {
            req.session.isLoggedIn = true;
            res.render('User_profile' , {user : user , pageTitle : 'USER PROFILE' , path : '/User_profile' , isVerified : req.session.isLoggedIn});
        })
        .catch(err => {
            console.log(err);
        });
};

    
exports.verityAccount = (req , res , next) => {
    User
        .findOne({
            where : {
                email : req.body.email  
            }
        })
        .then(user => {
            if (!user) return res.redirect('/home');
            return res.redirect('/profile/viewprofile');
        })
        .catch(err => {
            console.log(err);
        });
};