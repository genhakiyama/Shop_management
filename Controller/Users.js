const User = require('../Module/user');

exports.logout = (req , res , next) => {
    res.clearCookie('connect.sid');
    req.session.destroy(err => {
        res.redirect('/auth');
    })
};

exports.ViewProfile = async (req , res , next) => {
    const user = await req.user;
    res.render('User/User_profile' , {user : user , pageTitle : 'USER PROFILE', isVerified : req.session.isLoggedIn , userID : user.id});
};

exports.editProfile = async (req , res , next) => {
    const user = await req.user;
    res.render('User/edit-profile' , {user : user , pageTitle : 'EDIT PROFILE', isVerified : req.session.isLoggedIn});
};

exports.updateProfile = async (req , res , next) =>{
    const user = req.user;
    const {username , email , imageProfile} = req.body;
    await user.update({
        username , 
        imageProfile
    });
    res.redirect(`/profile/viewprofile/${user.id}`);
};