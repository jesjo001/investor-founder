import express from 'express';
import passport from 'passport';
import { newToken } from './auth';
const googleAuthRouter = express.Router();

// @desc Auth with google
// @route GET /auth/google
googleAuthRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// @desc Google Auth Callback
// @route GET /auth/google/callback
googleAuthRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const token = newToken({
      id: req.user._id,
      email: req.user.email,
      role: req.user.role,
    });
    return res.status(201).send({ token });
  }
);

export default googleAuthRouter;
