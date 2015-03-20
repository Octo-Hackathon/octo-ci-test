var Opp = require('../models/opportunity');



module.exports.create = function(req, res) {
	var opp = new Opp(req.body);
	console.log(req.body);
	//var opp = new Opp({opNumber : "O2",opTitle : "Test Opp2",opType : "Opp Type2",createdBy : "mehulsoni@gmail.com",primaryContact : "Mehul Soni"});
	opp.save(function (err, result) {
		//res.json(result);
		var user = result.createdBy;
		console.log('Created user: ' + user);
		var list = Opp.find({createdBy: user}, function(err, results) {
			res.json(results);
		});
	});
}

module.exports.buyerlist = function(req, res) {
	var username = req.params.user;
	console.log('Username is :' + username)
	Opp.find({createdBy: username}, function(err, results) {
			res.json(results);
		});
}

module.exports.vendorlist = function(req, res) {
	Opp.find({opStatus: "Published"}, function(err, results) {
			res.json(results);
		});
}

module.exports.opportunity = function(req, res) {
	var oid = req.params.id;
	console.log('oid is :' + oid);
	Opp.findById(oid, function(err, results) {
			res.json(results);
		});
}

module.exports.updateOpp = function(req, res) {
    //var opp = new Opp(req.body);
    var opp = req.body;
    delete opp._id;
  //  var update = {};
   // update.opTitle = req.opTitle;

    console.log("Updating OppId :" + req.params.id);


    Opp.findByIdAndUpdate(req.params.id, {$set: opp}, 
        function(err, results) {
            res.json(results);
        }
    );

}

module.exports.deleteOpp = function(req, res) {
    //var opp = new Opp(req.body);
    var oid = req.params.id;
	console.log('oid is :' + oid);

    Opp.findByIdAndRemove(oid, 
        function(err, results) {
            res.json(results);
        }
    );

}

/*module.exports.publishOpp = function(req, res) {
    var opp = new Opp(req.body);
    opp.findByIdAndUpdate(req.params.id,
        { opStatus : "Published" },
        function(err, results) {
            res.json(results);
        });
}*/
