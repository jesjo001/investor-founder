import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const conversationSchema = new mongoose.Schema(
  {
    participants: [{ type: ObjectId, ref: 'User' }],
    createdBy: { type: ObjectId, ref: 'User' },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.model('Conversation', conversationSchema);
export default Conversation;
