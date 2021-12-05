import mongoose from 'mongoose';

const profileImage = {
    avatar: { type: String, trim: true},
    avatarAwsDetails: { type: Object, trim: true },
}


const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: false,
    },
    lastViewedAt: {
      type: Date,
      required: false,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    createdBy: {
      type: String,
      required: true
    },
    likes: {
        type: Number,
        required: false,
        default: 0,
    },
    approved: {
      type: Boolean,
      required: false,
      default: false,
    },
    dateApproved: {
      type: Date,
      required: false,
    },
  },{ timestamps: true }
);

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
