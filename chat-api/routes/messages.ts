import express from 'express';
import { MessageMutation } from '../types';
import fileDb from '../fileDb';

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
  const queryDate = req.query.datetime as string | undefined;
  let date: Date | null = null;

  if (queryDate) {
    date = new Date(queryDate);

    if (isNaN(date.getDate())) {
      return res.status(400).send({ error: 'The date is incorrect!' });
    }
  }

  let messages = await fileDb.getItems();

  if (queryDate) {
    messages = messages.filter(message => {
      return message.datetime > queryDate;
    })
  }

  return res.send(messages.slice(-30));
});

messagesRouter.post('/', async (req, res) => {
  if (!req.body.author || !req.body.message) {
    return res
      .status(400)
      .send({ error: 'Author and message must be present in the request' });
  }

  const message: MessageMutation = {
    author: req.body.author,
    message: req.body.message,
  };

  const savedMessage = await fileDb.addItem(message);

  res.send(savedMessage);
});

export default messagesRouter;
