import {
  annuallyPlanNotification,
  haveNoPlanYet,
  monthlyPlanNotification,
  quarterlyPlanNotification,
} from './planNotificationLogic';

// function that handles the different state of the login user plan
export const planNotification = async ({ planType, loginUserId }) => {
  switch (planType) {
    // check if the founder plan is null and notify  the founder to subscribe
    case null:
      return haveNoPlanYet({ planType, loginUserId });

    // check if the founder monthly plan has expired
    case 'Monthly':
      return monthlyPlanNotification({ planType, loginUserId });

    //  check if the founder quarterly plan has expired
    case 'Quarterly':
      return quarterlyPlanNotification({ planType, loginUserId });

    //  check if the founder annually plan has expired
    case 'Annually':
      return annuallyPlanNotification({ planType, loginUserId });

    default:
      break;
  }
};
