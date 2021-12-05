import { annually } from '../../founder/utils/chargeLogics';
import {
  monthlyPlan,
  nullOptions,
  quarterlyPlan,
} from './createConversationLogics';

// verifying the user plan
export const createConversationSwitch = ({ plan, conv, res }) => {
  switch (plan) {
    case null:
      return nullOptions({ conv, res });

    case 'Monthly':
      return monthlyPlan({ res, conv });

    case 'Quarterly':
      return quarterlyPlan({ res, conv });

    case 'Annually':
      return annually({ res, conv });

    default:
      break;
  }
};
