const User = require('../Module/user');

exports.logout = (req , res , next) => {
    res.clearCookie('connect.sid');
    req.session.destroy(err => {
        res.redirect('/auth');
    })
};

exports.ViewProfile = (req , res , next) => {
    const userID = req.session.userID;
    User.findOne({where : {id : userID}})
        .then(user  => {
            res.render('User/User_profile' , {user : user , pageTitle : 'USER PROFILE', isVerified : req.session.isLoggedIn , userID : user.id});
        })
        .catch(err => {
            console.log(err);
        });
};

exports.editProfile = (req , res , next) => {
    const userID = req.session.userID;
    User.findOne({where : {id : userID}})
        .then(user => {
            res.render('User/edit-profile' , {user : user , pageTitle : 'EDIT PROFILE', isVerified : req.session.isLoggedIn});
        })
        .catch(err => {
            console.log(err);
        });
};

exports.updateProfile = (req , res , next) =>{
    const id = req.session.userID;
    User.findOne({
        where : {
            id : id
        }
    })
        .then(user => {
            user.imageProfile = req.body.imageProfile;
            user.username = req.body.username;
            user.save();
            res.redirect(`/profile/viewprofile/${user.id}`)
        })
        .catch(err => {
            console.log(err);
        });
};