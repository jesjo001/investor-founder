
import mongoose from 'mongoose';
import { NotificationType } from '../utils/NotificationType';

const { ObjectId } = mongoose.Schema.Types;

const sender = {
  fullName: { type: String, trim: true },
  id: { type: String },
  role: { type: String },
};

const NotificationSchema = new mongoose.Schema(
  {
    sender: sender,
    receiverId: {
      type: String,
      required: true,
    },
    eventId: { type: ObjectId, trim: true,},
    blogLink: { type: String, trim: true },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        NotificationType.MESSAGE_NOTIFICATION,
        NotificationType.BLOG_NOTIFICATION,
        NotificationType.EVENT_NOTIFICATION,
        NotificationType.INVITATION_NOTIFICATION,
        NotificationType.PRICE_PLAN_NOTIFICATION,
        NotificationType.PROFILE_NOTIFICATION,
        NotificationType.LOGIN,
        NotificationType.LOGIN_ATTEMPT,
        NotificationType.MESSAGE_REQUEST,
        NotificationType.PASSWORD_RESET,
        NotificationType.JOIN_EVENT,
        NotificationType.CONNECT_USERS
      ],
    },

    mailed: { type: Boolean, required: true },
    view:{
      type:Number
    }
  },
  { timestamps: true }
);

export const Notification = mongoose.model('Notification', NotificationSchema);

