import Founders from '../../model/founders';

export const exportFounders = async (req, res) => {
  try {
    //get founders from db based on parameters provided in query
    const founders = await Founders.find().sort({ createdAt: -1 }).exec();

    //Return founders if they exist else return message
    if (!founders.length)
      return res
        .status(404)
        .json({ status: 404, message: 'Founders not found' });
    else
      return res.status(200).json({
        founders,
      });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ status: 500, message: 'Something went wrong' });
  }
};
