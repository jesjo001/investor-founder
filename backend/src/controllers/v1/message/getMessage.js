import Message from '../../../models/message';

export const getMessage = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 0;
  const count = parseInt(req.query.limit, 10) || 300;

  try {
    const message = await Message.find({
      conversationId: req.params.conversationId,
    })
      .populate('sender')
      .sort({ createdAt: 1 })
      .skip(page * count)
      .limit(count)
      .lean()
      .exec();
    return res.status(200).send(message);
  } catch (e) {
    console.log(e.message);
    return res.status(500).end();
  }
};
