var app =  require('../server').app;
var should = require('should');
var supertest = require('supertest');

describe('buyers',function(){
 	
	//it('should get list of all buyers', function(done) {
	//	supertest(app)
	//	.get('/api/opportunity/5502334980cf05852e210844')
	//	.expect(200)
	//	.end(function(err, res) {
	//		res.status.should.equal(200);
	//		if (err) {
	//			throw err;
	//		}
			//res.body.should.have.property('_id');
			//res.body.opTitle.should.equal('T26');
			//res.body.setAside.should.equal('8A');
	//		done();
	//	});		
	//});

	it('should  pass', function(done) {
		//throw "don't pass";
		done();
	});
});