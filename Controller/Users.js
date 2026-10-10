const User = require('../Module/user');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const EmailHelper = require('../Helpers/Email');
const TokenHelper = require('../Helpers/Token');

exports.logout = (req , res , next) => {
    res.clearCookie('connect.sid');
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
    const {username , email , password , imageProfile} = req.body;
    const {token , hashedToken} = TokenHelper.generateToken();

    let fetchUser;
    User.findOne({
        where : {
            email : email
        }})
        .then(user => {
            if (!user) {
                return bcrypt.hash(password , 12)
                            .then(hashedPassword => {   
                                return User.create({
                                    username , 
                                    email , 
                                    password : hashedPassword ,
                                    imageProfile , 

                                    isVerified : false , 
                                    verificationToken : hashedToken , 
                                    verificationTokenExpires : 
                                        new Date(Date.now() + 15 * 60 * 10000)
                                });
                            })
                            .then(user => {
                                fetchUser = user  ;
                                res.status(201).render('check-email' , {PageTitle : 'Verify your email' , email});
                                return EmailHelper.sendVerification(email , token);
                            })
                            .catch(err => {
                                console.log(err);
                            });
            }
            return res.status(409).render('error' , {errorMessage : "Username has been used"});
        });
};

exports.getVerifyEmail = (req , res , next) => {
    const { token } = req.query;

    if (!token || typeof token !== 'string') {
        return res.status(404).render('error' , {errorMessage : 'Invalid verification link'});
    }

    const hashedToken = crypto 
                            .createHash('sha256')
                            .update(token)
                            .digest('hex');

    User.findOne({
        where : {
            verificationToken : hashedToken
        }})
        .then(user => {
            if (!user || !user.verificationToken || user.verificationTokenExpires <= new Date()) 
                return res.status(400).render('error' , {errorMessage : 'Invalid or expired verification link'});

            return user.update({
                isVerified : true , 
                verificationToken : null , 
                verificationTokenExpires : null
            });
        })
        .then(user => {
            if (!user) return;
            req.session.isLoggedIn = true;
            req.session.userID = user.id;
            user.createCart();
            return res.send('Email verified sucessfully');
        })
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
    User.findOne({
            where : {
                email : req.body.email  
            }
        })
        .then(user => {
            if (!user || !user.isVerified) return res.redirect('/profile');
            return bcrypt.compare(req.body.password , user.password)
                            .then(isMatch => {
                                if (!isMatch) return res.redirect('/profile');
                                
                                req.session.isLoggedIn = true;
                                req.session.userID = user.id;
                                return res.redirect(`/profile/viewprofile/${user.id}`);
                            });
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