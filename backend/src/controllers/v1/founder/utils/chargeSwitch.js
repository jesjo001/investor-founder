import { annually, monthly, quarterly } from './chargeLogics';

export const chargeSwitch = ({ amount, id }) => {
  // verify the shipping amount and update the plan in the founder database
  switch (amount) {
    case 12:
      return monthly(id);

    case 27:
      return quarterly(id);

    case 58:
      return annually(id);

    default:
      break;
  }
};
