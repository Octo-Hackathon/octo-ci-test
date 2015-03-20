var mongoose = require('mongoose');

module.exports = mongoose.model('Opportunity',{
                                opTitle : String,
                                opType : String,
                                opDesc : String, 
                                setAside : String,
                                opStatus : String,
                                buyerName : String,
                                publishedDt : Date,
                                respDueDt : Date,
                                createdBy : String,
                                createdDt : {type: Date, default: Date.now},
                                modifiedBy : String,
                                modifiedDt : Date,
                                perfPlace : String,
                                primaryContact : String
                });
