const express = require('express');
const parser  = require('body-parser');
const config  = require('./config');
const _http   = require('http');


const auth = require('./ext/auth');
const product = require('./ext/products');


var app = express();

app.get('/', function(req , res){
    res.send('server is up');
});

app.use(parser.json());
app.use(parser.urlencoded({extended : true}));


app.use('/public_files',express.static(__dirname + '/public_files'));


app.use(function(req, res, next){
    res.header('Access-Control-Allow-Headers', 'Origin, Authorization, X-Requested-With, Content-Type, Accept, Crendetials, Access-Control-Request-Method');
    res.header('access-control-allow-methods', 'POST,HEAD,GET,PUT,DELETE,OPTIONS');
    res.header('access-control-allow-origin', '*');
    if(req.method == 'OPTIONS')
        next();
    else{
        console.log(req.url)
        if(req.url.indexOf('/product') > -1)
        next();
    }
});
app.post('/api/auth/login', auth.login);
app.get('/api/product', product.getProducts);

_http.createServer(app).listen(config.app_port, function(){
    console.log('u are listening to port:'+''+config.app_port);
})

