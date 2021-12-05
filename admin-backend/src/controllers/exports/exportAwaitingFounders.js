import FounderTemp from '../../model/pendingFounder';

export const exportAwaitingFounders = async (req, res) => {
  try {
    // get query params from request or set default

    //fetch pending founders from db
    const pendingFounders = await FounderTemp.find({ isApproved: false })
      .sort({ createdAt: -1 })
      .exec();

    //if no pending founders return error message else return pending founders
    if (!pendingFounders.length)
      return res
        .status(404)
        .json({
          status: 404,
          message: 'Oops seems there are no Unapproved Founder',
        });
    else return res.status(200).json({ pendingFounders });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ statusCode: 500, message: 'Something went wrong' });
  }
};
