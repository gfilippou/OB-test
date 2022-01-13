import { websocketSpecs } from 'src/config';
import websocketDataHandler from 'src/websockets/websocketDataHandler';

export const snapshot: Snapshot = {
  bids: new Map(),
  asks: new Map(),
  product_id: websocketSpecs.feedSpecs.PI_XBTUSD.product_id,
};

export const deltasBuffer: DeltasBuffer = {
  bids: [],
  asks: [],
  product_id: '',
};

websocketDataHandler();

const websocketDataBuffer = (message: DataMessage) => {
  if (message.feed === 'book_ui_1_snapshot') {
    clearSnapshot();
    clearDeltasBuffer();
    saveInitialSnapshot(message);
  }
  if (
    message.feed === 'book_ui_1' &&
    message.product_id === snapshot.product_id
  ) {
    queueDeltaToBuffer(message);
  }
};

const clearSnapshot = () => {
  snapshot.bids.clear();
  snapshot.asks.clear();
  snapshot.product_id = '';
};

export const clearDeltasBuffer = () => {
  deltasBuffer.bids = [];
  deltasBuffer.asks = [];
  deltasBuffer.product_id = '';
};

const saveInitialSnapshot = (snapshotMessage: DataMessage) => {
  const applyInitialSnapshot = (
    snapshotBidsOrAsks: BidsOrAsksMap,
    bidsOrAsks: BidsOrAsks
  ) => {
    for (const [price, size] of bidsOrAsks) {
      snapshotBidsOrAsks.set(price, size);
    }
  };
  snapshot.product_id = snapshotMessage.product_id;
  applyInitialSnapshot(snapshot.bids, snapshotMessage.bids);
  applyInitialSnapshot(snapshot.asks, snapshotMessage.asks);
};

const queueDeltaToBuffer = (latestDeltaMessage: DataMessage) => {
  deltasBuffer.product_id = latestDeltaMessage.product_id;
  deltasBuffer.bids = [...deltasBuffer.bids, ...latestDeltaMessage.bids];
  deltasBuffer.asks = [...deltasBuffer.asks, ...latestDeltaMessage.asks];
};

export default websocketDataBuffer;
