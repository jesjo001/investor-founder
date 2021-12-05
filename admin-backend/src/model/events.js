import mongoose, { mongo } from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const guests = {
  userId: { type: String, trim: true },
  guestName: { type: String, trim: true },
  role:{type: String, trim:true}
};

const resource = {
  image: { type: String, trim: true, required: true },
  avatarAwsDetails: { type: Object, trim: true },
};

const address = {
  country: { type: String, trim: true, required: true },
  state: { type: String, trim: true, required: true },
  venue: { type: String, trim: true, required: true },
};

const hosts = {
  hostName: { type: String, trim: true },
  specialization: { type: String, trim: true },
  workPlace: { type: String, trim: true },
};

const date = {
  from: { type: String, trim: true, required: true },
  to: { type: String, trim: true, required: true },
};

const events = new mongoose.Schema(
  {
    resource: resource,
    name: { type: String, trim: true, required: true },
    address: address,
    availability: { type: String, trim: true, required: true },
    registrationLink: { type: String, trim: true },
    videoLink: { type: String, trim: true },
    category: { type: String, trim: true, required: true },
    date: date,
    createdBy: { type: ObjectId, trim: true, required: true },
    guests: [guests],
    desc: { type: String, trim: true, required: true },
  },
  { timestamps: true }
);


events.index({ name: 'text', desc: 'text' });

events.statics = {
  searchPartial: async function (q, limit, skipIndex) {
    return await this.find({
      $or: [{ name: new RegExp(q, 'gi') }, { desc: new RegExp(q, 'gi') }],
    })
      .limit(limit)
      .skip(skipIndex)
      .exec();
  },

  searchPartialCount: async function (q, limit, skipIndex) {
    return await this.find({
      $or: [{ name: new RegExp(q, 'gi') }, { desc: new RegExp(q, 'gi') }],
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


const Events = mongoose.model('Events', events);
export default Events;
