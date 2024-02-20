const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alertSchema = new Schema({
    alertType: {
        type: String,
    },
    type: {
        type: String,
    },
    petName: {
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
    color2: {
        type: String,
    },
    breed: {
        type: String,
    },
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number,
    },
    date:{
        type: Date,
    },
    time:{
        type: String,
    },
    img: {
        type: String,
    },
    personName: {
        type: String,
    },
    email: {
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
        default: 'active'
    },
    state:{
        type:String,   
    },
    city:{
        type:String,
    },
    country:{
        type:String,
    },
})

const Alert = mongoose.model( 'Alert',alertSchema );
module.exports = Alert;
