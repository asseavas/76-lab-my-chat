import express from 'express';
import {MessageMutation} from '../types';
import fileDb from '../fileDb';

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
  const queryDate = req.query.datetime as string;
  const date = new Date(queryDate);

  if (isNaN(date.getDate())) {
    return res.status(400).send({'error': 'The date is incorrect!'});
  }

  const messages = await fileDb.getItems();

  const filteredMessages = messages.filter(message => {
    const messageDate = new Date(message.datetime as string);
    return messageDate > date;
  });

  res.send(filteredMessages.slice(-30).reverse());
});

messagesRouter.post('/', async (req, res) => {
  if (!req.body.author || !req.body.message) {
    return res.status(400).send({'error': 'Author and message must be present in the request'});
  }

  const message: MessageMutation = {
    author: req.body.author,
    message: req.body.message,
  };

  const savedMessage = await fileDb.addItem(message);

  res.send(savedMessage);
});


export default messagesRouter;