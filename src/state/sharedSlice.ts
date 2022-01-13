import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/state/store';
import { websocketSpecs } from 'src/config';

// Setup
type SharedState = {
  feed: string;
  grouping: number;
  websocketState: WebSocketState;
  errors: string;
  orderbookData: {
    bids: number[][];
    asks: number[][];
  };
};
type WebSocketState = 'CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED';

const defaultFeed = websocketSpecs.feedSpecs.PI_XBTUSD;

const initialState: SharedState = {
  feed: defaultFeed.product_id,
  grouping: defaultFeed.groups[0],
  websocketState: 'CONNECTING',
  errors: '',
  orderbookData: { bids: [], asks: [] },
};

// Slice
export const sharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {
    setFeed: (state, action: PayloadAction<string>) => {
      state.feed = action.payload;
      let newFeed = action.payload as keyof typeof websocketSpecs.feedSpecs;
      let newGrouping = websocketSpecs.feedSpecs[newFeed].groups[0];
      state.grouping = newGrouping;
    },
    setGrouping: (state, action: PayloadAction<number>) => {
      state.grouping = action.payload;
    },
    setWebsocketState: (state, action: PayloadAction<WebSocketState>) => {
      state.websocketState = action.payload;
    },
    setErrors: (state, action: PayloadAction<string>) => {
      state.errors = action.payload;
    },
    setOrderbookData: (
      state,
      action: PayloadAction<{
        bids: number[][];
        asks: number[][];
      }>
    ) => {
      state.orderbookData = action.payload;
    },
  },
});

// Actions
export const {
  setFeed,
  setGrouping,
  setWebsocketState,
  setErrors,
  setOrderbookData,
} = sharedSlice.actions;

// Selectors
export const getFeed = (state: RootState) => state.shared.feed;
export const getGrouping = (state: RootState) => state.shared.grouping;
export const getWebsocketState = (state: RootState) =>
  state.shared.websocketState;
export const getErrors = (state: RootState) => state.shared.errors;
export const getOrderbookData = (state: RootState) =>
  state.shared.orderbookData;

export default sharedSlice.reducer;
