const User = require('../Module/user');

exports.log = (req , res , next) => {
    if (req.session.isLoggedIn) return res.redirect(`/profile/viewprofile/${req.session.userID}`);
    else {
        res.render('Login' , {pageTtle : 'LOG IN' , path : '/Login'});
    }
};

exports.ViewProfile = (req , res , next) => {
    const userID = req.session.userID;
    User.findOne({where : {id : userID}})
        .then(user  => {
            res.render('User_profile' , {user : user , pageTitle : 'USER PROFILE' , path : '/User_profile' , isVerified : req.session.isLoggedIn , userID : user.id});
        })
        .catch(err => {
            console.log(err);
        });
};

exports.editProfile = (req , res , next) => {
    const userID = req.session.userID;
    User.findOne({where : {id : userID}})
        .then(user => {
            res.render('edit-profile' , {user : user , pageTitle : 'EDIT PROFILE' , path : '/edit-profile' , isVerified : req.session.isLoggedIn});
        })
        .catch(err => {
            console.log(err);
        });
};
    
exports.verifyAccount = (req , res , next) => {
    User
        .findOne({
            where : {
                email : req.body.email  
            }
        })
        .then(user => {
            if (!user) return res.redirect('/home');

            req.session.isLoggedIn = true;
            req.session.userID = user.id;

            return res.redirect(`/profile/viewprofile/${user.id}`);
        })
        .catch(err => {
            console.log(err);
        });
};