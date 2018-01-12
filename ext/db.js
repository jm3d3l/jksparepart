const _config = require('../config');
const _mysql  = require('mysql');
const  _q     = require('q');


const service = {};

service.pool = _mysql.createPool({
    host     : _config.mysql.host,
    user     : _config.mysql.user,
    password : _config.mysql.password,
    database : _config.mysql.database
});

service.select = function(conn, table, where, limit)
{
    var deferred = _q.defer();
    
    if(!where)
        var query = "SELECT * FROM `"+table+"`";
    else if(typeof where === 'string')
        var query = "SELECT * FROM `"+table+"` WHERE"+where;

    else
        var query ="SELECT * FROM `"+table+"` WHERE `"+where[0]+"` = "+conn.escape(where[1]);
    if(limit)
        query+="limit"+ limit;
    conn.query(query, function(err, rows){
        if(err){
            console.log("\n"+ new Date());
            consol.log(err);
            console.log(table);
            console.log(data);
        }
        deferred.resolve(rows)
    });
    return deferred.promise;
}
module.exports = service;
