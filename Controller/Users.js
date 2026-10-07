const User = require('../Module/user');

exports.ViewProfile = (req , res , next) => {
    User.findAll()
        .then(users => {
            if (!users)  return users.createUser();
            return users[0];
        })
        .then(user  => {
            res.render('User_profile' , {user : user , pageTitle : 'USER PROFILE' , path : '/User_profile'});
        })
        .catch(err => {
            console.log(err);
        });
};
    