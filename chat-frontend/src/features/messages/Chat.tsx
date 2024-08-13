import { useEffect } from 'react';
import { Grid } from '@mui/material';
import MessageForm from './components/MessageForm';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectMessageCreating, selectMessages } from './messagesSlice';
import { MessageMutation } from '../../types';
import { createMessage, fetchMessages } from './messagesThunks';
import Messages from './components/Messages';

const Chat = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectMessages);
  const isCreating = useAppSelector(selectMessageCreating);

  const onFormSubmit = async (MessageMutation: MessageMutation) => {
    await dispatch(createMessage(MessageMutation));
  };

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid
        item
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 2 }}
      >
        <MessageForm onSubmit={onFormSubmit} isLoading={isCreating} />
      </Grid>
      <Grid item container>
        <Messages messages={messages} />
      </Grid>
    </Grid>
  );
};

export default Chat;
