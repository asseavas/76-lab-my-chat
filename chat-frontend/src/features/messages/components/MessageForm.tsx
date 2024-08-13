import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import { MessageMutation } from '../../../types';

interface Props {
  onSubmit: (message: MessageMutation) => void;
  isLoading: boolean;
}

const emptyState: MessageMutation = {
  author: '',
  message: '',
};

const MessageForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [state, setState] = useState<MessageMutation>(emptyState);
  const [error, setError] = useState<string | null>(null);

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (!state.author.trim() || !state.message.trim()) {
      setError('Author and message cannot be empty or just whitespace.');
      return;
    }
    setError(null);
    onSubmit({ ...state });
    setState(emptyState);
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Grid
      container
      spacing={2}
      component="form"
      justifyContent="space-between"
      alignItems="center"
      onSubmit={submitFormHandler}
    >
      <Grid item xs={4}>
        <TextField
          required
          label="Author"
          id="author"
          name="author"
          value={state.author}
          onChange={inputChangeHandler}
          error={!!error}
          helperText={error}
        />
      </Grid>
      <Grid item xs={7}>
        <TextField
          required
          multiline
          label="Message"
          id="message"
          name="message"
          value={state.message}
          onChange={inputChangeHandler}
          error={!!error}
          helperText={error}
        />
      </Grid>
      <Grid item xs={1}>
        <LoadingButton
          sx={{ width: '100%', height: '55px' }}
          type="submit"
          loading={isLoading}
          endIcon={<SendIcon />}
          variant="contained"
        ></LoadingButton>
      </Grid>
    </Grid>
  );
};

export default MessageForm;
