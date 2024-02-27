const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adoptionSchema = new Schema({

    adoptionType: {
        type: String,
    },
    type: {
        type: String,
    },
    name: {
        type: String,
    },
    sex: {
        type: String,
    },
    size: {
        type: String,
    },
    color1: {
        type: String,
    },
    birthdate: {
        type: String,
    },
    breed: {
        type: String,
    },
    owner: {
        type: String,
    },
    img: {
        type: String,
    },
    city: {
        type: String,
    },
    content: {
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
    }
    // status:{
    //     type: String,
    //     default: 'active'
    // }

})

const Adoption = mongoose.model( 'Adoption',adoptionSchema );
module.exports = Adoption;
