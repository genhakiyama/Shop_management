const User = require('../Module/user');

exports.log = (req , res , next) => {
    const cookie = req.get('Cookie');
    let loggedin = 'false';
    if (cookie){
        loggedin = cookie.split(';')[0].split('=')[1];
    }
    console.log(loggedin);
    if (loggedin === 'true') return res.redirect('/profile/viewprofile');
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
            res.setHeader('Set-Cookie' , 'loggedin=true'); //- why cannot put viewprofile here
            res.render('User_profile' , {user : user , pageTitle : 'USER PROFILE' , path : '/User_profile'});
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
                // res.setHeader('Set-Cookie' , 'loggedin=true');
                return res.redirect('/profile/viewprofile')
            })
            .catch(err => {
                console.log(err);
            });
};