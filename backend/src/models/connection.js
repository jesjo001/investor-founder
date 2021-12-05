import mongoose, { mongo } from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const sender = {
  userId:  { type: ObjectId, ref: 'User' }
};
const receiver = {
    userId: { type: ObjectId, ref: 'User' },
}

const connect = new mongoose.Schema(
  {
    sender: sender,
    receiver: receiver,
  },
  { timestamps: true }
);

const Connection = mongoose.model('connection', connect);
export default Connection;
