import { newToken } from '../../../middlewares/authentication/auth.newToken';
import Investor from '../../../models/investor';
import User from '../../../models/user';

// UPDATED - register new investor
export const InvestorSignUp = async (req, res) => {

    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        status: "401 Unauthorized",
        error:
          "Email and password is required",
      });
    }

    try {
      const user = await User.findOne({ email: req.body.email })
      if (user) {
        return res.status(401).json({
          status: "401 Unauthorized",
          error:
            "User already exist",
        });
      }
    } catch (e) {
      return res.status(500).json({
        status: "500 Internal server error",
        error:
          "Error checking whether email exist",
      });
    }
    // create new user
    try {
      const user = await Investor.create({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        personal: req.body.personal,
        type: req.body.investor_type,
        expertise: req.body.expertise,
        investedIn: req.body.invested_startup,
        ticketSize: req.body.ticketSize,
        stage: req.body.stage,
        industryType: req.body.industryType,
        industryLocation: req.body.industryLocation,
        profileImage: req.file.location,
        imageAwsDetails: req.file,
      });

      const token = newToken({
        id: user._id,
        email: user.email,
        role: 'Investor',
      });
      return res.status(201).json({ token, user });
    } catch (e) {
      return res.status(500).json({
        status: "500 Internal server error",
        error:
          "Error creating investor account",
      });
    }
};
