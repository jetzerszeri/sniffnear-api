const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Message = require ('../models/messageModel.js')
const chatRoomSchema = new Schema({
    // usuarios que participan en la sala de chat
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});
chatRoomSchema.pre('deleteOne', { document: true }, async function(next) {
    try {
        await Message.deleteMany({ chatRoom: this._id });
        next();
    } catch (error) {
        next(error);
    }
});

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);
module.exports = ChatRoom;
