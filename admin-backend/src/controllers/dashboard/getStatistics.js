import moment from 'moment';
import Investors from '../../model/investors';
import Events from '../../model/events';
import Founders from '../../model/founders';

export const getStatistics = async (req, res) => {
  try {
    let startDate = moment(new Date());
    startDate = startDate.subtract(7, 'days');
    startDate = startDate.format('YYYY-MM-DD');
    const investors = await Investors.find({
      createdAt: { $gte: startDate, $lte: new Date() },
    });
    const founders = await Founders.find({
      createdAt: { $gte: startDate, $lte: new Date() },
    });
    const events = await Events.find({
      createdAt: { $gte: startDate, $lte: new Date() },
    });

    // if (!investors.length) return res.status(404).send('Investors not found');
    // else
    return res.status(200).send({
      investors: investors.length,
      founders: founders.length,
      events: events.length,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send('Something went wrong');
  }
};
