const crypto = require('crypto');

exports.generateToken = () => {
    const token = crypto.randomBytes(32).toString('hex');
    
    const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex')
    
    console.log(token);

    return {token , hashedToken};
};