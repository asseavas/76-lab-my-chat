import { createAsyncThunk } from '@reduxjs/toolkit';
import { Message, MessageMutation } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchMessages = createAsyncThunk<Message[], string | null>(
  'messages/fetchAll',
  async (lastMessageDate) => {
    let url = '/messages';

    if (lastMessageDate) {
      url += `?datetime=${lastMessageDate}`;
    }

    const { data: messages } = await axiosApi.get<Message[]>(url);

    return messages;
  },
);

export const createMessage = createAsyncThunk<void, MessageMutation>(
  'messages/create',
  async (messageMutation) => {
    await axiosApi.post('/messages', messageMutation);
  },
);
