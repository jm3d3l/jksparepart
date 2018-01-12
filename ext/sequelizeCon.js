const _config = require('../config');

const Sequelize = require('sequelize');

const service = {};

service.connect = function(request, response)
{
    var connection = new Sequelize(_config.mysql.database, _config.mysql.host, _config.mysql.password,{
        host : _config.mysql.host,
        dialect: 'mysql'
    });
    var Subject = connection.define('subjects', {
        student_id : Sequelize.INTEGER,
        subject_name : Sequelize.STRING,
        subject_teacher : Sequelize.STRING,
        subject_time : Sequelize.DATE

       
    });
    
    connection.sync();
}
module.exports = service;