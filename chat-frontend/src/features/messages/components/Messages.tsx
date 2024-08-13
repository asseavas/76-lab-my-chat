import React from 'react';
import { Message } from '../../../types';
import MessageItem from './MessageItem';
import { Stack } from '@mui/material';

interface Props {
  messages: Message[];
}

const Messages: React.FC<Props> = ({ messages }) => {
  return (
    <Stack spacing={3} sx={{ width: '100%', mt: 3 }}>
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </Stack>
  );
};

export default Messages;
