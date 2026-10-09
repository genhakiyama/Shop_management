const User = require('../Module/user');

exports.logout = (req , res , next) => {
    req.session.destroy(err => {
        res.redirect('/profile');
    })
};

exports.log = (req , res , next) => {
    if (req.session.isLoggedIn) return res.redirect(`/profile/viewprofile/${req.session.userID}`);
    else {
        res.render('Login' , {pageTtle : 'LOG IN' , path : '/Login'});
    }
};

exports.createProfile = (req , res , next) => {
    res.render('signup' , {pageTitle : 'SIGN UP' , path : '/signup'});
};

exports.postProfile = (req , res , next) => {
    let fetchUser;
    User.create({
        username: req.body.username , 
        email : req.body.email , 
        password : req.body.password , 
        imageProfile : req.body.imageProfile
    })
    .then(user => {
        fetchUser = user;
        return user.getCart()
                .then(cart => {
                    if (!cart) return user.createCart();
                        return cart;
                });
    })
    .then(cart => {
        req.session.isVerified = true ;
        req.session.userID = fetchUser.id;
        res.redirect(`/profile/viewprofile/${fetchUser.id}`);
    });
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
        })
        .catch(err => {
            console.log(err);
        });
};