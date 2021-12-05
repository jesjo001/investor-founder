// check if a user has a plan
export const noPlanYet = ({ res }) =>
  // if no plan choosen yet
  res.status(422).send({ message: 'choose a plan' });

// check if a user has a plan and the user has exceed the limit
export const noPlanAndHasReachConvLimit = ({ conv, res }) =>
  conv.length > 3 &&
  res.status(422).send({ message: 'You can only message 3 people' });

// check if monthly plan users has reach their conversion limit
export const monthlyPlan = ({ conv, res }) =>
  conv.length > 600 &&
  res.status(422).send({ message: 'You can only message 600 people' });

// check if Quarterly plan users has reach their conversion limit
export const quarterlyPlan = ({ conv, res }) =>
  conv.length > 2400 &&
  res.status(422).send({ message: 'You can only message 600 people' });

// check if annully plan users has reach their conversion limit
export const annallyPlan = ({ conv, res }) =>
  conv.length > 7200 &&
  res.status(422).send({ message: 'You can only message 600 people' });

// check if users with out plan have started a conversation or has reached the limits of conversation
export const nullOptions = ({ conv, res }) =>
  !conv.length ? noPlanYet({ res }) : noPlanAndHasReachConvLimit({ conv, res });
