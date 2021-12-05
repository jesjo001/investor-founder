import Investors from '../../model/investors';

export const exportInvestors = async (req, res) => {
  try {
    const investors = await Investors.find().sort({ createdAt: -1 }).exec();

    if (!investors.length) return res.status(404).send('Investors not found');
    else return res.status(200).json({ investors });
  } catch (e) {
    console.log(e);
    return res.status(500).send('Something went wrong');
  }
};
