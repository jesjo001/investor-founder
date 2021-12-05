import User from '../../model/adminUsers';
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
    user = await User.findById(payload.data.id);
    if (!user) {
      return res.status(401).send({ message: 'Unauthorized Access-User does not exist' });
    }
  } catch (e) {
    console.log(e)
    return res.status(401).send({ message: 'Unauthorized Access-Something went wrong' });
  }
  req.user = {
    id: user._id,
    email: user.email,
    role: user.role,
    fullName: user.fullName
  };
  next();
};
