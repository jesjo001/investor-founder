import { Notification } from '../../../models/notification';

export const getUserNotifications = async (req, res, next) => {
  const Notifications = await Notification.find({
    receiverId: req.user.id,
  }).sort({createdAt:-1}).limit(50);
  if (Notifications) {
    res.send(Notifications);
  } 
  next();
};

export const NotificationCount = async(req,res,next)=>{ 
  const getCount = await Notification.find({receiverId:req.user.id,view:0}).countDocuments();
  return res.json({count:getCount})
}

export const UpdateNotification = async(req,res,next)=>{
  try {
    const UpdateNotification = await Notification.updateOne({ _id: req.params.id },{$set:{view:1}})
    return res.send(UpdateNotification)
  } catch (error) {
    console.log(error.message)
  }
}

export const ClearAllNotification = async(req,res,next)=>{
  const clearAllNotification = await Notification.deleteMany({receiverId:req.user.id})
  return res.status(200).send(clearAllNotification)
}