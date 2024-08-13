import { createAsyncThunk } from '@reduxjs/toolkit';
import { Message, MessageMutation } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchMessages = createAsyncThunk<Message[]>(
  'messages/fetchAll',
  async () => {
    const { data: messages } = await axiosApi.get<Message[]>('/messages');

    return messages;
  },
);

export const createMessage = createAsyncThunk<void, MessageMutation>(
  'messages/create',
  async (messageMutation) => {
    await axiosApi.post('/messages', messageMutation);
  },
);
