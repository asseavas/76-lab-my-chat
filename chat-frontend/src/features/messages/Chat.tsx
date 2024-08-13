import { useEffect } from 'react';
import { CircularProgress, Grid } from '@mui/material';
import MessageForm from './components/MessageForm';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectInitialFetchDone,
  selectLastMessageDate,
  selectMessageCreating,
  selectMessages,
  selectMessagesFetching,
} from './messagesSlice';
import { MessageMutation } from '../../types';
import { createMessage, fetchMessages } from './messagesThunks';
import Messages from './components/Messages';

const Chat = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectMessages);
  const isCreating = useAppSelector(selectMessageCreating);
  const lastMessageDate = useAppSelector(selectLastMessageDate);
  const isFetching = useAppSelector(selectMessagesFetching);
  const initialFetchDone = useAppSelector(selectInitialFetchDone);

  const onFormSubmit = async (MessageMutation: MessageMutation) => {
    await dispatch(createMessage(MessageMutation));
  };

  useEffect(() => {
    dispatch(fetchMessages(null));
  }, [dispatch]);

  useEffect(() => {
    if (lastMessageDate) {
      const intervalId = setInterval(() => {
        dispatch(fetchMessages(lastMessageDate));
      }, 3000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [dispatch, lastMessageDate]);

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
        {!initialFetchDone && isFetching && (
          <Grid container item sx={{ justifyContent: 'center' }}>
            <CircularProgress />
          </Grid>
        )}
        <Messages messages={messages} />
      </Grid>
    </Grid>
  );
};

export default Chat;
