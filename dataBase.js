const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://jetzerszeri:3sTgfAkOkd1kdtyG@cluster0.ptej3xd.mongodb.net/?retryWrites=true&w=majority',{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})

module.exports = mongoose.connection;