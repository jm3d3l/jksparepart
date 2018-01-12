const _fs     = require('fs');
const _config = require('../config');
const _db     = require('../ext/db');
const _path   = require('path');

const service = {};

service.getProducts = function(request, response)
{
    _db.pool.getConnection(function(err, conn){
        if (err)
        return response.json({ message : 'error in connection'});
    
    _db.select(conn, 'products')
       .then(function(rows){
           conn.release();
           if(!rows.length)
           return response.json({ status: 0,message: 'error in query'});

           var data = [];
           
        for(i = 0;i < rows.length; i++){
            var item = rows[i];
            var prod = _path.join(__dirname, '../public_files/spareparts/'+item.item+'.jpg');
            item.prod = (_fs.existsSync(prod)) ? '../public_files/spareparts/'+item.item+'.jpg' : '../public_files/spareparts/NOLOGO.jpg';
            console.log(item.prod);
            data.push(item);

        };

        return response.json({status: 1, message:' success', result : data})
       
       })
    })
}
module.exports = service;
