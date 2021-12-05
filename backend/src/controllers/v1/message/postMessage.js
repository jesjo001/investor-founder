import Message from '../../../models/message';

export const postMessage = async (req, res) => {
  if (req.body.text === undefined) {
    res.status(422).send({ message: 'Text expected' });
  }
  try {
    let message = await Message.create({
      text: req.body.text,
      sender: req.user.id,
      conversationId: req.params.conversationId,
    });
    return res.status(200).send({ message });
  } catch (e) {
    return res.status(500).send({ message: 'Unable to save the message' });
  }
};
