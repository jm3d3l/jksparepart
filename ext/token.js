const jwt = require('jsonwebtoken');

var secret_key = "ilovemaryrose";

const service = {};

service.secret = secret_key;
service.verify = jwt.verify;
service.sign   = jwt.sign;

service. create = function(data, expiresIn, secret)
{
    if(!secret) secret = secret_key;
    var expiresHrs = expiresHrs ? expiresHrs : 3;
    var expiresIn  = ( 60 * 60 * expiresHrs );
    var token      = jwt.sign(data, secret, {
        expiresIn : expiresIn
    });
    return token;
};
module.exports = service;
