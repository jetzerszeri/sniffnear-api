const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    blogType: {
        type: String,
    },
    type: {
        type: String,
    },
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    category: {
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

const Blog = mongoose.model( 'Blog',blogSchema );
module.exports = Blog;
