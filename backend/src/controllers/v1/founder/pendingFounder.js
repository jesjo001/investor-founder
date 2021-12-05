import Founder from '../../../models/pendingFounder';
import User from '../../../models/user';

export const ExternalFounderSignup = async (req, res) => {

  try {

    //Check if user already registered
    const { email } = req.body

    const registered = await User.exists({ email })

    console.log(req.body)

    if(registered) {
      return res.status(401).json({
         status: 401,
         message: 'Email already registered as a User'
      })
    }

    const user = await Founder.create(req.body);
    return res.status(200).json({
      status: "success",
      data: {
        user
      }
    });
  } catch (err) {
    return res.status(500).json({
      status: "500 Internal server error",
      error:
        "Error creating temporary founder record",
    });
  }

};
