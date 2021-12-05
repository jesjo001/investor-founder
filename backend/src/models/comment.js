import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    blogId: {
      type: String,
      required: true,
    },
    approved: {
      type: Boolean,
      required: false,
      default: false,
    },
    approvedAt: {
      type: Date,
      required: false,
    },
    likes: {
      type: Number,
      required: false,
      default: 0,
    },
  },{ timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
