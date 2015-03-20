var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration =================

    mongoose.connect('mongodb://127.0.0.1/mydb');     // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());
	
	 // define model =================
    var Todo = mongoose.model('Todo', {
        text : String
    });
	
	var Registration = mongoose.model('Registration',{
		firstName : String,
		middleName : String,
		lastName : String,
		emailId : { type: String, unique: true },
		phoneNumber : Number,
		address : String,
		city : String,
		state : String,
		zip : String		
	});
	
	// routes ======================================================================

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function(req, res) {

        // use mongoose to get all todos in the database
        Todo.find(function(err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(todos); // return all todos in JSON format
        });
    });
	
	// get all todos
    app.get('/api/registrations', function(req, res) {

        // use mongoose to get all registrations in the database
        Registration.find(function(err, registrations) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(registrations); // return all registrations in JSON format
        });
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text : req.body.text,
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });

    });
	
	// create registration and send back all registration after creation
    app.post('/api/registrations', function(req, res) {
	
	console.log(req.body.firstName);

        // create a registration, information comes from AJAX request from Angular
        Registration.create({
            firstName : req.body.firstName ,
			middleName : req.body.middleName ,
			lastName : req.body.lastName ,
			emailId : req.body.emailId ,
			phoneNumber : req.body.phoneNumber ,
			address : req.body.address ,
			city : req.body.city ,
			state : req.body.state ,
			zip : req.body.zip ,
            done : false
        }, function(err, registration) {
            if (err) {
				console.log(err);
                res.send(err);
				}
				else
				{
					// get and return all the registrations after you create another
					Registration.find(function(err, registrations) {
						if (err)
							res.send(err)
						res.json(registrations);
					});
				}            
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });
	
	// delete a registration
    app.delete('/api/registrations/:registration_id', function(req, res) {
        Registration.remove({
            _id : req.params.registration_id
        }, function(err, registration) {
            if (err)
                res.send(err);

            // get and return all the registrations after you create another
            Registration.find(function(err, registrations) {
                if (err)
                    res.send(err)
                res.json(registrations);
            });
        });
    });
	
	
	
	// application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

    // listen (start app with node server.js) ======================================
    app.listen(3000);
    console.log("App listening on port 3000");