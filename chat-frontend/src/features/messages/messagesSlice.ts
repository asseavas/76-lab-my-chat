import { Message } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createMessage, fetchMessages } from './messagesThunks';

export interface MessagesState {
  items: Message[];
  itemsFetching: boolean;
  isCreating: boolean;
}

const initialState: MessagesState = {
  items: [],
  itemsFetching: false,
  isCreating: false,
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.itemsFetching = true;
      })
      .addCase(fetchMessages.fulfilled, (state, { payload: messages }) => {
        state.items = messages;
        state.itemsFetching = false;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.itemsFetching = false;
      });

    builder
      .addCase(createMessage.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createMessage.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createMessage.rejected, (state) => {
        state.isCreating = false;
      });
  },
  selectors: {
    selectMessages: (state) => state.items,
    selectMessagesFetching: (state) => state.itemsFetching,
    selectMessageCreating: (state) => state.isCreating,
  },
});

export const messagesReducer = messagesSlice.reducer;

export const { selectMessages, selectMessagesFetching, selectMessageCreating } =
  messagesSlice.selectors;
