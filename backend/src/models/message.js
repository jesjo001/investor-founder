import mongoose from 'mongoose';
import eventEmitter from '../utils/emitter';
const { ObjectId } = mongoose.Schema.Types;

const messageSchema = new mongoose.Schema(
  {
    conversationId: { type: ObjectId, ref: 'Conversation' },
    sender: { type: ObjectId, ref: 'User' },
    text: String,
    isRead: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

messageSchema.post('save', function (doc) {
  eventEmitter.emit('newMessage', doc);
});

const Message = mongoose.model('Message', messageSchema);
export default Message;
