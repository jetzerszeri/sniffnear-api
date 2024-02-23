const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    // referencias a la sala de chat
    chatRoom: { type: Schema.Types.ObjectId, ref: 'ChatRoom' },
    //al usuario que envía el mensaje 
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
