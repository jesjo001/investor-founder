import User from '../../../models/user';
import Subscription from '../../../models/subscription';
import newLogin from '../../../models/login';
import { newToken } from '../../../middlewares/authentication/auth.newToken';
import { LOGIN } from '../Notification/notification';
import { planLookUp } from '../Notification/PlanLookUp';
export const signin = async (req, res) => {

  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'Please supply email and password' });
  }
  // check for user
  try {
    let subscriptionStatus = false;
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
      return res
        .status(401)
        .send({ message: 'Invalid email and passoword combination' });
    }
    // check for password
    const match = await user.checkPassword(req.body.password);
    if (!match) {
      return res
        .status(401)
        .send({ message: 'Invalid email and passoword combination' });
    }

    // check whether the user has a subscription record  and return the payment status   
    let userSubscription = await Subscription.findOne({
      userId:user._id,
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
    var getip = req.headers['x-real-ip'] || req.connection.remoteAddress;

    //check if the user has registered their login data
    const SearchUser = await newLogin
      .findOne({ 'user.userid': user._id })
      .exec();
    if (!SearchUser) {
      // if it's first time login jus register user info into login table.
      const registerLogin = await new newLogin({
        user: {
          userid: user._id,
          userip: getip,
        },
      });
      const renderNewLogins = await registerLogin.save();
      LOGIN('LOGIN', getip, user._id);
    } else {
      //if yes check if the current login ip is same as the previous one
      if (SearchUser.user.userip !== getip) {
        // send mail to them that someone with the following ip jus logged into their account.
        LOGIN('LOGIN_ATTEMPT', getip, user._id);
        const updateLogintime = await newLogin.updateOne(
          { 'user.userid': SearchUser.user.userid },
          { $set: { updatedAt: Date.now() } }
        );
      } else {
        const updateLogintime = await newLogin.updateOne(
          { 'user.userid': SearchUser.user.userid },
          { $set: { updatedAt: Date.now() } }
        );
        LOGIN('LOGIN', getip, user._id);
      }
    }

    // check if the logged in user has a plan/ plan expired/plan enroll
    planLookUp({ loginUserId: user._id, role: user.role });

    return res.status(200).send({
      token: token,
      id: user._id,
      email: user.email,
      role: user.role,
      ip: getip,
      subscriptionStatus
    });
  } catch (e) {
    console.log(e)
    return res.status(500).end(e);
  }
};
