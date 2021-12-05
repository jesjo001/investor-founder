import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// token generation
export const newToken = payload => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

// token verification
export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).send({message: 'Unauthorized Access'});
  }
  const token = bearer.split('Bearer ')[1].trim();
  let payload, user;
  try {
    payload = await verifyToken(token);
    user = await User.findById(payload.id)
      .select('_id email role')
      .lean()
      .exec();
    if (user === null) {
      return res.status(401).send({message: 'Unauthorized Access'});
    }
  } catch (e) {
    return res.status(401).send({message: 'Unauthorized Access'});
  }
  req.user = { id: user._id, email: user.email, role: user.role, name: user.name ,address: user.officeAddress, country: user.startupCountry};
  next();
};

export const info = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email })
      .select('-password -_id -__v -createdAt -updatedAt')
      .lean()
      .exec();
    res.send(user);
  } catch (e) {
    res.status(500).end();
  }
};
