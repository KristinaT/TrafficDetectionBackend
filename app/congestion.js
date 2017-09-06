/**
 * Created by kristinataneva on 8/29/17.
 */
var mongoose = require('mongoose');

var congestionSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    latitude:{
        type: String,
        required: true
    },
    longtitude:{
        type: String,
        required: true
    }
});

//var Congestion = module.exports = mongoose.model('Congestions', congestionSchema);
//
////Get list
//module.exports.getCongestionList = function (cong,callback, limit) {
//   // var congestions = {};
//
//    Congestion.find();
//};