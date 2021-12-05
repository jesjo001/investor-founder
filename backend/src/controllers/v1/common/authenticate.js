import User from '../../../models/user';
import Subscription from '../../../models/subscription';
import { newToken } from '../../../middlewares/authentication/auth.newToken';

export const authenticate = async (req, res) => {
  // check for user
  try {
    let subscriptionStatus = false;
    const user = await User.findById(req.user.id);    
   
    // check whether the user has a subscription record  and return the payment status   
    let userSubscription = await Subscription.findOne({
      userId:user._id
    });
    if(userSubscription){
      subscriptionStatus = await userSubscription.getSubscriptionStatus()      
    }
   
    // generate token for user
    const token = newToken({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    //get user login details (ip)
    const getip = req.headers['x-real-ip'] || req.connection.remoteAddress;

   
    return res.status(200).send({
      token: token,
      id: user._id,
      email: user.email,
      role: user.role,
      ip: getip,
      subscriptionStatus     
    });
  } catch (e) {  
    return res.status(500).end(e);
  }
};
