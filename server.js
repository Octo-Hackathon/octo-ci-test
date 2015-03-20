var express = require("express");
var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration =================
	oppController = require('./service/controllers/oppController');

//mongoose.connect('mongodb://localhost:27017/mean-marketplace');

    mongoose.connect('mongodb://127.0.0.1/mean-marketplace');     // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

app.get('/', function (req, res) {
	
               res.sendFile(__dirname + '/public/index.html');
});  

//app.use('/js', express.static(__dirname + '/ui/javascripts'));
//app.use('/views', express.static(__dirname + '/ui/views'));

//REST API
 app.post('/api/create', oppController.create);
 app.get('/api/buyerlist/:user', oppController.buyerlist);
 app.get('/api/vendorlist', oppController.vendorlist); 
 app.get('/api/opportunity/:id', oppController.opportunity);
 app.post('/api/opportunity/:id', oppController.updateOpp);
 //app.post('/api/publish/:id',  oppController.publishOpp);
 app.delete('/api/opportunity/:id', oppController.deleteOpp);

exports.app = app;


app.listen(3000, function() {
               console.log('Mock1 app started on port 3000...');
});
