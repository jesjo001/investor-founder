import User from '../../models/user';
import { verifyToken } from './auth.verifyToken';

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Unauthorized Access' });
  }
  const token = bearer.split('Bearer ')[1].trim();
  let payload, user;
  try {
    payload = verifyToken(token);

    user = await User.findById(payload.id)
      .select('_id email role name')
      .lean()
      .exec();

    if (user === null) {
      return res.status(401).send({ message: 'Unauthorized Access' });
    }
  } catch (e) {
    return res.status(401).send({ message: 'Unauthorized Access' });
  }
  req.user = {
    id: user._id,
    email: user.email,
    role: user.role,
    name: user.name,
    address: user.officeAddress,
    country: user.startupCountry,
  };
  next();
};
