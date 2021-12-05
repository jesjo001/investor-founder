import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const { ObjectId } = mongoose.Schema.Types;

const profileImage = {
    avatar: { type: String, trim: true},
    avatarAwsDetails: { type: Object, trim: true },
}

const date = {
    from: { type: String, trim: true, required: true },
    to: { type: String, trim: true, required: true },
};

const adminUsersSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    role: {
      type: ObjectId,
      ref: 'Role'
    },
    profileImage:profileImage,
    isActive: {
      type: Boolean,
    },
    resetToken: {
      type: String,
    },
    expireToken: {
      type: Date,
    },
  },
  {
    timestamps: true
  }
);


adminUsersSchema.index({ fullName: 'text', email: 'text' });

adminUsersSchema.statics = {
  searchPartial: async function (q, limit, skipIndex) {
    return await this.find({
      $or: [{ fullName: new RegExp(q, 'gi') }, { email: new RegExp(q, 'gi') }],
    })
      .limit(limit)
      .skip(skipIndex)
      .exec();
  },

  searchPartialCount: async function (q, limit, skipIndex) {
    return await this.find({
      $or: [{ fullName: new RegExp(q, 'gi') }, { email: new RegExp(q, 'gi') }],
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
        return await this.searchPartial(q);
      }
      return result;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};

adminUsersSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});

adminUsersSchema.methods.checkPassword = function (password) {
  const passwordHash = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }
      resolve(same);
    });
  });
};

const AdminUsers = mongoose.model('AdminUsers', adminUsersSchema);
export default AdminUsers;
