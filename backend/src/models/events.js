import mongoose, { mongo } from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const guests = {
  userId: { type: String, trim: true },
  guestName: { type: String, trim: true },
  role:{type: String, trim:true}
};

const resource = {
  image: { type: String, trim: true, required: true },
  // publicId: { type: String, trim: true, required: true },
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
    category: { type: String, trim: true, required: true },
    date: date,
    createdBy: { type: ObjectId, trim: true, required: true },
    guests: [guests],
    desc: { type: String, trim: true, required: true },
  },
  { timestamps: true }
);

const Events = mongoose.model('Events', events);
export default Events;
