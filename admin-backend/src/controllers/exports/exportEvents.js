import Events from '../../model/events';

export const exportEvents = async (req, res) => {
  try {
    //Find events with query parameters
    const events = await Events.find()
      .sort({ createdAt: -1 })
      .exec();

    //if event not found return 404
    if (!events.length)
      return res
        .status(404)
        .json({ status: 404, message: 'No Events Found' });
    else return res.status(200).json({ events });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ status: 500, message: 'Server Error, Try again later..' });
  }
};
