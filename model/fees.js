const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
    className: {type:String,required:true},
    feeType: {type:String,required:true},
    description: {type:String,required:true},
    amount: {type:Number,required:true},
});

const Fee = mongoose.model('Fee', feeSchema);

module.exports = Fee;