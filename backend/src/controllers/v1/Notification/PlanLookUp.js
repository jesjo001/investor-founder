import cronJob from 'node-cron';
import Founder from '../../../models/founder';
import { planNotification } from './utils/planSwitch';

export const planLookUp = async ({ loginUserId,role }) => {
  // loop through the founder data and check for founder that matches the loginuser Id
  if(role === 'Founder'){
     const LoginUser = await Founder.findOne({ _id: loginUserId }, ['plan']);
     
  //   send the plan type and loginUserId for plan verifications
  try {
    await planNotification({
      planType: LoginUser.plan,
      loginUserId: loginUserId._id,
    });
  } catch (error) {
    //   watch errors
    console.error('error', error);
  }
  }
 


};
