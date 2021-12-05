export const preConversationSwitch = ({
  Difference_In_Days,
  res,
  planType,
}) => {
  // founder has a plan - verify its validity
  switch (true) {
    case Difference_In_Days > 30:
      return (
        planType === 'Monthly' &&
        res.status(400).send({ message: 'Your plan is expired' })
      );

    case Difference_In_Days > 183:
      return (
        planType === 'Quarterly' &&
        res.status(400).send({ message: 'Your plan is expired' })
      );

    case Difference_In_Days > 365:
      return (
        planType === 'Annually' &&
        res.status(400).send({ message: 'Your plan is expired' })
      );

    default:
      break;
  }
};
