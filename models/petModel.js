const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    breed: String,
    breedType: String,
    type: {
        type: String,
        required: true,
    },
    age: Number,
    birthdate: Date,
    color1: String,
    color2: String,
    description: String,
    img: String,
    sex: String,
    size: String,
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