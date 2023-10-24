const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alertSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now
    },
   creator: {
        type: Schema.Types.ObjectId,
        ref: 'User' 
    },
    pet:{
        type: Schema.Types.ObjectId,
        ref: 'Pet'
    },
    status:{
        type: String,
    }

})

const Alert = mongoose.model( 'Alert',alertSchema );
module.exports = Alert;
