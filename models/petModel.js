const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    breed: String,
    type: {
        type: String,
        required: true,
    },
    age: Number,
    description: String,
    img: String,
    sex: String,
    owner:{
        type : Schema.Types.ObjectId , 
        ref:'User'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt:{
        type: Date,
        default: Date.now()
    }
});

const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;