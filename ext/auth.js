const _db = require('./db');
const _token = require('./token');

const service = {};

service.login = function(request, response)
{
    var data = request.body;

    _db.pool.getConnection(function (err, conn){
        if(err) return response.json({message: 'cant connect to database'});

        var qry = "SELECT * FROM user WHERE username = ? AND password = ? LIMIT 1;";

        conn.query(qry, [data.username, data.password], function(err, rows){
            if(err) throw err;

            var user = (rows.length) ? rows[0] : {};
            var result = user;
            var userToken = _token.create(user);

            result.userToken = userToken;

            return response.json({status:0, message: ' success', result : result });
        })
    })
};

module.exports = service;