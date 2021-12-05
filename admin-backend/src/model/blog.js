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
    profileImage:profileImage,
    lastViewedAt: {
      type: Date,
      required: false,
    },
    createdBy: {
      type: String,
      required: true,
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
  },
  { timestamps: true }
);

blogSchema.index({ title: 'text', content: 'text' });

blogSchema.statics = {
  searchPartial: async function (q, limit, skipIndex) {
    return await this.find({
      approved: true,
      $or: [{ title: new RegExp(q, 'gi') }, { content: new RegExp(q, 'gi') }],
    })
      .limit(limit)
      .skip(skipIndex)
      .exec();
  },

  searchPartialUnapproved: async function (q, limit, skipIndex) {
    return await this.find({
      approved: false,
      $or: [{ title: new RegExp(q, 'gi') }, { content: new RegExp(q, 'gi') }],
    })
      .limit(limit)
      .skip(skipIndex)
      .exec();
  },

  searchPartialUnapprovedCount: async function (q, limit, skipIndex) {
    return await this.find({
      approved: false,
      $or: [{ title: new RegExp(q, 'gi') }, { content: new RegExp(q, 'gi') }],
    }).countDocuments();
  },


  searchPartialCount: async function (q, limit, skipIndex) {
    return await this.find({
      approved: true,
      $or: [{ title: new RegExp(q, 'gi') }, { content: new RegExp(q, 'gi') }],
    }).countDocuments();
  },

  searchFull: async function (q) {
    return await this.find({
      $text: { $search: q, $caseSensitive: false },
    });
  },

  search: async function (q) {
    try {
      const result = await this.searchFull(q);
      console.log(result);
      if (!result.length) {
        return this.searchPartial(q);
      }
      return result;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
