import { Message } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createMessage, fetchMessages } from './messagesThunks';

export interface MessagesState {
  items: Message[];
  itemsFetching: boolean;
  isCreating: boolean;
  lastMessageDate: null | string;
  initialFetchDone: boolean;
}

const initialState: MessagesState = {
  items: [],
  itemsFetching: false,
  isCreating: false,
  lastMessageDate: null,
  initialFetchDone: false,
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
        state.items = [...state.items, ...messages];
        state.itemsFetching = false;
        if (!state.initialFetchDone) {
          state.initialFetchDone = true;
        }
        if (messages.length > 0) {
          state.lastMessageDate = messages[messages.length - 1].datetime;
        }
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
    selectLastMessageDate: (state) => state.lastMessageDate,
    selectInitialFetchDone: (state) => state.initialFetchDone,
  },
});

export const messagesReducer = messagesSlice.reducer;

export const {
  selectMessages,
  selectMessagesFetching,
  selectMessageCreating,
  selectLastMessageDate,
  selectInitialFetchDone,
} = messagesSlice.selectors;
